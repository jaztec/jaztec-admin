Ext.define('JaztecAdmin.app.Module', {
    extend: 'Ext.app.Controller',
    data: {
        // Global properties to be shared with all modules.
        appData: {
            app: null,
            mainPanel: null,
            mainToolbar: null
        }
    },

    init: function()
    {
        var me = this;
        // Setting some instance specific properties.
        me.data = Ext.apply(
            {
                registered: false,
                cardIndex: 0,
            },
            me.data
        );
        me.callParent(arguments);
    },

    /**
     * This function should implement code to register actions related
     * to this controller into the global system.
     * @param {JaztecUtils.app.Application} app
     */
    registerSystem: function(app) {},

    /**
     * Tells if the module has already registered itself.
     * @returns {boolean}
     */
    isRegistered: function()
    {
        return this.data.registered;
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
