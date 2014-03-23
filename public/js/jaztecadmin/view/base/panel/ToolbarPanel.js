Ext.define('JaztecAdmin.view.base.panel.ToolbarPanel', {
    extend: 'Ext.panel.Panel',
    border: false,
    data: {},
    layout: {
        type: 'card',
        align: 'stretch'
    },
    requires: [
        'JaztecAdmin.view.base.toolbar.Toolbar'
    ],
    initComponent: function()
    {
        var me = this,
            toolbar = Ext.create('JaztecAdmin.view.base.toolbar.Toolbar', {
                border: false
        });

        // Apply event handling.
        toolbar.on({
            'button-click': Ext.bind(me.toolItemClicked, me)
        });
        me.data = Ext.apply({
            toolbar: toolbar
        }, me.data);
        me.tbar = toolbar;

        me.callParent(arguments);

        me.loadCards(me.cards || []);
    },
    /**
     * Get the toolbar on this panel.
     * @returns {JaztecAdmin.base.toolbar.Toolbar|Object}
     */
    getToolbar: function() {
        return this.data.toolbar || {};
    },
    /**
     * Handles the event fired when an item in the toolbar has been clicked.
     * @param {JaztecAdmin.base.toolbar.Toolbar} toolbar
     * @param {Ext.button.Button} button 
     */
    toolItemClicked: function(toolbar, button) {
        var me = this;
        toolbar.toggleToolItem(button);
        me.getLayout().setActiveItem(button.card);
    },
    /**
     * Add a card to the toolbar panel.
     * @param {Object} cfg
     * @param {Number} index
     */
    addCard: function(cfg, index)
    {
        var me = this,
            card = me.items.add(cfg);
        var config = Ext.merge({
            card: card
        }, cfg.toolButton || {});
        me.getToolbar().addToolItem(index || 0, config);
    },
    /**
     * Loads an array of card configurations.
     * @param {Array} items
     */
    loadCards: function(items)
    {
        var me = this;
        Ext.each(items, function(item, index) {
            me.addCard(item, index);
        });
    }
});
