import frappe
from frappe.model.document import Document

class SurveyResponse(Document):
	def after_insert(self):
		self.update_survey_stats()

	def on_trash(self):
		self.update_survey_stats()

	def update_survey_stats(self):
		count = frappe.db.count("Survey Response", {"survey_form": self.survey_form})
		frappe.db.set_value("Survey Form", self.survey_form, "response_count", count)
