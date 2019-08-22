sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"com/ProductManager/model/formatter",
	"sap/viz/ui5/controls/common/feeds/FeedItem"
], function (Controller, formatter, FeedItem) {
	"use strict";

	return Controller.extend("com.ProductManager.controller.PALGraph", {

		formatter: formatter,

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf com.ProductManager.view.PALGraph
		 */
		onInit: function () {
			this.actualData();
			this.predictedData();
			this.actualDataTDS();
			this.predictedTDS();
			this.actualWaterConsumption();
			this.predictedWaterConsumption();
			this.odataService = new sap.ui.model.odata.ODataModel(
				"/services.xsodata/", true);
		},
		predictedData: function () {
			// var oModel = new sap.ui.model.odata.ODataModel(
			// 	"https://ei9t91ukmq3z3cmf-paltest-xsjs.cfapps.eu10.hana.ondemand.com/services.xsodata/Forecast?$top=20", true);
			// console.log(oModel);
			var tempVar = 10;
			var oModel = this.getOwnerComponent().getModel();
			var oMyDataModel = new sap.ui.model.json.JSONModel();
			this.getView().setModel(oMyDataModel, "oXSODataModel");
			oModel.read("/Forecast?$top='" + tempVar + "'", {
				success: cSuccess,
				failed: cFailed
			});

			function cSuccess(data, response) {
				var oRef = this;
				oMyDataModel.setData(response.data);
				console.log(response);
			}

			function cFailed(response) {
				console.log(response);
			}
			this.getView().setModel(oMyDataModel, "oXSODataModel");
			var oVizFrame = this.getView().byId("vizFramePredicted");
			// var axis = new sap.viz.ui5.types.Axis().setScale(new sap.viz.ui5.types.Axis_scale().setMinValue(0).setMaxValue(5));
			oVizFrame.setModel("oXSODataModel");
			var vizProperties = {
				interaction: {
					zoom: {
						enablement: "enabled"
					},
					selectability: {
						mode: "EXCLUSIVE"
					}
				},
				// valueAxis: {
				// 	title: {
				// 		visible: false
				// 	},
				// 	visible: true,
				// 	axisLine: {
				// 		visible: false
				// 	},
				// 	// label: {
				// 	//                   formatString: 'axisFormat'
				// 	// //               }
				// 	// label: {
				// 	// 	linesOfWrap: 2,
				// 	// 	// formatString: 'axisFormat',
				// 	// 	visible: true,
				// 	// 	style: {
				// 	// 		fontSize: "10px"
				// 	// 	}
				// 	// },

				// },
				categoryAxis: {
					title: {
						visible: true,
						text: "Next 10 Days"
					},
					axisLine: {
						visible: false
					},
					label: {
						linesOfWrap: 2,
						rotation: "fixed",
						angle: 45,
						style: {
							fontSize: "10px"
						}
					},
					axisTick: {
						shortTickVisible: false
					}
				},
				title: {
					text: "pH Output Predicted Data",
					visible: true
				},
				// subtitle: {
				// 	text: "pH >10",
				// 	visible: true
				// },
				legend: {
					visible: true,
					position: "left"
				},
				plotArea: {
					colorPalette: ["Orange"],
					gridline: {
						visible: false
					},
					// yAxis: axis,

					// measures: [{
					// 		name: 'pHOutput',
					// 		value: '{pHOutput}'
					// 	},

					// referenceLine: {
					// 	line: {
					// 		primaryValues: [{
					// 			value: "7.8",
					// 			color: "#0000FF",
					// 			type: "line",
					// 			label: {
					// 				text: "Min Value"
					// 			}
					// 		}, {
					// 			value: "9.8",
					// 			color: "#FF0000",
					// 			type: "line",
					// 			label: {
					// 				text: "Max Value"
					// 			}
					// 		}]
					// 	}

					// },
					dataLabel: {
						visible: true,
						style: {
							fontWeight: 'bold'
						},
						hideWhenOverlap: false
					},
					seriesStyle: {
						"rules": [{
							"dataContext": {
								"Budget": '*'
							},
							"properties": {
								"dataPoint": {
									"pattern": "noFill"
								}
							}
						}]
					},
					dataPointStyleMode: "update",
					// dataPointStyle: {
					// 	"rules": [{
					// 		// "dataContext": 
					// 		// [{
					// 		// 	pHOutput: { in : ["Q1 '18", "Q2 '18"]
					// 		// 	},
					// 		// 	"Actuals": "*"
					// 		// }],
					// 		// "properties": {
					// 		// 	"pattern": "diagonalLightStripe"
					// 		// },
					// 		// displayName: "Forecast"
					// 		"dataContext": {
					// 			"pHOutput": {
					// 				"max": 9.8
					// 			}
					// 		},
					// 		properties: {
					// 			"color": "sapUiChartPaletteSemanticBad"
					// 		},
					// 		"displayName": "pH level in water is not good"
					// 	}]
					// }
					dataPointStyle: {
						"rules": [{
							"dataContext": {
								"pHOutput": {
									"min": 10
								}
							},
							"properties": {
								"color": "red"
							},
							"displayName": "pHOutput > 10"
						}],
						"others": {
							"properties": {
								"color": "green"
							},
							"displayName": "pHOutput < 10"
						}
					}
				}
			};

			// oVizFrame.setVizScales([{
			// 	feed: "valueAxis",
			// 	min: "1",
			// 	max: "50"
			// }], {
			// 	replace: true
			// });

			// var feedPrimaryValues = new sap.viz.ui5.controls.common.feeds.FeedItem({
			// 	'uid': "valueAxis",
			// 	'type': "Measure",
			// 	'values': ["pHOutput"]
			// });
			// oVizFrame.addFeed(feedPrimaryValues);
			// var feedValueAxis = new FeedItem({
			// 	'uid': "valueAxis",
			// 	'type': "Measure",
			// 	'values': ["pHOutput"]
			// });
			// oVizFrame.addFeed(feedValueAxis);
			oVizFrame.setVizProperties(vizProperties);
			var oPopover = new sap.viz.ui5.controls.Popover({});
			oPopover.connect(oVizFrame.getVizUid());
		},

		actualData: function () {
			var tempVar = 10;
			var oModel = this.getOwnerComponent().getModel();
			var oMyActualDataModel = new sap.ui.model.json.JSONModel();
			this.getView().setModel(oMyActualDataModel, "oXSOActualDataModel");
			oModel.read("/IoT?$top='" + tempVar + "'", {
				success: cSuccess,
				failed: cFailed
			});

			function cSuccess(data, response) {
				var oRef = this;
				oMyActualDataModel.setData(response.data);
				console.log(response);
			}

			function cFailed(response) {
				console.log(response);
			}
			this.getView().setModel(oMyActualDataModel, "oXSOActualDataModel");
			var oVizFrame = this.getView().byId("vizFrameActual");
			oVizFrame.setModel("oXSOActualDataModel");
			var vizProperties = {
				interaction: {
					zoom: {
						enablement: "disabled"
					},
					selectability: {
						mode: "EXCLUSIVE"
					}
				},
				// valueAxis: {
				// 	title: {
				// 		visible: false
				// 	},
				// 	visible: true,
				// 	axisLine: {
				// 		visible: false
				// 	},
				// 	label: {
				// 		linesOfWrap: 2,
				// 		visible: false,
				// 		style: {
				// 			fontSize: "9px"
				// 		}
				// 	}
				// },
				categoryAxis: {
					title: {
						visible: true,
						text: "Date"
					},
					axisLine: {
						visible: false
					},
					label: {
						linesOfWrap: 2,
						rotation: "fixed",
						angle: 45,
						style: {
							fontSize: "10px"
						}
					},
					axisTick: {
						shortTickVisible: false
					}
				},
				title: {
					text: "pH Output",
					visible: true
				},
				legend: {
					visible: true
				},
				plotArea: {
					colorPalette: ["green"],
					gridline: {
						visible: false
					},
					dataLabel: {
						visible: true,
						style: {
							fontWeight: 'bold'
						},
						hideWhenOverlap: false
					},
					seriesStyle: {
						"rules": [{
							"dataContext": {
								"Budget": '*'
							},
							"properties": {
								"dataPoint": {
									"pattern": "noFill"
								}
							}
						}]
					},
					dataPointStyleMode: "update",
					dataPointStyle: {
						// "rules": [{
						// 	"dataContext": [{
						// 		Period: { in : ["Q1 '18", "Q2 '18"]
						// 		},
						// 		"Actuals": "*"
						// 	}],
						// 	"properties": {
						// 		"pattern": "diagonalLightStripe"
						// 	},
						// 	displayName: "Forecast"
						// }]
						"rules": [{
							"dataContext": {
								"pHOutput": {
									"min": 10
								}
							},
							"properties": {
								"color": "red"
							},
							"displayName": "pHOutput > 10"
						}],
						"others": {
							"properties": {
								"color": "green"
							},
							"displayName": "pHOutput < 10"
						}

					}
				}
			};

			oVizFrame.setVizProperties(vizProperties);
			var oPopover = new sap.viz.ui5.controls.Popover({});
			oPopover.connect(oVizFrame.getVizUid());

		},
		actualDataTDS: function () {
			var tempVar = 10;
			var oModel = this.getOwnerComponent().getModel();
			var oMyActualDataModel = new sap.ui.model.json.JSONModel();
			this.getView().setModel(oMyActualDataModel, "oXSOActualDataModel");
			oModel.read("/IoT?$top='" + tempVar + "'", {
				success: cSuccess,
				failed: cFailed
			});

			function cSuccess(data, response) {
				var oRef = this;
				oMyActualDataModel.setData(response.data);
				console.log(response);
			}

			function cFailed(response) {
				console.log(response);
			}
			this.getView().setModel(oMyActualDataModel, "oXSOActualDataModel");
			var oVizFrame = this.getView().byId("vizFrameActualTDS");
			oVizFrame.setModel("oXSOActualDataModel");
			var vizProperties = {
				interaction: {
					zoom: {
						enablement: "disabled"
					},
					selectability: {
						mode: "EXCLUSIVE"
					}
				},
				// valueAxis: {
				// 	title: {
				// 		visible: false
				// 	},
				// 	visible: true,
				// 	axisLine: {
				// 		visible: false
				// 	},
				// 	label: {
				// 		linesOfWrap: 2,
				// 		visible: false,
				// 		style: {
				// 			fontSize: "9px"
				// 		}
				// 	}
				// },
				categoryAxis: {
					title: {
						visible: true,
						text: "Date"
					},
					axisLine: {
						visible: false
					},
					label: {
						linesOfWrap: 2,
						rotation: "fixed",
						angle: 45,
						style: {
							fontSize: "10px"
						}
					},
					axisTick: {
						shortTickVisible: false
					}
				},
				title: {
					text: "TDS Output",
					visible: true
				},
				legend: {
					visible: true
				},
				plotArea: {
					colorPalette: ["green"],
					gridline: {
						visible: false
					},
					dataLabel: {
						visible: true,
						style: {
							fontWeight: 'bold'
						},
						hideWhenOverlap: false
					},
					seriesStyle: {
						"rules": [{
							"dataContext": {
								"Budget": '*'
							},
							"properties": {
								"dataPoint": {
									"pattern": "noFill"
								}
							}
						}]
					},
					dataPointStyleMode: "update",
					dataPointStyle: {
						"rules": [{
							"dataContext": {
								"TDSOutput": {
									"min": 350
								}
							},
							"properties": {
								"color": "red"
							},
							"displayName": "TDSOutput > 350"
						}],
						"others": {
							"properties": {
								"color": "green"
							},
							"displayName": "TDSOutput < 350"
						}
					}
				}
			};

			oVizFrame.setVizProperties(vizProperties);
			var oPopover = new sap.viz.ui5.controls.Popover({});
			oPopover.connect(oVizFrame.getVizUid());
		},
		predictedTDS: function () {
			var tempVar = 10;
			var oModel = this.getOwnerComponent().getModel();
			var oMyDataModel = new sap.ui.model.json.JSONModel();
			this.getView().setModel(oMyDataModel, "oXSODataModel");
			oModel.read("/Forecast?$top='" + tempVar + "'", {
				success: cSuccess,
				failed: cFailed
			});

			function cSuccess(data, response) {
				var oRef = this;
				oMyDataModel.setData(response.data);
				console.log(response);
			}

			function cFailed(response) {
				console.log(response);
			}
			this.getView().setModel(oMyDataModel, "oXSODataModel");
			var oVizFrame = this.getView().byId("vizFramePredictedTDS");
			oVizFrame.setModel("oXSODataModel");
			var vizProperties = {
				interaction: {
					zoom: {
						enablement: "disabled"
					},
					selectability: {
						mode: "EXCLUSIVE"
					}
				},
				// valueAxis: {
				// 	title: {
				// 		visible: false
				// 	},
				// 	visible: true,
				// 	axisLine: {
				// 		visible: false
				// 	},
				// 	label: {
				// 		linesOfWrap: 2,
				// 		visible: false,
				// 		style: {
				// 			fontSize: "25px"
				// 		}
				// 	}
				// },
				categoryAxis: {
					title: {
						visible: true,
						text: "Next 10 Days"
					},
					axisLine: {
						visible: false
					},
					label: {
						linesOfWrap: 2,
						rotation: "fixed",
						angle: 45,
						style: {
							fontSize: "10px"
						}
					},
					axisTick: {
						shortTickVisible: false
					}
				},
				title: {
					text: "TDS Ouput Predicted Data",
					visible: true
				},
				legend: {
					visible: true
				},
				plotArea: {
					colorPalette: ["brown"],
					gridline: {
						visible: false
					},
					dataLabel: {
						visible: true,
						style: {
							fontWeight: 'bold'
						},
						hideWhenOverlap: false
					},
					seriesStyle: {
						"rules": [{
							"dataContext": {
								"Budget": '*'
							},
							"properties": {
								"dataPoint": {
									"pattern": "noFill"
								}
							}
						}]
					},
					dataPointStyleMode: "update",
					dataPointStyle: {
						// "rules": [{
						// 	"dataContext": {
						// 		"WaterConsumption": {
						// 			"min": 120
						// 		}
						// 	},
						// 	"properties": {
						// 		"color": "red"
						// 	},
						// 	"displayName": "WaterConsumption > 120"
						// }],
						// "others": {
						// 	"properties": {
						// 		"color": "green"
						// 	},
						// 	"displayName": "WaterConsumption < 120"
						// }
						"rules": [{
							"dataContext": {
								"TDSOutput": {
									"min": 350
								}
							},
							"properties": {
								"color": "red"
							},
							"displayName": "TDSOutput > 350"
						}],
						"others": {
							"properties": {
								"color": "green"
							},
							"displayName": "TDSOutput < 350"
						}
					}
				}
			};

			oVizFrame.setVizProperties(vizProperties);
			var oPopover = new sap.viz.ui5.controls.Popover({});
			oPopover.connect(oVizFrame.getVizUid());
		},
		actualWaterConsumption: function () {
			var tempVar = 10;
			var oModel = this.getOwnerComponent().getModel();
			var oMyActualDataModel = new sap.ui.model.json.JSONModel();
			this.getView().setModel(oMyActualDataModel, "oXSOActualDataModel");
			oModel.read("/IoT?$top='" + tempVar + "'", {
				success: cSuccess,
				failed: cFailed
			});

			function cSuccess(data, response) {
				var oRef = this;
				oMyActualDataModel.setData(response.data);
				console.log(response);
			}

			function cFailed(response) {
				console.log(response);
			}
			this.getView().setModel(oMyActualDataModel, "oXSOActualDataModel");
			var oVizFrame = this.getView().byId("vizFrameActualWC");
			oVizFrame.setModel("oXSOActualDataModel");
			var vizProperties = {
				interaction: {
					zoom: {
						enablement: "disabled"
					},
					selectability: {
						mode: "EXCLUSIVE"
					}
				},
				// valueAxis: {
				// 	title: {
				// 		visible: false
				// 	},
				// 	visible: true,
				// 	axisLine: {
				// 		visible: false
				// 	},
				// 	label: {
				// 		linesOfWrap: 2,
				// 		visible: false,
				// 		style: {
				// 			fontSize: "9px"
				// 		}
				// 	}
				// },
				categoryAxis: {
					title: {
						visible: true,
						text: "Date"
					},
					axisLine: {
						visible: false
					},
					label: {
						linesOfWrap: 2,
						rotation: "fixed",
						angle: 45,
						style: {
							fontSize: "10px"
						}
					},
					axisTick: {
						shortTickVisible: false
					}
				},
				title: {
					text: "Waterconsumption",
					visible: true
				},
				legend: {
					visible: true
				},
				plotArea: {
					colorPalette: ["Green"],
					gridline: {
						visible: false
					},
					dataLabel: {
						visible: true,
						style: {
							fontWeight: 'bold'
						},
						hideWhenOverlap: false
					},
					seriesStyle: {
						"rules": [{
							"dataContext": {
								"Budget": '*'
							},
							"properties": {
								"dataPoint": {
									"pattern": "noFill"
								}
							}
						}]
					},
					dataPointStyleMode: "update",
					dataPointStyle: {
						"rules": [{
							"dataContext": {
								"WaterConsumption": {
									"min": 80
								}
							},
							"properties": {
								"color": "red"
							},
							"displayName": "WaterConsumption > 80"
						}],
						"others": {
							"properties": {
								"color": "green"
							},
							"displayName": "WaterConsumption < 80"
						}
					}
				}
			};

			oVizFrame.setVizProperties(vizProperties);
			var oPopover = new sap.viz.ui5.controls.Popover({});
			oPopover.connect(oVizFrame.getVizUid());
		},
		predictedWaterConsumption: function () {
			var tempVar = 10;
			var oModel = this.getOwnerComponent().getModel();
			var oMyDataModel = new sap.ui.model.json.JSONModel();
			this.getView().setModel(oMyDataModel, "oXSODataModel");
			oModel.read("/Forecast?$top='" + tempVar + "'", {
				success: cSuccess,
				failed: cFailed
			});

			function cSuccess(data, response) {
				var oRef = this;
				oMyDataModel.setData(response.data);
				console.log(response);
			}

			function cFailed(response) {
				console.log(response);
			}
			this.getView().setModel(oMyDataModel, "oXSODataModel");
			var oVizFrame = this.getView().byId("vizFramePredictedWC");
			oVizFrame.setModel("oXSODataModel");
			var vizProperties = {
				interaction: {
					zoom: {
						enablement: "disabled"
					},
					selectability: {
						mode: "EXCLUSIVE"
					}
				},
				// valueAxis: {
				// 	title: {
				// 		visible: false
				// 	},
				// 	visible: true,
				// 	axisLine: {
				// 		visible: false
				// 	},
				// 	label: {
				// 		linesOfWrap: 2,
				// 		visible: false,
				// 		style: {
				// 			fontSize: "25px"
				// 		}
				// 	}
				// },
				categoryAxis: {
					title: {
						visible: true,
						text: "Next 10 Days"
					},
					axisLine: {
						visible: false
					},
					label: {
						linesOfWrap: 2,
						rotation: "fixed",
						angle: 45,
						style: {
							fontSize: "10px"
						}
					},
					axisTick: {
						shortTickVisible: false
					}
				},
				title: {
					text: "Waterconsumption Predicted Data",
					visible: true
				},
				legend: {
					visible: true
				},
				plotArea: {
					colorPalette: ["purple"],
					gridline: {
						visible: false
					},
					dataLabel: {
						visible: true,
						style: {
							fontWeight: 'bold'
						},
						hideWhenOverlap: false
					},
					seriesStyle: {
						"rules": [{
							"dataContext": {
								"Budget": '*'
							},
							"properties": {
								"dataPoint": {
									"pattern": "noFill"
								}
							}
						}]
					},
					dataPointStyleMode: "update",
					dataPointStyle: {
						"rules": [{
							"dataContext": {
								"WaterConsumption": {
									"min": 100
								}
							},
							"properties": {
								"color": "red"
							},
							"displayName": "WaterConsumption > 100"
						}],
						"others": {
							"properties": {
								"color": "green"
							},
							"displayName": "WaterConsumption < 100"
						}
					}
				}
			};

			oVizFrame.setVizProperties(vizProperties);
			var oPopover = new sap.viz.ui5.controls.Popover({});
			oPopover.connect(oVizFrame.getVizUid());
		},

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf com.ProductManager.view.PALGraph
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf com.ProductManager.view.PALGraph
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf com.ProductManager.view.PALGraph
		 */
		//	onExit: function() {
		//
		//	}

	});

});