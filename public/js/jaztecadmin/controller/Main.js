/*globals Ext, JaztecAdmin*/
/**
 * Simple main controller to house a home section.
 * @author Jasper van Herpt <jasper.v.herpt@gmail.com>
 */
Ext.define('JaztecAdmin.controller.Main', {
    extend: 'JaztecAdmin.app.Module',
    stores: [],
    views: [],
    refs: [],

    init: function()
    {
        var me = this;
        me.callParent(arguments);
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