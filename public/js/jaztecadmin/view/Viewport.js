Ext.define('JaztecAdmin.view.Viewport', {
    extend: 'Ext.container.Viewport',
    loader: JaztecAdminApp.data.createCmpLoader('JaztecAdminComponent.Gateway'),
    initComponent: function() {
        var me = this;
//        JaztecAdminApp.getApplication().loadControllers();
        
        me.callParent(arguments);
    }
});
