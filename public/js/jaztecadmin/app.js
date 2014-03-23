/*globals Ext, JaztecAdminApp*/
var JaztecAdminApp = JaztecAdminApp || {};
Ext.require('JaztecAdmin.app.Application');
if (JaztecAdminApp === {}) {
    JaztecAdminApp = Ext.apply(JaztecAdminApp, Ext.create('JaztecAdmin.app.Application'));
}
