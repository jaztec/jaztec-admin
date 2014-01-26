Ext.define('JaztecAdmin.view.base.panel.ToolbarPanel', {
    extend: 'Ext.panel.Panel',
    boder: false,
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
            toolItems = me.toolItems || [],
            toolbar = Ext.create('JaztecAdmin.view.base.toolbar.Toolbar', {
                toolItems: toolItems,
                border: false
        });

        toolbar.on({
            'button-click': me.toolItemClicked
        });
        me.tbar = toolbar;

        me.callParent(arguments);
    },
    /**
     * Get the toolbar on this panel.
     * @returns {JaztecAdmin.base.toolbar.Toolbar|Object}
     */
    getToolbar: function() {
        return this.tbar || {};
    },
    /**
     * Handles the event fired when an item in the toolbar has been clicked.
     * @param {JaztecAdmin.base.toolbar.Toolbar} toolbar
     * @param {Ext.button.Button} button 
     */
    toolItemClicked: function(toolbar, button) {
        console.log(toolbar, button);
    }
});