Ext.define('JaztecAdmin.app.Module', {
    extend: 'Ext.app.Controller',
    data: {
        // Global properties to be shared with all modules.
        appData: {}
    },

    init: function()
    {
        var me = this;
        // Setting some instance specific properties.
        me.data = Ext.apply(
            {
                registered: false,
                cardIndex: 0,
                viewsLoaded: false,
                storesLoaded: false,
                appData: {
                    app: null,
                    mainPanel: null,
                    mainToolbar: null
                }
            },
            me.data
        );
        // Load the views and stores.
        if (!me.viewsLoaded()) {
            me.loadViews();
        }
        if (!me.storesLoaded()) {
            me.loadStores();
        }
        me.callParent(arguments);
    },

    /**
     * Get the views for this controller.
     * @returns {undefined}
     */
    loadViews: function()
    {
        var me = this,
            count,
            it;
        JaztecAdmin.Direct.Framework.getViews({controller: me.id}, function(response){
            count = response.length; it = 0;
            if (count === 0) {
                me.setViewsLoaded(true);
                if (me.storesLoaded()) {
                    me.registerControls();
                }
            }
            me.views = response;
            Ext.each(me.views, function(view, index){
                Ext.Loader.injectScriptElement(
                    Ext.Loader.getPath(view),
                    function() {
                        it++;
                        if (it === count) {
                            me.setViewsLoaded(true);
                            if (me.storesLoaded()) {
                                me.registerControls();
                            }
                        }
                    },
                    function() {}
                );
            });
        });        
    },

    /**
     * Get the stores for this controller.
     * @returns {undefined}
     */
    loadStores: function()
    {
        var me = this,
            count,
            it;
        JaztecAdmin.Direct.Framework.getStores({controller: me.id}, function(response){
            count = response.length; it = 0;
            if (count === 0) {
                me.setStoresLoaded(true);
                if (me.viewsLoaded()) {
                    me.registerControls();
                }
            }
            me.stores = response;
            Ext.each(me.stores, function(store, index){
                Ext.Loader.injectScriptElement(
                    Ext.Loader.getPath(store),
                    function() {
                        it++;
                        if (it === count) {
                            me.setStoresLoaded(true);
                            if (me.viewsLoaded()) {
                                me.registerControls();
                            }
                        }
                    },
                    function() {}
                );
            });
        });
    },

    /**
     * This function should implement code to register actions related
     * to this controller into the global system.
     * @param {JaztecUtils.app.Application} app
     */
    registerSystem: function(app) 
    {
        var me = this;
        me.setApplicationData(app);
    },

    /**
     * This function adds the visual components to the application
     * after all dependancies have been loaded.
     * @returns {undefined}
     */
    registerControls: function() {},

    /**
     * Tells if the module has already registered itself.
     * @returns {boolean}
     */
    isRegistered: function()
    {
        return this.data.registered;
    },

    /**
     * Tells if the views inside the current controller are loaded.
     * @returns {boolean}
     */
    viewsLoaded: function()
    {
        return this.data.viewsLoaded;
    },

    setViewsLoaded: function(loaded)
    {
        this.data.viewsLoaded = loaded;
    },

    setStoresLoaded: function(loaded)
    {
        this.data.storesLoaded = loaded;
    },

    /**
     * Tells if the views inside the current controller are loaded.
     * @returns {boolean}
     */
    storesLoaded: function()
    {
        return this.data.storesLoaded;
    },

    /**
     * Sets whether the module has been registered to the main 
     * application.
     * @param {boolean} registered
     * @returns {undefined}
     */
    setRegistered: function(registered)
    {
        this.data.registered = registered;
    },

    /**
     * Gets the index of this modules card.
     * @returns {Number}
     */
    getCardIndex: function()
    {
        return this.data.cardIndex;
    },

    /**
     * Sets the index of this modules card.
     * @param {Number} index
     * @returns {undefined}
     */
    setCardIndex: function(index)
    {
        this.data.cardIndex = index;
    },

    /**
     * Set the internal variables regarding the application.
     * @param {JaztecUtils.app.Application} app
     * @returns {undefined}
     */
    setApplicationData: function(app)
    {
        var mainPanel = app.viewport.items.get(0).getMainPanel(),
            toolbar = mainPanel.getToolbar();
        this.data.appData.app = app;
        this.data.appData.mainPanel = mainPanel;
        this.data.appData.mainToolbar = toolbar;
    },

    /**
     * Returns the application main toolbar.
     * @returns {Ext.toolbar.Toolbar|null}
     */
    getMainToolbar: function()
    {
        return this.data.appData.mainToolbar;
    },

    /**
     * Returns the application's main cardpanel.
     * @returns {JaztecAdmin.view.main.Panel|null}
     */
    getMainPanel: function()
    {
        return this.data.appData.mainPanel
    },

    /**
     * Adds a toolitem to the main toolbar.
     * @param {Number} index
     * @param {object} cfg
     * @returns {boolean}
     */
    addToolItem: function(index, cfg)
    {
        var me = this,
            mainPanel = me.getMainPanel(),
            toolbar = me.getMainToolbar();
        if (toolbar === null) {
            return false
        }
        // Hooking our own function into the toolbar item.
        cfg = Ext.apply({
            handler: function(button)
            {
                mainPanel.getLayout().setActiveItem(me.getCardIndex());
                me.toggleToolItem(button);
            }
        }, cfg);
        toolbar.insert(index, cfg);
        return true;
    },

    /**
     * Add this modules card to the main application cardpanel.
     * @param {object} cfg
     * @returns {boolean}
     */
    addCard: function(cfg)
    {
        var me = this,
            mainPanel = me.getMainPanel(),
            card = {};
        if (mainPanel === null) {
            return false;
        }
        card = mainPanel.add(cfg);
        me.data.cardIndex = mainPanel.items.indexOf(card);
        return true;
    },

    /**
     * Toggle the current toolbutton on.
     * @param {Ext.button.Button} btn
     */
    toggleToolItem: function(btn)
    {
        var me = this,
            toolbar = me.getMainToolbar();
        toolbar.items.each(function(item) {
            if (undefined != item.iconCls) {
                item.toggle(false, true);
            }
        });
        btn.toggle(true, true);
    }
});
