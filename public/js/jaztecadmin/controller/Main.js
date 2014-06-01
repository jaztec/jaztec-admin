/*globals Ext, JaztecAdmin*/
/**
 * @class JaztecAdmin.controller.Main
 * Simple main controller to house a home section.
 * @author Jasper van Herpt <jasper.v.herpt@gmail.com>
 */
Ext.define('JaztecAdmin.controller.Main', {
    extend: 'JaztecAdmin.app.Module',
    stores: [],
    views: [
        'user.UserSettings'
    ],
    refs: [
        {ref: 'mainPanel', selector: 'jaztec-main-panel'},
        {
            ref: 'userSettingsWindow',
            selector: 'userSettings',
            autoCreate: true,
            xtype: 'userSettings'
        }
    ],

    init: function()
    {
        var me = this;

        this.control({
            'jaztec-main-panel': {
                'user-settings': Ext.bind(me.showUserSettings, me)
            }
        });

        me.callParent(arguments);
    },

    /**
     * Shows the window holding the user settings.
     * @param {JaztecAdmin.view.main.Panel} panel
     * @returns {undefined}
     * @private
     */
    showUserSettings: function(panel)
    {
        var me = this,
            window = me.getUserSettingsWindow();
        window.show();
    },

    /**
     * This function adds the visual components to the application
     * after all dependencies have been loaded.
     * @returns {undefined}
     */
    registerControls: function()
    {
        var me = this;
        if (me.isRegistered()) {
            return;
        }
        me.addCard(
            // Splash screen
            {
                xtype: 'panel',
                layout: {
                    align: 'center',
                    type: 'vbox'
                },
                frame: false,
                order: false,
                y: 300,
                items: [
                    {
                        xtype: 'image',
                        src: '/img/logo.png',
                        height: 279,
                        width: 279
                    }
                ]
            }
        );
        me.addToolItem(0, {
            text: 'Home',
            iconCls: 'icon-home-medium',
            initComponent: function()
            {
                this.toggle(true);
                this.callParent(arguments);
            }
        });
        me.setRegistered(true);
    }
});