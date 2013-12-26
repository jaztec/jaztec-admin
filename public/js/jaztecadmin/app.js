JaztecAdminApp = {};

Ext.application({
    name: App.name,
    appFolder: App.basePath + App.appFolder,
    requires: [
        'JaztecAdmin.view.utils.Launchmenu'
    ],
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
        // Create room for the launcher menu.
        JaztecAdminApp.viewport.launchMenu = me.createLaunchMenu();
        // Link the controller finder to the viewport loader.
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
    loadControllers: function()
    {
        var me = this,
            controller = null;
        JaztecAdmin.Direct.Framework.getControllers(
            {},
            function(response) {
                // Load all controllers into the application.
                response.every(function(entry) {
                    controller = null;
                    if (entry) {
                        controller = me.getController(entry);
                        // Test if the controller provides register functionality
                        if (controller.registerSystem !== undefined) {
                            controller.registerSystem();
                        }
                    }
                });
            }
        );
    },
    /**
     * Shows the launcher menu in the bottom left corner of the screen.
     * If the launcher panel doesn't exist it will be loaded.
     * @param {Ext.button.Button} button
     */
    showLaunchMenu: function(button)
    {
        // Toggle the visibility of the menu. If it is currently showing hide it.
        JaztecAdminApp.viewport.launchMenu.setVisible(true);
        button.toggle(false);
    },
    /**
     * Creates a launcher menu.
     * @returns {JaztecAdmin.view.utils.Launchmenu}
     */
    createLaunchMenu: function()
    {
        // Create the launcher menu with an id so it can be tracked.
        var menu = new JaztecAdmin.view.utils.Launchmenu();
        menu.addMenuItem({
            text: 'Logout',
            handler: function(button) 
            {
                window.location.href = '/user/logout';
            }
        });
        return menu;
    }
});
