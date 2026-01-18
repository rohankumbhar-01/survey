import frappe
from frappe.model.document import Document
from frappe.utils import get_url

class SurveyForm(Document):
	def validate(self):
		if self.status == "Published" and not self.published_on:
			self.published_on = frappe.utils.now_datetime()
		
		self.public_url = get_url(f"/survey/run/{self.name}")

	def on_update(self):
		# logic for immutability once responses exist could be here
		pass
