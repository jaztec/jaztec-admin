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

    layout: {
        type: 'fit',
        align: 'stretch'
    },

    initComponent: function()
    {
        var me = this,
            form = this.createForm(),
            toolbar = this.createToolbar();

        this.addEvents(
            /**
             * @event save-user-settings
             * Fired when the user settings are saved.
             * @param {JaztecAdmin.view.user.UserSettings} this
             * @param {Array} formValues
             */
            'save-user-settings',
            /**
             * @event cancel-user-settings
             * Fired when the user settings are cancelled.
             * @param {JaztecAdmin.view.user.UserSettings} this
             */
            'cancel-user-settings'
        );

        this.items = [
            form
        ];

        this.bbar = toolbar;

        this.callParent(arguments);
    },

    /**
     * Create the form which is to be user inside the user settings window.
     * @returns {Ext.form.Panel}
     */
    createForm: function()
    {
        var form;
        form = Ext.create('Ext.form.Panel', {
            bodyPadding: 5,
            border: false,
            trackResetOnLoad: true,
            defaultType: 'textfield',
            layout: 'form',
            fieldDefaults: {
                labelWidth: 125,
                msgTarget: 'side',
                align: 'stretch'
            },
            items: [
                {
                    fieldLabel: 'Username',
                    name: 'username',
                    allowBlank: false
                },
                {
                    fieldLabel: 'Display name',
                    name: 'displayName',
                    allowBlank: false
                }
            ]
        });
        return form;
    },

    /**
     * Creates a toolbar inside the window.
     * 
     * @returns {Ext.toolbar.Toolbar}
     * @private
     */
    createToolbar: function()
    {
        var me = this,
            toolbar;
        toolbar = Ext.create('Ext.toolbar.Toolbar', {
            items: [
                '->',
                {
                    text: 'Save',
                    handler: Ext.bind(me.fireSaveEvent, me)
                },
                {
                    text: 'Cancel',
                    handler: Ext.bind(me.fireCancelEvent, me)
                },
                {
                    text: 'Close',
                    handler: Ext.bind(me.closeWindow, me)
                }
            ]
        });
        return toolbar;
    },

    /**
     * Validates the form and fires the save event when valid.
     * @returns {Boolean}
     * @private
     */
    fireSaveEvent: function()
    {
        var form = this.down('form');
        if (!form.isValid()) {
            return false;
        }
        this.fireEvent('save-user-settings', this, form.getValues());
        return true;
    },

    /**
     * Fires the cancel event and resets the form.
     * @returns {JaztecAdmin.view.user.UserSettings} this
     * @private
     */
    fireCancelEvent: function()
    {
        var form = this.down('form');
        form.getForm().reset();
        this.fireEvent('cancel-user-settings', this);
        return this;
    },

    /**
     * Closes this window
     * @returns {undefined}
     */
    closeWindow: function()
    {
        this.close();
    }
});
