sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], (Controller, Filter, FilterOperator) => {
    "use strict";

    return Controller.extend("ordersystem.controller.Main", {
        onInit() {
  
            var oModel = this.getOwnerComponent().getModel();

            // Initialize SelectedRow for each order
            //var aOrders = oModel.getProperty("/Orders");
            //aOrders.forEach(function(oOrder) {
            //    oOrder.SelectedRow = false;
            //});
            //oModel.setProperty("/Orders", aOrders);
            oModel.refresh(true);
            this.getView().setModel(oModel);
            
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

        //on table item press-navigation to Detail Page
        onItemPress:function(oEvt){
            var oOrdId = oEvt.getsource().getBindingContext().getObject().OrdId;
            var oRoute = this.getOwnerComponent().getRouter();
            oRoute.navTo("Detail", { OrderNumber : oOrdId });
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