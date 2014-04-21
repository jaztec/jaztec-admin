/*globals Ext, JaztecAdmin*/
/**
 * @class JaztecAdmin.view.base.toolbar.Toolbar
 * A toolbar object with some shortcut functions.
 * @author Jasper van Herpt <jasper.v.herpt@gmail.com>
 */
Ext.define('JaztecAdmin.view.base.toolbar.Toolbar', {
    extend: 'Ext.toolbar.Toolbar',
    initComponent: function() {
        var me = this,
            toolItems = me.toolItems || [];

        me.addEvents(
            'button-click'
        );

        var defaults = me.defaults || {
            scale: 'medium'
        };
        me.defaults = defaults;

        me.callParent(arguments);

        me.readToolItems(toolItems);
    },
    /**
     * Adds a toolitem to the main toolbar.
     * @param {Number} index
     * @param {object} cfg
     * @returns {Ext.Component} The added toolitem.
     */
    addToolItem: function(index, cfg)
    {
        var me = this;
        // Test the index, 
        while (me.items.length < index) {
            index--;
        }
        // Hooking our own function into the toolbar item.
        cfg = Ext.apply({
            listeners: {
                click: function(button) {
                    me.toggleToolItem(button);
                    me.fireEvent('button-click', me, button);
                }
            }
        }, cfg);

        return me.insert(index, cfg);
    },
    /**
     * Toggle the current toolbutton on.
     * @param {Ext.button.Button} btn
     */
    toggleToolItem: function(btn)
    {
        var me = this;
        me.items.each(function(item) {
            if (undefined !== item.toggle) {
                item.toggle(false, true);
            }
        });
        btn.toggle(true, true);
    },
    /**
     * Adds an array of toolitem configurations to the toolbar.
     * @param {Array} items
     */
    readToolItems: function(items) {
        var me = this;
        Ext.each(items, function(item, index) {
            me.addToolItem(index, item);
        });
    }
});