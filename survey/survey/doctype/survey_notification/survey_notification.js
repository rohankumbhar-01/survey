const DATE_BASED_EVENTS = ["Days Before", "Days After"];

frappe.ui.form.on("Survey Notification", {
    setup_fieldname_select: function (frm) {
        // get the doctype to update fields
        if (!frm.doc.document_type) {
            return;
        }

        frappe.model.with_doctype(frm.doc.document_type, function () {
            let get_select_options = function (df, parent_field) {
                // Append parent_field name along with fieldname for child table fields
                let select_value = parent_field ? df.fieldname + "," + parent_field : df.fieldname;

                return {
                    value: select_value,
                    label: df.fieldname + " (" + __(df.label, null, df.parent) + ")",
                };
            };

            let get_date_change_options = function () {
                let date_options = $.map(fields, function (d) {
                    return d.fieldtype == "Date" || d.fieldtype == "Datetime"
                        ? get_select_options(d)
                        : null;
                });
                // append creation and modified date to Date Change field
                return date_options.concat([
                    { value: "creation", label: `creation (${__("Created On")})` },
                    { value: "modified", label: `modified (${__("Last Modified Date")})` },
                ]);
            };

            let fields = frappe.get_doc("DocType", frm.doc.document_type).fields;
            let options = $.map(fields, function (d) {
                return frappe.model.no_value_type.includes(d.fieldtype)
                    ? null
                    : get_select_options(d);
            });

            // set value changed options
            frm.set_df_property("value_changed", "options", [""].concat(options));
            frm.set_df_property("set_property_after_alert", "options", [""].concat(options));

            // set date changed options
            frm.set_df_property("date_changed", "options", get_date_change_options());

            let receiver_fields = [];
            if (frm.doc.channel === "Email") {
                receiver_fields = $.map(fields, function (d) {
                    // Add User, Email, and Link fields from child into select dropdown
                    if (frappe.model.table_fields.includes(d.fieldtype)) {
                        let child_fields = frappe.get_doc("DocType", d.options).fields;
                        return $.map(child_fields, function (df) {
                            return df.options == "Email" ||
                                (df.options == "User" && df.fieldtype == "Link") ||
                                (df.fieldtype == "Link") // Added for smart resolution
                                ? get_select_options(df, d.fieldname)
                                : null;
                        });
                        // Add User, Email, and Link fields from parent into select dropdown
                    } else {
                        return d.options == "Email" ||
                            (d.options == "User" && d.fieldtype == "Link") ||
                            (d.fieldtype == "Link") // Added for smart resolution
                            ? get_select_options(d)
                            : null;
                    }
                });
            }

            // set email recipient options
            frm.fields_dict.recipients.grid.update_docfield_property(
                "receiver_by_document_field",
                "options",
                [""].concat(["owner"]).concat(receiver_fields)
            );

            // set options for "From Attach Field"
            let attach_fields = fields.filter((d) =>
                ["Attach", "Attach Image"].includes(d.fieldtype)
            );
            let attach_options = $.map(attach_fields, function (d) {
                return get_select_options(d);
            });

            frm.set_df_property("from_attach_field", "options", [""].concat(attach_options));
        });
    },

    refresh: function (frm) {
        frm.trigger("setup_fieldname_select");
        frm.add_fetch("sender", "email_id", "sender_email");
        frm.set_query("sender", () => {
            return {
                filters: {
                    enable_outgoing: 1,
                },
            };
        });
        frm.trigger("event");
    },

    document_type: function (frm) {
        frm.trigger("setup_fieldname_select");
    },

    event: function (frm) {
        if (!DATE_BASED_EVENTS.includes(frm.doc.event) || frm.is_new()) return;
    },

    channel: function (frm) {
        frm.toggle_reqd("recipients", frm.doc.channel == "Email");
        frm.trigger("setup_fieldname_select");
    },
});
