sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("com.ProductManager.controller.CustomerMap", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf com.ProductManager.view.CustomerMap
		 */
		onInit: function () {
			this.getView().addEventDelegate({
				onBeforeShow: jQuery.proxy(function (evt) {
					this.onBeforeShow(evt);
				}, this)
			});
		},

		onBeforeShow: function () {
			var me = this;
			this.loadGoogleMaps("https://maps.googleapis.com/maps/api/js?key=AIzaSyCukq5lVrp7QlpF2tR-Py8mii1gxqJ4MNM", me.setMapData.bind(me));
		},
		// function for loading google mapsAIzaSyCukq5lVrp7QlpF2tR-Py8mii1gxqJ4MNM AIzaSyCukq5lVrp7QlpF2tR-Py8mii1gxqJ4MNM
		loadGoogleMaps: function (scriptUrl, callbackFn) {
			var script = document.createElement('script');
			script.onload = function () {
				callbackFn();
			}
			script.src = scriptUrl;
			document.body.appendChild(script);
		},

		// function to set map data
		setMapData: function () {
			var address = "Bangalore";
			// var address = [];
			// address[0] = "Bangalore";
			// address[1] = "Mysore";
			this.getCustLocation(address);
		},
		// getCustLocation: function (address) {
		// 	var _self = this;
		// 	debugger;
		// 	for (var i = 0; i < 2; i++) {
		// 		debugger;
		// 		var _address = address[i];
		// 		var geocoder = new google.maps.Geocoder();
		// 		geocoder.geocode({
		// 			'address': _address
		// 		}, function (results, status) {
		// 			if (status == google.maps.GeocoderStatus.OK) {
		// 				debugger;
		// 				sap.ui.getCore().latitude = results[0].geometry.location.lat();
		// 				sap.ui.getCore().longitude = results[0].geometry.location.lng();
		// 				var myCenter = new google.maps.LatLng(sap.ui.getCore().latitude, sap.ui.getCore().longitude);
		// 				var mapProp = {
		// 					center: myCenter,
		// 					zoom: 15,
		// 					scrollwheel: true,
		// 					draggable: true,
		// 					mapTypeId: google.maps.MapTypeId.ROADMAP
		// 				};
		// 				var map = new google.maps.Map(_self.getView().byId("googleMap").getDomRef(), mapProp);
		// 				var marker = new google.maps.Marker({
		// 					position: myCenter
		// 				});
		// 				marker.setMap(map);
		// 			}
		// 		});
		// 	}
		// },

		getCustLocation: function (address) {
			debugger;
			var _self = this;
			var _address = address;
			var geocoder = new google.maps.Geocoder();
			geocoder.geocode({
				'address': _address
			}, function (results, status) {
				debugger;
				if (status == google.maps.GeocoderStatus.OK) {
					sap.ui.getCore().latitude = results[0].geometry.location.lat();
					sap.ui.getCore().longitude = results[0].geometry.location.lng();
					//var myCenter = new google.maps.LatLng(sap.ui.getCore().latitude, sap.ui.getCore().longitude);
					//var myCenter1 = new google.maps.LatLng("12.2958", "76.6394");
					var myCenter1 = new google.maps.LatLng("45.508888", "-73.561668");
					var myCenter2 = new google.maps.LatLng("43.6532", "-79.3832");
					var myCenter3 = new google.maps.LatLng("49.8951", "-97.1384");
					var myCenter4 = new google.maps.LatLng("58.7684", "-94.1650");
					var myCenter5 = new google.maps.LatLng("52.3064", "-81.7277");
					var myCenter6 = new google.maps.LatLng("58.8050", "-122.6972");
					// return (latitude, longitude);
					var mapProp = {
						center: myCenter2,
						zoom: 10,
						scrollwheel: true,
						draggable: true,
						mapTypeId: google.maps.MapTypeId.ROADMAP
					};
					var map = new google.maps.Map(_self.getView().byId("googleMap").getDomRef(), mapProp);
					var marker1 = new google.maps.Marker({
						position: myCenter1,
						title: "Customer 1; pH=7 ; TDS=400"
					});
					var marker2 = new google.maps.Marker({
						position: myCenter2,
						title: "Customer 2; pH=7.5 ; TDS=450"
					});
					var marker3 = new google.maps.Marker({
						position: myCenter3,
						title: "Customer 3; pH=6.8 ; TDS=470"
					});
					var marker4 = new google.maps.Marker({
						position: myCenter4,
						title: "Customer 4; pH=6.5 ; TDS=420"
					});
					var marker5 = new google.maps.Marker({
						position: myCenter5,
						title: "Customer 5; pH=7 ; TDS=400"
					});
					var marker6 = new google.maps.Marker({
						position: myCenter6,
						title: "Customer 6; pH=7.2 ; TDS=440"
					});
					debugger;
					marker1.setMap(map);
					marker2.setMap(map);
					marker3.setMap(map);
					marker4.setMap(map);
					marker5.setMap(map);
					marker6.setMap(map);

				}
			});
		},

		onNavigatePress: function () {
			// var custAddress = "https://www.google.co.in/maps/" + sap.ui.getCore().latitude + "/" + sap.ui.getCore().longitude;
			// var custAddress2 = "https://www.google.co.in/maps/" + sap.ui.getCore().address;
			// console.log(custAddress);
			// console.log(custAddress2);
			var map = "https://maps.google.com/?daddr=" + sap.ui.getCore().address;
			// window.location.replace("https://maps.google.com/?daddr=");
			window.location.replace(map);
		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf com.ProductManager.view.CustomerMap
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf com.ProductManager.view.CustomerMap
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf com.ProductManager.view.CustomerMap
		 */
		//	onExit: function() {
		//
		//	}

	});

});