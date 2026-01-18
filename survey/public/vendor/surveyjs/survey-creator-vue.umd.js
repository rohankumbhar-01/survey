(function (y, l) {
	typeof exports == "object" && typeof module < "u"
		? l(
				exports,
				require("survey-vue3-ui"),
				require("vue"),
				require("survey-creator-core"),
				require("survey-core")
		  )
		: typeof define == "function" && define.amd
		? define(["exports", "survey-vue3-ui", "vue", "survey-creator-core", "survey-core"], l)
		: ((y = typeof globalThis < "u" ? globalThis : y || self),
		  l((y.SurveyCreatorVue = {}), y.SurveyVue, y.Vue, y.SurveyCreatorCore, y.Survey));
})(this, function (y, l, e, N, q) {
	"use strict";
	const F = { class: "svc-flex-column svc-flex-row__element svc-flex-row__element--growing" },
		L = { class: "svc-top-bar" },
		A = { key: 0, class: "svc-tabbed-menu-wrapper" },
		Q = ["v-show"],
		K = { class: "svc-creator__content-holder svc-flex-column" },
		H = ["aria-labelledby", "id"],
		O = { key: 0, class: "svc-footer-bar" },
		W = ["v-show"],
		G = { key: 0, class: "svc-creator__banner" },
		j = ["innerHTML"],
		V = e.defineComponent({
			__name: "Creator",
			props: { model: {} },
			setup(i) {
				const n = i,
					o = e.computed(() => e.toRaw(n.model)),
					t = e.ref();
				return (
					l.useBase(
						() => o.value,
						(s, r) => {
							r && r.unsubscribeRootElement(),
								s && t.value && s.setRootElement(t.value);
						}
					),
					e.onMounted(() => {
						t.value && n.model.setRootElement(t.value);
					}),
					e.onUnmounted(() => {
						n.model.unsubscribeRootElement();
					}),
					(s, r) =>
						o.value.isCreatorDisposed
							? e.createCommentVNode("", !0)
							: (e.openBlock(),
							  e.createElementBlock(
									e.Fragment,
									{ key: 0 },
									[
										e.createVNode(e.unref(l.SvComponent), {
											is: "survey-popup-modal",
										}),
										e.createElementVNode(
											"div",
											{
												class: e.normalizeClass(o.value.getRootCss()),
												style: e.normalizeStyle(o.value.themeVariables),
												ref_key: "root",
												ref: t,
											},
											[
												e.createElementVNode("div", null, [
													e.createVNode(e.unref(l.SvComponent), {
														is: "sv-svg-bundle",
													}),
												]),
												e.createElementVNode(
													"div",
													{
														class: e.normalizeClass([
															"svc-full-container svc-creator__area svc-flex-column",
															{
																"svc-creator__area--with-banner":
																	!o.value.haveCommercialLicense,
															},
														]),
													},
													[
														e.createElementVNode(
															"div",
															{
																class: e.normalizeClass([
																	"svc-flex-row svc-full-container",
																	{
																		"svc-creator__side-bar--left":
																			o.value
																				.sidebarLocation ==
																			"left",
																	},
																]),
															},
															[
																e.createElementVNode("div", F, [
																	e.createElementVNode(
																		"div",
																		L,
																		[
																			o.value.showTabs
																				? (e.openBlock(),
																				  e.createElementBlock(
																						"div",
																						A,
																						[
																							e.createVNode(
																								e.unref(
																									l.SvComponent
																								),
																								{
																									is: "svc-tabbed-menu",
																									model: o
																										.value
																										.tabbedMenu,
																								},
																								null,
																								8,
																								[
																									"model",
																								]
																							),
																						]
																				  ))
																				: e.createCommentVNode(
																						"",
																						!0
																				  ),
																			o.value.showToolbar
																				? (e.openBlock(),
																				  e.createElementBlock(
																						"div",
																						{
																							key: 1,
																							class: "svc-toolbar-wrapper",
																							"v-show":
																								o
																									.value
																									.showToolbar,
																						},
																						[
																							e.createVNode(
																								e.unref(
																									l.SvComponent
																								),
																								{
																									is: "sv-action-bar",
																									model: o
																										.value
																										.toolbar,
																								},
																								null,
																								8,
																								[
																									"model",
																								]
																							),
																						],
																						8,
																						Q
																				  ))
																				: e.createCommentVNode(
																						"",
																						!0
																				  ),
																		]
																	),
																	e.createElementVNode(
																		"div",
																		{
																			class: e.normalizeClass(
																				[
																					"svc-creator__content-wrapper svc-flex-row",
																					{
																						"svc-creator__content-wrapper--footer-toolbar":
																							o.value
																								.isMobileView,
																					},
																				]
																			),
																		},
																		[
																			e.createElementVNode(
																				"div",
																				K,
																				[
																					(e.openBlock(
																						!0
																					),
																					e.createElementBlock(
																						e.Fragment,
																						null,
																						e.renderList(
																							o.value
																								.tabs,
																							(
																								a
																							) => (
																								e.openBlock(),
																								e.createElementBlock(
																									e.Fragment,
																									null,
																									[
																										o
																											.value
																											.viewType ==
																											a.id &&
																										a.visible
																											? (e.openBlock(),
																											  e.createElementBlock(
																													"div",
																													{
																														role: "tabpanel",
																														class: e.normalizeClass(
																															[
																																"svc-creator-tab",
																																{
																																	"svc-creator__toolbox--right":
																																		o
																																			.value
																																			.toolboxLocation ==
																																		"right",
																																},
																															]
																														),
																														key: a.id,
																														"aria-labelledby":
																															"tab-" +
																															a.id,
																														id:
																															"scrollableDiv-" +
																															a.id,
																													},
																													[
																														e.createVNode(
																															e.unref(
																																l.SvComponent
																															),
																															{
																																is: a.componentContent,
																																model: a
																																	.data
																																	.model,
																															},
																															null,
																															8,
																															[
																																"is",
																																"model",
																															]
																														),
																													],
																													10,
																													H
																											  ))
																											: e.createCommentVNode(
																													"",
																													!0
																											  ),
																									],
																									64
																								)
																							)
																						),
																						256
																					)),
																				]
																			),
																		],
																		2
																	),
																	o.value.isMobileView
																		? (e.openBlock(),
																		  e.createElementBlock(
																				"div",
																				O,
																				[
																					e.createElementVNode(
																						"div",
																						{
																							class: "svc-toolbar-wrapper",
																							"v-show":
																								o
																									.value
																									.isMobileView,
																						},
																						[
																							e.createVNode(
																								e.unref(
																									l.SvComponent
																								),
																								{
																									is: "sv-action-bar",
																									model: o
																										.value
																										.footerToolbar,
																								},
																								null,
																								8,
																								[
																									"model",
																								]
																							),
																						],
																						8,
																						W
																					),
																				]
																		  ))
																		: e.createCommentVNode(
																				"",
																				!0
																		  ),
																]),
																o.value.isSidebarVisible
																	? (e.openBlock(),
																	  e.createBlock(
																			e.unref(l.SvComponent),
																			{
																				key: 0,
																				is: "svc-side-bar",
																				model: o.value
																					.sidebar,
																			},
																			null,
																			8,
																			["model"]
																	  ))
																	: e.createCommentVNode("", !0),
															],
															2
														),
														o.value.haveCommercialLicense
															? e.createCommentVNode("", !0)
															: (e.openBlock(),
															  e.createElementBlock("div", G, [
																	e.createElementVNode(
																		"span",
																		{
																			class: "svc-creator__non-commercial-text",
																			innerHTML:
																				o.value
																					.licenseText,
																		},
																		null,
																		8,
																		j
																	),
															  ])),
														e.createVNode(
															e.unref(l.SvComponent),
															{
																is: "sv-notifier",
																model: o.value.notifier,
															},
															null,
															8,
															["model"]
														),
													],
													2
												),
											],
											6
										),
									],
									64
							  ))
				);
			},
		}),
		J = e.defineComponent({
			__name: "TabbedMenu",
			props: { model: {} },
			setup(i) {
				const n = i,
					o = e.ref();
				return (
					l.useBase(() => n.model),
					e.onUpdated(() => {
						n.model.initResponsivityManager(o.value);
					}),
					e.onMounted(() => {
						n.model.initResponsivityManager(o.value);
					}),
					e.onUnmounted(() => {
						n.model.resetResponsivityManager();
					}),
					(t, s) => (
						e.openBlock(),
						e.createElementBlock(
							"div",
							{
								class: "svc-tabbed-menu",
								ref_key: "container",
								ref: o,
								role: "tablist",
								style: e.normalizeStyle(t.model.getRootStyle()),
							},
							[
								(e.openBlock(!0),
								e.createElementBlock(
									e.Fragment,
									null,
									e.renderList(
										t.model.renderedActions,
										(r) => (
											e.openBlock(),
											e.createBlock(
												e.unref(l.SvComponent),
												{
													key: r.renderedId,
													is: "svc-tabbed-menu-item-wrapper",
													item: r,
												},
												null,
												8,
												["item"]
											)
										)
									),
									128
								)),
							],
							4
						)
					)
				);
			},
		}),
		Z = { class: "sv-action__content" },
		X = e.defineComponent({
			__name: "TabbedMenuItemWrapper",
			props: { item: {} },
			setup(i) {
				const n = e.ref(),
					o = i;
				return (
					l.useBase(() => o.item),
					e.onMounted(() => {
						const t = o.item;
						(t.updateModeCallback = (s, r) => {
							(t.mode = s), e.nextTick(() => r(s, n.value));
						}),
							t.afterRender();
					}),
					e.onUnmounted(() => {
						const t = o.item;
						t.updateModeCallback = void 0;
					}),
					(t, s) => (
						e.openBlock(),
						e.createElementBlock(
							"span",
							{
								class: e.normalizeClass([
									"svc-tabbed-menu-item-container",
									[t.item.isVisible ? "" : "sv-action--hidden", t.item.css],
								]),
								ref_key: "root",
								ref: n,
							},
							[
								e.createElementVNode("div", Z, [
									e.createVNode(
										e.unref(l.SvComponent),
										{
											is: t.item.component || "svc-tabbed-menu-item",
											item: t.item,
										},
										null,
										8,
										["is", "item"]
									),
								]),
							],
							2
						)
					)
				);
			},
		}),
		Y = ["id", "aria-selected", "aria-controls"],
		x = e.defineComponent({
			__name: "TabbedMenuItem",
			props: { item: {} },
			setup(i) {
				const n = i;
				return (
					l.useBase(() => n.item),
					(o, t) =>
						e.withDirectives(
							(e.openBlock(),
							e.createElementBlock(
								"div",
								{
									role: "tab",
									id: "tab-" + o.item.id,
									"aria-selected": o.item.active,
									"aria-controls": "scrollableDiv-" + o.item.id,
									class: e.normalizeClass([
										"svc-tabbed-menu-item",
										o.item.getRootCss(),
									]),
									onClick:
										t[0] ||
										(t[0] = (...s) =>
											o.item.doAction && o.item.doAction(...s)),
								},
								[
									o.item.hasTitle
										? (e.openBlock(),
										  e.createElementBlock(
												"span",
												{
													key: 0,
													class: e.normalizeClass(o.item.getTitleCss()),
												},
												e.toDisplayString(o.item.title),
												3
										  ))
										: e.createCommentVNode("", !0),
									o.item.hasIcon
										? (e.openBlock(),
										  e.createBlock(
												e.unref(l.SvComponent),
												{
													key: 1,
													is: "sv-svg-icon",
													iconName: o.item.iconName,
													size: "auto",
													class: e.normalizeClass(o.item.getIconCss()),
													title: o.item.tooltip || o.item.title,
												},
												null,
												8,
												["iconName", "class", "title"]
										  ))
										: e.createCommentVNode("", !0),
								],
								10,
								Y
							)),
							[[e.unref(l.key2ClickDirective)]]
						)
				);
			},
		}),
		U = { class: "svc-flex-row svc-side-bar__wrapper" },
		v = { class: "svc-side-bar__container-wrapper" },
		ee = { class: "svc-side-bar__container-content" },
		oe = e.defineComponent({
			__name: "SideBar",
			props: { model: {} },
			setup(i) {
				const n = i,
					o = e.ref();
				return (
					l.useBase(() => n.model),
					e.onMounted(() => {
						n.model.initResizeManager(o.value);
					}),
					e.onUnmounted(() => {
						n.model.resetResizeManager();
					}),
					(t, s) =>
						e.withDirectives(
							(e.openBlock(),
							e.createElementBlock(
								"div",
								{ class: e.normalizeClass(["svc-side-bar", t.model.rootCss]) },
								[
									e.withDirectives(
										e.createElementVNode(
											"div",
											{
												class: "svc-side-bar__shadow",
												onClick:
													s[0] ||
													(s[0] = () => t.model.collapseSidebar()),
											},
											null,
											512
										),
										[[e.vShow, t.model.renderContainer]]
									),
									e.createElementVNode("div", U, [
										e.withDirectives(
											e.createElementVNode(
												"div",
												v,
												[
													e.createElementVNode(
														"div",
														{
															class: "svc-side-bar__container",
															ref_key: "root",
															ref: o,
														},
														[
															e.createVNode(
																e.unref(l.SvComponent),
																{
																	is: t.model.header.component,
																	model: t.model.header
																		.componentModel,
																},
																null,
																8,
																["is", "model"]
															),
															e.createElementVNode("div", ee, [
																(e.openBlock(!0),
																e.createElementBlock(
																	e.Fragment,
																	null,
																	e.renderList(
																		t.model.pages,
																		(r, a) => (
																			e.openBlock(),
																			e.createBlock(
																				e.unref(
																					l.SvComponent
																				),
																				{
																					key: a,
																					is: "svc-side-bar-page",
																					model: r,
																				},
																				null,
																				8,
																				["model"]
																			)
																		)
																	),
																	128
																)),
															]),
														],
														512
													),
												],
												512
											),
											[[e.vShow, t.model.renderContainer]]
										),
										t.model.sideAreaComponentName
											? (e.openBlock(),
											  e.createBlock(
													e.unref(l.SvComponent),
													{
														key: 0,
														is: t.model.sideAreaComponentName,
														model: t.model.sideAreaComponentData,
													},
													null,
													8,
													["is", "model"]
											  ))
											: e.createCommentVNode("", !0),
									]),
								],
								2
							)),
							[[e.vShow, t.model.renderRoot]]
						)
				);
			},
		}),
		te = { class: "svc-side-bar__container-header" },
		ne = { class: "svc-side-bar__container-actions" },
		se = { key: 0, class: "svc-side-bar__container-title" },
		le = e.defineComponent({
			__name: "SideBarDefaultHeader",
			props: { model: {} },
			setup(i) {
				const n = i;
				return (
					l.useBase(() => n.model),
					(o, t) => (
						e.openBlock(),
						e.createElementBlock("div", te, [
							e.createElementVNode("div", ne, [
								e.createVNode(
									e.unref(l.SvComponent),
									{ is: "sv-action-bar", model: o.model.toolbar },
									null,
									8,
									["model"]
								),
							]),
							o.model.title
								? (e.openBlock(),
								  e.createElementBlock(
										"div",
										se,
										e.toDisplayString(o.model.title),
										1
								  ))
								: e.createCommentVNode("", !0),
						])
					)
				);
			},
		}),
		ae = e.defineComponent({
			__name: "SideBarPage",
			props: { model: {} },
			setup(i) {
				const n = i;
				return (
					l.useBase(() => n.model),
					(o, t) =>
						o.model.visible
							? (e.openBlock(),
							  e.createBlock(
									e.unref(l.SvComponent),
									{
										key: 0,
										is: o.model.componentName,
										model: o.model.componentData,
									},
									null,
									8,
									["is", "model"]
							  ))
							: e.createCommentVNode("", !0)
				);
			},
		}),
		re = e.defineComponent({
			__name: "ObjectSelector",
			props: { model: {} },
			setup(i) {
				const n = i;
				return (
					l.useBase(() => n.model),
					(o, t) =>
						o.model.isVisible
							? (e.openBlock(),
							  e.createBlock(
									e.unref(l.SvComponent),
									{ key: 0, is: "sv-list", model: o.model.list },
									null,
									8,
									["model"]
							  ))
							: e.createCommentVNode("", !0)
				);
			},
		}),
		ie = e.defineComponent({
			__name: "PropertyGrid",
			props: { model: {} },
			setup(i) {
				const n = i;
				return (
					l.useBase(() => n.model),
					(o, t) => (
						e.openBlock(),
						e.createElementBlock(
							"div",
							{ class: e.normalizeClass(o.model.rootCss) },
							[
								e.createVNode(
									e.unref(l.SvComponent),
									{ is: "svc-search", model: o.model.searchManager },
									null,
									8,
									["model"]
								),
								o.model.survey
									? (e.openBlock(),
									  e.createBlock(
											e.unref(l.SurveyComponent),
											{ key: 0, survey: o.model.survey },
											null,
											8,
											["survey"]
									  ))
									: e.createCommentVNode("", !0),
							],
							2
						)
					)
				);
			},
		}),
		ce = e.defineComponent({
			__name: "Tabs",
			props: { model: {} },
			setup(i) {
				const n = i;
				return (
					l.useBase(() => n.model),
					(o, t) => (
						e.openBlock(!0),
						e.createElementBlock(
							e.Fragment,
							null,
							e.renderList(
								o.model.actions,
								(s, r) => (
									e.openBlock(),
									e.createBlock(
										e.unref(l.SvComponent),
										{ key: r, is: "svc-tab-button", model: s },
										null,
										8,
										["model"]
									)
								)
							),
							128
						)
					)
				);
			},
		}),
		de = { class: "svc-sidebar-tabs__top-container" },
		me = { class: "svc-sidebar-tabs__collapse-button" },
		pe = e.createElementVNode(
			"div",
			{ class: "svc-sidebar-tabs__separator" },
			[e.createElementVNode("div")],
			-1
		),
		ke = { class: "svc-sidebar-tabs__items" },
		fe = { class: "svc-sidebar-tabs__bottom-container" },
		_e = { class: "svc-sidebar-tabs__items" },
		Ce = e.defineComponent({
			__name: "TabControl",
			props: { model: {} },
			setup(i) {
				const n = i;
				return (
					l.useBase(() => n.model),
					(o, t) => (
						e.openBlock(),
						e.createElementBlock(
							"div",
							{ class: e.normalizeClass(o.model.sideBarClassName) },
							[
								e.createElementVNode("div", de, [
									e.createElementVNode("div", me, [
										e.createVNode(
											e.unref(l.SvComponent),
											{
												is: "svc-tab-button",
												model: o.model.expandCollapseAction,
											},
											null,
											8,
											["model"]
										),
									]),
									pe,
									e.createVNode(
										e.unref(l.SvComponent),
										{ is: "sv-scroll" },
										{
											default: e.withCtx(() => [
												e.createElementVNode("div", ke, [
													e.createVNode(
														e.unref(l.SvComponent),
														{
															is: "svc-tabs",
															model: o.model.topToolbar,
														},
														null,
														8,
														["model"]
													),
												]),
											]),
											_: 1,
										}
									),
								]),
								e.createElementVNode("div", fe, [
									e.createElementVNode("div", _e, [
										e.createVNode(
											e.unref(l.SvComponent),
											{ is: "sv-action-bar", model: o.model.bottomToolbar },
											null,
											8,
											["model"]
										),
									]),
								]),
							],
							2
						)
					)
				);
			},
		}),
		ge = { key: 0, class: "svc-menu-action" },
		be = ["title"],
		Be = { class: "svc-menu-action__icon" },
		Ne = { class: "svc-menu-action__icon-container" },
		he = e.defineComponent({
			__name: "TabButton",
			props: { model: {} },
			setup(i) {
				const n = i;
				return (
					l.useBase(() => n.model),
					(o, t) =>
						o.model.visible
							? (e.openBlock(),
							  e.createElementBlock("div", ge, [
									e.withDirectives(
										(e.openBlock(),
										e.createElementBlock(
											"div",
											{
												class: e.normalizeClass(o.model.buttonClassName),
												title: o.model.tooltip,
												onClick: t[0] || (t[0] = (s) => o.model.action()),
											},
											[
												e.createElementVNode("div", Be, [
													e.createElementVNode("div", Ne, [
														e.createVNode(
															e.unref(l.SvComponent),
															{
																is: "sv-svg-icon",
																iconName: o.model.iconName,
																size: "auto",
															},
															null,
															8,
															["iconName"]
														),
													]),
												]),
											],
											10,
											be
										)),
										[
											[
												e.unref(l.key2ClickDirective),
												{
													processEsc: !1,
													disableTabStop: o.model.disableTabStop,
												},
											],
										]
									),
							  ]))
							: e.createCommentVNode("", !0)
				);
			},
		}),
		Ee = { class: "svc-property-grid-placeholder" },
		ye = { class: "svc-property-grid-placeholder__header" },
		we = { class: "svc-property-grid-placeholder__title" },
		Se = { class: "svc-property-grid-placeholder__description" },
		qe = e.createElementVNode(
			"div",
			{ class: "svc-property-grid-placeholder__content" },
			[
				e.createElementVNode("div", { class: "svc-property-grid-placeholder__gap" }),
				e.createElementVNode("div", { class: "svc-property-grid-placeholder__image" }),
			],
			-1
		),
		De = e.defineComponent({
			__name: "PropertyGridPlaceholder",
			setup(i) {
				const n = N.editorLocalization;
				return (o, t) => (
					e.openBlock(),
					e.createElementBlock("div", Ee, [
						e.createElementVNode("div", ye, [
							e.createElementVNode(
								"span",
								we,
								e.toDisplayString(
									e.unref(n).getString("ed.propertyGridPlaceholderTitle")
								),
								1
							),
							e.createElementVNode(
								"span",
								Se,
								e.toDisplayString(
									e.unref(n).getString("ed.propertyGridPlaceholderDescription")
								),
								1
							),
						]),
						qe,
					])
				);
			},
		}),
		$e = { class: "svc-side-bar__container-header svc-sidebar__header-container" },
		ue = { key: 0, class: "svc-side-bar__container-title" },
		Ve = { key: 1, class: "svc-sidebar__header-caption" },
		Te = { class: "svc-sidebar__header-title" },
		Me = { class: "svc-sidebar__header-subtitle" },
		ze = e.defineComponent({
			__name: "SideBarHeader",
			props: { model: {} },
			setup(i) {
				const n = i;
				return (
					l.useBase(() => n.model),
					(o, t) => (
						e.openBlock(),
						e.createElementBlock("div", $e, [
							o.model.subTitle
								? e.createCommentVNode("", !0)
								: (e.openBlock(),
								  e.createElementBlock(
										"div",
										ue,
										e.toDisplayString(o.model.title),
										1
								  )),
							o.model.subTitle
								? (e.openBlock(),
								  e.createElementBlock("div", Ve, [
										e.createElementVNode(
											"span",
											Te,
											e.toDisplayString(o.model.title),
											1
										),
										e.createElementVNode(
											"span",
											Me,
											e.toDisplayString(o.model.subTitle),
											1
										),
								  ]))
								: e.createCommentVNode("", !0),
						])
					)
				);
			},
		}),
		Ie = { class: "svc-sidebar__header svc-sidebar__header--tabbed" },
		Pe = {
			class: "svc-sidebar__header-container svc-sidebar__header-container--with-subtitle",
		},
		Re = { class: "svc-sidebar__header-content" },
		Fe = { class: "svc-sidebar__header-caption" },
		Le = { class: "svc-sidebar__header-title" },
		Ae = { class: "svc-sidebar__header-subtitle" },
		Qe = e.defineComponent({
			__name: "SideBarPropertyGridHeader",
			props: { model: {} },
			setup(i) {
				const n = i;
				return (
					l.useBase(() => n.model),
					(o, t) => (
						e.openBlock(),
						e.createElementBlock("div", Ie, [
							e.createElementVNode("div", Pe, [
								e.createElementVNode("div", Re, [
									e.withDirectives(
										(e.openBlock(),
										e.createElementBlock(
											"div",
											{
												class: e.normalizeClass(o.model.buttonClassName),
												onClick: t[0] || (t[0] = (s) => o.model.action()),
											},
											[
												e.createElementVNode("div", Fe, [
													e.createElementVNode(
														"span",
														Le,
														e.toDisplayString(o.model.title),
														1
													),
													e.createElementVNode(
														"span",
														Ae,
														e.toDisplayString(o.model.tooltip),
														1
													),
												]),
											],
											2
										)),
										[[e.unref(l.key2ClickDirective), { processEsc: !1 }]]
									),
									e.createVNode(
										e.unref(l.SvComponent),
										{ is: "sv-popup", model: o.model.popupModel },
										null,
										8,
										["model"]
									),
								]),
							]),
						])
					)
				);
			},
		}),
		Ke = e.defineComponent({
			__name: "QuestionError",
			props: { errorKey: {}, error: {}, cssClasses: {}, element: {} },
			setup(i) {
				return (n, o) => (
					e.openBlock(),
					e.createElementBlock("div", { key: n.errorKey }, [
						e.createVNode(
							e.unref(l.SvComponent),
							{
								is: "sv-svg-icon",
								class: e.normalizeClass(n.cssClasses.error.icon),
								iconName: "icon-alert_24x24",
								size: "auto",
							},
							null,
							8,
							["class"]
						),
						e.createElementVNode(
							"span",
							{
								class: e.normalizeClass(
									n.cssClasses
										? n.cssClasses.error.item || void 0
										: "panel-error-item"
								),
							},
							[
								e.createVNode(
									e.unref(l.SvComponent),
									{ is: "survey-string", locString: n.error.locText },
									null,
									8,
									["locString"]
								),
							],
							2
						),
					])
				);
			},
		}),
		He = ["title"],
		Oe = ["title"],
		We = ["title"],
		Ge = ["title"],
		je = e.defineComponent({
			__name: "ActionButton",
			props: {
				classes: {},
				selected: { type: Boolean },
				disabled: { type: Boolean },
				text: {},
				title: {},
				allowBubble: { type: Boolean },
				click: { type: Function },
				iconName: {},
			},
			setup(i) {
				const n = i,
					o = (s) => {
						n.click(), n.allowBubble || s.stopPropagation();
					},
					t = () =>
						new q.CssClassBuilder()
							.append(n.classes || "")
							.append("svc-action-button")
							.append("svc-action-button--icon", !!n.iconName)
							.append("svc-action-button--selected", !!n.selected)
							.append("svc-action-button--disabled", !!n.disabled)
							.toString();
				return (s, r) => (
					e.openBlock(),
					e.createElementBlock(
						e.Fragment,
						null,
						[
							s.iconName
								? e.createCommentVNode("", !0)
								: (e.openBlock(),
								  e.createElementBlock(
										e.Fragment,
										{ key: 0 },
										[
											s.disabled
												? (e.openBlock(),
												  e.createElementBlock(
														"span",
														{
															key: 0,
															class: e.normalizeClass([
																"svc-action-button svc-action-button--disabled",
																s.classes,
															]),
															title: s.title,
														},
														e.toDisplayString(s.text),
														11,
														He
												  ))
												: e.createCommentVNode("", !0),
											e.withDirectives(
												(e.openBlock(),
												e.createElementBlock(
													"span",
													{
														role: "button",
														class: e.normalizeClass([
															"svc-action-button",
															t(),
														]),
														onClick: o,
														title: s.title,
													},
													[
														e.createTextVNode(
															e.toDisplayString(s.text),
															1
														),
													],
													10,
													Oe
												)),
												[[e.unref(l.key2ClickDirective)]]
											),
										],
										64
								  )),
							s.iconName
								? (e.openBlock(),
								  e.createElementBlock(
										e.Fragment,
										{ key: 1 },
										[
											s.disabled
												? (e.openBlock(),
												  e.createElementBlock(
														"span",
														{
															key: 0,
															class: e.normalizeClass(t()),
															title: s.title,
														},
														[
															e.createVNode(
																e.unref(l.SvComponent),
																{
																	is: "sv-svg-icon",
																	iconName: s.iconName,
																	size: "auto",
																},
																null,
																8,
																["iconName"]
															),
														],
														10,
														We
												  ))
												: e.createCommentVNode("", !0),
											e.withDirectives(
												(e.openBlock(),
												e.createElementBlock(
													"span",
													{
														role: "button",
														onClick: o,
														class: e.normalizeClass(t()),
														title: s.title,
													},
													[
														e.createVNode(
															e.unref(l.SvComponent),
															{
																is: "sv-svg-icon",
																iconName: s.iconName,
																size: "auto",
															},
															null,
															8,
															["iconName"]
														),
													],
													10,
													Ge
												)),
												[[e.unref(l.key2ClickDirective)]]
											),
										],
										64
								  ))
								: e.createCommentVNode("", !0),
						],
						64
					)
				);
			},
		}),
		Je = ["disabled", "title", "aria-checked", "aria-expanded", "role"],
		Ze = [e.createElementVNode("div", { class: "svc-switcher__icon-thumb" }, null, -1)],
		Xe = { key: 0, class: "svc-switcher__title" },
		Ye = { inheritAttrs: !1 },
		xe = e.defineComponent({
			...Ye,
			__name: "Switcher",
			props: { item: {} },
			setup(i) {
				const n = i;
				return (
					l.useBase(() => n.item),
					(o, t) =>
						e.withDirectives(
							(e.openBlock(),
							e.createElementBlock(
								"button",
								{
									class: e.normalizeClass(o.item.getActionBarItemCss()),
									type: "button",
									onClick:
										t[0] ||
										(t[0] = (s) => {
											o.item.action(o.item, !!s.pointerType);
										}),
									onKeyup:
										t[1] ||
										(t[1] = (s) => {
											s.stopPropagation();
										}),
									disabled: o.item.disabled,
									title: o.item.tooltip || o.item.title,
									"aria-checked": o.item.ariaChecked,
									"aria-expanded": o.item.ariaExpanded,
									role: o.item.ariaRole,
								},
								[
									e.createElementVNode(
										"div",
										{ class: e.normalizeClass(o.item.getSwitcherIconCss()) },
										Ze,
										2
									),
									o.item.hasTitle
										? (e.openBlock(),
										  e.createElementBlock(
												"span",
												Xe,
												e.toDisplayString(o.item.title),
												1
										  ))
										: e.createCommentVNode("", !0),
								],
								42,
								Je
							)),
							[
								[
									e.unref(l.key2ClickDirective),
									{ processEsc: !1, disableTabStop: o.item.disableTabStop },
								],
							]
						)
				);
			},
		}),
		Ue = { key: 0, class: "svd-simulator-content" },
		ve = { class: "svd-simulator-content" },
		eo = e.defineComponent({
			__name: "Simulator",
			props: { model: {} },
			setup(i) {
				const n = i;
				l.useBase(() => n.model);
				const o = e.computed(() => n.model.simulatorFrame),
					t = () => {
						n.model.device !== "desktop" && n.model.activateZoom();
					},
					s = () => {
						n.model.device !== "desktop" && n.model.deactivateZoom();
					};
				return (r, a) => (
					e.openBlock(),
					e.createElementBlock(
						"div",
						{
							class: e.normalizeClass(r.model.getRootCss()),
							onKeydown: a[0] || (a[0] = (c) => r.model.tryToZoom(void 0, c)),
							onMouseover: a[1] || (a[1] = (c) => t()),
							onMouseout: a[2] || (a[2] = (c) => s()),
						},
						[
							r.model.hasFrame
								? e.createCommentVNode("", !0)
								: (e.openBlock(),
								  e.createElementBlock("div", Ue, [
										e.createVNode(
											e.unref(l.SvComponent),
											{ is: "survey-widget", model: r.model.survey },
											null,
											8,
											["model"]
										),
								  ])),
							r.model.hasFrame
								? (e.openBlock(),
								  e.createElementBlock(
										"div",
										{
											key: 1,
											class: "svd-simulator-wrapper",
											id: "svd-simulator-wrapper",
											style: e.normalizeStyle({
												width: o.value.frameWidth + "px",
												height: o.value.frameHeight + "px",
											}),
										},
										[
											e.createElementVNode(
												"div",
												{
													class: "svd-simulator",
													style: e.normalizeStyle({
														width: o.value.deviceWidth + "px",
														height: o.value.deviceHeight + "px",
														transform:
															"scale(" +
															o.value.scale +
															") translate(-50%, -50%)",
													}),
												},
												[
													e.createElementVNode("div", ve, [
														e.createVNode(
															e.unref(l.SvComponent),
															{
																is: "survey-widget",
																model: r.model.survey,
															},
															null,
															8,
															["model"]
														),
													]),
												],
												4
											),
										],
										4
								  ))
								: e.createCommentVNode("", !0),
						],
						34
					)
				);
			},
		}),
		oo = { class: "svc-component-container" },
		to = e.defineComponent({
			__name: "ComponentContainer",
			props: { model: {} },
			setup(i) {
				const n = i;
				return (o, t) => (
					e.openBlock(),
					e.createElementBlock("div", oo, [
						(e.openBlock(!0),
						e.createElementBlock(
							e.Fragment,
							null,
							e.renderList(
								n.model.elements,
								(s, r) => (
									e.openBlock(),
									e.createBlock(
										e.unref(l.SvComponent),
										{ is: s.componentName, model: s.componentData, key: r },
										null,
										8,
										["is", "model"]
									)
								)
							),
							128
						)),
					])
				);
			},
		}),
		no = { class: "svc-surface-placeholder" },
		so = { class: "svc-surface-placeholder__text" },
		lo = { class: "svc-surface-placeholder__title" },
		ao = { class: "svc-surface-placeholder__description" },
		S = e.defineComponent({
			__name: "SurfacePlaceholder",
			props: { name: {}, placeholderTitleText: {}, placeholderDescriptionText: {} },
			setup(i) {
				const n = i;
				return (o, t) => (
					e.openBlock(),
					e.createElementBlock("div", no, [
						e.createElementVNode(
							"div",
							{
								class: e.normalizeClass([
									"svc-surface-placeholder__image",
									"svc-surface-placeholder__image--" + o.name,
								]),
							},
							null,
							2
						),
						e.createElementVNode("div", so, [
							e.createElementVNode(
								"div",
								lo,
								e.toDisplayString(n.placeholderTitleText),
								1
							),
							e.createElementVNode(
								"div",
								ao,
								e.toDisplayString(n.placeholderDescriptionText),
								1
							),
						]),
					])
				);
			},
		}),
		ro = { key: 2, class: "svc-plugin-tab__content-actions svc-test-tab__content-actions" },
		io = e.defineComponent({
			__name: "Test",
			props: { model: {} },
			setup(i) {
				const n = i;
				return (
					l.useBase(() => n.model),
					(o, t) => (
						e.openBlock(),
						e.createElementBlock(
							"div",
							{
								class: e.normalizeClass([
									"svc-creator-tab__content svc-test-tab__content",
									{
										"svc-creator-tab__content--with-toolbar":
											o.model.isPageToolbarVisible,
									},
								]),
							},
							[
								o.model.survey.isEmpty
									? (e.openBlock(),
									  e.createBlock(
											S,
											{
												key: 0,
												name: "preview",
												placeholderTitleText: o.model.placeholderTitleText,
												placeholderDescriptionText:
													o.model.placeholderDescriptionText,
											},
											null,
											8,
											["placeholderTitleText", "placeholderDescriptionText"]
									  ))
									: e.createCommentVNode("", !0),
								o.model.survey.isEmpty
									? e.createCommentVNode("", !0)
									: (e.openBlock(),
									  e.createElementBlock(
											"div",
											{
												key: 1,
												class: "svc-plugin-tab__content",
												onScroll:
													t[0] || (t[0] = (s) => o.model.onScroll()),
											},
											[
												e.createVNode(
													e.unref(l.SvComponent),
													{
														is: "survey-simulator",
														model: o.model.simulator,
													},
													null,
													8,
													["model"]
												),
												o.model.showResults
													? (e.openBlock(),
													  e.createBlock(
															e.unref(l.SvComponent),
															{
																key: 0,
																is: "survey-results",
																survey: o.model.survey,
															},
															null,
															8,
															["survey"]
													  ))
													: e.createCommentVNode("", !0),
											],
											32
									  )),
								o.model.isPageToolbarVisible
									? (e.openBlock(),
									  e.createElementBlock("div", ro, [
											e.createVNode(
												e.unref(l.SvComponent),
												{ is: "sv-action-bar", model: o.model.pages },
												null,
												8,
												["model"]
											),
									  ]))
									: e.createCommentVNode("", !0),
							],
							2
						)
					)
				);
			},
		}),
		co = { class: "svc-btn__text" },
		mo = e.defineComponent({
			inheritAttrs: !1,
			__name: "TestAgain",
			props: { model: {} },
			setup(i) {
				const n = i,
					o = e.computed(() => n.model.testAgainAction);
				return (
					l.useBase(() => o.value),
					(t, s) =>
						e.withDirectives(
							(e.openBlock(),
							e.createElementBlock(
								"div",
								{
									role: "button",
									class: "svc-preview__test-again svc-btn",
									onClick: s[0] || (s[0] = (r) => o.value.action()),
								},
								[
									e.createElementVNode(
										"span",
										co,
										e.toDisplayString(o.value.title),
										1
									),
								]
							)),
							[[e.unref(l.key2ClickDirective)]]
						)
				);
			},
		});
	function h(i, n, o) {
		const t = e.shallowRef(),
			s = e.watch(
				n.map((r) => () => r()),
				() => {
					t.value = i();
				},
				{ immediate: !0 }
			);
		return (
			l.useBase(() => t.value, void 0, o),
			e.onBeforeUnmount(() => {
				s();
			}),
			t
		);
	}
	const po = { key: 0, class: "svd-test-results" },
		ko = { class: "svd-test-results__content" },
		fo = { class: "svd-test-results__header" },
		_o = { class: "svd-test-results__header-text" },
		Co = { class: "svd-test-results__header-types" },
		go = { class: "svd-test-results__text svd-light-bg-color" },
		bo = { class: "svd-test-results__table svd-light-bg-color" },
		Bo = { class: "svd-light-background-color" },
		No = { class: "svd-dark-border-color" },
		ho = { class: "svd-dark-border-color" },
		Eo = e.defineComponent({
			__name: "SurveyResults",
			props: { survey: {} },
			setup(i) {
				const n = i,
					o = h(
						() => (n.survey ? new N.SurveyResultsModel(n.survey) : void 0),
						[() => n.survey]
					);
				return (t, s) =>
					e.unref(o)
						? (e.openBlock(),
						  e.createElementBlock("div", po, [
								e.createElementVNode("div", ko, [
									e.createElementVNode("div", fo, [
										e.createElementVNode(
											"div",
											_o,
											e.toDisplayString(e.unref(o).surveyResultsText),
											1
										),
										e.createElementVNode("div", Co, [
											e.createVNode(
												e.unref(l.SvComponent),
												{
													is: "svc-action-button",
													text: e.unref(o).surveyResultsTableText,
													click: e.unref(o).selectTableClick,
													disabled: !1,
													selected: e.unref(o).isTableSelected,
												},
												null,
												8,
												["text", "click", "selected"]
											),
											e.createVNode(
												e.unref(l.SvComponent),
												{
													is: "svc-action-button",
													text: e.unref(o).surveyResultsJsonText,
													click: e.unref(o).selectJsonClick,
													disabled: !1,
													selected: e.unref(o).isJsonSelected,
												},
												null,
												8,
												["text", "click", "selected"]
											),
										]),
									]),
									e.withDirectives(
										e.createElementVNode(
											"div",
											go,
											[
												e.createElementVNode(
													"div",
													null,
													e.toDisplayString(e.unref(o).resultText),
													1
												),
											],
											512
										),
										[[e.vShow, e.unref(o).resultViewType === "text"]]
									),
									e.withDirectives(
										e.createElementVNode(
											"div",
											bo,
											[
												e.createElementVNode("table", null, [
													e.createElementVNode("thead", null, [
														e.createElementVNode("tr", Bo, [
															e.createElementVNode(
																"th",
																No,
																e.toDisplayString(
																	e.unref(o).resultsTitle
																),
																1
															),
															e.createElementVNode(
																"th",
																ho,
																e.toDisplayString(
																	e.unref(o).resultsDisplayValue
																),
																1
															),
														]),
													]),
													e.createElementVNode("tbody", null, [
														(e.openBlock(!0),
														e.createElementBlock(
															e.Fragment,
															null,
															e.renderList(
																e.unref(o).resultData,
																(r, a) => (
																	e.openBlock(),
																	e.createBlock(
																		e.unref(l.SvComponent),
																		{
																			is: "survey-results-table-row",
																			model: r,
																			key: a,
																		},
																		null,
																		8,
																		["model"]
																	)
																)
															),
															128
														)),
													]),
												]),
											],
											512
										),
										[[e.vShow, e.unref(o).resultViewType === "table"]]
									),
								]),
						  ]))
						: e.createCommentVNode("", !0);
			},
		}),
		yo = { key: 2 },
		wo = e.defineComponent({
			__name: "SurveyResultsRow",
			props: { model: {} },
			setup(i) {
				const n = i;
				return (
					l.useBase(() => n.model),
					(o, t) => (
						e.openBlock(),
						e.createElementBlock(
							e.Fragment,
							null,
							[
								e.withDirectives(
									(e.openBlock(),
									e.createElementBlock(
										"tr",
										{
											onClick:
												t[0] ||
												(t[0] = (...s) =>
													o.model.toggle && o.model.toggle(...s)),
										},
										[
											e.createElementVNode(
												"td",
												{
													class: "svd-dark-border-color",
													style: e.normalizeStyle({
														paddingLeft: o.model.textMargin,
													}),
												},
												[
													o.model.isNode
														? (e.openBlock(),
														  e.createElementBlock(
																"span",
																{
																	key: 0,
																	class: e.normalizeClass([
																		"svd-test-results__marker",
																		{
																			"svd-test-results__marker--expanded":
																				!o.model.collapsed,
																		},
																	]),
																	style: e.normalizeStyle({
																		left: o.model.markerMargin,
																	}),
																},
																[
																	e.createVNode(
																		e.unref(l.SvComponent),
																		{
																			is: "sv-svg-icon",
																			iconName:
																				"icon-expand_16x16",
																			size: 16,
																		}
																	),
																],
																6
														  ))
														: e.createCommentVNode("", !0),
													o.model.question
														? (e.openBlock(),
														  e.createBlock(
																e.unref(l.SvComponent),
																{
																	key: 1,
																	is: "survey-string",
																	locString:
																		o.model.question.locTitle,
																},
																null,
																8,
																["locString"]
														  ))
														: (e.openBlock(),
														  e.createElementBlock(
																"span",
																yo,
																e.toDisplayString(o.model.title),
																1
														  )),
												],
												4
											),
											e.createElementVNode(
												"td",
												{
													class: e.normalizeClass({
														"svd-test-results__node-value":
															o.model.isNode,
														"svd-dark-border-color": !o.model.isNode,
													}),
												},
												e.toDisplayString(
													o.model.getString(o.model.displayValue)
												),
												3
											),
										]
									)),
									[[e.unref(l.key2ClickDirective)]]
								),
								o.model.isNode && !o.model.collapsed
									? (e.openBlock(!0),
									  e.createElementBlock(
											e.Fragment,
											{ key: 0 },
											e.renderList(
												o.model.data,
												(s, r) => (
													e.openBlock(),
													e.createBlock(
														e.unref(l.SvComponent),
														{
															is: "survey-results-table-row",
															model: s,
															key: r + 1,
														},
														null,
														8,
														["model"]
													)
												)
											),
											128
									  ))
									: e.createCommentVNode("", !0),
							],
							64
						)
					)
				);
			},
		}),
		So = { class: "svc-creator-tab__content" },
		qo = { class: "svc-json-editor-tab__content" },
		Do = { class: "svc-json-editor-tab__errros_list" },
		$o = e.defineComponent({
			__name: "JsonEditorAce",
			props: { model: {} },
			setup(i) {
				const n = i,
					o = e.ref();
				return (
					l.useBase(() => n.model),
					e.onMounted(() => n.model.init(window.ace.edit(o.value))),
					(t, s) => (
						e.openBlock(),
						e.createElementBlock("div", So, [
							e.createElementVNode("div", qo, [
								e.createElementVNode(
									"div",
									{
										class: "svc-json-editor-tab__ace-editor",
										ref_key: "inputEl",
										ref: o,
									},
									null,
									512
								),
								e.withDirectives(
									e.createElementVNode(
										"div",
										Do,
										[
											e.createVNode(
												e.unref(l.SvComponent),
												{ is: "sv-list", model: t.model.errorList },
												null,
												8,
												["model"]
											),
										],
										512
									),
									[[e.vShow, t.model.hasErrors]]
								),
							]),
						])
					)
				);
			},
		}),
		uo = { class: "svc-creator-tab__content" },
		Vo = { class: "svc-json-editor-tab__content" },
		To = ["aria-label", "disabled"],
		Mo = { class: "svc-json-editor-tab__errros_list" },
		zo = e.defineComponent({
			__name: "JsonEditorTextArea",
			props: { model: {} },
			setup(i) {
				const n = i,
					o = e.ref(),
					t = n.model;
				return (
					(t.canShowErrors = !1),
					l.useBase(() => n.model),
					e.onMounted(() => {
						const s = n.model;
						s.textElement = o.value;
					}),
					(s, r) => (
						e.openBlock(),
						e.createElementBlock("div", uo, [
							e.createElementVNode("div", Vo, [
								e.withDirectives(
									e.createElementVNode(
										"textarea",
										{
											class: "svc-json-editor-tab__content-area",
											"aria-label": e.unref(t).ariaLabel,
											disabled: e.unref(t).readOnly,
											"onUpdate:modelValue":
												r[0] || (r[0] = (a) => (e.unref(t).text = a)),
											onKeydown:
												r[1] ||
												(r[1] = (a) => e.unref(t).checkKey(e.unref(t), a)),
											ref_key: "inputEl",
											ref: o,
										},
										`
      `,
										40,
										To
									),
									[[e.vModelText, e.unref(t).text]]
								),
								e.withDirectives(
									e.createElementVNode(
										"div",
										Mo,
										[
											e.createVNode(
												e.unref(l.SvComponent),
												{ is: "sv-list", model: e.unref(t).errorList },
												null,
												8,
												["model"]
											),
										],
										512
									),
									[[e.vShow, e.unref(t).hasErrors]]
								),
							]),
						])
					)
				);
			},
		}),
		Io = { class: "svc-json-error__container" },
		Po = { class: "svc-json-error__title" },
		Ro = ["title", "aria-label"],
		Fo = e.defineComponent({
			__name: "JsonEditorErrorItem",
			props: { item: {} },
			setup(i) {
				const n = i;
				l.useBase(() => n.item);
				const o = (t) => {
					t.stopPropagation(), n.item.data.fixError();
				};
				return (t, s) => (
					e.openBlock(),
					e.createElementBlock(
						e.Fragment,
						null,
						[
							e.createVNode(
								e.unref(l.SvComponent),
								{
									is: "sv-svg-icon",
									iconName: t.item.iconName,
									size: t.item.iconSize,
									class: e.normalizeClass("svc-json-error__icon"),
								},
								null,
								8,
								["iconName", "size"]
							),
							e.createElementVNode("div", Io, [
								e.createElementVNode("div", Po, [
									e.createVNode(
										e.unref(l.SvComponent),
										{ is: "survey-string", locString: t.item.locTitle },
										null,
										8,
										["locString"]
									),
								]),
								t.item.data.showFixButton
									? e.withDirectives(
											(e.openBlock(),
											e.createElementBlock(
												"button",
												{
													key: 0,
													type: "button",
													onClick: o,
													title: t.item.data.fixButtonTitle,
													"aria-label": t.item.data.fixButtonTitle,
													class: "svc-json-error__fix-button",
												},
												[
													e.createVNode(
														e.unref(l.SvComponent),
														{
															is: "sv-svg-icon",
															iconName: t.item.data.fixButtonIcon,
															size: "auto",
														},
														null,
														8,
														["iconName"]
													),
												],
												8,
												Ro
											)),
											[[e.unref(l.key2ClickDirective)]]
									  )
									: e.createCommentVNode("", !0),
							]),
						],
						64
					)
				);
			},
		}),
		Lo = { class: "svc-btn__text" },
		T = e.defineComponent({
			__name: "LogicAddButton",
			props: { model: {} },
			setup(i) {
				const n = i;
				l.useBase(() => n.model);
				const o = (t) => {
					t.stopPropagation(), n.model.action();
				};
				return (t, s) =>
					e.withDirectives(
						(e.openBlock(),
						e.createElementBlock(
							"div",
							{
								role: "button",
								class: e.normalizeClass([
									"svc-logic-tab__content-action svc-btn",
									{
										"svc-logic-tab__content-action--disabled":
											t.model.enabled !== void 0 && !t.model.enabled,
									},
								]),
								onClick: o,
							},
							[
								e.createElementVNode(
									"span",
									Lo,
									e.toDisplayString(t.model.title),
									1
								),
							],
							2
						)),
						[[e.unref(l.key2ClickDirective)]]
					);
			},
		}),
		Ao = { class: "svc-creator-tab__content" },
		Qo = { key: 1, class: "svc-logic-tab__content-empty" },
		Ko = e.defineComponent({
			__name: "Logic",
			props: { model: {} },
			setup(i) {
				const n = i;
				return (
					l.useBase(() => n.model),
					(o, t) => (
						e.openBlock(),
						e.createElementBlock("div", Ao, [
							e.createElementVNode(
								"div",
								{
									class: e.normalizeClass([
										"svc-plugin-tab__content svc-logic-tab__content",
										{ "svc-logic-tab--empty": !o.model.hasItems },
									]),
								},
								[
									o.model.hasItems
										? (e.openBlock(),
										  e.createElementBlock(
												e.Fragment,
												{ key: 0 },
												[
													e.createVNode(
														e.unref(l.SurveyComponent),
														{ model: o.model.itemsSurvey },
														null,
														8,
														["model"]
													),
													o.model.readOnly
														? e.createCommentVNode("", !0)
														: (e.openBlock(),
														  e.createBlock(
																T,
																{
																	key: 0,
																	model: o.model.addNewButton,
																},
																null,
																8,
																["model"]
														  )),
												],
												64
										  ))
										: e.createCommentVNode("", !0),
									o.model.hasItems
										? e.createCommentVNode("", !0)
										: (e.openBlock(),
										  e.createElementBlock("div", Qo, [
												e.createVNode(
													S,
													{
														name: "logic",
														placeholderTitleText:
															o.model.placeholderTitleText,
														placeholderDescriptionText:
															o.model.placeholderDescriptionText,
													},
													null,
													8,
													[
														"placeholderTitleText",
														"placeholderDescriptionText",
													]
												),
												o.model.readOnly
													? e.createCommentVNode("", !0)
													: (e.openBlock(),
													  e.createBlock(
															T,
															{
																key: 0,
																model: o.model.addNewButton,
															},
															null,
															8,
															["model"]
													  )),
										  ])),
								],
								2
							),
						])
					)
				);
			},
		}),
		Ho = [
			"id",
			"required",
			"tabindex",
			"disabled",
			"role",
			"aria-required",
			"aria-invalid",
			"aria-errormessage",
			"aria-expanded",
			"aria-label",
			"aria-labelledby",
			"aria-controls",
		],
		Oo = ["id"];
	q.RendererFactory.Instance.registerRenderer("dropdown", "logicoperator", "sv-logic-operator");
	const Wo = e.defineComponent({
			__name: "LogicOperator",
			props: { question: {} },
			setup(i) {
				const n = i,
					o = e.ref(),
					t = e.computed(
						() => n.question.dropdownListModel ?? new q.DropdownListModel(n.question)
					);
				l.useQuestion(n, o, (a) => {
					N.initLogicOperator(a);
				});
				const s = (a) => {
						var c;
						(c = t.value) == null || c.onClick(a);
					},
					r = (a) => {
						var c;
						(c = t.value) == null || c.keyHandler(a);
					};
				return (a, c) => (
					e.openBlock(),
					e.createElementBlock(
						"div",
						{ class: e.normalizeClass(a.question.cssClasses.selectWrapper) },
						[
							a.question.isReadOnly
								? e.createCommentVNode("", !0)
								: (e.openBlock(),
								  e.createElementBlock(
										e.Fragment,
										{ key: 0 },
										[
											e.createElementVNode(
												"div",
												{
													class: e.normalizeClass(
														a.question.getControlClass()
													),
													onClick: s,
													onKeyup: r,
													id: a.question.inputId,
													required: a.question.isRequired,
													tabindex: a.question.isInputReadOnly
														? void 0
														: 0,
													disabled: a.question.isInputReadOnly,
													role: t.value.ariaQuestionRole,
													"aria-required": t.value.ariaQuestionRequired,
													"aria-invalid": t.value.ariaQuestionInvalid,
													"aria-errormessage":
														t.value.ariaQuestionErrorMessage,
													"aria-expanded": t.value.ariaQuestionExpanded,
													"aria-label": t.value.ariaQuestionLabel,
													"aria-labelledby":
														t.value.ariaQuestionLabelledby,
													"aria-controls": t.value.ariaQuestionControls,
												},
												[
													e.createElementVNode(
														"div",
														{
															class: e.normalizeClass(
																a.question.cssClasses.controlValue
															),
														},
														[
															a.question.locReadOnlyText
																? (e.openBlock(),
																  e.createBlock(
																		e.unref(l.SvComponent),
																		{
																			key: 0,
																			is: "survey-string",
																			locString:
																				a.question
																					.locReadOnlyText,
																		},
																		null,
																		8,
																		["locString"]
																  ))
																: e.createCommentVNode("", !0),
														],
														2
													),
												],
												42,
												Ho
											),
											e.createVNode(
												e.unref(l.SvComponent),
												{ is: "sv-popup", model: a.question.popupModel },
												null,
												8,
												["model"]
											),
										],
										64
								  )),
							a.question.isReadOnly
								? (e.openBlock(),
								  e.createElementBlock(
										"div",
										{
											key: 1,
											disabled: "",
											class: e.normalizeClass(a.question.getControlClass()),
											id: a.question.inputId,
										},
										[
											a.question.locReadOnlyText
												? (e.openBlock(),
												  e.createBlock(
														e.unref(l.SvComponent),
														{
															key: 0,
															is: "survey-string",
															locString: a.question.locReadOnlyText,
														},
														null,
														8,
														["locString"]
												  ))
												: e.createCommentVNode("", !0),
										],
										10,
										Oo
								  ))
								: e.createCommentVNode("", !0),
						],
						2
					)
				);
			},
		}),
		Go = e.defineComponent({
			__name: "EmbeddedSurvey",
			props: { question: {} },
			setup(i) {
				const n = i,
					o = e.ref();
				l.useQuestion(n, o);
				const t = e.computed(() => n.question.embeddedSurvey);
				return (s, r) =>
					s.question && t.value && t.value.currentPage
						? (e.openBlock(),
						  e.createBlock(
								e.unref(l.SvComponent),
								{
									key: 0,
									is: "sv-page",
									page: t.value.currentPage,
									survey: t.value,
								},
								null,
								8,
								["page", "survey"]
						  ))
						: e.createCommentVNode("", !0);
			},
		}),
		jo = e.defineComponent({
			inheritAttrs: !1,
			__name: "LinkValue",
			props: { question: {} },
			setup(i) {
				const n = i,
					o = e.ref(),
					t = N.editorLocalization.getString("pe.clear");
				return (
					l.useQuestion(n, o),
					(s, r) => (
						e.openBlock(),
						e.createElementBlock(
							e.Fragment,
							null,
							[
								e.createVNode(
									e.unref(l.SvComponent),
									{
										is: "svc-action-button",
										text: s.question.linkValueText,
										click: s.question.doLinkClick.bind(s.question),
										selected: s.question.isSelected,
										disabled: !s.question.isClickable,
										classes: s.question.linkSetButtonCssClasses,
										title: s.question.tooltip,
										iconName: s.question.iconName,
									},
									null,
									8,
									[
										"text",
										"click",
										"selected",
										"disabled",
										"classes",
										"title",
										"iconName",
									]
								),
								!s.question.isReadOnly && s.question.showClear
									? (e.openBlock(),
									  e.createBlock(
											e.unref(l.SvComponent),
											{
												key: 0,
												is: "svc-action-button",
												text: e.unref(t),
												click: s.question.doClearClick.bind(s.question),
												disabled: !1,
												classes: s.question.linkClearButtonCssClasses,
											},
											null,
											8,
											["text", "click", "classes"]
									  ))
									: e.createCommentVNode("", !0),
							],
							64
						)
					)
				);
			},
		}),
		Jo = { key: 1, class: "st-content" },
		Zo = { class: "svc-flex-column st-strings-wrapper" },
		Xo = { class: "svc-flex-row st-strings-header" },
		Yo = { class: "svc-flex-row svc-plugin-tab__content st-strings" },
		xo = e.defineComponent({
			__name: "Translation",
			props: { model: {} },
			setup(i) {
				const n = i;
				return (
					l.useBase(() => n.model),
					(o, t) => (
						e.openBlock(),
						e.createElementBlock(
							"div",
							{
								class: e.normalizeClass([
									"svc-creator-tab__content svc-translation-tab",
									o.model.isEmpty ? "svc-translation-tab--empty" : "",
								]),
							},
							[
								o.model.isEmpty
									? (e.openBlock(),
									  e.createBlock(
											S,
											{
												key: 0,
												name: "translation",
												placeholderTitleText: o.model.placeholderTitleText,
												placeholderDescriptionText:
													o.model.placeholderDescriptionText,
											},
											null,
											8,
											["placeholderTitleText", "placeholderDescriptionText"]
									  ))
									: e.createCommentVNode("", !0),
								o.model.isEmpty
									? e.createCommentVNode("", !0)
									: (e.openBlock(),
									  e.createElementBlock("div", Jo, [
											e.createElementVNode("div", Zo, [
												e.createElementVNode("div", Xo, [
													e.createVNode(
														e.unref(l.SurveyComponent),
														{ model: o.model.stringsHeaderSurvey },
														null,
														8,
														["model"]
													),
												]),
												e.createElementVNode("div", Yo, [
													e.createVNode(
														e.unref(l.SurveyComponent),
														{ model: o.model.stringsSurvey },
														null,
														8,
														["model"]
													),
												]),
											]),
									  ])),
							],
							2
						)
					)
				);
			},
		}),
		Uo = (i, n) => {
			const o = i.__vccOpts || i;
			for (const [t, s] of n) o[t] = s;
			return o;
		},
		vo = {},
		et = { class: "sd-translation-line-skeleton" };
	function ot(i, n) {
		return e.openBlock(), e.createElementBlock("div", et);
	}
	const tt = Uo(vo, [["render", ot]]),
		nt = e.defineComponent({
			__name: "TranslateFromAction",
			props: { item: {} },
			setup(i) {
				return (n, o) => (
					e.openBlock(),
					e.createElementBlock(
						"div",
						{ class: e.normalizeClass(n.item.data.containerCss) },
						[
							e.createElementVNode(
								"span",
								{ class: e.normalizeClass(n.item.data.additionalTitleCss) },
								e.toDisplayString(n.item.data.additionalTitle),
								3
							),
							e.createVNode(
								e.unref(l.SvComponent),
								{ is: "sv-action-bar-item-dropdown", item: n.item },
								null,
								8,
								["item"]
							),
						],
						2
					)
				);
			},
		}),
		st = { key: 1, class: "svc-plugin-tab__content" },
		lt = { key: 2, class: "svc-plugin-tab__content-actions svc-test-tab__content-actions" },
		at = e.defineComponent({
			__name: "Theme",
			props: { model: {} },
			setup(i) {
				const n = i;
				return (
					l.useBase(() => n.model),
					(o, t) => (
						e.openBlock(),
						e.createElementBlock(
							"div",
							{
								class: e.normalizeClass([
									"svc-creator-tab__content svc-test-tab__content",
									{
										"svc-creator-tab__content--with-toolbar":
											o.model.isPageToolbarVisible,
									},
								]),
							},
							[
								o.model.survey.isEmpty
									? (e.openBlock(),
									  e.createBlock(
											S,
											{
												key: 0,
												name: "theme",
												placeholderTitleText: o.model.placeholderTitleText,
												placeholderDescriptionText:
													o.model.placeholderDescriptionText,
											},
											null,
											8,
											["placeholderTitleText", "placeholderDescriptionText"]
									  ))
									: e.createCommentVNode("", !0),
								o.model.survey.isEmpty
									? e.createCommentVNode("", !0)
									: (e.openBlock(),
									  e.createElementBlock("div", st, [
											e.createVNode(
												e.unref(l.SvComponent),
												{
													is: "survey-simulator",
													model: o.model.simulator,
												},
												null,
												8,
												["model"]
											),
											o.model.showResults
												? (e.openBlock(),
												  e.createBlock(
														e.unref(l.SvComponent),
														{
															key: 0,
															is: "survey-results",
															survey: o.model.survey,
														},
														null,
														8,
														["survey"]
												  ))
												: e.createCommentVNode("", !0),
									  ])),
								o.model.isPageToolbarVisible
									? (e.openBlock(),
									  e.createElementBlock("div", lt, [
											e.createVNode(
												e.unref(l.SvComponent),
												{ is: "sv-action-bar", model: o.model.pages },
												null,
												8,
												["model"]
											),
									  ]))
									: e.createCommentVNode("", !0),
							],
							2
						)
					)
				);
			},
		}),
		rt = [
			"disabled",
			"value",
			"aria-required",
			"aria-labelledby",
			"aria-label",
			"aria-invalid",
			"aria-describedby",
		],
		it = [
			"disabled",
			"id",
			"placeholder",
			"aria-required",
			"aria-labelledby",
			"aria-label",
			"aria-invalid",
			"aria-describedby",
			"value",
		],
		ct = e.defineComponent({
			__name: "Color",
			props: { question: {} },
			setup(i) {
				const n = i;
				return (
					l.useQuestion(n, e.ref()),
					(o, t) => (
						e.openBlock(),
						e.createElementBlock(
							"div",
							{
								class: e.normalizeClass(o.question.cssClasses.root),
								onKeydown:
									t[5] ||
									(t[5] = (...s) =>
										o.question.onKeyDown && o.question.onKeyDown(...s)),
							},
							[
								e.createElementVNode(
									"label",
									{
										class: e.normalizeClass(o.question.getSwatchCss()),
										style: e.normalizeStyle(o.question.getSwatchStyle()),
									},
									[
										e.createVNode(
											e.unref(l.SvComponent),
											{
												is: "sv-svg-icon",
												iconName: o.question.cssClasses.swatchIcon,
												size: "auto",
											},
											null,
											8,
											["iconName"]
										),
										e.createElementVNode(
											"input",
											{
												type: "color",
												disabled: o.question.isInputReadOnly,
												class: e.normalizeClass(
													o.question.cssClasses.colorInput
												),
												value: o.question.renderedColorValue,
												tabindex: "-1",
												onChange:
													t[0] ||
													(t[0] = (...s) =>
														o.question.onColorInputChange &&
														o.question.onColorInputChange(...s)),
												"aria-required":
													o.question.a11y_input_ariaRequired,
												"aria-labelledby":
													o.question.a11y_input_ariaLabelledBy,
												"aria-label": o.question.a11y_input_ariaLabel,
												"aria-invalid": o.question.a11y_input_ariaInvalid,
												"aria-describedby":
													o.question.a11y_input_ariaDescribedBy,
											},
											null,
											42,
											rt
										),
									],
									6
								),
								e.createElementVNode(
									"input",
									{
										autocomplete: "off",
										disabled: o.question.isInputReadOnly,
										id: o.question.inputId,
										placeholder: o.question.renderedPlaceholder,
										"aria-required": o.question.a11y_input_ariaRequired,
										"aria-labelledby": o.question.a11y_input_ariaLabelledBy,
										"aria-label": o.question.a11y_input_ariaLabel,
										"aria-invalid": o.question.a11y_input_ariaInvalid,
										"aria-describedby": o.question.a11y_input_ariaDescribedBy,
										onChange:
											t[1] ||
											(t[1] = (...s) =>
												o.question.onChange && o.question.onChange(...s)),
										onKeyup:
											t[2] ||
											(t[2] = (...s) =>
												o.question.onKeyUp && o.question.onKeyUp(...s)),
										onBlur:
											t[3] ||
											(t[3] = (...s) =>
												o.question.onBlur && o.question.onBlur(...s)),
										onBeforeinput:
											t[4] ||
											(t[4] = (...s) =>
												o.question.onBeforeInput &&
												o.question.onBeforeInput(...s)),
										value: o.question.renderedValue,
										class: e.normalizeClass(o.question.cssClasses.control),
									},
									null,
									42,
									it
								),
								o.question.showDropdownAction
									? (e.openBlock(),
									  e.createElementBlock(
											e.Fragment,
											{ key: 0 },
											[
												e.createElementVNode(
													"div",
													{
														"aria-hidden": "true",
														class: e.normalizeClass(
															o.question.cssClasses
																.choicesButtonWrapper
														),
													},
													[
														e.createVNode(
															e.unref(l.SvComponent),
															{
																is: "sv-action-bar-item",
																item: o.question.dropdownAction,
															},
															null,
															8,
															["item"]
														),
													],
													2
												),
												e.createVNode(
													e.unref(l.SvComponent),
													{
														is: "sv-popup",
														model: o.question.dropdownAction
															.popupModel,
													},
													null,
													8,
													["model"]
												),
											],
											64
									  ))
									: e.createCommentVNode("", !0),
							],
							34
						)
					)
				);
			},
		}),
		dt = e.defineComponent({
			__name: "ColorItem",
			props: { model: {}, item: {} },
			setup(i) {
				const n = i;
				l.useBase(() => n.item);
				const o = () => ({ backgroundColor: n.item.value });
				return (t, s) => (
					e.openBlock(),
					e.createElementBlock(
						e.Fragment,
						null,
						[
							e.createElementVNode(
								"span",
								{
									class: "spg-color-editor__color-swatch",
									style: e.normalizeStyle(o()),
								},
								null,
								4
							),
							e.createVNode(
								e.unref(l.SvComponent),
								{ is: "survey-string", locString: t.item.locTitle },
								null,
								8,
								["locString"]
							),
						],
						64
					)
				);
			},
		}),
		mt = ["disabled", "value", "placeholder"],
		pt = [
			"disabled",
			"id",
			"aria-required",
			"aria-label",
			"aria-invalid",
			"aria-describedby",
			"title",
			"accept",
		],
		kt = ["title", "disabled"],
		ft = ["for", "aria-label"],
		_t = e.defineComponent({
			__name: "File",
			props: { question: {} },
			setup(i) {
				const n = e.ref(),
					o = i;
				return (
					l.useQuestion(o, n),
					(t, s) => (
						e.openBlock(),
						e.createElementBlock(
							"div",
							{
								class: e.normalizeClass(t.question.cssClasses.root),
								onDragenter:
									s[5] ||
									(s[5] = (...r) =>
										t.question.onDragEnter && t.question.onDragEnter(...r)),
								onDragover:
									s[6] ||
									(s[6] = (...r) =>
										t.question.onDragOver && t.question.onDragOver(...r)),
								onDrop:
									s[7] ||
									(s[7] = (...r) =>
										t.question.onDrop && t.question.onDrop(...r)),
								onDragleave:
									s[8] ||
									(s[8] = (...r) =>
										t.question.onDragLeave && t.question.onDragLeave(...r)),
								onKeydown:
									s[9] ||
									(s[9] = (...r) =>
										t.question.onKeyDown && t.question.onKeyDown(...r)),
								ref_key: "root",
								ref: n,
							},
							[
								e.createElementVNode(
									"input",
									{
										type: "text",
										disabled: t.question.isTextInputReadOnly,
										class: e.normalizeClass(t.question.cssClasses.control),
										value: t.question.renderedValue || "",
										onChange:
											s[0] ||
											(s[0] = (...r) =>
												t.question.onInputChange &&
												t.question.onInputChange(...r)),
										onBlur:
											s[1] ||
											(s[1] = (...r) =>
												t.question.onInputBlur &&
												t.question.onInputBlur(...r)),
										placeholder: t.question.renderedPlaceholder,
									},
									null,
									42,
									mt
								),
								e.createElementVNode(
									"input",
									{
										type: "file",
										disabled: t.question.isInputReadOnly,
										class: e.normalizeClass(t.question.cssClasses.fileInput),
										id: t.question.inputId,
										"aria-required": t.question.ariaRequired,
										"aria-label": t.question.ariaLabel,
										"aria-invalid": t.question.ariaInvalid,
										"aria-describedby": t.question.ariaDescribedBy,
										multiple: !1,
										title: t.question.inputTitle,
										tabindex: -1,
										accept: t.question.acceptedTypes,
										onChange:
											s[2] ||
											(s[2] = (...r) =>
												t.question.onFileInputChange &&
												t.question.onFileInputChange(...r)),
									},
									null,
									42,
									pt
								),
								e.createElementVNode(
									"div",
									{
										class: e.normalizeClass(
											t.question.cssClasses.buttonsContainer
										),
									},
									[
										e.withDirectives(
											(e.openBlock(),
											e.createElementBlock(
												"button",
												{
													title: t.question.clearButtonCaption,
													class: e.normalizeClass(
														t.question.cssClasses.clearButton
													),
													disabled:
														t.question.getIsClearButtonDisabled(),
													onClick:
														s[3] ||
														(s[3] = (...r) =>
															t.question.doClean &&
															t.question.doClean(...r)),
												},
												[
													e.createVNode(
														e.unref(l.SvComponent),
														{
															is: "sv-svg-icon",
															iconName:
																t.question.cssClasses
																	.clearButtonIcon,
															size: "auto",
														},
														null,
														8,
														["iconName"]
													),
												],
												10,
												kt
											)),
											[[e.unref(l.key2ClickDirective)]]
										),
										e.withDirectives(
											(e.openBlock(),
											e.createElementBlock(
												"label",
												{
													class: e.normalizeClass(
														t.question.getChooseButtonCss()
													),
													for: t.question.inputId,
													"aria-label": t.question.chooseButtonCaption,
													onClick:
														s[4] ||
														(s[4] = (...r) =>
															t.question.chooseFiles &&
															t.question.chooseFiles(...r)),
												},
												[
													e.createVNode(
														e.unref(l.SvComponent),
														{
															is: "sv-svg-icon",
															iconName:
																t.question.cssClasses
																	.chooseButtonIcon,
															size: "auto",
															title: t.question.chooseButtonCaption,
														},
														null,
														8,
														["iconName", "title"]
													),
												],
												10,
												ft
											)),
											[[e.unref(l.key2ClickDirective)]]
										),
									],
									2
								),
							],
							34
						)
					)
				);
			},
		}),
		Ct = [
			"disabled",
			"id",
			"placeholder",
			"aria-required",
			"aria-label",
			"aria-labelledby",
			"aria-describedby",
			"aria-invalid",
			"aria-errormessage",
			"value",
		],
		gt = ["disabled"],
		bt = ["disabled"],
		Bt = e.defineComponent({
			__name: "SpinEditor",
			props: { question: {} },
			setup(i) {
				const n = i;
				return (
					l.useQuestion(n, e.ref()),
					(o, t) => (
						e.openBlock(),
						e.createElementBlock(
							"div",
							{
								class: e.normalizeClass(o.question.cssClasses.root),
								onKeydown:
									t[18] ||
									(t[18] = (...s) =>
										o.question.onKeyDown && o.question.onKeyDown(...s)),
							},
							[
								e.createElementVNode(
									"input",
									{
										role: "spinbutton",
										autocomplete: "off",
										disabled: o.question.isInputReadOnly,
										id: o.question.inputId,
										placeholder: o.question.renderedPlaceholder,
										"aria-required": o.question.a11y_input_ariaRequired,
										"aria-label": o.question.a11y_input_ariaLabel,
										"aria-labelledby": o.question.a11y_input_ariaLabelledBy,
										"aria-describedby": o.question.a11y_input_ariaDescribedBy,
										"aria-invalid": o.question.a11y_input_ariaInvalid,
										"aria-errormessage":
											o.question.a11y_input_ariaErrormessage,
										onChange:
											t[0] ||
											(t[0] = (...s) =>
												o.question.onChange && o.question.onChange(...s)),
										onKeydown:
											t[1] ||
											(t[1] = (...s) =>
												o.question.onInputKeyDown &&
												o.question.onInputKeyDown(...s)),
										onKeyup:
											t[2] ||
											(t[2] = (...s) =>
												o.question.onKeyUp && o.question.onKeyUp(...s)),
										onBlur:
											t[3] ||
											(t[3] = (...s) =>
												o.question.onBlur && o.question.onBlur(...s)),
										onFocus:
											t[4] ||
											(t[4] = (...s) =>
												o.question.onFocus && o.question.onFocus(...s)),
										onBeforeinput:
											t[5] ||
											(t[5] = (...s) =>
												o.question.onBeforeInput &&
												o.question.onBeforeInput(...s)),
										value: o.question.renderedValue,
										class: e.normalizeClass(o.question.cssClasses.control),
									},
									null,
									42,
									Ct
								),
								e.createElementVNode(
									"span",
									{
										class: e.normalizeClass(
											o.question.cssClasses.buttonsContainer
										),
									},
									[
										e.createElementVNode(
											"button",
											{
												"aria-hidden": "true",
												disabled: o.question.isInputReadOnly,
												class: e.normalizeClass(
													o.question.cssClasses.arrowButton
												),
												onClick:
													t[6] ||
													(t[6] = (...s) =>
														o.question.onDownButtonClick &&
														o.question.onDownButtonClick(...s)),
												onMousedown:
													t[7] ||
													(t[7] = (...s) =>
														o.question.onDownButtonMouseDown &&
														o.question.onDownButtonMouseDown(...s)),
												onMouseup:
													t[8] ||
													(t[8] = (...s) =>
														o.question.onButtonMouseUp &&
														o.question.onButtonMouseUp(...s)),
												onMouseleave:
													t[9] ||
													(t[9] = (...s) =>
														o.question.onButtonMouseLeave &&
														o.question.onButtonMouseLeave(...s)),
												onBlur:
													t[10] ||
													(t[10] = (...s) =>
														o.question.onBlur &&
														o.question.onBlur(...s)),
												onFocus:
													t[11] ||
													(t[11] = (...s) =>
														o.question.onFocus &&
														o.question.onFocus(...s)),
												tabindex: "-1",
											},
											[
												e.createVNode(
													e.unref(l.SvComponent),
													{
														is: "sv-svg-icon",
														iconName:
															o.question.cssClasses
																.decreaseButtonIcon,
														size: "auto",
													},
													null,
													8,
													["iconName"]
												),
											],
											42,
											gt
										),
										e.createElementVNode(
											"button",
											{
												"aria-hidden": "true",
												disabled: o.question.isInputReadOnly,
												class: e.normalizeClass(
													o.question.cssClasses.arrowButton
												),
												onClick:
													t[12] ||
													(t[12] = (...s) =>
														o.question.onUpButtonClick &&
														o.question.onUpButtonClick(...s)),
												onMousedown:
													t[13] ||
													(t[13] = (...s) =>
														o.question.onUpButtonMouseDown &&
														o.question.onUpButtonMouseDown(...s)),
												onMouseup:
													t[14] ||
													(t[14] = (...s) =>
														o.question.onButtonMouseUp &&
														o.question.onButtonMouseUp(...s)),
												onMouseleave:
													t[15] ||
													(t[15] = (...s) =>
														o.question.onButtonMouseLeave &&
														o.question.onButtonMouseLeave(...s)),
												onBlur:
													t[16] ||
													(t[16] = (...s) =>
														o.question.onBlur &&
														o.question.onBlur(...s)),
												onFocus:
													t[17] ||
													(t[17] = (...s) =>
														o.question.onFocus &&
														o.question.onFocus(...s)),
												tabindex: "-1",
											},
											[
												e.createVNode(
													e.unref(l.SvComponent),
													{
														is: "sv-svg-icon",
														iconName:
															o.question.cssClasses
																.increaseButtonIcon,
														size: "auto",
													},
													null,
													8,
													["iconName"]
												),
											],
											42,
											bt
										),
									],
									2
								),
							],
							34
						)
					)
				);
			},
		}),
		Nt = ["disabled", "title"],
		M = e.defineComponent({
			__name: "TextWithReset",
			props: { question: {} },
			setup(i) {
				const n = i,
					o = () => "survey-" + n.question.wrappedQuestionTemplate;
				return (
					l.useQuestion(n, e.ref()),
					l.useBase(() => {
						var t;
						return (t = n.question) == null ? void 0 : t.resetValueAdorner;
					}),
					(t, s) => (
						e.openBlock(),
						e.createElementBlock(
							"div",
							{ class: e.normalizeClass(t.question.getRootClass()) },
							[
								e.createVNode(
									e.unref(l.SvComponent),
									{ is: o(), question: t.question },
									null,
									8,
									["is", "question"]
								),
								e.createElementVNode(
									"button",
									{
										class: e.normalizeClass(t.question.cssClasses.resetButton),
										disabled: t.question.resetValueAdorner.isDisabled,
										onClick:
											s[0] ||
											(s[0] = (...r) =>
												t.question.resetValueAdorner.resetValue &&
												t.question.resetValueAdorner.resetValue(...r)),
										title: t.question.resetValueAdorner.caption,
									},
									[
										e.createVNode(
											e.unref(l.SvComponent),
											{
												is: "sv-svg-icon",
												iconName: t.question.cssClasses.resetButtonIcon,
												size: "auto",
											},
											null,
											8,
											["iconName"]
										),
									],
									10,
									Nt
								),
							],
							2
						)
					)
				);
			},
		}),
		ht = [
			"aria-checked",
			"aria-required",
			"aria-label",
			"aria-labelledby",
			"aria-invalid",
			"aria-errormessage",
		],
		Et = [
			e.createElementVNode(
				"div",
				{ class: "spg-boolean-switch__thumb" },
				[
					e.createElementVNode("div", {
						class: "spg-boolean-switch__thumb-circle spg-boolean-switch__thumb--left",
					}),
				],
				-1
			),
			e.createElementVNode(
				"div",
				{ class: "spg-boolean-switch__thumb" },
				[
					e.createElementVNode("div", {
						class: "spg-boolean-switch__thumb-circle spg-boolean-switch__thumb--right",
					}),
				],
				-1
			),
		],
		yt = { class: "spg-boolean-switch__caption" },
		wt = ["id"];
	q.RendererFactory.Instance.registerRenderer("boolean", "switch", "sv-boolean-switch");
	const St = e.defineComponent({
			inheritAttrs: !1,
			__name: "BooleanSwitch",
			props: { question: {} },
			setup(i) {
				const n = i,
					o = e.ref(null);
				l.useQuestion(n, o);
				const t = e.computed({
					get() {
						return n.question.booleanValue;
					},
					set(s) {
						const r = n.question;
						r.booleanValue = s;
					},
				});
				return (s, r) => (
					e.openBlock(),
					e.createElementBlock(
						"div",
						{
							class: "spg-boolean-switch",
							role: "checkbox",
							"aria-checked": s.question.booleanValue || !1,
							"aria-required": s.question.a11y_input_ariaRequired,
							"aria-label": s.question.a11y_input_ariaLabel,
							"aria-labelledby": s.question.a11y_input_ariaLabelledBy,
							"aria-invalid": s.question.a11y_input_ariaInvalid,
							"aria-errormessage": s.question.a11y_input_ariaErrormessage,
							onClick: r[0] || (r[0] = (a) => (t.value = !t.value)),
						},
						[
							e.withDirectives(
								(e.openBlock(),
								e.createElementBlock(
									"div",
									{
										class: e.normalizeClass([
											"spg-boolean-switch__button",
											s.question.value
												? "spg-boolean-switch__button--checked"
												: "",
										]),
										tabindex: "0",
									},
									Et,
									2
								)),
								[[e.unref(l.key2ClickDirective), { disableTabStop: !0 }]]
							),
							e.createElementVNode("div", yt, [
								e.createElementVNode(
									"div",
									{
										class: "spg-boolean-switch__title",
										id: s.question.labelRenderedAriaID,
									},
									[
										e.createVNode(
											e.unref(l.SvComponent),
											{
												is: "survey-string",
												locString: s.question.locTitle,
											},
											null,
											8,
											["locString"]
										),
									],
									8,
									wt
								),
							]),
						],
						8,
						ht
					)
				);
			},
		}),
		qt = { class: "svc-string-editor__content" },
		Dt = e.createElementVNode(
			"div",
			{ class: "svc-string-editor__border svc-string-editor__border--hover" },
			null,
			-1
		),
		$t = e.createElementVNode(
			"div",
			{ class: "svc-string-editor__border svc-string-editor__border--focus" },
			null,
			-1
		),
		ut = { class: "svc-string-editor__input" },
		Vt = ["textContent", "aria-placeholder", "aria-label", "contenteditable", "tabindex"],
		Tt = ["aria-placeholder", "aria-label", "contenteditable", "tabindex", "innerHTML"],
		Mt = { key: 0, class: "svc-string-editor__error" },
		zt = e.defineComponent({
			__name: "StringEditor",
			props: { locString: {} },
			setup(i) {
				const n = i,
					o = e.computed(() => n.locString.locStr),
					t = e.computed(() => n.locString.creator),
					s = e.ref(),
					r = e.ref(),
					a = h(
						() => {
							const d = new N.StringEditorViewModelBase(o.value, t.value);
							return (
								d.setLocString(o.value),
								(d.blurEditor = () => {
									s.value && (s.value.blur(), (s.value.spellcheck = !1));
								}),
								(d.getEditorElement = () => s.value),
								setTimeout(() => d.afterRender()),
								d
							);
						},
						[() => t.value, () => o.value],
						(d) => {
							d &&
								((d.blurEditor = void 0),
								(d.getEditorElement = void 0),
								d.dispose());
						}
					),
					c = e.computed(() => {
						var d;
						return (d = a.value) == null ? void 0 : d.errorText;
					}),
					_ = e.computed(() => {
						var d;
						return (d = a.value) == null ? void 0 : d.className(o.value.renderedHtml);
					}),
					k = e.computed(() => {
						var d;
						return (d = a.value) == null ? void 0 : d.placeholder;
					}),
					p = e.computed(() => {
						var d;
						return (d = a.value) == null ? void 0 : d.contentEditable;
					}),
					m = e.computed(() => {
						var d;
						return (d = a.value) == null ? void 0 : d.characterCounter;
					}),
					b = e.computed(() => {
						var d;
						return (d = a.value) == null ? void 0 : d.showCharacterCounter;
					}),
					E = e.computed(() => {
						var d;
						return (d = a.value) == null ? void 0 : d.getCharacterCounterClass;
					}),
					D = (d) => {
						var f, B;
						return (
							s.value && (s.value.spellcheck = !1),
							(o.value.__isEditing = !1),
							(f = a.value) == null || f.onBlur(d),
							(B = a.value) == null ? void 0 : B.errorText
						);
					},
					w = (d) => {
						var f;
						(f = a.value) == null || f.onFocus(d);
					},
					Dl = (d) => {
						var f;
						(f = a.value) == null || f.onPaste(d);
					},
					R = (d) => {
						var f, B;
						(f = s.value) == null || f.focus(),
							(o.value.__isEditing = !0),
							(B = a.value) == null || B.onClick(d);
					},
					$ = () => {
						r.value = o.value.renderedHtml;
					},
					$l = e.watch(
						() => o.value,
						(d, f) => {
							f && d.onStringChanged.remove($), d && (d.onStringChanged.add($), $());
						},
						{ immediate: !0 }
					);
				return (
					e.onMounted(() => {
						var d;
						o.value.__isEditing && ((d = s.value) == null || d.focus());
					}),
					e.onUnmounted(() => {
						$l(), o.value.onStringChanged.remove($);
					}),
					(d, f) => (
						e.openBlock(),
						e.createElementBlock(
							"span",
							{ class: e.normalizeClass(_.value) },
							[
								e.createElementVNode("span", qt, [
									Dt,
									$t,
									e.createElementVNode("span", ut, [
										o.value.hasHtml
											? e.createCommentVNode("", !0)
											: (e.openBlock(),
											  e.createElementBlock(
													"span",
													{
														key: 0,
														role: "textbox",
														class: "sv-string-editor",
														spellcheck: "false",
														onFocus: w,
														onPaste: Dl,
														onBlur: D,
														onInput:
															f[0] ||
															(f[0] = (...B) => {
																var C, g;
																return (
																	((C = e.unref(a)) == null
																		? void 0
																		: C.onInput) &&
																	((g = e.unref(a)) == null
																		? void 0
																		: g.onInput(...B))
																);
															}),
														onBeforeinput:
															f[1] ||
															(f[1] = (...B) => {
																var C, g;
																return (
																	((C = e.unref(a)) == null
																		? void 0
																		: C.onBeforeInput) &&
																	((g = e.unref(a)) == null
																		? void 0
																		: g.onBeforeInput(...B))
																);
															}),
														onKeydown:
															f[2] ||
															(f[2] = (...B) => {
																var C, g;
																return (
																	((C = e.unref(a)) == null
																		? void 0
																		: C.onKeyDown) &&
																	((g = e.unref(a)) == null
																		? void 0
																		: g.onKeyDown(...B))
																);
															}),
														onKeyup:
															f[3] ||
															(f[3] = (...B) => {
																var C, g;
																return (
																	((C = e.unref(a)) == null
																		? void 0
																		: C.onKeyUp) &&
																	((g = e.unref(a)) == null
																		? void 0
																		: g.onKeyUp(...B))
																);
															}),
														onCompositionstart:
															f[4] ||
															(f[4] = (...B) => {
																var C, g;
																return (
																	((C = e.unref(a)) == null
																		? void 0
																		: C.onCompositionStart) &&
																	((g = e.unref(a)) == null
																		? void 0
																		: g.onCompositionStart(
																				...B
																		  ))
																);
															}),
														onCompositionend:
															f[5] ||
															(f[5] = (...B) => {
																var C, g;
																return (
																	((C = e.unref(a)) == null
																		? void 0
																		: C.onCompositionEnd) &&
																	((g = e.unref(a)) == null
																		? void 0
																		: g.onCompositionEnd(...B))
																);
															}),
														onMouseup:
															f[6] ||
															(f[6] = (...B) => {
																var C, g;
																return (
																	((C = e.unref(a)) == null
																		? void 0
																		: C.onMouseUp) &&
																	((g = e.unref(a)) == null
																		? void 0
																		: g.onMouseUp(...B))
																);
															}),
														onClick: R,
														textContent: r.value,
														"aria-placeholder": k.value,
														"aria-label":
															k.value || "content editable",
														contenteditable: p.value,
														tabindex: e.unref(a).tabIndex,
														ref_key: "root",
														ref: s,
													},
													null,
													40,
													Vt
											  )),
										o.value.hasHtml
											? (e.openBlock(),
											  e.createElementBlock(
													"span",
													{
														key: 1,
														role: "textbox",
														class: "sv-string-editor sv-string-editor--html",
														spellcheck: "false",
														onFocus: w,
														onBlur: D,
														onKeydown:
															f[7] ||
															(f[7] = (...B) => {
																var C, g;
																return (
																	((C = e.unref(a)) == null
																		? void 0
																		: C.onKeyDown) &&
																	((g = e.unref(a)) == null
																		? void 0
																		: g.onKeyDown(...B))
																);
															}),
														onKeyup:
															f[8] ||
															(f[8] = (...B) => {
																var C, g;
																return (
																	((C = e.unref(a)) == null
																		? void 0
																		: C.onKeyUp) &&
																	((g = e.unref(a)) == null
																		? void 0
																		: g.onKeyUp(...B))
																);
															}),
														onCompositionstart:
															f[9] ||
															(f[9] = (...B) => {
																var C, g;
																return (
																	((C = e.unref(a)) == null
																		? void 0
																		: C.onCompositionStart) &&
																	((g = e.unref(a)) == null
																		? void 0
																		: g.onCompositionStart(
																				...B
																		  ))
																);
															}),
														onCompositionend:
															f[10] ||
															(f[10] = (...B) => {
																var C, g;
																return (
																	((C = e.unref(a)) == null
																		? void 0
																		: C.onCompositionEnd) &&
																	((g = e.unref(a)) == null
																		? void 0
																		: g.onCompositionEnd(...B))
																);
															}),
														onMouseup:
															f[11] ||
															(f[11] = (...B) => {
																var C, g;
																return (
																	((C = e.unref(a)) == null
																		? void 0
																		: C.onMouseUp) &&
																	((g = e.unref(a)) == null
																		? void 0
																		: g.onMouseUp(...B))
																);
															}),
														onClick: R,
														"aria-placeholder": k.value,
														"aria-label":
															k.value || "content editable",
														contenteditable: p.value,
														tabindex: e.unref(a).tabIndex,
														innerHTML: r.value,
														ref_key: "root",
														ref: s,
													},
													null,
													40,
													Tt
											  ))
											: e.createCommentVNode("", !0),
										b.value
											? (e.openBlock(),
											  e.createBlock(
													e.unref(l.SvComponent),
													{
														key: 2,
														is: "sv-character-counter",
														counter: m.value,
														remainingCharacterCounter: E.value,
													},
													null,
													8,
													["counter", "remainingCharacterCounter"]
											  ))
											: e.createCommentVNode("", !0),
									]),
								]),
								c.value
									? (e.openBlock(),
									  e.createElementBlock(
											"span",
											Mt,
											e.toDisplayString(c.value),
											1
									  ))
									: e.createCommentVNode("", !0),
							],
							2
						)
					)
				);
			},
		}),
		It = { key: 0, class: "svc-toolbox__search-container" },
		Pt = e.createElementVNode(
			"div",
			{ class: "svc-toolbox__category-separator svc-toolbox__category-separator--search" },
			null,
			-1
		),
		Rt = { key: 1, class: "svc-toolbox__placeholder" },
		Ft = { key: 1, class: "svc-toolbox__category" },
		Lt = e.defineComponent({
			__name: "AdaptiveToolbox",
			props: { model: {} },
			setup(i) {
				const n = i,
					o = e.computed(() => n.model.toolbox),
					t = e.ref();
				l.useBase(() => o.value),
					e.onUpdated(() => {
						o.value.afterRender(t.value);
					}),
					e.onMounted(() => {
						o.value.afterRender(t.value);
					}),
					e.onUnmounted(() => {
						o.value.beforeDestroy();
					});
				const s = e.computed(() => o.value.renderedActions);
				return (r, a) => (
					e.openBlock(),
					e.createElementBlock(
						"div",
						{
							class: e.normalizeClass(o.value.classNames),
							ref_key: "root",
							ref: t,
							style: e.normalizeStyle(o.value.getRootStyle()),
						},
						[
							e.createElementVNode(
								"div",
								{
									onFocusout: a[0] || (a[0] = (c) => o.value.focusOut(c)),
									class: "svc-toolbox__panel",
								},
								[
									o.value.showSearch
										? (e.openBlock(),
										  e.createElementBlock("div", It, [
												o.value.isCompactRendered
													? (e.openBlock(),
													  e.createBlock(
															e.unref(l.SvComponent),
															{
																is: "svc-toolbox-tool",
																creator: r.model,
																key: "searchitem",
																item: o.value.searchItem,
																parentModel: o.value,
																isCompact:
																	o.value.isCompactRendered,
															},
															null,
															8,
															[
																"creator",
																"item",
																"parentModel",
																"isCompact",
															]
													  ))
													: e.createCommentVNode("", !0),
												e.createVNode(
													e.unref(l.SvComponent),
													{
														is: "svc-search",
														model: o.value.searchManager,
													},
													null,
													8,
													["model"]
												),
												Pt,
										  ]))
										: e.createCommentVNode("", !0),
									o.value.showPlaceholder
										? (e.openBlock(),
										  e.createElementBlock(
												"div",
												Rt,
												e.toDisplayString(o.value.toolboxNoResultsFound),
												1
										  ))
										: e.createCommentVNode("", !0),
									e.createVNode(
										e.unref(l.SvComponent),
										{ is: "sv-scroll" },
										{
											default: e.withCtx(() => [
												o.value.showInSingleCategory
													? e.createCommentVNode("", !0)
													: (e.openBlock(!0),
													  e.createElementBlock(
															e.Fragment,
															{ key: 0 },
															e.renderList(
																o.value.categories,
																(c, _) => (
																	e.openBlock(),
																	e.createBlock(
																		e.unref(l.SvComponent),
																		{
																			is: "svc-toolbox-category",
																			key: _,
																			category: c,
																			toolbox: o.value,
																		},
																		null,
																		8,
																		["category", "toolbox"]
																	)
																)
															),
															128
													  )),
												o.value.showInSingleCategory
													? (e.openBlock(),
													  e.createElementBlock("div", Ft, [
															(e.openBlock(!0),
															e.createElementBlock(
																e.Fragment,
																null,
																e.renderList(
																	s.value,
																	(c) => (
																		e.openBlock(),
																		e.createBlock(
																			e.unref(l.SvComponent),
																			{
																				key: c.renderedId,
																				is: "svc-toolbox-tool",
																				creator: r.model,
																				item: c,
																				parentModel:
																					o.value,
																				isCompact:
																					o.value
																						.isCompactRendered,
																			},
																			null,
																			8,
																			[
																				"creator",
																				"item",
																				"parentModel",
																				"isCompact",
																			]
																		)
																	)
																),
																128
															)),
													  ]))
													: e.createCommentVNode("", !0),
											]),
											_: 1,
										}
									),
								],
								32
							),
						],
						6
					)
				);
			},
		}),
		At = { key: 0, class: "svc-toolbox__category-separator" },
		Qt = e.defineComponent({
			__name: "ToolboxTool",
			props: { creator: {}, item: {}, parentModel: {}, isCompact: { type: Boolean } },
			setup(i) {
				const n = i,
					o = h(
						() => new N.ToolboxToolViewModel(n.item, n.creator, n.parentModel),
						[() => n.creator, () => n.item],
						(s) => {
							s.dispose();
						}
					),
					t = e.ref();
				return (
					e.onMounted(() => {
						const s = n.item;
						(s.updateModeCallback = (r, a) => {
							(s.mode = r), e.nextTick(() => a(r, t.value));
						}),
							s.afterRender();
					}),
					e.onUnmounted(() => {
						const s = n.item;
						s.updateModeCallback = void 0;
					}),
					l.useBase(() => n.item),
					(s, r) => {
						var a;
						return (
							e.openBlock(),
							e.createElementBlock(
								"div",
								{ class: e.normalizeClass(s.item.css), ref_key: "root", ref: t },
								[
									s.item.needSeparator && !s.creator.toolbox.showCategoryTitles
										? (e.openBlock(), e.createElementBlock("div", At))
										: e.createCommentVNode("", !0),
									e.createElementVNode(
										"div",
										{
											class: "svc-toolbox__tool-content sv-action__content",
											onPointerdown:
												r[0] ||
												(r[0] = (...c) => {
													var _, k;
													return (
														((_ = e.unref(o)) == null
															? void 0
															: _.onPointerDown) &&
														((k = e.unref(o)) == null
															? void 0
															: k.onPointerDown(...c))
													);
												}),
										},
										[
											e.createVNode(
												e.unref(l.SvComponent),
												{
													viewModel: e.unref(o),
													is:
														(a = e.unref(o)) == null
															? void 0
															: a.itemComponent,
													item: s.item,
													creator: s.creator,
													isCompact: s.isCompact,
												},
												null,
												8,
												["viewModel", "is", "item", "creator", "isCompact"]
											),
										],
										32
									),
								],
								2
							)
						);
					}
				);
			},
		}),
		Kt = ["aria-label", "title"],
		Ht = { class: "svc-toolbox__item-container" },
		Ot = { key: 0, class: "svc-toolbox__item-title" },
		Wt = e.defineComponent({
			__name: "ToolboxItem",
			props: { creator: {}, item: {}, isCompact: { type: Boolean }, viewModel: {} },
			setup(i) {
				return (n, o) => (
					e.openBlock(),
					e.createElementBlock(
						e.Fragment,
						null,
						[
							e.withDirectives(
								(e.openBlock(),
								e.createElementBlock(
									"div",
									{
										class: e.normalizeClass([
											"svc-toolbox__item",
											n.item.renderedCss,
										]),
										role: "button",
										"aria-label": n.item.getTooltip(),
										title: n.item.getTooltip(),
										onClick: o[0] || (o[0] = (t) => n.viewModel.click(t)),
									},
									[
										e.createElementVNode("span", Ht, [
											n.item.iconName
												? (e.openBlock(),
												  e.createBlock(
														e.unref(l.SvComponent),
														{
															key: 0,
															is: "sv-svg-icon",
															iconName: n.item.iconName,
															size: "auto",
															class: "svc-toolbox__item-icon",
														},
														null,
														8,
														["iconName"]
												  ))
												: e.createCommentVNode("", !0),
										]),
										n.isCompact
											? e.createCommentVNode("", !0)
											: (e.openBlock(),
											  e.createElementBlock(
													"span",
													Ot,
													e.toDisplayString(n.item.title),
													1
											  )),
									],
									10,
									Kt
								)),
								[
									[
										e.unref(l.key2ClickDirective),
										{ disableTabStop: !n.viewModel.toolboxItem.enabled },
									],
								]
							),
							n.isCompact
								? (e.openBlock(),
								  e.createElementBlock(
										"span",
										{
											key: 0,
											class: "svc-toolbox__item-banner",
											onClick: o[1] || (o[1] = (t) => n.viewModel.click(t)),
										},
										[
											e.createVNode(
												e.unref(l.SvComponent),
												{
													is: "sv-svg-icon",
													iconName: n.item.iconName,
													size: 24,
													class: "svc-toolbox__item-icon",
												},
												null,
												8,
												["iconName"]
											),
											e.createElementVNode(
												"span",
												null,
												e.toDisplayString(n.item.title),
												1
											),
										]
								  ))
								: e.createCommentVNode("", !0),
						],
						64
					)
				);
			},
		}),
		Gt = e.defineComponent({
			__name: "ToolboxItemGroup",
			props: { creator: {}, item: {}, isCompact: { type: Boolean }, viewModel: {} },
			setup(i) {
				const n = i,
					o = (s) => {
						n.viewModel.onMouseOver(n.item, s);
					},
					t = (s) => {
						n.viewModel.onMouseLeave(n.item, s);
					};
				return (s, r) => (
					e.openBlock(),
					e.createElementBlock(
						e.Fragment,
						null,
						[
							e.createVNode(
								e.unref(l.SvComponent),
								{
									is: "svc-toolbox-item",
									viewModel: s.viewModel,
									item: s.item,
									creator: s.creator,
									isCompact: s.isCompact,
								},
								null,
								8,
								["viewModel", "item", "creator", "isCompact"]
							),
							e.createElementVNode(
								"div",
								{
									class: "svc-toolbox__item-submenu-button",
									onMouseover: o,
									onMouseleave: t,
								},
								[
									e.createVNode(
										e.unref(l.SvComponent),
										{
											is: "sv-svg-icon",
											iconName: s.item.subitemsButtonIcon,
											size: "auto",
										},
										null,
										8,
										["iconName"]
									),
									e.createVNode(
										e.unref(l.SvComponent),
										{ is: "sv-popup", model: s.item.popupModel },
										null,
										8,
										["model"]
									),
								],
								32
							),
						],
						64
					)
				);
			},
		}),
		jt = { className: "svc-toolbox__category-header-wrapper" },
		Jt = { class: "svc-toolbox__category-title" },
		Zt = { key: 0, class: "svc-toolbox__category-header__controls" },
		Xt = e.defineComponent({
			__name: "ToolboxCategory",
			props: { category: {}, toolbox: {} },
			setup(i) {
				const n = i;
				return (
					l.useBase(() => n.category),
					(o, t) => (
						e.openBlock(),
						e.createElementBlock(
							"div",
							{
								class: e.normalizeClass([
									"svc-toolbox__category",
									{
										"svc-toolbox__category--collapsed": o.category.collapsed,
										"svc-toolbox__category--empty": o.category.empty,
									},
								]),
							},
							[
								e.createElementVNode("div", jt, [
									e.withDirectives(
										(e.openBlock(),
										e.createElementBlock(
											"div",
											{
												class: e.normalizeClass([
													"svc-toolbox__category-header",
													{
														"svc-toolbox__category-header--collapsed":
															o.toolbox.canCollapseCategories,
													},
												]),
												onClick:
													t[0] ||
													(t[0] = (s) => o.category.toggleState()),
											},
											[
												e.createElementVNode("span", Jt, [
													e.createVNode(
														e.unref(l.SvComponent),
														{
															is: "survey-string",
															locString: o.category.locTitle,
														},
														null,
														8,
														["locString"]
													),
												]),
												o.toolbox.canCollapseCategories
													? (e.openBlock(),
													  e.createElementBlock("div", Zt, [
															e.createVNode(
																e.unref(l.SvComponent),
																{
																	is: "sv-svg-icon",
																	iconName: o.category.iconName,
																	class: e.normalizeClass(
																		o.category.iconClassName
																	),
																	size: "auto",
																},
																null,
																8,
																["iconName", "class"]
															),
													  ]))
													: e.createCommentVNode("", !0),
											],
											2
										)),
										[[e.unref(l.key2ClickDirective)]]
									),
								]),
								(e.openBlock(!0),
								e.createElementBlock(
									e.Fragment,
									null,
									e.renderList(
										o.category.items,
										(s) => (
											e.openBlock(),
											e.createBlock(
												e.unref(l.SvComponent),
												{
													is: "svc-toolbox-tool",
													item: s,
													key: s.renderedId,
													creator: o.toolbox.creator,
													parentModel: o.toolbox,
													isCompact: !1,
												},
												null,
												8,
												["item", "creator", "parentModel"]
											)
										)
									),
									128
								)),
							],
							2
						)
					)
				);
			},
		}),
		Yt = e.defineComponent({
			__name: "ToolboxList",
			props: { model: {}, creator: {} },
			setup(i) {
				const n = i;
				return (
					l.useBase(() => n.model),
					(o, t) => (
						e.openBlock(),
						e.createElementBlock(
							"div",
							{ class: e.normalizeClass(o.model.cssClasses.root) },
							[
								(e.openBlock(!0),
								e.createElementBlock(
									e.Fragment,
									null,
									e.renderList(
										o.model.renderedActions,
										(s, r) => (
											e.openBlock(),
											e.createBlock(
												e.unref(l.SvComponent),
												{
													key: r,
													is: "svc-toolbox-tool",
													creator: o.creator,
													item: s,
													parentModel: o.model,
													isCompact: !1,
												},
												null,
												8,
												["creator", "item", "parentModel"]
											)
										)
									),
									128
								)),
							],
							2
						)
					)
				);
			},
		}),
		xt = { class: "svc-flex-column" },
		Ut = { class: "svc-tab-designer_content" },
		vt = { key: 0, class: "svc-designer-header" },
		en = {
			class: "svc-designer__placeholder-container",
			"data-sv-drop-target-survey-element": "newGhostPage",
		},
		on = {
			className: "svc-designer-placeholder-page",
			"data-sv-drop-target-survey-element": "newGhostPage",
		},
		tn = { key: 0, class: "svc-designer-header" },
		nn = ["data-sv-drop-target-survey-element", "data-sv-drop-target-page"],
		sn = ["data-sv-drop-target-survey-element", "data-sv-drop-target-page"],
		ln = { key: 0, class: "svc-tab-designer__tools" },
		an = { key: 0, class: "svc-tab-designer__page-navigator" },
		rn = { key: 1, class: "svc-tab-designer__toolbar" },
		cn = e.defineComponent({
			__name: "Designer",
			props: { model: {} },
			setup(i) {
				const n = i,
					o = e.computed(() => n.model.survey);
				return (
					l.useBase(() => n.model),
					l.useBase(() => o.value),
					l.useBase(() => n.model.pagesController),
					(t, s) => (
						e.openBlock(),
						e.createElementBlock(
							e.Fragment,
							null,
							[
								e.createElementVNode("div", xt, [
									t.model.isToolboxVisible
										? (e.openBlock(),
										  e.createBlock(
												e.unref(l.SvComponent),
												{
													key: 0,
													is: "svc-toolbox",
													model: t.model.creator,
												},
												null,
												8,
												["model"]
										  ))
										: e.createCommentVNode("", !0),
								]),
								e.createElementVNode(
									"div",
									{
										class: e.normalizeClass([
											"svc-tab-designer",
											t.model.getRootCss(),
										]),
										onClick:
											s[0] ||
											(s[0] = (...r) =>
												t.model.clickDesigner &&
												t.model.clickDesigner(...r)),
									},
									[
										e.createVNode(
											e.unref(l.SvComponent),
											{ is: "sv-scroll" },
											{
												default: e.withCtx(() => [
													e.createElementVNode("div", Ut, [
														t.model.showPlaceholder
															? (e.openBlock(),
															  e.createElementBlock(
																	e.Fragment,
																	{ key: 0 },
																	[
																		t.model.creator
																			.showHeaderInEmptySurvey &&
																		t.model.creator
																			.showSurveyHeader
																			? (e.openBlock(),
																			  e.createElementBlock(
																					"div",
																					vt,
																					[
																						e.createVNode(
																							e.unref(
																								l.SvComponent
																							),
																							{
																								is: "survey-header",
																								survey: t
																									.model
																									.creator
																									.survey,
																							},
																							null,
																							8,
																							[
																								"survey",
																							]
																						),
																					]
																			  ))
																			: e.createCommentVNode(
																					"",
																					!0
																			  ),
																		e.createElementVNode(
																			"div",
																			en,
																			[
																				e.createVNode(
																					S,
																					{
																						name: "designer",
																						placeholderTitleText:
																							t.model
																								.placeholderTitleText,
																						placeholderDescriptionText:
																							t.model
																								.placeholderDescriptionText,
																					},
																					null,
																					8,
																					[
																						"placeholderTitleText",
																						"placeholderDescriptionText",
																					]
																				),
																				e.createElementVNode(
																					"div",
																					on,
																					[
																						e.createVNode(
																							e.unref(
																								l.SvComponent
																							),
																							{
																								is: "svc-page",
																								survey: t
																									.model
																									.creator
																									.survey,
																								creator:
																									t
																										.model
																										.creator,
																								page: t
																									.model
																									.newPage,
																								isGhost:
																									!0,
																							},
																							null,
																							8,
																							[
																								"survey",
																								"creator",
																								"page",
																							]
																						),
																					]
																				),
																			]
																		),
																	],
																	64
															  ))
															: e.createCommentVNode("", !0),
														t.model.showPlaceholder
															? e.createCommentVNode("", !0)
															: (e.openBlock(),
															  e.createElementBlock(
																	e.Fragment,
																	{ key: 1 },
																	[
																		e.createElementVNode(
																			"div",
																			{
																				class: e.normalizeClass(
																					t.model
																						.designerCss
																				),
																				style: e.normalizeStyle(
																					[
																						{
																							maxWidth:
																								t
																									.model
																									.survey
																									.renderedWidth,
																						},
																						t.model
																							.surfaceCssVariables,
																					]
																				),
																			},
																			[
																				t.model.creator
																					.showSurveyHeader
																					? (e.openBlock(),
																					  e.createElementBlock(
																							"div",
																							tn,
																							[
																								e.createVNode(
																									e.unref(
																										l.SvComponent
																									),
																									{
																										is: "survey-header",
																										survey: t
																											.model
																											.creator
																											.survey,
																									},
																									null,
																									8,
																									[
																										"survey",
																									]
																								),
																							]
																					  ))
																					: e.createCommentVNode(
																							"",
																							!0
																					  ),
																				t.model.creator
																					.pageEditMode !==
																				"bypage"
																					? (e.openBlock(
																							!0
																					  ),
																					  e.createElementBlock(
																							e.Fragment,
																							{
																								key: 1,
																							},
																							e.renderList(
																								t
																									.model
																									.pages,
																								(
																									r
																								) => (
																									e.openBlock(),
																									e.createElementBlock(
																										"div",
																										{
																											key: r.id,
																											class: "svc-page",
																											"data-sv-drop-target-survey-element":
																												r !=
																												t
																													.model
																													.newPage
																													? r.name
																													: "newGhostPage",
																											"data-sv-drop-target-page":
																												r.name,
																										},
																										[
																											e.createVNode(
																												e.unref(
																													l.SvComponent
																												),
																												{
																													is: "svc-page",
																													survey: t
																														.model
																														.creator
																														.survey,
																													creator:
																														t
																															.model
																															.creator,
																													page: r,
																													isGhost:
																														r ==
																														t
																															.model
																															.newPage,
																												},
																												null,
																												8,
																												[
																													"survey",
																													"creator",
																													"page",
																													"isGhost",
																												]
																											),
																										],
																										8,
																										nn
																									)
																								)
																							),
																							128
																					  ))
																					: e.createCommentVNode(
																							"",
																							!0
																					  ),
																				t.model
																					.pagesController
																					.page2Display &&
																				t.model.creator
																					.pageEditMode ===
																					"bypage"
																					? (e.openBlock(),
																					  e.createElementBlock(
																							"div",
																							{
																								key: 2,
																								class: "svc-page",
																								"data-sv-drop-target-survey-element":
																									t
																										.model
																										.displayPageDropTarget,
																								"data-sv-drop-target-page":
																									t
																										.model
																										.pagesController
																										.page2Display
																										.name,
																							},
																							[
																								e.createVNode(
																									e.unref(
																										l.SvComponent
																									),
																									{
																										is: "svc-page",
																										page: t
																											.model
																											.pagesController
																											.page2Display,
																										creator:
																											t
																												.model
																												.creator,
																										isGhost:
																											t
																												.model
																												.pagesController
																												.page2Display ==
																											t
																												.model
																												.newPage,
																									},
																									null,
																									8,
																									[
																										"page",
																										"creator",
																										"isGhost",
																									]
																								),
																							],
																							8,
																							sn
																					  ))
																					: e.createCommentVNode(
																							"",
																							!0
																					  ),
																			],
																			6
																		),
																		t.model.showSurfaceTools
																			? (e.openBlock(),
																			  e.createElementBlock(
																					"div",
																					ln,
																					[
																						t.model
																							.creator
																							.showPageNavigator
																							? (e.openBlock(),
																							  e.createElementBlock(
																									"div",
																									an,
																									[
																										e.createVNode(
																											e.unref(
																												l.SvComponent
																											),
																											{
																												is: "svc-page-navigator",
																												pagesController:
																													t
																														.model
																														.pagesController,
																												pageEditMode:
																													t
																														.model
																														.creator
																														.pageEditMode,
																											},
																											null,
																											8,
																											[
																												"pagesController",
																												"pageEditMode",
																											]
																										),
																									]
																							  ))
																							: e.createCommentVNode(
																									"",
																									!0
																							  ),
																						t.model
																							.showSurfaceToolbar
																							? (e.openBlock(),
																							  e.createElementBlock(
																									"div",
																									rn,
																									[
																										e.createVNode(
																											e.unref(
																												l.SvComponent
																											),
																											{
																												is: "sv-action-bar",
																												model: t
																													.model
																													.surfaceToolbar,
																											},
																											null,
																											8,
																											[
																												"model",
																											]
																										),
																									]
																							  ))
																							: e.createCommentVNode(
																									"",
																									!0
																							  ),
																					]
																			  ))
																			: e.createCommentVNode(
																					"",
																					!0
																			  ),
																	],
																	64
															  )),
													]),
												]),
												_: 1,
											}
										),
									],
									2
								),
							],
							64
						)
					)
				);
			},
		}),
		dn = ["id", "data-sv-drop-target-survey-page"],
		mn = e.createElementVNode(
			"div",
			{ class: "svc-question__drop-indicator svc-question__drop-indicator--top" },
			null,
			-1
		),
		pn = e.createElementVNode(
			"div",
			{ class: "svc-question__drop-indicator svc-question__drop-indicator--bottom" },
			null,
			-1
		),
		kn = { key: 1, class: "svc-page__loading-content" },
		fn = { key: 2, class: "svc-page__placeholder_frame" },
		_n = { class: "svc-panel__placeholder_frame" },
		Cn = { class: "svc-panel__placeholder" },
		gn = { class: "svc-page__content-actions" },
		bn = { key: 4, class: "svc-page__content-actions" },
		Bn = e.defineComponent({
			__name: "Page",
			props: { creator: {}, survey: {}, page: {}, isGhost: { type: Boolean } },
			setup(i) {
				const n = i,
					o = e.ref(),
					t = h(
						() => {
							const r = new N.PageAdorner(n.creator, n.page);
							return (r.isGhost = n.isGhost), r;
						},
						[() => n.page],
						(r) => {
							r.dispose();
						}
					);
				e.watch(
					() => n.isGhost,
					() => {
						t.value && (t.value.isGhost = n.isGhost);
					}
				),
					e.onUpdated(() => {
						o.value && t.value && (t.value.rootElement = o.value);
					}),
					e.onMounted(() => {
						o.value && t.value && t.value.setRootElement(o.value);
					});
				const s = (r) => {
					t.value.hover(r, r.currentTarget);
				};
				return (r, a) =>
					e.unref(t).page
						? e.withDirectives(
								(e.openBlock(),
								e.createElementBlock(
									"div",
									{
										key: e.unref(t).page.id,
										id: e.unref(t).page.id,
										class: e.normalizeClass([
											"svc-page__content",
											e.unref(t).css,
										]),
										"data-sv-drop-target-survey-page":
											e.unref(t).dropTargetName,
										onClick:
											a[1] ||
											(a[1] = (c) => {
												e.unref(t).select(e.unref(t), c),
													c.stopPropagation();
											}),
										ref_key: "root",
										ref: o,
										onDblclick: a[2] || (a[2] = (c) => e.unref(t).dblclick(c)),
										onMouseover: s,
										onMouseleave: s,
									},
									[
										mn,
										pn,
										e.unref(t).needRenderContent
											? (e.openBlock(),
											  e.createBlock(
													e.unref(l.SvComponent),
													{
														key: 0,
														is: "sv-page",
														survey: e.unref(t).creator.survey,
														page: e.unref(t).page,
													},
													null,
													8,
													["survey", "page"]
											  ))
											: e.createCommentVNode("", !0),
										e.unref(t).needRenderContent
											? e.createCommentVNode("", !0)
											: (e.openBlock(),
											  e.createElementBlock("div", kn, [
													e.createVNode(e.unref(l.SvComponent), {
														is: "sv-loading-indicator",
													}),
											  ])),
										e.unref(t).showPlaceholder
											? (e.openBlock(),
											  e.createElementBlock("div", fn, [
													e.createElementVNode("div", _n, [
														e.createElementVNode(
															"div",
															Cn,
															e.toDisplayString(
																e.unref(t).placeholderText
															),
															1
														),
													]),
											  ]))
											: e.createCommentVNode("", !0),
										e.unref(t).allowDragging && !e.unref(t).isGhost
											? (e.openBlock(),
											  e.createElementBlock(
													"div",
													{
														key: 3,
														class: "svc-question__drag-area",
														onPointerdown:
															a[0] ||
															(a[0] = (c) =>
																e.unref(t).onPointerDown(c)),
													},
													[
														e.createVNode(
															e.unref(l.SvComponent),
															e.mergeProps(
																{
																	is: "sv-svg-icon",
																	class: "svc-question__drag-element",
																},
																{
																	css: "svc-question__drag-element",
																	iconName:
																		"icon-drag-area-indicator_24x16",
																	size: "auto",
																}
															),
															null,
															16
														),
														e.createElementVNode("div", gn, [
															e.createVNode(
																e.unref(l.SvComponent),
																{
																	is: "sv-action-bar",
																	model: e.unref(t)
																		.actionContainer,
																},
																null,
																8,
																["model"]
															),
															e.unref(t).topActionContainer
																.hasActions
																? (e.openBlock(),
																  e.createBlock(
																		e.unref(l.SvComponent),
																		{
																			key: 0,
																			is: "sv-action-bar",
																			model: e.unref(t)
																				.topActionContainer,
																		},
																		null,
																		8,
																		["model"]
																  ))
																: e.createCommentVNode("", !0),
														]),
													],
													32
											  ))
											: e.createCommentVNode("", !0),
										!e.unref(t).allowDragging || e.unref(t).isGhost
											? (e.openBlock(),
											  e.createElementBlock("div", bn, [
													e.createVNode(
														e.unref(l.SvComponent),
														{
															is: "sv-action-bar",
															model: e.unref(t).actionContainer,
														},
														null,
														8,
														["model"]
													),
													e.unref(t).topActionContainer.hasActions
														? (e.openBlock(),
														  e.createBlock(
																e.unref(l.SvComponent),
																{
																	key: 0,
																	is: "sv-action-bar",
																	model: e.unref(t)
																		.topActionContainer,
																},
																null,
																8,
																["model"]
														  ))
														: e.createCommentVNode("", !0),
											  ]))
											: e.createCommentVNode("", !0),
										e.createVNode(
											e.unref(l.SvComponent),
											{
												is: "sv-action-bar",
												model: e.unref(t).footerActionsBar,
											},
											null,
											8,
											["model"]
										),
									],
									42,
									dn
								)),
								[[e.unref(l.key2ClickDirective)]]
						  )
						: e.createCommentVNode("", !0);
			},
		}),
		Nn = { class: "svc-add-new-item-button__text" },
		hn = e.defineComponent({
			__name: "AddQuestion",
			props: { item: {}, buttonClass: {}, renderPopup: {} },
			setup(i) {
				const n = i;
				l.useBase(() => n.item.data);
				const o = e.computed(
						() => "svc-element__add-new-question " + (n.buttonClass || "svc-btn")
					),
					t = e.computed(() => n.renderPopup === void 0 || n.renderPopup !== !1);
				return (s, r) => (
					e.openBlock(),
					e.createElementBlock(
						e.Fragment,
						null,
						[
							e.withDirectives(
								(e.openBlock(),
								e.createElementBlock(
									"div",
									{
										class: e.normalizeClass(o.value),
										onClick:
											r[0] ||
											(r[0] = (a) => {
												s.item.data.addNewQuestion(s.item, a),
													a.stopPropagation();
											}),
										onMouseover:
											r[1] ||
											(r[1] = (a) =>
												s.item.data.hoverStopper &&
												s.item.data.hoverStopper(a, a.currentTarget)),
									},
									[
										e.createVNode(e.unref(l.SvComponent), {
											is: "sv-svg-icon",
											class: "svc-panel__add-new-question-icon",
											iconName: "icon-add_24x24",
											size: "auto",
										}),
										e.createElementVNode(
											"span",
											Nn,
											e.toDisplayString(s.item.data.addNewQuestionText),
											1
										),
										t.value
											? (e.openBlock(),
											  e.createBlock(
													e.unref(l.SvComponent),
													{
														key: 0,
														is: "svc-add-question-type-selector",
														questionTypeSelectorModel:
															s.item.data.questionTypeSelectorModel,
														renderPopup: t.value,
													},
													null,
													8,
													["questionTypeSelectorModel", "renderPopup"]
											  ))
											: e.createCommentVNode("", !0),
									],
									34
								)),
								[[e.unref(l.key2ClickDirective)]]
							),
							t.value
								? e.createCommentVNode("", !0)
								: (e.openBlock(),
								  e.createBlock(
										e.unref(l.SvComponent),
										{
											key: 0,
											is: "svc-add-question-type-selector",
											questionTypeSelectorModel:
												s.item.data.questionTypeSelectorModel,
											renderPopup: t.value,
										},
										null,
										8,
										["questionTypeSelectorModel", "renderPopup"]
								  )),
						],
						64
					)
				);
			},
		}),
		En = ["title", "aria-label"],
		yn = e.defineComponent({
			__name: "AddQuestionTypeSelector",
			props: { questionTypeSelectorModel: {}, renderPopup: {} },
			setup(i) {
				const n = i;
				return (
					l.useBase(() => n.questionTypeSelectorModel),
					(o, t) =>
						e.withDirectives(
							(e.openBlock(),
							e.createElementBlock(
								"button",
								{
									type: "button",
									onClick:
										t[0] ||
										(t[0] = (s) => {
											o.questionTypeSelectorModel.action(),
												s.stopPropagation();
										}),
									title: o.questionTypeSelectorModel.title,
									"aria-label": o.questionTypeSelectorModel.title,
									class: "svc-element__question-type-selector",
								},
								[
									e.createVNode(
										e.unref(l.SvComponent),
										e.mergeProps(
											{
												is: "sv-svg-icon",
												class: "svc-element__question-type-selector-icon",
											},
											{
												iconName: o.questionTypeSelectorModel.iconName,
												size: "auto",
												title: o.questionTypeSelectorModel.title,
											}
										),
										null,
										16
									),
									o.renderPopup
										? (e.openBlock(),
										  e.createBlock(
												e.unref(l.SvComponent),
												{
													key: 0,
													is: "sv-popup",
													model: o.questionTypeSelectorModel.popupModel,
												},
												null,
												8,
												["model"]
										  ))
										: e.createCommentVNode("", !0),
								],
								8,
								En
							)),
							[[e.unref(l.key2ClickDirective)]]
						)
				);
			},
		}),
		wn = e.createElementVNode(
			"div",
			{ class: "svc-row__drop-indicator svc-row__drop-indicator--top" },
			null,
			-1
		),
		Sn = e.createElementVNode(
			"div",
			{ class: "svc-row__drop-indicator svc-row__drop-indicator--bottom" },
			null,
			-1
		),
		qn = e.defineComponent({
			__name: "Row",
			props: { componentData: {} },
			setup(i) {
				const n = i,
					o = e.computed(() => n.componentData.creator),
					t = e.computed(() => n.componentData.row),
					s = h(
						() => new N.RowViewModel(o.value, t.value, void 0),
						[() => o.value, () => t.value],
						(r) => {
							r.dispose();
						}
					);
				return (
					e.onMounted(() => {
						s.value && s.value.subscribeElementChanges();
					}),
					e.onUnmounted(() => {
						s.value && s.value.unsubscribeElementChanges();
					}),
					(r, a) => (
						e.openBlock(),
						e.createElementBlock(
							"div",
							{ class: e.normalizeClass(e.unref(s).cssClasses) },
							[wn, Sn, e.renderSlot(r.$slots, "default")],
							2
						)
					)
				);
			},
		}),
		Dn = ["data-sv-drop-target-survey-element"],
		$n = { class: "svc-fake-title" },
		un = e.createElementVNode(
			"div",
			{ class: "svc-question__drop-indicator svc-question__drop-indicator--left" },
			null,
			-1
		),
		Vn = e.createElementVNode(
			"div",
			{ class: "svc-question__drop-indicator svc-question__drop-indicator--right" },
			null,
			-1
		),
		Tn = e.createElementVNode(
			"div",
			{ class: "svc-question__drop-indicator svc-question__drop-indicator--top" },
			null,
			-1
		),
		Mn = e.createElementVNode(
			"div",
			{ class: "svc-question__drop-indicator svc-question__drop-indicator--bottom" },
			null,
			-1
		),
		zn = { class: "svc-question__top-actions" },
		In = { key: 0, class: "svc-panel__placeholder_frame-wrapper" },
		Pn = { class: "svc-panel__placeholder_frame" },
		Rn = { class: "svc-panel__placeholder", "data-bind": "text: placeholderText" },
		u = e.defineComponent({
			__name: "QuestionBase",
			props: {
				createModel: { type: Function },
				element: {},
				adornerComponent: {},
				showPlaceholderComponent: { type: Boolean },
				placeholderComponent: {},
				getPlaceholderComponentData: { type: Function },
				componentName: {},
				componentData: {},
			},
			setup(i) {
				const n = i,
					o = e.ref(),
					t = h(
						() => n.createModel(),
						[
							() => n.componentName,
							() => n.componentData.data,
							() => n.componentData.element,
						],
						(a) => {
							a.dispose();
						}
					),
					s = e.computed(() =>
						t.value.isBannerShowing ? t.value.createBannerParams() : null
					);
				e.onUpdated(() => {
					o.value && t.value && (t.value.rootElement = o.value);
				}),
					e.onMounted(() => {
						o.value && t.value && (t.value.rootElement = o.value);
					});
				const r = (a) => {
					t.value.select(t.value, a), a.stopPropagation();
				};
				return (a, c) =>
					e.unref(t)
						? (e.openBlock(),
						  e.createElementBlock(
								"div",
								{
									key: 0,
									class: e.normalizeClass([
										"svc-question__adorner",
										e.unref(t).rootCss(),
									]),
									ref_key: "root",
									ref: o,
									onDblclick: c[2] || (c[2] = (_) => e.unref(t).dblclick(_)),
									onMouseover:
										c[3] ||
										(c[3] = (_) => e.unref(t).hover(_, _.currentTarget)),
									onMouseleave:
										c[4] ||
										(c[4] = (_) => e.unref(t).hover(_, _.currentTarget)),
									"data-sv-drop-target-survey-element":
										e.unref(t).element.name || null,
									"data-bind":
										"css: rootCss(), attr: { 'data-sv-drop-target-survey-element': element.name || null }, event: { mouseover: function(m, e) { hover(e, $element); }, mouseleave: function(m, e) { hover(e, $element); } }",
								},
								[
									e.unref(t).showHiddenTitle
										? (e.openBlock(),
										  e.createElementBlock(
												"div",
												{
													key: 0,
													class: e.normalizeClass(
														e.unref(t).cssCollapsedHiddenHeader
													),
												},
												[
													a.element.hasTitle
														? (e.openBlock(),
														  e.createBlock(
																e.unref(l.SvComponent),
																{
																	key: 0,
																	is: "survey-element-title",
																	element: a.element,
																	renderActions: !1,
																},
																null,
																8,
																["element"]
														  ))
														: (e.openBlock(),
														  e.createElementBlock(
																"div",
																{
																	key: 1,
																	class: e.normalizeClass(
																		e.unref(t)
																			.cssCollapsedHiddenTitle
																	),
																},
																[
																	e.createElementVNode(
																		"span",
																		$n,
																		e.toDisplayString(
																			a.element.name
																		),
																		1
																	),
																],
																2
														  )),
												],
												2
										  ))
										: e.createCommentVNode("", !0),
									e.withDirectives(
										(e.openBlock(),
										e.createElementBlock(
											"div",
											{
												onClick:
													c[1] ||
													(c[1] = (_) => {
														e.unref(t).select(e.unref(t), _),
															_.stopPropagation();
													}),
												class: e.normalizeClass(e.unref(t).css()),
											},
											[
												un,
												Vn,
												Tn,
												Mn,
												e.unref(t).allowDragging
													? (e.openBlock(),
													  e.createElementBlock(
															"div",
															{
																key: 0,
																class: "svc-question__drag-area",
																onPointerdown:
																	c[0] ||
																	(c[0] = (_) =>
																		e
																			.unref(t)
																			.onPointerDown(_)),
															},
															[
																e.createVNode(
																	e.unref(l.SvComponent),
																	e.mergeProps(
																		{
																			is: "sv-svg-icon",
																			class: "svc-question__drag-element",
																		},
																		{
																			css: "svc-question__drag-element",
																			iconName:
																				"icon-drag-area-indicator_24x16",
																			size: "auto",
																		}
																	),
																	null,
																	16
																),
																e.createElementVNode("div", zn, [
																	e.createVNode(
																		e.unref(l.SvComponent),
																		{
																			is: "sv-action-bar",
																			model: e.unref(t)
																				.topActionContainer,
																			handleClick: !1,
																		},
																		null,
																		8,
																		["model"]
																	),
																]),
															],
															32
													  ))
													: e.createCommentVNode("", !0),
												e.unref(t).needToRenderContent
													? (e.openBlock(),
													  e.createElementBlock(
															e.Fragment,
															{ key: 1 },
															[
																e.createVNode(
																	e.unref(l.SvComponent),
																	{
																		is: "sv-template-renderer",
																		componentName:
																			a.componentName,
																		componentData:
																			a.componentData,
																	},
																	null,
																	8,
																	[
																		"componentName",
																		"componentData",
																	]
																),
																e.unref(t).isEmptyElement &&
																!a.showPlaceholderComponent
																	? (e.openBlock(),
																	  e.createElementBlock(
																			"div",
																			In,
																			[
																				e.createElementVNode(
																					"div",
																					Pn,
																					[
																						e.createElementVNode(
																							"div",
																							Rn,
																							e.toDisplayString(
																								e.unref(
																									t
																								)
																									.placeholderText
																							),
																							1
																						),
																					]
																				),
																			]
																	  ))
																	: e.createCommentVNode("", !0),
																e.unref(t).isEmptyElement &&
																a.showPlaceholderComponent
																	? (e.openBlock(),
																	  e.createBlock(
																			e.unref(l.SvComponent),
																			e.mergeProps(
																				{
																					key: 1,
																					is: a.placeholderComponent,
																				},
																				a.getPlaceholderComponentData &&
																					a.getPlaceholderComponentData(
																						e.unref(t)
																					)
																			),
																			null,
																			16,
																			["is"]
																	  ))
																	: e.createCommentVNode("", !0),
																a.adornerComponent
																	? (e.openBlock(),
																	  e.createBlock(
																			e.unref(l.SvComponent),
																			{
																				key: 2,
																				is: a.adornerComponent,
																				model: e.unref(t),
																				element: a.element,
																			},
																			null,
																			8,
																			[
																				"is",
																				"model",
																				"element",
																			]
																	  ))
																	: e.createCommentVNode("", !0),
																e.unref(t).isBannerShowing
																	? (e.openBlock(),
																	  e.createBlock(
																			e.unref(l.SvComponent),
																			{
																				key: 3,
																				is: "svc-question-banner",
																				model: s.value,
																			},
																			null,
																			8,
																			["model"]
																	  ))
																	: e.createCommentVNode("", !0),
																e.createElementVNode(
																	"div",
																	{
																		class: "svc-question__content-actions",
																		onFocusin: r,
																	},
																	[
																		e.createVNode(
																			e.unref(l.SvComponent),
																			{
																				is: "sv-action-bar",
																				model: e.unref(t)
																					.actionContainer,
																				handleClick: !1,
																			},
																			null,
																			8,
																			["model"]
																		),
																	],
																	32
																),
															],
															64
													  ))
													: e.createCommentVNode("", !0),
											],
											2
										)),
										[[e.unref(l.key2ClickDirective), { disableTabStop: !0 }]]
									),
								],
								42,
								Dn
						  ))
						: e.createCommentVNode("", !0);
			},
		}),
		z = e.defineComponent({
			__name: "Question",
			props: { componentName: {}, componentData: {} },
			setup(i) {
				const n = i,
					o = () =>
						new N.QuestionAdornerViewModel(
							n.componentData.data,
							n.componentData.element,
							null
						);
				return (t, s) => (
					e.openBlock(),
					e.createBlock(
						u,
						{
							createModel: o,
							element: t.componentData.element,
							"component-name": t.componentName,
							"component-data": t.componentData,
						},
						null,
						8,
						["element", "component-name", "component-data"]
					)
				);
			},
		}),
		Fn = e.defineComponent({
			__name: "QuestionImage",
			props: { componentName: {}, componentData: {} },
			setup(i) {
				const n = i,
					o = () =>
						new N.QuestionImageAdornerViewModel(
							n.componentData.data,
							n.componentData.element,
							null
						),
					t = (s) => ({ question: s == null ? void 0 : s.filePresentationModel });
				return (s, r) => (
					e.openBlock(),
					e.createBlock(
						u,
						{
							"create-model": o,
							element: n.componentData.element,
							"show-placeholder-component": !0,
							"component-data": s.componentData,
							"component-name": s.componentName,
							"placeholder-component": "survey-file",
							"get-placeholder-component-data": t,
							"adorner-component": "svc-image-question-adorner",
						},
						null,
						8,
						["element", "component-data", "component-name"]
					)
				);
			},
		}),
		Ln = { key: 0, class: "svc-image-question-controls" },
		An = ["accept"],
		Qn = { class: "svc-context-button", title: void 0, "aria-label": void 0 },
		Kn = { key: 1, class: "svc-image-question__loading-placeholder" },
		Hn = { class: "svc-image-question__loading" },
		On = e.defineComponent({
			__name: "Image",
			props: { model: {}, element: {} },
			setup(i) {
				return (n, o) => (
					e.openBlock(),
					e.createElementBlock(
						e.Fragment,
						null,
						[
							!n.model.isUploading && !n.model.isEmptyElement
								? (e.openBlock(),
								  e.createElementBlock("div", Ln, [
										n.model.allowEdit
											? (e.openBlock(),
											  e.createElementBlock(
													e.Fragment,
													{ key: 0 },
													[
														e.createElementVNode(
															"input",
															{
																type: "file",
																"aria-hidden": "true",
																tabindex: "-1",
																accept: n.model.acceptedTypes,
																class: "svc-choose-file-input",
															},
															null,
															8,
															An
														),
														e.withDirectives(
															(e.openBlock(),
															e.createElementBlock("span", Qn, [
																e.createVNode(
																	e.unref(l.SvComponent),
																	{
																		is: "sv-svg-icon",
																		iconName:
																			"icon-choosefile",
																		size: "auto",
																		onClick:
																			o[0] ||
																			(o[0] = (t) =>
																				n.model.chooseFile(
																					n.model
																				)),
																	}
																),
															])),
															[[e.unref(l.key2ClickDirective)]]
														),
													],
													64
											  ))
											: e.createCommentVNode("", !0),
								  ]))
								: e.createCommentVNode("", !0),
							n.model.isUploading && !n.model.isEmptyElement
								? (e.openBlock(),
								  e.createElementBlock("div", Kn, [
										e.createElementVNode("div", Hn, [
											e.createVNode(e.unref(l.SvComponent), {
												is: "sv-loading-indicator",
											}),
										]),
								  ]))
								: e.createCommentVNode("", !0),
						],
						64
					)
				);
			},
		}),
		Wn = { class: "svc-rating-question-content" },
		Gn = ["aria-label"],
		jn = ["aria-label"],
		Jn = e.defineComponent({
			__name: "Rating",
			props: { componentData: {}, componentName: {} },
			setup(i) {
				const n = i,
					o = h(
						() =>
							new N.QuestionRatingAdornerViewModel(
								n.componentData.data,
								n.componentData.question,
								null
							),
						[() => n.componentData.data, () => n.componentData.question]
					);
				return (t, s) => {
					var r, a, c, _, k, p, m, b, E;
					return (
						e.openBlock(),
						e.createElementBlock("div", Wn, [
							e.createElementVNode(
								"div",
								{
									class: e.normalizeClass(
										(r = e.unref(o)) == null ? void 0 : r.controlsClassNames
									),
								},
								[
									(a = e.unref(o)) != null && a.allowRemove
										? e.withDirectives(
												(e.openBlock(),
												e.createElementBlock(
													"span",
													{
														key: 0,
														class: e.normalizeClass(
															(c = e.unref(o)) == null
																? void 0
																: c.removeClassNames
														),
														onClick:
															s[0] ||
															(s[0] = (D) => {
																var w;
																return (w = e.unref(o)) == null
																	? void 0
																	: w.removeItem(e.unref(o));
															}),
														role: "button",
														"aria-label":
															(_ = e.unref(o)) == null
																? void 0
																: _.removeTooltip,
													},
													[
														e.createVNode(
															e.unref(l.SvComponent),
															{
																is: "sv-svg-icon",
																iconName: "icon-remove_16x16",
																size: "auto",
																title:
																	(k = e.unref(o)) == null
																		? void 0
																		: k.removeTooltip,
															},
															null,
															8,
															["title"]
														),
													],
													10,
													Gn
												)),
												[[e.unref(l.key2ClickDirective)]]
										  )
										: e.createCommentVNode("", !0),
									(p = e.unref(o)) != null && p.allowAdd
										? e.withDirectives(
												(e.openBlock(),
												e.createElementBlock(
													"span",
													{
														key: 1,
														class: e.normalizeClass(
															(m = e.unref(o)) == null
																? void 0
																: m.addClassNames
														),
														onClick:
															s[1] ||
															(s[1] = (D) => {
																var w;
																return (w = e.unref(o)) == null
																	? void 0
																	: w.addItem(e.unref(o));
															}),
														role: "button",
														"aria-label":
															(b = e.unref(o)) == null
																? void 0
																: b.addTooltip,
													},
													[
														e.createVNode(
															e.unref(l.SvComponent),
															{
																is: "sv-svg-icon",
																iconName: "icon-add_16x16",
																size: "auto",
																title:
																	(E = e.unref(o)) == null
																		? void 0
																		: E.addTooltip,
															},
															null,
															8,
															["title"]
														),
													],
													10,
													jn
												)),
												[[e.unref(l.key2ClickDirective)]]
										  )
										: e.createCommentVNode("", !0),
								],
								2
							),
							e.renderSlot(t.$slots, "default"),
						])
					);
				};
			},
		}),
		Zn = { key: 0, class: "svc-matrix-cell__question-controls" },
		Xn = e.defineComponent({
			__name: "MatrixCell",
			props: { componentData: {} },
			setup(i) {
				const n = i,
					o = e.computed(() => n.componentData.creator),
					t = e.computed(() => n.componentData.row),
					s = e.computed(() => n.componentData.column),
					r = e.computed(() => n.componentData.element),
					a = e.computed(() => n.componentData.question),
					c = h(() => {
						var _;
						return n.componentData
							? new N.MatrixCellWrapperViewModel(
									o.value,
									r.value,
									a.value,
									t.value,
									s.value || ((_ = r.value.cell) == null ? void 0 : _.column)
							  )
							: void 0;
					}, [() => o.value, () => t.value, () => s.value, () => a.value]);
				return (_, k) => {
					var p, m;
					return (
						e.openBlock(),
						e.createElementBlock(
							"div",
							{
								tabindex: "-1",
								class: "svc-matrix-cell",
								onClick:
									k[1] ||
									(k[1] = (b) => {
										var E;
										return (E = e.unref(c)) == null
											? void 0
											: E.selectContext(e.unref(c), b);
									}),
								onMouseover:
									k[2] ||
									(k[2] = (b) => {
										var E;
										return (E = e.unref(c)) == null
											? void 0
											: E.hover(b, b.currentTarget);
									}),
								onMouseleave:
									k[3] ||
									(k[3] = (b) => {
										var E;
										return (E = e.unref(c)) == null
											? void 0
											: E.hover(b, b.currentTarget);
									}),
							},
							[
								e.createElementVNode(
									"div",
									{
										class: e.normalizeClass([
											"svc-matrix-cell--selected",
											{
												"svc-visible":
													(p = e.unref(c)) == null
														? void 0
														: p.isSelected,
											},
										]),
									},
									null,
									2
								),
								e.renderSlot(_.$slots, "default"),
								(m = e.unref(c)) != null && m.isSupportCellEditor
									? (e.openBlock(),
									  e.createElementBlock("div", Zn, [
											e.withDirectives(
												(e.openBlock(),
												e.createElementBlock(
													"span",
													{
														class: "svc-matrix-cell__question-controls-button svc-context-button",
														onClick:
															k[0] ||
															(k[0] = (b) =>
																e
																	.unref(c)
																	.editQuestion(e.unref(c), b)),
													},
													[
														e.createVNode(e.unref(l.SvComponent), {
															is: "sv-svg-icon",
															iconName: "icon-edit",
															size: "auto",
														}),
													]
												)),
												[[e.unref(l.key2ClickDirective)]]
											),
									  ]))
									: e.createCommentVNode("", !0),
							],
							32
						)
					);
				};
			},
		}),
		Yn = { class: "svc-question__adorner" },
		xn = { class: "svc-question__content svc-question__content--in-popup" },
		Un = e.defineComponent({
			__name: "CellQuestion",
			props: { componentName: {}, componentData: {} },
			setup(i) {
				const n = i,
					o = e.computed(() => n.componentData.element);
				return (
					l.useBase(() => o.value),
					(t, s) => (
						e.openBlock(),
						e.createElementBlock("div", Yn, [
							e.createElementVNode("div", xn, [
								e.createVNode(
									e.unref(l.SvComponent),
									e.mergeProps({ is: t.componentName }, t.componentData),
									null,
									16,
									["is"]
								),
							]),
						])
					)
				);
			},
		}),
		vn = ["data-sv-drop-target-survey-element"],
		es = { class: "svc-fake-title" },
		os = e.createElementVNode(
			"div",
			{ class: "svc-question__drop-indicator svc-question__drop-indicator--left" },
			null,
			-1
		),
		ts = e.createElementVNode(
			"div",
			{ class: "svc-question__drop-indicator svc-question__drop-indicator--right" },
			null,
			-1
		),
		ns = e.createElementVNode(
			"div",
			{ class: "svc-question__drop-indicator svc-question__drop-indicator--top" },
			null,
			-1
		),
		ss = e.createElementVNode(
			"div",
			{ class: "svc-question__drop-indicator svc-question__drop-indicator--bottom" },
			null,
			-1
		),
		ls = { class: "svc-question__top-actions" },
		as = { key: 0, class: "svc-panel__placeholder_frame-wrapper" },
		rs = { class: "svc-panel__placeholder_frame" },
		is = { class: "svc-panel__placeholder" },
		cs = { class: "svc-add-new-item-button__text" },
		ds = { key: 1, class: "svc-panel__add-new-question-container" },
		ms = { class: "svc-panel__question-type-selector-popup" },
		ps = { class: "svc-panel__add-new-question-wrapper" },
		ks = e.defineComponent({
			__name: "Panel",
			props: { componentName: {}, componentData: {} },
			setup(i) {
				const n = i,
					o = h(
						() =>
							new N.QuestionAdornerViewModel(
								n.componentData.data,
								n.componentData.element,
								null
							),
						[() => n.componentData.data, () => n.componentData.element],
						(s) => {
							s.dispose();
						}
					),
					t = (s) => {
						s.stopPropagation(), o.value.addNewQuestion();
					};
				return (s, r) =>
					e.unref(o) && !e.unref(o).isDisposed
						? (e.openBlock(),
						  e.createElementBlock(
								"div",
								{
									key: 0,
									class: e.normalizeClass([
										"svc-question__adorner",
										e.unref(o).rootCss(),
									]),
									onDblclick: r[3] || (r[3] = (a) => e.unref(o).dblclick(a)),
									onMouseover:
										r[4] ||
										(r[4] = (a) => e.unref(o).hover(a, a.currentTarget)),
									onMouseleave:
										r[5] ||
										(r[5] = (a) => e.unref(o).hover(a, a.currentTarget)),
									"data-sv-drop-target-survey-element":
										e.unref(o).element.name || null,
									ref: "root",
								},
								[
									e.unref(o).showHiddenTitle
										? (e.openBlock(),
										  e.createElementBlock(
												"div",
												{
													key: 0,
													class: e.normalizeClass(
														e.unref(o).cssCollapsedHiddenHeader
													),
												},
												[
													e.unref(o).element.hasTitle
														? (e.openBlock(),
														  e.createBlock(
																e.unref(l.SvComponent),
																{
																	key: 0,
																	is: "survey-element-title",
																	element: e.unref(o).element,
																	renderActions: !1,
																},
																null,
																8,
																["element"]
														  ))
														: (e.openBlock(),
														  e.createElementBlock(
																"div",
																{
																	key: 1,
																	class: e.normalizeClass(
																		e.unref(o)
																			.cssCollapsedHiddenTitle
																	),
																},
																[
																	e.createElementVNode(
																		"span",
																		es,
																		e.toDisplayString(
																			e.unref(o).element.name
																		),
																		1
																	),
																],
																2
														  )),
												],
												2
										  ))
										: e.createCommentVNode("", !0),
									e.withDirectives(
										(e.openBlock(),
										e.createElementBlock(
											"div",
											{
												class: e.normalizeClass(e.unref(o).css()),
												onClick:
													r[2] ||
													(r[2] = (a) =>
														e.unref(o).element
															.isInteractiveDesignElement
															? e.unref(o).select(e.unref(o), a)
															: null),
											},
											[
												os,
												ts,
												ns,
												ss,
												e.unref(o).allowDragging &&
												e.unref(o).element.isInteractiveDesignElement
													? (e.openBlock(),
													  e.createElementBlock(
															"div",
															{
																key: 0,
																class: "svc-question__drag-area",
																onPointerdown:
																	r[0] ||
																	(r[0] = (a) =>
																		e
																			.unref(o)
																			.onPointerDown(a)),
															},
															[
																e.createVNode(
																	e.unref(l.SvComponent),
																	{
																		is: "sv-svg-icon",
																		class: "svc-question__drag-element",
																		iconName:
																			"icon-drag-area-indicator_24x16",
																		size: "auto",
																	}
																),
																e.createElementVNode("div", ls, [
																	e.createVNode(
																		e.unref(l.SvComponent),
																		{
																			is: "sv-action-bar",
																			model: e.unref(o)
																				.topActionContainer,
																			handleClick: !1,
																		},
																		null,
																		8,
																		["model"]
																	),
																]),
															],
															32
													  ))
													: e.createCommentVNode("", !0),
												e.unref(o).needToRenderContent
													? (e.openBlock(),
													  e.createElementBlock(
															e.Fragment,
															{ key: 1 },
															[
																e.createVNode(
																	e.unref(l.SvComponent),
																	e.mergeProps(
																		{ is: s.componentName },
																		s.componentData
																	),
																	null,
																	16,
																	["is"]
																),
																e.unref(o).isEmptyElement
																	? (e.openBlock(),
																	  e.createElementBlock(
																			"div",
																			as,
																			[
																				e.createElementVNode(
																					"div",
																					rs,
																					[
																						e.createElementVNode(
																							"div",
																							is,
																							e.toDisplayString(
																								e.unref(
																									o
																								)
																									.placeholderText
																							),
																							1
																						),
																						e.unref(o)
																							.showAddQuestionButton
																							? e.withDirectives(
																									(e.openBlock(),
																									e.createElementBlock(
																										"div",
																										{
																											key: 0,
																											class: "svc-panel__add-new-question svc-action-button",
																											onClick:
																												t,
																										},
																										[
																											e.createVNode(
																												e.unref(
																													l.SvComponent
																												),
																												{
																													is: "sv-svg-icon",
																													class: "svc-panel__add-new-question-icon",
																													iconName:
																														"icon-add_24x24",
																													size: "auto",
																												}
																											),
																											e.createElementVNode(
																												"span",
																												cs,
																												e.toDisplayString(
																													e.unref(
																														o
																													)
																														.addNewQuestionText
																												),
																												1
																											),
																										]
																									)),
																									[
																										[
																											e.unref(
																												l.key2ClickDirective
																											),
																										],
																									]
																							  )
																							: e.createCommentVNode(
																									"",
																									!0
																							  ),
																					]
																				),
																			]
																	  ))
																	: e.createCommentVNode("", !0),
																!e.unref(o).isEmptyElement &&
																e.unref(o).showAddQuestionButton
																	? (e.openBlock(),
																	  e.createElementBlock(
																			"div",
																			ds,
																			[
																				e.createElementVNode(
																					"div",
																					ms,
																					[
																						e.createVNode(
																							e.unref(
																								l.SvComponent
																							),
																							{
																								is: "sv-popup",
																								model: e.unref(
																									o
																								)
																									.questionTypeSelectorModel
																									.popupModel,
																							},
																							null,
																							8,
																							[
																								"model",
																							]
																						),
																					]
																				),
																				e.createElementVNode(
																					"div",
																					ps,
																					[
																						e.createVNode(
																							e.unref(
																								l.SvComponent
																							),
																							{
																								is: "svc-add-new-question-btn",
																								item: {
																									data: e.unref(
																										o
																									),
																								},
																								buttonClass:
																									"svc-action-button",
																								renderPopup:
																									!1,
																							},
																							null,
																							8,
																							[
																								"item",
																							]
																						),
																					]
																				),
																			]
																	  ))
																	: e.createCommentVNode("", !0),
																e.unref(o).element
																	.isInteractiveDesignElement
																	? (e.openBlock(),
																	  e.createElementBlock(
																			"div",
																			{
																				key: 2,
																				class: "svc-question__content-actions",
																				onFocusin:
																					r[1] ||
																					(r[1] = (a) =>
																						e
																							.unref(
																								o
																							)
																							.select(
																								e.unref(
																									o
																								),
																								a
																							)),
																			},
																			[
																				e.createVNode(
																					e.unref(
																						l.SvComponent
																					),
																					{
																						is: "sv-action-bar",
																						model: e.unref(
																							o
																						)
																							.actionContainer,
																						handleClick:
																							!1,
																					},
																					null,
																					8,
																					["model"]
																				),
																			],
																			32
																	  ))
																	: e.createCommentVNode("", !0),
															],
															64
													  ))
													: e.createCommentVNode("", !0),
											],
											2
										)),
										[[e.unref(l.key2ClickDirective), { disableTabStop: !0 }]]
									),
								],
								42,
								vn
						  ))
						: e.createCommentVNode("", !0);
			},
		}),
		fs = ["data-sv-drop-target-item-value"],
		_s = e.createElementVNode("div", { class: "svc-item-value__ghost" }, null, -1),
		Cs = { class: "svc-item-value-controls" },
		gs = { key: 0, class: "svc-item-value-controls__button svc-item-value-controls__drag" },
		bs = ["aria-label"],
		Bs = ["aria-label"],
		Ns = { key: 0, class: "svc-item-value-controls svc-choice-elements-button-container" },
		hs = e.defineComponent({
			__name: "ItemValue",
			props: { componentName: {}, componentData: {} },
			setup(i) {
				const n = e.ref(),
					o = i,
					t = e.computed(() => o.componentData.data.creator),
					s = e.computed(() => o.componentData.question),
					r = e.computed(() => o.componentData.item),
					a = e.watch(
						() => r.value,
						(p, m) => {
							p && n.value && p.setRootElement(n.value),
								m && m.setRootElement(void 0);
						}
					);
				e.onMounted(() => {
					n.value && r.value && r.value.setRootElement(n.value);
				}),
					e.onUnmounted(() => {
						r.value.setRootElement(void 0);
					});
				const c = h(
					() => new N.ItemValueWrapperViewModel(t.value, s.value, r.value),
					[() => t.value, () => s.value, () => r.value],
					(p) => {
						p.dispose();
					}
				);
				e.onBeforeUnmount(() => {
					a();
				});
				const _ = (p) => {
						const m = t.value.survey;
						if (m) {
							const b = m.getElementWrapperComponentName(p);
							if (b) return b;
						}
						return "panel";
					},
					k = (p) => {
						const m = t.value.survey;
						let b;
						return (
							m && (b = m.getElementWrapperComponentData(p)),
							{
								componentName: "survey-panel",
								componentData: { element: p, data: b },
							}
						);
					};
				return (p, m) => (
					e.openBlock(),
					e.createElementBlock(
						e.Fragment,
						null,
						[
							e.createElementVNode(
								"div",
								{
									class: e.normalizeClass([
										"svc-item-value-wrapper",
										{
											"svc-item-value--new": e.unref(c).isNew,
											"svc-item-value--dragging": e.unref(c).isDragging,
											"svc-item-value--ghost": e.unref(c).isDragDropGhost,
											"svc-item-value--movedown":
												e.unref(c).isDragDropMoveDown,
											"svc-item-value--moveup": e.unref(c).isDragDropMoveUp,
										},
									]),
									onPointerdown:
										m[5] || (m[5] = (b) => e.unref(c).onPointerDown(b)),
									"data-sv-drop-target-item-value": e.unref(c).isDraggable
										? r.value.value
										: null,
									ref_key: "root",
									ref: n,
								},
								[
									_s,
									e.createElementVNode("div", Cs, [
										e.unref(c).isDraggable
											? (e.openBlock(),
											  e.createElementBlock("span", gs, [
													e.createVNode(
														e.unref(l.SvComponent),
														{
															is: "sv-svg-icon",
															class: "svc-item-value-controls__drag-icon",
															iconName: "icon-drag-24x24",
															size: "auto",
															title: e.unref(c).dragTooltip,
														},
														null,
														8,
														["title"]
													),
											  ]))
											: e.createCommentVNode("", !0),
										e.unref(c).allowAdd
											? e.withDirectives(
													(e.openBlock(),
													e.createElementBlock(
														"span",
														{
															key: 1,
															class: "svc-item-value-controls__button svc-item-value-controls__add",
															onClick:
																m[0] ||
																(m[0] = (b) =>
																	e.unref(c).add(e.unref(c))),
															role: "button",
															"aria-label": e.unref(c).tooltip,
														},
														[
															e.createVNode(
																e.unref(l.SvComponent),
																{
																	is: "sv-svg-icon",
																	iconName: "icon-add_16x16",
																	size: "auto",
																	title: e.unref(c).tooltip,
																},
																null,
																8,
																["title"]
															),
														],
														8,
														bs
													)),
													[[e.unref(l.key2ClickDirective)]]
											  )
											: e.createCommentVNode("", !0),
										e.unref(c).allowRemove
											? e.withDirectives(
													(e.openBlock(),
													e.createElementBlock(
														"span",
														{
															key: 2,
															class: "svc-item-value-controls__button svc-item-value-controls__remove",
															onClick:
																m[1] ||
																(m[1] = (b) =>
																	e.unref(c).remove(e.unref(c))),
															onBlur:
																m[2] ||
																(m[2] = (b) =>
																	e.unref(c).onFocusOut(b)),
															role: "button",
															"aria-label": e.unref(c).tooltip,
														},
														[
															e.createVNode(
																e.unref(l.SvComponent),
																{
																	is: "sv-svg-icon",
																	iconName: "icon-remove_16x16",
																	size: "auto",
																	title: e.unref(c).tooltip,
																},
																null,
																8,
																["title"]
															),
														],
														40,
														Bs
													)),
													[[e.unref(l.key2ClickDirective)]]
											  )
											: e.createCommentVNode("", !0),
									]),
									e.createElementVNode(
										"div",
										{
											class: "svc-item-value__item",
											onClick:
												m[3] ||
												(m[3] = (b) => e.unref(c).select(e.unref(c), b)),
										},
										[
											e.createVNode(
												e.unref(l.SvComponent),
												e.mergeProps(
													{ is: p.componentName },
													p.componentData
												),
												null,
												16,
												["is"]
											),
										]
									),
									e.unref(c).canShowPanel()
										? (e.openBlock(),
										  e.createElementBlock("div", Ns, [
												e.withDirectives(
													(e.openBlock(),
													e.createElementBlock(
														"span",
														{
															role: "button",
															class: "svc-item-value-controls__button svc-item-value-controls__add svc-choice-elements-button",
															onClick:
																m[4] ||
																(m[4] = (b) =>
																	e.unref(c).togglePanel()),
														},
														[
															e.createVNode(
																e.unref(l.SvComponent),
																{
																	is: "sv-svg-icon",
																	iconName: e.unref(c).showPanel
																		? "icon-collapsepanel-16x16"
																		: "icon-expandpanel-16x16",
																	size: "auto",
																},
																null,
																8,
																["iconName"]
															),
														]
													)),
													[[e.unref(l.key2ClickDirective)]]
												),
										  ]))
										: e.createCommentVNode("", !0),
								],
								42,
								fs
							),
							e.unref(c).showPanel
								? (e.openBlock(),
								  e.createBlock(
										e.unref(l.SvComponent),
										e.mergeProps(
											{ key: 0, is: _(r.value.panel) },
											k(r.value.panel)
										),
										null,
										16,
										["is"]
								  ))
								: e.createCommentVNode("", !0),
						],
						64
					)
				);
			},
		}),
		Es = ["data-sv-drop-target-item-value"],
		ys = { class: "svc-image-item-value-wrapper__content" },
		ws = ["accept"],
		Ss = { key: 0, class: "svc-image-item-value__item" },
		qs = { key: 2, class: "svc-context-container svc-image-item-value-controls" },
		Ds = { class: "svc-image-item-value__item" },
		$s = { class: "sd-imagepicker__item sd-imagepicker__item--inline" },
		us = { class: "sd-imagepicker__label" },
		Vs = { key: 0, class: "svc-image-item-value__loading" },
		Ts = { key: 0, class: "svc-image-item-value__placeholder" },
		Ms = { key: 1 },
		zs = e.defineComponent({
			__name: "ImageItemValue",
			props: { componentName: {}, componentData: {} },
			setup(i) {
				const n = i,
					o = e.computed(() => n.componentData.data.creator),
					t = e.computed(() => n.componentData.question),
					s = e.computed(() => n.componentData.item),
					r = e.ref(),
					a = h(
						() => {
							const k = new N.ImageItemValueWrapperViewModel(
								o.value,
								t.value,
								s.value,
								null,
								null
							);
							return r != null && r.value && (k.itemsRoot = r.value), k;
						},
						[() => o.value, () => t.value, () => s.value],
						(k) => {
							k.dispose();
						}
					),
					c = (k) => {
						k.preventDefault();
					},
					_ = e.computed(() => {
						const k = !a.value.getIsNewItemSingle();
						return {
							width: k ? t.value.renderedImageWidth + "px" : void 0,
							height: k ? t.value.renderedImageHeight + "px" : void 0,
						};
					});
				return (
					e.onMounted(() => {
						r.value && (a.value.itemsRoot = r.value);
					}),
					(k, p) => (
						e.openBlock(),
						e.createElementBlock(
							"div",
							{
								onPointerdown: p[5] || (p[5] = (m) => e.unref(a).onPointerDown(m)),
								class: e.normalizeClass(e.unref(a).getRootCss()),
								"data-sv-drop-target-item-value": e.unref(a).isDraggable
									? s.value.value
									: null,
								ref_key: "root",
								ref: r,
								onDragstart: c,
								onDragenter: p[6] || (p[6] = (m) => e.unref(a).onDragEnter(m)),
								onDragover: p[7] || (p[7] = (m) => e.unref(a).onDragOver(m)),
								onDragleave: p[8] || (p[8] = (m) => e.unref(a).onDragLeave(m)),
								onDrop: p[9] || (p[9] = (m) => e.unref(a).onDrop(m)),
							},
							[
								e.createElementVNode(
									"div",
									{
										class: "svc-image-item-value-wrapper__ghost",
										style: e.normalizeStyle(_.value),
									},
									null,
									4
								),
								e.createElementVNode("div", ys, [
									e.createElementVNode(
										"input",
										{
											type: "file",
											"aria-hidden": "true",
											tabindex: "-1",
											accept: e.unref(a).acceptedTypes,
											class: "svc-choose-file-input",
										},
										null,
										8,
										ws
									),
									!e.unref(a).isNew && !e.unref(a).isUploading
										? (e.openBlock(),
										  e.createElementBlock(
												e.Fragment,
												{ key: 0 },
												[
													e.unref(a).isNew
														? e.createCommentVNode("", !0)
														: (e.openBlock(),
														  e.createElementBlock("div", Ss, [
																e.createVNode(
																	e.unref(l.SvComponent),
																	e.mergeProps(
																		{ is: k.componentName },
																		k.componentData
																	),
																	null,
																	16,
																	["is"]
																),
														  ])),
													e.unref(a).isDraggable &&
													e.unref(a).canRenderControls
														? (e.openBlock(),
														  e.createElementBlock(
																"span",
																{
																	key: 1,
																	class: "svc-context-button svc-image-item-value-controls__drag-area-indicator",
																	onPointerdown:
																		p[0] ||
																		(p[0] = (m) =>
																			e
																				.unref(a)
																				.onPointerDown(m)),
																	title: void 0,
																	"aria-label": void 0,
																},
																[
																	e.createVNode(
																		e.unref(l.SvComponent),
																		{
																			is: "sv-svg-icon",
																			iconName:
																				"icon-drag-24x24",
																			size: "auto",
																		}
																	),
																],
																32
														  ))
														: e.createCommentVNode("", !0),
													e.unref(a).canRenderControls
														? (e.openBlock(),
														  e.createElementBlock("div", qs, [
																e.withDirectives(
																	(e.openBlock(),
																	e.createElementBlock(
																		"span",
																		{
																			class: "svc-context-button",
																			onClick:
																				p[1] ||
																				(p[1] = (m) =>
																					e
																						.unref(a)
																						.chooseFile(
																							e.unref(
																								a
																							)
																						)),
																			title: void 0,
																			"aria-label": void 0,
																		},
																		[
																			e.createVNode(
																				e.unref(
																					l.SvComponent
																				),
																				{
																					is: "sv-svg-icon",
																					role: "button",
																					iconName:
																						"icon-choosefile",
																					size: "auto",
																					title: e.unref(
																						a
																					)
																						.selectFileTitle,
																				},
																				null,
																				8,
																				["title"]
																			),
																		]
																	)),
																	[
																		[
																			e.unref(
																				l.key2ClickDirective
																			),
																		],
																	]
																),
																e.withDirectives(
																	(e.openBlock(),
																	e.createElementBlock(
																		"span",
																		{
																			class: "svc-context-button svc-context-button--danger",
																			onClick:
																				p[2] ||
																				(p[2] = (m) =>
																					e
																						.unref(a)
																						.remove(
																							e.unref(
																								a
																							)
																						)),
																			title: void 0,
																			"aria-label": void 0,
																		},
																		[
																			e.createVNode(
																				e.unref(
																					l.SvComponent
																				),
																				{
																					is: "sv-svg-icon",
																					role: "button",
																					iconName:
																						"icon-delete",
																					size: "auto",
																					title: e.unref(
																						a
																					)
																						.removeFileTitle,
																				},
																				null,
																				8,
																				["title"]
																			),
																		]
																	)),
																	[
																		[
																			e.unref(
																				l.key2ClickDirective
																			),
																		],
																	]
																),
														  ]))
														: e.createCommentVNode("", !0),
												],
												64
										  ))
										: (e.openBlock(),
										  e.createElementBlock(
												e.Fragment,
												{ key: 1 },
												[
													e.createElementVNode("div", Ds, [
														e.createElementVNode("div", $s, [
															e.createElementVNode("label", us, [
																e.createElementVNode(
																	"div",
																	{
																		style: e.normalizeStyle(
																			_.value
																		),
																		class: "sd-imagepicker__image",
																	},
																	[
																		e.unref(a).isUploading
																			? (e.openBlock(),
																			  e.createElementBlock(
																					"div",
																					Vs,
																					[
																						e.createVNode(
																							e.unref(
																								l.SvComponent
																							),
																							{
																								is: "sv-loading-indicator",
																							}
																						),
																					]
																			  ))
																			: e.createCommentVNode(
																					"",
																					!0
																			  ),
																	],
																	4
																),
															]),
														]),
													]),
													e.unref(a).allowAdd && !e.unref(a).isUploading
														? (e.openBlock(),
														  e.createElementBlock(
																"div",
																{
																	key: 0,
																	class: "svc-image-item-value-controls",
																	onPointerdown:
																		p[4] ||
																		(p[4] = (m) =>
																			m.stopPropagation()),
																},
																[
																	e.unref(a).showPlaceholder
																		? (e.openBlock(),
																		  e.createElementBlock(
																				"span",
																				Ts,
																				e.toDisplayString(
																					e.unref(a)
																						.placeholderText
																				),
																				1
																		  ))
																		: e.createCommentVNode(
																				"",
																				!0
																		  ),
																	e.withDirectives(
																		(e.openBlock(),
																		e.createElementBlock(
																			"span",
																			{
																				class: e.normalizeClass(
																					e.unref(a)
																						.addButtonCss
																				),
																				onClick:
																					p[3] ||
																					(p[3] = (m) =>
																						e
																							.unref(
																								a
																							)
																							.chooseNewFile(
																								e.unref(
																									a
																								)
																							)),
																			},
																			[
																				e.unref(a)
																					.showChooseButtonAsIcon
																					? (e.openBlock(),
																					  e.createBlock(
																							e.unref(
																								l.SvComponent
																							),
																							{
																								key: 0,
																								is: "sv-svg-icon",
																								iconName:
																									"icon-add-lg",
																								size: "auto",
																								title: e.unref(
																									a
																								)
																									.addFileTitle,
																							},
																							null,
																							8,
																							[
																								"title",
																							]
																					  ))
																					: (e.openBlock(),
																					  e.createElementBlock(
																							"span",
																							Ms,
																							e.toDisplayString(
																								e.unref(
																									a
																								)
																									.chooseImageText
																							),
																							1
																					  )),
																			],
																			2
																		)),
																		[
																			[
																				e.unref(
																					l.key2ClickDirective
																				),
																			],
																		]
																	),
																],
																32
														  ))
														: e.createCommentVNode("", !0),
												],
												64
										  )),
								]),
							],
							42,
							Es
						)
					)
				);
			},
		}),
		Is = e.defineComponent({
			__name: "QuestionEditor",
			props: { survey: {}, style: {} },
			setup(i) {
				const n = i,
					o = e.computed(() => {
						var r;
						return (r = n.survey) == null ? void 0 : r.getAllQuestions()[0];
					}),
					t = e.computed(() => {
						const r = n.survey;
						if (r && o.value) {
							const a = r.getElementWrapperComponentName(o.value);
							if (a) return a;
						}
						return "survey-question";
					}),
					s = e.computed(() => {
						const r = n.survey;
						let a;
						return (
							r && o.value && (a = r.getElementWrapperComponentData(o.value)),
							{
								componentName: "survey-question",
								componentData: { element: o.value, data: a },
							}
						);
					});
				return (r, a) => (
					e.openBlock(),
					e.createElementBlock(
						"div",
						{ style: e.normalizeStyle(n.style) },
						[
							e.createVNode(
								e.unref(l.SvComponent),
								e.mergeProps({ is: t.value }, s.value),
								null,
								16,
								["is"]
							),
						],
						4
					)
				);
			},
		}),
		Ps = ["accept"],
		Rs = [
			e.createElementVNode(
				"svg",
				null,
				[e.createElementVNode("use", { "xlink:href": "#icon-image-48x48" })],
				-1
			),
		],
		Fs = { class: "svc-context-container svc-logo-image-controls" },
		Ls = { key: 2, class: "svc-logo-image__loading" },
		As = e.defineComponent({
			__name: "Logo",
			props: { data: {} },
			setup(i) {
				const n = i,
					o = e.computed(() => n.data),
					t = e.computed(() => o.value.survey),
					s = e.ref(),
					r = h(() => new N.LogoImageViewModel(o.value, null), [() => o.value]),
					a = e.ref(),
					c = () => {
						a.value = t.value.locLogo.renderedHtml;
					};
				return (
					e.watch(
						() => t.value.locLogo,
						(_, k) => {
							c(), _ && _.onStringChanged.add(c), k && _.onStringChanged.remove(c);
						},
						{ immediate: !0 }
					),
					e.onMounted(() => {
						s.value && (r.value.root = s.value);
					}),
					e.onUnmounted(() => {
						r.value && (r.value.root = void 0);
					}),
					(_, k) => (
						e.openBlock(),
						e.createElementBlock(
							"div",
							{ class: "svc-logo-image", ref_key: "root", ref: s },
							[
								e.createElementVNode(
									"input",
									{
										type: "file",
										"aria-hidden": "true",
										tabindex: "-1",
										accept: e.unref(r).acceptedTypes,
										class: "svc-choose-file-input",
									},
									null,
									8,
									Ps
								),
								a.value
									? e.createCommentVNode("", !0)
									: (e.openBlock(),
									  e.createElementBlock(
											e.Fragment,
											{ key: 0 },
											[
												e.unref(r).allowEdit && !e.unref(r).isUploading
													? e.withDirectives(
															(e.openBlock(),
															e.createElementBlock(
																"div",
																{
																	key: 0,
																	class: "svc-logo-image-placeholder",
																	onClick:
																		k[0] ||
																		(k[0] = (p) =>
																			e
																				.unref(r)
																				.chooseFile(
																					e.unref(r)
																				)),
																},
																Rs
															)),
															[[e.unref(l.key2ClickDirective)]]
													  )
													: e.createCommentVNode("", !0),
											],
											64
									  )),
								a.value && !e.unref(r).isUploading
									? (e.openBlock(),
									  e.createElementBlock(
											"div",
											{
												key: 1,
												class: e.normalizeClass(e.unref(r).containerCss),
											},
											[
												e.createElementVNode("div", Fs, [
													e.withDirectives(
														(e.openBlock(),
														e.createElementBlock(
															"span",
															{
																class: "svc-context-button",
																onClick:
																	k[1] ||
																	(k[1] = (p) =>
																		e
																			.unref(r)
																			.chooseFile(
																				e.unref(r)
																			)),
																title: void 0,
																"aria-label": void 0,
															},
															[
																e.createVNode(
																	e.unref(l.SvComponent),
																	{
																		is: "sv-svg-icon",
																		iconName:
																			"icon-choosefile",
																		size: "auto",
																	}
																),
															]
														)),
														[[e.unref(l.key2ClickDirective)]]
													),
													e.withDirectives(
														(e.openBlock(),
														e.createElementBlock(
															"span",
															{
																class: "svc-context-button svc-context-button--danger",
																onClick:
																	k[2] ||
																	(k[2] = (p) =>
																		e
																			.unref(r)
																			.remove(e.unref(r))),
																title: void 0,
																"aria-label": void 0,
															},
															[
																e.createVNode(
																	e.unref(l.SvComponent),
																	{
																		is: "sv-svg-icon",
																		iconName: "icon-clear",
																		size: "auto",
																	}
																),
															]
														)),
														[[e.unref(l.key2ClickDirective)]]
													),
												]),
												e.createVNode(
													e.unref(l.SvComponent),
													{ is: "sv-logo-image", data: t.value },
													null,
													8,
													["data"]
												),
											],
											2
									  ))
									: e.createCommentVNode("", !0),
								e.unref(r).isUploading
									? (e.openBlock(),
									  e.createElementBlock("div", Ls, [
											e.createVNode(e.unref(l.SvComponent), {
												is: "sv-loading-indicator",
											}),
									  ]))
									: e.createCommentVNode("", !0),
							],
							512
						)
					)
				);
			},
		}),
		Qs = { key: 0, class: "svc-search" },
		Ks = { class: "svc-search__search-icon" },
		Hs = ["aria-label", "placeholder", "tabindex"],
		Os = { class: "svc-search__toolbar" },
		Ws = { class: "svc-search__toolbar-counter" },
		Gs = e.defineComponent({
			__name: "Search",
			props: { model: {} },
			setup(i) {
				const n = i;
				l.useBase(() => n.model);
				const o = e.computed({
					get: () => n.model.filterString,
					set: (t) => {
						const s = n.model;
						s.filterString = t;
					},
				});
				return (t, s) =>
					t.model.isVisible
						? (e.openBlock(),
						  e.createElementBlock("div", Qs, [
								e.createElementVNode("div", Ks, [
									e.createVNode(e.unref(l.SvComponent), {
										is: "sv-svg-icon",
										iconName: "icon-search",
										size: "auto",
									}),
								]),
								e.withDirectives(
									e.createElementVNode(
										"input",
										{
											type: "text",
											class: "svc-search__input",
											"onUpdate:modelValue":
												s[0] || (s[0] = (r) => (o.value = r)),
											"aria-label": t.model.filterStringPlaceholder,
											placeholder: t.model.filterStringPlaceholder,
											tabindex: t.model.getTabIndex(),
										},
										null,
										8,
										Hs
									),
									[[e.vModelText, o.value]]
								),
								e.createElementVNode("div", Os, [
									e.createElementVNode(
										"div",
										Ws,
										e.toDisplayString(t.model.matchCounterText),
										1
									),
									e.createVNode(
										e.unref(l.SvComponent),
										{ is: "sv-action-bar", model: t.model.searchActionBar },
										null,
										8,
										["model"]
									),
								]),
						  ]))
						: e.createCommentVNode("", !0);
			},
		}),
		js = ["title"],
		Js = e.defineComponent({
			__name: "PageNavigator",
			props: { pagesController: {}, pageEditMode: {} },
			setup(i) {
				const n = i,
					o = h(
						() => new N.PageNavigatorViewModel(n.pagesController, n.pageEditMode),
						[() => n.pagesController, () => n.pageEditMode]
					),
					t = e.ref();
				return (
					e.onMounted(() => {
						if (n.pageEditMode !== "bypage") {
							const s = t.value,
								r = o.value;
							s && r.attachToUI(s);
						}
					}),
					e.onBeforeUnmount(() => {
						const s = o.value;
						s.stopItemsContainerHeightObserver(), s.setScrollableContainer(void 0);
					}),
					e.onUnmounted(() => {
						o.value.dispose();
					}),
					(s, r) =>
						e.withDirectives(
							(e.openBlock(),
							e.createElementBlock(
								"div",
								{ class: "svc-page-navigator", ref_key: "root", ref: t },
								[
									e.createElementVNode("div", null, [
										e.withDirectives(
											(e.openBlock(),
											e.createElementBlock(
												"div",
												{
													role: "button",
													class: e.normalizeClass([
														"svc-page-navigator__selector svc-page-navigator__button",
														{
															"svc-page-navigator__button--pressed":
																e.unref(o).isPopupOpened,
														},
													]),
													onClick:
														r[0] ||
														(r[0] = (a) =>
															e.unref(o).togglePageSelector(a)),
													title: e.unref(o).pageSelectorCaption,
												},
												[
													e.createVNode(
														e.unref(l.SvComponent),
														{
															is: "sv-svg-icon",
															class: "svc-page-navigator__button-icon",
															iconName: e.unref(o).icon,
															size: "auto",
														},
														null,
														8,
														["iconName"]
													),
												],
												10,
												js
											)),
											[[e.unref(l.key2ClickDirective)]]
										),
										e.createVNode(
											e.unref(l.SvComponent),
											{ is: "sv-popup", model: e.unref(o).popupModel },
											null,
											8,
											["model"]
										),
									]),
									e.createElementVNode("div", null, [
										(e.openBlock(!0),
										e.createElementBlock(
											e.Fragment,
											null,
											e.renderList(
												e.unref(o).visibleItems,
												(a) => (
													e.openBlock(),
													e.createBlock(
														e.unref(l.SvComponent),
														{
															is: "svc-page-navigator-item",
															key: a.id,
															model: a,
														},
														null,
														8,
														["model"]
													)
												)
											),
											128
										)),
									]),
								],
								512
							)),
							[[e.vShow, e.unref(o).visible]]
						)
				);
			},
		}),
		Zs = { class: "svc-page-navigator-item" },
		Xs = ["title"],
		Ys = [
			e.createElementVNode(
				"div",
				{ class: "svc-page-navigator-item__dot-content" },
				null,
				-1
			),
		],
		xs = { class: "svc-page-navigator-item__banner" },
		Us = { class: "svc-page-navigator-item__text" },
		vs = e.createElementVNode(
			"span",
			{ class: "svc-page-navigator-item__dot" },
			[e.createElementVNode("span", { class: "svc-page-navigator-item__dot-content" })],
			-1
		),
		el = e.defineComponent({
			__name: "PageNavigatorItem",
			props: { model: {} },
			setup(i) {
				const n = i;
				l.useBase(() => n.model);
				const o = (t) => {
					n.model.action(), t.stopPropagation(), t.preventDefault();
				};
				return (t, s) => (
					e.openBlock(),
					e.createElementBlock("div", Zs, [
						e.withDirectives(
							(e.openBlock(),
							e.createElementBlock(
								"div",
								{
									role: "button",
									class: e.normalizeClass([
										"svc-page-navigator-item-content",
										{
											"svc-page-navigator-item--selected": t.model.active,
											"svc-page-navigator-item--disabled": t.model.disabled,
										},
									]),
									onClick: s[0] || (s[0] = (r) => o(r)),
								},
								[
									e.createElementVNode(
										"div",
										{
											class: "svc-page-navigator-item__dot",
											title: t.model.title,
										},
										Ys,
										8,
										Xs
									),
									e.createElementVNode("div", xs, [
										e.createElementVNode(
											"span",
											Us,
											e.toDisplayString(t.model.title),
											1
										),
										vs,
									]),
								],
								2
							)),
							[[e.unref(l.key2ClickDirective)]]
						),
					])
				);
			},
		}),
		ol = { class: "svc-question__dropdown-choices--wrapper" },
		tl = { class: "svc-question__dropdown-choices" },
		nl = e.defineComponent({
			__name: "Dropdown",
			props: { model: {}, element: {} },
			setup(i) {
				const n = i,
					o = (s) =>
						n.element.getItemValueWrapperComponentName(s) || n.model.itemComponent,
					t = (s) => ({
						componentName: n.model.itemComponent,
						componentData: {
							question: n.element,
							item: s,
							data: n.element.getItemValueWrapperComponentData(s),
						},
					});
				return (s, r) => (
					e.openBlock(),
					e.createElementBlock("div", ol, [
						e.createElementVNode("div", null, [
							e.createElementVNode("div", tl, [
								(e.openBlock(!0),
								e.createElementBlock(
									e.Fragment,
									null,
									e.renderList(
										s.model.getRenderedItems(),
										(a) => (
											e.openBlock(),
											e.createElementBlock(
												"div",
												{
													key: a.value,
													class: e.normalizeClass(
														s.model.getChoiceCss()
													),
												},
												[
													e.createVNode(
														e.unref(l.SvComponent),
														e.mergeProps({ is: o(a) }, t(a)),
														null,
														16,
														["is"]
													),
												],
												2
											)
										)
									),
									128
								)),
							]),
							s.model.needToCollapse
								? (e.openBlock(),
								  e.createBlock(
										e.unref(l.SvComponent),
										{
											key: 0,
											is: "svc-action-button",
											text: s.model.getButtonText(),
											click: s.model.switchCollapse.bind(s.model),
											allowBubble: !0,
										},
										null,
										8,
										["text", "click"]
								  ))
								: e.createCommentVNode("", !0),
						]),
					])
				);
			},
		}),
		sl = e.defineComponent({
			__name: "QuestionDropdown",
			props: { componentName: {}, componentData: {} },
			setup(i) {
				const n = i,
					o = () =>
						new N.QuestionDropdownAdornerViewModel(
							n.componentData.data,
							n.componentData.element,
							null
						);
				return (t, s) => (
					e.openBlock(),
					e.createBlock(
						u,
						{
							"create-model": o,
							element: t.componentData.element,
							"component-name": t.componentName,
							"component-data": t.componentData,
							"adorner-component": "svc-dropdown-question-adorner",
						},
						null,
						8,
						["element", "component-name", "component-data"]
					)
				);
			},
		}),
		ll = { class: "svc-question__adorner" },
		al = { class: "svc-question__content svc-question__content--in-popup" },
		rl = { class: "svc-question__dropdown-choices" },
		I = "survey-radiogroup-item",
		il = e.defineComponent({
			__name: "CellQuestionDropdown",
			props: { componentName: {}, componentData: {} },
			setup(i) {
				const n = i,
					o = e.computed(() => n.componentData.element),
					t = (r) => o.value.getItemValueWrapperComponentName(r) || I,
					s = (r) => ({
						componentName: I,
						componentData: {
							question: o.value,
							item: r,
							data: o.value.getItemValueWrapperComponentData(r),
						},
					});
				return (
					l.useBase(() => o.value),
					(r, a) => (
						e.openBlock(),
						e.createElementBlock("div", ll, [
							e.createElementVNode("div", al, [
								e.createVNode(
									e.unref(l.SvComponent),
									e.mergeProps({ is: r.componentName }, r.componentData),
									null,
									16,
									["is"]
								),
								e.createElementVNode("div", rl, [
									(e.openBlock(!0),
									e.createElementBlock(
										e.Fragment,
										null,
										e.renderList(
											o.value.visibleChoices,
											(c) => (
												e.openBlock(),
												e.createElementBlock(
													"div",
													{
														key: c.value,
														class: "svc-question__dropdown-choice",
													},
													[
														e.createVNode(
															e.unref(l.SvComponent),
															e.mergeProps({ is: t(c) }, s(c)),
															null,
															16,
															["is"]
														),
													]
												)
											)
										),
										128
									)),
								]),
							]),
						])
					)
				);
			},
		}),
		cl = ["data-sv-drop-target-survey-element"],
		dl = e.createElementVNode(
			"div",
			{ class: "svc-question__drop-indicator svc-question__drop-indicator--left" },
			null,
			-1
		),
		ml = e.createElementVNode(
			"div",
			{ class: "svc-question__drop-indicator svc-question__drop-indicator--right" },
			null,
			-1
		),
		pl = e.createElementVNode(
			"div",
			{ class: "svc-question__drop-indicator svc-question__drop-indicator--top" },
			null,
			-1
		),
		kl = e.createElementVNode(
			"div",
			{ class: "svc-question__drop-indicator svc-question__drop-indicator--bottom" },
			null,
			-1
		),
		fl = { class: "svc-widget__content" },
		_l = { key: 1, class: "svc-panel__placeholder_frame" },
		Cl = [
			e.createElementVNode(
				"div",
				{ class: "svc-panel__placeholder", "data-bind": "text: placeholderText" },
				null,
				-1
			),
		],
		gl = { class: "svc-question__content-actions" },
		bl = { key: 0, class: "svc-panel__placeholder_frame" },
		Bl = { class: "svc-panel__placeholder" },
		Nl = e.defineComponent({
			__name: "CustomWidget",
			props: { componentName: {}, componentData: {} },
			setup(i) {
				const n = i,
					o = e.ref(),
					t = h(
						() =>
							new N.QuestionAdornerViewModel(
								n.componentData.data,
								n.componentData.element,
								null
							),
						[() => n.componentData.data, () => n.componentData.element],
						(s) => {
							s.dispose();
						}
					);
				return (
					e.onUpdated(() => {
						o.value && t.value && (t.value.rootElement = o.value);
					}),
					e.onMounted(() => {
						o.value && t.value && (t.value.rootElement = o.value);
					}),
					(s, r) =>
						e.unref(t)
							? (e.openBlock(),
							  e.createElementBlock(
									"div",
									{
										key: 0,
										class: e.normalizeClass([
											"svc-question__adorner",
											e.unref(t).rootCss(),
										]),
										onMouseover:
											r[2] ||
											(r[2] = (a) => e.unref(t).hover(a, a.currentTarget)),
										onMouseleave:
											r[3] ||
											(r[3] = (a) => e.unref(t).hover(a, a.currentTarget)),
										"data-sv-drop-target-survey-element":
											e.unref(t).element.name || null,
										ref_key: "root",
										ref: o,
									},
									[
										e.unref(t).element.isInteractiveDesignElement
											? e.withDirectives(
													(e.openBlock(),
													e.createElementBlock(
														"div",
														{
															key: 0,
															class: e.normalizeClass([
																"svc-question__content",
																e.unref(t).css(),
															]),
															onClick:
																r[1] ||
																(r[1] = (a) =>
																	e
																		.unref(t)
																		.select(e.unref(t), a)),
															"data-bind": "clickBubble: false",
														},
														[
															dl,
															ml,
															pl,
															kl,
															e.unref(t).allowDragging
																? (e.openBlock(),
																  e.createElementBlock(
																		"div",
																		{
																			key: 0,
																			class: "svc-question__drag-area",
																			onPointerdown:
																				r[0] ||
																				(r[0] = (a) =>
																					e
																						.unref(t)
																						.onPointerDown(
																							a
																						)),
																		},
																		[
																			e.createVNode(
																				e.unref(
																					l.SvComponent
																				),
																				{
																					is: "sv-svg-icon",
																					class: "svc-question__drag-element",
																					iconName:
																						"icon-drag-area-indicator_24x16",
																					size: "auto",
																				}
																			),
																		],
																		32
																  ))
																: e.createCommentVNode("", !0),
															e.createElementVNode("div", fl, [
																e.createVNode(
																	e.unref(l.SvComponent),
																	e.mergeProps(
																		{ is: s.componentName },
																		s.componentData
																	),
																	null,
																	16,
																	["is"]
																),
															]),
															e.unref(t).isEmptyElement
																? (e.openBlock(),
																  e.createElementBlock(
																		"div",
																		_l,
																		Cl
																  ))
																: e.createCommentVNode("", !0),
															e.createElementVNode("div", gl, [
																e.createVNode(
																	e.unref(l.SvComponent),
																	{
																		is: "sv-action-bar",
																		model: e.unref(t)
																			.actionContainer,
																		handleClick: !1,
																	},
																	null,
																	8,
																	["model"]
																),
															]),
														],
														2
													)),
													[[e.unref(l.key2ClickDirective)]]
											  )
											: e.createCommentVNode("", !0),
										e.unref(t).element.isInteractiveDesignElement
											? e.createCommentVNode("", !0)
											: (e.openBlock(),
											  e.createElementBlock(
													e.Fragment,
													{ key: 1 },
													[
														e.createVNode(
															e.unref(l.SvComponent),
															e.mergeProps(
																{ is: s.componentName },
																s.componentData
															),
															null,
															16,
															["is"]
														),
														e.unref(t).isEmptyElement
															? (e.openBlock(),
															  e.createElementBlock("div", bl, [
																	e.createElementVNode(
																		"div",
																		Bl,
																		e.toDisplayString(
																			e.unref(t)
																				.placeholderText
																		),
																		1
																	),
															  ]))
															: e.createCommentVNode("", !0),
													],
													64
											  )),
									],
									42,
									cl
							  ))
							: e.createCommentVNode("", !0)
				);
			},
		}),
		hl = { class: "svc-carry-forward-panel-wrapper" },
		El = { class: "svc-carry-forward-panel" },
		yl = { class: "svc-carry-forward-panel__link" },
		wl = e.defineComponent({
			__name: "QuestionBanner",
			props: { model: {} },
			setup(i) {
				return (n, o) => (
					e.openBlock(),
					e.createElementBlock("div", hl, [
						e.createElementVNode("div", El, [
							e.createElementVNode(
								"span",
								null,
								e.toDisplayString(n.model.text) + e.toDisplayString(" "),
								1
							),
							e.createElementVNode("span", yl, [
								e.createVNode(
									e.unref(l.SvComponent),
									{
										is: "svc-action-button",
										text: n.model.actionText,
										click: n.model.onClick.bind(n.model),
									},
									null,
									8,
									["text", "click"]
								),
							]),
						]),
					])
				);
			},
		});
	function Sl(i, n, o) {
		i(n, o);
	}
	function P(i) {
		const n = Sl.bind(void 0, i);
		n("svc-tabbed-menu", J),
			n("svc-tabbed-menu-item-wrapper", X),
			n("svc-tabbed-menu-item", x),
			n("svc-side-bar", oe),
			n("svc-side-bar-default-header", le),
			n("svc-side-bar-page", ae),
			n("svc-tabs", ce),
			n("svc-tab-control", Ce),
			n("svc-tab-button", he),
			n("svc-property-grid-placeholder", De),
			n("svc-side-bar-header", ze),
			n("svc-side-bar-property-grid-header", Qe),
			n("svc-property-grid", ie),
			n("svc-object-selector", re),
			n("svc-search", Gs),
			n("svc-switcher", xe),
			n("svc-action-button", je),
			n("svc-question-error", Ke),
			n("survey-embeddedsurvey", Go),
			n("sv-logic-operator", Wo),
			n("survey-linkvalue", jo),
			n("survey-color", ct),
			n("color-item", dt),
			n("sv-boolean-switch", St),
			n("survey-fileedit", _t),
			n("survey-spinedit", Bt),
			n("survey-textwithreset", M),
			n("survey-commentwithreset", M),
			n("survey-widget", l.SurveyComponent),
			n("survey-simulator", eo),
			n("svc-tab-preview", io),
			n("svc-complete-page", mo),
			n("survey-results", Eo),
			n("survey-results-table-row", wo),
			n("json-error-item", Fo),
			n("svc-tab-json-editor-textarea", zo),
			n("svc-tab-json-editor-ace", $o),
			n("svc-tab-translation", xo),
			n("sd-translation-line-skeleton", tt),
			n("svc-translate-from-action", nt),
			n("svc-tab-logic", Ko),
			n("svc-tab-theme", at),
			n("svc-component-container", to),
			n("svc-toolbox", Lt),
			n("svc-toolbox-list", Yt),
			n("svc-toolbox-category", Xt),
			n("svc-toolbox-tool", Qt),
			n("svc-toolbox-item", Wt),
			n("svc-toolbox-item-group", Gt),
			n(N.editableStringRendererName, zt),
			n("svc-tab-designer", cn),
			n("svc-page-navigator", Js),
			n("svc-page-navigator-item", el),
			n("svc-page", Bn),
			n("svc-row", qn),
			n("svc-add-new-question-btn", hn),
			n("svc-add-question-type-selector", yn),
			n("svc-question", z),
			n("svc-rating-question", z),
			n("svc-rating-question-content", Jn),
			n("svc-image-question", Fn),
			n("svc-image-question-adorner", On),
			n("svc-matrix-cell", Xn),
			n("svc-cell-question", Un),
			n("svc-cell-dropdown-question", il),
			n("svc-question-editor-content", Is),
			n("svc-logo-image", As),
			n("svc-panel", ks),
			n("svc-item-value", hs),
			n("svc-image-item-value", zs),
			n("svc-dropdown-question", sl),
			n("svc-dropdown-question-adorner", nl),
			n("svc-widget-question", Nl),
			n("svc-question-banner", wl);
	}
	P((i, n) => l.ComponentFactory.Instance.registerComponent(i, n));
	const ql = {
		install(i) {
			i.component("SurveyCreatorComponent", V),
				P((n, o) => {
					i.component(n, o), l.ComponentFactory.Instance.registerComponent(n, n);
				});
		},
	};
	(y.SurveyCreatorComponent = V),
		(y.surveyCreatorPlugin = ql),
		Object.defineProperty(y, Symbol.toStringTag, { value: "Module" });
});
