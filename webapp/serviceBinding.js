function initModel() {
	var sUrl = "/PredictiveOdataService/services.xsodata/";
	var oModel = new sap.ui.model.odata.ODataModel(sUrl, true);
	sap.ui.getCore().setModel(oModel);
}