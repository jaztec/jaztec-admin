Ext.define('JaztecAdmin.app.Application', {
    extend: 'JaztecUtils.app.Application',
    name: App.name,
    appFolder: App.basePath + App.appFolder,
    controllers: [
    ],
    init: function()
    {
        var me = this;
        me.callParent(arguments);
    },
    /**
     * Main application launch hook.
     */
    launch: function() {
        var me = this;
    }
});