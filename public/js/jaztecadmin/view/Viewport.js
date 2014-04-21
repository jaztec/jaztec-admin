/*globals Ext, JaztecAdmin*/
/**
 * @class JaztecAdmin.view.Viewport
 * Viewport for the main application.
 * @author Jasper van Herpt <jasper.v.herpt@gmail.com>
 */
Ext.define('JaztecAdmin.view.Viewport', {
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
