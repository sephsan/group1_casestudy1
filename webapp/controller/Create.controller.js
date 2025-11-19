sap.ui.define([
    "./BaseController",
    "sap/m/MessageBox"
], (BaseController,MessageBox) => {
    "use strict";

    return BaseController.extend("ordersystem.controller.Create", {
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

           const oToday = new Date();
            const oDateFormat = sap.ui.core.format.DateFormat.getDateInstance({pattern : "yyy-MM-dd"});
            const sDate = oDateFormat.format(oToday);

            var oData = {       
               CreateDate: sDate,
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
        //Cancel event
        onCancel: function () {     
            	MessageBox.warning("The quantity you have reported exceeds the quantity planned.", {
				actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
				emphasizedAction: MessageBox.Action.OK,
				onClose: function (sAction) {
                    if(sAction==='CANCEL')
                    {
                        this.onNavBack();
                    }else{

                    }
	
				},
				dependentOn: this.getView()
			});               
        
            }
        }
        
    ,);
});