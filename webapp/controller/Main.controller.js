sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], (Controller, Filter, FilterOperator) => {
    "use strict";

    return Controller.extend("ordersystem.controller.Main", {
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

        //on table Create button-navigation to Create Order Page
        onCreateOrder:function(){
            var oRoute = this.getOwnerComponent().getRouter();
            oRoute.navTo("Create");
        },

        //on table Delete Order button
        onDeleteOrder:function(){
            
            var oTable = this.byId("tblOrders");
            var aItems = oTable.getItems();
            var oModel = this.getView().getModel();

            aItems.forEach(function(oItem) {
                var oContext = oItem.getBindingContext();
                if (oContext.getProperty("Selected")) {
                    var sPath = oContext.getPath();
                    oModel.remove(sPath, {
                        success: function() {
                            console.log("Deleted:", sPath);
                        },
                        error: function() {
                            console.error("Failed to delete:", sPath);
                        }
                    });
                }
            });
        },

        //on table item press-navigation to Detail Page
        onItemPress:function(){
            var oRoute = this.getOwnerComponent().getRouter();
            oRoute.navTo("Detail", { OrdId :"111" });
        },

        onFilterClear: function(){
            this.getView().byId("inpOrderNumber").setValue("");
            this.getView().byId("dpCreationDate").setValue("");
            this.getView().byId("selStatus").setSelectedKey(""); 
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

        //for status color change
        formatStatusClass: function (sStatus) {
            switch (sStatus) {
                case "Created": return "statusCreated"; break;
                case "Released": return "statusReleased"; break;
                case "Partially Completed": return "statusPartiallyCompleted"; break;
                case "Delivered": return "statusDelivered"; break;
                default: return "";
            }
        }
    });
});