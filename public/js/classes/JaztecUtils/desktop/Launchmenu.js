Ext.define('JaztecUtils.desktop.Launchmenu', {
    extend: 'Ext.panel.Panel',
    
    alias: 'widget.launchmenu',
    id: 'launchmenu',
    defaultAlign: 'bl-tl',
    floating: true,
    shadow: true,
    layout: 'fit',
    width: 300,
    x: 2,
    y: window.window.innerHeight - 76,
    
    initComponent: function()
    {
        var me = this, menu = me.menu;
        
        me.menu = new Ext.menu.Menu({
            border: false,
            floating: false,
            items: menu
        });
        me.menu.layout.align = 'stretch';
      
        me.items = [
            me.menu
        ];
        me.layout = 'fit';
        
        Ext.menu.Manager.register(me);
        me.callParent();
        
        me.toolbar = new Ext.toolbar.Toolbar(Ext.apply({
            dock: 'right',
            vertical: true,
            width: 100,
            listeners: {
                add: function(toolbar, button) {
                    button.on({
                        click: function() {
                            me.hide();
                        }
                    });
                }
            }
        }, me.toolConfig));
        me.toolbar.layout.align = 'stretch';
        me.addDocked(me.toolbar);
        
        delete me.toolItems;        
    },
    
    /**
     * Inserts a menu button at a specified index.
     * @param {integer} index
     * @param {Ext.Component} item
     */
    insertMenuItem: function(index, item)
    {
        var cmp = this.menu;
        cmp.insert(index, item);
    },
    
    /**
     * Adds a button to the menu.
     */
    addMenuItem: function()
    {
        var cmp = this.menu;
        cmp.add.apply(cmp, arguments);
    },
        
    /**
     * Adds a button to the toolbar.
     */
    addToolItem: function()
    {
        var cmp = this.toolbar;
        cmp.add.apply(cmp, arguments);
    }
});