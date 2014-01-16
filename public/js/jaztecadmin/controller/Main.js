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
     * This function should implement code to register actions related
     * to this controller into the global system.
     * @param {JaztecUtils.app.Application} app
     */
    registerSystem: function(app)
    {
        var me = this;
        me.setApplicationData(app);
        if (!me.isRegistered()) {
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
    }
});