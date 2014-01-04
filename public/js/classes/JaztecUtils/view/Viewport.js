Ext.define('JaztecUtils.view.Viewport', {
    extend: 'Ext.container.Viewport',
    layout: 'fit',
    loader: {},
    initComponent: function() {
        var me = this;

        me.callParent(arguments);
    },
    setLoader: function(loader)
    {
        var me = this;
        me.loader = loader;
    },
    load: function()
    {
        var me = this;
        me.getLoader().load();
    }
});
