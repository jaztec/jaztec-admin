Ext.define('JaztecUtils.app.Application', {
    extend: 'Ext.app.Application',
    
    mixins: {
        app: 'Ext.ux.desktop.App'
    },
    
    requires: [
        'JaztecAdmin.view.Viewport',
        'JaztecUtils.desktop.Launchmenu',
        'JaztecUtils.mvc.module.Settings'
    ],
    
    desktopCfg: null,
    data: {},
    viewport: {},

    init: function()
    {
        var me = this;
        
        if (me.useQuickTips) {
            Ext.QuickTips.init();
        }

        me.modules = me.getModules();
        if (me.modules) {
            me.initModules(me.modules);
        }
        if (!me.modules) {
            me.modules = [];
        }

//        me.desktopCfg = me.getDesktopConfig();
//        me.desktop = new Ext.ux.desktop.Desktop(desktopCfg);
//
        
        // Setup the KJSencha engine.
        me.data = Ext.create('KJSencha.data.Factory');
        
        // Create the viewport which will house the application.
        me.viewport = Ext.create('JaztecAdmin.view.Viewport');
        var loader = me.data.createCmpLoader('JaztecAdminComponent.Gateway');
        me.viewport.setLoader(loader);
        me.viewport.load();

        // Setup the 
        me.viewport.loader.on({
            load: function(a) {
                me.loadControllers();
            }
        });
        
        Ext.EventManager.on(window, 'beforeunload', me.onUnload, me);
    },
    
    setDesktop: function(desktop)
    {
        var me = this;
        if (me.isReady === true) {
            return false;
        }
        me.desktop = desktop;
        me.isReady = true;
        me.fireEvent('ready', me);
    },
    
    getDesktopConfig: function () {
        var me = this, ret = {};

        return Ext.apply(ret, {
            //cls: 'ux-desktop-black',

            contextMenuItems: [
                { text: 'Change Settings', handler: me.onSettings, scope: me }
            ],

//            shortcuts: Ext.create('Ext.data.Store', {
//                model: 'Ext.ux.desktop.ShortcutModel',
//                data: [
//                    { name: 'Grid Window', iconCls: 'grid-shortcut', module: 'grid-win' },
//                    { name: 'Accordion Window', iconCls: 'accordion-shortcut', module: 'acc-win' },
//                    { name: 'Notepad', iconCls: 'notepad-shortcut', module: 'notepad' },
//                    { name: 'System Status', iconCls: 'cpu-shortcut', module: 'systemstatus'}
//                ]
//            }),

            wallpaper: 'wallpapers/Blue-Sencha.jpg',
            wallpaperStretch: false
        });
    },
    
    onReady: function(fn, scope)
    {
        debugger;
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
                        if (controller.registerSystem !== undefined && !me.moduleExists(controller)) {
                            controller.registerSystem(me);
                        }
                    }
                });
            }
        );
    },
    /**
     * 
     */
    moduleExists: function(module)
    {
        this.modules.every(function(obj){
            if(obj.getController() === module) {
                return true;
            }
        });
        return false;
    }
});