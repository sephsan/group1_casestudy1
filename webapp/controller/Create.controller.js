sap.ui.define([
    "sap/ui/core/mvc/Controller",
     "sap/ui/core/routing/History"
], (Controller, History) => {
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
    var oOrder = oModel.getProperty("/Orders");
    var aProducts = oModel.getProperty("/Products");

    var bValid = true;
    var aErrors = [];

    // Reset Value States
    // this.byId("inpReceivingPlant").setValueState("None");
    // this.byId("inpDeliveringPlant").setValueState("None");
    var irec =  this.byId("inpReceivingPlant").getValue();
    var idel =  this.byId("inpDeliveringPlant").getValue();

    // ====== Validate Order Fields ======
    if (!irec) {
        bValid = false;
        aErrors.push("Receiving Plant is required.");
        this.byId("inpReceivingPlant").setValueState("Error");
    }

    if (!idel) {
        bValid = false;
        aErrors.push("Delivering Plant is required.");
        this.byId("inpDeliveringPlant").setValueState("Error");
    }

    // ====== Validate Product List ======
    // if (aProducts.length === 0) {
    //     bValid = false;
    //     aErrors.push("At least one product is required.");
    // }
    //  var oModel = this.getOwnerComponent().getModel();
    //         var oView = this.getView();
    //         //Get input values
    //  var sRec= oView.byId("inpReceivingPlan").getValue();
    //         var sDel = oView.byId("inpDeliveringPlant").getValue();
            var oData = {       
               OrdId: 269586288,
               CreateDate: new Date(),
               ReceivingPlant: irec,
               DeliveringPlant: idel,
               Status: "Created"
            }
            //Trigger HTTP POST operation
            oModel.create("/Orders", oData,{
                success: function (data) {
                },
                error: function (data){
                }
            });
 
        },
        onCancel: function () {
                var oHistory = History.getInstance();
                var sPreviousHash = oHistory.getPreviousHash();
                var oRouter = this.getOwnerComponent().getRouter();

                if (sPreviousHash !== undefined) {
                    window.history.go(-1);
                } else {
                    oRouter.navTo("RouteMain", {}, true);
                }
            }
        }
    ,);
});