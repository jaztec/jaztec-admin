/*globals Ext, JaztecAdmin*/
/**
 * Master detail main editor. This object will be responsible for the handling
 * of the seperate master and detail forms.
 * @author Jasper van Herpt <jasper.v.herpt@gmail.com>
 */
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

        // Test if a store is passed by configuration.
        if (!me.data.store === undefined) {
            this.setStore(me.data.store);
        }

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
    },

    /**
     * Sets the internal store variable. Loads it into the coupled master and
     * detail panels.
     * @param {Ext.data.Store} store
     * @returns {JaztecAdmin.view.base.editor.MasterDetail}
     */
    setStore: function(store)
    {
        this.data.store = store;
        // Load the master panel.
        // Load the detail panel.
        return this;
    }
});
