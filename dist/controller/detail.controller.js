sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"ui5Trainingsession1/day1/model/formatter"

], function(Controller, MessageBox, formatter) {
	"use strict";

	return Controller.extend("ui5Trainingsession1.day1.controller.detail", {
		onInit: function() {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("second").attachPatternMatched(this._onObjectMatched, this);
		},
		_onObjectMatched: function(oEvent) {

			var sEmp = oEvent.getParameter("arguments").empName;
			
			this.getView().byId("idText2").setText(sEmp);
		},
		
		onBack: function(oEvt) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("first");
		}
	});
});