Ext.define('JaztecAdmin.view.Viewport', {
    extend: 'Ext.container.Viewport',
    layout: 'fit',
    loader: JaztecAdminApp.data.createCmpLoader('JaztecAdminComponent.Gateway'),
    initComponent: function() {
        var me = this;

        me.callParent(arguments);
    }
});
