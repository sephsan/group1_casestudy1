sap.ui.define([
    "./BaseController",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], (BaseController,Filter,FilterOperator) => {
    "use strict";

    return BaseController.extend("ordersystem.controller.Main", {
        onInit() {
  
            var oData = this.getOwnerComponent().getModel();
            this.getView().setModel(oData );
   
        },
        onAfterRendering() {
            //getting text from i18n
            var oBundle = this.getView().getModel("i18n").getResourceBundle();
            var sText = oBundle.getText("tabTitle");

            //Updating the "Number" of records displayed in table
            var oTable = this.byId("tblOrders");
            oTable.attachUpdateFinished(function(oEvent) {
            var iCount = oEvent.getParameter("total");
              this.byId("tblOrdersTitle").setText(sText + "(" + iCount + ")");
              }.bind(this));                           
        },
         onFilterClear: function(){

            var oView = this.getView();
            oView.byId("inpOrderNumber").setValue("");
            // this.getView().byId("inpOrderNumber").setValue("");
            // this.getView().byId("dpCreationDate").setValue("");
            // this.getView().byId("selStatus").setSelectedKey(""); 
        },

        onFilterGo: function(){
            this.getView()
            //Get the input values (to search)
            var sSearchOrderId = this.getView().byId("inpOrderNumber").getValue();
            var sSearchCreateDate = this.getView().byId("dpCreationDate").getValue();
            var sSearchStatus = this.getView().byId("selStatus").getSelectedItem().getText();

            //Create filter
            var aFilter = [];

            if (sSearchOrderId) {
                aFilter.push(new Filter("OrdId", FilterOperator.Contains, sSearchOrderId));
            }
            if (sSearchCreateDate) {            
                aFilter.push(new Filter("CreateDate", FilterOperator.Contains, sSearchCreateDate));
            }
            if (sSearchStatus) {
                aFilter.push(new Filter("Status", FilterOperator.Contains, sSearchStatus));
            }

            const oTable = this.getView().byId("tblOrders");
            const oBinding = oTable.getBinding("items");
            oBinding.filter(aFilter);
        },
                //on table Delete Order button
        onDeleteOrder:function(){
            
            var oTable = this.getView().byId("tblOrders");
            var aItems = oTable.getItems();
            var oModel = this.getOwnerComponent().getModel();

            // Get all selected items
            var aSelItems = oTable.getSelectedItems();

            aSelItems.forEach(function (oItem) {
              var sPath = oItem.getBindingContext().getPath();
                oModel.remove(sPath, {
                success: function () {
                    console.log("Deleted:", sPath);
                },
                error: function () {
                    console.error("Failed to delete:", sPath);
                }
                });
            });
        },
        onItemPress:function(oEvent){
            var  OrdId = oEvent.getSource().getBindingContext().getObject().OrdId;            
             var oRoute = this.getOwnerComponent().getRouter();
            oRoute.navTo("Detail",{
                OrderNumber : OrdId 
            });
        },
        onCreateOrder:function(){
            var oRoute = this.getOwnerComponent().getRouter();
            oRoute.navTo("Create");
        },
           formatStatusClass: function (sStatus) {
              switch (sStatus) {
                //case "Created": return "statusCreated"; 
                //case "Released": return "statusReleased"; 
                //case "Partially Completed": return "statusPartiallyCompleted"; 
                //case "Delivered": return "statusDelivered"; 
                case "Released": return "Warning"; break;
                case "Partially Completed": return "Information"; break;
                case "Delivered": return "Success"; break;
                default: return "None";
            }
        }
    });
});