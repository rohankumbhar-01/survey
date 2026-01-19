import json
import frappe
from frappe import _
from frappe.model.document import Document
from frappe.utils import add_to_date, nowdate, validate_email_address, get_url
from frappe.utils.jinja import validate_template
from frappe.core.doctype.role.role import get_info_based_on_role

class SurveyNotification(Document):
	def validate(self):
		validate_template(self.subject)
		validate_template(self.message)

		if self.event in ("Days Before", "Days After") and not self.date_changed:
			frappe.throw(_("Please specify which date field must be checked"))

		if self.event == "Value Change" and not self.value_changed:
			frappe.throw(_("Please specify which value field must be checked"))

	def on_update(self):
		frappe.cache.hdel("survey_notifications", self.document_type)

	def on_trash(self):
		frappe.cache.hdel("survey_notifications", self.document_type)

	def send(self, doc):
		"""Build recipients and send Notification"""
		context = self.get_context(doc)
		
		# Generate the Dynamic Survey Link
		site_url = get_url()
		survey_link = f"{site_url}/survey/run/{self.survey_form}?reference_doctype={doc.doctype}&reference_docname={doc.name}"
		context.update({
			"survey_link": survey_link,
			"site_url": site_url
		})

		self.send_notification(doc, context)

		if self.set_property_after_alert:
			self.set_property(doc)

	def get_context(self, doc):
		return {
			"doc": doc,
			"nowdate": nowdate,
			"frappe": frappe,
			"survey_form": self.survey_form
		}

	def send_notification(self, doc, context):
		subject = frappe.render_template(self.subject, context)
		message = frappe.render_template(self.message, context)
		
		recipients, cc, bcc = self.get_list_of_recipients(doc, context)
		if not recipients:
			return

		sender = None
		if self.sender and self.sender_email:
			sender = f"{self.sender} <{self.sender_email}>"

		frappe.sendmail(
			recipients=recipients,
			subject=subject,
			sender=sender,
			cc=cc,
			bcc=bcc,
			message=message,
			reference_doctype=doc.doctype,
			reference_name=doc.name,
		)

	def get_list_of_recipients(self, doc, context):
		recipients = []
		cc = []
		bcc = []
		for recipient in self.recipients:
			if recipient.condition:
				if not frappe.safe_eval(recipient.condition, None, context):
					continue
			
			# 1. Receiver by Document Field (Standard)
			if recipient.receiver_by_document_field:
				email_id = doc.get(recipient.receiver_by_document_field)
				if validate_email_address(email_id):
					recipients.append(email_id)
				
				# 2. Smart Recipient Resolution (Custom)
				if recipient.fetch_from_contact:
					meta = frappe.get_meta(doc.doctype)
					df = meta.get_field(recipient.receiver_by_document_field)
					if df and df.fieldtype == "Link":
						linked_doctype = df.options
						linked_name = doc.get(recipient.receiver_by_document_field)
						if linked_name:
							# Find contacts linked to this document
							contacts = frappe.get_all("Contact", 
								filters={"dynamic_links.link_doctype": linked_doctype, "dynamic_links.link_name": linked_name},
								fields=["email_id"]
							)
							for c in contacts:
								if c.email_id and validate_email_address(c.email_id):
									recipients.append(c.email_id)

			# 3. Receiver by Role (Standard)
			if recipient.receiver_by_role:
				emails = get_info_based_on_role(recipient.receiver_by_role, "email", ignore_permissions=True)
				for email in emails:
					recipients.extend(email.split("\n"))

			if recipient.cc:
				cc.extend(self.get_emails_from_template(recipient.cc, context))
			if recipient.bcc:
				bcc.extend(self.get_emails_from_template(recipient.bcc, context))

		if self.send_to_all_assignees:
			recipients.extend(self.get_assignees(doc))

		return list(set(filter(None, recipients))), list(set(filter(None, cc))), list(set(filter(None, bcc)))

	def get_emails_from_template(self, template, context):
		if not template:
			return []
		emails = frappe.render_template(template, context) if "{" in template else template
		return [e.strip() for e in emails.replace(",", "\n").split("\n") if e.strip()]

	def get_assignees(self, doc):
		assignees = frappe.get_all("ToDo",
			filters={"status": "Open", "reference_name": doc.name, "reference_type": doc.doctype},
			fields=["allocated_to"]
		)
		return [d.allocated_to for d in assignees]

	def set_property(self, doc):
		try:
			fieldname = self.set_property_after_alert
			value = self.property_value
			doc.db_set(fieldname, value)
		except Exception:
			frappe.log_error("Survey Notification: Set Property Failed")

	def get_documents_for_today(self):
		"""get list of documents that will be triggered today"""
		from frappe.utils import add_to_date
		
		docs = []
		diff_days = self.days_in_advance
		if self.event == "Days After":
			diff_days = -diff_days

		reference_date = add_to_date(nowdate(), days=diff_days)
		reference_date_start = reference_date + " 00:00:00.000000"
		reference_date_end = reference_date + " 23:59:59.000000"

		doc_list = frappe.get_all(
			self.document_type,
			fields="name",
			filters=[
				{self.date_changed: (">=", reference_date_start)},
				{self.date_changed: ("<=", reference_date_end)},
			],
		)

		for d in doc_list:
			doc = frappe.get_doc(self.document_type, d.name)
			if self.condition:
				context = self.get_context(doc)
				if not frappe.safe_eval(self.condition, None, context):
					continue
			docs.append(doc)

		return docs

def trigger_notifications(doc, method=None):
	if frappe.flags.in_import or frappe.flags.in_patch:
		return

	# Map hooks to events
	event_map = {
		"after_insert": "New",
		"on_update": "Save",
		"on_submit": "Submit",
		"on_cancel": "Cancel",
		"on_change": "Value Change"
	}
	event = event_map.get(method)
	if not event:
		return

	# Load cached notifications for this doctype
	def _get_notifications():
		return frappe.get_all("Survey Notification", 
			filters={"enabled": 1, "document_type": doc.doctype},
			fields=["name", "event", "value_changed", "condition"]
		)

	notifications = frappe.cache.hget("survey_notifications", doc.doctype, _get_notifications)
	if not notifications:
		return
	
	for n in notifications:
		if n.event == event:
			evaluate_alert(doc, n)

def evaluate_alert(doc, alert_def):
	alert = frappe.get_doc("Survey Notification", alert_def.name)
	
	# Check condition
	context = alert.get_context(doc)
	if alert.condition:
		try:
			if not frappe.safe_eval(alert.condition, None, context):
				return
		except Exception:
			frappe.log_error(f"Survey Notification: Condition Error in {alert.name}")
			return

	# Check Value Change
	if alert.event == "Value Change":
		if not doc.get_doc_before_save():
			return
		
		before = doc.get_doc_before_save().get(alert.value_changed)
		after = doc.get(alert.value_changed)
		if before == after:
			return

	alert.send(doc)

def trigger_daily_alerts():
	"""Trigger date-based alerts (Days Before/After)"""
	alerts = frappe.get_all("Survey Notification", 
		filters={"enabled": 1, "event": ["in", ["Days Before", "Days After"]]},
		fields=["name"]
	)

	for a_def in alerts:
		alert = frappe.get_doc("Survey Notification", a_def.name)
		for doc in alert.get_documents_for_today():
			evaluate_alert(doc, alert)
			frappe.db.commit()
