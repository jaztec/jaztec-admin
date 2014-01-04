Ext.define('JaztecUtils.app.Application', {
    extend: 'Ext.app.Application',
    
    requires: [
        'JaztecUtils.view.Viewport',
        'JaztecUtils.view.main.Panel'
    ],
    
    data: {},
    viewport: {},

    /**
     * Initiates the main program.
     */
    init: function()
    {
        var me = this;
        
        // Quicktips when needed.
        if (me.useQuickTips) {
            Ext.QuickTips.init();
        }

        // Setting placeholder for the modules.
        me.modules = [];
        
        // Setup the KJSencha engine.
        me.data = Ext.create('KJSencha.data.Factory');
        
        // Create the viewport which will house the application.
        me.viewport = Ext.create('JaztecUtils.view.Viewport');
        var loader = me.data.createCmpLoader('JaztecAdminComponent.Gateway');
        // Load
        me.viewport.setLoader(loader);
        me.viewport.load();

        // Setup the controller load hook.
        me.viewport.loader.on({
            load: function(a) {
                me.loadControllers();
            }
        });
        
        // Load controllers for the first time.
        me.loadControllers();
        
        // Unload handler.
        Ext.EventManager.on(window, 'beforeunload', me.onUnload, me);
    },
    
    /**
     * Makes a request to the serverside to retreive the controllers which
     * are allowed in this session.
     * @returns {undefined}
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
                        if (controller.registerSystem !== undefined && !me.moduleExists(controller)) {
                            controller.registerSystem(me);
                        }
                    }
                });
            }
        );
    },
    /**
     * Test if a controller with module capabilities already exists 
     * inside the application.
     * @param {JaztecUtils.app.Module} module
     */
    moduleExists: function(module)
    {
        return (this.modules.indexOf(module) !== -1);
    }
});