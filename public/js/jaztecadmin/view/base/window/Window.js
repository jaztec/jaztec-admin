/*globals Ext, JaztecAdmin*/
/**
 * @class JaztecAdmin.view.base.window.Window
 * Base window class for use inside the framework.
 * @author Jasper van Herpt <jasper.v.herpt@gmail.com>
 */
Ext.define('JaztecAdmin.view.base.window.Window', {
    extend: 'Ext.window.Window',

    closeAction: 'destroy',
    modal: true,

    initComponent: function()
    {
        this.callParent(arguments);
    }
});
