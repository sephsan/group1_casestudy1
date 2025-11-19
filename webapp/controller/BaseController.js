sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/m/MessageToast",
  "sap/ui/model/Filter",
  "sap/ui/model/FilterOperator",
	"sap/ui/core/routing/History"
], (Controller,
	MessageToast,
	Filter,
	FilterOperator,
	History)=>  {
  "use strict";

  return Controller.extend("ordersystem.controller.BaseController", {

  navigateBack: function(sFallbackRoute) {
            const oHistory = History.getInstance();
            const sPreviousHash = oHistory.getPreviousHash();
            const oRouter = this.getRouter();
            if (sPreviousHash !== undefined) {
                window.history.go(-1);
            } else {
                 oRouter.navTo("RouteMain", {}, true);
            }
        },
      getRouter:function(){
        return sap.ui.core.UIComponent.getRouterFor(this);
      },        
      onAddItem: function() {
            if (!this.oDialog) {
                this.oDialog = this.loadFragment({
                    name: "ordersystem.fragment.addproddialog"
                });
            }
            this.oDialog.then(function(oDialog) {
                oDialog.open();
            });
        },
        onCloseDialog: function() {
            // A null check prevents errors if the dialog is destroyed
            const oDialog = this.byId("idProdDialog");
            if (oDialog) {
                oDialog.close();
            }
          }
         
  });
});