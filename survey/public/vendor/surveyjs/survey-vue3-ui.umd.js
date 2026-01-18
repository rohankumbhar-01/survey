(function (h, e) {
	typeof exports == "object" && typeof module < "u"
		? e(exports, require("vue"), require("survey-core"))
		: typeof define == "function" && define.amd
		? define(["exports", "vue", "survey-core"], e)
		: ((h = typeof globalThis < "u" ? globalThis : h || self),
		  e((h.SurveyVue = {}), h.Vue, h.Survey));
})(this, function (h, e, k) {
	"use strict";
	var A1 = Object.defineProperty;
	var P1 = (h, e, k) =>
		e in h
			? A1(h, e, { enumerable: !0, configurable: !0, writable: !0, value: k })
			: (h[e] = k);
	var E = (h, e, k) => (P1(h, typeof e != "symbol" ? e + "" : e, k), k);
	const N = class N {
		constructor() {
			E(this, "creatorHash", {});
		}
		registerComponent(o, t) {
			this.creatorHash[o] = t;
		}
		getComponent(o) {
			return this.creatorHash[o] || o;
		}
		getAllTypes() {
			const o = new Array();
			for (const t in this.creatorHash) o.push(t);
			return o.sort();
		}
		isComponentRegistered(o) {
			return !!this.creatorHash[o];
		}
	};
	E(N, "Instance", new N());
	let q = N;
	const i = e.defineComponent({
		inheritAttrs: !1,
		__name: "SvComponent",
		props: { is: {} },
		setup(a) {
			const o = a,
				t = e.computed(() => q.Instance.getComponent(o.is));
			return (n, s) => (
				e.openBlock(),
				e.createBlock(
					e.resolveDynamicComponent(t.value),
					e.normalizeProps(e.guardReactiveProps(n.$attrs)),
					e.createSlots({ _: 2 }, [
						e.renderList(n.$slots, (l, r) => ({
							name: r,
							fn: e.withCtx((d) => [
								e.renderSlot(
									n.$slots,
									r,
									e.normalizeProps(e.guardReactiveProps(d))
								),
							]),
						})),
					]),
					1040
				)
			);
		},
	});
	class K {
		constructor(o) {
			E(this, "currentNextTickPromise");
			this.element = o;
		}
		async add() {
			const o = e.nextTick();
			this.currentNextTickPromise !== o &&
				((this.currentNextTickPromise = o),
				await o,
				o == this.currentNextTickPromise && this.element.afterRerender());
		}
	}
	function j(a) {
		let o = a.initialValue;
		return e.customRef((t, n) => {
			const s = () => {
				a.isUpdateAllowed() && (n(), a.nextRenderManager.add());
			};
			return {
				get() {
					return t(), o;
				},
				set(l) {
					const r = o !== l;
					(o = l), r && s();
				},
			};
		});
	}
	function G(a) {
		if (a) {
			if (
				((a.__vueUpdatesLock = a.__vueUpdatesLock ?? 0),
				(a.__vueImplemented = a.__vueImplemented ?? 0),
				a.__vueImplemented <= 0)
			) {
				const o = () => a.__vueUpdatesLock <= 0,
					t = new K(a),
					n = (l, r) => {
						const d = r.valueFromHash;
						o() && e.isRef(d) && (e.triggerRef(d), t.add());
					},
					s = (l, r, d) => {
						l[r] = j({
							initialValue: d === void 0 ? l[r] : d,
							surveyElement: a,
							isUpdateAllowed: o,
							nextRenderManager: t,
						});
					};
				a.addOnArrayChangedCallback(n),
					(a.createArrayCoreHandler = (l, r) => (s(l, r, []), e.unref(l[r]))),
					a.iteratePropertiesHash((l, r) => {
						s(l, r);
					}),
					(a.getPropertyValueCoreHandler = (l, r) => (
						e.isRef(l[r]) || s(l, r), e.unref(l[r])
					)),
					(a.setPropertyValueCoreHandler = (l, r, d) => {
						e.isRef(l[r]) ? (l[r].value = d) : s(l, r, d), t.add();
					}),
					(a.__vueClear = () => {
						a.iteratePropertiesHash((l, r) => {
							l[r] = e.unref(l[r]);
						}),
							delete a.__vueClear,
							delete a.__vueUpdatesLock,
							delete a.__vueImplemented,
							a.removeOnArrayChangedCallback(n),
							(a.createArrayCoreHandler = void 0),
							(a.getPropertyValueCoreHandler = void 0),
							(a.setPropertyValueCoreHandler = void 0),
							a.disableOnElementRerenderedEvent();
					}),
					a.enableOnElementRerenderedEvent();
			}
			a.__vueImplemented++;
		}
	}
	function J(a) {
		return !!a.__vueImplemented;
	}
	function R(a) {
		a &&
			((a.__vueImplemented = a.__vueImplemented ?? 0),
			a.__vueImplemented--,
			a.__vueImplemented <= 0 && typeof a.__vueClear == "function" && a.__vueClear());
	}
	function T(a) {
		a && a.__vueUpdatesLock !== void 0 && a.__vueUpdatesLock++;
	}
	function $(a) {
		a && a.__vueUpdatesLock !== void 0 && a.__vueUpdatesLock--;
	}
	function g(a, o, t) {
		let n;
		const s = e.watch(
			a,
			(r, d) => {
				r && o && o(r, d), d && (R(d), t && t(d)), (n = r), G(r);
			},
			{ immediate: !0 }
		);
		let l = !1;
		e.onBeforeUpdate(() => {
			T(n);
		}),
			e.onUpdated(() => {
				$(n);
			}),
			e.onBeforeMount(() => T(n)),
			e.onMounted(() => $(n)),
			e.onBeforeUnmount(() => {
				if (!l) {
					const r = a();
					r && (R(r), s(), t && t(r)), (l = !0);
				}
			});
	}
	function y(a, o, t, n) {
		g(() => a.question, t, n),
			e.onMounted(() => {
				a.question && a.question.afterRenderQuestionElement(o.value);
			}),
			e.onBeforeUnmount(() => {
				a.question.beforeDestroyQuestionElement(o.value);
			});
	}
	function w(a) {
		const o = e.ref(),
			t = (l) => {
				o.value = l.renderedHtml;
			},
			n = (l) => {
				(o.value = l.renderedHtml), l.onStringChanged.add(t);
			},
			s = e.watch(
				a,
				(l, r) => {
					r && r.onStringChanged.remove(t), n(l);
				},
				{ immediate: !0 }
			);
		return (
			e.onBeforeUnmount(() => {
				const l = a();
				l && l.onStringChanged.remove(t), s();
			}),
			o
		);
	}
	function M(a) {
		return a.customWidget
			? "survey-customwidget"
			: (a.isDefaultRendering && a.isDefaultRendering()) || a.isPanel
			? "survey-" + a.getTemplate()
			: a.getComponentName();
	}
	const X = e.defineComponent({
			__name: "Page",
			props: { survey: {}, page: {}, css: {} },
			setup(a) {
				const o = a,
					t = e.ref(null),
					n = () => {
						o.survey && t.value && o.survey.afterRenderPage(t.value);
					},
					s = e.computed(() => o.page._showDescription);
				return (
					g(
						() => o.page,
						() => {
							n();
						}
					),
					e.onMounted(() => {
						n();
					}),
					(l, r) => (
						e.openBlock(),
						e.createElementBlock(
							"div",
							{ class: e.normalizeClass(l.page.cssRoot), ref_key: "root", ref: t },
							[
								e.createVNode(
									i,
									{ is: "survey-element-title", element: l.page, css: l.css },
									null,
									8,
									["element", "css"]
								),
								s.value
									? (e.openBlock(),
									  e.createElementBlock(
											"div",
											{
												key: 0,
												class: e.normalizeClass(
													l.page.cssClasses.page.description
												),
											},
											[
												e.createVNode(
													i,
													{
														is: "survey-string",
														locString: l.page.locDescription,
													},
													null,
													8,
													["locString"]
												),
											],
											2
									  ))
									: e.createCommentVNode("", !0),
								e.createVNode(
									i,
									{ is: "survey-errors", element: l.page },
									null,
									8,
									["element"]
								),
								(e.openBlock(!0),
								e.createElementBlock(
									e.Fragment,
									null,
									e.renderList(
										l.page.visibleRows,
										(d) => (
											e.openBlock(),
											e.createBlock(
												i,
												e.mergeProps(
													{
														key: d.id,
														is: l.page
															.getSurvey()
															.getRowWrapperComponentName(d),
													},
													{
														componentData: l.page
															.getSurvey()
															.getRowWrapperComponentData(d),
													}
												),
												{
													default: e.withCtx(() => [
														e.createVNode(
															i,
															{
																is: "survey-row",
																row: d,
																survey: l.survey,
																css: l.css,
															},
															null,
															8,
															["row", "survey", "css"]
														),
													]),
													_: 2,
												},
												1040,
												["is"]
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
		Y = e.defineComponent({
			__name: "Header",
			props: { survey: {} },
			setup(a) {
				const o = a,
					t = e.ref();
				return (
					e.onMounted(() => {
						var n = t.value;
						n && o.survey && o.survey.afterRenderHeader(n);
					}),
					(n, s) =>
						n.survey.renderedHasHeader
							? (e.openBlock(),
							  e.createElementBlock(
									"div",
									{
										key: 0,
										class: e.normalizeClass(n.survey.css.header),
										ref_key: "root",
										ref: t,
									},
									[
										n.survey.isLogoBefore
											? (e.openBlock(),
											  e.createBlock(
													i,
													{
														key: 0,
														is: n.survey.getElementWrapperComponentName(
															n.survey,
															"logo-image"
														),
														data: n.survey.getElementWrapperComponentData(
															n.survey,
															"logo-image"
														),
													},
													null,
													8,
													["is", "data"]
											  ))
											: e.createCommentVNode("", !0),
										n.survey.renderedHasTitle
											? (e.openBlock(),
											  e.createElementBlock(
													"div",
													{
														key: 1,
														class: e.normalizeClass(
															n.survey.css.headerText
														),
														style: e.normalizeStyle({
															maxWidth: n.survey.titleMaxWidth,
														}),
													},
													[
														e.createVNode(
															i,
															{
																is: "survey-element-title",
																element: n.survey,
																css: n.survey.css,
															},
															null,
															8,
															["element", "css"]
														),
														n.survey.renderedHasDescription
															? (e.openBlock(),
															  e.createElementBlock(
																	"div",
																	{
																		key: 0,
																		class: e.normalizeClass(
																			n.survey.css
																				.description
																		),
																	},
																	[
																		e.createVNode(
																			i,
																			{
																				is: "survey-string",
																				locString:
																					n.survey
																						.locDescription,
																			},
																			null,
																			8,
																			["locString"]
																		),
																	],
																	2
															  ))
															: e.createCommentVNode("", !0),
													],
													6
											  ))
											: e.createCommentVNode("", !0),
										n.survey.isLogoAfter
											? (e.openBlock(),
											  e.createBlock(
													i,
													{
														key: 2,
														is: n.survey.getElementWrapperComponentName(
															n.survey,
															"logo-image"
														),
														data: n.survey.getElementWrapperComponentData(
															n.survey,
															"logo-image"
														),
													},
													null,
													8,
													["is", "data"]
											  ))
											: e.createCommentVNode("", !0),
										e.createElementVNode(
											"div",
											{ class: e.normalizeClass(n.survey.css.headerClose) },
											null,
											2
										),
									],
									2
							  ))
							: e.createCommentVNode("", !0)
				);
			},
		}),
		_ = e.defineComponent({
			__name: "Row",
			props: { row: {}, css: {}, survey: {} },
			setup(a) {
				const o = a,
					t = e.ref();
				let n;
				return (
					g(
						() => o.row,
						(s, l) => {
							s.setRootElement(t.value), l && (s.isNeedRender = l.isNeedRender);
						},
						(s) => {
							J(s) ||
								(clearTimeout(n),
								s.setRootElement(void 0),
								s.stopLazyRendering(),
								(s.isNeedRender = !s.isLazyRendering()));
						}
					),
					e.onMounted(() => {
						if (o.row && (o.row.setRootElement(t.value), !o.row.isNeedRender)) {
							const s = t.value;
							setTimeout(() => {
								o.row.startLazyRendering(s);
							}, 10);
						}
					}),
					(s, l) => (
						e.openBlock(),
						e.createElementBlock(
							"div",
							{
								class: e.normalizeClass(s.row.getRowCss()),
								ref_key: "root",
								ref: t,
							},
							[
								(e.openBlock(!0),
								e.createElementBlock(
									e.Fragment,
									null,
									e.renderList(
										s.row.visibleElements,
										(r) => (
											e.openBlock(),
											e.createBlock(
												i,
												{
													is: "survey-element",
													row: s.row,
													css: s.css,
													element: r,
													key: r.id,
												},
												null,
												8,
												["row", "css", "element"]
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
		v = [
			"id",
			"role",
			"aria-required",
			"aria-invalid",
			"aria-label",
			"aria-labelledby",
			"aria-describedby",
			"aria-expanded",
			"data-name",
		],
		x = ["aria-hidden", "data-sv-drop-target-matrix", "data-sv-drop-target-matrix-row"],
		ee = ["id"],
		oe = { inheritAttrs: !1 },
		ne = e.defineComponent({
			...oe,
			__name: "Question",
			props: { survey: {}, element: {}, css: {} },
			setup(a) {
				const o = a,
					t = e.ref(null);
				g(() => o.element);
				const n = (p) => p.cssContent,
					s = () => o.element.getRootStyle(),
					l = e.computed(() => o.element.singleInputQuestion),
					r = () => {
						t.value && o.element.afterRender(t.value);
					},
					d = e.watch(
						() => t.value,
						() => {
							r();
						}
					),
					m = e.computed(() =>
						o.element.customWidget
							? "survey-customwidget"
							: o.element.isDefaultRendering()
							? "survey-" + o.element.getTemplate()
							: o.element.getComponentName()
					),
					u = e.computed(() =>
						o.element.survey.getQuestionContentWrapperComponentName(o.element)
					),
					c = e.computed(() => ({
						componentData: {
							question: o.element,
							data: o.element.survey.getElementWrapperComponentData(o.element),
						},
					}));
				return (
					e.onUnmounted(() => {
						d();
					}),
					(p, C) => (
						e.openBlock(),
						e.createElementBlock(
							"div",
							{
								class: e.normalizeClass(p.element.getRootCss()),
								style: e.normalizeStyle(s()),
								ref_key: "root",
								ref: t,
								onFocusin: C[0] || (C[0] = (B) => p.element.focusIn()),
								id: p.element.id,
								role: p.element.ariaRole,
								"aria-required": p.element.ariaRequired,
								"aria-invalid": p.element.ariaInvalid,
								"aria-label": p.element.ariaLabel,
								"aria-labelledby": p.element.ariaLabelledBy,
								"aria-describedby": p.element.ariaDescribedBy,
								"aria-expanded": p.element.ariaExpanded,
								"data-name": p.element.name,
							},
							[
								p.element.singleInputHasActions
									? (e.openBlock(),
									  e.createBlock(
											i,
											{
												key: 0,
												is: "sv-breadcrumbs",
												model: p.element.singleInputActions,
												css: p.element.cssClasses,
											},
											null,
											8,
											["model", "css"]
									  ))
									: e.createCommentVNode("", !0),
								p.element.showErrorsAboveQuestion
									? (e.openBlock(),
									  e.createBlock(
											i,
											{
												key: 1,
												is: "survey-errors",
												element: p.element,
												location: "top",
											},
											null,
											8,
											["element"]
									  ))
									: e.createCommentVNode("", !0),
								p.element.hasTitleOnLeftTop
									? (e.openBlock(),
									  e.createBlock(
											i,
											{
												key: 2,
												is: "survey-element-header",
												element: p.element,
												css: p.element.cssClasses,
											},
											null,
											8,
											["element", "css"]
									  ))
									: e.createCommentVNode("", !0),
								p.element.singleInputSummary
									? (e.openBlock(),
									  e.createBlock(
											i,
											{
												key: 3,
												is: "sv-single-input-summary",
												css: p.element.cssClasses,
												summary: p.element.singleInputSummary,
											},
											null,
											8,
											["css", "summary"]
									  ))
									: l.value
									? (e.openBlock(),
									  e.createBlock(
											i,
											{
												is: "survey-question",
												css: p.css,
												element: l.value,
												survey: p.survey,
												key: l.value.id,
											},
											null,
											8,
											["css", "element", "survey"]
									  ))
									: (e.openBlock(),
									  e.createBlock(
											i,
											e.mergeProps({ key: 5, is: u.value }, c.value),
											{
												default: e.withCtx(() => [
													e.createElementVNode(
														"div",
														{
															class: e.normalizeClass(
																n(p.element) || void 0
															),
															"aria-hidden":
																p.element.contentAriaHidden,
															style: e.normalizeStyle({
																display: p.element
																	.renderedIsExpanded
																	? void 0
																	: "none",
															}),
															role: "presentation",
															"data-sv-drop-target-matrix":
																p.element.dragDropMatrixAttribute,
															"data-sv-drop-target-matrix-row":
																p.element.dragDropMatrixAttribute,
														},
														[
															e.createVNode(
																i,
																{
																	is: m.value,
																	question: p.element,
																},
																null,
																8,
																["is", "question"]
															),
															p.element.hasComment
																? (e.openBlock(),
																  e.createElementBlock(
																		"div",
																		{
																			key: 0,
																			class: e.normalizeClass(
																				p.element.getCommentAreaCss()
																			),
																		},
																		[
																			e.createElementVNode(
																				"div",
																				null,
																				[
																					e.createVNode(
																						i,
																						{
																							is: "survey-string",
																							locString:
																								p
																									.element
																									.locCommentText,
																						},
																						null,
																						8,
																						[
																							"locString",
																						]
																					),
																				]
																			),
																			e.createVNode(
																				i,
																				{
																					is: "survey-question-comment",
																					question:
																						p.element,
																				},
																				null,
																				8,
																				["question"]
																			),
																		],
																		2
																  ))
																: e.createCommentVNode("", !0),
															p.element.hasDescriptionUnderInput
																? (e.openBlock(),
																  e.createElementBlock(
																		"div",
																		{
																			key: 1,
																			class: e.normalizeClass(
																				p.element
																					.cssDescription
																			),
																			id: p.element
																				.ariaDescriptionId,
																		},
																		[
																			e.createVNode(
																				i,
																				{
																					is: "survey-string",
																					locString:
																						p.element
																							.locDescription,
																				},
																				null,
																				8,
																				["locString"]
																			),
																		],
																		10,
																		ee
																  ))
																: e.createCommentVNode("", !0),
														],
														14,
														x
													),
												]),
												_: 1,
											},
											16,
											["is"]
									  )),
								p.element.hasTitleOnBottom
									? (e.openBlock(),
									  e.createBlock(
											i,
											{
												key: 6,
												is: "survey-element-header",
												element: p.element,
												css: p.css,
											},
											null,
											8,
											["element", "css"]
									  ))
									: e.createCommentVNode("", !0),
								p.element.showErrorsBelowQuestion
									? (e.openBlock(),
									  e.createBlock(
											i,
											{
												key: 7,
												is: "survey-errors",
												element: p.element,
												location: "bottom",
											},
											null,
											8,
											["element"]
									  ))
									: e.createCommentVNode("", !0),
							],
							46,
							v
						)
					)
				);
			},
		}),
		se = ["id"],
		te = ["id", "role", "aria-labelledby", "aria-label"],
		le = { inheritAttrs: !1 },
		re = e.defineComponent({
			...le,
			inheritAttrs: !1,
			__name: "Panel",
			props: { element: {}, isEditMode: { type: Boolean }, css: {} },
			setup(a) {
				const o = a,
					t = e.ref(null),
					n = e.computed(() => o.element.survey);
				return (
					g(() => o.element),
					e.onMounted(() => {
						o.element.survey && o.element.afterRender(t.value);
					}),
					(s, l) =>
						s.element.getIsContentVisible()
							? (e.openBlock(),
							  e.createElementBlock(
									"div",
									{
										key: 0,
										class: e.normalizeClass(s.element.getContainerCss()),
										id: s.element.id,
										onFocusin: l[0] || (l[0] = (r) => s.element.focusIn()),
										ref_key: "root",
										ref: t,
									},
									[
										s.element.showErrorsAbovePanel
											? (e.openBlock(),
											  e.createBlock(
													i,
													{
														key: 0,
														is: "survey-errors",
														element: s.element,
													},
													null,
													8,
													["element"]
											  ))
											: e.createCommentVNode("", !0),
										s.element.hasTitle || s.element.hasDescription
											? (e.openBlock(),
											  e.createBlock(
													i,
													{
														key: 1,
														is: "survey-element-header",
														element: s.element,
														css: s.css,
													},
													null,
													8,
													["element", "css"]
											  ))
											: e.createCommentVNode("", !0),
										s.element.showErrorsAbovePanel
											? e.createCommentVNode("", !0)
											: (e.openBlock(),
											  e.createBlock(
													i,
													{
														key: 2,
														is: "survey-errors",
														element: s.element,
													},
													null,
													8,
													["element"]
											  )),
										s.element.renderedIsExpanded
											? (e.openBlock(),
											  e.createElementBlock(
													"div",
													{
														key: 3,
														id: s.element.contentId,
														style: e.normalizeStyle({
															paddingLeft:
																s.element.innerPaddingLeft,
														}),
														class: e.normalizeClass(
															s.element.cssClasses.panel.content
														),
														role: s.element.ariaRole,
														"aria-labelledby":
															s.element.ariaLabelledBy,
														"aria-label": s.element.ariaLabel,
													},
													[
														(e.openBlock(!0),
														e.createElementBlock(
															e.Fragment,
															null,
															e.renderList(
																s.element.visibleRows,
																(r) => (
																	e.openBlock(),
																	e.createBlock(
																		i,
																		e.mergeProps(
																			{
																				key: r.id,
																				is: s.element
																					.getSurvey()
																					.getRowWrapperComponentName(
																						r
																					),
																			},
																			{
																				componentData:
																					s.element
																						.getSurvey()
																						.getRowWrapperComponentData(
																							r
																						),
																			}
																		),
																		{
																			default: e.withCtx(
																				() => [
																					e.createVNode(
																						i,
																						{
																							is: "survey-row",
																							row: r,
																							survey: n.value,
																							css: s.css,
																						},
																						null,
																						8,
																						[
																							"row",
																							"survey",
																							"css",
																						]
																					),
																				]
																			),
																			_: 2,
																		},
																		1040,
																		["is"]
																	)
																)
															),
															128
														)),
														e.createVNode(
															i,
															{
																is: "sv-action-bar",
																model: s.element.getFooterToolbar(),
															},
															null,
															8,
															["model"]
														),
													],
													14,
													te
											  ))
											: e.createCommentVNode("", !0),
									],
									42,
									se
							  ))
							: e.createCommentVNode("", !0)
				);
			},
		}),
		ae = ["id"],
		ie = e.defineComponent({
			__name: "ElementHeader",
			props: { element: {}, css: {} },
			setup(a) {
				const o = a,
					t = (s) => {
						typeof o.element.clickTitleFunction == "function" &&
							o.element.clickTitleFunction(s);
					},
					n = () => {
						const s = { width: void 0 };
						return "titleWidth" in o.element && (s.width = o.element.titleWidth), s;
					};
				return (s, l) => (
					e.openBlock(),
					e.createElementBlock(
						"div",
						{
							class: e.normalizeClass(s.element.cssHeader),
							onClick: t,
							style: e.normalizeStyle(n()),
						},
						[
							e.createVNode(
								i,
								{ is: "survey-element-title", element: s.element, css: s.css },
								null,
								8,
								["element", "css"]
							),
							s.element.hasDescriptionUnderTitle
								? e.withDirectives(
										(e.openBlock(),
										e.createElementBlock(
											"div",
											{
												key: 0,
												class: e.normalizeClass(s.element.cssDescription),
												id: s.element.ariaDescriptionId,
											},
											[
												e.createVNode(
													i,
													{
														is: "survey-string",
														locString: s.element.locDescription,
													},
													null,
													8,
													["locString"]
												),
											],
											10,
											ae
										)),
										[[e.vShow, s.element.hasDescription]]
								  )
								: e.createCommentVNode("", !0),
							s.element.hasAdditionalTitleToolbar
								? (e.openBlock(),
								  e.createBlock(
										i,
										{
											key: 1,
											is: "sv-action-bar",
											model: s.element.additionalTitleToolbar,
										},
										null,
										8,
										["model"]
								  ))
								: e.createCommentVNode("", !0),
						],
						6
					)
				);
			},
		}),
		de = e.defineComponent({
			__name: "String",
			props: { locString: {} },
			setup(a) {
				return (o, t) => (
					e.openBlock(),
					e.createBlock(
						i,
						{ is: o.locString.renderAs, locString: o.locString.renderAsData },
						null,
						8,
						["is", "locString"]
					)
				);
			},
		}),
		me = ["innerHTML"],
		S = e.defineComponent({
			__name: "StringViewer",
			props: { locString: {}, textClass: {} },
			setup(a) {
				const o = a,
					t = w(() => o.locString),
					n = o.locString.getStringViewerClassName(o.textClass);
				return (s, l) =>
					s.locString.hasHtml
						? (e.openBlock(),
						  e.createElementBlock(
								"span",
								{
									key: 0,
									class: e.normalizeClass(e.unref(n)),
									innerHTML: e.unref(t),
								},
								null,
								10,
								me
						  ))
						: (e.openBlock(),
						  e.createElementBlock(
								"span",
								{ key: 1, class: e.normalizeClass(e.unref(n)) },
								e.toDisplayString(e.unref(t)),
								3
						  ));
			},
		}),
		ce = ["innerHTML"],
		pe = e.defineComponent({
			__name: "StringEditor",
			props: { locString: {} },
			setup(a) {
				const o = a,
					t = (s) => {
						const l = o.locString;
						l.text = s.target.innerText;
					},
					n = (s) => {
						s.preventDefault(), s.stopPropagation();
					};
				return (s, l) =>
					s.locString.hasHtml
						? (e.openBlock(),
						  e.createElementBlock(
								"span",
								{
									key: 0,
									class: "sv-string-editor",
									contenteditable: "true",
									innerHTML: s.locString.renderedHtml,
									onBlur: t,
									onClick: n,
								},
								null,
								40,
								ce
						  ))
						: (e.openBlock(),
						  e.createElementBlock(
								"span",
								{
									key: 1,
									class: "sv-string-editor",
									contenteditable: "true",
									onBlur: t,
									onClick: n,
								},
								e.toDisplayString(s.locString.renderedHtml),
								33
						  ));
			},
		}),
		Ce = ["id"],
		ge = e.defineComponent({
			__name: "Skeleton",
			props: { element: {} },
			setup(a) {
				const o = a;
				return (
					g(() => o.element),
					(t, n) => (
						e.openBlock(),
						e.createElementBlock(
							"div",
							{
								class: "sv-skeleton-element",
								id: t.element.id,
								style: e.normalizeStyle({ height: t.element.skeletonHeight }),
							},
							null,
							12,
							Ce
						)
					)
				);
			},
		}),
		ue = { class: "sv-scroll__container" },
		ke = [e.createElementVNode("div", { class: "sv-scroll__scrollbar-sizer" }, null, -1)],
		ye = e.defineComponent({
			__name: "Scroll",
			props: { disabled: {}, onInnerHeightChanged: { type: Function } },
			setup(a) {
				const o = a,
					t = new k.ScrollViewModel();
				t.onInnerHeightChanged = (s) => {
					o.onInnerHeightChanged && o.onInnerHeightChanged(s);
				};
				const n = e.ref();
				return (
					e.onMounted(() => {
						t.setRootElement(n.value);
					}),
					e.onUnmounted(() => {
						t.setRootElement(void 0), t.unsubscribeRootElement();
					}),
					(s, l) =>
						o.disabled
							? e.renderSlot(s.$slots, "default", { key: 0 })
							: (e.openBlock(),
							  e.createElementBlock(
									"div",
									{
										key: 1,
										ref_key: "root",
										ref: n,
										class: "sv-scroll__wrapper",
									},
									[
										e.createElementVNode(
											"div",
											{
												class: "sv-scroll__scroller sv-drag-target-skipped",
												onScroll:
													l[0] ||
													(l[0] = () => e.unref(t).onScrollContainer()),
											},
											[
												e.createElementVNode("div", ue, [
													e.renderSlot(s.$slots, "default"),
												]),
											],
											32
										),
										e.createElementVNode(
											"div",
											{
												class: "sv-scroll__scrollbar",
												onScroll:
													l[1] ||
													(l[1] = () => e.unref(t).onScrollScrollbar()),
											},
											ke,
											32
										),
									],
									512
							  ))
				);
			},
		}),
		he = ["id"],
		Be = ["value"],
		qe = e.defineComponent({
			inheritAttrs: !1,
			__name: "Text",
			props: { question: {} },
			setup(a) {
				const o = a,
					t = e.ref(null);
				return (
					y(o, t),
					(n, s) =>
						n.question.isReadOnlyRenderDiv()
							? (e.openBlock(),
							  e.createElementBlock(
									"div",
									{ key: 0, ref_key: "root", ref: t },
									e.toDisplayString(n.question.value),
									513
							  ))
							: n.question.dataListId
							? (e.openBlock(),
							  e.createElementBlock(
									"div",
									{ key: 1, ref_key: "root", ref: t },
									[
										e.createVNode(
											i,
											{ is: "survey-text-input", question: n.question },
											null,
											8,
											["question"]
										),
										e.createElementVNode(
											"datalist",
											{ id: n.question.dataListId },
											[
												(e.openBlock(!0),
												e.createElementBlock(
													e.Fragment,
													null,
													e.renderList(
														n.question.dataList,
														(l, r) => (
															e.openBlock(),
															e.createElementBlock(
																"option",
																{ key: r, value: l },
																null,
																8,
																Be
															)
														)
													),
													128
												)),
											],
											8,
											he
										),
									],
									512
							  ))
							: (e.openBlock(),
							  e.createBlock(
									i,
									{
										key: 2,
										is: "survey-text-input",
										question: n.question,
										"get-ref": (l) => {
											t.value = l;
										},
									},
									null,
									8,
									["question", "get-ref"]
							  ))
				);
			},
		}),
		we = [
			"disabled",
			"readonly",
			"type",
			"maxlength",
			"min",
			"max",
			"step",
			"size",
			"id",
			"list",
			"placeholder",
			"autocomplete",
			"value",
			"aria-required",
			"aria-label",
			"aria-labelledby",
			"aria-describedby",
			"aria-invalid",
			"aria-errormessage",
		],
		fe = [
			"disabled",
			"readonly",
			"type",
			"maxlength",
			"min",
			"max",
			"step",
			"size",
			"id",
			"list",
			"placeholder",
			"autocomplete",
			"value",
			"aria-required",
			"aria-label",
			"aria-labelledby",
			"aria-describedby",
			"aria-invalid",
			"aria-errormessage",
		],
		Ve = e.defineComponent({
			__name: "TextInput",
			props: { question: {}, getRef: { type: Function } },
			setup(a, { expose: o }) {
				const t = a,
					n = function (r) {
						t.getRef && t.getRef(r);
					},
					s = e.ref(null);
				o({ root: s }), g(() => t.question);
				const l = e.computed(() => t.question.inputStyle);
				return (r, d) =>
					r.question.getMaxLength()
						? (e.openBlock(),
						  e.createElementBlock(
								"div",
								{ key: 1, ref: (m) => n(m) },
								[
									e.createElementVNode(
										"input",
										{
											disabled: r.question.isDisabledAttr,
											readonly: r.question.isReadOnlyAttr,
											class: e.normalizeClass(r.question.getControlClass()),
											type: r.question.inputType,
											maxlength: r.question.getMaxLength(),
											min: r.question.renderedMin,
											max: r.question.renderedMax,
											step: r.question.renderedStep,
											size: r.question.renderedInputSize,
											style: e.normalizeStyle(l.value),
											id: r.question.inputId,
											list: r.question.dataListId,
											placeholder: r.question.renderedPlaceholder,
											autocomplete: r.question.autocomplete,
											value: r.question.inputValue,
											onChange:
												d[8] ||
												(d[8] = (...m) =>
													r.question.onChange &&
													r.question.onChange(...m)),
											onClick:
												d[9] ||
												(d[9] = (...m) =>
													r.question.readOnlyBlocker &&
													r.question.readOnlyBlocker(...m)),
											onPointerdown:
												d[10] ||
												(d[10] = (...m) =>
													r.question.readOnlyBlocker &&
													r.question.readOnlyBlocker(...m)),
											onKeyup:
												d[11] ||
												(d[11] = (...m) =>
													r.question.onKeyUp &&
													r.question.onKeyUp(...m)),
											onKeydown:
												d[12] ||
												(d[12] = (...m) =>
													r.question.onKeyDown &&
													r.question.onKeyDown(...m)),
											onCompositionUpdate:
												d[13] ||
												(d[13] = (...m) =>
													r.question.onCompositionUpdate &&
													r.question.onCompositionUpdate(...m)),
											onBlur:
												d[14] ||
												(d[14] = (...m) =>
													r.question.onBlur && r.question.onBlur(...m)),
											onFocus:
												d[15] ||
												(d[15] = (...m) =>
													r.question.onFocus &&
													r.question.onFocus(...m)),
											"aria-required": r.question.a11y_input_ariaRequired,
											"aria-label": r.question.a11y_input_ariaLabel,
											"aria-labelledby":
												r.question.a11y_input_ariaLabelledBy,
											"aria-describedby":
												r.question.a11y_input_ariaDescribedBy,
											"aria-invalid": r.question.a11y_input_ariaInvalid,
											"aria-errormessage":
												r.question.a11y_input_ariaErrormessage,
										},
										null,
										46,
										fe
									),
									e.createVNode(
										i,
										{
											is: "sv-character-counter",
											counter: r.question.characterCounter,
											remainingCharacterCounter:
												r.question.cssClasses.remainingCharacterCounter,
										},
										null,
										8,
										["counter", "remainingCharacterCounter"]
									),
								],
								512
						  ))
						: (e.openBlock(),
						  e.createElementBlock(
								"input",
								{
									key: 0,
									ref: (m) => n(m),
									disabled: r.question.isDisabledAttr,
									readonly: r.question.isReadOnlyAttr,
									class: e.normalizeClass(r.question.getControlClass()),
									type: r.question.inputType,
									maxlength: r.question.getMaxLength(),
									min: r.question.renderedMin,
									max: r.question.renderedMax,
									step: r.question.renderedStep,
									size: r.question.renderedInputSize,
									style: e.normalizeStyle(l.value),
									id: r.question.inputId,
									list: r.question.dataListId,
									placeholder: r.question.renderedPlaceholder,
									autocomplete: r.question.autocomplete,
									value: r.question.inputValue,
									onChange:
										d[0] ||
										(d[0] = (...m) =>
											r.question.onChange && r.question.onChange(...m)),
									onClick:
										d[1] ||
										(d[1] = (...m) =>
											r.question.readOnlyBlocker &&
											r.question.readOnlyBlocker(...m)),
									onPointerdown:
										d[2] ||
										(d[2] = (...m) =>
											r.question.readOnlyBlocker &&
											r.question.readOnlyBlocker(...m)),
									onKeyup:
										d[3] ||
										(d[3] = (...m) =>
											r.question.onKeyUp && r.question.onKeyUp(...m)),
									onKeydown:
										d[4] ||
										(d[4] = (...m) =>
											r.question.onKeyDown && r.question.onKeyDown(...m)),
									onCompositionUpdate:
										d[5] ||
										(d[5] = (...m) =>
											r.question.onCompositionUpdate &&
											r.question.onCompositionUpdate(...m)),
									onBlur:
										d[6] ||
										(d[6] = (...m) =>
											r.question.onBlur && r.question.onBlur(...m)),
									onFocus:
										d[7] ||
										(d[7] = (...m) =>
											r.question.onFocus && r.question.onFocus(...m)),
									"aria-required": r.question.a11y_input_ariaRequired,
									"aria-label": r.question.a11y_input_ariaLabel,
									"aria-labelledby": r.question.a11y_input_ariaLabelledBy,
									"aria-describedby": r.question.a11y_input_ariaDescribedBy,
									"aria-invalid": r.question.a11y_input_ariaInvalid,
									"aria-errormessage": r.question.a11y_input_ariaErrormessage,
								},
								null,
								46,
								we
						  ));
			},
		}),
		be = [
			"role",
			"aria-required",
			"aria-label",
			"aria-labelledby",
			"aria-describedby",
			"aria-invalid",
			"aria-errormessage",
		],
		Le = { key: 0, class: "sv-hidden" },
		Ne = { key: 6 },
		Ee = ["value"],
		D = e.defineComponent({
			inheritAttrs: !1,
			__name: "SelectBase",
			props: { question: {}, showLegend: { type: Boolean } },
			setup(a) {
				const o = a,
					t = e.ref(null);
				y(o, t);
				const n = (l) =>
						o.question.getItemValueWrapperComponentName(l) || o.question.itemComponent,
					s = (l) => ({
						componentName: o.question.itemComponent,
						componentData: {
							question: o.question,
							item: l,
							data: o.question.getItemValueWrapperComponentData(l),
						},
					});
				return (l, r) => (
					e.openBlock(),
					e.createElementBlock(
						"fieldset",
						{
							class: e.normalizeClass(l.question.getSelectBaseRootCss()),
							ref_key: "root",
							ref: t,
							role: l.question.a11y_input_ariaRole,
							"aria-required": l.question.a11y_input_ariaRequired,
							"aria-label": l.question.a11y_input_ariaLabel,
							"aria-labelledby": l.question.a11y_input_ariaLabelledBy,
							"aria-describedby": l.question.a11y_input_ariaDescribedBy,
							"aria-invalid": l.question.a11y_input_ariaInvalid,
							"aria-errormessage": l.question.a11y_input_ariaErrormessage,
						},
						[
							l.showLegend
								? (e.openBlock(),
								  e.createElementBlock(
										"legend",
										Le,
										e.toDisplayString(l.question.locTitle.renderedHtml),
										1
								  ))
								: e.createCommentVNode("", !0),
							l.question.hasHeadItems
								? (e.openBlock(!0),
								  e.createElementBlock(
										e.Fragment,
										{ key: 1 },
										e.renderList(
											l.question.headItems,
											(d) => (
												e.openBlock(),
												e.createBlock(
													i,
													e.mergeProps(
														{ key: d.uniqueId, is: n(d) },
														s(d)
													),
													null,
													16,
													["is"]
												)
											)
										),
										128
								  ))
								: e.createCommentVNode("", !0),
							!l.question.hasColumns && !l.question.blockedRow
								? (e.openBlock(!0),
								  e.createElementBlock(
										e.Fragment,
										{ key: 2 },
										e.renderList(
											l.question.bodyItems,
											(d) => (
												e.openBlock(),
												e.createBlock(
													i,
													e.mergeProps(
														{ key: d.uniqueId, is: n(d) },
														s(d)
													),
													null,
													16,
													["is"]
												)
											)
										),
										128
								  ))
								: e.createCommentVNode("", !0),
							l.question.blockedRow
								? (e.openBlock(),
								  e.createElementBlock(
										"div",
										{
											key: 3,
											class: e.normalizeClass(l.question.cssClasses.rootRow),
										},
										[
											!l.question.hasColumns && l.question.blockedRow
												? (e.openBlock(!0),
												  e.createElementBlock(
														e.Fragment,
														{ key: 0 },
														e.renderList(
															l.question.dataChoices,
															(d) => (
																e.openBlock(),
																e.createBlock(
																	i,
																	e.mergeProps(
																		{
																			key: d.uniqueId,
																			is: n(d),
																		},
																		s(d)
																	),
																	null,
																	16,
																	["is"]
																)
															)
														),
														128
												  ))
												: e.createCommentVNode("", !0),
										],
										2
								  ))
								: e.createCommentVNode("", !0),
							l.question.hasColumns
								? (e.openBlock(),
								  e.createElementBlock(
										"div",
										{
											key: 4,
											class: e.normalizeClass(
												l.question.cssClasses.rootMultiColumn
											),
										},
										[
											l.question.hasColumns
												? (e.openBlock(!0),
												  e.createElementBlock(
														e.Fragment,
														{ key: 0 },
														e.renderList(
															l.question.columns,
															(d, m) => (
																e.openBlock(),
																e.createElementBlock(
																	"div",
																	{
																		key: m,
																		class: e.normalizeClass(
																			l.question.getColumnClass()
																		),
																		role: "presentation",
																	},
																	[
																		(e.openBlock(!0),
																		e.createElementBlock(
																			e.Fragment,
																			null,
																			e.renderList(
																				d,
																				(u) => (
																					e.openBlock(),
																					e.createBlock(
																						i,
																						e.mergeProps(
																							{
																								key: u.uniqueId,
																								is: n(
																									u
																								),
																							},
																							s(u)
																						),
																						null,
																						16,
																						["is"]
																					)
																				)
																			),
																			128
																		)),
																	],
																	2
																)
															)
														),
														128
												  ))
												: e.createCommentVNode("", !0),
										],
										2
								  ))
								: e.createCommentVNode("", !0),
							l.question.hasFootItems
								? (e.openBlock(!0),
								  e.createElementBlock(
										e.Fragment,
										{ key: 5 },
										e.renderList(
											l.question.footItems,
											(d) => (
												e.openBlock(),
												e.createBlock(
													i,
													e.mergeProps(
														{ key: d.uniqueId, is: n(d) },
														s(d)
													),
													null,
													16,
													["is"]
												)
											)
										),
										128
								  ))
								: e.createCommentVNode("", !0),
							l.question.showClearButtonInContent
								? (e.openBlock(),
								  e.createElementBlock("div", Ne, [
										e.createElementVNode(
											"input",
											{
												type: "button",
												class: e.normalizeClass(
													l.question.cssClasses.clearButton
												),
												onClick:
													r[0] ||
													(r[0] = () => {
														l.question.clearValueFromUI();
													}),
												value: l.question.clearButtonCaption,
											},
											null,
											10,
											Ee
										),
								  ]))
								: e.createCommentVNode("", !0),
						],
						10,
						be
					)
				);
			},
		}),
		Me = e.defineComponent({
			inheritAttrs: !1,
			__name: "Checkbox",
			props: { question: {} },
			setup(a) {
				return (o, t) => (
					e.openBlock(),
					e.createBlock(D, { question: o.question, "show-legend": !0 }, null, 8, [
						"question",
					])
				);
			},
		});
	function Z(a, o, t) {
		e.onMounted(() => {
			t.value && (o().isDesignMode || a().setRootElement(t.value));
		}),
			e.onUnmounted(() => {
				o().isDesignMode || a().setRootElement(void 0);
			}),
			g(a, (n, s) => {
				o().isDesignMode ||
					(n && t.value && n.setRootElement(t.value), s && s.setRootElement(void 0));
			});
	}
	const Se = [
			"name",
			"checked",
			"value",
			"id",
			"disabled",
			"readonly",
			"required",
			"aria-label",
		],
		ze = ["xlink:href"],
		He = e.defineComponent({
			inheritAttrs: !1,
			__name: "CheckboxItem",
			props: { question: {}, item: {}, hideLabel: { type: Boolean }, ariaLabel: {} },
			setup(a) {
				const o = e.ref(),
					t = a;
				Z(
					() => t.item,
					() => t.question,
					o
				);
				const n = (s) => {
					t.question.clickItemHandler(t.item, s.target.checked);
				};
				return (s, l) => (
					e.openBlock(),
					e.createElementBlock(
						e.Fragment,
						null,
						[
							e.createElementVNode(
								"div",
								{
									role: "presentation",
									class: e.normalizeClass(s.question.getItemClass(s.item)),
									ref_key: "root",
									ref: o,
								},
								[
									e.createElementVNode(
										"label",
										{
											class: e.normalizeClass(
												s.question.getLabelClass(s.item)
											),
										},
										[
											e.createElementVNode(
												"input",
												{
													type: "checkbox",
													name: s.question.name + s.item.id,
													checked: s.question.isItemSelected(s.item),
													onInput:
														l[0] ||
														(l[0] = (r) => {
															n(r);
														}),
													value: s.item.value,
													id: s.question.getItemId(s.item),
													disabled: !s.question.getItemEnabled(s.item),
													readonly: s.question.isReadOnlyAttr,
													class: e.normalizeClass(
														s.question.cssClasses.itemControl
													),
													required: s.question.hasRequiredError(),
													"aria-label": s.ariaLabel,
												},
												null,
												42,
												Se
											),
											s.question.cssClasses.materialDecorator
												? (e.openBlock(),
												  e.createElementBlock(
														"span",
														{
															key: 0,
															class: e.normalizeClass(
																s.question.cssClasses
																	.materialDecorator
															),
														},
														[
															s.question.itemSvgIcon
																? (e.openBlock(),
																  e.createElementBlock(
																		"svg",
																		{
																			key: 0,
																			class: e.normalizeClass(
																				s.question
																					.cssClasses
																					.itemDecorator
																			),
																		},
																		[
																			e.createElementVNode(
																				"use",
																				{
																					"xlink:href":
																						s.question
																							.itemSvgIcon,
																				},
																				null,
																				8,
																				ze
																			),
																		],
																		2
																  ))
																: e.createCommentVNode("", !0),
														],
														2
												  ))
												: e.createCommentVNode("", !0),
											s.hideLabel
												? e.createCommentVNode("", !0)
												: (e.openBlock(),
												  e.createElementBlock(
														"span",
														{
															key: 1,
															class: e.normalizeClass(
																s.question.cssClasses.controlLabel
															),
														},
														[
															e.createVNode(
																i,
																{
																	is: "survey-string",
																	locString: s.item.locText,
																},
																null,
																8,
																["locString"]
															),
														],
														2
												  )),
										],
										2
									),
								],
								2
							),
							s.item.isPanelShowing
								? (e.openBlock(),
								  e.createBlock(
										i,
										{
											key: 0,
											is: "survey-panel",
											element: s.item.panel,
											cssClasses: s.question.cssClasses,
										},
										null,
										8,
										["element", "cssClasses"]
								  ))
								: e.createCommentVNode("", !0),
							s.item.isCommentShowing
								? (e.openBlock(),
								  e.createBlock(
										i,
										{
											key: 1,
											is: "survey-other-choice",
											question: s.question,
											item: s.item,
										},
										null,
										8,
										["question", "item"]
								  ))
								: e.createCommentVNode("", !0),
						],
						64
					)
				);
			},
		}),
		Ie = e.defineComponent({
			inheritAttrs: !1,
			__name: "Radiogroup",
			props: { question: {} },
			setup(a) {
				return (o, t) => (
					e.openBlock(),
					e.createBlock(D, { question: o.question }, null, 8, ["question"])
				);
			},
		}),
		Re = [
			"name",
			"value",
			"id",
			"aria-errormessage",
			"checked",
			"disabled",
			"readonly",
			"aria-label",
		],
		Te = ["xlink:href"],
		$e = e.defineComponent({
			inheritAttrs: !1,
			__name: "RadiogroupItem",
			props: { question: {}, item: {}, hideLabel: { type: Boolean }, ariaLabel: {} },
			setup(a) {
				const o = e.ref(),
					t = a,
					n = (r) => t.question.getLabelClass(r),
					s = (r) => t.question.getControlLabelClass(r),
					l = () => {
						t.question.clickItemHandler(t.item);
					};
				return (
					Z(
						() => t.item,
						() => t.question,
						o
					),
					(r, d) => (
						e.openBlock(),
						e.createElementBlock(
							e.Fragment,
							null,
							[
								e.createElementVNode(
									"div",
									{
										role: "presentation",
										class: e.normalizeClass(r.question.getItemClass(r.item)),
										ref_key: "root",
										ref: o,
									},
									[
										e.createElementVNode(
											"label",
											{
												onMousedown:
													d[1] ||
													(d[1] = (m) => r.question.onMouseDown()),
												class: e.normalizeClass(n(r.item)),
											},
											[
												e.createElementVNode(
													"input",
													{
														type: "radio",
														name: r.question.questionName,
														value: r.item.value,
														id: r.question.getItemId(r.item),
														"aria-errormessage":
															r.question.ariaErrormessage,
														checked: r.question.isItemSelected(r.item),
														onInput:
															d[0] ||
															(d[0] = (m) => {
																l();
															}),
														disabled: !r.question.getItemEnabled(
															r.item
														),
														readonly: r.question.isReadOnlyAttr,
														class: e.normalizeClass(
															r.question.cssClasses.itemControl
														),
														"aria-label": r.ariaLabel,
													},
													null,
													42,
													Re
												),
												r.question.cssClasses.materialDecorator
													? (e.openBlock(),
													  e.createElementBlock(
															"span",
															{
																key: 0,
																class: e.normalizeClass(
																	r.question.cssClasses
																		.materialDecorator
																),
															},
															[
																r.question.itemSvgIcon
																	? (e.openBlock(),
																	  e.createElementBlock(
																			"svg",
																			{
																				key: 0,
																				class: e.normalizeClass(
																					r.question
																						.cssClasses
																						.itemDecorator
																				),
																			},
																			[
																				e.createElementVNode(
																					"use",
																					{
																						"xlink:href":
																							r
																								.question
																								.itemSvgIcon,
																					},
																					null,
																					8,
																					Te
																				),
																			],
																			2
																	  ))
																	: e.createCommentVNode("", !0),
															],
															2
													  ))
													: e.createCommentVNode("", !0),
												r.hideLabel
													? e.createCommentVNode("", !0)
													: (e.openBlock(),
													  e.createElementBlock(
															"span",
															{
																key: 1,
																class: e.normalizeClass(s(r.item)),
															},
															[
																e.createVNode(
																	i,
																	{
																		is: "survey-string",
																		locString: r.item.locText,
																	},
																	null,
																	8,
																	["locString"]
																),
															],
															2
													  )),
											],
											34
										),
									],
									2
								),
								r.item.isPanelShowing
									? (e.openBlock(),
									  e.createBlock(
											i,
											{
												key: 0,
												is: "survey-panel",
												element: r.item.panel,
												cssClasses: r.question.cssClasses,
											},
											null,
											8,
											["element", "cssClasses"]
									  ))
									: e.createCommentVNode("", !0),
								r.item.isCommentShowing
									? (e.openBlock(),
									  e.createBlock(
											i,
											{
												key: 1,
												is: "survey-other-choice",
												question: r.question,
												item: r.item,
											},
											null,
											8,
											["question", "item"]
									  ))
									: e.createCommentVNode("", !0),
							],
							64
						)
					)
				);
			},
		}),
		De = ["src"],
		Ze = ["title"],
		Ae = { key: 0 },
		Pe = e.defineComponent({
			inheritAttrs: !1,
			__name: "Signaturepad",
			props: { question: {} },
			setup(a) {
				const o = a,
					t = e.ref(null);
				return (
					y(o, t),
					(n, s) => (
						e.openBlock(),
						e.createElementBlock(
							"div",
							{
								class: e.normalizeClass(n.question.cssClasses.root),
								ref_key: "root",
								ref: t,
								style: e.normalizeStyle({ width: n.question.renderedCanvasWidth }),
							},
							[
								e.withDirectives(
									e.createElementVNode(
										"div",
										{
											class: e.normalizeClass(
												n.question.cssClasses.placeholder
											),
										},
										[
											e.createVNode(
												i,
												{
													is: "survey-string",
													locString: n.question.locRenderedPlaceholder,
												},
												null,
												8,
												["locString"]
											),
										],
										2
									),
									[[e.vShow, n.question.needShowPlaceholder()]]
								),
								e.createElementVNode("div", null, [
									n.question.backgroundImage
										? (e.openBlock(),
										  e.createElementBlock(
												"img",
												{
													key: 0,
													role: "presentation",
													class: e.normalizeClass(
														n.question.cssClasses.backgroundImage
													),
													src: n.question.backgroundImage,
													style: e.normalizeStyle({
														width: n.question.renderedCanvasWidth,
													}),
												},
												null,
												14,
												De
										  ))
										: e.createCommentVNode("", !0),
									e.createElementVNode(
										"canvas",
										{
											tabindex: "-1",
											class: e.normalizeClass(n.question.cssClasses.canvas),
											onBlur:
												s[0] ||
												(s[0] = (...l) =>
													n.question.onBlur && n.question.onBlur(...l)),
										},
										null,
										34
									),
								]),
								n.question.canShowClearButton
									? (e.openBlock(),
									  e.createElementBlock(
											"div",
											{
												key: 0,
												class: e.normalizeClass(
													n.question.cssClasses.controls
												),
											},
											[
												e.createElementVNode(
													"button",
													{
														type: "button",
														class: e.normalizeClass(
															n.question.cssClasses.clearButton
														),
														title: n.question.clearButtonCaption,
														onClick:
															s[1] ||
															(s[1] = () => {
																n.question.clearValueFromUI();
															}),
													},
													[
														n.question.cssClasses.clearButtonIconId
															? e.createCommentVNode("", !0)
															: (e.openBlock(),
															  e.createElementBlock(
																	"span",
																	Ae,
																	"✖"
															  )),
														n.question.cssClasses.clearButtonIconId
															? (e.openBlock(),
															  e.createBlock(
																	i,
																	{
																		key: 1,
																		is: "sv-svg-icon",
																		iconName:
																			n.question.cssClasses
																				.clearButtonIconId,
																		size: "auto",
																	},
																	null,
																	8,
																	["iconName"]
															  ))
															: e.createCommentVNode("", !0),
													],
													10,
													Ze
												),
											],
											2
									  ))
									: e.createCommentVNode("", !0),
								n.question.showLoadingIndicator
									? (e.openBlock(),
									  e.createElementBlock(
											"div",
											{
												key: 1,
												class: e.normalizeClass(
													n.question.cssClasses.loadingIndicator
												),
											},
											[e.createVNode(i, { is: "sv-loading-indicator" })],
											2
									  ))
									: e.createCommentVNode("", !0),
							],
							6
						)
					)
				);
			},
		}),
		Fe = ["innerHTML"],
		We = e.defineComponent({
			inheritAttrs: !1,
			__name: "Html",
			props: { question: {} },
			setup(a) {
				const o = a,
					t = e.ref(null);
				y(o, t);
				const n = w(() => o.question.locHtml);
				return (s, l) => (
					e.openBlock(),
					e.createElementBlock(
						"div",
						{
							ref_key: "root",
							ref: t,
							class: e.normalizeClass(s.question.renderCssRoot),
							innerHTML: e.unref(n),
						},
						null,
						10,
						Fe
					)
				);
			},
		}),
		Oe = ["src", "alt", "width", "height"],
		Ue = ["src", "width", "height"],
		Qe = ["src", "title", "width", "height"],
		Ke = e.defineComponent({
			inheritAttrs: !1,
			__name: "Image",
			props: { question: {} },
			setup(a) {
				const o = a,
					t = e.ref(null);
				y(o, t);
				const n = w(() => o.question.locImageLink);
				return (s, l) => (
					e.openBlock(),
					e.createElementBlock(
						"div",
						{
							class: e.normalizeClass(s.question.cssClasses.root),
							ref_key: "root",
							ref: t,
						},
						[
							s.question.renderedMode === "image"
								? e.withDirectives(
										(e.openBlock(),
										e.createElementBlock(
											"img",
											{
												key: 0,
												class: e.normalizeClass(s.question.getImageCss()),
												src: e.unref(n),
												alt: s.question.altText || s.question.title,
												width: s.question.renderedWidth,
												height: s.question.renderedHeight,
												style: e.normalizeStyle({
													objectFit: s.question.imageFit,
													width: s.question.renderedStyleWidth,
													height: s.question.renderedStyleHeight,
												}),
												onLoad:
													l[0] ||
													(l[0] = (r) => {
														s.question.onLoadHandler();
													}),
												onError:
													l[1] ||
													(l[1] = (r) => {
														s.question.onErrorHandler();
													}),
											},
											null,
											46,
											Oe
										)),
										[[e.vShow, e.unref(n) && !s.question.contentNotLoaded]]
								  )
								: e.createCommentVNode("", !0),
							s.question.renderedMode === "video"
								? e.withDirectives(
										(e.openBlock(),
										e.createElementBlock(
											"video",
											{
												key: 1,
												controls: "",
												class: e.normalizeClass(s.question.getImageCss()),
												src: e.unref(n),
												width: s.question.renderedWidth,
												height: s.question.renderedHeight,
												style: e.normalizeStyle({
													objectFit: s.question.imageFit,
													width: s.question.renderedStyleWidth,
													height: s.question.renderedStyleHeight,
												}),
												onLoadedmetadata:
													l[2] ||
													(l[2] = (r) => {
														s.question.onLoadHandler();
													}),
												onError:
													l[3] ||
													(l[3] = (r) => {
														s.question.onErrorHandler();
													}),
											},
											null,
											46,
											Ue
										)),
										[[e.vShow, e.unref(n) && !s.question.contentNotLoaded]]
								  )
								: e.createCommentVNode("", !0),
							s.question.renderedMode === "youtube"
								? (e.openBlock(),
								  e.createElementBlock(
										"iframe",
										{
											key: 2,
											class: e.normalizeClass(s.question.getImageCss()),
											src: e.unref(n),
											title: s.question.renderedAltText,
											width: s.question.renderedWidth,
											height: s.question.renderedHeight,
											style: e.normalizeStyle({
												objectFit: s.question.imageFit,
												width: s.question.renderedStyleWidth,
												height: s.question.renderedStyleHeight,
											}),
										},
										null,
										14,
										Qe
								  ))
								: e.createCommentVNode("", !0),
							!e.unref(n) || s.question.contentNotLoaded
								? (e.openBlock(),
								  e.createElementBlock(
										"div",
										{
											key: 3,
											class: e.normalizeClass(s.question.cssClasses.noImage),
										},
										[
											e.createVNode(
												i,
												{
													is: "sv-svg-icon",
													iconName:
														s.question.cssClasses.noImageSvgIconId,
													size: 48,
												},
												null,
												8,
												["iconName"]
											),
										],
										2
								  ))
								: e.createCommentVNode("", !0),
						],
						2
					)
				);
			},
		}),
		je = ["aria-label"],
		Ge = e.defineComponent({
			inheritAttrs: !1,
			__name: "Expression",
			props: { question: {} },
			setup(a) {
				const o = a,
					t = e.ref(null);
				return (
					y(o, t),
					(n, s) => (
						e.openBlock(),
						e.createElementBlock(
							"div",
							{
								class: e.normalizeClass(n.question.cssClasses.root),
								ref_key: "root",
								ref: t,
								"aria-live": "polite",
								"aria-label": n.question.formatedValue,
							},
							e.toDisplayString(n.question.formatedValue),
							11,
							je
						)
					)
				);
			},
		}),
		Je = [
			"id",
			"aria-required",
			"aria-label",
			"aria-invalid",
			"aria-errormessage",
			"multiple",
			"title",
			"accept",
			"capture",
		],
		Xe = ["id", "multiple", "placeholder"],
		Ye = ["id", "multiple", "placeholder"],
		_e = e.defineComponent({
			inheritAttrs: !1,
			__name: "File",
			props: { question: {} },
			setup(a) {
				const o = a,
					t = e.ref(null);
				return (
					y(o, t),
					(n, s) => (
						e.openBlock(),
						e.createElementBlock(
							"div",
							{
								class: e.normalizeClass(n.question.fileRootCss),
								ref_key: "root",
								ref: t,
							},
							[
								!n.question.isReadOnlyAttr &&
								!n.question.isDisabledAttr &&
								n.question.hasFileUI
									? (e.openBlock(),
									  e.createElementBlock(
											"input",
											{
												key: 0,
												class: e.normalizeClass(
													n.question.cssClasses.fileInput
												),
												tabindex: "-1",
												type: "file",
												id: n.question.inputId,
												"aria-required": n.question.ariaRequired,
												"aria-label": n.question.ariaLabel,
												"aria-invalid": n.question.ariaInvalid,
												"aria-errormessage": n.question.ariaErrormessage,
												multiple: n.question.allowMultiple,
												title: n.question.inputTitle,
												accept: n.question.renderedAcceptedTypes,
												capture: n.question.renderCapture,
											},
											null,
											10,
											Je
									  ))
									: e.createCommentVNode("", !0),
								n.question.isReadOnlyAttr
									? (e.openBlock(),
									  e.createElementBlock(
											"input",
											{
												key: 1,
												type: "file",
												readonly: "",
												id: n.question.inputId,
												class: e.normalizeClass(
													n.question.getReadOnlyFileCss()
												),
												multiple: n.question.allowMultiple,
												placeholder: n.question.title,
												style: { color: "transparent" },
											},
											null,
											10,
											Xe
									  ))
									: e.createCommentVNode("", !0),
								n.question.isDisabledAttr
									? (e.openBlock(),
									  e.createElementBlock(
											"input",
											{
												key: 2,
												type: "file",
												disabled: "",
												id: n.question.inputId,
												class: e.normalizeClass(
													n.question.getReadOnlyFileCss()
												),
												multiple: n.question.allowMultiple,
												placeholder: n.question.title,
												style: { color: "transparent" },
											},
											null,
											10,
											Ye
									  ))
									: e.createCommentVNode("", !0),
								e.createElementVNode(
									"div",
									{
										class: e.normalizeClass(n.question.cssClasses.dragArea),
										onDrop:
											s[0] ||
											(s[0] = (...l) =>
												n.question.onDrop && n.question.onDrop(...l)),
										onDragover:
											s[1] ||
											(s[1] = (...l) =>
												n.question.onDragOver &&
												n.question.onDragOver(...l)),
										onDragleave:
											s[2] ||
											(s[2] = (...l) =>
												n.question.onDragLeave &&
												n.question.onDragLeave(...l)),
										onDragenter:
											s[3] ||
											(s[3] = (...l) =>
												n.question.onDragEnter &&
												n.question.onDragEnter(...l)),
									},
									[
										n.question.showFileDecorator
											? (e.openBlock(),
											  e.createElementBlock(
													"div",
													{
														key: 0,
														class: e.normalizeClass(
															n.question.getFileDecoratorCss()
														),
													},
													[
														n.question.showDragAreaPlaceholder
															? (e.openBlock(),
															  e.createElementBlock(
																	"span",
																	{
																		key: 0,
																		class: e.normalizeClass(
																			n.question.cssClasses
																				.dragAreaPlaceholder
																		),
																	},
																	[
																		e.createVNode(
																			i,
																			{
																				is: "survey-string",
																				locString:
																					n.question
																						.locRenderedPlaceholder,
																			},
																			null,
																			8,
																			["locString"]
																		),
																	],
																	2
															  ))
															: e.createCommentVNode("", !0),
														e.createElementVNode(
															"div",
															{
																class: e.normalizeClass(
																	n.question.cssClasses.wrapper
																),
															},
															[
																n.question.actionsContainerVisible
																	? (e.openBlock(),
																	  e.createBlock(
																			i,
																			{
																				key: 0,
																				is: "sv-action-bar",
																				model: n.question
																					.actionsContainer,
																			},
																			null,
																			8,
																			["model"]
																	  ))
																	: e.createCommentVNode("", !0),
															],
															2
														),
													],
													2
											  ))
											: e.createCommentVNode("", !0),
										n.question.showLoadingIndicator
											? (e.openBlock(),
											  e.createElementBlock(
													"div",
													{
														key: 1,
														class: e.normalizeClass(
															n.question.cssClasses.loadingIndicator
														),
													},
													[
														e.createVNode(i, {
															is: "sv-loading-indicator",
														}),
													],
													2
											  ))
											: e.createCommentVNode("", !0),
										n.question.isPlayingVideo
											? (e.openBlock(),
											  e.createBlock(
													i,
													{
														key: 2,
														is: "sv-file-video",
														question: n.question,
													},
													null,
													8,
													["question"]
											  ))
											: e.createCommentVNode("", !0),
										n.question.allowShowPreview
											? (e.openBlock(),
											  e.createBlock(
													i,
													{
														key: 3,
														is: "sv-file-preview",
														question: n.question,
													},
													null,
													8,
													["question"]
											  ))
											: e.createCommentVNode("", !0),
										n.question.fileNavigatorVisible
											? (e.openBlock(),
											  e.createBlock(
													i,
													{
														key: 4,
														is: "sv-action-bar",
														model: n.question.fileNavigator,
													},
													null,
													8,
													["model"]
											  ))
											: e.createCommentVNode("", !0),
									],
									34
								),
							],
							2
						)
					)
				);
			},
		}),
		ve = { class: "sv-hidden" },
		A = "survey-imagepicker-item",
		xe = e.defineComponent({
			inheritAttrs: !1,
			__name: "Imagepicker",
			props: { question: {} },
			setup(a) {
				const o = a,
					t = e.ref(null);
				y(o, t);
				const n = (l) => o.question.getItemValueWrapperComponentName(l) || A,
					s = (l) => ({
						componentName: A,
						componentData: {
							question: o.question,
							item: l,
							data: o.question.getItemValueWrapperComponentData(l),
						},
					});
				return (l, r) => (
					e.openBlock(),
					e.createElementBlock(
						"fieldset",
						{
							class: e.normalizeClass(l.question.getSelectBaseRootCss()),
							style: e.normalizeStyle(l.question.getContainerStyle()),
							ref_key: "root",
							ref: t,
						},
						[
							e.createElementVNode(
								"legend",
								ve,
								e.toDisplayString(l.question.locTitle.renderedHtml),
								1
							),
							l.question.hasColumns
								? e.createCommentVNode("", !0)
								: (e.openBlock(!0),
								  e.createElementBlock(
										e.Fragment,
										{ key: 0 },
										e.renderList(
											l.question.visibleChoices,
											(d) => (
												e.openBlock(),
												e.createBlock(
													i,
													e.mergeProps(
														{ key: d.uniqueId, is: n(d) },
														s(d)
													),
													null,
													16,
													["is"]
												)
											)
										),
										128
								  )),
							l.question.hasColumns
								? (e.openBlock(!0),
								  e.createElementBlock(
										e.Fragment,
										{ key: 1 },
										e.renderList(
											l.question.columns,
											(d, m) => (
												e.openBlock(),
												e.createElementBlock(
													"div",
													{
														class: e.normalizeClass(
															l.question.getColumnClass()
														),
														key: m,
														role: "presentation",
													},
													[
														(e.openBlock(!0),
														e.createElementBlock(
															e.Fragment,
															null,
															e.renderList(
																d,
																(u) => (
																	e.openBlock(),
																	e.createBlock(
																		i,
																		e.mergeProps(
																			{
																				key: u.value,
																				is: n(u),
																			},
																			s(u)
																		),
																		null,
																		16,
																		["is"]
																	)
																)
															),
															128
														)),
													],
													2
												)
											)
										),
										128
								  ))
								: e.createCommentVNode("", !0),
						],
						6
					)
				);
			},
		}),
		eo = [
			"name",
			"value",
			"id",
			"disabled",
			"readonly",
			"required",
			"aria-label",
			"aria-invalid",
			"aria-errormessage",
		],
		oo = [
			"name",
			"value",
			"id",
			"disabled",
			"readonly",
			"required",
			"aria-label",
			"aria-invalid",
			"aria-errormessage",
		],
		no = ["src", "width", "height", "alt"],
		so = ["src", "width", "height"],
		to = e.defineComponent({
			inheritAttrs: !1,
			__name: "ImagepickerItem",
			props: { question: {}, item: {} },
			setup(a) {
				const o = a,
					t = (l) => o.question.getItemClass(l),
					n = e.computed({
						get() {
							return o.question.value;
						},
						set(l) {
							const r = o.question;
							r.isReadOnlyAttr || (r.value = l);
						},
					});
				g(() => o.item);
				const s = w(() => o.item.locImageLink);
				return (l, r) => (
					e.openBlock(),
					e.createElementBlock(
						"div",
						{ class: e.normalizeClass(t(l.item)) },
						[
							e.createElementVNode(
								"label",
								{ class: e.normalizeClass(l.question.cssClasses.label) },
								[
									l.question.multiSelect
										? e.withDirectives(
												(e.openBlock(),
												e.createElementBlock(
													"input",
													{
														key: 0,
														type: "checkbox",
														name: l.question.questionName,
														value: l.item.value,
														id: l.question.getItemId(l.item),
														"onUpdate:modelValue":
															r[0] || (r[0] = (d) => (n.value = d)),
														disabled: !l.question.getItemEnabled(
															l.item
														),
														readonly: l.question.isReadOnlyAttr,
														required:
															l.question.inputRequiredAttribute,
														"aria-label": l.item.locText.renderedHtml,
														"aria-invalid": l.question.ariaInvalid,
														"aria-errormessage":
															l.question.ariaErrormessage,
														class: e.normalizeClass(
															l.question.cssClasses.itemControl
														),
													},
													null,
													10,
													eo
												)),
												[[e.vModelCheckbox, n.value]]
										  )
										: e.withDirectives(
												(e.openBlock(),
												e.createElementBlock(
													"input",
													{
														key: 1,
														type: "radio",
														name: l.question.questionName,
														value: l.item.value,
														id: l.question.getItemId(l.item),
														"onUpdate:modelValue":
															r[1] || (r[1] = (d) => (n.value = d)),
														disabled: !l.question.getItemEnabled(
															l.item
														),
														readonly: l.question.isReadOnlyAttr,
														required: l.question.hasRequiredError(),
														"aria-label": l.item.locText.renderedHtml,
														"aria-invalid": l.question.ariaInvalid,
														"aria-errormessage":
															l.question.ariaErrormessage,
														class: e.normalizeClass(
															l.question.cssClasses.itemControl
														),
													},
													null,
													10,
													oo
												)),
												[[e.vModelRadio, n.value]]
										  ),
									e.createElementVNode(
										"div",
										{
											class: e.normalizeClass(
												l.question.cssClasses.itemDecorator
											),
										},
										[
											e.createElementVNode(
												"div",
												{
													class: e.normalizeClass(
														l.question.cssClasses.imageContainer
													),
												},
												[
													l.question.cssClasses.checkedItemDecorator
														? (e.openBlock(),
														  e.createElementBlock(
																"span",
																{
																	key: 0,
																	class: e.normalizeClass(
																		l.question.cssClasses
																			.checkedItemDecorator
																	),
																	"aria-hidden": "true",
																},
																[
																	l.question.cssClasses
																		.checkedItemSvgIconId
																		? (e.openBlock(),
																		  e.createBlock(
																				i,
																				{
																					key: 0,
																					is: "sv-svg-icon",
																					class: e.normalizeClass(
																						l.question
																							.cssClasses
																							.checkedItemSvgIcon
																					),
																					size: "auto",
																					iconName:
																						l.question
																							.cssClasses
																							.checkedItemSvgIconId,
																				},
																				null,
																				8,
																				[
																					"class",
																					"iconName",
																				]
																		  ))
																		: e.createCommentVNode(
																				"",
																				!0
																		  ),
																],
																2
														  ))
														: e.createCommentVNode("", !0),
													e.unref(s) &&
													!l.item.contentNotLoaded &&
													l.question.contentMode === "image"
														? (e.openBlock(),
														  e.createElementBlock(
																"img",
																{
																	key: 1,
																	class: e.normalizeClass(
																		l.question.cssClasses.image
																	),
																	src: e.unref(s),
																	width: l.question
																		.renderedImageWidth,
																	height: l.question
																		.renderedImageHeight,
																	style: e.normalizeStyle({
																		objectFit:
																			l.question.imageFit,
																	}),
																	alt: l.item.locText
																		.renderedHtml,
																	onLoad:
																		r[2] ||
																		(r[2] = (d) => {
																			l.question.onContentLoaded(
																				l.item,
																				d
																			);
																		}),
																	onError:
																		r[3] ||
																		(r[3] = (d) => {
																			l.item.onErrorHandler();
																		}),
																},
																null,
																46,
																no
														  ))
														: e.createCommentVNode("", !0),
													e.unref(s) &&
													!l.item.contentNotLoaded &&
													l.question.contentMode === "video"
														? (e.openBlock(),
														  e.createElementBlock(
																"video",
																{
																	key: 2,
																	controls: "",
																	class: e.normalizeClass(
																		l.question.cssClasses.image
																	),
																	src: e.unref(s),
																	width: l.question
																		.renderedImageWidth,
																	height: l.question
																		.renderedImageHeight,
																	style: e.normalizeStyle({
																		objectFit:
																			l.question.imageFit,
																	}),
																	onLoadedmetadata:
																		r[4] ||
																		(r[4] = (d) => {
																			l.question.onContentLoaded(
																				l.item,
																				d
																			);
																		}),
																	onError:
																		r[5] ||
																		(r[5] = (d) => {
																			l.item.onErrorHandler();
																		}),
																},
																null,
																46,
																so
														  ))
														: e.createCommentVNode("", !0),
													!e.unref(s) || l.item.contentNotLoaded
														? (e.openBlock(),
														  e.createElementBlock(
																"div",
																{
																	key: 3,
																	class: e.normalizeClass(
																		l.question.cssClasses
																			.itemNoImage
																	),
																	style: e.normalizeStyle({
																		width:
																			l.question
																				.renderedImageWidth +
																			"px",
																		height:
																			l.question
																				.renderedImageHeight +
																			"px",
																		objectFit:
																			l.question.imageFit,
																	}),
																},
																[
																	e.createVNode(
																		i,
																		{
																			is: "sv-svg-icon",
																			class: e.normalizeClass(
																				l.question
																					.cssClasses
																					.itemNoImageSvgIcon
																			),
																			iconName:
																				l.question
																					.cssClasses
																					.itemNoImageSvgIconId,
																			size: 48,
																		},
																		null,
																		8,
																		["class", "iconName"]
																	),
																],
																6
														  ))
														: e.createCommentVNode("", !0),
												],
												2
											),
											l.question.showLabel
												? (e.openBlock(),
												  e.createElementBlock(
														"span",
														{
															key: 0,
															class: e.normalizeClass(
																l.question.cssClasses.itemText
															),
														},
														[
															e.createVNode(
																i,
																{
																	is: "survey-string",
																	locString: l.item.locText,
																},
																null,
																8,
																["locString"]
															),
														],
														2
												  ))
												: e.createCommentVNode("", !0),
										],
										2
									),
								],
								2
							),
						],
						2
					)
				);
			},
		}),
		lo = ["id", "src"],
		ro = ["id"],
		ao = e.defineComponent({
			inheritAttrs: !1,
			__name: "Imagemap",
			props: { question: {} },
			setup(a) {
				const o = a,
					t = e.ref(null);
				return (
					y(o, t),
					(n, s) => (
						e.openBlock(),
						e.createElementBlock(
							"div",
							{
								class: e.normalizeClass(n.question.cssClasses.root),
								ref_key: "root",
								ref: t,
							},
							[
								e.createElementVNode(
									"img",
									{
										class: e.normalizeClass(n.question.cssClasses.bg),
										id: `${n.question.id}-bg`,
										src: n.question.imageLink,
										role: "presentation",
									},
									null,
									10,
									lo
								),
								(e.openBlock(),
								e.createElementBlock(
									"svg",
									{
										class: e.normalizeClass(n.question.cssClasses.svg),
										id: `${n.question.id}-svg`,
									},
									null,
									10,
									ro
								)),
							],
							2
						)
					)
				);
			},
		}),
		io = e.defineComponent({
			inheritAttrs: !1,
			__name: "Comment",
			props: { question: {} },
			setup(a) {
				const o = a,
					t = e.ref();
				function n(s) {
					t.value = s;
				}
				return (
					y(o, t),
					(s, l) =>
						!s.question.isReadOnlyRenderDiv() && s.question.getMaxLength()
							? (e.openBlock(),
							  e.createElementBlock(
									"div",
									{ key: 0, ref_key: "root", ref: t },
									[
										e.createVNode(
											i,
											{
												is: "sv-text-area",
												model: s.question.textAreaModel,
											},
											null,
											8,
											["model"]
										),
										e.createVNode(
											i,
											{
												is: "sv-character-counter",
												counter: s.question.characterCounter,
												remainingCharacterCounter:
													s.question.cssClasses
														.remainingCharacterCounter,
											},
											null,
											8,
											["counter", "remainingCharacterCounter"]
										),
									],
									512
							  ))
							: !s.question.isReadOnlyRenderDiv() && !s.question.getMaxLength()
							? (e.openBlock(),
							  e.createBlock(
									i,
									{
										key: 1,
										is: "sv-text-area",
										"get-ref": n,
										model: s.question.textAreaModel,
									},
									null,
									8,
									["model"]
							  ))
							: (e.openBlock(),
							  e.createElementBlock(
									"div",
									{ key: 2, ref_key: "root", ref: t },
									e.toDisplayString(s.question.value),
									513
							  ))
				);
			},
		}),
		mo = e.defineComponent({
			inheritAttrs: !1,
			__name: "Dropdown",
			props: { question: {} },
			setup(a) {
				const o = a,
					t = e.ref(null);
				y(o, t);
				const n = e.computed(() => o.question.selectedItem),
					s = e.computed(() => o.question.isShowingChoiceComment);
				return (l, r) => (
					e.openBlock(),
					e.createElementBlock(
						"div",
						{
							class: e.normalizeClass(l.question.renderCssRoot),
							ref_key: "root",
							ref: t,
						},
						[
							e.createVNode(
								i,
								{ is: "sv-dropdown", question: l.question },
								null,
								8,
								["question"]
							),
							s.value
								? (e.openBlock(),
								  e.createBlock(
										i,
										{
											key: 0,
											is: "survey-other-choice",
											question: l.question,
											item: n.value,
										},
										null,
										8,
										["question", "item"]
								  ))
								: e.createCommentVNode("", !0),
						],
						2
					)
				);
			},
		}),
		co = [
			"id",
			"autocomplete",
			"aria-required",
			"aria-label",
			"aria-invalid",
			"aria-errormessage",
			"required",
		],
		po = { key: 0, value: "" },
		Co = ["id"];
	k.RendererFactory.Instance.registerRenderer("dropdown", "select", "sv-dropdown-select");
	const go = e.defineComponent({
			inheritAttrs: !1,
			__name: "DropdownSelect",
			props: { question: {} },
			setup(a) {
				const o = a,
					t = e.ref(null);
				y(o, t);
				const n = (r) => {
						o.question.onClick(r);
					},
					s = (r) => {
						o.question.onKeyUp(r);
					},
					l = e.computed({
						get() {
							return o.question.value ?? "";
						},
						set(r) {
							const d = o.question;
							r === "" ? (d.renderedValue = void 0) : (d.renderedValue = r);
						},
					});
				return (r, d) => (
					e.openBlock(),
					e.createElementBlock(
						"div",
						{
							class: e.normalizeClass(r.question.renderCssRoot),
							ref_key: "root",
							ref: t,
						},
						[
							e.createElementVNode(
								"div",
								{ class: e.normalizeClass(r.question.cssClasses.selectWrapper) },
								[
									r.question.isReadOnly
										? (e.openBlock(),
										  e.createElementBlock(
												"div",
												{
													key: 1,
													disabled: "",
													id: r.question.inputId,
													class: e.normalizeClass(
														r.question.getControlClass()
													),
												},
												e.toDisplayString(r.question.readOnlyText),
												11,
												Co
										  ))
										: e.withDirectives(
												(e.openBlock(),
												e.createElementBlock(
													"select",
													{
														key: 0,
														id: r.question.inputId,
														"onUpdate:modelValue":
															d[0] || (d[0] = (m) => (l.value = m)),
														onClick: n,
														onKeyup: s,
														autocomplete: r.question.autocomplete,
														class: e.normalizeClass(
															r.question.getControlClass()
														),
														"aria-required":
															r.question.a11y_input_ariaRequired,
														"aria-label":
															r.question.a11y_input_ariaLabel,
														"aria-invalid":
															r.question.a11y_input_ariaInvalid,
														"aria-errormessage":
															r.question.a11y_input_ariaErrormessage,
														required: r.question.isRequired,
													},
													[
														r.question.allowClear
															? (e.openBlock(),
															  e.createElementBlock(
																	"option",
																	po,
																	e.toDisplayString(
																		r.question.placeholder
																	),
																	1
															  ))
															: e.createCommentVNode("", !0),
														(e.openBlock(!0),
														e.createElementBlock(
															e.Fragment,
															null,
															e.renderList(
																r.question.visibleChoices,
																(m) => (
																	e.openBlock(),
																	e.createBlock(
																		i,
																		{
																			is: "sv-dropdown-option-item",
																			item: m,
																			key: m.uniqueId,
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
													42,
													co
												)),
												[[e.vModelSelect, l.value]]
										  ),
									r.question.cssClasses.chevronButtonIconId
										? (e.openBlock(),
										  e.createElementBlock(
												"div",
												{
													key: 2,
													class: e.normalizeClass(
														r.question.cssClasses.chevronButton
													),
													"aria-hidden": "true",
												},
												[
													e.createVNode(
														i,
														{
															is: "sv-svg-icon",
															class: e.normalizeClass(
																r.question.cssClasses
																	.chevronButtonSvg
															),
															iconName:
																r.question.cssClasses
																	.chevronButtonIconId,
															size: "auto",
														},
														null,
														8,
														["class", "iconName"]
													),
												],
												2
										  ))
										: e.createCommentVNode("", !0),
								],
								2
							),
							r.question.isShowingChoiceComment
								? (e.openBlock(),
								  e.createBlock(
										i,
										{
											key: 0,
											is: "survey-other-choice",
											question: r.question,
											item: r.question.selectedItem,
										},
										null,
										8,
										["question", "item"]
								  ))
								: e.createCommentVNode("", !0),
						],
						2
					)
				);
			},
		}),
		uo = ["value", "disabled"],
		ko = e.defineComponent({
			__name: "OptionItem",
			props: { item: {} },
			setup(a) {
				const o = a,
					t = w(() => o.item.locText);
				return (
					g(() => o.item),
					(n, s) => (
						e.openBlock(),
						e.createElementBlock(
							"option",
							{ value: n.item.value, disabled: !n.item.isEnabled },
							e.toDisplayString(e.unref(t)),
							9,
							uo
						)
					)
				);
			},
		}),
		yo = [
			"id",
			"disabled",
			"tabindex",
			"role",
			"aria-required",
			"aria-invalid",
			"aria-errormessage",
			"aria-expanded",
			"aria-label",
			"aria-labelledby",
			"aria-describedby",
			"aria-controls",
			"aria-activedescendant",
			"required",
		],
		ho = { style: { visibility: "hidden" } },
		Bo = [
			"disabled",
			"inputmode",
			"id",
			"tabindex",
			"readonly",
			"role",
			"aria-required",
			"aria-invalid",
			"aria-errormessage",
			"aria-expanded",
			"aria-controls",
			"aria-label",
			"aria-labelledby",
			"aria-describedby",
			"aria-activedescendant",
			"placeholder",
		],
		qo = ["id", "role", "aria-label", "aria-labelledby", "aria-describedby", "tabindex"],
		wo = e.defineComponent({
			__name: "Dropdown",
			props: { question: {} },
			setup(a) {
				const o = a,
					t = e.ref(null),
					n = e.computed(() => o.question.dropdownListModel),
					s = (C) => {
						var B;
						(B = n.value) == null || B.onClick(C);
					},
					l = (C) => {
						var B;
						(B = n.value) == null || B.keyHandler(C);
					},
					r = () => {
						if (t.value) {
							const C = t.value,
								B = n.value.inputStringRendered;
							k.Helpers.isTwoValueEquals(B, C.value, !1, !0, !1) ||
								(C.value = n.value.inputStringRendered);
						}
					},
					d = (C) => {
						o.question.onBlur(C), r();
					},
					m = (C) => {
						o.question.onFocus(C);
					},
					u = (C) => {
						n.value.inputStringRendered = C.target.value;
					},
					c = e.computed(() => o.question.showSelectedItemLocText),
					p = e.computed(() => o.question.selectedItemLocText);
				return (
					g(() => n.value),
					e.onUpdated(r),
					e.onMounted(r),
					(C, B) => {
						var I, O, U, Q;
						return (
							e.openBlock(),
							e.createElementBlock(
								"div",
								{
									class: e.normalizeClass(C.question.cssClasses.selectWrapper),
									onClick: s,
								},
								[
									C.question.isReadOnly
										? e.createCommentVNode("", !0)
										: (e.openBlock(),
										  e.createElementBlock(
												"div",
												{
													key: 0,
													id: C.question.inputId,
													disabled: C.question.isDisabledAttr
														? !0
														: null,
													tabindex: n.value.noTabIndex ? void 0 : 0,
													onKeydown: l,
													onBlur: d,
													class: e.normalizeClass(
														C.question.getControlClass()
													),
													role: n.value.ariaQuestionRole,
													"aria-required": n.value.ariaQuestionRequired,
													"aria-invalid": n.value.ariaQuestionInvalid,
													"aria-errormessage":
														n.value.ariaQuestionErrorMessage,
													"aria-expanded": n.value.ariaQuestionExpanded,
													"aria-label": n.value.ariaQuestionLabel,
													"aria-labelledby":
														n.value.ariaQuestionLabelledby,
													"aria-describedby":
														n.value.ariaQuestionDescribedby,
													"aria-controls": n.value.ariaQuestionControls,
													"aria-activedescendant":
														n.value.ariaQuestionActivedescendant,
													required: C.question.isRequired ? !0 : null,
												},
												[
													n.value.showHintPrefix
														? (e.openBlock(),
														  e.createElementBlock(
																"div",
																{
																	key: 0,
																	class: e.normalizeClass(
																		C.question.cssClasses
																			.hintPrefix
																	),
																},
																[
																	e.createElementVNode(
																		"span",
																		null,
																		e.toDisplayString(
																			n.value
																				.hintStringPrefix
																		),
																		1
																	),
																],
																2
														  ))
														: e.createCommentVNode("", !0),
													e.createElementVNode(
														"div",
														{
															class: e.normalizeClass(
																C.question.cssClasses.controlValue
															),
														},
														[
															c.value
																? (e.openBlock(),
																  e.createBlock(
																		i,
																		{
																			key: 0,
																			is: "survey-string",
																			locString: p.value,
																		},
																		null,
																		8,
																		["locString"]
																  ))
																: e.createCommentVNode("", !0),
															n.value.showHintString
																? (e.openBlock(),
																  e.createElementBlock(
																		"div",
																		{
																			key: 1,
																			class: e.normalizeClass(
																				C.question
																					.cssClasses
																					.hintSuffix
																			),
																		},
																		[
																			e.createElementVNode(
																				"span",
																				ho,
																				e.toDisplayString(
																					n.value
																						.inputStringRendered
																				),
																				1
																			),
																			e.createElementVNode(
																				"span",
																				null,
																				e.toDisplayString(
																					n.value
																						.hintStringSuffix
																				),
																				1
																			),
																		],
																		2
																  ))
																: e.createCommentVNode("", !0),
															C.question.showInputFieldComponent
																? (e.openBlock(),
																  e.createBlock(
																		i,
																		{
																			key: 2,
																			is: C.question
																				.inputFieldComponentName,
																			item: n.value.getSelectedAction(),
																			question: C.question,
																		},
																		null,
																		8,
																		["is", "item", "question"]
																  ))
																: e.createCommentVNode("", !0),
															n.value.needRenderInput
																? (e.openBlock(),
																  e.createElementBlock(
																		"input",
																		{
																			key: 3,
																			type: "text",
																			ref_key:
																				"inputElement",
																			ref: t,
																			class: e.normalizeClass(
																				C.question
																					.cssClasses
																					.filterStringInput
																			),
																			disabled:
																				C.question
																					.isDisabledAttr,
																			autocomplete: "off",
																			inputmode:
																				n.value.inputMode,
																			id: C.question.getInputId(),
																			tabindex: n.value
																				.noTabIndex
																				? void 0
																				: -1,
																			readonly: n.value
																				.filterReadOnly
																				? !0
																				: void 0,
																			role: n.value
																				.ariaInputRole,
																			"aria-required":
																				n.value
																					.ariaInputRequired,
																			"aria-invalid":
																				n.value
																					.ariaInputInvalid,
																			"aria-errormessage":
																				n.value
																					.ariaInputErrorMessage,
																			"aria-expanded":
																				n.value
																					.ariaInputExpanded,
																			"aria-controls":
																				n.value
																					.ariaInputControls,
																			"aria-label":
																				n.value
																					.ariaInputLabel,
																			"aria-labelledby":
																				n.value
																					.ariaInputLabelledby,
																			"aria-describedby":
																				n.value
																					.ariaInputDescribedby,
																			"aria-activedescendant":
																				n.value
																					.ariaInputActivedescendant,
																			placeholder:
																				n.value
																					.placeholderRendered,
																			onInput: u,
																			onBlur: d,
																			onFocus: m,
																		},
																		null,
																		42,
																		Bo
																  ))
																: e.createCommentVNode("", !0),
														],
														2
													),
													e.createVNode(
														i,
														{
															is: "sv-action-bar",
															model: n.value.editorButtons,
														},
														null,
														8,
														["model"]
													),
												],
												42,
												yo
										  )),
									C.question.isInputReadOnly
										? e.createCommentVNode("", !0)
										: (e.openBlock(),
										  e.createBlock(
												i,
												{
													key: 1,
													is: "sv-popup",
													model: n.value.popupModel,
												},
												null,
												8,
												["model"]
										  )),
									C.question.isReadOnly
										? (e.openBlock(),
										  e.createElementBlock(
												"div",
												{
													key: 2,
													id: C.question.inputId,
													role:
														(I = n.value) == null
															? void 0
															: I.ariaQuestionRole,
													"aria-label":
														(O = n.value) == null
															? void 0
															: O.ariaQuestionLabel,
													"aria-labelledby":
														(U = n.value) == null
															? void 0
															: U.ariaQuestionLabelledby,
													"aria-describedby":
														(Q = n.value) == null
															? void 0
															: Q.ariaQuestionDescribedby,
													"aria-expanded": !1,
													"aria-readonly": !0,
													"aria-disabled": !0,
													tabindex: C.question.isDisabledAttr
														? void 0
														: 0,
													class: e.normalizeClass(
														C.question.getControlClass()
													),
												},
												[
													C.question.readOnlyText
														? (e.openBlock(),
														  e.createElementBlock(
																"div",
																{
																	key: 0,
																	class: e.normalizeClass(
																		C.question.cssClasses
																			.controlValue
																	),
																},
																[
																	e.createVNode(
																		i,
																		{
																			is: "survey-string",
																			locString:
																				C.question
																					.locReadOnlyText,
																		},
																		null,
																		8,
																		["locString"]
																	),
																],
																2
														  ))
														: e.createCommentVNode("", !0),
													e.createVNode(
														i,
														{
															is: "sv-action-bar",
															model: n.value.editorButtons,
														},
														null,
														8,
														["model"]
													),
												],
												10,
												qo
										  ))
										: e.createCommentVNode("", !0),
								],
								2
							)
						);
					}
				);
			},
		}),
		fo = e.defineComponent({
			inheritAttrs: !1,
			__name: "Tagbox",
			props: { question: {} },
			setup(a) {
				const o = a,
					t = e.ref(null);
				return (
					y(o, t),
					(n, s) => (
						e.openBlock(),
						e.createElementBlock(
							"div",
							{
								class: e.normalizeClass(n.question.renderCssRoot),
								ref_key: "root",
								ref: t,
							},
							[
								e.createVNode(
									i,
									{ is: "sv-tagbox", question: n.question },
									null,
									8,
									["question"]
								),
								n.question.isOtherSelected
									? (e.openBlock(),
									  e.createBlock(
											i,
											{
												key: 0,
												is: "survey-other-choice",
												question: n.question,
												item: n.question.otherItem,
											},
											null,
											8,
											["question", "item"]
									  ))
									: e.createCommentVNode("", !0),
							],
							2
						)
					)
				);
			},
		}),
		Vo = [
			"id",
			"tabindex",
			"disabled",
			"role",
			"aria-required",
			"aria-label",
			"aria-labelledby",
			"aria-describedby",
			"aria-invalid",
			"aria-errormessage",
			"aria-controls",
			"aria-expanded",
			"aria-activedescendant",
			"required",
		],
		bo = ["id", "role", "aria-label", "aria-labelledby", "aria-describedby", "tabindex"],
		Lo = e.defineComponent({
			__name: "Tagbox",
			props: { question: {} },
			setup(a) {
				const o = a,
					t = e.computed(() => {
						const r = o.question;
						return (
							r.dropdownListModel ||
								(r.dropdownListModel = new k.DropdownMultiSelectListModel(r)),
							o.question.dropdownListModel
						);
					}),
					n = (r) => {
						var d;
						(d = t.value) == null || d.onClick(r);
					},
					s = (r) => {
						var d;
						(d = t.value) == null || d.keyHandler(r);
					},
					l = (r) => {
						var d;
						(d = t.value) == null || d.onBlur(r);
					};
				return (
					g(() => t.value),
					(r, d) => {
						var m, u, c, p;
						return (
							e.openBlock(),
							e.createElementBlock(
								"div",
								{
									class: e.normalizeClass(r.question.cssClasses.selectWrapper),
									onClick: n,
								},
								[
									r.question.isReadOnly
										? e.createCommentVNode("", !0)
										: (e.openBlock(),
										  e.createElementBlock(
												"div",
												{
													key: 0,
													id: r.question.inputId,
													tabindex: t.value.noTabIndex ? void 0 : 0,
													disabled: r.question.isDisabledAttr
														? !0
														: null,
													onKeydown: s,
													onBlur: l,
													class: e.normalizeClass(
														r.question.getControlClass()
													),
													role: t.value.ariaQuestionRole,
													"aria-required": t.value.ariaQuestionRequired,
													"aria-label": t.value.ariaQuestionLabel,
													"aria-labelledby":
														t.value.ariaQuestionLabelledby,
													"aria-describedby":
														t.value.ariaQuestionDescribedby,
													"aria-invalid": t.value.ariaQuestionInvalid,
													"aria-errormessage":
														t.value.ariaQuestionErrorMessage,
													"aria-controls": t.value.ariaQuestionControls,
													"aria-expanded": t.value.ariaQuestionExpanded,
													"aria-activedescendant":
														t.value.ariaQuestionActivedescendant,
													required: r.question.isRequired ? !0 : null,
												},
												[
													e.createElementVNode(
														"div",
														{
															class: e.normalizeClass(
																r.question.cssClasses.controlValue
															),
														},
														[
															(e.openBlock(!0),
															e.createElementBlock(
																e.Fragment,
																null,
																e.renderList(
																	r.question.selectedChoices,
																	(C, B) => (
																		e.openBlock(),
																		e.createBlock(
																			i,
																			{
																				is: "sv-tagbox-item",
																				item: C,
																				question:
																					r.question,
																				key: "item" + B,
																			},
																			null,
																			8,
																			["item", "question"]
																		)
																	)
																),
																128
															)),
															t.value.needRenderInput
																? (e.openBlock(),
																  e.createBlock(
																		i,
																		{
																			key: 0,
																			is: "sv-tagbox-filter",
																			model: t.value,
																			question: r.question,
																		},
																		null,
																		8,
																		["model", "question"]
																  ))
																: e.createCommentVNode("", !0),
														],
														2
													),
													e.createVNode(
														i,
														{
															is: "sv-action-bar",
															model: t.value.editorButtons,
														},
														null,
														8,
														["model"]
													),
												],
												42,
												Vo
										  )),
									r.question.isInputReadOnly
										? e.createCommentVNode("", !0)
										: (e.openBlock(),
										  e.createBlock(
												i,
												{
													key: 1,
													is: "sv-popup",
													model: t.value.popupModel,
												},
												null,
												8,
												["model"]
										  )),
									r.question.isReadOnly
										? (e.openBlock(),
										  e.createElementBlock(
												"div",
												{
													key: 2,
													id: r.question.inputId,
													role:
														(m = t.value) == null
															? void 0
															: m.ariaQuestionRole,
													"aria-label":
														(u = t.value) == null
															? void 0
															: u.ariaQuestionLabel,
													"aria-labelledby":
														(c = t.value) == null
															? void 0
															: c.ariaQuestionLabelledby,
													"aria-describedby":
														(p = t.value) == null
															? void 0
															: p.ariaQuestionDescribedby,
													"aria-expanded": !1,
													"aria-readonly": !0,
													"aria-disabled": !0,
													tabindex: r.question.isDisabledAttr
														? void 0
														: 0,
													class: e.normalizeClass(
														r.question.getControlClass()
													),
												},
												[
													r.question.readOnlyText
														? (e.openBlock(),
														  e.createElementBlock(
																"div",
																{
																	key: 0,
																	class: e.normalizeClass(
																		r.question.cssClasses
																			.controlValue
																	),
																},
																[
																	e.createVNode(
																		i,
																		{
																			is: "survey-string",
																			locString:
																				r.question
																					.locReadOnlyText,
																		},
																		null,
																		8,
																		["locString"]
																	),
																],
																2
														  ))
														: e.createCommentVNode("", !0),
													e.createVNode(
														i,
														{
															is: "sv-action-bar",
															model: t.value.editorButtons,
														},
														null,
														8,
														["model"]
													),
												],
												10,
												bo
										  ))
										: e.createCommentVNode("", !0),
								],
								2
							)
						);
					}
				);
			},
		}),
		No = { style: { visibility: "hidden" } },
		Eo = [
			"placeholder",
			"disabled",
			"inputmode",
			"role",
			"aria-required",
			"aria-invalid",
			"aria-errormessage",
			"aria-expanded",
			"aria-label",
			"aria-labelledby",
			"aria-describedby",
			"aria-controls",
			"aria-activedescendant",
			"id",
			"readonly",
			"size",
		],
		Mo = e.defineComponent({
			__name: "TagboxFilter",
			props: { question: {}, model: {} },
			setup(a) {
				const o = a,
					t = (d) => {
						const m = o.model;
						m.inputStringRendered = d.target.value;
					},
					n = (d) => {
						o.model.inputKeyHandler(d);
					},
					s = (d) => {
						o.question.onBlur(d);
					},
					l = (d) => {
						o.question.onFocus(d);
					},
					r = e.computed({
						get() {
							return o.model.inputStringRendered ?? "";
						},
						set(d) {
							const m = o.model;
							m.inputStringRendered = d;
						},
					});
				return (
					g(() => o.model),
					(d, m) => (
						e.openBlock(),
						e.createElementBlock(
							"div",
							{ class: e.normalizeClass(d.question.cssClasses.hint) },
							[
								d.model.showHintPrefix
									? (e.openBlock(),
									  e.createElementBlock(
											"div",
											{
												key: 0,
												class: e.normalizeClass(
													d.question.cssClasses.hintPrefix
												),
											},
											[
												e.createElementVNode(
													"span",
													null,
													e.toDisplayString(d.model.hintStringPrefix),
													1
												),
											],
											2
									  ))
									: e.createCommentVNode("", !0),
								e.createElementVNode(
									"div",
									{
										class: e.normalizeClass(
											d.question.cssClasses.hintSuffixWrapper
										),
									},
									[
										d.question.showSelectedItemLocText
											? (e.openBlock(),
											  e.createBlock(
													i,
													{
														key: 0,
														is: "survey-string",
														locString: d.question.selectedItemLocText,
													},
													null,
													8,
													["locString"]
											  ))
											: e.createCommentVNode("", !0),
										d.model.showHintString
											? (e.openBlock(),
											  e.createElementBlock(
													"div",
													{
														key: 1,
														class: e.normalizeClass(
															d.question.cssClasses.hintSuffix
														),
													},
													[
														e.createElementVNode(
															"span",
															No,
															e.toDisplayString(
																d.model.inputStringRendered
															),
															1
														),
														e.createElementVNode(
															"span",
															null,
															e.toDisplayString(
																d.model.hintStringSuffix
															),
															1
														),
													],
													2
											  ))
											: e.createCommentVNode("", !0),
										e.withDirectives(
											e.createElementVNode(
												"input",
												{
													type: "text",
													autocomplete: "off",
													"onUpdate:modelValue":
														m[0] || (m[0] = (u) => (r.value = u)),
													class: e.normalizeClass(
														d.question.cssClasses.filterStringInput
													),
													placeholder: d.model.filterStringPlaceholder,
													disabled: d.question.isDisabledAttr,
													inputmode: d.model.inputMode,
													role: d.model.ariaInputRole,
													"aria-required": d.model.ariaInputRequired,
													"aria-invalid": d.model.ariaInputInvalid,
													"aria-errormessage":
														d.model.ariaInputErrorMessage,
													"aria-expanded": d.model.ariaInputExpanded,
													"aria-label": d.model.ariaInputLabel,
													"aria-labelledby": d.model.ariaInputLabelledby,
													"aria-describedby":
														d.model.ariaInputDescribedby,
													"aria-controls": d.model.ariaInputControls,
													"aria-activedescendant":
														d.model.ariaInputActivedescendant,
													id: d.question.getInputId(),
													readonly: d.model.filterReadOnly ? !0 : void 0,
													size: d.model.inputStringRendered ? void 0 : 1,
													onChange: t,
													onKeydown: n,
													onBlur: s,
													onFocus: l,
												},
												null,
												42,
												Eo
											),
											[[e.vModelText, r.value]]
										),
									],
									2
								),
							],
							2
						)
					)
				);
			},
		}),
		So = { class: "sv-tagbox__item-text" },
		zo = e.defineComponent({
			__name: "TagboxItem",
			props: { question: {}, item: {} },
			setup(a) {
				const o = a,
					t = (n) => {
						o.question.dropdownListModel.deselectItem(o.item.value),
							n.stopPropagation();
					};
				return (
					g(() => o.item),
					(n, s) => (
						e.openBlock(),
						e.createElementBlock(
							"div",
							{ class: "sv-tagbox__item", key: n.item.key },
							[
								e.createElementVNode("div", So, [
									e.createVNode(
										i,
										{ is: "survey-string", locString: n.item.locText },
										null,
										8,
										["locString"]
									),
								]),
								e.createElementVNode(
									"div",
									{
										class: e.normalizeClass(
											n.question.cssClasses.cleanItemButton
										),
										onClick: t,
									},
									[
										e.createVNode(
											i,
											{
												is: "sv-svg-icon",
												class: e.normalizeClass(
													n.question.cssClasses.cleanItemButtonSvg
												),
												iconName:
													n.question.cssClasses.cleanItemButtonIconId,
												size: "auto",
											},
											null,
											8,
											["class", "iconName"]
										),
									],
									2
								),
							]
						)
					)
				);
			},
		}),
		Ho = e.defineComponent({
			inheritAttrs: !1,
			__name: "Ranking",
			props: { question: {} },
			setup(a) {
				const o = a,
					t = e.ref(null);
				y(o, t);
				const n = (l) =>
						o.question.getItemValueWrapperComponentName(l) || "survey-ranking-item",
					s = (l, r, d) => ({
						componentName: "survey-ranking-item",
						componentData: {
							question: o.question,
							item: l,
							index: r,
							unrankedItem: d,
							data: o.question.getItemValueWrapperComponentData(l),
						},
					});
				return (l, r) => (
					e.openBlock(),
					e.createElementBlock(
						"div",
						{ class: e.normalizeClass(l.question.rootClass), ref_key: "root", ref: t },
						[
							l.question.selectToRankEnabled
								? e.createCommentVNode("", !0)
								: (e.openBlock(!0),
								  e.createElementBlock(
										e.Fragment,
										{ key: 0 },
										e.renderList(
											l.question.renderedRankingChoices,
											(d, m) => (
												e.openBlock(),
												e.createBlock(
													i,
													e.mergeProps(
														{ key: d.uniqueId, is: n(d) },
														s(d, m)
													),
													null,
													16,
													["is"]
												)
											)
										),
										128
								  )),
							l.question.selectToRankEnabled
								? (e.openBlock(),
								  e.createElementBlock(
										"div",
										{
											key: 1,
											class: e.normalizeClass(
												l.question.getContainerClasses("from")
											),
											"data-ranking": "from-container",
										},
										[
											(e.openBlock(!0),
											e.createElementBlock(
												e.Fragment,
												null,
												e.renderList(
													l.question.renderedUnRankingChoices,
													(d, m) => (
														e.openBlock(),
														e.createBlock(
															i,
															e.mergeProps(
																{ key: d.uniqueId, is: n(d) },
																s(d, m, !0)
															),
															null,
															16,
															["is"]
														)
													)
												),
												128
											)),
											l.question.renderedUnRankingChoices.length === 0
												? (e.openBlock(),
												  e.createElementBlock(
														"div",
														{
															key: 0,
															class: e.normalizeClass(
																l.question.cssClasses
																	.containerPlaceholder
															),
														},
														[
															e.createVNode(
																i,
																{
																	is: "survey-string",
																	locString:
																		l.question
																			.locSelectToRankEmptyRankedAreaText,
																},
																null,
																8,
																["locString"]
															),
														],
														2
												  ))
												: e.createCommentVNode("", !0),
										],
										2
								  ))
								: e.createCommentVNode("", !0),
							l.question.selectToRankEnabled
								? (e.openBlock(),
								  e.createElementBlock(
										"div",
										{
											key: 2,
											class: e.normalizeClass(
												l.question.cssClasses.containersDivider
											),
										},
										null,
										2
								  ))
								: e.createCommentVNode("", !0),
							l.question.selectToRankEnabled
								? (e.openBlock(),
								  e.createElementBlock(
										"div",
										{
											key: 3,
											class: e.normalizeClass(
												l.question.getContainerClasses("to")
											),
											"data-ranking": "to-container",
										},
										[
											(e.openBlock(!0),
											e.createElementBlock(
												e.Fragment,
												null,
												e.renderList(
													l.question.renderedRankingChoices,
													(d, m) => (
														e.openBlock(),
														e.createBlock(
															i,
															e.mergeProps(
																{ key: d.uniqueId, is: n(d) },
																s(d, m)
															),
															null,
															16,
															["is"]
														)
													)
												),
												128
											)),
											l.question.renderedRankingChoices.length === 0
												? (e.openBlock(),
												  e.createElementBlock(
														"div",
														{
															key: 0,
															class: e.normalizeClass(
																l.question.cssClasses
																	.containerPlaceholder
															),
														},
														[
															e.createVNode(
																i,
																{
																	is: "survey-string",
																	locString:
																		l.question
																			.locSelectToRankEmptyUnrankedAreaText,
																},
																null,
																8,
																["locString"]
															),
														],
														2
												  ))
												: e.createCommentVNode("", !0),
										],
										2
								  ))
								: e.createCommentVNode("", !0),
						],
						2
					)
				);
			},
		}),
		Io = ["id", "tabindex", "data-sv-drop-target-ranking-item"],
		Ro = { tabindex: "-1", style: { outline: "none" } },
		To = ["xlink:href"],
		$o = ["xlink:href"],
		Do = ["xlink:href"],
		Zo = e.defineComponent({
			inheritAttrs: !1,
			__name: "RankingItem",
			props: { index: {}, question: {}, item: {}, unrankedItem: { type: Boolean } },
			setup(a) {
				const o = a,
					t = e.computed(() => o.question.getNumberByIndex(o.index));
				return (
					g(() => o.item),
					(n, s) => (
						e.openBlock(),
						e.createElementBlock(
							"div",
							{
								id: n.question.getItemId(n.item),
								tabindex: n.question.getItemTabIndex(n.item),
								"data-sv-drop-target-ranking-item": n.index,
								class: e.normalizeClass(n.question.getItemClass(n.item)),
								onKeydown:
									s[0] ||
									(s[0] = (l) => {
										n.question.handleKeydown.call(n.question, l, n.item);
									}),
								onPointerdown:
									s[1] ||
									(s[1] = (l) => {
										n.question.handlePointerDown.call(
											n.question,
											l,
											n.item,
											l.currentTarget
										);
									}),
								onPointerup:
									s[2] ||
									(s[2] = (l) => {
										n.question.handlePointerUp.call(
											n.question,
											l,
											n.item,
											l.currentTarget
										);
									}),
							},
							[
								e.createElementVNode("div", Ro, [
									e.createElementVNode(
										"div",
										{
											class: e.normalizeClass(
												n.question.cssClasses.itemGhostNode
											),
										},
										null,
										2
									),
									e.createElementVNode(
										"div",
										{
											class: e.normalizeClass(
												n.question.cssClasses.itemContent
											),
										},
										[
											e.createElementVNode(
												"div",
												{
													class: e.normalizeClass(
														n.question.cssClasses.itemIconContainer
													),
												},
												[
													(e.openBlock(),
													e.createElementBlock(
														"svg",
														{
															class: e.normalizeClass(
																n.question.getIconHoverCss()
															),
														},
														[
															e.createElementVNode(
																"use",
																{
																	"xlink:href":
																		n.question.dragDropSvgIcon,
																},
																null,
																8,
																To
															),
														],
														2
													)),
													(e.openBlock(),
													e.createElementBlock(
														"svg",
														{
															class: e.normalizeClass(
																n.question.getIconFocusCss()
															),
														},
														[
															e.createElementVNode(
																"use",
																{
																	"xlink:href":
																		n.question.arrowsSvgIcon,
																},
																null,
																8,
																$o
															),
														],
														2
													)),
												],
												2
											),
											!n.unrankedItem && t.value
												? (e.openBlock(),
												  e.createElementBlock(
														"div",
														{
															key: 0,
															class: e.normalizeClass(
																n.question.getItemIndexClasses(
																	n.item
																)
															),
														},
														e.toDisplayString(t.value),
														3
												  ))
												: (e.openBlock(),
												  e.createElementBlock(
														"div",
														{
															key: 1,
															class: e.normalizeClass(
																n.question.getItemIndexClasses(
																	n.item
																)
															),
														},
														[
															(e.openBlock(),
															e.createElementBlock("svg", null, [
																e.createElementVNode(
																	"use",
																	{
																		"xlink:href":
																			n.question.dashSvgIcon,
																	},
																	null,
																	8,
																	Do
																),
															])),
														],
														2
												  )),
											e.createVNode(
												i,
												{
													is: n.question.itemComponent,
													item: n.item,
													cssClasses: n.question.cssClasses,
												},
												null,
												8,
												["is", "item", "cssClasses"]
											),
										],
										2
									),
								]),
							],
							42,
							Io
						)
					)
				);
			},
		}),
		Ao = e.defineComponent({
			inheritAttrs: !1,
			__name: "RankingItemContent",
			props: { item: {}, cssClasses: {} },
			setup(a) {
				return (o, t) => (
					e.openBlock(),
					e.createElementBlock(
						"div",
						{ class: e.normalizeClass(o.cssClasses.controlLabel) },
						[
							e.createVNode(
								i,
								{ is: "survey-string", locString: o.item.locText },
								null,
								8,
								["locString"]
							),
						],
						2
					)
				);
			},
		}),
		Po = [
			"role",
			"aria-required",
			"aria-label",
			"aria-labelledby",
			"aria-describedby",
			"aria-invalid",
			"aria-errormessage",
		],
		Fo = e.createElementVNode(
			"legend",
			{ role: "presentation", class: "sv-hidden" },
			null,
			-1
		),
		Wo = e.defineComponent({
			inheritAttrs: !1,
			__name: "Rating",
			props: { question: {} },
			setup(a) {
				const o = a,
					t = e.ref(null);
				y(o, t);
				const n = (s) => o.question.getInputId(s);
				return (s, l) => (
					e.openBlock(),
					e.createElementBlock(
						"div",
						{
							class: e.normalizeClass(s.question.ratingRootCss),
							ref_key: "root",
							ref: t,
						},
						[
							e.createElementVNode(
								"fieldset",
								{
									role: s.question.a11y_input_ariaRole,
									"aria-required": s.question.a11y_input_ariaRequired,
									"aria-label": s.question.a11y_input_ariaLabel,
									"aria-labelledby": s.question.a11y_input_ariaLabelledBy,
									"aria-describedby": s.question.a11y_input_ariaDescribedBy,
									"aria-invalid": s.question.a11y_input_ariaInvalid,
									"aria-errormessage": s.question.a11y_input_ariaErrormessage,
								},
								[
									Fo,
									s.question.hasMinLabel
										? (e.openBlock(),
										  e.createElementBlock(
												"span",
												{
													key: 0,
													class: e.normalizeClass(
														s.question.cssClasses.minText
													),
												},
												[
													e.createVNode(
														i,
														{
															is: "survey-string",
															locString:
																s.question.locMinRateDescription,
														},
														null,
														8,
														["locString"]
													),
												],
												2
										  ))
										: e.createCommentVNode("", !0),
									(e.openBlock(!0),
									e.createElementBlock(
										e.Fragment,
										null,
										e.renderList(
											s.question.renderedRateItems,
											(r, d) => (
												e.openBlock(),
												e.createBlock(
													i,
													{
														key: n(d),
														is: s.question.itemComponent,
														item: r,
														index: d,
														question: s.question,
													},
													null,
													8,
													["is", "item", "index", "question"]
												)
											)
										),
										128
									)),
									s.question.hasMaxLabel
										? (e.openBlock(),
										  e.createElementBlock(
												"span",
												{
													key: 1,
													class: e.normalizeClass(
														s.question.cssClasses.maxText
													),
												},
												[
													e.createVNode(
														i,
														{
															is: "survey-string",
															locString:
																s.question.locMaxRateDescription,
														},
														null,
														8,
														["locString"]
													),
												],
												2
										  ))
										: e.createCommentVNode("", !0),
								],
								8,
								Po
							),
						],
						2
					)
				);
			},
		}),
		Oo = ["name", "id", "value", "disabled", "readonly", "aria-label"],
		Uo = ["data-text"],
		Qo = e.defineComponent({
			__name: "RatingItem",
			props: { question: {}, item: {}, index: {} },
			setup(a) {
				const o = a;
				return (
					g(() => o.item),
					(t, n) => (
						e.openBlock(),
						e.createElementBlock(
							"label",
							{
								key: t.item.value,
								onMousedown: n[1] || (n[1] = (s) => t.question.onMouseDown()),
								class: e.normalizeClass(t.item.className),
							},
							[
								e.createElementVNode(
									"input",
									{
										type: "radio",
										class: "sv-visuallyhidden",
										name: t.question.questionName,
										id: t.question.getInputId(t.index),
										value: t.item.value,
										disabled: t.question.isDisabledAttr,
										readonly: t.question.isReadOnlyAttr,
										onClick:
											n[0] ||
											(n[0] = (s) =>
												t.question.setValueFromClick(s.target.value)),
										"aria-label": t.question.ariaLabel,
									},
									null,
									8,
									Oo
								),
								e.createElementVNode(
									"span",
									{
										class: e.normalizeClass(t.question.cssClasses.itemText),
										"data-text": t.item.text,
									},
									[
										e.createVNode(
											i,
											{ is: "survey-string", locString: t.item.locText },
											null,
											8,
											["locString"]
										),
									],
									10,
									Uo
								),
							],
							34
						)
					)
				);
			},
		}),
		Ko = ["title"],
		jo = ["name", "id", "value", "disabled", "readonly", "aria-label"],
		Go = e.defineComponent({
			__name: "RatingItemSmiley",
			props: { question: {}, item: {}, index: {} },
			setup(a) {
				const o = a;
				return (
					g(() => o.item),
					(t, n) => (
						e.openBlock(),
						e.createElementBlock(
							"label",
							{
								key: t.item.value,
								style: e.normalizeStyle(t.item.style),
								class: e.normalizeClass(t.item.className),
								onMousedown: n[1] || (n[1] = (s) => t.question.onMouseDown()),
								onMouseover:
									n[2] || (n[2] = (s) => t.question.onItemMouseIn(t.item)),
								onMouseleave:
									n[3] || (n[3] = (s) => t.question.onItemMouseOut(t.item)),
								title: t.item.text,
							},
							[
								e.createElementVNode(
									"input",
									{
										type: "radio",
										class: "sv-visuallyhidden",
										name: t.question.questionName,
										id: t.question.getInputId(t.index),
										value: t.item.value,
										disabled: t.question.isDisabledAttr,
										readonly: t.question.isReadOnlyAttr,
										onClick:
											n[0] ||
											(n[0] = (s) =>
												t.question.setValueFromClick(s.target.value)),
										"aria-label": t.question.ariaLabel,
									},
									null,
									8,
									jo
								),
								e.createVNode(
									i,
									{
										is: "sv-svg-icon",
										iconName: t.question.getItemSmileyIconName(t.item),
										size: "auto",
									},
									null,
									8,
									["iconName"]
								),
							],
							46,
							Ko
						)
					)
				);
			},
		}),
		Jo = ["title"],
		Xo = ["name", "id", "value", "disabled", "readonly", "aria-label"],
		Yo = e.defineComponent({
			__name: "RatingItemStar",
			props: { question: {}, item: {}, index: {} },
			setup(a) {
				const o = a;
				return (
					g(() => o.item),
					(t, n) => (
						e.openBlock(),
						e.createElementBlock(
							"label",
							{
								key: t.item.value,
								onMousedown: n[1] || (n[1] = (s) => t.question.onMouseDown()),
								class: e.normalizeClass(t.item.className),
								onMouseover:
									n[2] || (n[2] = (s) => t.question.onItemMouseIn(t.item)),
								onMouseleave:
									n[3] || (n[3] = (s) => t.question.onItemMouseOut(t.item)),
								title: t.item.text,
							},
							[
								e.createElementVNode(
									"input",
									{
										type: "radio",
										class: "sv-visuallyhidden",
										name: t.question.questionName,
										id: t.question.getInputId(t.index),
										value: t.item.value,
										disabled: t.question.isDisabledAttr,
										readonly: t.question.isReadOnlyAttr,
										onClick:
											n[0] ||
											(n[0] = (s) =>
												t.question.setValueFromClick(
													(s == null ? void 0 : s.target).value
												)),
										"aria-label": t.question.ariaLabel,
									},
									null,
									8,
									Xo
								),
								e.createVNode(
									i,
									{
										is: "sv-svg-icon",
										class: e.normalizeClass("sv-star"),
										iconName: t.question.itemStarIcon,
										size: "auto",
									},
									null,
									8,
									["iconName"]
								),
								e.createVNode(
									i,
									{
										is: "sv-svg-icon",
										class: e.normalizeClass("sv-star-2"),
										iconName: t.question.itemStarIconAlt,
										size: "auto",
									},
									null,
									8,
									["iconName"]
								),
							],
							42,
							Jo
						)
					)
				);
			},
		}),
		_o = { class: "sd-rating-dropdown-item" },
		vo = { class: "sd-rating-dropdown-item_text" },
		xo = { key: 0, class: "sd-rating-dropdown-item_description" },
		en = e.defineComponent({
			__name: "RatingDropdownItem",
			props: { item: {}, model: {} },
			setup(a) {
				const o = a;
				return (
					g(() => o.item),
					(t, n) => (
						e.openBlock(),
						e.createElementBlock("div", _o, [
							e.createElementVNode("span", vo, e.toDisplayString(t.item.title), 1),
							t.item.description
								? (e.openBlock(),
								  e.createElementBlock("div", xo, [
										e.createVNode(
											i,
											{ is: "survey-string", locString: t.item.description },
											null,
											8,
											["locString"]
										),
								  ]))
								: e.createCommentVNode("", !0),
						])
					)
				);
			},
		});
	k.RendererFactory.Instance.registerRenderer("rating", "dropdown", "sv-rating-dropdown");
	const on = e.defineComponent({
			inheritAttrs: !1,
			__name: "RatingDropdown",
			props: { question: {} },
			setup(a) {
				const o = a,
					t = e.ref(null);
				return (
					y(o, t),
					(n, s) => (
						e.openBlock(),
						e.createElementBlock(
							"div",
							{
								class: e.normalizeClass(n.question.cssClasses.rootDropdown),
								ref_key: "root",
								ref: t,
							},
							[
								e.createVNode(
									i,
									{ is: "sv-dropdown", question: n.question },
									null,
									8,
									["question"]
								),
							],
							2
						)
					)
				);
			},
		}),
		nn = [
			"name",
			"value",
			"id",
			".indeterminate",
			"disabled",
			"readonly",
			"role",
			"aria-required",
			"aria-label",
			"aria-labelledby",
			"aria-describedby",
			"aria-invalid",
			"aria-errormessage",
		],
		sn = e.defineComponent({
			inheritAttrs: !1,
			__name: "BooleanSwitch",
			props: { question: {} },
			setup(a) {
				const o = a,
					t = e.ref(null);
				y(o, t);
				const n = (l, r) => {
						o.question.onLabelClick(l, r);
					},
					s = (l) => {
						o.question.onSwitchClickModel(l);
					};
				return (l, r) => (
					e.openBlock(),
					e.createElementBlock(
						"div",
						{
							class: e.normalizeClass(l.question.cssClasses.root),
							ref_key: "root",
							ref: t,
							onKeydown: r[4] || (r[4] = (d) => l.question.onKeyDownCore(d)),
						},
						[
							e.createElementVNode(
								"label",
								{ class: e.normalizeClass(l.question.getItemCss()) },
								[
									e.withDirectives(
										e.createElementVNode(
											"input",
											{
												type: "checkbox",
												name: l.question.name,
												value: l.question.booleanValue ?? "",
												"onUpdate:modelValue":
													r[0] ||
													(r[0] = (d) => (l.question.booleanValue = d)),
												class: e.normalizeClass(
													l.question.cssClasses.control
												),
												id: l.question.inputId,
												".indeterminate": l.question.isIndeterminate,
												disabled: l.question.isDisabledAttr,
												readonly: l.question.isReadOnlyAttr,
												role: l.question.a11y_input_ariaRole,
												"aria-required":
													l.question.a11y_input_ariaRequired,
												"aria-label": l.question.a11y_input_ariaLabel,
												"aria-labelledby":
													l.question.a11y_input_ariaLabelledBy,
												"aria-describedby":
													l.question.a11y_input_ariaDescribedBy,
												"aria-invalid": l.question.a11y_input_ariaInvalid,
												"aria-errormessage":
													l.question.a11y_input_ariaErrormessage,
											},
											null,
											42,
											nn
										),
										[[e.vModelCheckbox, l.question.booleanValue]]
									),
									e.createElementVNode(
										"div",
										{
											class: e.normalizeClass(
												l.question.cssClasses.sliderGhost
											),
											onClick:
												r[1] || (r[1] = (d) => n(d, l.question.swapOrder)),
										},
										[
											e.createElementVNode(
												"span",
												{
													class: e.normalizeClass(
														l.question.getLabelCss(
															l.question.swapOrder
														)
													),
												},
												[
													e.createVNode(
														i,
														{
															is: "survey-string",
															locString: l.question.locLabelLeft,
														},
														null,
														8,
														["locString"]
													),
												],
												2
											),
										],
										2
									),
									e.createElementVNode(
										"div",
										{
											class: e.normalizeClass(l.question.cssClasses.switch),
											onClick: r[2] || (r[2] = (d) => s(d)),
										},
										[
											e.createElementVNode(
												"span",
												{
													class: e.normalizeClass(
														l.question.cssClasses.slider
													),
												},
												[
													l.question.cssClasses.sliderText &&
													l.question.isDeterminated
														? (e.openBlock(),
														  e.createElementBlock(
																"span",
																{
																	key: 0,
																	class: e.normalizeClass(
																		l.question.cssClasses
																			.sliderText
																	),
																},
																[
																	e.createVNode(
																		i,
																		{
																			is: "survey-string",
																			locString:
																				l.question.getCheckedLabel(),
																		},
																		null,
																		8,
																		["locString"]
																	),
																],
																2
														  ))
														: e.createCommentVNode("", !0),
												],
												2
											),
										],
										2
									),
									e.createElementVNode(
										"div",
										{
											class: e.normalizeClass(
												l.question.cssClasses.sliderGhost
											),
											onClick:
												r[3] ||
												(r[3] = (d) => n(d, !l.question.swapOrder)),
										},
										[
											e.createElementVNode(
												"span",
												{
													class: e.normalizeClass(
														l.question.getLabelCss(
															!l.question.swapOrder
														)
													),
												},
												[
													e.createVNode(
														i,
														{
															is: "survey-string",
															locString: l.question.locLabelRight,
														},
														null,
														8,
														["locString"]
													),
												],
												2
											),
										],
										2
									),
								],
								2
							),
						],
						34
					)
				);
			},
		});
	k.RendererFactory.Instance.registerRenderer("boolean", "radio", "sv-boolean-radio");
	const tn = e.defineComponent({
			inheritAttrs: !1,
			__name: "BooleanRadio",
			props: { question: {} },
			setup(a) {
				const o = e.ref(null);
				return (
					y(a, o),
					(n, s) => (
						e.openBlock(),
						e.createElementBlock(
							"div",
							{
								class: e.normalizeClass(n.question.cssClasses.rootRadio),
								ref_key: "root",
								ref: o,
							},
							[
								e.createElementVNode(
									"fieldset",
									{
										role: "presentation",
										class: e.normalizeClass(
											n.question.cssClasses.radioFieldset
										),
									},
									[
										n.question.swapOrder
											? (e.openBlock(),
											  e.createBlock(
													i,
													{
														is: "sv-boolean-radio-item",
														key: "true",
														question: n.question,
														locText: n.question.locLabelTrue,
														value: n.question.getValueTrue(),
													},
													null,
													8,
													["question", "locText", "value"]
											  ))
											: e.createCommentVNode("", !0),
										(e.openBlock(),
										e.createBlock(
											i,
											{
												is: "sv-boolean-radio-item",
												key: "false",
												question: n.question,
												locText: n.question.locLabelFalse,
												value: n.question.getValueFalse(),
											},
											null,
											8,
											["question", "locText", "value"]
										)),
										n.question.swapOrder
											? e.createCommentVNode("", !0)
											: (e.openBlock(),
											  e.createBlock(
													i,
													{
														is: "sv-boolean-radio-item",
														key: "true",
														question: n.question,
														locText: n.question.locLabelTrue,
														value: n.question.getValueTrue(),
													},
													null,
													8,
													["question", "locText", "value"]
											  )),
									],
									2
								),
							],
							2
						)
					)
				);
			},
		}),
		ln = ["name", "value", "checked", "aria-errormessage", "disabled", "readonly"],
		rn = ["xlink:href"],
		an = e.defineComponent({
			__name: "BooleanRadioItem",
			props: { question: {}, locText: {}, value: { type: [String, Boolean] } },
			setup(a) {
				const o = a,
					t = () => {
						const n = o.question;
						n.value = o.value;
					};
				return (n, s) => (
					e.openBlock(),
					e.createElementBlock(
						"div",
						{
							role: "presentation",
							class: e.normalizeClass(
								n.question.getRadioItemClass(n.question.cssClasses, n.value)
							),
						},
						[
							e.createElementVNode(
								"label",
								{ class: e.normalizeClass(n.question.cssClasses.radioLabel) },
								[
									e.createElementVNode(
										"input",
										{
											type: "radio",
											name: n.question.name,
											value: n.value,
											checked: n.value === n.question.value,
											"aria-errormessage": n.question.ariaErrormessage,
											disabled: n.question.isDisabledAttr,
											readonly: n.question.isReadOnlyAttr,
											class: e.normalizeClass(
												n.question.cssClasses.itemRadioControl
											),
											onChange: t,
										},
										null,
										42,
										ln
									),
									n.question.cssClasses.materialRadioDecorator
										? (e.openBlock(),
										  e.createElementBlock(
												"span",
												{
													key: 0,
													class: e.normalizeClass(
														n.question.cssClasses
															.materialRadioDecorator
													),
												},
												[
													n.question.itemSvgIcon
														? (e.openBlock(),
														  e.createElementBlock(
																"svg",
																{
																	key: 0,
																	class: e.normalizeClass(
																		n.question.cssClasses
																			.itemRadioDecorator
																	),
																},
																[
																	e.createElementVNode(
																		"use",
																		{
																			"xlink:href":
																				n.question
																					.itemSvgIcon,
																		},
																		null,
																		8,
																		rn
																	),
																],
																2
														  ))
														: e.createCommentVNode("", !0),
												],
												2
										  ))
										: e.createCommentVNode("", !0),
									e.createElementVNode(
										"span",
										{
											class: e.normalizeClass(
												n.question.cssClasses.radioControlLabel
											),
										},
										[
											e.createVNode(
												i,
												{ is: "survey-string", locString: n.locText },
												null,
												8,
												["locString"]
											),
										],
										2
									),
								],
								2
							),
						],
						2
					)
				);
			},
		}),
		dn = [
			"name",
			"value",
			"id",
			".indeterminate",
			"disabled",
			"readonly",
			"aria-required",
			"aria-label",
			"aria-labelledby",
			"aria-describedby",
			"aria-invalid",
			"aria-errormessage",
		],
		mn = ["xlink:href"],
		cn = e.createElementVNode("span", { class: "check" }, null, -1),
		pn = ["id"],
		Cn = ["id"];
	k.RendererFactory.Instance.registerRenderer("boolean", "checkbox", "sv-boolean-checkbox");
	const gn = e.defineComponent({
			inheritAttrs: !1,
			__name: "BooleanCheckbox",
			props: { question: {}, css: {} },
			setup(a) {
				const o = a,
					t = e.ref(null);
				return (
					y(o, t),
					(n, s) => (
						e.openBlock(),
						e.createElementBlock(
							"div",
							{
								class: e.normalizeClass(n.question.cssClasses.rootCheckbox),
								ref_key: "root",
								ref: t,
							},
							[
								e.createElementVNode(
									"div",
									{ class: e.normalizeClass(n.question.getCheckboxItemCss()) },
									[
										e.createElementVNode(
											"label",
											{
												class: e.normalizeClass(
													n.question.cssClasses.checkboxLabel
												),
											},
											[
												e.withDirectives(
													e.createElementVNode(
														"input",
														{
															type: "checkbox",
															name: n.question.name,
															value: n.question.booleanValue ?? "",
															"onUpdate:modelValue":
																s[0] ||
																(s[0] = (l) =>
																	(n.question.booleanValue = l)),
															class: e.normalizeClass(
																n.question.cssClasses
																	.controlCheckbox
															),
															id: n.question.inputId,
															".indeterminate":
																n.question.isIndeterminate,
															disabled: n.question.isDisabledAttr,
															readonly: n.question.isReadOnlyAttr,
															"aria-required":
																n.question.a11y_input_ariaRequired,
															"aria-label":
																n.question.a11y_input_ariaLabel,
															"aria-labelledby":
																n.question
																	.a11y_input_ariaLabelledBy,
															"aria-describedby":
																n.question
																	.a11y_input_ariaDescribedBy,
															"aria-invalid":
																n.question.a11y_input_ariaInvalid,
															"aria-errormessage":
																n.question
																	.a11y_input_ariaErrormessage,
														},
														null,
														42,
														dn
													),
													[[e.vModelCheckbox, n.question.booleanValue]]
												),
												e.createElementVNode(
													"span",
													{
														class: e.normalizeClass(
															n.question.cssClasses
																.checkboxMaterialDecorator
														),
													},
													[
														n.question.svgIcon
															? (e.openBlock(),
															  e.createElementBlock(
																	"svg",
																	{
																		key: 0,
																		class: e.normalizeClass(
																			n.question.cssClasses
																				.checkboxItemDecorator
																		),
																	},
																	[
																		e.createElementVNode(
																			"use",
																			{
																				"xlink:href":
																					n.question
																						.svgIcon,
																			},
																			null,
																			8,
																			mn
																		),
																	],
																	2
															  ))
															: e.createCommentVNode("", !0),
														cn,
													],
													2
												),
												n.question.isLabelRendered
													? (e.openBlock(),
													  e.createElementBlock(
															"span",
															{
																key: 0,
																id: n.question.labelRenderedAriaID,
																class: e.normalizeClass(
																	n.question.cssClasses
																		.checkboxControlLabel
																),
															},
															[
																n.question.hasTitleActions
																	? e.createCommentVNode("", !0)
																	: (e.openBlock(),
																	  e.createBlock(
																			i,
																			{
																				key: 0,
																				is: "survey-element-title-content",
																				element:
																					n.question,
																				css: n.css,
																			},
																			null,
																			8,
																			["element", "css"]
																	  )),
																n.question.hasTitleActions
																	? (e.openBlock(),
																	  e.createBlock(
																			i,
																			{
																				key: 1,
																				is: "sv-title-actions",
																				element:
																					n.question,
																				css: n.css,
																			},
																			null,
																			8,
																			["element", "css"]
																	  ))
																	: e.createCommentVNode("", !0),
															],
															10,
															pn
													  ))
													: e.createCommentVNode("", !0),
											],
											2
										),
										n.question.canRenderLabelDescription
											? (e.openBlock(),
											  e.createElementBlock(
													"div",
													{
														key: 0,
														class: e.normalizeClass(
															n.question.cssDescription
														),
														id: n.question.ariaDescriptionId,
													},
													[
														e.createVNode(
															i,
															{
																is: "survey-string",
																locString:
																	n.question.locDescription,
															},
															null,
															8,
															["locString"]
														),
													],
													10,
													Cn
											  ))
											: e.createCommentVNode("", !0),
									],
									2
								),
							],
							2
						)
					)
				);
			},
		}),
		un = e.defineComponent({
			inheritAttrs: !1,
			__name: "Multipletext",
			props: { question: {} },
			setup(a) {
				const o = a,
					t = e.ref(null);
				return (
					y(o, t),
					(n, s) => (
						e.openBlock(),
						e.createElementBlock(
							"table",
							{
								class: e.normalizeClass(n.question.getQuestionRootCss()),
								ref_key: "root",
								ref: t,
							},
							[
								e.createElementVNode("tbody", null, [
									(e.openBlock(!0),
									e.createElementBlock(
										e.Fragment,
										null,
										e.renderList(
											n.question.getRows(),
											(l, r) => (
												e.openBlock(),
												e.createBlock(
													i,
													{
														key: n.question.inputId + "rowkey" + r,
														is: "sv-multipletext-row",
														question: n.question,
														row: l,
													},
													null,
													8,
													["question", "row"]
												)
											)
										),
										128
									)),
								]),
							],
							2
						)
					)
				);
			},
		}),
		kn = e.defineComponent({
			__name: "MultipleTextRow",
			props: { question: {}, row: {} },
			setup(a) {
				const o = a;
				return (
					g(() => o.row),
					(t, n) =>
						t.row.isVisible
							? (e.openBlock(),
							  e.createElementBlock(
									"tr",
									{ key: 0, class: e.normalizeClass(t.question.cssClasses.row) },
									[
										(e.openBlock(!0),
										e.createElementBlock(
											e.Fragment,
											null,
											e.renderList(
												t.row.cells,
												(s) => (
													e.openBlock(),
													e.createElementBlock(
														"td",
														{
															key: s.item.editor.id,
															class: e.normalizeClass(s.className),
														},
														[
															e.createVNode(
																i,
																{
																	is: "survey-multipletext-item",
																	question: t.question,
																	cell: s,
																},
																null,
																8,
																["question", "cell"]
															),
														],
														2
													)
												)
											),
											128
										)),
									],
									2
							  ))
							: e.createCommentVNode("", !0)
				);
			},
		}),
		yn = { key: 1 },
		hn = { key: 2 },
		Bn = e.defineComponent({
			__name: "MultipletextItem",
			props: { question: {}, cell: {} },
			setup(a) {
				const o = a,
					t = (s) => M(s);
				g(() => o.cell.item.editor);
				const n = e.computed(() => o.cell.item);
				return (s, l) =>
					s.cell.isErrorsCell
						? (e.openBlock(),
						  e.createBlock(
								i,
								{ key: 1, is: "survey-errors", element: n.value.editor },
								null,
								8,
								["element"]
						  ))
						: (e.openBlock(),
						  e.createElementBlock(
								"label",
								{
									key: 0,
									class: e.normalizeClass(s.question.getItemLabelCss(n.value)),
								},
								[
									e.createElementVNode(
										"span",
										{
											class: e.normalizeClass(s.question.getItemTitleCss()),
											style: e.normalizeStyle({
												minWidth: s.question.itemTitleWidth,
												width: s.question.itemTitleWidth,
											}),
										},
										[
											n.value.editor.isRequireTextBeforeTitle ||
											n.value.editor.isRequireTextOnStart
												? (e.openBlock(),
												  e.createElementBlock(
														"span",
														{
															key: 0,
															class: e.normalizeClass(
																s.question.cssClasses.requiredMark
															),
														},
														e.toDisplayString(
															n.value.editor.requiredMark
														),
														3
												  ))
												: e.createCommentVNode("", !0),
											n.value.editor.isRequireTextBeforeTitle ||
											n.value.editor.isRequireTextOnStart
												? (e.openBlock(),
												  e.createElementBlock("span", yn, " "))
												: e.createCommentVNode("", !0),
											e.createVNode(
												i,
												{
													is: "survey-string",
													locString: n.value.locTitle,
												},
												null,
												8,
												["locString"]
											),
											n.value.editor.isRequireTextAfterTitle
												? (e.openBlock(),
												  e.createElementBlock("span", hn, " "))
												: e.createCommentVNode("", !0),
											n.value.editor.isRequireTextAfterTitle
												? (e.openBlock(),
												  e.createElementBlock(
														"span",
														{
															key: 3,
															"aria-hidden": "true",
															class: e.normalizeClass(
																s.question.cssClasses.requiredMark
															),
														},
														e.toDisplayString(
															n.value.editor.requiredMark
														),
														3
												  ))
												: e.createCommentVNode("", !0),
										],
										6
									),
									(e.openBlock(),
									e.createElementBlock(
										"div",
										{
											key: n.value.editor.id,
											class: e.normalizeClass(s.question.getItemCss()),
											onFocusin: l[0] || (l[0] = (r) => n.value.focusIn()),
										},
										[
											e.createVNode(
												i,
												{
													is: t(n.value.editor),
													question: n.value.editor,
												},
												null,
												8,
												["is", "question"]
											),
										],
										34
									)),
								],
								2
						  ));
			},
		}),
		qn = e.defineComponent({
			inheritAttrs: !1,
			__name: "Breadcrumbs",
			props: { model: {}, css: {} },
			setup(a) {
				const o = a;
				return (
					g(() => o.model),
					(t, n) =>
						t.model.actions && t.model.actions.length
							? (e.openBlock(),
							  e.createElementBlock(
									"div",
									{ key: 0, class: e.normalizeClass(t.css.breadcrumbsRoot) },
									[
										(e.openBlock(!0),
										e.createElementBlock(
											e.Fragment,
											null,
											e.renderList(
												t.model.actions,
												(s, l) => (
													e.openBlock(),
													e.createElementBlock(
														e.Fragment,
														{ key: s.renderedId },
														[
															l
																? (e.openBlock(),
																  e.createBlock(
																		i,
																		{
																			key: 0,
																			is: "sv-svg-icon",
																			class: e.normalizeClass(
																				t.css
																					.breadcrumbsSeparator
																			),
																			iconName:
																				"arrowright-16x16",
																			size: "auto",
																		},
																		null,
																		8,
																		["class"]
																  ))
																: e.createCommentVNode("", !0),
															e.createVNode(
																i,
																{ is: "sv-action", item: s },
																null,
																8,
																["item"]
															),
														],
														64
													)
												)
											),
											128
										)),
									],
									2
							  ))
							: e.createCommentVNode("", !0)
				);
			},
		}),
		wn = ["onClick", "title"],
		fn = ["onClick", "title"],
		Vn = { key: 1 },
		bn = { key: 1 },
		Ln = e.defineComponent({
			__name: "SingleInputSummary",
			props: { summary: {}, css: {} },
			setup(a) {
				const o = a,
					t = e.computed(() => "survey-placeholder-" + o.summary.question.getTemplate()),
					n = e.computed(() => q.Instance.isComponentRegistered(t.value));
				return (s, l) =>
					s.summary.isEmpty()
						? (e.openBlock(),
						  e.createElementBlock("div", Vn, [
								n.value
									? (e.openBlock(),
									  e.createBlock(
											i,
											{
												key: 0,
												is:
													"survey-placeholder-" +
													s.summary.question.getTemplate(),
												cssClasses: s.css,
												question: s.summary.question,
											},
											null,
											8,
											["is", "cssClasses", "question"]
									  ))
									: (e.openBlock(),
									  e.createElementBlock("div", bn, [
											e.createVNode(
												i,
												{
													is: "survey-string",
													locString: s.summary.noEntry,
												},
												null,
												8,
												["locString"]
											),
									  ])),
						  ]))
						: (e.openBlock(),
						  e.createElementBlock(
								"div",
								{ key: 0, class: e.normalizeClass(s.css.summary) },
								[
									(e.openBlock(!0),
									e.createElementBlock(
										e.Fragment,
										null,
										e.renderList(
											s.summary.items,
											(r, d) => (
												e.openBlock(),
												e.createElementBlock(
													"div",
													{
														key: d,
														class: e.normalizeClass(s.css.summaryRow),
													},
													[
														e.createElementVNode(
															"div",
															{
																class: e.normalizeClass(
																	s.css.summaryRowContent
																),
															},
															[
																e.createVNode(
																	i,
																	{
																		is: "survey-string",
																		locString: r.locText,
																	},
																	null,
																	8,
																	["locString"]
																),
															],
															2
														),
														e.createElementVNode(
															"div",
															{
																class: e.normalizeClass(
																	s.css.summaryRowActions
																),
															},
															[
																r.btnEdit
																	? (e.openBlock(),
																	  e.createElementBlock(
																			"button",
																			{
																				key: 0,
																				class: e.normalizeClass(
																					s.css
																						.summaryRowActionEdit
																				),
																				onClick: (m) =>
																					r.btnEdit.action(),
																				title: r.btnEdit
																					.title,
																			},
																			[
																				e.createVNode(i, {
																					is: "sv-svg-icon",
																					iconName:
																						"icon-editsmall-16x16",
																					size: "auto",
																				}),
																			],
																			10,
																			wn
																	  ))
																	: e.createCommentVNode("", !0),
																r.showRemove && r.btnRemove
																	? (e.openBlock(),
																	  e.createElementBlock(
																			"button",
																			{
																				key: 1,
																				class: e.normalizeClass(
																					s.css
																						.summaryRowActionDelete
																				),
																				onClick: (m) =>
																					r.btnRemove.action(),
																				title: r.btnRemove
																					.title,
																			},
																			[
																				e.createVNode(i, {
																					is: "sv-svg-icon",
																					iconName:
																						"icon-delete-16x16",
																					size: "auto",
																				}),
																			],
																			10,
																			fn
																	  ))
																	: e.createCommentVNode("", !0),
															],
															2
														),
													],
													2
												)
											)
										),
										128
									)),
								],
								2
						  ));
			},
		}),
		Nn = ["min", "max", "step", "id"],
		En = [
			"id",
			"value",
			"min",
			"max",
			"step",
			"disabled",
			"onInput",
			"onFocus",
			"aria-required",
			"aria-label",
			"aria-labelledby",
			"aria-describedby",
			"aria-invalid",
			"aria-errormessage",
		],
		Mn = e.defineComponent({
			inheritAttrs: !1,
			__name: "Slider",
			props: { question: {} },
			setup(a) {
				const o = a,
					t = e.ref(null),
					n = e.ref(null);
				return (
					y(o, t),
					e.onMounted(() => {
						o.question.refreshInputRange(n.value);
					}),
					(s, l) => (
						e.openBlock(),
						e.createElementBlock(
							"div",
							{
								class: e.normalizeClass(s.question.rootCss),
								ref_key: "rootRef",
								ref: t,
							},
							[
								s.question.sliderType !== "single" && s.question.allowDragRange
									? (e.openBlock(),
									  e.createElementBlock(
											"input",
											{
												key: 0,
												ref_key: "rangeInputRef",
												ref: n,
												name: "range-input",
												class: e.normalizeClass(
													s.question.cssClasses.input
												),
												type: "range",
												tabIndex: "-1",
												min: s.question.min,
												max: s.question.max,
												step: s.question.step,
												"aria-hidden": "true",
												id:
													s.question.id +
													"-sjs-slider-input-range-input",
												onInput:
													l[0] ||
													(l[0] = (r) => {
														s.question.handleRangeOnChange(r);
													}),
												onPointerdown:
													l[1] ||
													(l[1] = (r) => {
														s.question.handleRangePointerDown(
															r,
															t.value
														);
													}),
												onPointerup:
													l[2] ||
													(l[2] = (r) => {
														s.question.handleRangePointerUp(
															r,
															t.value
														);
													}),
											},
											null,
											42,
											Nn
									  ))
									: e.createCommentVNode("", !0),
								e.createElementVNode(
									"div",
									{
										class: e.normalizeClass(
											s.question.cssClasses.visualContainer
										),
										onPointerup:
											l[8] ||
											(l[8] = (r) => {
												s.question.setValueByClickOnPath(r, t.value);
											}),
									},
									[
										e.createElementVNode(
											"div",
											{
												class: e.normalizeClass(
													s.question.cssClasses.visualContainerSlider
												),
											},
											[
												e.createElementVNode(
													"div",
													{
														class: e.normalizeClass(
															s.question.cssClasses.inverseTrackLeft
														),
														style: e.normalizeStyle({
															width:
																s.question.getTrackPercentLeft() +
																"%",
														}),
													},
													null,
													6
												),
												e.createElementVNode(
													"div",
													{
														class: e.normalizeClass(
															s.question.cssClasses.inverseTrackRight
														),
														style: e.normalizeStyle({
															width:
																s.question.getTrackPercentRight() +
																"%",
														}),
													},
													null,
													6
												),
												e.createElementVNode(
													"div",
													{
														class: e.normalizeClass(
															s.question.cssClasses.rangeTrack
														),
														style: e.normalizeStyle({
															left:
																s.question.getTrackPercentLeft() +
																"%",
															right:
																s.question.getTrackPercentRight() +
																"%",
														}),
													},
													null,
													6
												),
												(e.openBlock(!0),
												e.createElementBlock(
													e.Fragment,
													null,
													e.renderList(
														s.question.renderedValue,
														(r, d) => (
															e.openBlock(),
															e.createElementBlock(
																e.Fragment,
																{ key: d },
																[
																	e.createElementVNode(
																		"input",
																		{
																			class: e.normalizeClass(
																				s.question
																					.cssClasses
																					.input
																			),
																			id:
																				s.question.id +
																				"-sjs-slider-input-" +
																				d,
																			type: "range",
																			value: r,
																			min: s.question.min,
																			max: s.question.max,
																			step: s.question.step,
																			disabled:
																				s.question
																					.isDisabledAttr,
																			onInput: (m) => {
																				s.question.handleOnChange(
																					m,
																					d
																				);
																			},
																			onPointerdown:
																				l[3] ||
																				(l[3] = (m) => {
																					s.question.handlePointerDown(
																						m
																					);
																				}),
																			onPointerup:
																				l[4] ||
																				(l[4] = (m) => {
																					m.stopPropagation(),
																						s.question.handlePointerUp(
																							m
																						);
																				}),
																			onKeydown:
																				l[5] ||
																				(l[5] = (m) => {
																					s.question.handleKeyDown(
																						m
																					);
																				}),
																			onKeyup:
																				l[6] ||
																				(l[6] = (m) => {
																					s.question.handleKeyUp(
																						m
																					);
																				}),
																			onFocus: () => {
																				s.question.handleOnFocus(
																					d
																				);
																			},
																			onBlur:
																				l[7] ||
																				(l[7] = () => {
																					s.question.handleOnBlur();
																				}),
																			"aria-required":
																				s.question
																					.a11y_input_ariaRequired,
																			"aria-label":
																				s.question
																					.a11y_input_ariaLabel,
																			"aria-labelledby":
																				s.question
																					.a11y_input_ariaLabelledBy,
																			"aria-describedby":
																				s.question
																					.a11y_input_ariaDescribedBy,
																			"aria-invalid":
																				s.question
																					.a11y_input_ariaInvalid,
																			"aria-errormessage":
																				s.question
																					.a11y_input_ariaErrormessage,
																		},
																		null,
																		42,
																		En
																	),
																	e.createElementVNode(
																		"div",
																		{
																			class: e.normalizeClass(
																				s.question.getThumbContainerCss(
																					d
																				)
																			),
																			style: e.normalizeStyle(
																				{
																					left:
																						s.question.getPercent(
																							r
																						) + "%",
																				}
																			),
																		},
																		[
																			s.question
																				.tooltipVisibility !==
																			"never"
																				? (e.openBlock(),
																				  e.createElementBlock(
																						"div",
																						{
																							key: 0,
																							class: e.normalizeClass(
																								s
																									.question
																									.tooltipCss
																							),
																						},
																						[
																							e.createElementVNode(
																								"div",
																								{
																									class: e.normalizeClass(
																										s
																											.question
																											.cssClasses
																											.tooltipPanel
																									),
																								},
																								[
																									e.createElementVNode(
																										"div",
																										{
																											class: e.normalizeClass(
																												s
																													.question
																													.cssClasses
																													.tooltipValue
																											),
																										},
																										e.toDisplayString(
																											s.question.getTooltipValue(
																												d
																											)
																										),
																										3
																									),
																								],
																								2
																							),
																						],
																						2
																				  ))
																				: e.createCommentVNode(
																						"",
																						!0
																				  ),
																			e.createElementVNode(
																				"div",
																				{
																					class: e.normalizeClass(
																						s.question
																							.cssClasses
																							.thumb
																					),
																				},
																				[
																					e.createElementVNode(
																						"div",
																						{
																							class: e.normalizeClass(
																								s
																									.question
																									.cssClasses
																									.thumbDot
																							),
																						},
																						null,
																						2
																					),
																				],
																				2
																			),
																		],
																		6
																	),
																],
																64
															)
														)
													),
													128
												)),
											],
											2
										),
									],
									34
								),
								s.question.showLabels
									? (e.openBlock(),
									  e.createElementBlock(
											"div",
											{
												key: 1,
												class: e.normalizeClass(
													s.question.cssClasses.labelsContainer
												),
											},
											[
												e.createElementVNode("div", null, [
													(e.openBlock(!0),
													e.createElementBlock(
														e.Fragment,
														null,
														e.renderList(
															s.question.renderedLabels,
															(r) => (
																e.openBlock(),
																e.createBlock(
																	i,
																	{
																		key: r.id,
																		is: "sv-slider-label-item",
																		item: r,
																		question: s.question,
																	},
																	null,
																	8,
																	["item", "question"]
																)
															)
														),
														128
													)),
												]),
											],
											2
									  ))
									: e.createCommentVNode("", !0),
							],
							2
						)
					)
				);
			},
		}),
		Sn = e.defineComponent({
			__name: "SliderLabelItem",
			props: { question: {}, item: {} },
			setup(a) {
				const o = a;
				return (
					g(() => o.item),
					(t, n) => (
						e.openBlock(),
						e.createElementBlock(
							"div",
							{
								class: e.normalizeClass(t.question.getLabelCss(t.item.locText)),
								style: e.normalizeStyle({
									left: t.question.getPercent(t.item.value) + "%",
								}),
								onPointerup:
									n[0] ||
									(n[0] = (s) => {
										t.question.handleLabelPointerUp(s, t.item.value);
									}),
							},
							[
								e.createElementVNode(
									"div",
									{ class: e.normalizeClass(t.question.cssClasses.labelTick) },
									null,
									2
								),
								e.createElementVNode(
									"div",
									{
										class: e.normalizeClass(
											t.question.cssClasses.labelTextContainer
										),
									},
									[
										t.item.showValue
											? e.createCommentVNode("", !0)
											: (e.openBlock(),
											  e.createElementBlock(
													"div",
													{
														key: 0,
														class: e.normalizeClass(
															t.question.cssClasses.labelText
														),
													},
													[
														e.createVNode(
															i,
															{
																is: "survey-string",
																locString: t.item.locText,
															},
															null,
															8,
															["locString"]
														),
													],
													2
											  )),
										t.item.showValue
											? (e.openBlock(),
											  e.createElementBlock(
													"div",
													{
														key: 1,
														class: e.normalizeClass(
															t.question.cssClasses.labelText
														),
													},
													e.toDisplayString(t.item.value),
													3
											  ))
											: e.createCommentVNode("", !0),
										t.item.showValue
											? (e.openBlock(),
											  e.createElementBlock(
													"div",
													{
														key: 2,
														class: e.normalizeClass(
															t.question.cssClasses
																.labelTextSecondaryMode
														),
													},
													[
														e.createVNode(
															i,
															{
																is: "survey-string",
																locString: t.item.locText,
															},
															null,
															8,
															["locString"]
														),
													],
													2
											  ))
											: e.createCommentVNode("", !0),
									],
									2
								),
							],
							38
						)
					)
				);
			},
		}),
		zn = { role: "radiogroup" },
		Hn = { class: "sv-visuallyhidden" },
		In = { key: 0, role: "presentation" },
		Rn = { key: 0 },
		Tn = e.defineComponent({
			inheritAttrs: !1,
			__name: "Matrix",
			props: { question: {} },
			setup(a) {
				const o = a,
					t = e.ref(null),
					n = e.shallowRef();
				return (
					y(
						o,
						t,
						(s) => {
							(n.value = s.visibleRows),
								(s.visibleRowsChangedCallback = () => {
									n.value = s.visibleRows;
								});
						},
						(s) => {
							s.visibleRowsChangedCallback = () => {};
						}
					),
					(s, l) => (
						e.openBlock(),
						e.createElementBlock(
							"div",
							{
								class: e.normalizeClass(s.question.getTableWrapperCss()),
								ref_key: "root",
								ref: t,
							},
							[
								e.createElementVNode("fieldset", zn, [
									e.createElementVNode(
										"legend",
										Hn,
										e.toDisplayString(s.question.locTitle.renderedHtml),
										1
									),
									e.createElementVNode(
										"table",
										{
											class: e.normalizeClass(s.question.getTableCss()),
											role: "presentation",
										},
										[
											s.question.showHeader
												? (e.openBlock(),
												  e.createElementBlock("thead", In, [
														e.createElementVNode("tr", null, [
															s.question.hasRows
																? (e.openBlock(),
																  e.createElementBlock("td", Rn))
																: e.createCommentVNode("", !0),
															(e.openBlock(!0),
															e.createElementBlock(
																e.Fragment,
																null,
																e.renderList(
																	s.question.visibleColumns,
																	(r, d) => (
																		e.openBlock(),
																		e.createElementBlock(
																			"th",
																			{
																				key: d,
																				class: e.normalizeClass(
																					s.question
																						.cssClasses
																						.headerCell
																				),
																				style: e.normalizeStyle(
																					{
																						minWidth:
																							s
																								.question
																								.columnMinWidth,
																						width: s
																							.question
																							.columnMinWidth,
																					}
																				),
																			},
																			[
																				e.createVNode(
																					i,
																					{
																						is: s.question.getColumnHeaderWrapperComponentName(
																							r
																						),
																						componentData:
																							s.question.getColumnHeaderWrapperComponentData(
																								r
																							),
																					},
																					{
																						default:
																							e.withCtx(
																								() => [
																									e.createVNode(
																										i,
																										{
																											is: "survey-string",
																											locString:
																												r.locText,
																										},
																										null,
																										8,
																										[
																											"locString",
																										]
																									),
																								]
																							),
																						_: 2,
																					},
																					1032,
																					[
																						"is",
																						"componentData",
																					]
																				),
																			],
																			6
																		)
																	)
																),
																128
															)),
														]),
												  ]))
												: e.createCommentVNode("", !0),
											e.createElementVNode("tbody", null, [
												(e.openBlock(!0),
												e.createElementBlock(
													e.Fragment,
													null,
													e.renderList(
														n.value,
														(r) => (
															e.openBlock(),
															e.createBlock(
																i,
																{
																	key: r.uniqueId,
																	is: "sv-matrix-row",
																	question: s.question,
																	row: r,
																},
																null,
																8,
																["question", "row"]
															)
														)
													),
													128
												)),
											]),
										],
										2
									),
								]),
							],
							2
						)
					)
				);
			},
		}),
		$n = ["data-sv-drop-target-matrix-row"],
		Dn = e.defineComponent({
			__name: "MatrixDropdownRow",
			props: { question: {}, row: {} },
			setup(a) {
				const o = a,
					t = e.ref();
				g(() => o.row);
				const n = e.watch(
					() => o.row,
					(s, l) => {
						l && l.setRootElement(void 0), s.setRootElement(t.value);
					}
				);
				return (
					e.onMounted(() => {
						o.row.setRootElement(t.value);
					}),
					e.onUnmounted(() => {
						o.row.setRootElement(void 0), n();
					}),
					(s, l) =>
						s.row.visible
							? (e.openBlock(),
							  e.createElementBlock(
									"tr",
									{
										key: 0,
										"data-sv-drop-target-matrix-row": s.row.dropTargetId,
										class: e.normalizeClass(s.row.className),
										ref_key: "root",
										ref: t,
									},
									[
										(e.openBlock(!0),
										e.createElementBlock(
											e.Fragment,
											null,
											e.renderList(
												s.row.cells,
												(r) => (
													e.openBlock(),
													e.createBlock(
														i,
														{
															is: "survey-matrixdropdown-cell",
															cell: r,
															question: s.question,
															key: s.row.id + "_" + r.id,
														},
														null,
														8,
														["cell", "question"]
													)
												)
											),
											128
										)),
									],
									10,
									$n
							  ))
							: e.createCommentVNode("", !0)
				);
			},
		}),
		Zn = [
			"type",
			"name",
			"checked",
			"value",
			"readonly",
			"disabled",
			"id",
			"aria-required",
			"aria-label",
			"aria-invalid",
			"aria-errormessage",
		],
		An = ["xlink:href"],
		Pn = e.defineComponent({
			inheritAttrs: !1,
			__name: "MatrixCell",
			props: { question: {}, row: {}, column: {}, columnIndex: {} },
			setup(a) {
				const o = a;
				g(() => o.column);
				const t = () => {
						const s = o.row,
							l = o.column;
						s.cellClick(l);
					},
					n = e.computed(() => o.question.getItemSvgIcon(o.row, o.column));
				return (s, l) => (
					e.openBlock(),
					e.createElementBlock(
						"label",
						{
							onMousedown: l[0] || (l[0] = (r) => s.question.onMouseDown()),
							class: e.normalizeClass(s.question.getItemClass(s.row, s.column)),
						},
						[
							e.createElementVNode(
								"input",
								{
									type: s.question.checkType,
									class: e.normalizeClass(s.question.cssItemValue),
									name: s.row.fullName,
									checked: s.row.isChecked(s.column),
									onInput: t,
									value: s.column.value,
									readonly: s.row.isReadOnlyAttr,
									disabled: s.row.isDisabledAttr,
									id:
										s.question.inputId +
										"_" +
										s.row.name +
										"_" +
										s.columnIndex,
									"aria-required": s.question.a11y_input_ariaRequired,
									"aria-label": s.question.getCellAriaLabel(s.row, s.column),
									"aria-invalid": s.question.a11y_input_ariaInvalid,
									"aria-errormessage": s.question.a11y_input_ariaErrormessage,
								},
								null,
								42,
								Zn
							),
							e.createElementVNode(
								"span",
								{ class: e.normalizeClass(s.question.cssMaterialDecorator) },
								[
									n.value
										? (e.openBlock(),
										  e.createElementBlock(
												"svg",
												{
													key: 0,
													class: e.normalizeClass(
														s.question.cssItemDecorator
													),
												},
												[
													e.createElementVNode(
														"use",
														{ "xlink:href": n.value },
														null,
														8,
														An
													),
												],
												2
										  ))
										: e.createCommentVNode("", !0),
								],
								2
							),
							s.question.isMobile
								? (e.openBlock(),
								  e.createElementBlock(
										"span",
										{
											key: 0,
											class: e.normalizeClass(
												s.question.cssClasses.cellResponsiveTitle
											),
										},
										[
											e.createVNode(
												i,
												{
													is: "survey-string",
													locString: s.column.locText,
												},
												null,
												8,
												["locString"]
											),
										],
										2
								  ))
								: e.createCommentVNode("", !0),
						],
						34
					)
				);
			},
		}),
		Fn = e.defineComponent({
			inheritAttrs: !1,
			__name: "MatrixDropdown",
			props: { question: {} },
			setup(a) {
				const o = a,
					t = e.ref(null);
				return (
					y(o, t),
					(n, s) => (
						e.openBlock(),
						e.createBlock(
							i,
							{
								is: "survey-matrixtable",
								question: n.question,
								ref_key: "root",
								ref: t,
							},
							null,
							8,
							["question"]
						)
					)
				);
			},
		}),
		Wn = { key: 0 },
		On = { key: 1 },
		Un = e.defineComponent({
			__name: "MatrixTable",
			props: { question: {} },
			setup(a) {
				const o = a,
					t = e.computed(() => o.question.renderedTable);
				return (
					g(() => t.value),
					(n, s) => (
						e.openBlock(),
						e.createElementBlock(
							"div",
							{
								style: e.normalizeStyle({
									overflowX: n.question.showHorizontalScroll ? "scroll" : "",
								}),
								class: e.normalizeClass(n.question.getTableWrapperCss()),
							},
							[
								e.createElementVNode(
									"table",
									{ class: e.normalizeClass(n.question.getTableCss()) },
									[
										t.value.showHeader
											? (e.openBlock(),
											  e.createElementBlock("thead", Wn, [
													e.createElementVNode("tr", null, [
														(e.openBlock(!0),
														e.createElementBlock(
															e.Fragment,
															null,
															e.renderList(
																t.value.headerRow.cells,
																(l) => (
																	e.openBlock(),
																	e.createElementBlock(
																		e.Fragment,
																		null,
																		[
																			l.hasTitle
																				? (e.openBlock(),
																				  e.createElementBlock(
																						"th",
																						{
																							key:
																								"header_" +
																								l.id,
																							class: e.normalizeClass(
																								l.className
																							),
																							style: e.normalizeStyle(
																								{
																									minWidth:
																										l.minWidth,
																									width: l.width,
																								}
																							),
																						},
																						[
																							e.createVNode(
																								i,
																								{
																									is: n.question.getColumnHeaderWrapperComponentName(
																										l
																									),
																									componentData:
																										n.question.getColumnHeaderWrapperComponentData(
																											l
																										),
																								},
																								{
																									default:
																										e.withCtx(
																											() => [
																												e.createVNode(
																													i,
																													{
																														is: "survey-string",
																														locString:
																															l.locTitle,
																													},
																													null,
																													8,
																													[
																														"locString",
																													]
																												),
																												l.column
																													? (e.openBlock(),
																													  e.createBlock(
																															i,
																															{
																																key: 0,
																																is: "survey-matrixheaderrequired",
																																column: l.column,
																																question:
																																	n.question,
																															},
																															null,
																															8,
																															[
																																"column",
																																"question",
																															]
																													  ))
																													: e.createCommentVNode(
																															"",
																															!0
																													  ),
																											]
																										),
																									_: 2,
																								},
																								1032,
																								[
																									"is",
																									"componentData",
																								]
																							),
																						],
																						6
																				  ))
																				: e.createCommentVNode(
																						"",
																						!0
																				  ),
																			l.hasTitle
																				? e.createCommentVNode(
																						"",
																						!0
																				  )
																				: (e.openBlock(),
																				  e.createElementBlock(
																						"td",
																						{
																							class: e.normalizeClass(
																								l.className
																							),
																							key:
																								"header_" +
																								l.id,
																							style: e.normalizeStyle(
																								{
																									minWidth:
																										l.minWidth,
																									width: l.width,
																								}
																							),
																						},
																						null,
																						6
																				  )),
																		],
																		64
																	)
																)
															),
															256
														)),
													]),
											  ]))
											: e.createCommentVNode("", !0),
										e.createElementVNode("tbody", null, [
											(e.openBlock(!0),
											e.createElementBlock(
												e.Fragment,
												null,
												e.renderList(
													t.value.renderedRows,
													(l) => (
														e.openBlock(),
														e.createBlock(
															i,
															{
																key:
																	n.question.inputId +
																	"_" +
																	l.id,
																is: "survey-matrix-row",
																row: l,
																question: n.question,
															},
															null,
															8,
															["row", "question"]
														)
													)
												),
												128
											)),
										]),
										t.value.showFooter
											? (e.openBlock(),
											  e.createElementBlock("tfoot", On, [
													e.createElementVNode("tr", null, [
														(e.openBlock(!0),
														e.createElementBlock(
															e.Fragment,
															null,
															e.renderList(
																t.value.footerRow.cells,
																(l, r) => (
																	e.openBlock(),
																	e.createBlock(
																		i,
																		{
																			is: "survey-matrixdropdown-cell",
																			cell: l,
																			question: n.question,
																			key: "footer_" + r,
																		},
																		null,
																		8,
																		["cell", "question"]
																	)
																)
															),
															128
														)),
													]),
											  ]))
											: e.createCommentVNode("", !0),
									],
									2
								),
							],
							6
						)
					)
				);
			},
		}),
		Qn = e.createElementVNode("span", null, " ", -1),
		Kn = e.defineComponent({
			__name: "MatrixHeaderRequired",
			props: { question: {}, column: {} },
			setup(a) {
				const o = a;
				return (
					g(() => o.column),
					(t, n) =>
						t.column.isRenderedRequired
							? (e.openBlock(),
							  e.createElementBlock(
									e.Fragment,
									{ key: 0 },
									[
										Qn,
										t.column.isRenderedRequired
											? (e.openBlock(),
											  e.createElementBlock(
													"span",
													{
														key: 0,
														class: e.normalizeClass(
															t.question.cssClasses.cellRequiredMark
														),
													},
													e.toDisplayString(t.column.requiredMark),
													3
											  ))
											: e.createCommentVNode("", !0),
									],
									64
							  ))
							: e.createCommentVNode("", !0)
				);
			},
		}),
		jn = ["title", "colspan"],
		Gn = e.defineComponent({
			__name: "MatrixDropdownCellComp",
			props: { question: {}, cell: {} },
			setup(a) {
				const o = a,
					t = e.ref(!1),
					n = e.ref();
				g(() => o.cell.column);
				const s = () =>
						o.cell.width || o.cell.minWidth
							? { width: o.cell.width, minWidth: o.cell.minWidth }
							: null,
					l = () =>
						o.cell.question.parentQuestion.getCellAriaLabel(o.cell.row, o.cell.column),
					r = () => {
						!o.cell.hasQuestion ||
							!o.question ||
							!o.question.survey ||
							(t.value = o.cell.question.isVisible);
					},
					d = (c) => M(c);
				r(),
					e.onMounted(() => {
						if (!o.cell.hasQuestion || !o.question || !o.question.survey) return;
						o.cell.question.registerPropertyChangedHandlers(["isVisible"], () => {
							r();
						});
						const c = n.value,
							p = o.cell.question,
							C = {
								cell: o.cell.cell,
								cellQuestion: p,
								htmlElement: c,
								row: o.cell.row,
								column: o.cell.cell.column,
							};
						o.question.survey.matrixAfterCellRender(C), p && p.afterRenderCore(c);
					});
				const m = e.computed(() => {
						const c = o.cell;
						if (c.hasPanel) {
							const p = c.panel,
								C = p.survey;
							if (C) {
								const B = C.getElementWrapperComponentName(p);
								if (B) return B;
							}
							return "survey-panel";
						}
					}),
					u = e.computed(() => {
						if (o.cell.hasPanel) {
							const p = o.cell.panel,
								C = p.survey;
							let B;
							return (
								C && (B = C.getElementWrapperComponentData(p)),
								{
									componentName: "survey-panel",
									componentData: {
										element: p,
										data: B,
										css: o.question.cssClasses,
									},
								}
							);
						}
					});
				return (c, p) =>
					c.cell.isVisible
						? (e.openBlock(),
						  e.createElementBlock(
								"td",
								{
									key: 0,
									class: e.normalizeClass(c.cell.className),
									title: c.cell.getTitle(),
									style: e.normalizeStyle(s()),
									colspan: c.cell.colSpans,
									onFocusin: p[0] || (p[0] = (C) => c.cell.focusIn()),
									ref_key: "root",
									ref: n,
								},
								[
									c.cell.isErrorsCell
										? (e.openBlock(),
										  e.createBlock(
												i,
												{
													key: 0,
													is: "survey-errors",
													element: c.cell.question,
												},
												null,
												8,
												["element"]
										  ))
										: e.createCommentVNode("", !0),
									c.cell.isDragHandlerCell
										? (e.openBlock(),
										  e.createBlock(
												i,
												{
													key: 1,
													is: "sv-matrix-drag-drop-icon",
													item: {
														data: {
															row: c.cell.row,
															question: c.question,
														},
													},
												},
												null,
												8,
												["item"]
										  ))
										: e.createCommentVNode("", !0),
									c.cell.isActionsCell
										? (e.openBlock(),
										  e.createBlock(
												i,
												{
													key: 2,
													is: "sv-action-bar",
													model: c.cell.item.getData(),
													handleClick: !1,
												},
												null,
												8,
												["model"]
										  ))
										: e.createCommentVNode("", !0),
									c.cell.hasPanel
										? (e.openBlock(),
										  e.createBlock(
												i,
												e.mergeProps({ key: 3, is: m.value }, u.value),
												null,
												16,
												["is"]
										  ))
										: e.createCommentVNode("", !0),
									c.cell.showResponsiveTitle
										? (e.openBlock(),
										  e.createElementBlock(
												"span",
												{
													key: 4,
													class: e.normalizeClass(
														c.cell.responsiveTitleCss
													),
												},
												[
													e.createVNode(
														i,
														{
															is: "survey-string",
															locString: c.cell.responsiveLocTitle,
														},
														null,
														8,
														["locString"]
													),
													e.createVNode(
														i,
														{
															is: "survey-matrixheaderrequired",
															column: c.cell.column,
															question: c.cell.matrix,
														},
														null,
														8,
														["column", "question"]
													),
												],
												2
										  ))
										: e.createCommentVNode("", !0),
									c.cell.hasQuestion
										? e.withDirectives(
												(e.openBlock(),
												e.createElementBlock(
													"div",
													{
														key: 5,
														class: e.normalizeClass(
															c.cell.cellQuestionWrapperClassName
														),
													},
													[
														!c.cell.isChoice &&
														c.cell.question.isDefaultRendering()
															? (e.openBlock(),
															  e.createBlock(
																	i,
																	{
																		key: 0,
																		is: c.question.getCellWrapperComponentName(
																			c.cell.cell
																		),
																		componentData:
																			c.question.getCellWrapperComponentData(
																				c.cell.cell
																			),
																	},
																	{
																		default: e.withCtx(() => [
																			e.createVNode(
																				i,
																				{
																					is: d(
																						c.cell
																							.question
																					),
																					question:
																						c.cell
																							.question,
																				},
																				null,
																				8,
																				["is", "question"]
																			),
																		]),
																		_: 1,
																	},
																	8,
																	["is", "componentData"]
															  ))
															: e.createCommentVNode("", !0),
														!c.cell.isChoice &&
														!c.cell.question.isDefaultRendering()
															? (e.openBlock(),
															  e.createBlock(
																	i,
																	{
																		key: 1,
																		is: c.cell.question.getComponentName(),
																		question: c.cell.question,
																	},
																	null,
																	8,
																	["is", "question"]
															  ))
															: e.createCommentVNode("", !0),
														c.cell.isItemChoice
															? (e.openBlock(),
															  e.createBlock(
																	i,
																	{
																		key: 2,
																		is: c.question.getCellWrapperComponentName(
																			c.cell.cell
																		),
																		componentData:
																			c.question.getCellWrapperComponentData(
																				c.cell.cell
																			),
																	},
																	{
																		default: e.withCtx(() => [
																			c.cell.isRadio
																				? (e.openBlock(),
																				  e.createBlock(
																						i,
																						{
																							is: "survey-radiogroup-item",
																							key: c
																								.cell
																								.item
																								.value,
																							question:
																								c
																									.cell
																									.question,
																							item: c
																								.cell
																								.item,
																							hideLabel:
																								!0,
																							ariaLabel:
																								l(),
																						},
																						null,
																						8,
																						[
																							"question",
																							"item",
																							"ariaLabel",
																						]
																				  ))
																				: e.createCommentVNode(
																						"",
																						!0
																				  ),
																			c.cell.isCheckbox
																				? (e.openBlock(),
																				  e.createBlock(
																						i,
																						{
																							is: "survey-checkbox-item",
																							key: c
																								.cell
																								.item
																								.value,
																							question:
																								c
																									.cell
																									.question,
																							item: c
																								.cell
																								.item,
																							hideLabel:
																								!0,
																							ariaLabel:
																								l(),
																						},
																						null,
																						8,
																						[
																							"question",
																							"item",
																							"ariaLabel",
																						]
																				  ))
																				: e.createCommentVNode(
																						"",
																						!0
																				  ),
																		]),
																		_: 1,
																	},
																	8,
																	["is", "componentData"]
															  ))
															: e.createCommentVNode("", !0),
														c.cell.isOtherChoice
															? (e.openBlock(),
															  e.createBlock(
																	i,
																	{
																		key: 3,
																		is: "survey-other-choice",
																		question: c.cell.question,
																		item: c.cell.question
																			.otherItem,
																	},
																	null,
																	8,
																	["question", "item"]
															  ))
															: e.createCommentVNode("", !0),
													],
													2
												)),
												[[e.vShow, t.value]]
										  )
										: e.createCommentVNode("", !0),
									c.cell.hasTitle
										? (e.openBlock(),
										  e.createBlock(
												i,
												{
													key: 6,
													is: c.question.getCellWrapperComponentName(
														c.cell
													),
													componentData:
														c.question.getCellWrapperComponentData(
															c.cell
														),
												},
												{
													default: e.withCtx(() => [
														c.cell.hasTitle
															? (e.openBlock(),
															  e.createBlock(
																	i,
																	{
																		key: 0,
																		is: "survey-string",
																		locString: c.cell.locTitle,
																	},
																	null,
																	8,
																	["locString"]
															  ))
															: e.createCommentVNode("", !0),
														c.cell.requiredMark
															? (e.openBlock(),
															  e.createElementBlock(
																	"span",
																	{
																		key: 1,
																		class: e.normalizeClass(
																			c.question.cssClasses
																				.cellRequiredMark
																		),
																	},
																	e.toDisplayString(
																		c.cell.requiredMark
																	),
																	3
															  ))
															: e.createCommentVNode("", !0),
													]),
													_: 1,
												},
												8,
												["is", "componentData"]
										  ))
										: e.createCommentVNode("", !0),
								],
								46,
								jn
						  ))
						: e.createCommentVNode("", !0);
			},
		}),
		Jn = { key: 0 },
		Xn = ["xlink:href"],
		Yn = { key: 0 },
		_n = ["xlink:href"],
		vn = e.defineComponent({
			inheritAttrs: !1,
			__name: "MatrixDynamic",
			props: { question: {} },
			setup(a) {
				const o = a,
					t = e.ref(null);
				y(o, t);
				const n = () => {
					o.question.addRowUI();
				};
				return (s, l) => (
					e.openBlock(),
					e.createElementBlock(
						"div",
						{ ref_key: "root", ref: t },
						[
							s.question.renderedTable.showAddRowOnTop
								? (e.openBlock(),
								  e.createElementBlock(
										"div",
										{
											key: 0,
											class: e.normalizeClass(s.question.cssClasses.footer),
										},
										[
											e.createElementVNode(
												"button",
												{
													type: "button",
													class: e.normalizeClass(
														s.question.getAddRowButtonCss()
													),
													onClick: n,
												},
												[
													e.createVNode(
														i,
														{
															is: "survey-string",
															locString: s.question.locAddRowText,
														},
														null,
														8,
														["locString"]
													),
													e.createElementVNode(
														"span",
														{
															class: e.normalizeClass(
																s.question.cssClasses.iconAdd
															),
														},
														[
															s.question.cssClasses.iconAddId
																? (e.openBlock(),
																  e.createElementBlock("svg", Jn, [
																		e.createElementVNode(
																			"use",
																			{
																				"xlink:href":
																					s.question
																						.cssClasses
																						.iconAddId,
																			},
																			null,
																			8,
																			Xn
																		),
																  ]))
																: e.createCommentVNode("", !0),
														],
														2
													),
												],
												2
											),
										],
										2
								  ))
								: e.createCommentVNode("", !0),
							s.question.renderedTable.showTable
								? (e.openBlock(),
								  e.createBlock(
										i,
										{ key: 1, is: "survey-matrixtable", question: s.question },
										null,
										8,
										["question"]
								  ))
								: (e.openBlock(),
								  e.createBlock(
										i,
										{
											key: 2,
											is: "survey-placeholder-matrixdynamic",
											question: s.question,
										},
										null,
										8,
										["question"]
								  )),
							s.question.renderedTable.showAddRowOnBottom
								? (e.openBlock(),
								  e.createElementBlock(
										"div",
										{
											key: 3,
											class: e.normalizeClass(s.question.cssClasses.footer),
										},
										[
											e.createElementVNode(
												"button",
												{
													type: "button",
													class: e.normalizeClass(
														s.question.getAddRowButtonCss()
													),
													onClick: n,
												},
												[
													e.createVNode(
														i,
														{
															is: "survey-string",
															locString: s.question.locAddRowText,
														},
														null,
														8,
														["locString"]
													),
													e.createElementVNode(
														"span",
														{
															class: e.normalizeClass(
																s.question.cssClasses.iconAdd
															),
														},
														[
															s.question.cssClasses.iconAddId
																? (e.openBlock(),
																  e.createElementBlock("svg", Yn, [
																		e.createElementVNode(
																			"use",
																			{
																				"xlink:href":
																					s.question
																						.cssClasses
																						.iconAddId,
																			},
																			null,
																			8,
																			_n
																		),
																  ]))
																: e.createCommentVNode("", !0),
														],
														2
													),
												],
												2
											),
										],
										2
								  ))
								: e.createCommentVNode("", !0),
						],
						512
					)
				);
			},
		}),
		xn = e.defineComponent({
			__name: "MatrixDynamicPlaceholder",
			props: { question: {} },
			setup(a) {
				const o = a,
					t = () => {
						o.question.addRowUI();
					};
				return (n, s) => (
					e.openBlock(),
					e.createElementBlock(
						"div",
						{ class: e.normalizeClass(n.question.cssClasses.noRowsSection) },
						[
							e.createElementVNode(
								"div",
								{ class: e.normalizeClass(n.question.cssClasses.noRowsText) },
								[
									e.createVNode(
										i,
										{
											is: "survey-string",
											locString: n.question.locNoRowsText,
										},
										null,
										8,
										["locString"]
									),
								],
								2
							),
							n.question.renderedTable.showAddRow
								? (e.openBlock(),
								  e.createElementBlock(
										"button",
										{
											key: 0,
											type: "button",
											class: e.normalizeClass(
												n.question.getAddRowButtonCss(!0)
											),
											onClick: t,
										},
										[
											e.createVNode(
												i,
												{
													is: "survey-string",
													locString: n.question.locAddRowText,
												},
												null,
												8,
												["locString"]
											),
											e.createElementVNode(
												"span",
												{
													class: e.normalizeClass(
														n.question.cssClasses.iconAdd
													),
												},
												null,
												2
											),
										],
										2
								  ))
								: e.createCommentVNode("", !0),
						],
						2
					)
				);
			},
		});
	function z(a, o = !0) {
		return {
			question: e.computed(() => a.item.data.question),
			row: o ? e.computed(() => a.item.data.row) : void 0,
		};
	}
	const es = ["disabled"],
		os = e.defineComponent({
			__name: "RemoveButton",
			props: { item: {} },
			setup(a) {
				const o = a,
					{ question: t, row: n } = z(o);
				return (s, l) => (
					e.openBlock(),
					e.createElementBlock(
						"button",
						{
							type: "button",
							class: e.normalizeClass(e.unref(t).getRemoveRowButtonCss()),
							disabled: e.unref(t).isInputReadOnly,
							onClick: l[0] || (l[0] = () => e.unref(t).removeRowUI(e.unref(n))),
						},
						[
							e.createVNode(
								i,
								{ is: "survey-string", locString: e.unref(t).locRemoveRowText },
								null,
								8,
								["locString"]
							),
							e.createElementVNode(
								"span",
								{ class: e.normalizeClass(e.unref(t).cssClasses.iconRemove) },
								null,
								2
							),
						],
						10,
						es
					)
				);
			},
		}),
		ns = ["xlink:href"],
		ss = e.defineComponent({
			__name: "DragDropIcon",
			props: { item: {} },
			setup(a) {
				const o = a,
					{ question: t, row: n } = z(o, !0);
				return (s, l) => (
					e.openBlock(),
					e.createElementBlock(
						"div",
						{
							onPointerdown:
								l[0] || (l[0] = (r) => e.unref(t).onPointerDown(r, e.unref(n))),
						},
						[
							e.unref(t).iconDragElement
								? (e.openBlock(),
								  e.createElementBlock(
										"svg",
										{
											key: 0,
											class: e.normalizeClass(
												e.unref(t).cssClasses.dragElementDecorator
											),
										},
										[
											e.createElementVNode(
												"use",
												{ "xlink:href": e.unref(t).iconDragElement },
												null,
												8,
												ns
											),
										],
										2
								  ))
								: (e.openBlock(),
								  e.createElementBlock(
										"span",
										{
											key: 1,
											class: e.normalizeClass(
												e.unref(t).cssClasses.iconDrag
											),
										},
										null,
										2
								  )),
						],
						32
					)
				);
			},
		}),
		ts = ["title", "aria-expanded", "aria-controls"],
		ls = e.defineComponent({
			__name: "DetailButton",
			props: { item: {} },
			setup(a) {
				const o = a,
					{ question: t, row: n } = z(o);
				return (s, l) => (
					e.openBlock(),
					e.createElementBlock(
						"button",
						{
							type: "button",
							class: e.normalizeClass(
								e.unref(t).getDetailPanelButtonCss(e.unref(n))
							),
							onClick: l[0] || (l[0] = () => e.unref(n).showHideDetailPanelClick()),
							title: s.item.title,
							"aria-expanded": e.unref(t).getIsDetailPanelShowing(e.unref(n))
								? "true"
								: "false",
							"aria-controls": e.unref(t).getIsDetailPanelShowing(e.unref(n))
								? e.unref(n).detailPanelId
								: null,
						},
						[
							e.createVNode(
								i,
								{
									is: "sv-svg-icon",
									class: e.normalizeClass(
										e.unref(t).getDetailPanelIconCss(e.unref(n))
									),
									iconName: e.unref(t).getDetailPanelIconId(e.unref(n)),
									size: "auto",
								},
								null,
								8,
								["class", "iconName"]
							),
						],
						10,
						ts
					)
				);
			},
		}),
		rs = ["aria-label"],
		as = e.defineComponent({
			inheritAttrs: !1,
			__name: "PanelDynamic",
			props: { question: {}, css: {} },
			setup(a) {
				const o = a,
					t = e.ref(null);
				y(o, t);
				const n = (l) => {
						const r = o.question.getSurvey();
						if (r) {
							const d = r.getElementWrapperComponentName(l);
							if (d) return d;
						}
						return "panel";
					},
					s = (l) => {
						const r = o.question.getSurvey();
						let d;
						return (
							r && (d = r.getElementWrapperComponentData(l)),
							{
								componentName: "survey-panel",
								componentData: { element: l, data: d },
							}
						);
					};
				return (l, r) => (
					e.openBlock(),
					e.createElementBlock(
						"div",
						{
							class: e.normalizeClass(l.question.cssClasses.root),
							ref_key: "root",
							ref: t,
						},
						[
							l.question.hasTabbedMenu
								? (e.openBlock(),
								  e.createElementBlock(
										"div",
										{
											key: 0,
											class: e.normalizeClass(
												l.question.getTabsContainerCss()
											),
										},
										[
											e.createVNode(
												i,
												{
													is: "sv-action-bar",
													model: l.question.tabbedMenu,
												},
												null,
												8,
												["model"]
											),
										],
										2
								  ))
								: e.createCommentVNode("", !0),
							l.question.getShowNoEntriesPlaceholder()
								? (e.openBlock(),
								  e.createBlock(
										i,
										{
											key: 1,
											is: "survey-placeholder-paneldynamic",
											question: l.question,
										},
										null,
										8,
										["question"]
								  ))
								: e.createCommentVNode("", !0),
							l.question.isProgressTopShowing && l.question.isRangeShowing
								? (e.openBlock(),
								  e.createElementBlock(
										"div",
										{
											key: 2,
											class: e.normalizeClass(
												l.question.cssClasses.progress
											),
										},
										[
											e.createElementVNode(
												"div",
												{
													class: e.normalizeClass(
														l.question.cssClasses.progressBar
													),
													style: e.normalizeStyle({
														width: l.question.progress,
													}),
													role: "progressbar",
													"aria-label": l.question.progressBarAriaLabel,
												},
												null,
												14,
												rs
											),
										],
										2
								  ))
								: e.createCommentVNode("", !0),
							e.createElementVNode(
								"div",
								{ class: e.normalizeClass(l.question.cssClasses.panelsContainer) },
								[
									(e.openBlock(!0),
									e.createElementBlock(
										e.Fragment,
										null,
										e.renderList(
											l.question.renderedPanels,
											(d, m) => (
												e.openBlock(),
												e.createElementBlock(
													e.Fragment,
													{ key: d.id },
													[
														e.createElementVNode(
															"div",
															{
																class: e.normalizeClass(
																	l.question.getPanelWrapperCss(
																		d
																	)
																),
															},
															[
																e.createVNode(
																	i,
																	e.mergeProps(
																		{ is: n(d) },
																		s(d)
																	),
																	null,
																	16,
																	["is"]
																),
																l.question.canRenderRemovePanelOnRight(
																	d
																)
																	? (e.openBlock(),
																	  e.createBlock(
																			i,
																			{
																				key: 0,
																				is: "sv-paneldynamic-remove-btn",
																				data: {
																					question:
																						l.question,
																					panel: d,
																				},
																			},
																			null,
																			8,
																			["data"]
																	  ))
																	: e.createCommentVNode("", !0),
															],
															2
														),
														l.question.isRenderModeList &&
														m < l.question.visiblePanelCount - 1
															? (e.openBlock(),
															  e.createElementBlock(
																	"hr",
																	{
																		class: e.normalizeClass(
																			l.question.cssClasses
																				.separator
																		),
																		key: "separator" + d.id,
																	},
																	null,
																	2
															  ))
															: e.createCommentVNode("", !0),
													],
													64
												)
											)
										),
										128
									)),
								],
								2
							),
							l.question.showNavigation
								? (e.openBlock(),
								  e.createBlock(
										i,
										{
											key: 3,
											is: "survey-paneldynamicprogress-v2",
											question: l.question,
										},
										null,
										8,
										["question"]
								  ))
								: e.createCommentVNode("", !0),
						],
						2
					)
				);
			},
		}),
		is = ["aria-label"],
		ds = e.defineComponent({
			__name: "PanelDynamicProgress",
			props: { question: {} },
			setup(a) {
				const o = a,
					t = () =>
						o.question.isProgressTopShowing
							? o.question.cssClasses.progressTop
							: o.question.cssClasses.progressBottom;
				return (n, s) => (
					e.openBlock(),
					e.createElementBlock(
						"div",
						{ class: e.normalizeClass(t()) },
						[
							e.createElementVNode(
								"div",
								{ style: { clear: "both" }, class: e.normalizeClass(t()) },
								[
									e.createElementVNode(
										"div",
										{
											class: e.normalizeClass(
												n.question.cssClasses.progressContainer
											),
										},
										[
											e.createVNode(
												i,
												{
													is: "sv-paneldynamic-prev-btn",
													data: { question: n.question },
												},
												null,
												8,
												["data"]
											),
											n.question.isRangeShowing
												? (e.openBlock(),
												  e.createElementBlock(
														"div",
														{
															key: 0,
															class: e.normalizeClass(
																n.question.cssClasses.progress
															),
														},
														[
															e.createElementVNode(
																"div",
																{
																	class: e.normalizeClass(
																		n.question.cssClasses
																			.progressBar
																	),
																	style: e.normalizeStyle({
																		width: n.question.progress,
																	}),
																	role: "progressbar",
																	"aria-label":
																		n.question
																			.progressBarAriaLabel,
																},
																null,
																14,
																is
															),
														],
														2
												  ))
												: e.createCommentVNode("", !0),
											e.createVNode(
												i,
												{
													is: "sv-paneldynamic-next-btn",
													data: { question: n.question },
												},
												null,
												8,
												["data"]
											),
										],
										2
									),
									e.createVNode(
										i,
										{
											is: "sv-paneldynamic-add-btn",
											data: { question: n.question },
										},
										null,
										8,
										["data"]
									),
									e.createVNode(
										i,
										{
											is: "sv-paneldynamic-progress-text",
											data: { question: n.question },
										},
										null,
										8,
										["data"]
									),
								],
								2
							),
						],
						2
					)
				);
			},
		}),
		ms = ["aria-label"],
		cs = e.defineComponent({
			__name: "PanelDynamicProgressV2",
			props: { question: {} },
			setup(a) {
				return (o, t) =>
					o.question.cssClasses.footer
						? (e.openBlock(),
						  e.createElementBlock(
								"div",
								{ key: 0, class: e.normalizeClass(o.question.cssClasses.footer) },
								[
									e.createElementVNode(
										"hr",
										{
											class: e.normalizeClass(
												o.question.cssClasses.separator
											),
										},
										null,
										2
									),
									o.question.isRangeShowing && o.question.isProgressBottomShowing
										? (e.openBlock(),
										  e.createElementBlock(
												"div",
												{
													key: 0,
													class: e.normalizeClass(
														o.question.cssClasses.progress
													),
												},
												[
													e.createElementVNode(
														"div",
														{
															class: e.normalizeClass(
																o.question.cssClasses.progressBar
															),
															style: e.normalizeStyle({
																width: o.question.progress,
															}),
															role: "progressbar",
															"aria-label":
																o.question.progressBarAriaLabel,
														},
														null,
														14,
														ms
													),
												],
												2
										  ))
										: e.createCommentVNode("", !0),
									o.question.showFooterToolbar
										? (e.openBlock(),
										  e.createElementBlock(
												"div",
												{
													key: 1,
													class: e.normalizeClass(
														o.question.cssClasses
															.footerButtonsContainer
													),
												},
												[
													e.createVNode(
														i,
														{
															is: "sv-action-bar",
															model: o.question.footerToolbar,
														},
														null,
														8,
														["model"]
													),
												],
												2
										  ))
										: e.createCommentVNode("", !0),
								],
								2
						  ))
						: e.createCommentVNode("", !0);
			},
		}),
		ps = e.defineComponent({
			__name: "PanelDynamicPlaceholder",
			props: { question: {} },
			setup(a) {
				return (o, t) => (
					e.openBlock(),
					e.createElementBlock(
						"div",
						{ class: e.normalizeClass(o.question.cssClasses.noEntriesPlaceholder) },
						[
							e.createElementVNode("span", null, [
								e.createVNode(
									i,
									{
										is: "survey-string",
										locString: o.question.locNoEntriesText,
									},
									null,
									8,
									["locString"]
								),
							]),
							e.createVNode(
								i,
								{ is: "sv-paneldynamic-add-btn", data: { question: o.question } },
								null,
								8,
								["data"]
							),
						],
						2
					)
				);
			},
		});
	function V(a) {
		return e.computed(() => (a.item && a.item.data.question) || a.data.question);
	}
	const Cs = ["id"],
		gs = e.defineComponent({
			__name: "PaneldynamicAddBtn",
			props: { item: {}, data: {} },
			setup(a) {
				const t = V(a),
					n = () => {
						t.value.addPanelUI();
					};
				return (s, l) =>
					e.unref(t).canAddPanel
						? (e.openBlock(),
						  e.createElementBlock(
								"button",
								{
									key: 0,
									type: "button",
									id: e.unref(t).addButtonId,
									class: e.normalizeClass(e.unref(t).getAddButtonCss()),
									onClick: n,
								},
								[
									e.createElementVNode(
										"span",
										{
											class: e.normalizeClass(
												e.unref(t).cssClasses.buttonAddText
											),
										},
										[
											e.createVNode(
												i,
												{
													is: "survey-string",
													locString: e.unref(t).locAddPanelText,
												},
												null,
												8,
												["locString"]
											),
										],
										2
									),
								],
								10,
								Cs
						  ))
						: e.createCommentVNode("", !0);
			},
		}),
		us = ["title"],
		ks = e.defineComponent({
			__name: "PaneldynamicNextBtn",
			props: { item: {}, data: {} },
			setup(a) {
				const t = V(a),
					n = () => {
						t.value.goToNextPanel();
					};
				return (s, l) => (
					e.openBlock(),
					e.createElementBlock(
						"div",
						{
							title: e.unref(t).panelNextText,
							onClick: n,
							class: e.normalizeClass(e.unref(t).getNextButtonCss()),
						},
						[
							e.createVNode(
								i,
								{
									is: "sv-svg-icon",
									iconName: e.unref(t).cssClasses.progressBtnIcon,
									size: "auto",
								},
								null,
								8,
								["iconName"]
							),
						],
						10,
						us
					)
				);
			},
		}),
		ys = ["title"],
		hs = e.defineComponent({
			__name: "PaneldynamicPrevBtn",
			props: { item: {}, data: {} },
			setup(a) {
				const t = V(a),
					n = () => {
						t.value.goToPrevPanel();
					};
				return (s, l) => (
					e.openBlock(),
					e.createElementBlock(
						"div",
						{
							title: e.unref(t).panelPrevText,
							onClick: n,
							class: e.normalizeClass(e.unref(t).getPrevButtonCss()),
						},
						[
							e.createVNode(
								i,
								{
									is: "sv-svg-icon",
									iconName: e.unref(t).cssClasses.progressBtnIcon,
									size: "auto",
								},
								null,
								8,
								["iconName"]
							),
						],
						10,
						ys
					)
				);
			},
		}),
		Bs = ["id"],
		qs = e.defineComponent({
			__name: "PaneldynamicRemoveBtn",
			props: { item: {}, data: {} },
			setup(a) {
				const o = a,
					t = V(o),
					n = e.computed(() => (o.item && o.item.data.panel) || o.data.panel),
					s = (r) => t.value.getPanelRemoveButtonId(r),
					l = (r) => {
						t.value.isInputReadOnly || t.value.removePanelUI(r);
					};
				return (r, d) => (
					e.openBlock(),
					e.createElementBlock(
						"button",
						{
							type: "button",
							id: s(n.value),
							class: e.normalizeClass(e.unref(t).getPanelRemoveButtonCss()),
							onClick: d[0] || (d[0] = (m) => l(n.value)),
						},
						[
							e.createElementVNode(
								"span",
								{
									class: e.normalizeClass(
										e.unref(t).cssClasses.buttonRemoveText
									),
								},
								[
									e.createVNode(
										i,
										{
											is: "survey-string",
											locString: e.unref(t).locRemovePanelText,
										},
										null,
										8,
										["locString"]
									),
								],
								2
							),
							e.createElementVNode(
								"span",
								{ class: e.normalizeClass(e.unref(t).cssClasses.iconRemove) },
								null,
								2
							),
						],
						10,
						Bs
					)
				);
			},
		}),
		ws = e.defineComponent({
			__name: "PaneldynamicProgressText",
			props: { item: {}, data: {} },
			setup(a) {
				const t = V(a);
				return (n, s) => (
					e.openBlock(),
					e.createElementBlock(
						"div",
						{ class: e.normalizeClass(e.unref(t).cssClasses.progressText) },
						e.toDisplayString(e.unref(t).progressText),
						3
					)
				);
			},
		}),
		fs = ["id"],
		Vs = e.defineComponent({
			__name: "Errors",
			props: { element: {}, location: {} },
			setup(a) {
				const o = e.ref();
				return (t, n) =>
					t.element.hasVisibleErrors
						? (e.openBlock(),
						  e.createElementBlock(
								"div",
								{
									key: 0,
									class: e.normalizeClass(t.element.cssError),
									id: t.element.id + "_errors",
									ref_key: "root",
									ref: o,
								},
								[
									(e.openBlock(!0),
									e.createElementBlock(
										e.Fragment,
										null,
										e.renderList(
											t.element.renderedErrors,
											(s, l) => (
												e.openBlock(),
												e.createBlock(
													i,
													{
														is: t.element.survey
															.questionErrorComponent,
														element: t.element,
														key: l,
														error: s,
														cssClasses: t.element.cssClasses,
													},
													null,
													8,
													["is", "element", "error", "cssClasses"]
												)
											)
										),
										128
									)),
								],
								10,
								fs
						  ))
						: e.createCommentVNode("", !0);
			},
		}),
		bs = { key: 0 },
		Ls = e.defineComponent({
			__name: "QuestionComment",
			props: { question: {} },
			setup(a) {
				return (o, t) =>
					o.question.isReadOnlyRenderDiv()
						? (e.openBlock(),
						  e.createElementBlock(
								"div",
								bs,
								e.toDisplayString(o.question.comment),
								1
						  ))
						: (e.openBlock(),
						  e.createBlock(
								i,
								{
									key: 1,
									is: "sv-text-area",
									model: o.question.commentTextAreaModel,
								},
								null,
								8,
								["model"]
						  ));
			},
		}),
		Ns = e.defineComponent({
			__name: "TitleElement",
			props: { element: {}, renderActions: {}, css: {} },
			setup(a) {
				const o = a,
					t = e.computed(() => o.element.hasTitleActions && o.renderActions !== !1),
					n = (s) => {
						k.doKey2ClickUp(s);
					};
				return (s, l) =>
					s.element.hasTitle
						? (e.openBlock(),
						  e.createBlock(
								e.resolveDynamicComponent(s.element.titleTagName),
								{
									key: 0,
									class: e.normalizeClass(s.element.cssTitle),
									"aria-label": s.element.titleAriaLabel,
									id: s.element.ariaTitleId,
									tabindex: s.element.titleTabIndex,
									"aria-expanded": s.element.titleAriaExpanded,
									role: s.element.titleAriaRole,
									onKeyup:
										l[0] ||
										(l[0] = (r) => {
											n(r);
										}),
								},
								{
									default: e.withCtx(() => [
										!s.element.isExpanded &&
										s.element.getCssTitleExpandableSvg()
											? (e.openBlock(),
											  e.createBlock(
													i,
													{
														key: 0,
														is: "sv-svg-icon",
														class: e.normalizeClass(
															s.element.getCssTitleExpandableSvg()
														),
														iconName: "icon-expand-16x16",
														size: "'auto'",
													},
													null,
													8,
													["class"]
											  ))
											: e.createCommentVNode("", !0),
										s.element.isExpanded &&
										s.element.getCssTitleExpandableSvg()
											? (e.openBlock(),
											  e.createBlock(
													i,
													{
														key: 1,
														is: "sv-svg-icon",
														class: e.normalizeClass(
															s.element.getCssTitleExpandableSvg()
														),
														iconName: "icon-collapse-16x16",
														size: "'auto'",
													},
													null,
													8,
													["class"]
											  ))
											: e.createCommentVNode("", !0),
										s.element.hasTitleActions
											? e.createCommentVNode("", !0)
											: (e.openBlock(),
											  e.createBlock(
													i,
													{
														key: 2,
														is: "survey-element-title-content",
														element: s.element,
														css: s.css,
													},
													null,
													8,
													["element", "css"]
											  )),
										t.value
											? (e.openBlock(),
											  e.createBlock(
													i,
													{
														key: 3,
														is: "sv-title-actions",
														element: s.element,
														css: s.css,
													},
													null,
													8,
													["element", "css"]
											  ))
											: e.createCommentVNode("", !0),
									]),
									_: 1,
								},
								40,
								["class", "aria-label", "id", "tabindex", "aria-expanded", "role"]
						  ))
						: e.createCommentVNode("", !0);
			},
		}),
		Es = { key: 2 },
		Ms = { key: 4 },
		Ss = { key: 6 },
		zs = { key: 8 },
		Hs = e.defineComponent({
			inheritAttrs: !1,
			__name: "TitleContent",
			props: { element: {}, css: {} },
			setup(a) {
				return (o, t) => (
					e.openBlock(),
					e.createElementBlock(
						e.Fragment,
						null,
						[
							o.element.isTitleRenderedAsString
								? (e.openBlock(),
								  e.createBlock(
										i,
										{
											key: 0,
											is: "survey-string",
											locString: o.element.locRenderedTitle,
										},
										null,
										8,
										["locString"]
								  ))
								: e.createCommentVNode("", !0),
							!o.element.isTitleRenderedAsString && o.element.isRequireTextOnStart
								? (e.openBlock(),
								  e.createElementBlock(
										"span",
										{
											key: 1,
											class: e.normalizeClass(o.element.cssRequiredMark),
											"aria-hidden": !0,
										},
										e.toDisplayString(o.element.requiredMark),
										3
								  ))
								: e.createCommentVNode("", !0),
							!o.element.isTitleRenderedAsString && o.element.isRequireTextOnStart
								? (e.openBlock(), e.createElementBlock("span", Es, " "))
								: e.createCommentVNode("", !0),
							!o.element.isTitleRenderedAsString && o.element.no
								? (e.openBlock(),
								  e.createElementBlock(
										"span",
										{
											key: 3,
											style: { position: "static" },
											class: e.normalizeClass(o.element.cssTitleNumber),
											"aria-hidden": !0,
										},
										e.toDisplayString(o.element.no),
										3
								  ))
								: e.createCommentVNode("", !0),
							!o.element.isTitleRenderedAsString && o.element.no
								? (e.openBlock(), e.createElementBlock("span", Ms, " "))
								: e.createCommentVNode("", !0),
							!o.element.isTitleRenderedAsString &&
							o.element.isRequireTextBeforeTitle
								? (e.openBlock(),
								  e.createElementBlock(
										"span",
										{
											key: 5,
											class: e.normalizeClass(o.element.cssRequiredMark),
											"aria-hidden": !0,
										},
										e.toDisplayString(o.element.requiredMark),
										3
								  ))
								: e.createCommentVNode("", !0),
							!o.element.isTitleRenderedAsString &&
							o.element.isRequireTextBeforeTitle
								? (e.openBlock(), e.createElementBlock("span", Ss, " "))
								: e.createCommentVNode("", !0),
							o.element.isTitleRenderedAsString
								? e.createCommentVNode("", !0)
								: (e.openBlock(),
								  e.createBlock(
										i,
										{
											key: 7,
											is: "survey-string",
											locString: o.element.locRenderedTitle,
										},
										null,
										8,
										["locString"]
								  )),
							!o.element.isTitleRenderedAsString && o.element.isRequireTextAfterTitle
								? (e.openBlock(), e.createElementBlock("span", zs, " "))
								: e.createCommentVNode("", !0),
							!o.element.isTitleRenderedAsString && o.element.isRequireTextAfterTitle
								? (e.openBlock(),
								  e.createElementBlock(
										"span",
										{
											key: 9,
											class: e.normalizeClass(o.element.cssRequiredMark),
											"aria-hidden": !0,
										},
										e.toDisplayString(o.element.requiredMark),
										3
								  ))
								: e.createCommentVNode("", !0),
						],
						64
					)
				);
			},
		}),
		Is = { class: "sv-title-actions" },
		Rs = { class: "sv-title-actions__title" },
		Ts = e.defineComponent({
			__name: "TitleActions",
			props: { element: {}, css: {} },
			setup(a) {
				const o = a,
					t = e.computed(() => o.element.getTitleToolbar());
				return (n, s) => (
					e.openBlock(),
					e.createElementBlock("div", Is, [
						e.createElementVNode("span", Rs, [
							n.element.isPage
								? (e.openBlock(),
								  e.createBlock(
										i,
										{
											key: 0,
											is: "survey-string",
											locString: n.element.locTitle,
										},
										null,
										8,
										["locString"]
								  ))
								: e.createCommentVNode("", !0),
							n.element.isPage
								? e.createCommentVNode("", !0)
								: (e.openBlock(),
								  e.createBlock(
										i,
										{
											key: 1,
											is: "survey-element-title-content",
											element: n.element,
											css: n.css,
										},
										null,
										8,
										["element", "css"]
								  )),
						]),
						e.createVNode(i, { is: "sv-action-bar", model: t.value }, null, 8, [
							"model",
						]),
					])
				);
			},
		}),
		$s = (a, o) => {
			const t = a.__vccOpts || a;
			for (const [n, s] of o) t[n] = s;
			return t;
		},
		Ds = {},
		Zs = { class: "sv-brand-info" },
		As = [
			e.createStaticVNode(
				'<a class="sv-brand-info__logo" href="https://surveyjs.io/?utm_source=built-in_links&amp;utm_medium=online_survey_tool&amp;utm_campaign=landing_page"><img src="https://surveyjs.io/Content/Images/poweredby.svg"></a><div class="sv-brand-info__text"> Try and see how easy it is to <a href="https://surveyjs.io/create-survey?utm_source=built-in_links&amp;utm_medium=online_survey_tool&amp;utm_campaign=create_survey">create a survey</a></div><div class="sv-brand-info__terms"><a href="https://surveyjs.io/TermsOfUse">Terms of Use &amp; Privacy Statement</a></div>',
				3
			),
		];
	function Ps(a, o) {
		return e.openBlock(), e.createElementBlock("div", Zs, As);
	}
	const Fs = $s(Ds, [["render", Ps]]),
		Ws = [e.createElementVNode("use", null, null, -1)],
		Os = e.defineComponent({
			__name: "SvgIcon",
			props: { size: {}, width: {}, height: {}, iconName: {}, title: {} },
			setup(a) {
				const o = a,
					t = e.ref(),
					n = () => {
						k.createSvg(o.size, o.width, o.height, o.iconName, t.value, o.title);
					};
				return (
					e.onUpdated(() => {
						n();
					}),
					e.onMounted(() => {
						n();
					}),
					(s, l) => (
						e.openBlock(),
						e.createElementBlock(
							"svg",
							{
								ref_key: "svgIconElement",
								ref: t,
								class: "sv-svg-icon",
								role: "presentation",
							},
							Ws,
							512
						)
					)
				);
			},
		}),
		Us = e.defineComponent({
			__name: "QuestionError",
			props: { error: {}, cssClasses: {}, element: {} },
			setup(a) {
				return (o, t) => (
					e.openBlock(),
					e.createElementBlock("div", null, [
						e.createElementVNode(
							"span",
							{
								class: e.normalizeClass(
									o.cssClasses
										? o.cssClasses.error.icon || void 0
										: "panel-error-icon"
								),
								"aria-hidden": "true",
							},
							null,
							2
						),
						e.createElementVNode(
							"span",
							{
								class: e.normalizeClass(
									o.cssClasses
										? o.cssClasses.error.item || void 0
										: "panel-error-item"
								),
							},
							[
								e.createVNode(
									i,
									{ is: "survey-string", locString: o.error.locText },
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
		Qs = e.defineComponent({
			__name: "ActionBar",
			props: { model: {}, container: {}, handleClick: { type: Boolean, default: !0 } },
			setup(a) {
				const o = a,
					t = e.ref(null),
					n = (l) => {
						o.handleClick && l.stopPropagation();
					};
				g(
					() => o.model,
					void 0,
					(l) => {
						l.resetResponsivityManager();
					}
				);
				function s() {
					o.model.hasVisibleActions && o.model.initResponsivityManager(t.value);
				}
				return (
					e.onUpdated(() => {
						s();
					}),
					e.onMounted(() => {
						s();
					}),
					(l, r) =>
						l.model.hasActions
							? (e.openBlock(),
							  e.createElementBlock(
									"div",
									{
										key: 0,
										ref_key: "root",
										ref: t,
										style: e.normalizeStyle(l.model.getRootStyle()),
										class: e.normalizeClass(l.model.getRootCss()),
										onClick: n,
									},
									[
										(e.openBlock(!0),
										e.createElementBlock(
											e.Fragment,
											null,
											e.renderList(
												l.model.renderedActions,
												(d) => (
													e.openBlock(),
													e.createBlock(
														i,
														{
															is: "sv-action",
															key: d.renderedId,
															item: d,
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
									6
							  ))
							: e.createCommentVNode("", !0)
				);
			},
		}),
		Ks = ["id"],
		js = { class: "sv-action__content" },
		Gs = e.defineComponent({
			__name: "Action",
			props: { item: {} },
			setup(a) {
				const o = e.ref(),
					t = a,
					n = e.computed(() => t.item.component || "sv-action-bar-item");
				return (
					g(() => t.item),
					e.onMounted(() => {
						const s = t.item;
						(s.updateModeCallback = (l, r) => {
							(s.mode = l),
								e.nextTick(() => {
									r(l, o.value);
								});
						}),
							s.afterRender();
					}),
					e.onUnmounted(() => {
						const s = t.item;
						s.updateModeCallback = void 0;
					}),
					(s, l) => (
						e.openBlock(),
						e.createElementBlock(
							"div",
							{
								class: e.normalizeClass(s.item.getActionRootCss()),
								id: "" + s.item.uniqueId,
								ref_key: "root",
								ref: o,
							},
							[
								e.createElementVNode("div", js, [
									s.item.needSeparator
										? (e.openBlock(),
										  e.createBlock(i, {
												key: 0,
												is: "sv-action-bar-separator",
										  }))
										: e.createCommentVNode("", !0),
									e.createVNode(i, { is: n.value, item: s.item }, null, 8, [
										"is",
										"item",
									]),
								]),
							],
							10,
							Ks
						)
					)
				);
			},
		}),
		f = {
			mounted: function (a, o) {
				const t = Object.assign({ processEsc: !0 }, { ...o.value });
				if (
					(a.addEventListener("pointerup", (n) => {
						if (n.pointerType === "pen") {
							n.preventDefault(), n.stopPropagation();
							const s = n.target;
							s != null && s.click && s.click();
						}
					}),
					t.disableTabStop)
				) {
					a.tabIndex = -1;
					return;
				}
				t.disableTabStop || (a.tabIndex = 0),
					a.addEventListener("keyup", (n) => {
						n.preventDefault(), n.stopPropagation(), k.doKey2ClickUp(n, t);
					}),
					a.addEventListener("keydown", (n) => {
						k.doKey2ClickDown(n, t);
					}),
					a.addEventListener("blur", (n) => {
						k.doKey2ClickBlur(n);
					});
			},
		},
		Js = ["disabled", "title", "aria-checked", "aria-expanded", "role"],
		Xs = { inheritAttrs: !1 },
		Ys = e.defineComponent({
			...Xs,
			__name: "ActionBarItem",
			props: { item: {} },
			setup(a) {
				const o = a;
				return (
					g(() => o.item),
					(t, n) =>
						e.withDirectives(
							(e.openBlock(),
							e.createElementBlock(
								"button",
								{
									class: e.normalizeClass(t.item.getActionBarItemCss()),
									type: "button",
									onClick:
										n[0] ||
										(n[0] = (s) => {
											t.item.doAction(s);
										}),
									onKeyup:
										n[1] ||
										(n[1] = (s) => {
											s.stopPropagation();
										}),
									onMousedown:
										n[2] ||
										(n[2] = (s) => {
											t.item.doMouseDown(s);
										}),
									onFocus:
										n[3] ||
										(n[3] = (s) => {
											t.item.doFocus(s);
										}),
									disabled: t.item.disabled,
									title: t.item.tooltip || t.item.title,
									"aria-checked": t.item.ariaChecked,
									"aria-expanded": t.item.ariaExpanded,
									role: t.item.ariaRole,
								},
								[
									t.item.iconName
										? (e.openBlock(),
										  e.createBlock(
												i,
												{
													key: 0,
													is: "sv-svg-icon",
													class: e.normalizeClass(
														t.item.cssClasses.itemIcon
													),
													iconName: t.item.iconName,
													size: t.item.iconSize,
													title: t.item.tooltip || t.item.title,
												},
												null,
												8,
												["class", "iconName", "size", "title"]
										  ))
										: e.createCommentVNode("", !0),
									t.item.hasTitle
										? (e.openBlock(),
										  e.createBlock(
												S,
												{
													key: 1,
													locString: t.item.locTitle,
													textClass: t.item.getActionBarItemTitleCss(),
												},
												null,
												8,
												["locString", "textClass"]
										  ))
										: e.createCommentVNode("", !0),
								],
								42,
								Js
							)),
							[
								[
									e.unref(f),
									{ processEsc: !1, disableTabStop: t.item.disableTabStop },
								],
							]
						)
				);
			},
		}),
		_s = ["disabled", "title", "role"],
		vs = { inheritAttrs: !1 },
		xs = e.defineComponent({
			...vs,
			__name: "ActionBarItemDropdown",
			props: { item: {} },
			setup(a) {
				const o = a;
				let t;
				return (
					g(
						() => o.item,
						(n) => {
							t = new k.ActionDropdownViewModel(n);
						},
						() => {
							t.dispose();
						}
					),
					(n, s) => (
						e.openBlock(),
						e.createElementBlock(
							e.Fragment,
							null,
							[
								e.withDirectives(
									(e.openBlock(),
									e.createElementBlock(
										"button",
										{
											type: "button",
											class: e.normalizeClass(n.item.getActionBarItemCss()),
											onClick:
												s[0] ||
												(s[0] = (l) => {
													n.item.action(n.item, !!l.pointerType);
												}),
											onKeyup:
												s[1] ||
												(s[1] = (l) => {
													l.stopPropagation();
												}),
											disabled: n.item.disabled,
											title: n.item.tooltip || n.item.title,
											role: n.item.ariaRole,
										},
										[
											n.item.iconName
												? (e.openBlock(),
												  e.createBlock(
														i,
														{
															key: 0,
															is: "sv-svg-icon",
															class: e.normalizeClass(
																n.item.cssClasses.itemIcon
															),
															iconName: n.item.iconName,
															size: n.item.iconSize,
															title: n.item.tooltip || n.item.title,
														},
														null,
														8,
														["class", "iconName", "size", "title"]
												  ))
												: e.createCommentVNode("", !0),
											n.item.hasTitle
												? (e.openBlock(),
												  e.createBlock(
														S,
														{
															key: 1,
															locString: n.item.locTitle,
															textClass:
																n.item.getActionBarItemTitleCss(),
														},
														null,
														8,
														["locString", "textClass"]
												  ))
												: e.createCommentVNode("", !0),
										],
										42,
										_s
									)),
									[
										[
											e.unref(f),
											{
												processEsc: !1,
												disableTabStop: n.item.disableTabStop,
											},
										],
									]
								),
								e.createVNode(
									i,
									{ is: "sv-popup", model: n.item.popupModel },
									null,
									8,
									["model"]
								),
							],
							64
						)
					)
				);
			},
		}),
		et = e.defineComponent({
			__name: "ActionBarSeparator",
			props: { item: {} },
			setup(a) {
				const o = a,
					t = e.computed(() => o.item && o.item.innerCss);
				return (n, s) => (
					e.openBlock(),
					e.createElementBlock(
						"div",
						{ class: e.normalizeClass(["sv-action-bar-separator", t.value]) },
						null,
						2
					)
				);
			},
		}),
		ot = ["aria-label", "placeholder", "value"],
		nt = ["aria-label"],
		st = ["role", "aria-label", "id"],
		tt = e.defineComponent({
			__name: "List",
			props: { model: {} },
			setup(a) {
				const o = a,
					t = e.ref(null),
					n = (r) => {
						const d = o.model;
						d.filterString = r.target.value;
					},
					s = (r) => {
						const d = o.model;
						(d.filterString = r.target.value), o.model.goToItems(r);
					},
					l = (r) => {
						o.model.onMouseMove(r);
					};
				return (
					g(() => o.model),
					e.onMounted(() => {
						o.model.initListContainerHtmlElement(t.value);
					}),
					e.onUnmounted(() => {
						o.model &&
							(o.model.removeScrollEventListener(),
							o.model.initListContainerHtmlElement(void 0));
					}),
					(r, d) => (
						e.openBlock(),
						e.createElementBlock(
							"div",
							{
								class: e.normalizeClass(r.model.cssClasses.root),
								ref_key: "listContainerElement",
								ref: t,
							},
							[
								r.model.showFilter
									? (e.openBlock(),
									  e.createElementBlock(
											"div",
											{
												key: 0,
												class: e.normalizeClass(r.model.cssClasses.filter),
											},
											[
												e.createElementVNode(
													"div",
													{
														class: e.normalizeClass(
															r.model.cssClasses.filterIcon
														),
													},
													[
														e.createVNode(i, {
															is: "sv-svg-icon",
															iconName: "icon-search",
															size: "auto",
														}),
													],
													2
												),
												e.createElementVNode(
													"input",
													{
														type: "text",
														class: e.normalizeClass(
															r.model.cssClasses.filterInput
														),
														"aria-label":
															r.model.filterStringPlaceholder,
														placeholder:
															r.model.filterStringPlaceholder,
														value: r.model.filterString,
														onChange: n,
														onKeyup: s,
													},
													null,
													42,
													ot
												),
												r.model.showSearchClearButton &&
												r.model.filterString
													? (e.openBlock(),
													  e.createElementBlock(
															"button",
															{
																key: 0,
																onClick:
																	d[0] ||
																	(d[0] = (m) => {
																		r.model.onClickSearchClearButton(
																			m
																		);
																	}),
																class: e.normalizeClass(
																	r.model.cssClasses
																		.searchClearButtonIcon
																),
															},
															[
																e.createVNode(i, {
																	is: "sv-svg-icon",
																	iconName: "icon-searchclear",
																	size: "auto",
																}),
															],
															2
													  ))
													: e.createCommentVNode("", !0),
											],
											2
									  ))
									: e.createCommentVNode("", !0),
								e.withDirectives(
									e.createElementVNode(
										"div",
										{
											class: e.normalizeClass(
												r.model.cssClasses.emptyContainer
											),
										},
										[
											e.createElementVNode(
												"div",
												{
													class: e.normalizeClass(
														r.model.cssClasses.emptyText
													),
													"aria-label": r.model.emptyMessage,
												},
												e.toDisplayString(r.model.emptyMessage),
												11,
												nt
											),
										],
										2
									),
									[[e.vShow, r.model.isEmpty]]
								),
								r.model.renderElements
									? e.withDirectives(
											(e.openBlock(),
											e.createElementBlock(
												"ul",
												{
													key: 1,
													class: e.normalizeClass(
														r.model.getListClass()
													),
													role: r.model.listRole,
													"aria-label": r.model.a11ya11y_input_ariaLabel,
													id: r.model.elementId,
													onMousedown:
														d[1] ||
														(d[1] = (m) => {
															m.preventDefault();
														}),
													onMousemove: l,
													onKeydown:
														d[2] ||
														(d[2] = (m) => {
															r.model.onKeyDown(m);
														}),
												},
												[
													(e.openBlock(!0),
													e.createElementBlock(
														e.Fragment,
														null,
														e.renderList(
															r.model.renderedActions,
															(m) => (
																e.openBlock(),
																e.createBlock(
																	i,
																	{
																		is: "sv-list-item",
																		item: m,
																		model: r.model,
																		key: m.id,
																	},
																	null,
																	8,
																	["item", "model"]
																)
															)
														),
														128
													)),
												],
												42,
												st
											)),
											[[e.vShow, !r.model.isEmpty]]
									  )
									: e.createCommentVNode("", !0),
							],
							2
						)
					)
				);
			},
		}),
		lt = ["role", "aria-selected", "aria-checked", "id", "tabindex"],
		rt = ["title"],
		at = e.defineComponent({
			__name: "ListItem",
			props: { model: {}, item: {} },
			setup(a) {
				const o = a,
					t = e.ref(null),
					n = e.computed(() => o.item.elementId),
					s = (r) => {
						o.model.onItemClick(o.item), r.stopPropagation();
					};
				g(() => o.item);
				const l = e.computed(() => o.item.component || o.model.itemComponent);
				return (
					e.onMounted(() => {
						setTimeout(() => {
							o.model.onItemRended(o.item, t.value);
						});
					}),
					(r, d) =>
						e.withDirectives(
							(e.openBlock(),
							e.createElementBlock(
								"li",
								{
									role: r.model.listItemRole,
									"aria-selected": r.model.getA11yItemAriaSelected(r.item),
									"aria-checked": r.model.getA11yItemAriaChecked(r.item),
									key: r.item.id,
									id: n.value,
									ref_key: "elementRef",
									ref: t,
									onPointerdown:
										d[2] || (d[2] = (m) => r.model.onPointerDown(m, r.item)),
									class: e.normalizeClass(r.model.getItemClass(r.item)),
									onClick: s,
									tabindex: r.item.disableTabStop ? -1 : 0,
								},
								[
									r.item.needSeparator
										? (e.openBlock(),
										  e.createElementBlock(
												"div",
												{
													key: 0,
													class: e.normalizeClass(
														r.model.cssClasses.itemSeparator
													),
												},
												null,
												2
										  ))
										: e.createCommentVNode("", !0),
									e.createElementVNode(
										"div",
										{
											style: e.normalizeStyle(r.model.getItemStyle(r.item)),
											class: e.normalizeClass(r.model.cssClasses.itemBody),
											title: r.item.getTooltip(),
											onMouseover:
												d[0] ||
												(d[0] = (m) => r.model.onItemHover(r.item)),
											onMouseleave:
												d[1] ||
												(d[1] = (m) => r.model.onItemLeave(r.item)),
										},
										[
											e.createVNode(
												i,
												{ is: l.value, item: r.item, model: r.model },
												null,
												8,
												["is", "item", "model"]
											),
										],
										46,
										rt
									),
								],
								42,
								lt
							)),
							[
								[e.vShow, r.model.isItemVisible(r.item)],
								[
									e.unref(f),
									{ processEsc: !1, disableTabStop: r.item.disableTabStop },
								],
							]
						)
				);
			},
		}),
		it = e.defineComponent({
			__name: "ListItemContent",
			props: { model: {}, item: {} },
			setup(a) {
				const o = a;
				return (
					g(() => o.item),
					(t, n) => (
						e.openBlock(),
						e.createElementBlock(
							e.Fragment,
							null,
							[
								t.item.iconName
									? (e.openBlock(),
									  e.createBlock(
											i,
											{
												key: 0,
												is: "sv-svg-icon",
												class: e.normalizeClass(
													t.model.cssClasses.itemIcon
												),
												iconName: t.item.iconName,
												size: t.item.iconSize,
											},
											null,
											8,
											["class", "iconName", "size"]
									  ))
									: e.createCommentVNode("", !0),
								e.createVNode(
									i,
									{ is: "survey-string", locString: t.item.locTitle },
									null,
									8,
									["locString"]
								),
								t.item.markerIconName
									? (e.openBlock(),
									  e.createBlock(
											i,
											{
												key: 1,
												is: "sv-svg-icon",
												class: e.normalizeClass(
													t.item.cssClasses.itemMarkerIcon
												),
												iconName: t.item.markerIconName,
												size: "auto",
											},
											null,
											8,
											["class", "iconName"]
									  ))
									: e.createCommentVNode("", !0),
							],
							64
						)
					)
				);
			},
		}),
		dt = e.defineComponent({
			__name: "ListItemGroup",
			props: { model: {}, item: {} },
			setup(a) {
				const o = a;
				return (
					g(() => o.item),
					(t, n) => (
						e.openBlock(),
						e.createElementBlock(
							e.Fragment,
							null,
							[
								e.createVNode(
									i,
									{ is: "sv-list-item-content", item: t.item, model: t.model },
									null,
									8,
									["item", "model"]
								),
								e.createVNode(
									i,
									{ is: "sv-popup", model: t.item.popupModel },
									null,
									8,
									["model"]
								),
							],
							64
						)
					)
				);
			},
		}),
		mt = e.defineComponent({
			__name: "Popup",
			props: { model: {} },
			setup(a) {
				const o = a,
					t = e.shallowRef(),
					n = e.ref(null),
					s = () => {
						const l = n.value;
						l && t.value.setComponentElement(l);
					};
				return (
					e.watch(
						() => o.model,
						(l) => {
							t.value && t.value.dispose(),
								(t.value = k.createPopupViewModel(l)),
								s();
						},
						{ immediate: !0 }
					),
					g(() => t.value),
					e.onMounted(() => {
						s();
					}),
					e.onUnmounted(() => {
						t.value.dispose();
					}),
					(l, r) => (
						e.openBlock(),
						e.createElementBlock(
							"div",
							{ ref_key: "root", ref: n },
							[
								e.createVNode(
									i,
									{ is: "sv-popup-container", model: t.value },
									null,
									8,
									["model"]
								),
							],
							512
						)
					)
				);
			},
		}),
		ct = { class: "sv-popup__body-content" },
		pt = { key: 0, class: "sv-popup__body-header" },
		Ct = { class: "sv-popup__scrolling-content" },
		gt = { class: "sv-popup__content" },
		ut = { key: 1, class: "sv-popup__body-footer" },
		kt = e.defineComponent({
			__name: "PopupContainer",
			props: { model: {} },
			setup(a) {
				const o = a,
					t = (n) => {
						n.stopPropagation();
					};
				return (
					g(() => o.model),
					e.onUpdated(() => {
						const n = o.model;
						n.isVisible && !n.isPositionSet && o.model.updateOnShowing();
					}),
					e.onMounted(() => {
						o.model.isVisible && o.model.updateOnShowing();
					}),
					(n, s) =>
						e.withDirectives(
							(e.openBlock(),
							e.createElementBlock(
								"div",
								{
									tabindex: "-1",
									class: e.normalizeClass(["sv-popup", n.model.styleClass]),
									onKeydown:
										s[0] ||
										(s[0] = (l) => {
											n.model.onKeyDown(l);
										}),
									onFocusout:
										s[1] ||
										(s[1] = (l) => {
											n.model.blur(l);
										}),
									onClick:
										s[2] ||
										(s[2] = (l) => {
											n.model.clickOutside(l);
										}),
								},
								[
									e.createElementVNode(
										"div",
										{
											class: "sv-popup__container",
											style: e.normalizeStyle({
												left: n.model.left,
												top: n.model.top,
												height: n.model.height,
												width: n.model.width,
												minWidth: n.model.minWidth,
											}),
											onClick: t,
										},
										[
											n.model.showHeader
												? (e.openBlock(),
												  e.createBlock(
														i,
														{
															key: 0,
															is: n.model.popupHeaderTemplate,
															model: n.model,
														},
														null,
														8,
														["is", "model"]
												  ))
												: e.createCommentVNode("", !0),
											e.createElementVNode("div", ct, [
												n.model.title
													? (e.openBlock(),
													  e.createElementBlock(
															"div",
															pt,
															e.toDisplayString(n.model.title),
															1
													  ))
													: e.createCommentVNode("", !0),
												e.createElementVNode("div", Ct, [
													e.createElementVNode("div", gt, [
														e.createVNode(
															i,
															e.mergeProps(
																{
																	is: n.model
																		.contentComponentName,
																},
																n.model.contentComponentData
															),
															null,
															16,
															["is"]
														),
													]),
												]),
												n.model.showFooter
													? (e.openBlock(),
													  e.createElementBlock("div", ut, [
															e.createVNode(
																i,
																{
																	is: "sv-action-bar",
																	model: n.model.footerToolbar,
																},
																null,
																8,
																["model"]
															),
													  ]))
													: e.createCommentVNode("", !0),
											]),
										],
										4
									),
								],
								34
							)),
							[[e.vShow, n.model.isVisible]]
						)
				);
			},
		}),
		yt = e.defineComponent({
			__name: "PopupPointer",
			props: { model: {} },
			setup(a) {
				return (o, t) => (
					e.openBlock(),
					e.createElementBlock(
						"span",
						{
							class: "sv-popup__pointer",
							style: e.normalizeStyle({
								left: o.model.pointerTarget.left,
								top: o.model.pointerTarget.top,
							}),
						},
						null,
						4
					)
				);
			},
		}),
		ht = e.defineComponent({
			__name: "Container",
			props: { survey: {}, container: {}, needRenderWrapper: {} },
			setup(a) {
				const o = a,
					t = e.computed(() => o.survey.getContainerContent(o.container));
				return (n, s) =>
					t.value.length > 0
						? (e.openBlock(),
						  e.createElementBlock(
								e.Fragment,
								{ key: 0 },
								[
									n.needRenderWrapper
										? (e.openBlock(),
										  e.createElementBlock(
												"div",
												{
													key: 0,
													class: e.normalizeClass([
														"sv-components-column",
														"sv-components-container-" + n.container,
													]),
												},
												[
													(e.openBlock(!0),
													e.createElementBlock(
														e.Fragment,
														null,
														e.renderList(
															t.value,
															(l) => (
																e.openBlock(),
																e.createBlock(
																	i,
																	{
																		key: l.id,
																		is: l.component,
																		survey: n.survey,
																		container: n.container,
																		model: l.data,
																	},
																	null,
																	8,
																	[
																		"is",
																		"survey",
																		"container",
																		"model",
																	]
																)
															)
														),
														128
													)),
												],
												2
										  ))
										: (e.openBlock(!0),
										  e.createElementBlock(
												e.Fragment,
												{ key: 1 },
												e.renderList(
													t.value,
													(l) => (
														e.openBlock(),
														e.createBlock(
															i,
															{
																key: l.id,
																is: l.component,
																survey: n.survey,
																container: n.container,
																model: l.data,
															},
															null,
															8,
															["is", "survey", "container", "model"]
														)
													)
												),
												128
										  )),
								],
								64
						  ))
						: e.createCommentVNode("", !0);
			},
		}),
		Bt = ["aria-label"],
		b = e.defineComponent({
			__name: "Progress",
			props: { survey: {}, container: {}, css: {} },
			setup(a) {
				const o = a,
					t = e.computed(() => o.survey.progressValue + "%"),
					n = (l) => k.SurveyProgressModel.getProgressTextInBarCss(l),
					s = (l) => k.SurveyProgressModel.getProgressTextUnderBarCss(l);
				return (l, r) => (
					e.openBlock(),
					e.createElementBlock(
						"div",
						{ class: e.normalizeClass(l.survey.getProgressCssClasses(l.container)) },
						[
							e.createElementVNode(
								"div",
								{
									class: e.normalizeClass(l.survey.css.progressBar),
									style: e.normalizeStyle({ width: t.value }),
									role: "progressbar",
									"aria-valuemin": "0",
									"aria-valuemax": "100",
									"aria-label": l.survey.progressBarAriaLabel,
								},
								[
									e.createElementVNode(
										"span",
										{ class: e.normalizeClass(n(l.survey.css)) },
										e.toDisplayString(l.survey.progressText),
										3
									),
								],
								14,
								Bt
							),
							e.createElementVNode(
								"span",
								{ class: e.normalizeClass(s(l.survey.css)) },
								e.toDisplayString(l.survey.progressText),
								3
							),
						],
						2
					)
				);
			},
		}),
		qt = ["aria-label"],
		wt = ["title"],
		ft = ["onClick", "data-page-number"],
		Vt = ["title"],
		bt = ["title"],
		Lt = ["title"],
		Nt = e.defineComponent({
			__name: "ProgressButtons",
			props: { survey: {}, model: {}, container: {} },
			setup(a) {
				const o = a,
					t = e.ref(!1),
					n = e.ref(!1),
					s = e.ref(!1),
					l = e.ref(!0),
					r = e.ref(),
					d = e.computed(() => o.survey.css);
				let m = null;
				const u = (c) => {
					let p = r.value;
					p.scrollLeft += (c ? -1 : 1) * 70;
				};
				return (
					e.onMounted(() => {
						const c = r.value;
						m = new k.ProgressButtonsResponsivityManager(o.model, c, {
							onResize: (p) => {
								(l.value = p), (n.value = !p);
							},
							onUpdateScroller: (p) => {
								t.value = p;
							},
							onUpdateSettings: () => {
								(l.value = o.model.showItemTitles),
									(s.value = !o.model.showItemTitles);
							},
							container: e.computed(() => o.container),
						});
					}),
					e.onBeforeUnmount(() => {
						m.dispose();
					}),
					(c, p) => (
						e.openBlock(),
						e.createElementBlock(
							"div",
							{
								class: e.normalizeClass(c.model.getRootCss(c.container)),
								style: e.normalizeStyle({ maxWidth: c.model.progressWidth }),
								role: "progressbar",
								"aria-valuemin": "0",
								"aria-valuemax": "100",
								"aria-label": c.model.progressBarAriaLabel,
							},
							[
								n.value
									? (e.openBlock(),
									  e.createElementBlock(
											"div",
											{
												key: 0,
												class: e.normalizeClass(
													c.survey.css.progressButtonsHeader
												),
											},
											[
												e.createElementVNode(
													"div",
													{
														class: e.normalizeClass(
															c.survey.css.progressButtonsPageTitle
														),
														title: c.model.headerText,
													},
													e.toDisplayString(c.model.headerText),
													11,
													wt
												),
											],
											2
									  ))
									: e.createCommentVNode("", !0),
								e.createElementVNode(
									"div",
									{ class: e.normalizeClass(d.value.progressButtonsContainer) },
									[
										e.createElementVNode(
											"div",
											{
												class: e.normalizeClass(
													c.model.getScrollButtonCss(t.value, !0)
												),
												onClick: p[0] || (p[0] = (C) => u(!0)),
												role: "button",
											},
											null,
											2
										),
										e.createElementVNode(
											"div",
											{
												class: e.normalizeClass(
													d.value.progressButtonsListContainer
												),
												ref_key: "progressButtonsListContainer",
												ref: r,
											},
											[
												e.createElementVNode(
													"ul",
													{
														class: e.normalizeClass(
															d.value.progressButtonsList
														),
													},
													[
														(e.openBlock(!0),
														e.createElementBlock(
															e.Fragment,
															null,
															e.renderList(
																c.survey.visiblePages,
																(C, B) => (
																	e.openBlock(),
																	e.createElementBlock(
																		"li",
																		{
																			key: "listelement" + B,
																			class: e.normalizeClass(
																				c.model.getListElementCss(
																					B
																				)
																			),
																			onClick: (I) =>
																				c.model.isListElementClickable(
																					B
																				)
																					? c.model.clickListElement(
																							C
																					  )
																					: null,
																			"data-page-number":
																				c.model.getItemNumber(
																					C
																				),
																		},
																		[
																			e.createElementVNode(
																				"div",
																				{
																					class: e.normalizeClass(
																						d.value
																							.progressButtonsConnector
																					),
																				},
																				null,
																				2
																			),
																			l.value
																				? (e.openBlock(),
																				  e.createElementBlock(
																						"div",
																						{
																							key: 0,
																							class: e.normalizeClass(
																								d
																									.value
																									.progressButtonsPageTitle
																							),
																							title: C.renderedNavigationTitle,
																						},
																						[
																							e.createVNode(
																								i,
																								{
																									is: "survey-string",
																									locString:
																										C.locNavigationTitle,
																								},
																								null,
																								8,
																								[
																									"locString",
																								]
																							),
																						],
																						10,
																						Vt
																				  ))
																				: e.createCommentVNode(
																						"",
																						!0
																				  ),
																			l.value
																				? (e.openBlock(),
																				  e.createElementBlock(
																						"div",
																						{
																							key: 1,
																							class: e.normalizeClass(
																								d
																									.value
																									.progressButtonsPageDescription
																							),
																							title: C
																								.locNavigationDescription
																								.renderedHtml,
																						},
																						e.toDisplayString(
																							C
																								.locNavigationDescription
																								.renderedHtml
																						),
																						11,
																						bt
																				  ))
																				: e.createCommentVNode(
																						"",
																						!0
																				  ),
																			e.createElementVNode(
																				"div",
																				{
																					class: e.normalizeClass(
																						d.value
																							.progressButtonsButton
																					),
																				},
																				[
																					e.createElementVNode(
																						"div",
																						{
																							class: e.normalizeClass(
																								d
																									.value
																									.progressButtonsButtonBackground
																							),
																						},
																						null,
																						2
																					),
																					e.createElementVNode(
																						"div",
																						{
																							class: e.normalizeClass(
																								d
																									.value
																									.progressButtonsButtonContent
																							),
																						},
																						null,
																						2
																					),
																					e.createElementVNode(
																						"span",
																						null,
																						e.toDisplayString(
																							c.model.getItemNumber(
																								C
																							)
																						),
																						1
																					),
																				],
																				2
																			),
																		],
																		10,
																		ft
																	)
																)
															),
															128
														)),
													],
													2
												),
											],
											2
										),
										e.createElementVNode(
											"div",
											{
												class: e.normalizeClass(
													c.model.getScrollButtonCss(t.value, !1)
												),
												onClick: p[1] || (p[1] = (C) => u(!1)),
												role: "button",
											},
											null,
											2
										),
									],
									2
								),
								s.value
									? (e.openBlock(),
									  e.createElementBlock(
											"div",
											{
												key: 1,
												class: e.normalizeClass(
													c.survey.css.progressButtonsFooter
												),
											},
											[
												e.createElementVNode(
													"div",
													{
														class: e.normalizeClass(
															c.survey.css.progressButtonsPageTitle
														),
														title: c.model.footerText,
													},
													e.toDisplayString(c.model.footerText),
													11,
													Lt
												),
											],
											2
									  ))
									: e.createCommentVNode("", !0),
							],
							14,
							qt
						)
					)
				);
			},
		}),
		Et = e.defineComponent({
			__name: "ProgressToc",
			props: { survey: {}, model: {} },
			setup(a) {
				const o = a;
				return (
					e.onMounted(() => {
						o.model.updateStickyTOCSize(o.survey.rootElement);
					}),
					(t, n) => (
						e.openBlock(),
						e.createElementBlock(
							"div",
							{ class: e.normalizeClass(t.model.containerCss) },
							[
								t.model.isMobile
									? e.withDirectives(
											(e.openBlock(),
											e.createElementBlock(
												"div",
												{
													key: 0,
													onClick:
														n[0] ||
														(n[0] = (...s) =>
															t.model.togglePopup &&
															t.model.togglePopup(...s)),
												},
												[
													e.createVNode(
														i,
														{
															is: "sv-svg-icon",
															iconName: t.model.icon,
															size: 24,
														},
														null,
														8,
														["iconName"]
													),
													e.createVNode(
														i,
														{
															is: "sv-popup",
															model: t.model.popupModel,
														},
														null,
														8,
														["model"]
													),
												]
											)),
											[[e.unref(f)]]
									  )
									: (e.openBlock(),
									  e.createBlock(
											i,
											{ key: 1, is: "sv-list", model: t.model.listModel },
											null,
											8,
											["model"]
									  )),
							],
							2
						)
					)
				);
			},
		});
	/*!
	 * surveyjs - Survey JavaScript library v2.5.6
	 * Copyright (c) 2015-2026 Devsoft Baltic OÜ  - http://surveyjs.io/
	 * License: MIT (http://www.opensource.org/licenses/mit-license.php)
	 */ var Mt = {
		modernbooleancheckchecked:
			'<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><polygon points="19,10 14,10 14,5 10,5 10,10 5,10 5,14 10,14 10,19 14,19 14,14 19,14 "></polygon></svg>',
		modernbooleancheckind:
			'<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><path d="M22,0H2C0.9,0,0,0.9,0,2v20c0,1.1,0.9,2,2,2h20c1.1,0,2-0.9,2-2V2C24,0.9,23.1,0,22,0z M21,18L6,3h15V18z M3,6l15,15H3V6z"></path></svg>',
		modernbooleancheckunchecked:
			'<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><rect x="5" y="10" width="14" height="4"></rect></svg>',
		moderncheck:
			'<svg viewBox="0 0 24 24"><path d="M5,13l2-2l3,3l7-7l2,2l-9,9L5,13z"></path></svg>',
		modernradio: '<svg viewBox="-12 -12 24 24"><circle r="6" cx="0" cy="0"></circle></svg>',
		progressbutton:
			'<svg viewBox="0 0 10 10"><polygon points="2,2 0,4 5,9 10,4 8,2 5,5 "></polygon></svg>',
		removefile:
			'<svg viewBox="0 0 16 16"><path d="M8,2C4.7,2,2,4.7,2,8s2.7,6,6,6s6-2.7,6-6S11.3,2,8,2z M11,10l-1,1L8,9l-2,2l-1-1l2-2L5,6l1-1l2,2l2-2l1,1L9,8 L11,10z"></path></svg>',
		timercircle:
			'<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 160 160"><circle cx="80" cy="80" r="70" style="stroke: var(--sd-timer-stroke-background-color); stroke-width: var(--sd-timer-stroke-background-width)" stroke-dasharray="none" stroke-dashoffset="none"></circle><circle cx="80" cy="80" r="70"></circle></svg>',
		"add-24x24":
			'<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M13 11H17V13H13V17H11V13H7V11H11V7H13V11ZM23 12C23 18.1 18.1 23 12 23C5.9 23 1 18.1 1 12C1 5.9 5.9 1 12 1C18.1 1 23 5.9 23 12ZM21 12C21 7 17 3 12 3C7 3 3 7 3 12C3 17 7 21 12 21C17 21 21 17 21 12Z"></path></svg>',
		"arrowleft-16x16":
			'<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M15 8.99999H4.4L8.7 13.3L7.3 14.7L0.599998 7.99999L7.3 1.29999L8.7 2.69999L4.4 6.99999H15V8.99999Z"></path></svg>',
		"arrowright-16x16":
			'<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M1 6.99999H11.6L7.3 2.69999L8.7 1.29999L15.4 7.99999L8.7 14.7L7.3 13.3L11.6 8.99999H1V6.99999Z"></path></svg>',
		"camera-24x24":
			'<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20.01 4H18.4C18.2 4 18.01 3.9 17.9 3.73L16.97 2.34C16.41 1.5 15.48 1 14.47 1H9.54C8.53 1 7.6 1.5 7.04 2.34L6.11 3.73C6 3.9 5.81 4 5.61 4H4C2.35 4 1 5.35 1 7V19C1 20.65 2.35 22 4 22H20C21.65 22 23 20.65 23 19V7C23 5.35 21.65 4 20 4H20.01ZM21.01 19C21.01 19.55 20.56 20 20.01 20H4.01C3.46 20 3.01 19.55 3.01 19V7C3.01 6.45 3.46 6 4.01 6H5.62C6.49 6 7.3 5.56 7.79 4.84L8.72 3.45C8.91 3.17 9.22 3 9.55 3H14.48C14.81 3 15.13 3.17 15.31 3.45L16.24 4.84C16.72 5.56 17.54 6 18.41 6H20.02C20.57 6 21.02 6.45 21.02 7V19H21.01ZM12.01 6C8.7 6 6.01 8.69 6.01 12C6.01 15.31 8.7 18 12.01 18C15.32 18 18.01 15.31 18.01 12C18.01 8.69 15.32 6 12.01 6ZM12.01 16C9.8 16 8.01 14.21 8.01 12C8.01 9.79 9.8 8 12.01 8C14.22 8 16.01 9.79 16.01 12C16.01 14.21 14.22 16 12.01 16ZM13.01 10C13.01 10.55 12.56 11 12.01 11C11.46 11 11.01 11.45 11.01 12C11.01 12.55 10.56 13 10.01 13C9.46 13 9.01 12.55 9.01 12C9.01 10.35 10.36 9 12.01 9C12.56 9 13.01 9.45 13.01 10Z"></path></svg>',
		"camera-32x32":
			'<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M27 6H23.8C23.34 6 22.92 5.77 22.66 5.39L22.25 4.78C21.51 3.66 20.26 3 18.92 3H13.06C11.72 3 10.48 3.67 9.73 4.78L9.32 5.39C9.07 5.77 8.64 6 8.18 6H4.98C2.79 6 1 7.79 1 10V24C1 26.21 2.79 28 5 28H27C29.21 28 31 26.21 31 24V10C31 7.79 29.21 6 27 6ZM29 24C29 25.1 28.1 26 27 26H5C3.9 26 3 25.1 3 24V10C3 8.9 3.9 8 5 8H8.2C9.33 8 10.38 7.44 11 6.5L11.41 5.89C11.78 5.33 12.41 5 13.07 5H18.93C19.6 5 20.22 5.33 20.59 5.89L21 6.5C21.62 7.44 22.68 8 23.8 8H27C28.1 8 29 8.9 29 10V24ZM16 9C12.13 9 9 12.13 9 16C9 19.87 12.13 23 16 23C19.87 23 23 19.87 23 16C23 12.13 19.87 9 16 9ZM16 21C13.24 21 11 18.76 11 16C11 13.24 13.24 11 16 11C18.76 11 21 13.24 21 16C21 18.76 18.76 21 16 21ZM17 13C17 13.55 16.55 14 16 14C14.9 14 14 14.9 14 16C14 16.55 13.55 17 13 17C12.45 17 12 16.55 12 16C12 13.79 13.79 12 16 12C16.55 12 17 12.45 17 13Z"></path></svg>',
		"cancel-24x24":
			'<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22.6 8.6L16.4 2.4C16 2 15.5 1.8 15 1.8C14.5 1.8 14 2 13.6 2.4L1.40005 14.6C0.600049 15.4 0.600049 16.6 1.40005 17.4L6.00005 22H12L22.6 11.4C23.3 10.6 23.3 9.3 22.6 8.6ZM11.1 20H6.80005L2.80005 16L6.20005 12.6L12.4 18.8L11.1 20ZM13.8 17.4L7.60005 11.2L15 3.8L21.2 10L13.8 17.4ZM16 20H23V22H14L16 20Z"></path></svg>',
		"check-16x16":
			'<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M5.003 14.413L0.292999 9.70303L1.703 8.29303L5.003 11.583L14.293 2.29303L15.703 3.70303L5.003 14.413Z"></path></svg>',
		"check-24x24":
			'<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M9 20.1L1 12L3.1 9.9L9 15.9L20.9 4L23 6.1L9 20.1Z"></path></svg>',
		"chevrondown-24x24":
			'<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 15L17 10H7L12 15Z"></path></svg>',
		"chevronright-16x16":
			'<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M5.64648 12.6465L6.34648 13.3465L11.7465 8.04648L6.34648 2.64648L5.64648 3.34648L10.2465 8.04648L5.64648 12.6465Z"></path></svg>',
		"clear-16x16":
			'<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M13.35 3.34999L12.65 2.64999L8.05002 7.24999L3.35002 2.64999L2.65002 3.34999L7.25002 8.04999L2.65002 12.65L3.35002 13.35L8.05002 8.74999L12.65 13.35L13.35 12.65L8.75002 8.04999L13.35 3.34999Z"></path></svg>',
		"clear-24x24":
			'<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22.6 8.6L16.4 2.4C16 2 15.5 1.8 15 1.8C14.5 1.8 14 2 13.6 2.4L1.40005 14.6C0.600049 15.4 0.600049 16.6 1.40005 17.4L6.00005 22H12L22.6 11.4C23.3 10.6 23.3 9.3 22.6 8.6ZM11.1 20H6.80005L2.80005 16L6.20005 12.6L12.4 18.8L11.1 20ZM13.8 17.4L7.60005 11.2L15 3.8L21.2 10L13.8 17.4ZM16 20H23V22H14L16 20Z"></path></svg>',
		"close-16x16":
			'<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M9.43 8.0025L13.7 3.7225C14.09 3.3325 14.09 2.6925 13.7 2.2925C13.31 1.9025 12.67 1.9025 12.27 2.2925L7.99 6.5725L3.72 2.3025C3.33 1.9025 2.69 1.9025 2.3 2.3025C1.9 2.6925 1.9 3.3325 2.3 3.7225L6.58 8.0025L2.3 12.2825C1.91 12.6725 1.91 13.3125 2.3 13.7125C2.69 14.1025 3.33 14.1025 3.73 13.7125L8.01 9.4325L12.29 13.7125C12.68 14.1025 13.32 14.1025 13.72 13.7125C14.11 13.3225 14.11 12.6825 13.72 12.2825L9.44 8.0025H9.43Z"></path></svg>',
		"close-24x24":
			'<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M13.4101 12L20.7001 4.71C21.0901 4.32 21.0901 3.69 20.7001 3.3C20.3101 2.91 19.6801 2.91 19.2901 3.3L12.0001 10.59L4.71006 3.29C4.32006 2.9 3.68006 2.9 3.29006 3.29C2.90006 3.68 2.90006 4.32 3.29006 4.71L10.5801 12L3.29006 19.29C2.90006 19.68 2.90006 20.31 3.29006 20.7C3.49006 20.9 3.74006 20.99 4.00006 20.99C4.26006 20.99 4.51006 20.89 4.71006 20.7L12.0001 13.41L19.2901 20.7C19.4901 20.9 19.7401 20.99 20.0001 20.99C20.2601 20.99 20.5101 20.89 20.7101 20.7C21.1001 20.31 21.1001 19.68 20.7101 19.29L13.4201 12H13.4101Z"></path></svg>',
		"collapse-16x16":
			'<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M2 6L3 5L8 10L13 5L14 6L8 12L2 6Z"></path></svg>',
		"collapsedetails-16x16":
			'<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M13 7H3V9H13V7Z"></path></svg>',
		"delete-16x16":
			'<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M15 2H14H11V1C11 0.4 10.6 0 10 0H7C6.4 0 6 0.4 6 1V2H3H2V4H3V14C3 15.1 3.9 16 5 16H12C13.1 16 14 15.1 14 14V4H15V2ZM7 1H10V2H7V1ZM12 14H5V4H12V14ZM7 13H6V5H7V13ZM9 13H8V5H9V13ZM11 13H10V5H11V13Z"></path></svg>',
		"delete-24x24":
			'<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22 4H20H16V2C16 0.9 15.1 0 14 0H10C8.9 0 8 0.9 8 2V4H4H2V6H4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V6H22V4ZM10 2H14V4H10V2ZM18 20H6V6H8H16H18V20ZM14 8H16V18H14V8ZM11 8H13V18H11V8ZM8 8H10V18H8V8Z"></path></svg>',
		"drag-24x24":
			'<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M13 6C13 4.9 13.9 4 15 4C16.1 4 17 4.9 17 6C17 7.1 16.1 8 15 8C13.9 8 13 7.1 13 6ZM9 4C7.9 4 7 4.9 7 6C7 7.1 7.9 8 9 8C10.1 8 11 7.1 11 6C11 4.9 10.1 4 9 4ZM15 10C13.9 10 13 10.9 13 12C13 13.1 13.9 14 15 14C16.1 14 17 13.1 17 12C17 10.9 16.1 10 15 10ZM9 10C7.9 10 7 10.9 7 12C7 13.1 7.9 14 9 14C10.1 14 11 13.1 11 12C11 10.9 10.1 10 9 10ZM15 16C13.9 16 13 16.9 13 18C13 19.1 13.9 20 15 20C16.1 20 17 19.1 17 18C17 16.9 16.1 16 15 16ZM9 16C7.9 16 7 16.9 7 18C7 19.1 7.9 20 9 20C10.1 20 11 19.1 11 18C11 16.9 10.1 16 9 16Z"></path></svg>',
		"draghorizontal-24x16":
			'<svg viewBox="0 0 24 16" xmlns="http://www.w3.org/2000/svg"><path d="M18 9C19.1 9 20 9.9 20 11C20 12.1 19.1 13 18 13C16.9 13 16 12.1 16 11C16 9.9 16.9 9 18 9ZM20 5C20 3.9 19.1 3 18 3C16.9 3 16 3.9 16 5C16 6.1 16.9 7 18 7C19.1 7 20 6.1 20 5ZM14 11C14 9.9 13.1 9 12 9C10.9 9 10 9.9 10 11C10 12.1 10.9 13 12 13C13.1 13 14 12.1 14 11ZM14 5C14 3.9 13.1 3 12 3C10.9 3 10 3.9 10 5C10 6.1 10.9 7 12 7C13.1 7 14 6.1 14 5ZM8 11C8 9.9 7.1 9 6 9C4.9 9 4 9.9 4 11C4 12.1 4.9 13 6 13C7.1 13 8 12.1 8 11ZM8 5C8 3.9 7.1 3 6 3C4.9 3 4 3.9 4 5C4 6.1 4.9 7 6 7C7.1 7 8 6.1 8 5Z"></path></svg>',
		"editsmall-16x16":
			'<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M13.59 4.5884L11.42 2.4184C11.03 2.0284 10.52 1.8284 10.01 1.8284C9.5 1.8284 8.99 2.0284 8.6 2.4184L3.76 7.2384C2.63 8.3684 2 9.8884 2 11.4784V12.9884C2 13.5384 2.45 13.9884 3 13.9884H4.51C6.1 13.9884 7.63 13.3584 8.75 12.2284L13.58 7.3984C14.36 6.6184 14.36 5.3484 13.58 4.5684L13.59 4.5884ZM7.35 10.8284C6.59 11.5884 5.59 11.9984 4.52 11.9984H4.01V11.4884C4.01 10.4184 4.43 9.4184 5.18 8.6584L7.72 6.1184L9.89 8.2884L7.35 10.8284ZM11.3 6.8784L9.13 4.7084L10.01 3.8284L12.18 5.9984L11.3 6.8784Z"></path></svg>',
		"expand-16x16":
			'<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M6 14L5 13L10 8L5 3L6 2L12 8L6 14Z"></path></svg>',
		"expanddetails-16x16":
			'<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M13 7H9V3H7V7H3V9H7V13H9V9H13V7Z"></path></svg>',
		"file-72x72":
			'<svg viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg"><path d="M62.83 12.83L53.17 3.17C52.7982 2.79866 52.357 2.50421 51.8714 2.30346C51.3858 2.1027 50.8654 1.99959 50.34 2H14C12.4087 2 10.8826 2.63214 9.75735 3.75736C8.63214 4.88258 8 6.4087 8 8V64C8 65.5913 8.63214 67.1174 9.75735 68.2426C10.8826 69.3679 12.4087 70 14 70H58C59.5913 70 61.1174 69.3679 62.2426 68.2426C63.3679 67.1174 64 65.5913 64 64V15.66C64.0004 15.1346 63.8973 14.6142 63.6965 14.1286C63.4958 13.643 63.2013 13.2018 62.83 12.83ZM52 4.83L61.17 14H56C54.9391 14 53.9217 13.5786 53.1716 12.8284C52.4214 12.0783 52 11.0609 52 10V4.83ZM62 64C62 65.0609 61.5786 66.0783 60.8284 66.8284C60.0783 67.5786 59.0609 68 58 68H14C12.9391 68 11.9217 67.5786 11.1716 66.8284C10.4214 66.0783 10 65.0609 10 64V8C10 6.93914 10.4214 5.92172 11.1716 5.17157C11.9217 4.42143 12.9391 4 14 4H50V10C50 11.5913 50.6321 13.1174 51.7574 14.2426C52.8826 15.3679 54.4087 16 56 16H62V64ZM22 26H50V28H22V26ZM22 32H50V34H22V32ZM22 38H50V40H22V38ZM22 44H50V46H22V44Z"></path></svg>',
		"flip-24x24":
			'<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M23 12.0037C23 14.2445 21.7794 16.3052 19.5684 17.8257C19.3984 17.9458 19.1983 18.0058 19.0082 18.0058C18.688 18.0058 18.3779 17.8557 18.1778 17.5756C17.8677 17.1155 17.9777 16.4953 18.4379 16.1852C20.0887 15.0448 21.0091 13.5643 21.0091 12.0138C21.0091 8.70262 16.9673 6.01171 12.005 6.01171C11.4948 6.01171 10.9945 6.04172 10.5043 6.09173L11.7149 7.30215C12.105 7.69228 12.105 8.32249 11.7149 8.71263C11.5148 8.9127 11.2647 9.00273 11.0045 9.00273C10.7444 9.00273 10.4943 8.90269 10.2942 8.71263L6.58254 5.00136L10.2842 1.2901C10.6744 0.899964 11.3047 0.899964 11.6949 1.2901C12.085 1.68023 12.085 2.31045 11.6949 2.70058L10.3042 4.09105C10.8545 4.03103 11.4147 4.00102 11.985 4.00102C18.0578 4.00102 22.99 7.59225 22.99 12.0037H23ZM12.2851 15.2949C11.895 15.685 11.895 16.3152 12.2851 16.7054L13.4957 17.9158C13.0055 17.9758 12.4952 17.9958 11.995 17.9958C7.03274 17.9958 2.99091 15.3049 2.99091 11.9937C2.99091 10.4332 3.90132 8.95271 5.56207 7.82232C6.02228 7.51222 6.13233 6.89201 5.82219 6.43185C5.51205 5.97169 4.89177 5.86166 4.43156 6.17176C2.22055 7.69228 1 9.76299 1 11.9937C1 16.4052 5.93224 19.9965 12.005 19.9965C12.5753 19.9965 13.1355 19.9665 13.6858 19.9064L12.2951 21.2969C11.905 21.6871 11.905 22.3173 12.2951 22.7074C12.4952 22.9075 12.7453 22.9975 13.0055 22.9975C13.2656 22.9975 13.5157 22.8975 13.7158 22.7074L17.4275 18.9961L13.7158 15.2849C13.3256 14.8947 12.6953 14.8947 12.3051 15.2849L12.2851 15.2949Z"></path></svg>',
		"folder-24x24":
			'<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M21.93 9H21V7C21 6.46957 20.7893 5.96086 20.4142 5.58579C20.0391 5.21071 19.5304 5 19 5H10L8 3H4C3.46957 3 2.96086 3.21071 2.58579 3.58579C2.21071 3.96086 2 4.46957 2 5L2 21H21L23.89 11.63C23.9916 11.3244 24.0179 10.9988 23.9667 10.6809C23.9155 10.363 23.7882 10.0621 23.5958 9.80392C23.4034 9.54571 23.1514 9.33779 22.8614 9.19782C22.5714 9.05786 22.2519 8.99 21.93 9ZM4 5H7.17L8.59 6.41L9.17 7H19V9H6L4 15V5ZM22 11L19.54 19H4.77L7.44 11H22Z"></path></svg>',
		"fullsize-16x16":
			'<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M12 13H4C2.9 13 2 12.1 2 11V5C2 3.9 2.9 3 4 3H12C13.1 3 14 3.9 14 5V11C14 12.1 13.1 13 12 13ZM4 5V11H12V5H4Z"></path></svg>',
		"image-48x48":
			'<svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><path d="M36 8H12C9.79 8 8 9.79 8 12V36C8 38.21 9.79 40 12 40H36C38.21 40 40 38.21 40 36V12C40 9.79 38.21 8 36 8ZM38 36C38 37.1 37.1 38 36 38H12C10.9 38 10 37.1 10 36V12C10 10.9 10.9 10 12 10H36C37.1 10 38 10.9 38 12V36ZM14 17C14 15.34 15.34 14 17 14C18.66 14 20 15.34 20 17C20 18.66 18.66 20 17 20C15.34 20 14 18.66 14 17ZM27 24L36 36H12L19 27L23 29L27 24Z"></path></svg>',
		"loading-48x48":
			'<svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_19679_369428)"><path opacity="0.1" d="M24 40C15.18 40 8 32.82 8 24C8 15.18 15.18 8 24 8C32.82 8 40 15.18 40 24C40 32.82 32.82 40 24 40ZM24 12C17.38 12 12 17.38 12 24C12 30.62 17.38 36 24 36C30.62 36 36 30.62 36 24C36 17.38 30.62 12 24 12Z" fill="black" fill-opacity="0.91"></path><path d="M10 26C8.9 26 8 25.1 8 24C8 15.18 15.18 8 24 8C25.1 8 26 8.9 26 10C26 11.1 25.1 12 24 12C17.38 12 12 17.38 12 24C12 25.1 11.1 26 10 26Z"></path></g><defs><clipPath id="clip0_19679_369428"><rect width="32" height="32" fill="white" transform="translate(8 8)"></rect></clipPath></defs></svg>',
		"maximize-16x16":
			'<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M6.71 10.71L4.42 13H6.01C6.56 13 7.01 13.45 7.01 14C7.01 14.55 6.56 15 6.01 15H2C1.45 15 1 14.55 1 14V10C1 9.45 1.45 9 2 9C2.55 9 3 9.45 3 10V11.59L5.29 9.3C5.68 8.91 6.31 8.91 6.7 9.3C7.09 9.69 7.09 10.32 6.7 10.71H6.71ZM14 1H10C9.45 1 9 1.45 9 2C9 2.55 9.45 3 10 3H11.59L9.3 5.29C8.91 5.68 8.91 6.31 9.3 6.7C9.5 6.9 9.75 6.99 10.01 6.99C10.27 6.99 10.52 6.89 10.72 6.7L13.01 4.41V6C13.01 6.55 13.46 7 14.01 7C14.56 7 15.01 6.55 15.01 6V2C15.01 1.45 14.56 1 14.01 1H14Z"></path></svg>',
		"minimize-16x16":
			'<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M13 9H3C2.45 9 2 8.55 2 8C2 7.45 2.45 7 3 7H13C13.55 7 14 7.45 14 8C14 8.55 13.55 9 13 9Z"></path></svg>',
		"more-24x24":
			'<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M6 12C6 13.1 5.1 14 4 14C2.9 14 2 13.1 2 12C2 10.9 2.9 10 4 10C5.1 10 6 10.9 6 12ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10ZM20 10C18.9 10 18 10.9 18 12C18 13.1 18.9 14 20 14C21.1 14 22 13.1 22 12C22 10.9 21.1 10 20 10Z"></path></svg>',
		"navmenu-24x24":
			'<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M16 7H2V5H16V7ZM2 11V13H22V11H2ZM2 19H10V17H2V19Z"></path></svg>',
		"noimage-48x48":
			'<svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><path d="M14 17.01C14 16.4167 14.1759 15.8366 14.5056 15.3433C14.8352 14.8499 15.3038 14.4654 15.8519 14.2384C16.4001 14.0113 17.0033 13.9519 17.5853 14.0676C18.1672 14.1834 18.7018 14.4691 19.1213 14.8887C19.5409 15.3082 19.8266 15.8428 19.9424 16.4247C20.0581 17.0067 19.9987 17.6099 19.7716 18.1581C19.5446 18.7062 19.1601 19.1748 18.6667 19.5044C18.1734 19.8341 17.5933 20.01 17 20.01C16.2044 20.01 15.4413 19.6939 14.8787 19.1313C14.3161 18.5687 14 17.8056 14 17.01ZM27.09 24.14L20 36.01H36L27.09 24.14ZM36.72 8.14L35.57 10.01H36C36.5304 10.01 37.0391 10.2207 37.4142 10.5958C37.7893 10.9709 38 11.4796 38 12.01V36.01C38 36.5404 37.7893 37.0491 37.4142 37.4242C37.0391 37.7993 36.5304 38.01 36 38.01H18.77L17.57 40.01H36C37.0609 40.01 38.0783 39.5886 38.8284 38.8384C39.5786 38.0883 40 37.0709 40 36.01V12.01C39.9966 11.0765 39.6668 10.1737 39.0678 9.45778C38.4688 8.74188 37.6382 8.25802 36.72 8.09V8.14ZM36.86 4.5L12.86 44.5L11.14 43.5L13.23 40.01H12C10.9391 40.01 9.92172 39.5886 9.17157 38.8384C8.42143 38.0883 8 37.0709 8 36.01V12.01C8 10.9491 8.42143 9.93172 9.17157 9.18157C9.92172 8.43143 10.9391 8.01 12 8.01H32.43L35.14 3.5L36.86 4.5ZM14.43 38.01L15.63 36.01H12L19 27.01L20.56 27.8L31.23 10.01H12C11.4696 10.01 10.9609 10.2207 10.5858 10.5958C10.2107 10.9709 10 11.4796 10 12.01V36.01C10 36.5404 10.2107 37.0491 10.5858 37.4242C10.9609 37.7993 11.4696 38.01 12 38.01H14.43Z"></path></svg>',
		"ranking-arrows":
			'<svg viewBox="0 0 10 24" xmlns="http://www.w3.org/2000/svg"><path d="M10 5L5 0L0 5H4V9H6V5H10Z"></path><path d="M6 19V15H4V19H0L5 24L10 19H6Z"></path></svg>',
		"rankingundefined-16x16":
			'<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M13 7H3V9H13V7Z"></path></svg>',
		"rating-star-2":
			'<svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><path d="M24 39.5057L11.7226 45.9839C10.4095 46.6739 8.87606 45.5622 9.12525 44.096L11.4734 30.373L1.54411 20.6556C0.480254 19.6207 1.06489 17.8095 2.53128 17.5986L16.2559 15.5957L22.3994 3.10891C23.0512 1.77685 24.9488 1.77685 25.6102 3.10891L31.7441 15.5957L45.4687 17.5986C46.9351 17.8095 47.5197 19.6207 46.4559 20.6556L36.5266 30.373L38.8748 44.096C39.1239 45.5622 37.5905 46.6835 36.2774 45.9839L24 39.5057Z" fill="none" stroke-width="2"></path><path d="M24.3981 33.1305L24 32.9206L23.6019 33.1305L15.8715 37.2059L17.3542 28.5663L17.43 28.1246L17.1095 27.8113L10.83 21.6746L19.4965 20.4049L19.9405 20.3399L20.1387 19.9373L24 12.0936L27.8613 19.9373L28.0595 20.3399L28.5035 20.4049L37.17 21.6746L30.8905 27.8113L30.57 28.1246L30.6458 28.5663L32.1285 37.2059L24.3981 33.1305Z" stroke-width="1.70746"></path></svg>',
		"rating-star-small-2":
			'<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 19.3373L6.13001 22.4373C5.50001 22.7673 4.77001 22.2373 4.89001 21.5373L6.01001 14.9773L1.26001 10.3273C0.750007 9.83728 1.03001 8.96728 1.73001 8.86728L8.29001 7.90728L11.23 1.93728C11.54 1.29728 12.45 1.29728 12.77 1.93728L15.7 7.90728L22.26 8.86728C22.96 8.96728 23.24 9.83728 22.73 10.3273L17.98 14.9773L19.1 21.5373C19.22 22.2373 18.49 22.7773 17.86 22.4373L11.99 19.3373H12Z" fill="none" stroke-width="2"></path><path d="M12 15.9472L8.58001 17.7572L9.23001 13.9272L6.45001 11.2072L10.29 10.6472L12 7.17725L13.71 10.6472L17.55 11.2072L14.77 13.9272L15.42 17.7572L12 15.9472Z"></path></svg>',
		"rating-star-small":
			'<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g><path d="M12 19.3373L6.13001 22.4373C5.50001 22.7673 4.77001 22.2373 4.89001 21.5373L6.01001 14.9773L1.26001 10.3273C0.750007 9.83728 1.03001 8.96728 1.73001 8.86728L8.29001 7.90728L11.23 1.93728C11.54 1.29728 12.45 1.29728 12.77 1.93728L15.7 7.90728L22.26 8.86728C22.96 8.96728 23.24 9.83728 22.73 10.3273L17.98 14.9773L19.1 21.5373C19.22 22.2373 18.49 22.7773 17.86 22.4373L11.99 19.3373H12Z"></path></g></svg>',
		"rating-star":
			'<svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><g><path d="M24 39.5057L11.7226 45.9839C10.4095 46.6739 8.87606 45.5622 9.12525 44.096L11.4734 30.373L1.54411 20.6556C0.480254 19.6207 1.06489 17.8095 2.53128 17.5986L16.2559 15.5957L22.3994 3.10891C23.0512 1.77685 24.9488 1.77685 25.6102 3.10891L31.7441 15.5957L45.4687 17.5986C46.9351 17.8095 47.5197 19.6207 46.4559 20.6556L36.5266 30.373L38.8748 44.096C39.1239 45.5622 37.5905 46.6835 36.2774 45.9839L24 39.5057Z"></path></g></svg>',
		"reorder-24x24":
			'<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17 5L12 0L7 5H11V9H13V5H17Z"></path><path d="M13 19V15H11V19H7L12 24L17 19H13Z"></path></svg>',
		"restoredown-16x16":
			'<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M15 6C15 6.55 14.55 7 14 7H10C9.45 7 9 6.55 9 6V2C9 1.45 9.45 1 10 1C10.55 1 11 1.45 11 2V3.59L13.29 1.29C13.49 1.09 13.74 1 14 1C14.26 1 14.51 1.1 14.71 1.29C15.1 1.68 15.1 2.31 14.71 2.7L12.42 4.99H14.01C14.56 4.99 15.01 5.44 15.01 5.99L15 6ZM6 9H2C1.45 9 0.999998 9.45 0.999998 10C0.999998 10.55 1.45 11 2 11H3.59L1.29 13.29C0.899998 13.68 0.899998 14.31 1.29 14.7C1.68 15.09 2.31 15.09 2.7 14.7L4.99 12.41V14C4.99 14.55 5.44 15 5.99 15C6.54 15 6.99 14.55 6.99 14V10C6.99 9.45 6.54 9 5.99 9H6Z"></path></svg>',
		"search-24x24":
			'<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M14 2C9.6 2 6 5.6 6 10C6 11.8 6.6 13.5 7.7 14.9L2.3 20.3C1.9 20.7 1.9 21.3 2.3 21.7C2.5 21.9 2.7 22 3 22C3.3 22 3.5 21.9 3.7 21.7L9.1 16.3C10.5 17.4 12.2 18 14 18C18.4 18 22 14.4 22 10C22 5.6 18.4 2 14 2ZM14 16C10.7 16 8 13.3 8 10C8 6.7 10.7 4 14 4C17.3 4 20 6.7 20 10C20 13.3 17.3 16 14 16Z"></path></svg>',
		"smiley-rate1-24x24":
			'<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M4 4.9938C4 4.44362 4.45 3.99348 5 3.99348H6.59L5.3 2.70306C4.91 2.31293 4.91 1.68272 5.3 1.2926C5.69 0.902468 6.32 0.902468 6.71 1.2926L9.71 4.29357C9.8 4.3836 9.88 4.49364 9.93 4.62368C10.03 4.86376 10.03 5.14385 9.93 5.38393C9.88 5.50397 9.81 5.614 9.71 5.71404L6.71 8.71501C6.51 8.91508 6.26 9.00511 6 9.00511C5.74 9.00511 5.49 8.90508 5.29 8.71501C4.9 8.32489 4.9 7.69468 5.29 7.30456L6.58 6.01413H4.99C4.44 6.01413 3.99 5.56399 3.99 5.01381L4 4.9938ZM14.08 5.37393C14.13 5.49397 14.2 5.604 14.3 5.70403L17.3 8.70501C17.5 8.90508 17.75 8.99511 18.01 8.99511C18.27 8.99511 18.52 8.89507 18.72 8.70501C19.11 8.31488 19.11 7.68468 18.72 7.29455L17.43 6.00413H19.02C19.57 6.00413 20.02 5.55399 20.02 5.00381C20.02 4.45363 19.57 4.00348 19.02 4.00348H17.43L18.72 2.71306C19.11 2.32293 19.11 1.69273 18.72 1.3026C18.33 0.912471 17.7 0.912471 17.31 1.3026L14.31 4.30358C14.22 4.39361 14.14 4.50364 14.09 4.63368C13.99 4.87376 13.99 5.15385 14.09 5.39393L14.08 5.37393ZM22 14.9971V20.999C22 22.6496 20.65 24 19 24H5C3.35 24 2 22.6496 2 20.999V14.9971C2 13.3465 3.35 11.9961 5 11.9961H19C20.65 11.9961 22 13.3465 22 14.9971ZM19 13.9967H16V16.9977H20V14.9971C20 14.4469 19.55 13.9967 19 13.9967ZM14 16.9977V13.9967H10V16.9977H14ZM10 18.9984V21.9993H14V18.9984H10ZM4 14.9971V16.9977H8V13.9967H5C4.45 13.9967 4 14.4469 4 14.9971ZM5 21.9993H8V18.9984H4V20.999C4 21.5492 4.45 21.9993 5 21.9993ZM20 20.999V18.9984H16V21.9993H19C19.55 21.9993 20 21.5492 20 20.999Z"></path></svg>',
		"smiley-rate10-24x24":
			'<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12.01 23C6.85721 23 1.15412 19.9621 0.0134987 13.1669C-0.0765501 12.6272 0.293651 12.1076 0.833944 12.0177C1.38424 11.9277 1.89452 12.2975 1.98457 12.8371C2.92508 18.4732 7.69767 20.9914 12 20.9914C16.3023 20.9914 21.0749 18.4732 22.0154 12.8371C22.1055 12.2975 22.6158 11.9277 23.1661 12.0177C23.7063 12.1076 24.0765 12.6272 23.9865 13.1669C22.8559 19.9521 17.1428 23 11.99 23H12.01ZM21.165 6.15177C22.3056 5.01257 22.3056 3.16386 21.165 2.02465L21.0049 1.85477C19.9143 0.765533 18.1633 0.725561 17.0227 1.71487C15.8821 0.715568 14.1312 0.765533 13.0406 1.85477L12.8705 2.01466C11.7299 3.15386 11.7299 5.00257 12.8705 6.14178L17.0227 10.2889L21.175 6.14178L21.165 6.15177ZM15.742 3.27378L17.0127 4.54289L18.2834 3.27378C18.6436 2.91403 19.2239 2.91403 19.5841 3.27378L19.7442 3.43367C20.1044 3.79342 20.1044 4.37301 19.7442 4.73276L17.0127 7.46086L14.2812 4.73276C13.921 4.37301 13.921 3.79342 14.2812 3.43367L14.4413 3.27378C14.6214 3.09391 14.8515 3.00397 15.0917 3.00397C15.3318 3.00397 15.5619 3.09391 15.742 3.27378ZM11.1595 6.15177C12.3002 5.01257 12.3002 3.16386 11.1595 2.02465L10.9995 1.85477C9.90886 0.765533 8.15792 0.725561 7.0173 1.71487C5.87668 0.715568 4.12573 0.765533 3.03514 1.85477L2.86505 2.01466C1.72443 3.15386 1.72443 5.00257 2.86505 6.14178L7.0173 10.2889L11.1695 6.14178L11.1595 6.15177ZM5.7366 3.27378L7.00729 4.54289L8.27798 3.27378C8.63818 2.91403 9.21849 2.91403 9.57869 3.27378L9.73877 3.43367C10.099 3.79342 10.099 4.37301 9.73877 4.73276L7.00729 7.46086L4.27581 4.73276C3.91562 4.37301 3.91562 3.79342 4.27581 3.43367L4.4359 3.27378C4.61599 3.09391 4.84612 3.00397 5.08625 3.00397C5.32638 3.00397 5.5565 3.09391 5.7366 3.27378Z"></path></svg>',
		"smiley-rate2-24x24":
			'<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_15894_140103)"><path d="M4.88291 4.51001C4.47291 4.51001 4.08291 4.25001 3.94291 3.84001C3.76291 3.32001 4.03291 2.75001 4.55291 2.57001L8.32291 1.25001C8.84291 1.06001 9.41291 1.34001 9.59291 1.86001C9.77291 2.38001 9.50291 2.95001 8.98291 3.13001L5.20291 4.45001C5.09291 4.49001 4.98291 4.51001 4.87291 4.51001H4.88291ZM19.8129 3.89001C20.0229 3.38001 19.7729 2.79001 19.2629 2.59001L15.5529 1.07001C15.0429 0.860007 14.4529 1.11001 14.2529 1.62001C14.0429 2.13001 14.2929 2.72001 14.8029 2.92001L18.5029 4.43001C18.6229 4.48001 18.7529 4.50001 18.8829 4.50001C19.2729 4.50001 19.6529 4.27001 19.8129 3.88001V3.89001ZM3.50291 6.00001C2.64291 6.37001 1.79291 6.88001 1.00291 7.48001C0.79291 7.64001 0.64291 7.87001 0.59291 8.14001C0.48291 8.73001 0.87291 9.29001 1.45291 9.40001C2.04291 9.51001 2.60291 9.12001 2.71291 8.54001C2.87291 7.69001 3.12291 6.83001 3.50291 5.99001V6.00001ZM21.0429 8.55001C21.6029 10.48 24.2429 8.84001 22.7529 7.48001C21.9629 6.88001 21.1129 6.37001 20.2529 6.00001C20.6329 6.84001 20.8829 7.70001 21.0429 8.55001ZM21.5729 13.2C21.2529 14.2 22.5429 15.09 23.3629 14.39C23.8529 14 23.9229 13.29 23.5429 12.81C21.7429 10.67 22.1329 10.55 21.5829 13.2H21.5729ZM1.75291 11C1.22291 11.79 -0.14709 12.64 0.0129102 13.75C0.15291 14.36 0.75291 14.74 1.35291 14.6C2.98291 14.1 1.80291 12.22 1.75291 11ZM19.8829 17C19.8829 13.14 16.2929 10 11.8829 10C7.47291 10 3.88291 13.14 3.88291 17C3.88291 20.86 7.47291 24 11.8829 24C16.2929 24 19.8829 20.86 19.8829 17ZM17.8829 17C17.8829 19.76 15.1929 22 11.8829 22C8.57291 22 5.88291 19.76 5.88291 17C5.88291 14.24 8.57291 12 11.8829 12C15.1929 12 17.8829 14.24 17.8829 17Z"></path></g><defs><clipPath id="clip0_15894_140103"><rect width="24" height="24" fill="white"></rect></clipPath></defs></svg>',
		"smiley-rate3-24x24":
			'<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M7.01915 7C6.46961 7 6.01998 6.55 6.01998 6V2C6.01998 1.45 6.46961 1 7.01915 1C7.56869 1 8.01832 1.45 8.01832 2V6C8.01832 6.55 7.56869 7 7.01915 7ZM18.01 6V2C18.01 1.45 17.5604 1 17.0108 1C16.4613 1 16.0117 1.45 16.0117 2V6C16.0117 6.55 16.4613 7 17.0108 7C17.5604 7 18.01 6.55 18.01 6ZM16.4213 21.58L18.01 19.99L19.2989 21.28C19.6886 21.67 20.3181 21.67 20.7077 21.28C21.0974 20.89 21.0974 20.26 20.7077 19.87L19.4188 18.58C18.6395 17.8 17.3705 17.8 16.5912 18.58L15.0025 20.17L13.4138 18.58C12.6345 17.8 11.3655 17.8 10.5862 18.58L8.9975 20.17L7.40883 18.58C6.62948 17.8 5.36053 17.8 4.58118 18.58L3.29226 19.87C2.90258 20.26 2.90258 20.89 3.29226 21.28C3.68193 21.67 4.31141 21.67 4.70108 21.28L5.99001 19.99L7.57868 21.58C8.35803 22.36 9.62698 22.36 10.4063 21.58L11.995 19.99L13.5837 21.58C13.9734 21.97 14.4829 22.16 14.9925 22.16C15.5021 22.16 16.0117 21.97 16.4013 21.58H16.4213Z"></path></svg>',
		"smiley-rate4-24x24":
			'<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M7.06927 7C6.51927 7 6.06927 6.55 6.06927 6V2C6.06927 1.45 6.51927 1 7.06927 1C7.61927 1 8.06927 1.45 8.06927 2V6C8.06927 6.55 7.61927 7 7.06927 7ZM18.0693 6V2C18.0693 1.45 17.6193 1 17.0693 1C16.5193 1 16.0693 1.45 16.0693 2V6C16.0693 6.55 16.5193 7 17.0693 7C17.6193 7 18.0693 6.55 18.0693 6ZM22.5693 21.9C23.0693 21.66 23.2793 21.07 23.0393 20.57C21.1093 16.52 16.9093 14 12.0693 14C7.22927 14 3.02927 16.52 1.09927 20.57C0.859273 21.07 1.06927 21.67 1.56927 21.9C2.06927 22.14 2.65927 21.93 2.89927 21.43C4.49927 18.08 8.00927 16 12.0593 16C16.1093 16 19.6293 18.08 21.2193 21.43C21.3893 21.79 21.7493 22 22.1193 22C22.2593 22 22.4093 21.97 22.5493 21.9H22.5693Z"></path></svg>',
		"smiley-rate5-24x24":
			'<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M7.00572 7C6.45572 7 6.00572 6.55 6.00572 6V2C6.00572 1.45 6.45572 1 7.00572 1C7.55572 1 8.00572 1.45 8.00572 2V6C8.00572 6.55 7.55572 7 7.00572 7ZM18.0057 6V2C18.0057 1.45 17.5557 1 17.0057 1C16.4557 1 16.0057 1.45 16.0057 2V6C16.0057 6.55 16.4557 7 17.0057 7C17.5557 7 18.0057 6.55 18.0057 6ZM19.9457 21.33C20.1257 20.81 19.8557 20.24 19.3357 20.05C14.5457 18.35 9.45572 18.35 4.66572 20.05C4.14572 20.23 3.87572 20.81 4.05572 21.33C4.23572 21.85 4.80572 22.12 5.33572 21.94C9.69572 20.4 14.3057 20.4 18.6657 21.94C18.7757 21.98 18.8857 22 18.9957 22C19.4057 22 19.7957 21.74 19.9357 21.33H19.9457Z"></path></svg>',
		"smiley-rate6-24x24":
			'<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M7 7C6.45 7 6 6.55 6 6V2C6 1.45 6.45 1 7 1C7.55 1 8 1.45 8 2V6C8 6.55 7.55 7 7 7ZM18 6V2C18 1.45 17.55 1 17 1C16.45 1 16 1.45 16 2V6C16 6.55 16.45 7 17 7C17.55 7 18 6.55 18 6ZM21 21C21 20.45 20.55 20 20 20H4C3.45 20 3 20.45 3 21C3 21.55 3.45 22 4 22H20C20.55 22 21 21.55 21 21Z"></path></svg>',
		"smiley-rate7-24x24":
			'<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12.0022 23.99C11.452 23.99 11.0018 23.5402 11.0018 22.9904C11.0018 22.4407 11.452 21.9909 12.0022 21.9909C16.3137 21.9909 21.0755 19.472 22.0158 13.8344C22.1058 13.2947 22.616 12.9248 23.1662 13.0148C23.7064 13.1047 24.0765 13.6245 23.9865 14.1643C22.8561 20.9513 17.144 24 11.9922 24L12.0022 23.99ZM8.00072 5.99783V1.99957C8.00072 1.4498 7.55056 1 7.00036 1C6.45016 1 6 1.4498 6 1.99957V5.99783C6 6.54759 6.45016 6.99739 7.00036 6.99739C7.55056 6.99739 8.00072 6.54759 8.00072 5.99783ZM18.0043 5.99783V1.99957C18.0043 1.4498 17.5542 1 17.004 1C16.4538 1 16.0036 1.4498 16.0036 1.99957V5.99783C16.0036 6.54759 16.4538 6.99739 17.004 6.99739C17.5542 6.99739 18.0043 6.54759 18.0043 5.99783Z"></path></svg>',
		"smiley-rate8-24x24":
			'<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12.01 24C6.85721 24 1.15412 20.96 0.0134987 14.16C-0.0765501 13.62 0.293651 13.1 0.833944 13.01C1.38424 12.92 1.89452 13.29 1.98457 13.83C2.92508 19.47 7.69767 21.99 12 21.99C16.3023 21.99 21.0749 19.47 22.0154 13.83C22.1055 13.29 22.6158 12.92 23.1661 13.01C23.7063 13.1 24.0765 13.62 23.9865 14.16C22.8559 20.95 17.1428 24 11.99 24H12.01ZM8.00783 6V2C8.00783 1.45 7.55759 1 7.00729 1C6.45699 1 6.00675 1.45 6.00675 2V6C6.00675 6.55 6.45699 7 7.00729 7C7.55759 7 8.00783 6.55 8.00783 6ZM18.0133 6V2C18.0133 1.45 17.563 1 17.0127 1C16.4624 1 16.0122 1.45 16.0122 2V6C16.0122 6.55 16.4624 7 17.0127 7C17.563 7 18.0133 6.55 18.0133 6Z"></path></svg>',
		"smiley-rate9-24x24":
			'<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12.01 24C6.85767 24 1.15509 20.96 0.0145752 14.16C-0.0354475 13.87 0.0445888 13.57 0.234675 13.35C0.424761 13.13 0.704888 13 0.995019 13H23.005C23.2951 13 23.5752 13.13 23.7653 13.35C23.9554 13.57 24.0354 13.87 23.9854 14.16C22.8549 20.95 17.1423 24 11.99 24H12.01ZM2.25559 15C3.61621 19.82 8.0182 22 12.01 22C16.0018 22 20.4038 19.82 21.7644 15H2.25559ZM8.00819 6V2C8.00819 1.45 7.55799 1 7.00774 1C6.45749 1 6.00729 1.45 6.00729 2V6C6.00729 6.55 6.45749 7 7.00774 7C7.55799 7 8.00819 6.55 8.00819 6ZM18.0127 6V2C18.0127 1.45 17.5625 1 17.0123 1C16.462 1 16.0118 1.45 16.0118 2V6C16.0118 6.55 16.462 7 17.0123 7C17.5625 7 18.0127 6.55 18.0127 6Z"></path></svg>',
	};
	/*!
	 * surveyjs - Survey JavaScript library v2.5.6
	 * Copyright (c) 2015-2026 Devsoft Baltic OÜ  - http://surveyjs.io/
	 * License: MIT (http://www.opensource.org/licenses/mit-license.php)
	 */ var P = {
		modernbooleancheckchecked:
			'<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><polygon points="19,10 14,10 14,5 10,5 10,10 5,10 5,14 10,14 10,19 14,19 14,14 19,14 "></polygon></svg>',
		modernbooleancheckind:
			'<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><path d="M22,0H2C0.9,0,0,0.9,0,2v20c0,1.1,0.9,2,2,2h20c1.1,0,2-0.9,2-2V2C24,0.9,23.1,0,22,0z M21,18L6,3h15V18z M3,6l15,15H3V6z"></path></svg>',
		modernbooleancheckunchecked:
			'<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><rect x="5" y="10" width="14" height="4"></rect></svg>',
		moderncheck:
			'<svg viewBox="0 0 24 24"><path d="M5,13l2-2l3,3l7-7l2,2l-9,9L5,13z"></path></svg>',
		modernradio: '<svg viewBox="-12 -12 24 24"><circle r="6" cx="0" cy="0"></circle></svg>',
		progressbutton:
			'<svg viewBox="0 0 10 10"><polygon points="2,2 0,4 5,9 10,4 8,2 5,5 "></polygon></svg>',
		removefile:
			'<svg viewBox="0 0 16 16"><path d="M8,2C4.7,2,2,4.7,2,8s2.7,6,6,6s6-2.7,6-6S11.3,2,8,2z M11,10l-1,1L8,9l-2,2l-1-1l2-2L5,6l1-1l2,2l2-2l1,1L9,8 L11,10z"></path></svg>',
		timercircle:
			'<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 160 160"><circle cx="80" cy="80" r="70" style="stroke: var(--sd-timer-stroke-background-color); stroke-width: var(--sd-timer-stroke-background-width)" stroke-dasharray="none" stroke-dashoffset="none"></circle><circle cx="80" cy="80" r="70"></circle></svg>',
		"add-24x24":
			'<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M15.75 12C15.75 12.41 15.41 12.75 15 12.75H12.75V15C12.75 15.41 12.41 15.75 12 15.75C11.59 15.75 11.25 15.41 11.25 15V12.75H9C8.59 12.75 8.25 12.41 8.25 12C8.25 11.59 8.59 11.25 9 11.25H11.25V9C11.25 8.59 11.59 8.25 12 8.25C12.41 8.25 12.75 8.59 12.75 9V11.25H15C15.41 11.25 15.75 11.59 15.75 12ZM21.75 12C21.75 17.38 17.38 21.75 12 21.75C6.62 21.75 2.25 17.38 2.25 12C2.25 6.62 6.62 2.25 12 2.25C17.38 2.25 21.75 6.62 21.75 12ZM20.25 12C20.25 7.45 16.55 3.75 12 3.75C7.45 3.75 3.75 7.45 3.75 12C3.75 16.55 7.45 20.25 12 20.25C16.55 20.25 20.25 16.55 20.25 12Z"></path></svg>',
		"arrowleft-16x16":
			'<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M14.7475 7.9975C14.7475 8.4075 14.4075 8.7475 13.9975 8.7475H3.8075L7.5275 12.4675C7.8175 12.7575 7.8175 13.2375 7.5275 13.5275C7.3775 13.6775 7.1875 13.7475 6.9975 13.7475C6.8075 13.7475 6.6175 13.6775 6.4675 13.5275L1.4675 8.5275C1.1775 8.2375 1.1775 7.7575 1.4675 7.4675L6.4675 2.4675C6.7575 2.1775 7.2375 2.1775 7.5275 2.4675C7.8175 2.7575 7.8175 3.2375 7.5275 3.5275L3.8075 7.2475H13.9975C14.4075 7.2475 14.7475 7.5875 14.7475 7.9975Z"></path></svg>',
		"arrowright-16x16":
			'<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M14.53 8.5275L9.53 13.5275C9.38 13.6775 9.19 13.7475 9 13.7475C8.81 13.7475 8.62 13.6775 8.47 13.5275C8.18 13.2375 8.18 12.7575 8.47 12.4675L12.19 8.7475H2C1.59 8.7475 1.25 8.4075 1.25 7.9975C1.25 7.5875 1.59 7.2475 2 7.2475H12.19L8.47 3.5275C8.18 3.2375 8.18 2.7575 8.47 2.4675C8.76 2.1775 9.24 2.1775 9.53 2.4675L14.53 7.4675C14.82 7.7575 14.82 8.2375 14.53 8.5275Z"></path></svg>',
		"camera-24x24":
			'<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M19.19 4.25H17.12C16.72 4.25 16.35 4.03 16.17 3.67C15.73 2.8 14.86 2.25 13.88 2.25H10.12C9.14 2.25 8.27 2.79 7.83 3.67C7.65 4.03 7.29 4.25 6.88 4.25H4.81C3.4 4.25 2.25 5.4 2.25 6.81V18.19C2.25 19.6 3.4 20.75 4.81 20.75H19.19C20.6 20.75 21.75 19.6 21.75 18.19V6.81C21.75 5.4 20.6 4.25 19.19 4.25ZM20.25 18.19C20.25 18.77 19.78 19.25 19.19 19.25H4.81C4.23 19.25 3.75 18.78 3.75 18.19V6.81C3.75 6.23 4.22 5.75 4.81 5.75H6.88C7.86 5.75 8.73 5.21 9.17 4.33C9.35 3.97 9.71 3.75 10.12 3.75H13.88C14.28 3.75 14.65 3.97 14.83 4.33C15.27 5.2 16.14 5.75 17.12 5.75H19.19C19.77 5.75 20.25 6.22 20.25 6.81V18.19ZM12 6.25C8.83 6.25 6.25 8.83 6.25 12C6.25 15.17 8.83 17.75 12 17.75C15.17 17.75 17.75 15.17 17.75 12C17.75 8.83 15.17 6.25 12 6.25ZM12 16.25C9.66 16.25 7.75 14.34 7.75 12C7.75 9.66 9.66 7.75 12 7.75C14.34 7.75 16.25 9.66 16.25 12C16.25 14.34 14.34 16.25 12 16.25ZM14.75 12C14.75 13.52 13.52 14.75 12 14.75C11.59 14.75 11.25 14.41 11.25 14C11.25 13.59 11.59 13.25 12 13.25C12.69 13.25 13.25 12.69 13.25 12C13.25 11.59 13.59 11.25 14 11.25C14.41 11.25 14.75 11.59 14.75 12Z"></path></svg>',
		"camera-32x32":
			'<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M25 7.25H22.19C21.73 7.25 21.31 7 21.09 6.59L20.89 6.22C20.23 5.01 18.97 4.25 17.59 4.25H14.41C13.03 4.25 11.77 5 11.11 6.22L10.91 6.6C10.69 7 10.27 7.26 9.81 7.26H7C4.93 7.26 3.25 8.94 3.25 11.01V24.01C3.25 26.08 4.93 27.76 7 27.76H25C27.07 27.76 28.75 26.08 28.75 24.01V11C28.75 8.93 27.07 7.25 25 7.25ZM27.25 24C27.25 25.24 26.24 26.25 25 26.25H7C5.76 26.25 4.75 25.24 4.75 24V11C4.75 9.76 5.76 8.75 7 8.75H9.81C10.82 8.75 11.75 8.2 12.23 7.31L12.43 6.94C12.82 6.21 13.58 5.76 14.41 5.76H17.59C18.42 5.76 19.18 6.21 19.57 6.94L19.77 7.31C20.25 8.2 21.18 8.76 22.19 8.76H25C26.24 8.76 27.25 9.77 27.25 11.01V24.01V24ZM16 10.25C12.28 10.25 9.25 13.28 9.25 17C9.25 20.72 12.28 23.75 16 23.75C19.72 23.75 22.75 20.72 22.75 17C22.75 13.28 19.72 10.25 16 10.25ZM16 22.25C13.11 22.25 10.75 19.89 10.75 17C10.75 14.11 13.11 11.75 16 11.75C18.89 11.75 21.25 14.11 21.25 17C21.25 19.89 18.89 22.25 16 22.25ZM19.75 17C19.75 19.07 18.07 20.75 16 20.75C15.59 20.75 15.25 20.41 15.25 20C15.25 19.59 15.59 19.25 16 19.25C17.24 19.25 18.25 18.24 18.25 17C18.25 16.59 18.59 16.25 19 16.25C19.41 16.25 19.75 16.59 19.75 17Z"></path></svg>',
		"cancel-24x24":
			'<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12.8099 11.75L15.2799 9.28C15.5699 8.99 15.5699 8.51 15.2799 8.22C14.9899 7.93 14.5099 7.93 14.2199 8.22L11.7499 10.69L9.27994 8.22C8.98994 7.93 8.50994 7.93 8.21994 8.22C7.92994 8.51 7.92994 8.99 8.21994 9.28L10.6899 11.75L8.21994 14.22C7.92994 14.51 7.92994 14.99 8.21994 15.28C8.36994 15.43 8.55994 15.5 8.74994 15.5C8.93994 15.5 9.12994 15.43 9.27994 15.28L11.7499 12.81L14.2199 15.28C14.3699 15.43 14.5599 15.5 14.7499 15.5C14.9399 15.5 15.1299 15.43 15.2799 15.28C15.5699 14.99 15.5699 14.51 15.2799 14.22L12.8099 11.75Z"></path></svg>',
		"check-16x16":
			'<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M14.0275 5.0275L6.5275 12.5275C6.3775 12.6775 6.1875 12.7475 5.9975 12.7475C5.8075 12.7475 5.6175 12.6775 5.4675 12.5275L2.4675 9.5275C2.1775 9.2375 2.1775 8.7575 2.4675 8.4675C2.7575 8.1775 3.2375 8.1775 3.5275 8.4675L5.9975 10.9375L12.9675 3.9675C13.2575 3.6775 13.7375 3.6775 14.0275 3.9675C14.3175 4.2575 14.3175 4.7375 14.0275 5.0275Z"></path></svg>',
		"check-24x24":
			'<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M19.5275 7.5275L9.5275 17.5275C9.3775 17.6775 9.1875 17.7475 8.9975 17.7475C8.8075 17.7475 8.6175 17.6775 8.4675 17.5275L4.4675 13.5275C4.1775 13.2375 4.1775 12.7575 4.4675 12.4675C4.7575 12.1775 5.2375 12.1775 5.5275 12.4675L8.9975 15.9375L18.4675 6.4675C18.7575 6.1775 19.2375 6.1775 19.5275 6.4675C19.8175 6.7575 19.8175 7.2375 19.5275 7.5275Z"></path></svg>',
		"chevrondown-24x24":
			'<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M16.5275 10.5275L12.5275 14.5275C12.3775 14.6775 12.1875 14.7475 11.9975 14.7475C11.8075 14.7475 11.6175 14.6775 11.4675 14.5275L7.4675 10.5275C7.1775 10.2375 7.1775 9.7575 7.4675 9.4675C7.7575 9.1775 8.2375 9.1775 8.5275 9.4675L11.9975 12.9375L15.4675 9.4675C15.7575 9.1775 16.2375 9.1775 16.5275 9.4675C16.8175 9.7575 16.8175 10.2375 16.5275 10.5275Z"></path></svg>',
		"chevronright-16x16":
			'<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M11.35 8.34627L7.35 12.3463C7.25 12.4463 7.12 12.4963 7 12.4963C6.88 12.4963 6.74 12.4463 6.65 12.3463C6.45 12.1463 6.45 11.8363 6.65 11.6363L10.3 7.98627L6.65 4.34627C6.45 4.15627 6.45 3.83627 6.65 3.64627C6.85 3.45627 7.16 3.44627 7.35 3.64627L11.35 7.64627C11.55 7.84627 11.55 8.15627 11.35 8.35627V8.34627Z"></path></svg>',
		"clear-16x16":
			'<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M12.35 11.65C12.55 11.85 12.55 12.16 12.35 12.36C12.25 12.46 12.12 12.51 12 12.51C11.88 12.51 11.74 12.46 11.65 12.36L8 8.71L4.35 12.36C4.25 12.46 4.12 12.51 4 12.51C3.88 12.51 3.74 12.46 3.65 12.36C3.45 12.16 3.45 11.85 3.65 11.65L7.3 8L3.65 4.35C3.45 4.16 3.45 3.84 3.65 3.65C3.85 3.46 4.16 3.45 4.35 3.65L8 7.3L11.65 3.65C11.85 3.45 12.16 3.45 12.36 3.65C12.56 3.85 12.56 4.16 12.36 4.36L8.71 8.01L12.36 11.66L12.35 11.65Z"></path></svg>',
		"clear-24x24":
			'<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20.12 10.9325C20.64 10.4125 20.93 9.7225 20.93 8.9925C20.93 8.2625 20.64 7.5725 20.12 7.0525L16.95 3.8825C15.88 2.8125 14.13 2.8125 13.06 3.8825L3.88 13.0525C3.36 13.5725 3.07 14.2625 3.07 14.9925C3.07 15.7225 3.36 16.4125 3.88 16.9325L5.64 18.6925C6.57 19.6225 7.78 20.0825 9 20.0825C10.22 20.0825 11.43 19.6225 12.36 18.6925L20.12 10.9325ZM14.12 4.9325C14.36 4.6925 14.67 4.5625 15 4.5625C15.33 4.5625 15.65 4.6925 15.88 4.9325L19.05 8.1025C19.54 8.5925 19.54 9.3825 19.05 9.8725L12.99 15.9325L8.05 10.9925L14.12 4.9325ZM6.7 17.6325L4.94 15.8725C4.45 15.3825 4.45 14.5925 4.94 14.1025L7 12.0425L11.94 16.9825L11.3 17.6225C10.07 18.8525 7.93 18.8525 6.7 17.6225V17.6325ZM22.75 20.9925C22.75 21.4025 22.41 21.7425 22 21.7425H14C13.59 21.7425 13.25 21.4025 13.25 20.9925C13.25 20.5825 13.59 20.2425 14 20.2425H22C22.41 20.2425 22.75 20.5825 22.75 20.9925ZM4.75 20.9925C4.75 21.4025 4.41 21.7425 4 21.7425H2C1.59 21.7425 1.25 21.4025 1.25 20.9925C1.25 20.5825 1.59 20.2425 2 20.2425H4C4.41 20.2425 4.75 20.5825 4.75 20.9925Z"></path></svg>',
		"close-16x16":
			'<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M13.5275 12.4675C13.8175 12.7575 13.8175 13.2375 13.5275 13.5275C13.3775 13.6775 13.1875 13.7475 12.9975 13.7475C12.8075 13.7475 12.6175 13.6775 12.4675 13.5275L7.9975 9.0575L3.5275 13.5275C3.3775 13.6775 3.1875 13.7475 2.9975 13.7475C2.8075 13.7475 2.6175 13.6775 2.4675 13.5275C2.1775 13.2375 2.1775 12.7575 2.4675 12.4675L6.9375 7.9975L2.4675 3.5275C2.1775 3.2375 2.1775 2.7575 2.4675 2.4675C2.7575 2.1775 3.2375 2.1775 3.5275 2.4675L7.9975 6.9375L12.4675 2.4675C12.7575 2.1775 13.2375 2.1775 13.5275 2.4675C13.8175 2.7575 13.8175 3.2375 13.5275 3.5275L9.0575 7.9975L13.5275 12.4675Z"></path></svg>',
		"close-24x24":
			'<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M19.5275 18.4675C19.8175 18.7575 19.8175 19.2375 19.5275 19.5275C19.3775 19.6775 19.1875 19.7475 18.9975 19.7475C18.8075 19.7475 18.6175 19.6775 18.4675 19.5275L11.9975 13.0575L5.5275 19.5275C5.3775 19.6775 5.1875 19.7475 4.9975 19.7475C4.8075 19.7475 4.6175 19.6775 4.4675 19.5275C4.1775 19.2375 4.1775 18.7575 4.4675 18.4675L10.9375 11.9975L4.4675 5.5275C4.1775 5.2375 4.1775 4.7575 4.4675 4.4675C4.7575 4.1775 5.2375 4.1775 5.5275 4.4675L11.9975 10.9375L18.4675 4.4675C18.7575 4.1775 19.2375 4.1775 19.5275 4.4675C19.8175 4.7575 19.8175 5.2375 19.5275 5.5275L13.0575 11.9975L19.5275 18.4675Z"></path></svg>',
		"collapse-16x16":
			'<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M11.75 8C11.75 8.41 11.41 8.75 11 8.75H5C4.59 8.75 4.25 8.41 4.25 8C4.25 7.59 4.59 7.25 5 7.25H11C11.41 7.25 11.75 7.59 11.75 8Z"></path></svg>',
		"collapsedetails-16x16":
			'<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M11.75 8C11.75 8.41 11.41 8.75 11 8.75H5C4.59 8.75 4.25 8.41 4.25 8C4.25 7.59 4.59 7.25 5 7.25H11C11.41 7.25 11.75 7.59 11.75 8Z"></path></svg>',
		"delete-16x16":
			'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M13 3.25H10.75V3C10.75 2.04 9.96 1.25 9 1.25H7C6.04 1.25 5.25 2.04 5.25 3V3.25H3C2.59 3.25 2.25 3.59 2.25 4C2.25 4.41 2.59 4.75 3 4.75H3.25V13C3.25 13.96 4.04 14.75 5 14.75H11C11.96 14.75 12.75 13.96 12.75 13V4.75H13C13.41 4.75 13.75 4.41 13.75 4C13.75 3.59 13.41 3.25 13 3.25ZM6.75 3C6.75 2.86 6.86 2.75 7 2.75H9C9.14 2.75 9.25 2.86 9.25 3V3.25H6.75V3ZM11.25 13C11.25 13.14 11.14 13.25 11 13.25H5C4.86 13.25 4.75 13.14 4.75 13V4.75H11.25V13ZM9.25 6.25C9.66 6.25 10 6.59 10 7V11C10 11.41 9.66 11.75 9.25 11.75C8.84 11.75 8.5 11.41 8.5 11V7C8.5 6.59 8.84 6.25 9.25 6.25ZM7.5 7V11C7.5 11.41 7.16 11.75 6.75 11.75C6.34 11.75 6 11.41 6 11V7C6 6.59 6.34 6.25 6.75 6.25C7.16 6.25 7.5 6.59 7.5 7Z"></path></svg>',
		"delete-24x24":
			'<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12.75 9V17C12.75 17.41 12.41 17.75 12 17.75C11.59 17.75 11.25 17.41 11.25 17V9C11.25 8.59 11.59 8.25 12 8.25C12.41 8.25 12.75 8.59 12.75 9ZM14.25 9V17C14.25 17.41 14.59 17.75 15 17.75C15.41 17.75 15.75 17.41 15.75 17V9C15.75 8.59 15.41 8.25 15 8.25C14.59 8.25 14.25 8.59 14.25 9ZM9 8.25C8.59 8.25 8.25 8.59 8.25 9V17C8.25 17.41 8.59 17.75 9 17.75C9.41 17.75 9.75 17.41 9.75 17V9C9.75 8.59 9.41 8.25 9 8.25ZM20.75 6C20.75 6.41 20.41 6.75 20 6.75H18.75V18C18.75 19.52 17.52 20.75 16 20.75H8C6.48 20.75 5.25 19.52 5.25 18V6.75H4C3.59 6.75 3.25 6.41 3.25 6C3.25 5.59 3.59 5.25 4 5.25H8.25V4C8.25 3.04 9.04 2.25 10 2.25H14C14.96 2.25 15.75 3.04 15.75 4V5.25H20C20.41 5.25 20.75 5.59 20.75 6ZM9.75 5.25H14.25V4C14.25 3.86 14.14 3.75 14 3.75H10C9.86 3.75 9.75 3.86 9.75 4V5.25ZM17.25 6.75H6.75V18C6.75 18.69 7.31 19.25 8 19.25H16C16.69 19.25 17.25 18.69 17.25 18V6.75Z"></path></svg>',
		"drag-24x24":
			'<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M14.5 8.75C15.19 8.75 15.75 8.19 15.75 7.5C15.75 6.81 15.19 6.25 14.5 6.25C13.81 6.25 13.25 6.81 13.25 7.5C13.25 8.19 13.81 8.75 14.5 8.75ZM14.5 7.25C14.64 7.25 14.75 7.36 14.75 7.5C14.75 7.78 14.25 7.78 14.25 7.5C14.25 7.36 14.36 7.25 14.5 7.25ZM9.5 6.25C8.81 6.25 8.25 6.81 8.25 7.5C8.25 8.19 8.81 8.75 9.5 8.75C10.19 8.75 10.75 8.19 10.75 7.5C10.75 6.81 10.19 6.25 9.5 6.25ZM9.25 7.5C9.25 7.36 9.36 7.25 9.5 7.25C9.64 7.25 9.75 7.36 9.75 7.5C9.75 7.78 9.25 7.78 9.25 7.5ZM14.5 11.25C13.81 11.25 13.25 11.81 13.25 12.5C13.25 13.19 13.81 13.75 14.5 13.75C15.19 13.75 15.75 13.19 15.75 12.5C15.75 11.81 15.19 11.25 14.5 11.25ZM14.25 12.5C14.25 12.36 14.36 12.25 14.5 12.25C14.64 12.25 14.75 12.36 14.75 12.5C14.75 12.78 14.25 12.78 14.25 12.5ZM9.5 11.25C8.81 11.25 8.25 11.81 8.25 12.5C8.25 13.19 8.81 13.75 9.5 13.75C10.19 13.75 10.75 13.19 10.75 12.5C10.75 11.81 10.19 11.25 9.5 11.25ZM9.25 12.5C9.25 12.36 9.36 12.25 9.5 12.25C9.64 12.25 9.75 12.36 9.75 12.5C9.75 12.78 9.25 12.78 9.25 12.5ZM14.5 16.25C13.81 16.25 13.25 16.81 13.25 17.5C13.25 18.19 13.81 18.75 14.5 18.75C15.19 18.75 15.75 18.19 15.75 17.5C15.75 16.81 15.19 16.25 14.5 16.25ZM14.25 17.5C14.25 17.36 14.36 17.25 14.5 17.25C14.64 17.25 14.75 17.36 14.75 17.5C14.75 17.78 14.25 17.78 14.25 17.5ZM9.5 16.25C8.81 16.25 8.25 16.81 8.25 17.5C8.25 18.19 8.81 18.75 9.5 18.75C10.19 18.75 10.75 18.19 10.75 17.5C10.75 16.81 10.19 16.25 9.5 16.25ZM9.25 17.5C9.25 17.36 9.36 17.25 9.5 17.25C9.64 17.25 9.75 17.36 9.75 17.5C9.75 17.78 9.25 17.78 9.25 17.5Z"></path></svg>',
		"draghorizontal-24x16":
			'<svg viewBox="0 0 24 16" xmlns="http://www.w3.org/2000/svg"><path d="M17.5 9.25C16.81 9.25 16.25 9.81 16.25 10.5C16.25 11.19 16.81 11.75 17.5 11.75C18.19 11.75 18.75 11.19 18.75 10.5C18.75 9.81 18.19 9.25 17.5 9.25ZM17.25 10.5C17.25 10.36 17.36 10.25 17.5 10.25C17.64 10.25 17.75 10.36 17.75 10.5C17.75 10.78 17.25 10.78 17.25 10.5ZM17.5 6.75C18.19 6.75 18.75 6.19 18.75 5.5C18.75 4.81 18.19 4.25 17.5 4.25C16.81 4.25 16.25 4.81 16.25 5.5C16.25 6.19 16.81 6.75 17.5 6.75ZM17.5 5.25C17.64 5.25 17.75 5.36 17.75 5.5C17.75 5.78 17.25 5.78 17.25 5.5C17.25 5.36 17.36 5.25 17.5 5.25ZM12.5 9.25C11.81 9.25 11.25 9.81 11.25 10.5C11.25 11.19 11.81 11.75 12.5 11.75C13.19 11.75 13.75 11.19 13.75 10.5C13.75 9.81 13.19 9.25 12.5 9.25ZM12.25 10.5C12.25 10.36 12.36 10.25 12.5 10.25C12.64 10.25 12.75 10.36 12.75 10.5C12.75 10.78 12.25 10.78 12.25 10.5ZM12.5 4.25C11.81 4.25 11.25 4.81 11.25 5.5C11.25 6.19 11.81 6.75 12.5 6.75C13.19 6.75 13.75 6.19 13.75 5.5C13.75 4.81 13.19 4.25 12.5 4.25ZM12.25 5.5C12.25 5.36 12.36 5.25 12.5 5.25C12.64 5.25 12.75 5.36 12.75 5.5C12.75 5.78 12.25 5.78 12.25 5.5ZM7.5 9.25C6.81 9.25 6.25 9.81 6.25 10.5C6.25 11.19 6.81 11.75 7.5 11.75C8.19 11.75 8.75 11.19 8.75 10.5C8.75 9.81 8.19 9.25 7.5 9.25ZM7.25 10.5C7.25 10.36 7.36 10.25 7.5 10.25C7.64 10.25 7.75 10.36 7.75 10.5C7.75 10.78 7.25 10.78 7.25 10.5ZM7.5 4.25C6.81 4.25 6.25 4.81 6.25 5.5C6.25 6.19 6.81 6.75 7.5 6.75C8.19 6.75 8.75 6.19 8.75 5.5C8.75 4.81 8.19 4.25 7.5 4.25ZM7.25 5.5C7.25 5.36 7.36 5.25 7.5 5.25C7.64 5.25 7.75 5.36 7.75 5.5C7.75 5.78 7.25 5.78 7.25 5.5Z"></path></svg>',
		"editsmall-16x16":
			'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M13.1209 3.05249L12.9509 2.88249C11.8809 1.81249 10.1309 1.81249 9.06089 2.88249L3.47089 8.46249C3.37089 8.56249 3.31089 8.68249 3.27089 8.81249L2.27089 12.8125C2.21089 13.0625 2.28089 13.3425 2.47089 13.5225C2.61089 13.6625 2.80089 13.7425 3.00089 13.7425C3.06089 13.7425 3.12089 13.7425 3.18089 13.7225L7.18089 12.7225C7.31089 12.6925 7.43089 12.6225 7.53089 12.5225L13.1209 6.93249C14.1909 5.86249 14.1909 4.11249 13.1209 3.04249V3.05249ZM6.62089 11.3125L4.04089 11.9625L4.69089 9.38249L8.01089 6.06249L9.95089 8.00249L6.63089 11.3225L6.62089 11.3125ZM12.0609 5.87249L11.0009 6.93249L9.06089 4.99249L10.1209 3.93249C10.6109 3.44249 11.4009 3.44249 11.8909 3.93249L12.0609 4.10249C12.5509 4.59249 12.5509 5.38249 12.0609 5.87249Z"></path></svg>',
		"expand-16x16":
			'<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M11.75 8C11.75 8.41 11.41 8.75 11 8.75H8.75V11C8.75 11.41 8.41 11.75 8 11.75C7.59 11.75 7.25 11.41 7.25 11V8.75H5C4.59 8.75 4.25 8.41 4.25 8C4.25 7.59 4.59 7.25 5 7.25H7.25V5C7.25 4.59 7.59 4.25 8 4.25C8.41 4.25 8.75 4.59 8.75 5V7.25H11C11.41 7.25 11.75 7.59 11.75 8Z"></path></svg>',
		"expanddetails-16x16":
			'<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M11.75 8C11.75 8.41 11.41 8.75 11 8.75H8.75V11C8.75 11.41 8.41 11.75 8 11.75C7.59 11.75 7.25 11.41 7.25 11V8.75H5C4.59 8.75 4.25 8.41 4.25 8C4.25 7.59 4.59 7.25 5 7.25H7.25V5C7.25 4.59 7.59 4.25 8 4.25C8.41 4.25 8.75 4.59 8.75 5V7.25H11C11.41 7.25 11.75 7.59 11.75 8Z"></path></svg>',
		"file-72x72":
			'<svg viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg"><path d="M62.83 12.83L53.17 3.17C52.7982 2.79866 52.357 2.50421 51.8714 2.30346C51.3858 2.1027 50.8654 1.99959 50.34 2H14C12.4087 2 10.8826 2.63214 9.75735 3.75736C8.63214 4.88258 8 6.4087 8 8V64C8 65.5913 8.63214 67.1174 9.75735 68.2426C10.8826 69.3679 12.4087 70 14 70H58C59.5913 70 61.1174 69.3679 62.2426 68.2426C63.3679 67.1174 64 65.5913 64 64V15.66C64.0004 15.1346 63.8973 14.6142 63.6965 14.1286C63.4958 13.643 63.2013 13.2018 62.83 12.83ZM52 4.83L61.17 14H56C54.9391 14 53.9217 13.5786 53.1716 12.8284C52.4214 12.0783 52 11.0609 52 10V4.83ZM62 64C62 65.0609 61.5786 66.0783 60.8284 66.8284C60.0783 67.5786 59.0609 68 58 68H14C12.9391 68 11.9217 67.5786 11.1716 66.8284C10.4214 66.0783 10 65.0609 10 64V8C10 6.93914 10.4214 5.92172 11.1716 5.17157C11.9217 4.42143 12.9391 4 14 4H50V10C50 11.5913 50.6321 13.1174 51.7574 14.2426C52.8826 15.3679 54.4087 16 56 16H62V64ZM22 26H50V28H22V26ZM22 32H50V34H22V32ZM22 38H50V40H22V38ZM22 44H50V46H22V44Z"></path></svg>',
		"flip-24x24":
			'<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M14.53 17.4775C14.82 17.7675 14.82 18.2475 14.53 18.5375L11.53 21.5375C11.38 21.6875 11.19 21.7575 11 21.7575C10.81 21.7575 10.62 21.6875 10.47 21.5375C10.18 21.2475 10.18 20.7675 10.47 20.4775L12.2 18.7475C12.13 18.7475 12.07 18.7475 12 18.7475C6.62 18.7475 2.25 15.7475 2.25 12.0575C2.25 10.2975 3.22 8.6375 4.99 7.3875C5.33 7.1475 5.8 7.2275 6.03 7.5675C6.27 7.9075 6.19 8.3775 5.85 8.6075C4.49 9.5675 3.74 10.7875 3.74 12.0575C3.74 14.9175 7.44 17.2475 11.99 17.2475C12.05 17.2475 12.11 17.2475 12.17 17.2475L10.46 15.5375C10.17 15.2475 10.17 14.7675 10.46 14.4775C10.75 14.1875 11.23 14.1875 11.52 14.4775L14.52 17.4775H14.53ZM12 5.2575C11.93 5.2575 11.87 5.2575 11.8 5.2575L13.53 3.5275C13.82 3.2375 13.82 2.7575 13.53 2.4675C13.24 2.1775 12.76 2.1775 12.47 2.4675L9.47 5.4675C9.18 5.7575 9.18 6.2375 9.47 6.5275L12.47 9.5275C12.62 9.6775 12.81 9.7475 13 9.7475C13.19 9.7475 13.38 9.6775 13.53 9.5275C13.82 9.2375 13.82 8.7575 13.53 8.4675L11.82 6.7575C11.88 6.7575 11.94 6.7575 12 6.7575C16.55 6.7575 20.25 9.0875 20.25 11.9475C20.25 13.2075 19.5 14.4375 18.14 15.3975C17.8 15.6375 17.72 16.1075 17.96 16.4475C18.11 16.6575 18.34 16.7675 18.57 16.7675C18.72 16.7675 18.87 16.7275 19 16.6275C20.77 15.3775 21.75 13.7175 21.75 11.9575C21.75 8.2675 17.38 5.2675 12 5.2675V5.2575Z"></path></svg>',
		"folder-24x24":
			'<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M21.72 9.24C21.45 8.92 21.12 8.67 20.75 8.5V8C20.75 6.48 19.52 5.25 18 5.25H10.65C10.32 4.1 9.26 3.25 8 3.25H6C4.48 3.25 3.25 4.48 3.25 6V18C3.25 19.52 4.48 20.75 6 20.75H18.33C19.66 20.75 20.8 19.8 21.04 18.49L22.31 11.49C22.46 10.69 22.24 9.86 21.72 9.24ZM4.75 18V6C4.75 5.31 5.31 4.75 6 4.75H8C8.69 4.75 9.25 5.31 9.25 6C9.25 6.41 9.59 6.75 10 6.75H18C18.69 6.75 19.25 7.31 19.25 8V8.25H9.27C7.94 8.25 6.8 9.2 6.56 10.51L5.29 17.51C5.19 18.07 5.27 18.64 5.51 19.15C5.06 18.96 4.75 18.52 4.75 18ZM20.83 11.22L19.56 18.22C19.45 18.81 18.94 19.25 18.33 19.25H8C7.63 19.25 7.28 19.09 7.04 18.8C6.8 18.51 6.7 18.14 6.77 17.78L8.04 10.78C8.15 10.19 8.66 9.75 9.27 9.75H19.6C19.97 9.75 20.32 9.91 20.56 10.2C20.8 10.49 20.9 10.86 20.83 11.22Z"></path></svg>',
		"fullsize-16x16":
			'<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M12 3.25H4C3.04 3.25 2.25 4.04 2.25 5V11C2.25 11.96 3.04 12.75 4 12.75H12C12.96 12.75 13.75 11.96 13.75 11V5C13.75 4.04 12.96 3.25 12 3.25ZM12.25 11C12.25 11.14 12.14 11.25 12 11.25H4C3.86 11.25 3.75 11.14 3.75 11V5C3.75 4.86 3.86 4.75 4 4.75H12C12.14 4.75 12.25 4.86 12.25 5V11Z"></path></svg>',
		"image-48x48":
			'<svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><path d="M33 10.25H15C12.38 10.25 10.25 12.38 10.25 15V33C10.25 35.62 12.38 37.75 15 37.75H33C35.62 37.75 37.75 35.62 37.75 33V15C37.75 12.38 35.62 10.25 33 10.25ZM36.25 33C36.25 34.79 34.79 36.25 33 36.25H15C13.21 36.25 11.75 34.79 11.75 33V15C11.75 13.21 13.21 11.75 15 11.75H33C34.79 11.75 36.25 13.21 36.25 15V33ZM30.5 14.25C28.71 14.25 27.25 15.71 27.25 17.5C27.25 19.29 28.71 20.75 30.5 20.75C32.29 20.75 33.75 19.29 33.75 17.5C33.75 15.71 32.29 14.25 30.5 14.25ZM30.5 19.25C29.54 19.25 28.75 18.46 28.75 17.5C28.75 16.54 29.54 15.75 30.5 15.75C31.46 15.75 32.25 16.54 32.25 17.5C32.25 18.46 31.46 19.25 30.5 19.25ZM29.26 26.28C28.94 25.92 28.49 25.71 28.01 25.7C27.54 25.68 27.07 25.87 26.73 26.2L24.95 27.94L22.28 25.23C21.94 24.89 21.5 24.71 21 24.71C20.52 24.71 20.06 24.93 19.74 25.28L14.74 30.78C14.25 31.3 14.12 32.06 14.41 32.72C14.69 33.36 15.28 33.75 15.95 33.75H32.07C32.74 33.75 33.33 33.35 33.61 32.72C33.89 32.06 33.77 31.31 33.29 30.79L29.27 26.29L29.26 26.28ZM32.22 32.12C32.18 32.2 32.13 32.25 32.06 32.25H15.94C15.87 32.25 15.81 32.21 15.78 32.12C15.77 32.09 15.71 31.93 15.83 31.8L20.84 26.29C20.9 26.22 20.99 26.21 21.02 26.21C21.06 26.21 21.14 26.22 21.2 26.29L24.4 29.54C24.69 29.83 25.16 29.84 25.46 29.54L27.77 27.27C27.83 27.21 27.9 27.2 27.94 27.2C28.01 27.2 28.06 27.21 28.13 27.28L32.16 31.79C32.16 31.79 32.16 31.79 32.17 31.8C32.29 31.93 32.23 32.09 32.22 32.12Z"></path></svg>',
		"loading-48x48":
			'<svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_19679_369428)"><path opacity="0.1" d="M24 40C15.18 40 8 32.82 8 24C8 15.18 15.18 8 24 8C32.82 8 40 15.18 40 24C40 32.82 32.82 40 24 40ZM24 12C17.38 12 12 17.38 12 24C12 30.62 17.38 36 24 36C30.62 36 36 30.62 36 24C36 17.38 30.62 12 24 12Z" fill="black" fill-opacity="0.91"></path><path d="M10 26C8.9 26 8 25.1 8 24C8 15.18 15.18 8 24 8C25.1 8 26 8.9 26 10C26 11.1 25.1 12 24 12C17.38 12 12 17.38 12 24C12 25.1 11.1 26 10 26Z"></path></g><defs><clipPath id="clip0_19679_369428"><rect width="32" height="32" fill="white" transform="translate(8 8)"></rect></clipPath></defs></svg>',
		"maximize-16x16":
			'<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M13.75 3V7C13.75 7.41 13.41 7.75 13 7.75C12.59 7.75 12.25 7.41 12.25 7V4.81L9.53 7.53C9.38 7.68 9.19 7.75 9 7.75C8.81 7.75 8.62 7.68 8.47 7.53C8.18 7.24 8.18 6.76 8.47 6.47L11.19 3.75H9C8.59 3.75 8.25 3.41 8.25 3C8.25 2.59 8.59 2.25 9 2.25H13C13.1 2.25 13.19 2.27 13.29 2.31C13.47 2.39 13.62 2.53 13.7 2.72C13.74 2.81 13.76 2.91 13.76 3.01L13.75 3ZM7.53 8.47C7.24 8.18 6.76 8.18 6.47 8.47L3.75 11.19V9C3.75 8.59 3.41 8.25 3 8.25C2.59 8.25 2.25 8.59 2.25 9V13C2.25 13.1 2.27 13.19 2.31 13.29C2.39 13.47 2.53 13.62 2.72 13.7C2.81 13.74 2.91 13.76 3.01 13.76H7.01C7.42 13.76 7.76 13.42 7.76 13.01C7.76 12.6 7.42 12.26 7.01 12.26H4.82L7.54 9.54C7.83 9.25 7.83 8.77 7.54 8.48L7.53 8.47Z"></path></svg>',
		"minimize-16x16":
			'<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M13.75 8C13.75 8.41 13.41 8.75 13 8.75H3C2.59 8.75 2.25 8.41 2.25 8C2.25 7.59 2.59 7.25 3 7.25H13C13.41 7.25 13.75 7.59 13.75 8Z"></path></svg>',
		"more-24x24":
			'<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 10.25C11.04 10.25 10.25 11.04 10.25 12C10.25 12.96 11.04 13.75 12 13.75C12.96 13.75 13.75 12.96 13.75 12C13.75 11.04 12.96 10.25 12 10.25ZM11.75 12C11.75 11.86 11.86 11.75 12 11.75C12.14 11.75 12.25 11.86 12.25 12C12.25 12.28 11.75 12.28 11.75 12ZM19 10.25C18.04 10.25 17.25 11.04 17.25 12C17.25 12.96 18.04 13.75 19 13.75C19.96 13.75 20.75 12.96 20.75 12C20.75 11.04 19.96 10.25 19 10.25ZM18.75 12C18.75 11.86 18.86 11.75 19 11.75C19.14 11.75 19.25 11.86 19.25 12C19.25 12.28 18.75 12.28 18.75 12ZM5 10.25C4.04 10.25 3.25 11.04 3.25 12C3.25 12.96 4.04 13.75 5 13.75C5.96 13.75 6.75 12.96 6.75 12C6.75 11.04 5.96 10.25 5 10.25ZM4.75 12C4.75 11.86 4.86 11.75 5 11.75C5.14 11.75 5.25 11.86 5.25 12C5.25 12.28 4.75 12.28 4.75 12Z"></path></svg>',
		"navmenu-24x24":
			'<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M3.25 7C3.25 6.59 3.59 6.25 4 6.25H15C15.41 6.25 15.75 6.59 15.75 7C15.75 7.41 15.41 7.75 15 7.75H4C3.59 7.75 3.25 7.41 3.25 7ZM20 11.25H4C3.59 11.25 3.25 11.59 3.25 12C3.25 12.41 3.59 12.75 4 12.75H20C20.41 12.75 20.75 12.41 20.75 12C20.75 11.59 20.41 11.25 20 11.25ZM9 16.25H4C3.59 16.25 3.25 16.59 3.25 17C3.25 17.41 3.59 17.75 4 17.75H9C9.41 17.75 9.75 17.41 9.75 17C9.75 16.59 9.41 16.25 9 16.25Z"></path></svg>',
		"noimage-48x48":
			'<svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><path d="M30.4975 14.2475C28.7075 14.2475 27.2475 15.7075 27.2475 17.4975C27.2475 19.2875 28.7075 20.7475 30.4975 20.7475C32.2875 20.7475 33.7475 19.2875 33.7475 17.4975C33.7475 15.7075 32.2875 14.2475 30.4975 14.2475ZM30.4975 19.2475C29.5375 19.2475 28.7475 18.4575 28.7475 17.4975C28.7475 16.5375 29.5375 15.7475 30.4975 15.7475C31.4575 15.7475 32.2475 16.5375 32.2475 17.4975C32.2475 18.4575 31.4575 19.2475 30.4975 19.2475ZM13.5175 11.2175C13.4375 10.8075 13.7075 10.4175 14.1175 10.3375C14.4275 10.2775 14.7175 10.2475 14.9975 10.2475H32.9975C35.6175 10.2475 37.7475 12.3775 37.7475 14.9975V32.9975C37.7475 33.2775 37.7175 33.5675 37.6575 33.8775C37.5875 34.2375 37.2775 34.4875 36.9175 34.4875C36.8675 34.4875 36.8275 34.4875 36.7775 34.4775C36.3675 34.3975 36.1075 34.0075 36.1775 33.5975C36.2175 33.3775 36.2375 33.1775 36.2375 32.9975V14.9975C36.2375 13.2075 34.7775 11.7475 32.9875 11.7475H14.9975C14.8075 11.7475 14.6175 11.7675 14.3975 11.8075C13.9875 11.8875 13.5975 11.6175 13.5175 11.2075V11.2175ZM34.4775 36.7775C34.5575 37.1875 34.2875 37.5775 33.8775 37.6575C33.5675 37.7175 33.2775 37.7475 32.9975 37.7475H14.9975C12.3775 37.7475 10.2475 35.6175 10.2475 32.9975V14.9975C10.2475 14.7175 10.2775 14.4275 10.3375 14.1175C10.4175 13.7075 10.8075 13.4375 11.2175 13.5175C11.6275 13.5975 11.8875 13.9875 11.8175 14.3975C11.7775 14.6175 11.7575 14.8175 11.7575 14.9975V32.9975C11.7575 34.7875 13.2175 36.2475 15.0075 36.2475H33.0075C33.1975 36.2475 33.3875 36.2275 33.6075 36.1875C34.0075 36.1075 34.4075 36.3775 34.4875 36.7875L34.4775 36.7775ZM15.8275 31.7975C15.6975 31.9375 15.7575 32.0875 15.7775 32.1175C15.8175 32.1975 15.8675 32.2475 15.9375 32.2475H29.8175C30.2275 32.2475 30.5675 32.5875 30.5675 32.9975C30.5675 33.4075 30.2275 33.7475 29.8175 33.7475H15.9375C15.2675 33.7475 14.6775 33.3475 14.3975 32.7175C14.1075 32.0575 14.2375 31.2975 14.7275 30.7775L19.7275 25.2775C20.0475 24.9275 20.5075 24.7175 20.9875 24.7075C21.4875 24.7275 21.9375 24.8875 22.2675 25.2275L25.4675 28.4775C25.7575 28.7675 25.7575 29.2475 25.4675 29.5375C25.1675 29.8275 24.6975 29.8275 24.4075 29.5375L21.2075 26.2875C21.1475 26.2175 21.0675 26.1875 21.0275 26.2075C20.9875 26.2075 20.9075 26.2175 20.8475 26.2875L15.8375 31.7975H15.8275ZM38.5275 38.5275C38.3775 38.6775 38.1875 38.7475 37.9975 38.7475C37.8075 38.7475 37.6175 38.6775 37.4675 38.5275L9.4675 10.5275C9.1775 10.2375 9.1775 9.7575 9.4675 9.4675C9.7575 9.1775 10.2375 9.1775 10.5275 9.4675L38.5275 37.4675C38.8175 37.7575 38.8175 38.2375 38.5275 38.5275Z"></path></svg>',
		"ranking-arrows":
			'<svg viewBox="0 0 10 24" xmlns="http://www.w3.org/2000/svg"><path d="M10 5L5 0L0 5H4V9H6V5H10Z"></path><path d="M6 19V15H4V19H0L5 24L10 19H6Z"></path></svg>',
		"rankingundefined-16x16":
			'<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M11.75 8C11.75 8.41 11.41 8.75 11 8.75H5C4.59 8.75 4.25 8.41 4.25 8C4.25 7.59 4.59 7.25 5 7.25H11C11.41 7.25 11.75 7.59 11.75 8Z"></path></svg>',
		"rating-star-2":
			'<svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><path d="M24 39.5057L11.7226 45.9839C10.4095 46.6739 8.87606 45.5622 9.12525 44.096L11.4734 30.373L1.54411 20.6556C0.480254 19.6207 1.06489 17.8095 2.53128 17.5986L16.2559 15.5957L22.3994 3.10891C23.0512 1.77685 24.9488 1.77685 25.6102 3.10891L31.7441 15.5957L45.4687 17.5986C46.9351 17.8095 47.5197 19.6207 46.4559 20.6556L36.5266 30.373L38.8748 44.096C39.1239 45.5622 37.5905 46.6835 36.2774 45.9839L24 39.5057Z" fill="none" stroke-width="2"></path><path d="M24.3981 33.1305L24 32.9206L23.6019 33.1305L15.8715 37.2059L17.3542 28.5663L17.43 28.1246L17.1095 27.8113L10.83 21.6746L19.4965 20.4049L19.9405 20.3399L20.1387 19.9373L24 12.0936L27.8613 19.9373L28.0595 20.3399L28.5035 20.4049L37.17 21.6746L30.8905 27.8113L30.57 28.1246L30.6458 28.5663L32.1285 37.2059L24.3981 33.1305Z" stroke-width="1.70746"></path></svg>',
		"rating-star-small-2":
			'<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 19.3373L6.13001 22.4373C5.50001 22.7673 4.77001 22.2373 4.89001 21.5373L6.01001 14.9773L1.26001 10.3273C0.750007 9.83728 1.03001 8.96728 1.73001 8.86728L8.29001 7.90728L11.23 1.93728C11.54 1.29728 12.45 1.29728 12.77 1.93728L15.7 7.90728L22.26 8.86728C22.96 8.96728 23.24 9.83728 22.73 10.3273L17.98 14.9773L19.1 21.5373C19.22 22.2373 18.49 22.7773 17.86 22.4373L11.99 19.3373H12Z" fill="none" stroke-width="2"></path><path d="M12 15.9472L8.58001 17.7572L9.23001 13.9272L6.45001 11.2072L10.29 10.6472L12 7.17725L13.71 10.6472L17.55 11.2072L14.77 13.9272L15.42 17.7572L12 15.9472Z"></path></svg>',
		"rating-star-small":
			'<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g><path d="M12 19.3373L6.13001 22.4373C5.50001 22.7673 4.77001 22.2373 4.89001 21.5373L6.01001 14.9773L1.26001 10.3273C0.750007 9.83728 1.03001 8.96728 1.73001 8.86728L8.29001 7.90728L11.23 1.93728C11.54 1.29728 12.45 1.29728 12.77 1.93728L15.7 7.90728L22.26 8.86728C22.96 8.96728 23.24 9.83728 22.73 10.3273L17.98 14.9773L19.1 21.5373C19.22 22.2373 18.49 22.7773 17.86 22.4373L11.99 19.3373H12Z"></path></g></svg>',
		"rating-star":
			'<svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><g><path d="M24 39.5057L11.7226 45.9839C10.4095 46.6739 8.87606 45.5622 9.12525 44.096L11.4734 30.373L1.54411 20.6556C0.480254 19.6207 1.06489 17.8095 2.53128 17.5986L16.2559 15.5957L22.3994 3.10891C23.0512 1.77685 24.9488 1.77685 25.6102 3.10891L31.7441 15.5957L45.4687 17.5986C46.9351 17.8095 47.5197 19.6207 46.4559 20.6556L36.5266 30.373L38.8748 44.096C39.1239 45.5622 37.5905 46.6835 36.2774 45.9839L24 39.5057Z"></path></g></svg>',
		"reorder-24x24":
			'<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M8.9444 10.75H15.0544C15.7144 10.75 16.3144 10.39 16.6144 9.80002C16.9144 9.22002 16.8644 8.52002 16.4844 7.98002L13.4244 3.71002C12.7644 2.79002 11.2344 2.79002 10.5744 3.71002L7.5244 7.99002C7.1444 8.53002 7.0944 9.22002 7.3944 9.81002C7.6944 10.4 8.2944 10.76 8.9544 10.76L8.9444 10.75ZM8.7444 8.86002L11.7944 4.58002C11.8644 4.49002 11.9544 4.48002 11.9944 4.48002C12.0344 4.48002 12.1344 4.49002 12.1944 4.58002L15.2544 8.86002C15.3344 8.97002 15.3044 9.07002 15.2744 9.12002C15.2444 9.17002 15.1844 9.26002 15.0544 9.26002H8.9444C8.8144 9.26002 8.7444 9.18002 8.7244 9.12002C8.7044 9.06002 8.6644 8.97002 8.7444 8.86002ZM15.0544 13.25H8.9444C8.2844 13.25 7.6844 13.61 7.3844 14.2C7.0844 14.78 7.1344 15.48 7.5144 16.02L10.5744 20.3C10.9044 20.76 11.4344 21.03 11.9944 21.03C12.5544 21.03 13.0944 20.76 13.4144 20.3L16.4744 16.02C16.8544 15.48 16.9044 14.79 16.6044 14.2C16.3044 13.61 15.7044 13.25 15.0444 13.25H15.0544ZM15.2644 15.15L12.2044 19.43C12.0744 19.61 11.9244 19.61 11.7944 19.43L8.7344 15.15C8.6544 15.04 8.6844 14.94 8.7144 14.89C8.7444 14.84 8.8044 14.75 8.9344 14.75H15.0444C15.1744 14.75 15.2444 14.83 15.2644 14.89C15.2844 14.95 15.3244 15.04 15.2444 15.15H15.2644Z"></path></svg>',
		"restoredown-16x16":
			'<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M7.69 8.71C7.73 8.8 7.75 8.9 7.75 9V13C7.75 13.41 7.41 13.75 7 13.75C6.59 13.75 6.25 13.41 6.25 13V10.81L3.53 13.53C3.38 13.68 3.19 13.75 3 13.75C2.81 13.75 2.62 13.68 2.47 13.53C2.18 13.24 2.18 12.76 2.47 12.47L5.19 9.75H3C2.59 9.75 2.25 9.41 2.25 9C2.25 8.59 2.59 8.25 3 8.25H7C7.1 8.25 7.19 8.27 7.29 8.31C7.47 8.39 7.62 8.53 7.7 8.72L7.69 8.71ZM13 6.25H10.81L13.53 3.53C13.82 3.24 13.82 2.76 13.53 2.47C13.24 2.18 12.76 2.18 12.47 2.47L9.75 5.19V3C9.75 2.59 9.41 2.25 9 2.25C8.59 2.25 8.25 2.59 8.25 3V7C8.25 7.1 8.27 7.19 8.31 7.29C8.39 7.47 8.53 7.62 8.72 7.7C8.81 7.74 8.91 7.76 9.01 7.76H13.01C13.42 7.76 13.76 7.42 13.76 7.01C13.76 6.6 13.42 6.26 13.01 6.26L13 6.25Z"></path></svg>',
		"search-24x24":
			'<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M13.9975 2.25C9.7275 2.25 6.2475 5.73 6.2475 10C6.2475 11.87 6.9075 13.58 8.0175 14.92L2.4675 20.47C2.1775 20.76 2.1775 21.24 2.4675 21.53C2.6175 21.68 2.8075 21.75 2.9975 21.75C3.1875 21.75 3.3775 21.68 3.5275 21.53L9.0775 15.98C10.4175 17.08 12.1275 17.75 13.9975 17.75C18.2675 17.75 21.7475 14.27 21.7475 10C21.7475 5.73 18.2675 2.25 13.9975 2.25ZM13.9975 16.25C10.5475 16.25 7.7475 13.45 7.7475 10C7.7475 6.55 10.5475 3.75 13.9975 3.75C17.4475 3.75 20.2475 6.55 20.2475 10C20.2475 13.45 17.4475 16.25 13.9975 16.25Z"></path></svg>',
		"smiley-rate1-24x24":
			'<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M4 4.9938C4 4.44362 4.45 3.99348 5 3.99348H6.59L5.3 2.70306C4.91 2.31293 4.91 1.68272 5.3 1.2926C5.69 0.902468 6.32 0.902468 6.71 1.2926L9.71 4.29357C9.8 4.3836 9.88 4.49364 9.93 4.62368C10.03 4.86376 10.03 5.14385 9.93 5.38393C9.88 5.50397 9.81 5.614 9.71 5.71404L6.71 8.71501C6.51 8.91508 6.26 9.00511 6 9.00511C5.74 9.00511 5.49 8.90508 5.29 8.71501C4.9 8.32489 4.9 7.69468 5.29 7.30456L6.58 6.01413H4.99C4.44 6.01413 3.99 5.56399 3.99 5.01381L4 4.9938ZM14.08 5.37393C14.13 5.49397 14.2 5.604 14.3 5.70403L17.3 8.70501C17.5 8.90508 17.75 8.99511 18.01 8.99511C18.27 8.99511 18.52 8.89507 18.72 8.70501C19.11 8.31488 19.11 7.68468 18.72 7.29455L17.43 6.00413H19.02C19.57 6.00413 20.02 5.55399 20.02 5.00381C20.02 4.45363 19.57 4.00348 19.02 4.00348H17.43L18.72 2.71306C19.11 2.32293 19.11 1.69273 18.72 1.3026C18.33 0.912471 17.7 0.912471 17.31 1.3026L14.31 4.30358C14.22 4.39361 14.14 4.50364 14.09 4.63368C13.99 4.87376 13.99 5.15385 14.09 5.39393L14.08 5.37393ZM22 14.9971V20.999C22 22.6496 20.65 24 19 24H5C3.35 24 2 22.6496 2 20.999V14.9971C2 13.3465 3.35 11.9961 5 11.9961H19C20.65 11.9961 22 13.3465 22 14.9971ZM19 13.9967H16V16.9977H20V14.9971C20 14.4469 19.55 13.9967 19 13.9967ZM14 16.9977V13.9967H10V16.9977H14ZM10 18.9984V21.9993H14V18.9984H10ZM4 14.9971V16.9977H8V13.9967H5C4.45 13.9967 4 14.4469 4 14.9971ZM5 21.9993H8V18.9984H4V20.999C4 21.5492 4.45 21.9993 5 21.9993ZM20 20.999V18.9984H16V21.9993H19C19.55 21.9993 20 21.5492 20 20.999Z"></path></svg>',
		"smiley-rate10-24x24":
			'<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12.01 23C6.85721 23 1.15412 19.9621 0.0134987 13.1669C-0.0765501 12.6272 0.293651 12.1076 0.833944 12.0177C1.38424 11.9277 1.89452 12.2975 1.98457 12.8371C2.92508 18.4732 7.69767 20.9914 12 20.9914C16.3023 20.9914 21.0749 18.4732 22.0154 12.8371C22.1055 12.2975 22.6158 11.9277 23.1661 12.0177C23.7063 12.1076 24.0765 12.6272 23.9865 13.1669C22.8559 19.9521 17.1428 23 11.99 23H12.01ZM21.165 6.15177C22.3056 5.01257 22.3056 3.16386 21.165 2.02465L21.0049 1.85477C19.9143 0.765533 18.1633 0.725561 17.0227 1.71487C15.8821 0.715568 14.1312 0.765533 13.0406 1.85477L12.8705 2.01466C11.7299 3.15386 11.7299 5.00257 12.8705 6.14178L17.0227 10.2889L21.175 6.14178L21.165 6.15177ZM15.742 3.27378L17.0127 4.54289L18.2834 3.27378C18.6436 2.91403 19.2239 2.91403 19.5841 3.27378L19.7442 3.43367C20.1044 3.79342 20.1044 4.37301 19.7442 4.73276L17.0127 7.46086L14.2812 4.73276C13.921 4.37301 13.921 3.79342 14.2812 3.43367L14.4413 3.27378C14.6214 3.09391 14.8515 3.00397 15.0917 3.00397C15.3318 3.00397 15.5619 3.09391 15.742 3.27378ZM11.1595 6.15177C12.3002 5.01257 12.3002 3.16386 11.1595 2.02465L10.9995 1.85477C9.90886 0.765533 8.15792 0.725561 7.0173 1.71487C5.87668 0.715568 4.12573 0.765533 3.03514 1.85477L2.86505 2.01466C1.72443 3.15386 1.72443 5.00257 2.86505 6.14178L7.0173 10.2889L11.1695 6.14178L11.1595 6.15177ZM5.7366 3.27378L7.00729 4.54289L8.27798 3.27378C8.63818 2.91403 9.21849 2.91403 9.57869 3.27378L9.73877 3.43367C10.099 3.79342 10.099 4.37301 9.73877 4.73276L7.00729 7.46086L4.27581 4.73276C3.91562 4.37301 3.91562 3.79342 4.27581 3.43367L4.4359 3.27378C4.61599 3.09391 4.84612 3.00397 5.08625 3.00397C5.32638 3.00397 5.5565 3.09391 5.7366 3.27378Z"></path></svg>',
		"smiley-rate2-24x24":
			'<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_15894_140103)"><path d="M4.88291 4.51001C4.47291 4.51001 4.08291 4.25001 3.94291 3.84001C3.76291 3.32001 4.03291 2.75001 4.55291 2.57001L8.32291 1.25001C8.84291 1.06001 9.41291 1.34001 9.59291 1.86001C9.77291 2.38001 9.50291 2.95001 8.98291 3.13001L5.20291 4.45001C5.09291 4.49001 4.98291 4.51001 4.87291 4.51001H4.88291ZM19.8129 3.89001C20.0229 3.38001 19.7729 2.79001 19.2629 2.59001L15.5529 1.07001C15.0429 0.860007 14.4529 1.11001 14.2529 1.62001C14.0429 2.13001 14.2929 2.72001 14.8029 2.92001L18.5029 4.43001C18.6229 4.48001 18.7529 4.50001 18.8829 4.50001C19.2729 4.50001 19.6529 4.27001 19.8129 3.88001V3.89001ZM3.50291 6.00001C2.64291 6.37001 1.79291 6.88001 1.00291 7.48001C0.79291 7.64001 0.64291 7.87001 0.59291 8.14001C0.48291 8.73001 0.87291 9.29001 1.45291 9.40001C2.04291 9.51001 2.60291 9.12001 2.71291 8.54001C2.87291 7.69001 3.12291 6.83001 3.50291 5.99001V6.00001ZM21.0429 8.55001C21.6029 10.48 24.2429 8.84001 22.7529 7.48001C21.9629 6.88001 21.1129 6.37001 20.2529 6.00001C20.6329 6.84001 20.8829 7.70001 21.0429 8.55001ZM21.5729 13.2C21.2529 14.2 22.5429 15.09 23.3629 14.39C23.8529 14 23.9229 13.29 23.5429 12.81C21.7429 10.67 22.1329 10.55 21.5829 13.2H21.5729ZM1.75291 11C1.22291 11.79 -0.14709 12.64 0.0129102 13.75C0.15291 14.36 0.75291 14.74 1.35291 14.6C2.98291 14.1 1.80291 12.22 1.75291 11ZM19.8829 17C19.8829 13.14 16.2929 10 11.8829 10C7.47291 10 3.88291 13.14 3.88291 17C3.88291 20.86 7.47291 24 11.8829 24C16.2929 24 19.8829 20.86 19.8829 17ZM17.8829 17C17.8829 19.76 15.1929 22 11.8829 22C8.57291 22 5.88291 19.76 5.88291 17C5.88291 14.24 8.57291 12 11.8829 12C15.1929 12 17.8829 14.24 17.8829 17Z"></path></g><defs><clipPath id="clip0_15894_140103"><rect width="24" height="24" fill="white"></rect></clipPath></defs></svg>',
		"smiley-rate3-24x24":
			'<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M7.01915 7C6.46961 7 6.01998 6.55 6.01998 6V2C6.01998 1.45 6.46961 1 7.01915 1C7.56869 1 8.01832 1.45 8.01832 2V6C8.01832 6.55 7.56869 7 7.01915 7ZM18.01 6V2C18.01 1.45 17.5604 1 17.0108 1C16.4613 1 16.0117 1.45 16.0117 2V6C16.0117 6.55 16.4613 7 17.0108 7C17.5604 7 18.01 6.55 18.01 6ZM16.4213 21.58L18.01 19.99L19.2989 21.28C19.6886 21.67 20.3181 21.67 20.7077 21.28C21.0974 20.89 21.0974 20.26 20.7077 19.87L19.4188 18.58C18.6395 17.8 17.3705 17.8 16.5912 18.58L15.0025 20.17L13.4138 18.58C12.6345 17.8 11.3655 17.8 10.5862 18.58L8.9975 20.17L7.40883 18.58C6.62948 17.8 5.36053 17.8 4.58118 18.58L3.29226 19.87C2.90258 20.26 2.90258 20.89 3.29226 21.28C3.68193 21.67 4.31141 21.67 4.70108 21.28L5.99001 19.99L7.57868 21.58C8.35803 22.36 9.62698 22.36 10.4063 21.58L11.995 19.99L13.5837 21.58C13.9734 21.97 14.4829 22.16 14.9925 22.16C15.5021 22.16 16.0117 21.97 16.4013 21.58H16.4213Z"></path></svg>',
		"smiley-rate4-24x24":
			'<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M7.06927 7C6.51927 7 6.06927 6.55 6.06927 6V2C6.06927 1.45 6.51927 1 7.06927 1C7.61927 1 8.06927 1.45 8.06927 2V6C8.06927 6.55 7.61927 7 7.06927 7ZM18.0693 6V2C18.0693 1.45 17.6193 1 17.0693 1C16.5193 1 16.0693 1.45 16.0693 2V6C16.0693 6.55 16.5193 7 17.0693 7C17.6193 7 18.0693 6.55 18.0693 6ZM22.5693 21.9C23.0693 21.66 23.2793 21.07 23.0393 20.57C21.1093 16.52 16.9093 14 12.0693 14C7.22927 14 3.02927 16.52 1.09927 20.57C0.859273 21.07 1.06927 21.67 1.56927 21.9C2.06927 22.14 2.65927 21.93 2.89927 21.43C4.49927 18.08 8.00927 16 12.0593 16C16.1093 16 19.6293 18.08 21.2193 21.43C21.3893 21.79 21.7493 22 22.1193 22C22.2593 22 22.4093 21.97 22.5493 21.9H22.5693Z"></path></svg>',
		"smiley-rate5-24x24":
			'<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M7.00572 7C6.45572 7 6.00572 6.55 6.00572 6V2C6.00572 1.45 6.45572 1 7.00572 1C7.55572 1 8.00572 1.45 8.00572 2V6C8.00572 6.55 7.55572 7 7.00572 7ZM18.0057 6V2C18.0057 1.45 17.5557 1 17.0057 1C16.4557 1 16.0057 1.45 16.0057 2V6C16.0057 6.55 16.4557 7 17.0057 7C17.5557 7 18.0057 6.55 18.0057 6ZM19.9457 21.33C20.1257 20.81 19.8557 20.24 19.3357 20.05C14.5457 18.35 9.45572 18.35 4.66572 20.05C4.14572 20.23 3.87572 20.81 4.05572 21.33C4.23572 21.85 4.80572 22.12 5.33572 21.94C9.69572 20.4 14.3057 20.4 18.6657 21.94C18.7757 21.98 18.8857 22 18.9957 22C19.4057 22 19.7957 21.74 19.9357 21.33H19.9457Z"></path></svg>',
		"smiley-rate6-24x24":
			'<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M7 7C6.45 7 6 6.55 6 6V2C6 1.45 6.45 1 7 1C7.55 1 8 1.45 8 2V6C8 6.55 7.55 7 7 7ZM18 6V2C18 1.45 17.55 1 17 1C16.45 1 16 1.45 16 2V6C16 6.55 16.45 7 17 7C17.55 7 18 6.55 18 6ZM21 21C21 20.45 20.55 20 20 20H4C3.45 20 3 20.45 3 21C3 21.55 3.45 22 4 22H20C20.55 22 21 21.55 21 21Z"></path></svg>',
		"smiley-rate7-24x24":
			'<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12.0022 23.99C11.452 23.99 11.0018 23.5402 11.0018 22.9904C11.0018 22.4407 11.452 21.9909 12.0022 21.9909C16.3137 21.9909 21.0755 19.472 22.0158 13.8344C22.1058 13.2947 22.616 12.9248 23.1662 13.0148C23.7064 13.1047 24.0765 13.6245 23.9865 14.1643C22.8561 20.9513 17.144 24 11.9922 24L12.0022 23.99ZM8.00072 5.99783V1.99957C8.00072 1.4498 7.55056 1 7.00036 1C6.45016 1 6 1.4498 6 1.99957V5.99783C6 6.54759 6.45016 6.99739 7.00036 6.99739C7.55056 6.99739 8.00072 6.54759 8.00072 5.99783ZM18.0043 5.99783V1.99957C18.0043 1.4498 17.5542 1 17.004 1C16.4538 1 16.0036 1.4498 16.0036 1.99957V5.99783C16.0036 6.54759 16.4538 6.99739 17.004 6.99739C17.5542 6.99739 18.0043 6.54759 18.0043 5.99783Z"></path></svg>',
		"smiley-rate8-24x24":
			'<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12.01 24C6.85721 24 1.15412 20.96 0.0134987 14.16C-0.0765501 13.62 0.293651 13.1 0.833944 13.01C1.38424 12.92 1.89452 13.29 1.98457 13.83C2.92508 19.47 7.69767 21.99 12 21.99C16.3023 21.99 21.0749 19.47 22.0154 13.83C22.1055 13.29 22.6158 12.92 23.1661 13.01C23.7063 13.1 24.0765 13.62 23.9865 14.16C22.8559 20.95 17.1428 24 11.99 24H12.01ZM8.00783 6V2C8.00783 1.45 7.55759 1 7.00729 1C6.45699 1 6.00675 1.45 6.00675 2V6C6.00675 6.55 6.45699 7 7.00729 7C7.55759 7 8.00783 6.55 8.00783 6ZM18.0133 6V2C18.0133 1.45 17.563 1 17.0127 1C16.4624 1 16.0122 1.45 16.0122 2V6C16.0122 6.55 16.4624 7 17.0127 7C17.563 7 18.0133 6.55 18.0133 6Z"></path></svg>',
		"smiley-rate9-24x24":
			'<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12.01 24C6.85767 24 1.15509 20.96 0.0145752 14.16C-0.0354475 13.87 0.0445888 13.57 0.234675 13.35C0.424761 13.13 0.704888 13 0.995019 13H23.005C23.2951 13 23.5752 13.13 23.7653 13.35C23.9554 13.57 24.0354 13.87 23.9854 14.16C22.8549 20.95 17.1423 24 11.99 24H12.01ZM2.25559 15C3.61621 19.82 8.0182 22 12.01 22C16.0018 22 20.4038 19.82 21.7644 15H2.25559ZM8.00819 6V2C8.00819 1.45 7.55799 1 7.00774 1C6.45749 1 6.00729 1.45 6.00729 2V6C6.00729 6.55 6.45749 7 7.00774 7C7.55799 7 8.00819 6.55 8.00819 6ZM18.0127 6V2C18.0127 1.45 17.5625 1 17.0123 1C16.462 1 16.0118 1.45 16.0118 2V6C16.0118 6.55 16.462 7 17.0123 7C17.5625 7 18.0127 6.55 18.0127 6Z"></path></svg>',
	};
	const St = ["lang", "dir"],
		zt = { onsubmit: "return false;" },
		Ht = { key: 0, class: "sv_custom_header" },
		It = { class: "sv-components-column sv-components-column--expandable" },
		Rt = ["id"],
		Tt = { key: 2 },
		$t = ["innerHTML"],
		Dt = ["innerHTML"],
		Zt = ["innerHTML"];
	k.addIconsToThemeSet("v1", Mt), k.addIconsToThemeSet("v2", P), k.SvgRegistry.registerIcons(P);
	const L = e.defineComponent({
			__name: "Survey",
			props: { model: {}, survey: {} },
			setup(a) {
				const o = a,
					t = e.ref(),
					n = e.ref(1),
					s = e.computed(() => {
						const p = o.survey ? o.survey : o.model;
						return e.toRaw(p);
					}),
					l = e.computed(() => (s.value.activePage ? s.value.activePage.id : "")),
					r = () => {
						const p = l.value;
						return !!s.value && p + n.value.toString();
					},
					d = e.computed(
						() => s.value.showCompletedPage && s.value.state === "completed"
					),
					m = e.computed(() => s.value.css),
					u = e.computed(() => "page" + r()),
					c = (p) => {
						if (p) {
							var C = t.value;
							C && p.afterRenderSurvey(C),
								(p.renderCallback = () => {
									n.value++, e.triggerRef(s);
								}),
								p.startTimerFromUI();
						}
					};
				return (
					g(
						() => s.value,
						(p, C) => {
							p && C && c(p);
						},
						(p) => {
							p.stopTimer(), (p.renderCallback = void 0);
						}
					),
					e.onMounted(() => {
						c(s.value);
					}),
					e.onUnmounted(() => {
						s.value.stopTimer(),
							s.value.beforeDestroySurveyElement(),
							(s.value.renderCallback = void 0);
					}),
					(p, C) => (
						e.openBlock(),
						e.createElementBlock(
							"div",
							{
								class: e.normalizeClass(s.value.getRootCss()),
								style: e.normalizeStyle(s.value.themeVariables),
								lang: s.value.locale || "en",
								dir: s.value.localeDir,
								ref_key: "root",
								ref: t,
							},
							[
								e.createVNode(
									i,
									{ is: "sv-scroll", disabled: s.value.rootScrollDisabled },
									{
										default: e.withCtx(() => [
											s.value.needRenderIcons
												? (e.openBlock(),
												  e.createBlock(i, {
														key: 0,
														is: "sv-svg-bundle",
												  }))
												: e.createCommentVNode("", !0),
											e.createElementVNode(
												"div",
												{
													class: e.normalizeClass(
														s.value.wrapperFormCss
													),
												},
												[
													e.createVNode(i, { is: "survey-popup-modal" }),
													s.value.renderBackgroundImage
														? (e.openBlock(),
														  e.createElementBlock(
																"div",
																{
																	key: 0,
																	class: e.normalizeClass(
																		m.value.rootBackgroundImage
																	),
																	style: e.normalizeStyle(
																		s.value
																			.backgroundImageStyle
																	),
																},
																null,
																6
														  ))
														: e.createCommentVNode("", !0),
													e.createElementVNode("form", zt, [
														e.createVNode(
															i,
															{
																is: "sv-scroll",
																disabled:
																	s.value.formScrollDisabled,
															},
															{
																default: e.withCtx(() => [
																	s.value.hasLogo
																		? e.createCommentVNode(
																				"",
																				!0
																		  )
																		: (e.openBlock(),
																		  e.createElementBlock(
																				"div",
																				Ht
																		  )),
																	e.createElementVNode(
																		"div",
																		{
																			class: e.normalizeClass(
																				m.value.container
																			),
																		},
																		[
																			s.value.headerView ===
																			"basic"
																				? (e.openBlock(),
																				  e.createBlock(
																						i,
																						{
																							key: 0,
																							is: "survey-header",
																							survey: s.value,
																						},
																						null,
																						8,
																						["survey"]
																				  ))
																				: e.createCommentVNode(
																						"",
																						!0
																				  ),
																			e.createVNode(
																				i,
																				{
																					is: "sv-components-container",
																					survey: s.value,
																					container:
																						"header",
																					needRenderWrapper:
																						!1,
																				},
																				null,
																				8,
																				["survey"]
																			),
																			s.value.isShowingPage
																				? (e.openBlock(),
																				  e.createElementBlock(
																						"div",
																						{
																							key: 1,
																							class: e.normalizeClass(
																								s
																									.value
																									.bodyContainerCss
																							),
																						},
																						[
																							e.createVNode(
																								i,
																								{
																									is: "sv-components-container",
																									survey: s.value,
																									container:
																										"left",
																									needRenderWrapper:
																										!0,
																								},
																								null,
																								8,
																								[
																									"survey",
																								]
																							),
																							e.createElementVNode(
																								"div",
																								It,
																								[
																									e.createVNode(
																										i,
																										{
																											is: "sv-components-container",
																											survey: s.value,
																											container:
																												"center",
																											needRenderWrapper:
																												!0,
																										},
																										null,
																										8,
																										[
																											"survey",
																										]
																									),
																									e.createElementVNode(
																										"div",
																										{
																											class: e.normalizeClass(
																												s
																													.value
																													.bodyCss
																											),
																											style: e.normalizeStyle(
																												{
																													maxWidth:
																														s
																															.value
																															.renderedWidth,
																												}
																											),
																											id: l.value,
																										},
																										[
																											e.createVNode(
																												i,
																												{
																													is: "sv-components-container",
																													survey: s.value,
																													container:
																														"contentTop",
																													needRenderWrapper:
																														!0,
																												},
																												null,
																												8,
																												[
																													"survey",
																												]
																											),
																											(e.openBlock(),
																											e.createBlock(
																												i,
																												{
																													is:
																														s
																															.value
																															.pageComponent ||
																														"sv-page",
																													key: u.value,
																													survey: s.value,
																													page: s
																														.value
																														.activePage,
																													css: m.value,
																												},
																												null,
																												8,
																												[
																													"is",
																													"survey",
																													"page",
																													"css",
																												]
																											)),
																											e.createVNode(
																												i,
																												{
																													is: "sv-components-container",
																													survey: s.value,
																													container:
																														"contentBottom",
																													needRenderWrapper:
																														!0,
																												},
																												null,
																												8,
																												[
																													"survey",
																												]
																											),
																											s
																												.value
																												.showBrandInfo
																												? (e.openBlock(),
																												  e.createBlock(
																														i,
																														{
																															key: 0,
																															is: "sv-brand-info",
																														}
																												  ))
																												: e.createCommentVNode(
																														"",
																														!0
																												  ),
																										],
																										14,
																										Rt
																									),
																								]
																							),
																							e.createVNode(
																								i,
																								{
																									is: "sv-components-container",
																									survey: s.value,
																									container:
																										"right",
																									needRenderWrapper:
																										!0,
																								},
																								null,
																								8,
																								[
																									"survey",
																								]
																							),
																						],
																						2
																				  ))
																				: e.createCommentVNode(
																						"",
																						!0
																				  ),
																			e.createVNode(
																				i,
																				{
																					is: "sv-components-container",
																					survey: s.value,
																					container:
																						"footer",
																					needRenderWrapper:
																						!1,
																				},
																				null,
																				8,
																				["survey"]
																			),
																			d.value
																				? (e.openBlock(),
																				  e.createElementBlock(
																						"div",
																						Tt,
																						[
																							e.createElementVNode(
																								"div",
																								{
																									innerHTML:
																										s
																											.value
																											.processedCompletedHtml,
																									class: e.normalizeClass(
																										s
																											.value
																											.completedCss
																									),
																								},
																								null,
																								10,
																								$t
																							),
																							e.createVNode(
																								i,
																								{
																									is: "sv-components-container",
																									survey: s.value,
																									container:
																										"completePage",
																									needRenderWrapper:
																										!0,
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
																			s.value.state ===
																			"completedbefore"
																				? (e.openBlock(),
																				  e.createElementBlock(
																						"div",
																						{
																							key: 3,
																							class: e.normalizeClass(
																								s
																									.value
																									.completedBeforeCss
																							),
																							innerHTML:
																								s
																									.value
																									.processedCompletedBeforeHtml,
																						},
																						null,
																						10,
																						Dt
																				  ))
																				: e.createCommentVNode(
																						"",
																						!0
																				  ),
																			s.value.state ===
																			"loading"
																				? (e.openBlock(),
																				  e.createElementBlock(
																						"div",
																						{
																							key: 4,
																							class: e.normalizeClass(
																								s
																									.value
																									.loadingBodyCss
																							),
																							innerHTML:
																								s
																									.value
																									.processedLoadingHtml,
																						},
																						null,
																						10,
																						Zt
																				  ))
																				: e.createCommentVNode(
																						"",
																						!0
																				  ),
																			s.value.state ===
																			"empty"
																				? (e.openBlock(),
																				  e.createElementBlock(
																						"div",
																						{
																							key: 5,
																							class: e.normalizeClass(
																								m
																									.value
																									.bodyEmpty
																							),
																						},
																						e.toDisplayString(
																							s.value
																								.emptySurveyText
																						),
																						3
																				  ))
																				: e.createCommentVNode(
																						"",
																						!0
																				  ),
																		],
																		2
																	),
																]),
																_: 1,
															},
															8,
															["disabled"]
														),
													]),
													e.createVNode(
														i,
														{
															is: "sv-notifier",
															model: s.value.notifier,
														},
														null,
														8,
														["model"]
													),
												],
												2
											),
										]),
										_: 1,
									},
									8,
									["disabled"]
								),
							],
							14,
							St
						)
					)
				);
			},
		}),
		At = e.defineComponent({
			__name: "Notifier",
			props: { model: {} },
			setup(a) {
				const o = a;
				return (
					g(() => o.model),
					(t, n) =>
						t.model.isDisplayed
							? (e.openBlock(),
							  e.createElementBlock(
									"div",
									{
										key: 0,
										class: e.normalizeClass(t.model.css),
										style: e.normalizeStyle({
											visibility: t.model.active ? "visible" : "hidden",
										}),
										role: "alert",
										"aria-live": "polite",
									},
									[
										e.createElementVNode(
											"span",
											null,
											e.toDisplayString(t.model.message),
											1
										),
										e.createVNode(
											i,
											{ is: "sv-action-bar", model: t.model.actionBar },
											null,
											8,
											["model"]
										),
									],
									6
							  ))
							: e.createCommentVNode("", !0)
				);
			},
		}),
		Pt = { key: 0 },
		Ft = e.defineComponent({
			__name: "QuestionOther",
			props: { question: {}, item: {} },
			setup(a) {
				return (o, t) => (
					e.openBlock(),
					e.createElementBlock(
						"div",
						{ class: e.normalizeClass(o.question.getCommentAreaCss(!0)) },
						[
							o.question.isReadOnlyRenderDiv()
								? (e.openBlock(),
								  e.createElementBlock(
										"div",
										Pt,
										e.toDisplayString(o.question.getCommentValue(o.item)),
										1
								  ))
								: (e.openBlock(),
								  e.createBlock(
										i,
										{
											key: 1,
											is: "sv-text-area",
											model: o.question.getCommentTextAreaModel(o.item),
										},
										null,
										8,
										["model"]
								  )),
						],
						2
					)
				);
			},
		}),
		Wt = ["disabled", "value", "title"],
		Ot = e.defineComponent({
			__name: "SurveyNavigationButton",
			props: { item: {} },
			setup(a) {
				const o = a,
					t = () => o.item.data && o.item.data.mouseDown();
				return (
					g(() => o.item),
					(n, s) =>
						n.item.visible
							? (e.openBlock(),
							  e.createElementBlock(
									"input",
									{
										key: 0,
										type: "button",
										disabled: n.item.disabled,
										value: n.item.title,
										class: e.normalizeClass(n.item.innerCss),
										title: n.item.getTooltip(),
										onMousedown: t,
										onClick:
											s[0] ||
											(s[0] = (...l) =>
												n.item.action && n.item.action(...l)),
									},
									null,
									42,
									Wt
							  ))
							: e.createCommentVNode("", !0)
				);
			},
		}),
		H = e.defineComponent({
			__name: "PopupSurvey",
			props: {
				survey: {},
				isExpanded: { type: Boolean },
				allowClose: { type: Boolean },
				allowFullScreen: { type: Boolean },
				onClose: { type: Function },
				closeOnCompleteTimeout: {},
			},
			setup(a) {
				const o = a,
					t = e.shallowRef(),
					n = () => {
						t.value.changeExpandCollapse();
					},
					s = () => {
						t.value.hide(), o.onClose && o.onClose();
					},
					l = () => {
						t.value.toggleFullScreen();
					},
					r = () => {
						t.value.onScroll();
					},
					d = () => {
						let u = t.value.cssHeaderRoot;
						return t.value.isCollapsed && (u += " " + t.value.cssRootCollapsedMod), u;
					},
					m = e.watch(
						() => o.survey,
						(u) => {
							const c = new k.PopupSurveyModel(null, u);
							o.isExpanded !== void 0 && (c.isExpanded = o.isExpanded),
								o.closeOnCompleteTimeout !== void 0 &&
									(c.closeOnCompleteTimeout = o.closeOnCompleteTimeout),
								o.allowClose !== void 0 && (c.allowClose = o.allowClose),
								o.allowFullScreen !== void 0 &&
									(c.allowFullScreen = o.allowFullScreen),
								(c.isShowing = !0),
								(t.value = c);
						},
						{ immediate: !0 }
					);
				return (
					g(() => t.value),
					e.onUnmounted(() => {
						m();
					}),
					(u, c) =>
						t.value.isShowing
							? (e.openBlock(),
							  e.createElementBlock(
									"div",
									{
										key: 0,
										style: e.normalizeStyle({
											maxWidth: t.value.renderedWidth,
											width: t.value.renderedWidth,
										}),
										class: e.normalizeClass(t.value.cssRoot),
										onScroll: r,
									},
									[
										e.createElementVNode(
											"div",
											{ class: e.normalizeClass(t.value.cssRootContent) },
											[
												e.createElementVNode(
													"div",
													{ class: e.normalizeClass(d()) },
													[
														t.value.isCollapsed && t.value.locTitle
															? (e.openBlock(),
															  e.createElementBlock(
																	"div",
																	{
																		key: 0,
																		class: e.normalizeClass(
																			t.value
																				.cssHeaderTitleCollapsed
																		),
																	},
																	e.toDisplayString(
																		t.value.locTitle
																			.renderedHtml
																	),
																	3
															  ))
															: e.createCommentVNode("", !0),
														e.createElementVNode(
															"div",
															{
																class: e.normalizeClass(
																	t.value
																		.cssHeaderButtonsContainer
																),
															},
															[
																t.value.allowFullScreen
																	? (e.openBlock(),
																	  e.createElementBlock(
																			"div",
																			{
																				key: 0,
																				class: e.normalizeClass(
																					t.value
																						.cssHeaderFullScreenButton
																				),
																				onClick: l,
																			},
																			[
																				t.value
																					.isFullScreen
																					? (e.openBlock(),
																					  e.createBlock(
																							i,
																							{
																								key: 0,
																								is: "sv-svg-icon",
																								iconName:
																									"icon-back-to-panel_16x16",
																								size: 16,
																							}
																					  ))
																					: e.createCommentVNode(
																							"",
																							!0
																					  ),
																				t.value
																					.isFullScreen
																					? e.createCommentVNode(
																							"",
																							!0
																					  )
																					: (e.openBlock(),
																					  e.createBlock(
																							i,
																							{
																								key: 1,
																								is: "sv-svg-icon",
																								iconName:
																									"icon-full-screen_16x16",
																								size: 16,
																							}
																					  )),
																			],
																			2
																	  ))
																	: e.createCommentVNode("", !0),
																e.createElementVNode(
																	"div",
																	{
																		class: e.normalizeClass(
																			t.value
																				.cssHeaderCollapseButton
																		),
																		onClick: n,
																	},
																	[
																		t.value.isExpanded
																			? (e.openBlock(),
																			  e.createBlock(i, {
																					key: 0,
																					is: "sv-svg-icon",
																					iconName:
																						"icon-minimize_16x16",
																					size: 16,
																			  }))
																			: e.createCommentVNode(
																					"",
																					!0
																			  ),
																		t.value.isCollapsed
																			? (e.openBlock(),
																			  e.createBlock(i, {
																					key: 1,
																					is: "sv-svg-icon",
																					iconName:
																						"icon-restore_16x16",
																					size: 16,
																			  }))
																			: e.createCommentVNode(
																					"",
																					!0
																			  ),
																	],
																	2
																),
																t.value.allowClose
																	? (e.openBlock(),
																	  e.createElementBlock(
																			"div",
																			{
																				key: 1,
																				class: e.normalizeClass(
																					t.value
																						.cssHeaderCloseButton
																				),
																				onClick: s,
																			},
																			[
																				e.createVNode(i, {
																					is: "sv-svg-icon",
																					iconName:
																						"icon-close_16x16",
																					size: 16,
																				}),
																			],
																			2
																	  ))
																	: e.createCommentVNode("", !0),
															],
															2
														),
													],
													2
												),
												e.createElementVNode(
													"div",
													{ class: e.normalizeClass(t.value.cssBody) },
													[
														e.createVNode(
															L,
															{ survey: u.survey },
															null,
															8,
															["survey"]
														),
													],
													2
												),
											],
											2
										),
									],
									38
							  ))
							: e.createCommentVNode("", !0)
				);
			},
		}),
		Ut = ["innerHTML"],
		Qt = e.defineComponent({
			__name: "CustomWidget",
			props: { question: {}, css: {} },
			setup(a) {
				const o = a,
					t = e.ref(),
					n = e.computed(() => o.question.customWidget.isDefaultRender),
					s = e.computed(() => !!o.question.customWidget.htmlTemplate),
					l = e.computed(() => o.question.customWidget.htmlTemplate),
					r = e.computed(() => "survey-" + o.question.getTemplate());
				return (
					e.onMounted(() => {
						o.question.customWidget.afterRender(o.question, t.value);
					}),
					e.onBeforeUnmount(() => {
						o.question.customWidget.willUnmount(o.question, t.value);
					}),
					(d, m) => (
						e.openBlock(),
						e.createElementBlock(
							"div",
							{ ref_key: "root", ref: t },
							[
								s.value
									? (e.openBlock(),
									  e.createElementBlock(
											"div",
											{ key: 0, innerHTML: l.value },
											null,
											8,
											Ut
									  ))
									: e.createCommentVNode("", !0),
								n.value
									? (e.openBlock(),
									  e.createBlock(
											i,
											{
												key: 1,
												is: r.value,
												question: d.question,
												css: d.css,
											},
											null,
											8,
											["is", "question", "css"]
									  ))
									: e.createCommentVNode("", !0),
							],
							512
						)
					)
				);
			},
		}),
		Kt = e.defineComponent({
			__name: "PopupModal",
			setup(a) {
				const o = e.shallowRef();
				function t(n, s) {
					const l = k.createPopupModalViewModel(n, s),
						r = (d, m) => {
							m.isVisible ||
								((o.value = void 0), l.dispose(), l.onVisibilityChanged.remove(r));
						};
					return (
						l.onVisibilityChanged.add(r), (l.model.isVisible = !0), (o.value = l), l
					);
				}
				return (
					k.settings.showDialog ||
						((k.settings.showDialog = t),
						e.onUnmounted(() => {
							k.settings.showDialog = void 0;
						})),
					(n, s) =>
						o.value
							? (e.openBlock(),
							  e.createBlock(
									e.Teleport,
									{ key: 0, to: o.value.container },
									[
										e.createVNode(
											i,
											{ is: "sv-popup-container", model: o.value },
											null,
											8,
											["model"]
										),
									],
									8,
									["to"]
							  ))
							: e.createCommentVNode("", !0)
				);
			},
		}),
		jt = [
			"readonly",
			"disabled",
			"value",
			"id",
			"maxlength",
			"cols",
			"rows",
			"placeholder",
			"aria-required",
			"aria-label",
			"aria-labelledby",
			"aria-describedby",
			"aria-invalid",
			"aria-errormessage",
		],
		Gt = e.defineComponent({
			__name: "TextArea",
			props: { model: {}, getRef: { type: Function } },
			setup(a) {
				const o = a,
					t = e.ref(null),
					n = function (l) {
						(t.value = l), o.getRef && o.getRef(l);
					},
					s = e.computed(() => o.model.getTextValue() || "");
				return (
					e.onMounted(() => {
						o.model.setElement(t.value);
					}),
					e.onUpdated(() => {
						o.model.setElement(t.value);
					}),
					e.onUnmounted(() => {
						o.model.resetElement();
					}),
					(l, r) => (
						e.openBlock(),
						e.createElementBlock(
							"textarea",
							{
								ref: (d) => n(d),
								readonly: l.model.isReadOnlyAttr,
								disabled: l.model.isDisabledAttr,
								value: s.value,
								id: l.model.id,
								maxlength: l.model.maxLength,
								cols: l.model.cols,
								rows: l.model.rows,
								placeholder: l.model.placeholder,
								class: e.normalizeClass(l.model.className),
								onBlur:
									r[0] ||
									(r[0] = (d) => {
										l.model.onTextAreaBlur(d);
									}),
								onFocus:
									r[1] ||
									(r[1] = (d) => {
										l.model.onTextAreaFocus(d);
									}),
								onChange:
									r[2] ||
									(r[2] = (d) => {
										l.model.onTextAreaChange(d);
									}),
								onInput:
									r[3] ||
									(r[3] = (d) => {
										l.model.onTextAreaInput(d);
									}),
								onKeydown:
									r[4] ||
									(r[4] = (d) => {
										l.model.onTextAreaKeyDown(d);
									}),
								"aria-required": l.model.ariaRequired,
								"aria-label": l.model.ariaLabel,
								"aria-labelledby": l.model.ariaLabelledBy,
								"aria-describedby": l.model.ariaDescribedBy,
								"aria-invalid": l.model.ariaInvalid,
								"aria-errormessage": l.model.ariaErrormessage,
								style: e.normalizeStyle({ resize: l.model.question.resizeStyle }),
							},
							null,
							46,
							jt
						)
					)
				);
			},
		}),
		Jt = e.defineComponent({
			__name: "CharacterCounter",
			props: { counter: {}, remainingCharacterCounter: {} },
			setup(a) {
				const o = a;
				return (
					g(() => o.counter),
					(t, n) => (
						e.openBlock(),
						e.createElementBlock(
							"div",
							{ class: e.normalizeClass(t.remainingCharacterCounter) },
							e.toDisplayString(t.counter.remainingCharacterCounter),
							3
						)
					)
				);
			},
		}),
		Xt = e.defineComponent({
			inheritAttrs: !1,
			__name: "Composite",
			props: { question: {}, css: {} },
			setup(a) {
				const o = a,
					t = e.ref(null);
				y(o, t);
				const n = e.computed(() => o.question.contentPanel);
				return (s, l) => (
					e.openBlock(),
					e.createBlock(
						i,
						{
							is: "survey-panel",
							ref_key: "root",
							ref: t,
							element: n.value,
							css: s.css,
						},
						null,
						8,
						["element", "css"]
					)
				);
			},
		}),
		Yt = e.defineComponent({
			inheritAttrs: !1,
			__name: "Custom",
			props: { question: {}, css: {} },
			setup(a) {
				const o = a,
					t = e.ref(null);
				y(o, t);
				const n = e.computed(() => o.question.contentQuestion);
				g(() => n.value);
				const s = (l) => M(l);
				return (l, r) => (
					e.openBlock(),
					e.createBlock(
						i,
						{ ref: t.value, is: s(n.value), question: n.value, css: l.css },
						null,
						8,
						["is", "question", "css"]
					)
				);
			},
		}),
		_t = [e.createElementVNode("use", { "xlink:href": "#icon-timercircle" }, null, -1)],
		F = 440,
		vt = e.defineComponent({
			__name: "TimerPanel",
			props: { model: {}, css: {} },
			setup(a) {
				const o = a,
					t = e.computed(() => F * o.model.progress),
					n = e.computed(() => o.model.text);
				return (
					g(() => o.model),
					(s, l) =>
						s.model.isRunning && s.model.showTimerAsClock
							? (e.openBlock(),
							  e.createElementBlock(
									"div",
									{ key: 0, class: e.normalizeClass(s.model.rootCss) },
									[
										s.model.showProgress
											? (e.openBlock(),
											  e.createElementBlock(
													"svg",
													{
														key: 0,
														class: e.normalizeClass(
															s.model.getProgressCss()
														),
														style: e.normalizeStyle({
															strokeDasharray: F,
															strokeDashoffset: t.value,
														}),
													},
													_t,
													6
											  ))
											: e.createCommentVNode("", !0),
										e.createElementVNode(
											"div",
											{ class: e.normalizeClass(s.model.textContainerCss) },
											[
												e.createElementVNode(
													"span",
													{
														class: e.normalizeClass(
															s.model.majorTextCss
														),
													},
													e.toDisplayString(s.model.clockMajorText),
													3
												),
												s.model.clockMinorText
													? (e.openBlock(),
													  e.createElementBlock(
															"span",
															{
																key: 0,
																class: e.normalizeClass(
																	s.model.minorTextCss
																),
															},
															e.toDisplayString(
																s.model.clockMinorText
															),
															3
													  ))
													: e.createCommentVNode("", !0),
											],
											2
										),
									],
									2
							  ))
							: e.withDirectives(
									(e.openBlock(),
									e.createElementBlock(
										"div",
										{
											key: 1,
											class: e.normalizeClass(
												s.model.survey.getCss().timerRoot
											),
										},
										e.toDisplayString(n.value),
										3
									)),
									[[e.vShow, s.model.isRunning && !s.model.showTimerAsClock]]
							  )
				);
			},
		}),
		xt = { class: "sd-loading-indicator" },
		e1 = e.defineComponent({
			__name: "LoadingIndicator",
			setup(a) {
				return (o, t) => (
					e.openBlock(),
					e.createElementBlock("div", xt, [
						e.createVNode(i, {
							is: "sv-svg-icon",
							iconName: "icon-loading",
							size: "'auto'",
						}),
					])
				);
			},
		}),
		o1 = { key: 2 },
		n1 = e.defineComponent({
			__name: "Header",
			props: { model: {}, survey: {} },
			setup(a) {
				const o = a;
				return (
					g(() => {
						const t = o.model;
						return (t.survey = o.survey), o.model;
					}),
					e.onMounted(() => {
						o.model.processResponsiveness();
					}),
					e.onUpdated(() => {
						o.model.processResponsiveness();
					}),
					(t, n) =>
						t.survey.headerView === "advanced" && !t.model.isEmpty
							? (e.openBlock(),
							  e.createElementBlock(
									"div",
									{
										key: 0,
										class: e.normalizeClass(t.model.headerClasses),
										style: e.normalizeStyle({
											height: t.model.renderedHeight,
										}),
									},
									[
										t.model.backgroundImage
											? (e.openBlock(),
											  e.createElementBlock(
													"div",
													{
														key: 0,
														class: e.normalizeClass(
															t.model.backgroundImageClasses
														),
														style: e.normalizeStyle(
															t.model.backgroundImageStyle
														),
													},
													null,
													6
											  ))
											: e.createCommentVNode("", !0),
										t.survey.isMobile
											? e.createCommentVNode("", !0)
											: (e.openBlock(),
											  e.createElementBlock(
													"div",
													{
														key: 1,
														class: e.normalizeClass(
															t.model.contentClasses
														),
														style: e.normalizeStyle({
															maxWidth: t.model.maxWidth,
														}),
													},
													[
														(e.openBlock(!0),
														e.createElementBlock(
															e.Fragment,
															null,
															e.renderList(
																t.model.cells,
																(s, l) => (
																	e.openBlock(),
																	e.createBlock(
																		i,
																		{
																			is: "sv-header-cell",
																			model: s,
																			key: l,
																		},
																		null,
																		8,
																		["model"]
																	)
																)
															),
															128
														)),
													],
													6
											  )),
										t.survey.isMobile
											? (e.openBlock(),
											  e.createElementBlock("div", o1, [
													e.createVNode(
														i,
														{ is: "sv-header-mobile", model: t.model },
														null,
														8,
														["model"]
													),
											  ]))
											: e.createCommentVNode("", !0),
									],
									6
							  ))
							: e.createCommentVNode("", !0)
				);
			},
		}),
		s1 = { key: 0, class: "sv-header__logo" },
		t1 = ["src", "width", "height", "alt"],
		l1 = e.defineComponent({
			__name: "HeaderCell",
			props: { model: {} },
			setup(a) {
				return (o, t) => (
					e.openBlock(),
					e.createElementBlock(
						"div",
						{
							class: e.normalizeClass(o.model.css),
							style: e.normalizeStyle(o.model.style),
						},
						[
							e.createElementVNode(
								"div",
								{
									class: "sv-header__cell-content",
									style: e.normalizeStyle(o.model.contentStyle),
								},
								[
									o.model.showLogo
										? (e.openBlock(),
										  e.createElementBlock("div", s1, [
												e.createElementVNode(
													"div",
													{
														class: e.normalizeClass(
															o.model.survey.logoClassNames
														),
													},
													[
														e.createElementVNode(
															"img",
															{
																class: e.normalizeClass(
																	o.model.survey.css.logoImage
																),
																src: o.model.survey.locLogo
																	.renderedHtml,
																width: o.model.survey
																	.renderedLogoWidth,
																height: o.model.survey
																	.renderedLogoHeight,
																alt: o.model.survey.locTitle
																	.renderedHtml,
																style: e.normalizeStyle({
																	objectFit:
																		o.model.survey.logoFit,
																	width: o.model.survey
																		.renderedStyleLogoWidth,
																	height: o.model.survey
																		.renderedStyleLogoHeight,
																}),
															},
															null,
															14,
															t1
														),
													],
													2
												),
										  ]))
										: e.createCommentVNode("", !0),
									o.model.showTitle
										? (e.openBlock(),
										  e.createElementBlock(
												"div",
												{
													key: 1,
													class: "sv-header__title",
													style: e.normalizeStyle({
														maxWidth: o.model.textAreaWidth,
													}),
												},
												[
													e.createVNode(
														i,
														{
															is: "survey-element-title",
															element: o.model.survey,
															css: o.model.survey.css,
														},
														null,
														8,
														["element", "css"]
													),
												],
												4
										  ))
										: e.createCommentVNode("", !0),
									o.model.showDescription
										? (e.openBlock(),
										  e.createElementBlock(
												"div",
												{
													key: 2,
													class: "sv-header__description",
													style: e.normalizeStyle({
														maxWidth: o.model.textAreaWidth,
													}),
												},
												[
													o.model.survey.renderedHasDescription
														? (e.openBlock(),
														  e.createElementBlock(
																"div",
																{
																	key: 0,
																	class: e.normalizeClass(
																		o.model.survey.css
																			.description
																	),
																},
																[
																	e.createVNode(
																		i,
																		{
																			is: "survey-string",
																			locString:
																				o.model.survey
																					.locDescription,
																		},
																		null,
																		8,
																		["locString"]
																	),
																],
																2
														  ))
														: e.createCommentVNode("", !0),
												],
												4
										  ))
										: e.createCommentVNode("", !0),
								],
								4
							),
						],
						6
					)
				);
			},
		}),
		r1 = { class: "sv-header--mobile" },
		a1 = { key: 0, class: "sv-header__logo" },
		i1 = ["src", "width", "height", "alt"],
		d1 = e.defineComponent({
			__name: "HeaderMobile",
			props: { model: {} },
			setup(a) {
				return (o, t) => (
					e.openBlock(),
					e.createElementBlock("div", r1, [
						o.model.survey.hasLogo
							? (e.openBlock(),
							  e.createElementBlock("div", a1, [
									e.createElementVNode(
										"div",
										{ class: e.normalizeClass(o.model.survey.logoClassNames) },
										[
											e.createElementVNode(
												"img",
												{
													class: e.normalizeClass(
														o.model.survey.css.logoImage
													),
													src: o.model.survey.locLogo.renderedHtml,
													width: o.model.survey.renderedLogoWidth,
													height: o.model.survey.renderedLogoHeight,
													alt: o.model.survey.locTitle.renderedHtml,
													style: e.normalizeStyle({
														objectFit: o.model.survey.logoFit,
														width: o.model.survey
															.renderedStyleLogoWidth,
														height: o.model.survey
															.renderedStyleLogoHeight,
													}),
												},
												null,
												14,
												i1
											),
										],
										2
									),
							  ]))
							: e.createCommentVNode("", !0),
						o.model.survey.hasTitle
							? (e.openBlock(),
							  e.createElementBlock(
									"div",
									{
										key: 1,
										class: "sv-header__title",
										style: e.normalizeStyle({
											maxWidth: o.model.renderedTextAreaWidth,
										}),
									},
									[
										e.createVNode(
											i,
											{
												is: "survey-element-title",
												element: o.model.survey,
												css: o.model.survey.css,
											},
											null,
											8,
											["element", "css"]
										),
									],
									4
							  ))
							: e.createCommentVNode("", !0),
						o.model.survey.renderedHasDescription
							? (e.openBlock(),
							  e.createElementBlock(
									"div",
									{
										key: 2,
										class: "sv-header__description",
										style: e.normalizeStyle({
											maxWidth: o.model.renderedTextAreaWidth,
										}),
									},
									[
										o.model.survey.renderedHasDescription
											? (e.openBlock(),
											  e.createElementBlock(
													"div",
													{
														key: 0,
														class: e.normalizeClass(
															o.model.survey.css.description
														),
													},
													[
														e.createVNode(
															i,
															{
																is: "survey-string",
																locString:
																	o.model.survey.locDescription,
															},
															null,
															8,
															["locString"]
														),
													],
													2
											  ))
											: e.createCommentVNode("", !0),
									],
									4
							  ))
							: e.createCommentVNode("", !0),
					])
				);
			},
		}),
		m1 = e.defineComponent({
			__name: "Element",
			props: { element: {}, row: {}, css: {} },
			setup(a) {
				const o = a,
					t = e.ref();
				g(() => o.element);
				const n = (m) => (m.isPanel ? "survey-panel" : "survey-question"),
					s = e.computed(() => {
						const m = o.element.survey;
						if (m) {
							const u = m.getElementWrapperComponentName(o.element);
							if (u) return u;
						}
						return n(o.element);
					}),
					l = (m) => (m.cssClasses ? m.rootStyle : {}),
					r = e.computed(() => {
						const m = o.element,
							u = m.survey;
						let c;
						return (
							u && (c = u.getElementWrapperComponentData(m)),
							{
								componentName: n(m),
								componentData: {
									element: m,
									survey: u,
									row: o.row,
									css: o.css,
									data: c,
								},
							}
						);
					}),
					d = e.watch(
						() => o.element,
						(m, u) => {
							u && u.setWrapperElement(void 0), m.setWrapperElement(t.value);
						}
					);
				return (
					e.onMounted(() => {
						o.element.setWrapperElement(t.value);
					}),
					e.onUnmounted(() => {
						o.element.setWrapperElement(void 0), d();
					}),
					(m, u) => (
						e.openBlock(),
						e.createElementBlock(
							"div",
							{
								ref_key: "root",
								ref: t,
								style: e.normalizeStyle(l(m.element)),
								class: e.normalizeClass(m.element.cssClasses.questionWrapper),
							},
							[
								m.row.isNeedRender
									? (e.openBlock(),
									  e.createBlock(
											i,
											e.mergeProps({ key: 0, is: s.value }, r.value),
											null,
											16,
											["is"]
									  ))
									: m.element.skeletonComponentName
									? (e.openBlock(),
									  e.createBlock(
											i,
											{
												key: 1,
												is: m.element.skeletonComponentName,
												element: m.element,
												css: m.css,
											},
											null,
											8,
											["is", "element", "css"]
									  ))
									: e.createCommentVNode("", !0),
							],
							6
						)
					)
				);
			},
		}),
		c1 = e.defineComponent({
			__name: "TemplateRenderer",
			props: { componentName: {}, componentData: {} },
			setup(a) {
				const o = e.useSlots(),
					t = e.computed(() => !!o.default);
				return (n, s) =>
					t.value && !n.componentName
						? e.renderSlot(n.$slots, "default", { key: 0 })
						: (e.openBlock(),
						  e.createBlock(
								i,
								e.mergeProps({ key: 1, is: n.componentName }, n.componentData),
								null,
								16,
								["is"]
						  ));
			},
		}),
		p1 = e.defineComponent({
			__name: "FileCleanButton",
			props: { question: {}, css: {} },
			setup(a) {
				return (o, t) => (
					e.openBlock(),
					e.createElementBlock(
						"button",
						{
							type: "button",
							class: e.normalizeClass(o.css),
							onClick:
								t[0] ||
								(t[0] = (...n) => o.question.doClean && o.question.doClean(...n)),
						},
						[
							e.createElementVNode(
								"span",
								null,
								e.toDisplayString(o.question.clearButtonCaption),
								1
							),
							o.question.cssClasses.removeButtonIconId
								? (e.openBlock(),
								  e.createBlock(
										i,
										{
											key: 0,
											is: "sv-svg-icon",
											iconName: o.question.cssClasses.removeButtonIconId,
											size: "auto",
											title: o.question.clearButtonCaption,
										},
										null,
										8,
										["iconName", "title"]
								  ))
								: e.createCommentVNode("", !0),
						],
						2
					)
				);
			},
		}),
		C1 = ["id"],
		g1 = e.defineComponent({
			__name: "FileVideo",
			props: { question: {} },
			setup(a) {
				return (o, t) => (
					e.openBlock(),
					e.createElementBlock(
						"div",
						{ class: e.normalizeClass(o.question.cssClasses.videoContainer) },
						[
							e.createVNode(
								i,
								{ is: "sv-action", item: o.question.changeCameraAction },
								null,
								8,
								["item"]
							),
							e.createVNode(
								i,
								{ is: "sv-action", item: o.question.closeCameraAction },
								null,
								8,
								["item"]
							),
							e.createElementVNode(
								"video",
								{
									autoplay: "",
									playsinline: "",
									id: o.question.videoId,
									class: e.normalizeClass(o.question.cssClasses.video),
								},
								null,
								10,
								C1
							),
							e.createVNode(
								i,
								{ is: "sv-action", item: o.question.takePictureAction },
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
		u1 = ["for", "aria-label"],
		k1 = e.defineComponent({
			__name: "FileChooseButton",
			props: { data: {}, item: {} },
			setup(a) {
				const o = a,
					t = e.computed(() => {
						var n, s;
						return (
							((n = o.data) == null ? void 0 : n.question) ||
							((s = o.item) == null ? void 0 : s.data.question)
						);
					});
				return (n, s) =>
					e.withDirectives(
						(e.openBlock(),
						e.createElementBlock(
							"label",
							{
								tabindex: "0",
								class: e.normalizeClass(t.value.getChooseFileCss()),
								for: t.value.inputId,
								"aria-label": t.value.chooseButtonText,
								onClick: s[0] || (s[0] = (l) => t.value.chooseFile(l)),
							},
							[
								t.value.cssClasses.chooseFileIconId
									? (e.openBlock(),
									  e.createBlock(
											i,
											{
												key: 0,
												is: "sv-svg-icon",
												title: t.value.chooseButtonText,
												iconName: t.value.cssClasses.chooseFileIconId,
												size: "auto",
											},
											null,
											8,
											["title", "iconName"]
									  ))
									: e.createCommentVNode("", !0),
								e.createElementVNode(
									"span",
									null,
									e.toDisplayString(t.value.chooseButtonText),
									1
								),
							],
							10,
							u1
						)),
						[[e.unref(f)]]
					);
			},
		}),
		y1 = e.defineComponent({
			__name: "FilePreview",
			props: { question: {} },
			setup(a) {
				return (o, t) =>
					o.question.showPreviewContainer
						? (e.openBlock(),
						  e.createElementBlock(
								"div",
								{
									key: 0,
									class: e.normalizeClass(
										o.question.cssClasses.fileList || void 0
									),
								},
								[
									(e.openBlock(!0),
									e.createElementBlock(
										e.Fragment,
										null,
										e.renderList(
											o.question.renderedPages,
											(n) => (
												e.openBlock(),
												e.createBlock(
													i,
													{
														is: "sv-file-page",
														key: n.id,
														page: n,
														question: o.question,
													},
													null,
													8,
													["page", "question"]
												)
											)
										),
										128
									)),
								],
								2
						  ))
						: e.createCommentVNode("", !0);
			},
		}),
		h1 = e.defineComponent({
			__name: "ButtonGroup",
			props: { question: {} },
			setup(a) {
				const o = a,
					t = e.ref();
				return (
					y(o, t),
					(n, s) => (
						e.openBlock(),
						e.createElementBlock(
							"div",
							{
								role: "group",
								class: e.normalizeClass(n.question.cssClasses.root),
								ref_key: "root",
								ref: t,
							},
							[
								(e.openBlock(!0),
								e.createElementBlock(
									e.Fragment,
									null,
									e.renderList(
										n.question.visibleChoices,
										(l, r) => (
											e.openBlock(),
											e.createBlock(
												i,
												{
													is: "sv-button-group-item",
													question: n.question,
													key: r,
													item: l,
													index: r,
												},
												null,
												8,
												["question", "item", "index"]
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
		B1 = ["title"],
		q1 = [
			"name",
			"id",
			"aria-required",
			"aria-label",
			"aria-invalid",
			"aria-errormessage",
			"disabled",
			"value",
		],
		w1 = ["title"],
		f1 = e.defineComponent({
			__name: "ButtonGroupItem",
			props: { item: {}, question: {}, index: {} },
			setup(a) {
				const o = a,
					t = e.computed(() => new k.ButtonGroupItemModel(o.question, o.item, o.index)),
					n = e.computed({
						get: () => o.question.renderedValue,
						set: (s) => {
							const l = o.question;
							l.renderedValue = s;
						},
					});
				return (s, l) => (
					e.openBlock(),
					e.createElementBlock(
						"label",
						{
							class: e.normalizeClass(t.value.css.label),
							title: t.value.caption.renderedHtml,
						},
						[
							e.withDirectives(
								e.createElementVNode(
									"input",
									{
										type: "radio",
										name: t.value.name,
										id: t.value.id,
										"aria-required": t.value.isRequired,
										"aria-label": t.value.caption.renderedHtml,
										"aria-invalid": t.value.hasErrors,
										"aria-errormessage": t.value.describedBy,
										disabled: t.value.readOnly,
										class: e.normalizeClass(t.value.css.control),
										"onUpdate:modelValue":
											l[0] || (l[0] = (r) => (n.value = r)),
										value: t.value.value,
									},
									null,
									10,
									q1
								),
								[[e.vModelRadio, n.value]]
							),
							e.createElementVNode(
								"div",
								{ class: e.normalizeClass(t.value.css.decorator) },
								[
									t.value.iconName
										? (e.openBlock(),
										  e.createBlock(
												i,
												{
													key: 0,
													is: "sv-svg-icon",
													iconName: t.value.iconName,
													size: t.value.iconSize,
													class: e.normalizeClass(t.value.css.icon),
												},
												null,
												8,
												["iconName", "size", "class"]
										  ))
										: e.createCommentVNode("", !0),
									t.value.showCaption
										? (e.openBlock(),
										  e.createElementBlock(
												"span",
												{
													key: 1,
													class: e.normalizeClass(t.value.css.caption),
													title: t.value.caption.renderedHtml,
												},
												[
													e.createVNode(
														i,
														{
															is: "survey-string",
															locString: t.value.caption,
														},
														null,
														8,
														["locString"]
													),
												],
												10,
												w1
										  ))
										: e.createCommentVNode("", !0),
								],
								2
							),
						],
						10,
						B1
					)
				);
			},
		});
	k.RendererFactory.Instance.registerRenderer(
		"buttongroup",
		"dropdown",
		"sv-buttongroup-dropdown"
	);
	const V1 = e.defineComponent({
			inheritAttrs: !1,
			__name: "ButtonGroupDropdown",
			props: { question: {} },
			setup(a) {
				const o = a,
					t = e.ref(null);
				return (
					y(o, t),
					(n, s) => (
						e.openBlock(),
						e.createElementBlock(
							"div",
							{
								class: e.normalizeClass(n.question.cssClasses.rootDropdown),
								ref_key: "root",
								ref: t,
							},
							[
								e.createVNode(
									i,
									{ is: "sv-dropdown", question: n.question },
									null,
									8,
									["question"]
								),
							],
							2
						)
					)
				);
			},
		}),
		b1 = ["src", "width", "height", "alt"],
		L1 = e.defineComponent({
			inheritAttrs: !1,
			__name: "Logo",
			props: { data: {} },
			setup(a) {
				const o = a,
					t = e.computed(() => o.data),
					n = w(() => t.value.locLogo);
				return (s, l) => (
					e.openBlock(),
					e.createElementBlock(
						"div",
						{ class: e.normalizeClass(t.value.logoClassNames) },
						[
							e.createElementVNode(
								"img",
								{
									class: e.normalizeClass(t.value.css.logoImage),
									src: e.unref(n),
									width: t.value.renderedLogoWidth,
									height: t.value.renderedLogoHeight,
									alt: t.value.locTitle.renderedHtml,
									style: e.normalizeStyle({
										objectFit: t.value.logoFit,
										width: t.value.renderedStyleLogoWidth,
										height: t.value.renderedStyleLogoHeight,
									}),
								},
								null,
								14,
								b1
							),
						],
						2
					)
				);
			},
		}),
		N1 = e.defineComponent({
			__name: "SvgBundle",
			setup(a) {
				const o = e.ref(),
					t = () => {
						o.value && (o.value.innerHTML = k.SvgRegistry.iconsRenderedHtml());
					};
				return (
					e.onMounted(() => {
						t(), k.SvgRegistry.onIconsChanged.add(t);
					}),
					e.onUnmounted(() => {
						k.SvgRegistry.onIconsChanged.remove(t);
					}),
					(n, s) =>
						e.withDirectives(
							(e.openBlock(),
							e.createElementBlock(
								"svg",
								{ id: "sv-icon-holder-global-container", ref_key: "root", ref: o },
								null,
								512
							)),
							[[e.vShow, !1]]
						)
				);
			},
		}),
		E1 = ["id"],
		M1 = e.defineComponent({
			__name: "FilePage",
			props: { page: {}, question: {} },
			setup(a) {
				const o = a;
				return (
					g(() => o.page),
					(t, n) => (
						e.openBlock(),
						e.createElementBlock(
							"div",
							{ class: e.normalizeClass(t.page.css), id: t.page.id },
							[
								(e.openBlock(!0),
								e.createElementBlock(
									e.Fragment,
									null,
									e.renderList(
										t.page.items,
										(s) => (
											e.openBlock(),
											e.createBlock(
												i,
												{
													is: "sv-file-item",
													key: s,
													item: s,
													question: t.question,
												},
												null,
												8,
												["item", "question"]
											)
										)
									),
									128
								)),
							],
							10,
							E1
						)
					)
				);
			},
		}),
		S1 = ["href", "title", "download"],
		z1 = ["src"],
		H1 = ["href", "title", "download"],
		I1 = e.defineComponent({
			__name: "FileItem",
			props: { item: {}, question: {} },
			setup(a) {
				return (o, t) =>
					e.withDirectives(
						(e.openBlock(),
						e.createElementBlock(
							"span",
							{
								class: e.normalizeClass(o.question.cssClasses.previewItem),
								onClick:
									t[3] ||
									(t[3] = (n) => o.question.doDownloadFileFromContainer(n)),
							},
							[
								o.item.name && o.question.cssClasses.fileSign
									? (e.openBlock(),
									  e.createElementBlock(
											"div",
											{
												key: 0,
												class: e.normalizeClass(
													o.question.cssClasses.fileSign
												),
											},
											[
												e.createElementVNode(
													"a",
													{
														onClick:
															t[0] ||
															(t[0] = (n) =>
																o.question.doDownloadFile(
																	n,
																	o.item
																)),
														href: o.item.content,
														title: o.item.name,
														download: o.item.name,
														target: "_blank",
														rel: "noreferrer",
														style: e.normalizeStyle({
															width: o.question.imageWidth,
														}),
													},
													e.toDisplayString(o.item.name),
													13,
													S1
												),
											],
											2
									  ))
									: e.createCommentVNode("", !0),
								e.createElementVNode(
									"div",
									{
										class: e.normalizeClass(
											o.question.getImageWrapperCss(o.item)
										),
									},
									[
										o.question.canPreviewImage(o.item)
											? (e.openBlock(),
											  e.createElementBlock(
													"img",
													{
														key: 0,
														src: o.item.content,
														style: e.normalizeStyle({
															height: o.question.imageHeight,
															width: o.question.imageWidth,
														}),
														alt: "File preview",
													},
													null,
													12,
													z1
											  ))
											: e.createCommentVNode("", !0),
										o.question.defaultImage(o.item)
											? (e.openBlock(),
											  e.createBlock(
													i,
													{
														key: 1,
														is: "sv-svg-icon",
														iconName:
															o.question.cssClasses
																.defaultImageIconId,
														class: e.normalizeClass(
															o.question.cssClasses.defaultImage
														),
														size: "auto",
													},
													null,
													8,
													["iconName", "class"]
											  ))
											: e.createCommentVNode("", !0),
										o.item.name && !o.question.isReadOnly
											? (e.openBlock(),
											  e.createElementBlock(
													"div",
													{
														key: 2,
														class: e.normalizeClass(
															o.question.getRemoveButtonCss()
														),
														onClick:
															t[1] ||
															(t[1] = (n) =>
																o.question.doRemoveFile(
																	o.item,
																	n
																)),
													},
													[
														e.createElementVNode(
															"span",
															{
																class: e.normalizeClass(
																	o.question.cssClasses
																		.removeFile
																),
															},
															e.toDisplayString(
																o.question.removeFileCaption
															),
															3
														),
														o.question.cssClasses.removeFileSvgIconId
															? (e.openBlock(),
															  e.createBlock(
																	i,
																	{
																		key: 0,
																		is: "sv-svg-icon",
																		title: o.question
																			.removeFileCaption,
																		class: e.normalizeClass(
																			o.question.cssClasses
																				.removeFileSvg
																		),
																		iconName:
																			o.question.cssClasses
																				.removeFileSvgIconId,
																		size: "auto",
																	},
																	null,
																	8,
																	["title", "class", "iconName"]
															  ))
															: e.createCommentVNode("", !0),
													],
													2
											  ))
											: e.createCommentVNode("", !0),
									],
									2
								),
								o.item.name && o.question.cssClasses.fileSignBottom
									? (e.openBlock(),
									  e.createElementBlock(
											"div",
											{
												key: 1,
												class: e.normalizeClass(
													o.question.cssClasses.fileSignBottom
												),
											},
											[
												e.createElementVNode(
													"a",
													{
														onClick:
															t[2] ||
															(t[2] = (n) =>
																o.question.doDownloadFile(
																	n,
																	o.item
																)),
														href: o.item.content,
														title: o.item.name,
														download: o.item.name,
														target: "_blank",
														rel: "noreferrer",
														style: e.normalizeStyle({
															width: o.question.imageWidth,
														}),
													},
													e.toDisplayString(o.item.name),
													13,
													H1
												),
											],
											2
									  ))
									: e.createCommentVNode("", !0),
							],
							2
						)),
						[[e.vShow, o.item]]
					);
			},
		}),
		R1 = ["onClick"],
		T1 = ["data-responsive-title"],
		$1 = e.defineComponent({
			__name: "MatrixRow",
			props: { question: {}, row: {} },
			setup(a) {
				const o = a;
				g(() => o.row), g(() => o.row.item);
				const t = (n, s) => {
					n.cellClick(s);
				};
				return (n, s) => (
					e.openBlock(),
					e.createElementBlock(
						"tr",
						{ class: e.normalizeClass(n.row.rowClasses || void 0) },
						[
							e.withDirectives(
								e.createElementVNode(
									"td",
									{
										class: e.normalizeClass(n.row.rowTextClasses),
										style: e.normalizeStyle({
											minWidth: n.question.rowTitleWidth,
											width: n.question.rowTitleWidth,
										}),
									},
									[
										e.createVNode(
											i,
											{
												is: n.question.getRowHeaderWrapperComponentName(
													n.row
												),
												componentData:
													n.question.getRowHeaderWrapperComponentData(
														n.row
													),
											},
											{
												default: e.withCtx(() => [
													e.createVNode(
														i,
														{
															is: "survey-string",
															locString: n.row.locText,
														},
														null,
														8,
														["locString"]
													),
												]),
												_: 1,
											},
											8,
											["is", "componentData"]
										),
									],
									6
								),
								[[e.vShow, n.question.hasRows]]
							),
							n.question.hasCellText
								? (e.openBlock(!0),
								  e.createElementBlock(
										e.Fragment,
										{ key: 0 },
										e.renderList(
											n.question.visibleColumns,
											(l) => (
												e.openBlock(),
												e.createElementBlock(
													"td",
													{
														key: l.uniqueId,
														class: e.normalizeClass(
															n.question.getItemClass(n.row, l)
														),
														onClick: (r) => t(n.row, l),
													},
													[
														e.createVNode(
															i,
															{
																is: "survey-string",
																locString:
																	n.question.getCellDisplayLocText(
																		n.row.name,
																		l
																	),
															},
															null,
															8,
															["locString"]
														),
													],
													10,
													R1
												)
											)
										),
										128
								  ))
								: e.createCommentVNode("", !0),
							n.question.hasCellText
								? e.createCommentVNode("", !0)
								: (e.openBlock(!0),
								  e.createElementBlock(
										e.Fragment,
										{ key: 1 },
										e.renderList(
											n.question.visibleColumns,
											(l, r) => (
												e.openBlock(),
												e.createElementBlock(
													"td",
													{
														key: l.uniqueId,
														"data-responsive-title":
															l.locText.renderedHtml,
														class: e.normalizeClass(
															n.question.cssClasses.cell
														),
													},
													[
														e.createVNode(
															i,
															{
																is: n.question.cellComponent,
																question: n.question,
																row: n.row,
																column: l,
																columnIndex: r,
															},
															null,
															8,
															[
																"is",
																"question",
																"row",
																"column",
																"columnIndex",
															]
														),
													],
													10,
													T1
												)
											)
										),
										128
								  )),
						],
						2
					)
				);
			},
		});
	k.SurveyModel.platform = "vue3";
	function D1(a, o, t) {
		a(o, t);
	}
	function W(a) {
		const o = D1.bind(void 0, a);
		o("sv-svg-bundle", N1),
			o("popup-survey", H),
			o("survey-header", Y),
			o("sv-logo-image", L1),
			o("sv-page", X),
			o("survey-row", _),
			o("survey-question", ne),
			o("survey-panel", re),
			o("survey-element-header", ie),
			o("survey-string", de),
			o("sv-string-viewer", S),
			o("sv-string-editor", pe),
			o("sv-skeleton", ge),
			o("sv-scroll", ye),
			o("survey-text", qe),
			o("survey-text-input", Ve),
			o("survey-checkbox", Me),
			o("survey-checkbox-item", He),
			o("survey-radiogroup", Ie),
			o("survey-radiogroup-item", $e),
			o("survey-signaturepad", Pe),
			o("survey-html", We),
			o("survey-image", Ke),
			o("survey-expression", Ge),
			o("survey-file", _e),
			o("sv-file-choose-btn", k1),
			o("sv-file-clean-btn", p1),
			o("sv-file-preview", y1),
			o("sv-file-page", M1),
			o("sv-file-item", I1),
			o("sv-file-video", g1),
			o("survey-imagepicker", xe),
			o("survey-imagepicker-item", to),
			o("survey-imagemap", ao),
			o("survey-comment", io),
			o("survey-dropdown", mo),
			o("sv-dropdown-select", go),
			o("sv-dropdown-option-item", ko),
			o("sv-dropdown", wo),
			o("survey-tagbox", fo),
			o("sv-tagbox", Lo),
			o("sv-tagbox-item", zo),
			o("sv-tagbox-filter", Mo),
			o("survey-ranking", Ho),
			o("survey-ranking-item", Zo),
			o("sv-ranking-item", Ao),
			o("survey-rating", Wo),
			o("sv-rating-item", Qo),
			o("sv-rating-item-smiley", Go),
			o("sv-rating-item-star", Yo),
			o("sv-rating-dropdown", on),
			o("sv-rating-dropdown-item", en),
			o("survey-boolean", sn),
			o("sv-boolean-radio", tn),
			o("sv-boolean-radio-item", an),
			o("sv-boolean-checkbox", gn),
			o("survey-multipletext", un),
			o("sv-multipletext-row", kn),
			o("survey-multipletext-item", Bn),
			o("sv-breadcrumbs", qn),
			o("sv-single-input-summary", Ln),
			o("survey-slider", Mn),
			o("sv-slider-label-item", Sn),
			o("survey-matrix", Tn),
			o("sv-matrix-row", $1),
			o("survey-matrix-row", Dn),
			o("survey-matrix-cell", Pn),
			o("survey-matrixdropdown", Fn),
			o("survey-matrixtable", Un),
			o("survey-matrixheaderrequired", Kn),
			o("survey-matrixdropdown-cell", Gn),
			o("survey-matrixdynamic", vn),
			o("survey-placeholder-matrixdynamic", xn),
			o("sv-matrix-remove-button", os),
			o("sv-matrix-drag-drop-icon", ss),
			o("sv-matrix-detail-button", ls),
			o("survey-paneldynamic", as),
			o("survey-paneldynamicprogress", ds),
			o("survey-paneldynamicprogress-v2", cs),
			o("survey-placeholder-paneldynamic", ps),
			o("sv-paneldynamic-add-btn", gs),
			o("sv-paneldynamic-next-btn", ks),
			o("sv-paneldynamic-prev-btn", hs),
			o("sv-paneldynamic-remove-btn", qs),
			o("sv-paneldynamic-progress-text", ws),
			o("sv-components-container", ht),
			o("sv-progress-buttons", Nt),
			o("sv-navigation-toc", Et),
			o("sv-progress-pages", b),
			o("sv-progress-questions", b),
			o("sv-progress-correctquestions", b),
			o("sv-progress-requiredquestions", b),
			o("survey-errors", Vs),
			o("survey-question-comment", Ls),
			o("survey-element-title", Ns),
			o("survey-element-title-content", Hs),
			o("sv-title-actions", Ts),
			o("sv-brand-info", Fs),
			o("sv-question-error", Us),
			o("sv-svg-icon", Os),
			o("sv-action-bar", Qs),
			o("sv-action", Gs),
			o("sv-action-bar-item", Ys),
			o("sv-action-bar-item-dropdown", xs),
			o("sv-action-bar-separator", et),
			o("sv-list", tt),
			o("sv-list-item-content", it),
			o("sv-list-item-group", dt),
			o("sv-list-item", at),
			o("sv-popup", mt),
			o("sv-popup-container", kt),
			o("popup-pointer", yt),
			o("sv-notifier", At),
			o("survey-other-choice", Ft),
			o("sv-nav-btn", Ot),
			o("survey-customwidget", Qt),
			o("survey-popup-modal", Kt),
			o("survey-composite", Xt),
			o("survey-custom", Yt),
			o("sv-timerpanel", vt),
			o("sv-loading-indicator", e1),
			o("sv-header", n1),
			o("sv-header-cell", l1),
			o("sv-header-mobile", d1),
			o("sv-template-renderer", c1),
			o("sv-character-counter", Jt),
			o("sv-text-area", Gt),
			o("survey-element", m1),
			o("survey-buttongroup", h1),
			o("sv-button-group-item", f1),
			o("sv-buttongroup-dropdown", V1),
			o("survey", L);
	}
	W((a, o) => q.Instance.registerComponent(a, o));
	const Z1 = {
		install(a) {
			a.component("SurveyComponent", L),
				a.component("PopupSurveyComponent", H),
				a.directive("key2click", f),
				W((o, t) => {
					a.component(o, t), q.Instance.registerComponent(o, o);
				});
		},
	};
	(h.ComponentFactory = q),
		(h.PopupSurveyComponent = H),
		(h.SurveyComponent = L),
		(h.SvComponent = i),
		(h.key2ClickDirective = f),
		(h.surveyPlugin = Z1),
		(h.useBase = g),
		(h.useLocString = w),
		(h.useQuestion = y),
		Object.defineProperty(h, Symbol.toStringTag, { value: "Module" });
});
