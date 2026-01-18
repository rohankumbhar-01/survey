frappe.ui.form.on("Survey Form", {
	refresh: function (frm) {
		if (!frm.is_new()) {
			// Make public_url a clickable link if it exists
			if (frm.doc.public_url) {
				frm.set_df_property("public_url", "options", "URL");
			}

			frm.add_custom_button(__("Edit Design"), function () {
				// Navigate to sub-route of survey_dashboard
				frappe.set_route("survey_dashboard", "builder", frm.doc.name);
			});

			frm.add_custom_button(__("View Analysis"), function () {
				frappe.set_route("survey_dashboard", "analysis", frm.doc.name);
			});

			frm.add_custom_button(
				__("Open Survey"),
				function () {
					window.open(frm.doc.public_url, "_blank");
				},
				__("View")
			);
		}
	},
});
