JaztecAdminApp = {};

Ext.application({
    name: App.name,
    appFolder: App.basePath + App.appFolder,
    controllers: [
    ],
    launch: function() {
        // Setup the KJSencha engine.
        JaztecAdminApp.data = Ext.create('KJSencha.data.Factory');

        // Create the viewport which will house the application.
        JaztecAdminApp.viewport = Ext.create('JaztecAdmin.view.Viewport');
    },
    /**
     * Makes a request to the serverside to retreive the controllers which
     * are allowed in this session.
     * @param {function} callbackFn The function to called after the controllers where added.
     * @returns {void}
     */
    loadControllers: function(callbackFn) {
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
