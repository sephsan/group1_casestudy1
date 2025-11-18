/* global QUnit */
QUnit.config.autostart = false;

sap.ui.require(["ordersystem/test/integration/AllJourneys"
], function () {
	QUnit.start();
});
