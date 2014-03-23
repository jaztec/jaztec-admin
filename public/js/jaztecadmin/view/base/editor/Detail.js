/*globals Ext, JaztecAdmin*/
/**
 * A panel to house functionality for a master-detail editor.
 * @author Jasper van Herpt <jasper.v.herpt@gmail.com>
 */
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
