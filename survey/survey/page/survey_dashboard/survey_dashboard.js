frappe.pages['survey_dashboard'].on_page_load = function (wrapper) {
    var page = frappe.ui.make_app_page({
        parent: wrapper,
        title: 'Survey Dashboard v2',
        single_column: true
    });

    page.set_primary_action('Back to List', () => frappe.set_route('List', 'Survey Form'));

    const $container = $(wrapper).find('.layout-main-section').empty();
    $container.append('<div id="survey-container" style="height: calc(100vh - 150px); overflow: auto;"></div>');

    const assets = [
        'https://unpkg.com/vue@3/dist/vue.global.prod.js',
        'https://unpkg.com/survey-core@2.5.6/survey-core.min.css',
        'https://unpkg.com/survey-core@2.5.6/survey.core.min.js',
        'https://unpkg.com/survey-core@2.5.6/themes/index.min.js',
        'https://unpkg.com/survey-vue3-ui@2.5.6/survey-vue3-ui.umd.js',
        'https://unpkg.com/survey-creator-core@2.5.6/survey-creator-core.min.css',
        'https://unpkg.com/survey-creator-core@2.5.6/survey-creator-core.min.js',
        'https://unpkg.com/survey-creator-vue@2.5.6/survey-creator-vue.umd.js',
        'https://unpkg.com/plotly.js-dist-min/plotly.min.js',
        'https://unpkg.com/survey-analytics@2.5.6/survey.analytics.min.css',
        'https://unpkg.com/survey-analytics@2.5.6/survey.analytics.min.js'
    ];

    load_assets_sequentially(assets, function () {
        // Compatibility Fix: SurveyJS v2 UMD sometimes expects SurveyVue to be available
        // on window for the CreatorVue to attach its ComponentFactory.
        window.Survey = window.Survey || window.surveyCore || {};
        window.SurveyVue = window.SurveyVue || window.Survey;
        window.SurveyCreatorCore = window.SurveyCreatorCore || window.surveyCreatorCore || {};
        window.SurveyTheme = window.SurveyTheme || window.surveyTheme || {};

        window.survey_v2_loaded = true;
        handle_routing(wrapper);
    });

    frappe.pages['survey_dashboard'].on_page_show = function () {
        if (window.survey_v2_loaded) {
            handle_routing(wrapper);
        }
    };
}

function load_assets_sequentially(assets, callback) {
    if (assets.length === 0) {
        callback();
        return;
    }
    const item = assets.shift();
    frappe.require(item, function () {
        // Inter-asset global fixing
        if (item.includes('survey.core')) {
            window.Survey = window.Survey || window.surveyCore;
        }
        if (item.includes('survey-vue3-ui')) {
            window.SurveyVue = window.SurveyVue || window.Survey;
            window.Survey = window.Survey || window.SurveyVue;
        }
        if (item.includes('themes/index.min.js')) {
            window.SurveyTheme = window.SurveyTheme || window.surveyTheme;
        }
        if (item.includes('survey-creator-core')) {
            window.SurveyCreatorCore = window.SurveyCreatorCore || window.surveyCreatorCore;
        }
        load_assets_sequentially(assets, callback);
    }, function (err) {
        console.error("Critical: Failed to load asset:", item, err);
        // Continue anyway to see if we can recover, or show error
        load_assets_sequentially(assets, callback);
    });
}

function handle_routing(wrapper) {
    const route = frappe.get_route();
    const $container = $(wrapper).find('#survey-container').empty();

    if (route.length < 3) {
        $container.html('<div class="text-center p-5">No survey selected.</div>');
        return;
    }

    const mode = route[1];
    const survey_id = route[2];

    if (mode === 'builder') {
        render_builder_v2($container, survey_id);
    } else if (mode === 'analysis') {
        render_analysis($container, survey_id);
    }
}

