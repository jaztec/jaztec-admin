JaztecAdminApp = {};

Ext.application({
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
        JaztecAdminApp.data = Ext.create('KJSencha.data.Factory');

        // Create the viewport which will house the application.
        JaztecAdminApp.viewport = Ext.create('JaztecAdmin.view.Viewport');
        JaztecAdminApp.viewport.loader.on({
            load: function(a) {
                me.loadControllers();
            }
        });
        
    },
    /**
     * Makes a request to the serverside to retreive the controllers which
     * are allowed in this session.
     * @returns {void}
     */
    loadControllers: function() {
        var me = this;
        JaztecAdmin.Direct.Framework.getControllers(
            {},
            function(response) {
                response.every(function(entry) {
                    if (entry) {
                        me.getController(entry);
                    }
                });
            }
        );
    }
});
