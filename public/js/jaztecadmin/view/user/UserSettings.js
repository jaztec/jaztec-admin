/*globals Ext, JaztecAdmin*/
/**
 * @class JaztecAdmin.view.user.UserSettings
 * Window object for viewing and changing the user settings.
 * @author Jasper van Herpt <jasper.v.herpt@gmail.com>
 */
Ext.define('JaztecAdmin.view.user.UserSettings', {
    extend: 'JaztecAdmin.view.base.window.Window',
    alias: 'widget.userSettings',

    title: 'User settings',
    width: 800,
    height: 600,

    initComponent: function()
    {
        var me = this,
            form = this.createForm();

        this.items = [
            form
        ];

        this.callParent(arguments);
    },

    /**
     * Create the form which is to be user inside the user settings window.
     * @returns {Ext.form.Panel}
     */
    createForm: function()
    {
        var me = this,
            form;
        form = Ext.create('Ext.form.Panel', {
            border: false,
            frame: false,
            items: [
                {
                    fieldLabel: 'Username',
                    name: 'username'
                }
            ]
        });
    }
});