function render_builder_v2($container, survey_id) {
    $container.append('<div id="creatorElement" style="height: 100%; width: 100%;"></div>');

    // UNLOCK ALL FEATURES
    const options = {
        showThemeTab: true,
        showLogicTab: true,
        showTranslationTab: true,
        showJSONEditorTab: true,
        showPreviewTab: true,
        isAutoSave: false,
        allowEditExpressionsInPropertyGrid: true,
        showSidebar: true, // V2 equivalent of showPropertyGrid
        showToolbox: true,
        allowModifyTheme: true
    };

    if (!window.SurveyCreatorCore || !window.SurveyCreatorVue) {
        $container.html('<div class="alert alert-danger">SurveyJS Libraries not loaded.</div>');
        return;
    }

    // 1. Official Theme Registration (SurveyJS v2)
    if (window.SurveyCreatorCore && window.SurveyCreatorCore.registerSurveyTheme && window.SurveyTheme) {
        console.log("Registering themes via official SurveyCreatorCore.registerSurveyTheme...");
        window.SurveyCreatorCore.registerSurveyTheme(window.SurveyTheme);
    }

    // 2. Discover themes for our own lookup/initialization fallback
    const allThemes = [];
    if (window.SurveyTheme) {
        Object.keys(window.SurveyTheme).forEach(key => {
            const t = window.SurveyTheme[key];
            if (t && t.themeName && t.cssVariables) allThemes.push(t);
        });
    }

    // 3. Create Creator
    const creator = new SurveyCreatorCore.SurveyCreatorModel(options);
    window.creator = creator;
    creator.isAutoSave = true; // Often forces state sync

    // Add CSS to force the preview survey components to show their colors
    const style = document.createElement("style");
    style.innerHTML = `
        .svc-creator__preview-survey, .sd-root-modern, .sjs-survey {
            background-color: var(--sjs-general-backcolor) !important;
            color: var(--sjs-general-forecolor) !important;
        }
        .sd-btn--action {
            background-color: var(--sjs-primary-backcolor) !important;
        }
    `;
    document.head.appendChild(style);

    // Explicitly unlock feature flags
    creator.isComplexPropertyAllowed = true;
    creator.readOnly = false;

    // Force Serializer to allow editing theme-related properties
    try {
        const serializer = window.Survey.Serializer;
        if (serializer) {
            // Unblock theme-related properties for both Survey and Creator
            const props = ["theme", "colorPalette", "isLight", "backgroundOpacity", "themeName"];
            props.forEach(p => {
                const property = serializer.findProperty("survey", p);
                if (property) {
                    property.readOnly = false;
                    property.visible = true;
                }
            });
        }
    } catch (e) {
        console.warn("Could not set serializer properties", e);
    }

    // 4. Final Creator Model Tweaks
    // Allow Theme discovery in the UI
    if (creator.themeEditor) {
        if (creator.themeEditor.onThemesChanged) {
            creator.themeEditor.onThemesChanged();
        }
    }

    // Stylize and fix Banner
    if (!document.getElementById('survey-creator-custom-css')) {
        const style = document.createElement('style');
        style.id = 'survey-creator-custom-css';
        style.innerHTML = `
			.svc-creator__banner { display: none !important; }
			#survey-container { background-color: #f3f3f3; }
			.svc-creator-tab-content.svc-creator__area--theme { height: 100% !important; }
			.svc-tab-designer, .svc-tab-theme, .svc-tab-logic, .svc-tab-translation { z-index: 10 !important; cursor: pointer !important; }
            /* Force pointer events on the sidebar to ensure interactivity */
            .svc-creator__side-bar, .spg-root, .spg-row, .spg-editor { pointer-events: auto !important; opacity: 1 !important; }
            .spg-row--disabled { opacity: 1 !important; pointer-events: auto !important; }
            /* Force all inputs to be clickable even if SurveyJS thinks they are readonly */
            .spg-input, .spg-checkbox, .spg-radio, .sjs-radio, .sd-input, .sd-radio { pointer-events: auto !important; opacity: 1 !important; }
		`;
        document.head.appendChild(style);
    }

    console.log("Creator: Themes registered");

    const app = Vue.createApp({
        setup() { return { creator }; },
        template: '<SurveyCreatorComponent :model="creator" />'
    });

    const scv = window.SurveyCreatorVue || {};
    const component = scv.SurveyCreatorComponent ||
        scv.SurveyCreator ||
        scv.Creator ||
        scv.default?.SurveyCreatorComponent;

    if (component) {
        app.component("SurveyCreatorComponent", component);
        app.mount("#creatorElement");
    } else {
        console.error("SurveyJS Creator component not found. Global SurveyCreatorVue:", scv);
        $container.html('<div class="alert alert-danger">SurveyJS Creator library failed to initialize correctly. Please check console for "ComponentFactory" error.</div>');
    }

    // 5. Load Data
    frappe.call({
        method: 'survey.survey.api.survey.get_survey_form',
        args: { survey_id: survey_id },
        callback: function (r) {
            if (r.message && r.message.survey_json) {
                let data = r.message.survey_json;
                if (typeof data === 'string') {
                    try { data = JSON.parse(data); } catch (e) { }
                }

                if (!data.pages || data.pages.length === 0) {
                    data.pages = [{
                        name: "page1",
                        elements: [
                            { type: "text", name: "q1", title: "Text Sample" },
                            { type: "radiogroup", name: "q2", title: "Radio Sample", choices: ["Option 1", "Option 2"] },
                            { type: "boolean", name: "q3", title: "Boolean Sample" }
                        ]
                    }];
                }

                creator.JSON = data;

                // Sync Function for Theme Application
                const applyFullTheme = (themeObj) => {
                    if (!themeObj) return;
                    console.log("Applying theme:", themeObj.themeName || "Custom");

                    creator.theme = themeObj;

                    if (creator.themeEditor && creator.themeEditor.survey) {
                        creator.themeEditor.survey.applyTheme(themeObj);
                        creator.themeEditor.survey.setDesignMode(true);
                    }
                    if (creator.themeEditor && creator.themeEditor.onThemesChanged) {
                        creator.themeEditor.onThemesChanged();
                    }
                };

                // Unlock for interactivity
                const unlock = () => {
                    // console.log("Unlocking Builder/Theme Editor components...");
                    creator.readOnly = false;

                    if (creator.themeEditor && creator.themeEditor.survey) {
                        creator.themeEditor.survey.readOnly = false;
                        creator.themeEditor.survey.setDesignMode(true);
                    }

                    // Unlock the Property Grid (sidebar) specifically for V2
                    if (creator.propertyGrid && creator.propertyGrid.survey) {
                        const pgSurvey = creator.propertyGrid.survey;
                        pgSurvey.readOnly = false;
                        pgSurvey.getAllQuestions().forEach(q => {
                            q.readOnly = false;
                            q.enabled = true;
                            try { q.setPropertyValue("readOnly", false); } catch (e) { }
                        });
                    }

                    if (creator.toolbox) creator.toolbox.readOnly = false;
                };

                // Official V2 Event for theme changes in the UI
                creator.onThemeChanged.add((sender, options) => {
                    console.log("Theme Changed via Designer:", sender.theme);
                    if (creator.themeEditor && creator.themeEditor.survey) {
                        creator.themeEditor.survey.applyTheme(sender.theme);
                    }
                });

                // Re-unlock on tab changes
                creator.onActiveTabChanged.add((sender, options) => {
                    setTimeout(unlock, 100);
                    setTimeout(unlock, 1000);
                });

                // Init Theme
                let initialTheme = data.theme;
                if (!initialTheme && allThemes.length > 0) {
                    initialTheme = allThemes.find(t => t.themeName === "defaultV2") || allThemes.find(t => t.themeName === "default") || allThemes[0];
                }

                if (initialTheme) {
                    setTimeout(() => {
                        applyFullTheme(initialTheme);
                        unlock();
                    }, 500);
                }

                // Final unlock sequence
                [1500, 3000].forEach(ms => setTimeout(unlock, ms));
            }
        }
    });

    creator.saveSurveyFunc = (saveNo, callback) => {
        const surveyData = creator.JSON;
        surveyData.theme = creator.theme;

        frappe.call({
            method: 'frappe.client.set_value',
            args: {
                doctype: 'Survey Form',
                name: survey_id,
                fieldname: 'survey_json',
                value: JSON.stringify(surveyData)
            },
            callback: (r) => {
                callback(saveNo, !r.exc);
                if (!r.exc) {
                    frappe.show_alert({ message: __('Saved Survey and Theme'), indicator: 'green' });
                }
            }
        });
    };

    creator.saveThemeFunc = (saveNo, callback) => {
        console.log("Auto-saving theme change...");
        creator.saveSurveyFunc(saveNo, callback);
    };
}

