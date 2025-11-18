sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("ordersystem.controller.Create", {
        onInit() {
            
              var oModel = this.getOwnerComponent().getModel("productModel"); 

           this.getView().setModel(oModel);
        },
        toDetailPage:function(){
            var oRoute = this.getOwnerComponent().getRouter();
            oRoute.navTo("", { id :"111" });


            },

      onSave: function () {
    var oModel = this.getView().getModel();
    var oOrder = oModel.getProperty("/Order");
    var aProducts = oModel.getProperty("/Products");

    var bValid = true;
    var aErrors = [];

    // Reset Value States
    this.byId("inpReceivingPlant").setValueState("None");
    this.byId("inpDeliveringPlant").setValueState("None");

    // ====== Validate Order Fields ======
    if (!oOrder.ReceivingPlant) {
        bValid = false;
        aErrors.push("Receiving Plant is required.");
        this.byId("inpReceivingPlant").setValueState("Error");
    }

    if (!oOrder.DeliveringPlant) {
        bValid = false;
        aErrors.push("Delivering Plant is required.");
        this.byId("inpDeliveringPlant").setValueState("Error");
    }

    // ====== Validate Product List ======
    if (aProducts.length === 0) {
        bValid = false;
        aErrors.push("At least one product is required.");
    }
 
        },
        }
    ,);
});