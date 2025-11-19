sap.ui.define([
    "./BaseController",
    "sap/ui/model/json/JSONModel"

], (BaseController,JSONModel) => {
    "use strict";

    return BaseController.extend("ordersystem.controller.Detail", {
        
       onInit: async function() {

            this.oOwnerComponent = this.getOwnerComponent();
			this.oRouter = this.oOwnerComponent.getRouter();
			this.oRouter.attachRouteMatched(this._onRouteMatched, this);
             var oData = this.getOwnerComponent().getModel();
             this.getView().setModel(oData); //product
  

        },
        onPressButtonPress:function(){
       
        }
        ,_fiterOdata:function(){

        },
        onCancel: function () {        
                 this.onNavBack();
            }   ,
        calcAmount: function (qty, price) {           
           return qty * price;          
        },
        formatTotalPrice: function(vQuantity, vUnitPrice) {			
	        const fQty   = parseFloat(vQuantity),
                  fPrice = parseFloat(vUnitPrice);
                  
            let fTotal;
            
            if (isNaN(fQty) || isNaN(fPrice)){
                return "0";
            }

            fTotal = fQty * fPrice;
            return `${fTotal.toFixed(0)}`;
        },
        _onRouteMatched:function(oEvent){
       
            var order = oEvent.getParameter("arguments").OrderNumber;            
            var oModel = this.getOwnerComponent().getModel();
               this.getView().bindElement({
                    path: "/Orders('" + order + "')"
    });
            // var sReadUri = oModel.createKey("/Orders",
            //     {
            //         OrdId: order
            //     }
            // );
            // var sData;
            // //Trigger HTTP GET operation
            // oModel.read(sReadUri,{
            //     success: function (data) {             
                    
            //         sData = data;
            //     },
            //     error: function (data){
                    
            //     }
            // });
       

        }
    });
});