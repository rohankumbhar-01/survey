import json

import frappe
from frappe import _


@frappe.whitelist(allow_guest=True)
def get_survey_form(survey_id):
	doc = frappe.get_doc("Survey Form", survey_id)

	# Handle "dirty" JSON strings that might contain JS code or multiple objects
	raw_json = doc.survey_json or "{}"
	clean_json = {}

	try:
		if ";" in raw_json:
			# If it contains extra stuff like "const themeJson = ...", try to extract the first JSON object
			import re

			match = re.search(r"(\{.*\})", raw_json, re.DOTALL)
			if match:
				clean_json = json.loads(match.group(1))
		else:
			clean_json = json.loads(raw_json)
	except Exception:
		clean_json = {}

	return {"title": doc.title, "description": doc.description, "survey_json": clean_json}


@frappe.whitelist(allow_guest=True)
def submit_survey_response(survey_id, response_json, reference_doctype=None, reference_docname=None):
	if isinstance(response_json, str):
		response_json = json.loads(response_json)

	# Validate survey exists and is active
	doc = frappe.get_doc("Survey Form", survey_id)
	if not doc.is_active or doc.status != "Published":
		frappe.throw(_("This survey is not accepting responses."), frappe.PermissionError)

	response_doc = frappe.get_doc(
		{
			"doctype": "Survey Response",
			"survey_form": survey_id,
			"reference_doctype": reference_doctype,
			"reference_docname": reference_docname,
			"response_json": json.dumps(response_json),
			"responded_on": frappe.utils.now_datetime(),
			"respondent_user": frappe.session.user if frappe.session.user != "Guest" else None,
			"respondent_ip": frappe.local.request_ip,
			"user_agent": frappe.get_request_header("User-Agent"),
		}
	)
	response_doc.insert(ignore_permissions=True)

	return {"status": "success", "name": response_doc.name}


@frappe.whitelist()
def get_survey_responses(survey_id):
	frappe.has_permission("Survey Form", "read", throw=True)
	responses = frappe.get_all(
		"Survey Response",
		filters={"survey_form": survey_id},
		fields=["name", "response_json", "responded_on", "respondent_user", "completion_time_sec"],
	)
	for r in responses:
		if r.response_json:
			r.response_json = json.loads(r.response_json)
	return responses


@frappe.whitelist()
def get_survey_analysis(survey_id):
	frappe.has_permission("Survey Form", "read", throw=True)
	responses = frappe.get_all(
		"Survey Response", filters={"survey_form": survey_id}, fields=["response_json"]
	)

	raw_responses = [json.loads(r.response_json) for r in responses if r.response_json]
	return raw_responses
