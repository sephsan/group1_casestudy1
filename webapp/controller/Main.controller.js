sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("ordersystem.controller.Main", {
        onInit() {
  
            var oData = this.getOwnerComponent().getModel();

            this.getView().setModel(oData );

        //    var oTable = this.byId("tblOrders");
        //    oTable.attachUpdateFinished(function(oEvent) {
        //    var iCount = oEvent.getParameter("total");
        //         this.byId("tblOrdersTitle").setText("{i18n>tabTitle}(" + iCount + ")");
        //         }.bind(this));
        },
        onCreateOrder:function(){
            var oRoute = this.getOwnerComponent().getRouter();
            oRoute.navTo("Create");
        }
    });
});