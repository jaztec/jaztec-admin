Ext.define('JaztecAdmin.app.Application', {
    extend: 'JaztecUtils.mvc.Application',
    name: App.name,
    appFolder: App.basePath + App.appFolder,
    controllers: [
    ],
    /**
     * Main application launch hook.
     */
    launch: function() {
        var me = this;
        // Setup the KJSencha engine.
        me.data = Ext.create('KJSencha.data.Factory');

        // Placeholder for the loaded modules.
        me.modules = [];

        // Create the viewport which will house the application.
        me.viewport = Ext.create('JaztecAdmin.view.Viewport');

        // Create room for the launcher menu.
        me.viewport.launchMenu = me.createLaunchMenu();
        
        // Link the controller finder to the viewport loader.
        me.viewport.loader.on({
            load: function(a) {
                me.loadControllers();
            }
        });
    }
});