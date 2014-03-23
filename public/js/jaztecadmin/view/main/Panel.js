Ext.define('JaztecAdmin.view.main.Panel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.jaztec-main-panel',
    layout: 'card',
    items: [],
    initComponent: function()
    {
        var me = this;

        var tbar = new Ext.toolbar.Toolbar({
            alias: 'widget.main-toolbar',
            cls: 'main-toolbar',
            defaults: {
                scale: 'large',
                enableToggle: true,
                rowspan: 3,
                width: 80,
                iconAlign: 'top'
            },
            items: [
                // Only logout for starters.
                '->',
                {
                    text: 'Logout',
                    iconCls: 'icon-logout-medium',
                    action: 'logout',
                    /**
                     * Logout the current user.
                     * @param {Ext.button.Button} button
                     */
                    handler: function(button)
                    {
                        window.location.href = '/user/logout';
                    }
                }

            ]
        });

        me.tbar = tbar;

        // Default values for the screens.
        me.defaults = {
            layout: 'fit',
            border: false
        };
        me.items = [
            // Open empty.
        ];

        me.callParent(arguments);
    },
    
    /**
     * Returns the main toolbar.
     * @returns {Ext.toolbar.Toolbar}
     */
    getToolbar: function()
    {
        var me = this;
        return me.down('toolbar');
    }

});
