sap.ui.define([
    "./BaseController",
    "sap/m/MessageBox",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel"
], (BaseController,MessageBox,MessageToast,JSONModel) => {
    "use strict";

    return BaseController.extend("ordersystem.controller.Create", {
        onInit() {            
           var oModel = this.getOwnerComponent().getModel("productModel"); 
           this.getView().setModel(oModel);
           this.getView().setModel( new JSONModel([]),"tempModel");

        },
        toDetailPage:function(){
            var oRoute = this.getOwnerComponent().getRouter();
            oRoute.navTo("", { id :"111" });


            },

      onSave: function () {
        var that = this;
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
            return;
        }

        if (!idel) {
            bValid = false;
            aErrors.push("Delivering Plant is required.");
            this.byId("inpDeliveringPlant").setValueState("Error");
            return;
        }   

            const oToday = new Date();
                const oDateFormat = sap.ui.core.format.DateFormat.getDateInstance({pattern : "yyy-MM-dd"});
                const sDate = oDateFormat.format(oToday);

                var oData = {       
                CreateDate: sDate,
                ReceivingPlant: irec,
                DeliveringPlant: idel,
                Status: "Released"
                }
                //Trigger HTTP POST operation
                var oController = this;
                oModel.create("/Orders", oData,{
                    success: function (data) {       
                        const msg =  "Order " + data.OrdId + " has been Created"

                        var aResult = oController.getView().getModel("tempModel").getData();

                        aResult.forEach(result => {        
                            result.OrdId =  data.OrdId                 
                            oModel.create("/Product_Orders",result, {
                            success: () => {
                                this.getView().setModel( new JSONModel([]),"tempModel");
                                oModel.refresh(true);
                            },
                                error: (e) => console.log(e)
                            });
                        });    

                       MessageToast.show( msg );            
                       oController.getRouter().navTo("RouteMain");                       
                    },
                    error: function (data){
                    }
                }); 
        },
        onAddProduct:function(){
           if (!this.oDialog) {
                this.oDialog = this.loadFragment({
                    name: "ordersystem.fragment.confirmdialog"
                });
            }
            this.oDialog.then(function(oDialog) {
                oDialog.open();
            });
        }
        ,
        //Cancel event
        onCancel: function () {    
             var oController = this;
            	MessageBox.warning("Are you sure you want to cancel the changes done in the page?", {
				actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
				emphasizedAction: MessageBox.Action.OK,
				onClose: function (sAction) {
                    if(sAction==='CANCEL')
                    {                        
                    }else{
                       oController.navigateBack();
                    }
	
				},
				dependentOn: this.getView()
			});               
        
            }, 
            onAddProdCreate: function() {
            // A null check prevents errors if the dialog is destroyed
            const oDialog = this.byId("idProdDialog");
            const oTable = this.byId("productTable");
            var oModel = this.getOwnerComponent().getModel();
            const payload = {
                OrdId: "12345",
                ProdId: "test",
                ProdDesc: "ProdDesc2",
                Qty: 3,
                Price:200               
              };
            var oResult = this.getView().getModel("tempModel").getProperty("/");
            oResult.push(payload);
            this.getView().getModel("tempModel").setProperty("/",oResult);

            //   oModel.create("/Product_Orders", payload, {
            //     success: () => {
            //         oModel.refresh(true);
            //     },
            //     error: (e) => console.log(e)
            //   });

            if (oDialog) {
                oDialog.close();
            }
          }
        }
        
    ,);
});