Ext.define('JaztecAdmin.view.base.editor.Master', {
    extend: 'Ext.panel.Panel',
    border: false,

    initComponent: function()
    {
        var me = this,
            items = [];

        me.items = items;
        me.callParent(arguments);
    }
});
