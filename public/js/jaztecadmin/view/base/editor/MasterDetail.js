Ext.define('JaztecAdmin.view.base.editor.MasterDetail', {
    extend: 'Ext.panel.Panel',
    border: false,
    alias: 'widget.masterdetail',

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

        // Add the master and detail panels.
        var masterCfg = Ext.merge({
            showSearchField: true, 
            region: 'west',
            masterDetail: me
        }, me.masterCfg || {});
        var detailCfg = Ext.merge({
            masterDetail: me
        });
        me.data = Ext.apply({
            childComponents: {
                master: Ext.create('JaztecAdmin.view.base.editor.Master', masterCfg),
                detail: Ext.create('JaztecAdmin.view.base.editor.Detail', detailCfg)
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
     * Returns the store of this master detail screen.
     * @returns {Ext.data.Store}
     */
    getStore: function()
    {
        return this.data.store;
    }
});