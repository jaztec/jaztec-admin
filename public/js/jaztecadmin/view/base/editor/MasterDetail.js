Ext.define('JaztecAdmin.view.base.editor.MasterDetail', {
    extend: 'Ext.panel.Panel',
    border: false,

    layout: {
        type: 'border'
    },

    data: {},

    requires: [
        'JaztecAdmin.view.base.editor.Master',
        'JaztecAdmin.view.base.editor.Detail'
    ],

    initComponent: function()
    {
        var me = this;

//        me.data.store = Ext.create('Ext.data.Store', me.storeCfg || { });

        // Add some card specific configuration.
        me.data = Ext.apply({
            childComponents: {
                master: Ext.create('JaztecAdmin.view.base.editor.Master', me.masterCfg || { showSearchField: true, region: 'west' }),
                detail: Ext.create('JaztecAdmin.view.base.editor.Detail', me.detailCfg || { })
            }
        }, me.data);

        me.items = [
            me.data.childComponents.master,
            me.data.childComponents.detail
        ];
        // Add and link some basic events.
        me.addEvents(
            'masterdetail-opened',
            'masterdetail-closed'
        );
        me.on({
            show: function(panel, eOpts) {me.fireEvent('masterdetail-opened', me, panel, eOpts); },
            close: function(panel, eOpts) {me.fireEvent('masterdetail-closed', me, panel, eOpts); },
            hide: function(panel, eOpts) {me.fireEvent('masterdetail-closed', me, panel, eOpts); }
        });

        me.callParent(arguments);
    },

    /**
     * Return the internal module entity.
     * @returns {JaztecAdmin.app.Module}
     */
    getModule: function()
    {
        return this.data.module;
    },

    /**
     * Check if the card has been set up.
     * @returns {boolean}
     */
    isSetUp: function()
    {
        return this.data.setUp;
    },

    /**
     * Returns the store of this master detail screen.
     * @returns {Ext.data.Store}
     */
    getStore: function()
    {
        return this.data.store;
    }
});