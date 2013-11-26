Ext.define('JaztecAdmin.view.Viewport', {

    extend: 'Ext.container.Viewport',

    layout: {
        type: 'border',
        padding: '0 5 5 5'
    },

    items: [
        {
            id: 'app-header',
            xtype: 'box',
            region: 'north',
            height: 40,
            html: 'Jaztec Admin Module'
        },
        {
            xtype: 'tabpanel',
            region: 'center',
            plain: true,
            layout:'fit',
            items: []
        }
    ]
});
