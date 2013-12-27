Ext.define('JaztecUtils.mvc.Application', {
    extend: 'Ext.app.Application',
    
    requires: [
        'JaztecUtils.desktop.Launchmenu',
        'JaztecUtils.mvc.module.Settings'
    ],
    
    data: {},
    viewport: {},
    modules: [],

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
                            controller.registerSystem(me);
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
     * @param {JaztecUtils.mvc.Application} app
     */
    showLaunchMenu: function(button, app)
    {
        // Toggle the visibility of the menu. If it is currently showing hide it.
        app.viewport.launchMenu.setVisible(true);
        button.toggle(false);
    },
    /**
     * Creates a launcher menu.
     * @returns {JaztecUtils.desktop.Launchmenu}
     */
    createLaunchMenu: function()
    {
        // Create the launcher menu with an id so it can be tracked.
        var menu = new JaztecUtils.desktop.Launchmenu();
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