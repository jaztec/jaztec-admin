/*globals Ext, JaztecAdmin*/
/**
 * @class JaztecAdmin.view.base.editor.MasterDetail
 * Master detail main editor. This object will be responsible for the handling
 * of the seperate master and detail forms.
 * @author Jasper van Herpt <jasper.v.herpt@gmail.com>
 */
Ext.define('JaztecAdmin.view.base.editor.MasterDetail', {
    extend: 'Ext.panel.Panel',
    border: false,
    alias: 'widget.masterdetail',

    layout: {
        type: 'border',
        align: 'stretch'
    },

    /**
     * @cfg {Object} data
     * Holds the internal data.
     * @private
     */
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
            masterDetail: me,
            region: 'center'
        },  me.detailCfg || {});
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
        this.getMaster().getGrid().setStore(this.getStore());
        return this;
    },

    /**
     * Returns the master part of this component.
     * 
     * @returns {JaztecAdmin.view.base.editor.Master}
     */
    getMaster: function()
    {
        return this.data.childComponents.master;
    },

    /**
     * Returns the detail part of this component.
     * 
     * @returns {JaztecAdmin.view.base.editor.Detail}
     */
    getDetail: function()
    {
        return this.data.childComponents.detail;
    },

    /**
     * Select a record in the master detail.
     * @param {Ext.data.Model} record
     * @todo Implement
     */
    selectRecord: function(record)
    {
        
    },

    /**
     * Selects multiple records in the master detail.
     * @param {Ext.data.Model[]} records
     * @todo Implement
     */
    selectRecords: function(records)
    {
        
    },

    /**
     * Adds a new record to the master detail
     * @returns {Ext.data.Model}
     * @todo Implement
     */
    addRecord: function()
    {
        
    },

    /**
     * Deletes a set of records.
     * @param {Ext.data.Model[]} records
     * @todo Implement
     */
    deleteRecords: function(records)
    {
        
    },

    /**
     * Refresh the main store. 
     * @todo Implement
     */
    refresh: function()
    {
        
    }
});
