Ext.define('JaztecAdmin.view.base.editor.Detail', {
    extend: 'Ext.panel.Panel',
    region: 'center',
    border: false,

    initComponent: function()
    {
        var me = this,
            items = [];

        me.items = items;
        me.callParent(arguments);
    }
});
