sap.ui.define([
    "./BaseController",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], (BaseController,JSONModel,Filter,FilterOperator) => {
    "use strict";

    return BaseController.extend("ordersystem.controller.Detail", {
        
       onInit: async function() {

            this.oOwnerComponent = this.getOwnerComponent();
			this.oRouter = this.oOwnerComponent.getRouter();

             var oData = this.getOwnerComponent().getModel();
             this.getView().setModel(oData); //product
			this.oRouter.attachRouteMatched(this._onRouteMatched, this);            
            
                
        },
        onPressButtonPress:function(){
       
        }
        ,_fiterOdata:function(){

        },
        onCancel: function () {        
                 this.navigateBack();
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
        onEditOrder:function(){
             var  OrdId = this.getView().byId("inDetOrderNo").getText();                    
             var oRoute = this.getOwnerComponent().getRouter();
            oRoute.navTo("Edit",{
                OrderNumber : OrdId 
            });
        },
        _onRouteMatched:function(oEvent){
       
            var order = oEvent.getParameter("arguments").OrderNumber;            
            var oModel = this.getOwnerComponent().getModel();
               this.getView().bindElement({
                    path: "/Orders('" + order + "')"
                    
    });
         const oTable = this.byId("productOrderTable");
            const oBinding = oTable.getBinding("items");        
 
              var aFilter = [];

            if (order) {
                aFilter.push(new Filter("OrdId", FilterOperator.EQ,order));
                oBinding.filter(aFilter);
            }      

        }
    });
});