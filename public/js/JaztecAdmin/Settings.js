/*!
 * Ext JS Library 4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */

Ext.define('JaztecAdmin.Settings', {
    extend: 'Ext.window.Window',

    uses: [
        'Ext.tree.Panel',
        'Ext.tree.View',
        'Ext.form.field.Checkbox',
        'Ext.layout.container.Anchor',
        'Ext.layout.container.Border'
    ],

    layout: 'anchor',
    title: 'Change Settings',
    modal: true,
    width: 640,
    height: 480,
    border: false,

    initComponent: function () {
        var me = this;

        me.buttons = [
            { text: 'OK', handler: me.onOK, scope: me },
            { text: 'Cancel', handler: me.close, scope: me }
        ];

        me.callParent();
    }
});
