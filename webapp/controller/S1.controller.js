var noOfRecords;
sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"ui5Trainingsession1/day1/model/formatter"

], function(abc, MessageBox, formatter) {
	"use strict";

	return sap.ui.core.mvc.Controller.extend("ui5Trainingsession1.day1.controller.S1", {

		formatter: formatter,
		
		onInit: function(){
			//comment
		},
		

		onSubmit: function(oEvt) {
			var sName = this.getView().byId("idName").getValue();
			// 
			// var oView = this.getView();
			// var oInput = oView.byId("idName");
			
			// var sName = oInput.getValue();
			
			if (sName === "") {
				
				this.getView().byId("idName").setValueState("Error");
				sap.m.MessageToast.show("Enter the Mandatory fields!");
				return;
			}

			var sAge = this.getView().byId("idAge").getValue();


			var oModel = this.getOwnerComponent().getModel();
			
			// var oModel = new sap.ui.model.oDataModel();
			
			// oModel.create();

			var sPath;
			var obj = {};

			var that = this;


			sPath = "/emps";

			oModel.read(sPath, {
				success: function(oData) {
					noOfRecords = oData.results.length;

					var nextId = noOfRecords + 1;
					obj.empId = nextId.toString();
					obj.empName = sName;
					obj.empAge = sAge;
					
					oModel.create(sPath, obj, {
						success: function(oResult) {
							that.getView().byId("idPanel1").setExpanded(true);
							that.onSuccess(oResult);
						},
						error: function(response) {
							that.onError(response);
						}
					});
				},
				error: function(res) {
					sap.m.MessageToast.show(res);
				}
			});

		},

		onSuccess: function() {
			sap.m.MessageBox.success("Record Created Successfully!");
		},
		onError: function(res) {
			sap.m.MessageBox.error("Error While Saving Data!");
		},

		onDelete: function(oEvt) {

			var oItem = this.getView().byId("idTab1").getSelectedItem();

			var sPath = oItem.getBindingContext().getPath();

			var oModel = this.getOwnerComponent().getModel();

			oModel.remove(sPath, {
				success: function(resonse) {
					MessageBox.success("Data Deleted Successfully");
				},
				error: function(err) {
					MessageBox.error("Error While Deleting Data");
				}
			});

		},

		onDetail: function(oEvt) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("second", {
				empName: "Test Employee"
			});
		}

	});
});