function render_analysis($container, survey_id) {
    if (!document.getElementById('survey-analytics-custom-css')) {
        const style = document.createElement('style');
        style.id = 'survey-analytics-custom-css';
        style.innerHTML = `
            /* Targets the common SurveyJS banner patterns */
            [class*="--banner"], 
            [class*="__banner"],
            .sa-commercial-license-banner,
            .sa-view-container__banner,
            .sa-visualization-panel__banner {
                display: none !important; 
                visibility: hidden !important; 
                height: 0 !important;
                padding: 0 !important;
                margin: 0 !important;
                z-index: -1 !important;
                pointer-events: none !important;
            }
            #summaryContainer {
                min-height: 600px;
                width: 100%;
            }
        `;
        document.head.appendChild(style);
    }

    $container.append('<div id="summaryContainer" class="p-3"></div>');
    if (!window.SurveyAnalytics) {
        $container.html('<div class="alert alert-danger">SurveyJS Analytics library not loaded.</div>');
        return;
    }

    frappe.call({
        method: 'survey.survey.api.survey.get_survey_form',
        args: { survey_id: survey_id },
        callback: function (form_res) {
            frappe.call({
                method: 'survey.survey.api.survey.get_survey_analysis',
                args: { survey_id: survey_id },
                callback: function (data_res) {
                    console.log("Analysis: Form Res", form_res);
                    console.log("Analysis: Data Res", data_res);

                    const surveyJson = form_res.message.survey_json;
                    const results = data_res.message;

                    if (!results || results.length === 0) {
                        $container.find('#summaryContainer').html('<div class="text-center p-5">No responses found for this survey yet.</div>');
                        return;
                    }

                    const survey = new Survey.Model(surveyJson);
                    const questions = survey.getAllQuestions();

                    console.log("Analysis: Questions found:", questions.length);
                    console.log("Analysis: Results found:", results.length);

                    const summaryEl = document.getElementById("summaryContainer");
                    if (!summaryEl) {
                        console.error("Analysis: summaryContainer not found");
                        return;
                    }

                    // Clear any previous loading text
                    summaryEl.innerHTML = "";

                    try {
                        const vizPanel = new SurveyAnalytics.VisualizationPanel(questions, results);
                        vizPanel.render(summaryEl);
                        console.log("Analysis: Render called. Visualizers:", vizPanel.visualizers.length);
                    } catch (e) {
                        console.error("Analysis: Render crash", e);
                        $(summaryEl).html('<div class="alert alert-danger">Error rendering analytics: ' + e.message + '</div>');
                    }

                    // Safer banner removal - target specific classes only
                    const cleanBanners = () => {
                        const banners = document.querySelectorAll('.sa-commercial-license-banner, .sa-view-container__banner, .sa-visualization-panel__banner');
                        banners.forEach(b => b.remove());

                        // Also check for standard SurveyJS banner markers
                        const allDivs = summaryEl.querySelectorAll('div');
                        allDivs.forEach(div => {
                            if (div.innerText && (div.innerText.includes("license is required") || div.innerText.includes("To use the Dashboard library"))) {
                                if (div.children.length < 3) { // Highly likely a banner, not a chart
                                    div.style.display = 'none';
                                }
                            }
                        });
                    };

                    cleanBanners();
                    setTimeout(cleanBanners, 1000);
                    setTimeout(cleanBanners, 3000);
                }
            });
        }
    });
}
