import frappe

def get_context(context):
    survey_id = frappe.form_dict.get('name')
    if not survey_id:
        # Try to get from route if using route rules
        survey_id = frappe.request.path.split('/')[-1]
    
    context.survey_id = survey_id
    try:
        doc = frappe.get_doc("Survey Form", survey_id)
        context.survey_title = doc.title
        context.is_active = doc.is_active and doc.status == "Published"
    except frappe.DoesNotExistError:
        context.is_active = False
        context.error = "Survey not found."
