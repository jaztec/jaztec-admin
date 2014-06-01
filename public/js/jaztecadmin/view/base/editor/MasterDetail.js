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

    /**
     * @property {Object} data
     * Holds the internal data.
     * @private
     */
    data: {},

    /**
     * @cfg {Object} modelDefaults
     * Default data which should be applied to any newly created record in the
     * master-detail.
     */

     /**
      * @cfg {String} masterDetailLayout
      * Set the layout the master-detail should follow. The following configurations
      * will work:
      * 
      * * overview-left (Default)
      * * overview-right
      * * overview-center
      * * overview-top
      * * overview-bottom
      */
    masterDetailLayout: 'overview-left',

    requires: [
        'JaztecAdmin.view.base.editor.Master',
        'JaztecAdmin.view.base.editor.Detail'
    ],

    initComponent: function()
    {
        var me = this,
            masterRegion = this.getMasterRegion(this.masterDetailLayout || ''),
            detailRegion,
            masterCfg,
            detailCfg;

        // Define the layout and/or regions of components.
        detailRegion = (masterRegion === 'center') ? 'south' : 'center';
        if (detailRegion === 'center') {
            this.layout = {
                type: 'border',
                align: 'stretch'
            };
        } else if (detailRegion === 'south') {
            this.layout = {
                type: 'vbox',
                align: 'stretch'
            };
        }

        // Add the master and detail panels.
        masterCfg = Ext.merge({
            showSearchField: true, 
            region: masterRegion,
            collapsible: true,
            title: 'Overview',
            masterDetail: me
        }, me.masterCfg || {});
        detailCfg = Ext.merge({
            masterDetail: me,
            region: detailRegion,
            disabled: true,
            title: 'Detailed information',
            flex: 1
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
            /**
             * @event masterdetail-opened
             * Fires when the master-detailform is shown.
             * @param {JaztecAdmin.view.base.editor.MasterDetail}   masterDetail
             */
            'masterdetail-opened',
            /**
             * @event masterdetail-closed
             * Fires when the master-detailform is closed or hidden.
             * @param {JaztecAdmin.view.base.editor.MasterDetail}   masterDetail
             */
            'masterdetail-closed',
            /**
             * @event before-selectrecord
             * Fires before record(s) are selected.
             * @param {JaztecAdmin.view.base.editor.MasterDetail}   masterDetail
             * @param {Ext.data.Model\Ext.data.Model[]}             record(s)
             */
            'before-selectrecord',
            /**
             * @event selectrecord
             * 
             * @param {JaztecAdmin.view.base.editor.MasterDetail}   masterDetail
             * @param {Ext.data.Model\Ext.data.Model[]}             record(s)
             */
            'selectrecord',
            /**
             * @event before-addrecord
             * Fires before a record is added.
             * @param {JaztecAdmin.view.base.editor.MasterDetail}   masterDetail
             * @param {Ext.data.Model}                              record
             */
            'before-addrecord',
            /**
             * @event addrecord
             * Fires after a record is added.
             * @param {JaztecAdmin.view.base.editor.MasterDetail}   masterDetail
             * @param {Ext.data.Model}                              record
             */
            'addrecord',
            /**
             * @event before-deleterecords
             * Fires before a record is removed.
             * @param {JaztecAdmin.view.base.editor.MasterDetail}   masterDetail
             * @param {Ext.data.Model[]}                            records[]
             */
            'before-deleterecords',
            /**
             * @event deleterecords
             * Fires when records are removed.
             * @param {JaztecAdmin.view.base.editor.MasterDetail}   masterDetail
             * @param {Ext.data.Model[]}                            records[]
             */
            'deleterecords',
            /**
             * @event before-saverecord
             * Fires before a record is saved.
             * @param {JaztecAdmin.view.base.editor.MasterDetail}   masterDetail
             * @param {Ext.data.Model}                              record
             */
            'before-saverecord',
            /**
             * @event saverecord
             * Fires after a record is saved.
             * @param {JaztecAdmin.view.base.editor.MasterDetail}   masterDetail
             * @param {Ext.data.Model}                              record
             */
            'saverecord',
            /**
             * @event before-cancelrecord
             * Fires before changes to a record are calcelled.
             * @param {JaztecAdmin.view.base.editor.MasterDetail}   masterDetail
             * @param {Ext.data.Model}                              record
             */
            'before-cancelrecord',
            /**
             * @event cancelrecord
             * Fires after changes to a record have been cancelled.
             * @param {JaztecAdmin.view.base.editor.MasterDetail}   masterDetail
             * @param {Ext.data.Model}                              record
             */
            'cancelrecord',
            /**
             * @event refresh
             * Fires when the masterdetail is refreshed.
             * @param {JaztecAdmin.view.base.editor.MasterDetail}   masterDetail
             * @param {JaztecAdmin.view.base.editor.Master}         master
             * @param {JaztecAdmin.view.base.editor.Detail}         detail
             */
            'refresh'
        );
        me.on({
            show: function(panel, eOpts) {me.fireEvent('masterdetail-opened', me, eOpts); },
            close: function(panel, eOpts) {me.fireEvent('masterdetail-closed', me, eOpts); },
            hide: function(panel, eOpts) {me.fireEvent('masterdetail-closed', me, eOpts); }
        });

        me.callParent(arguments);
    },

    /**
     * Return the internal module entity.
     * 
     * @returns {JaztecAdmin.app.Module}
     */
    getModule: function()
    {
        return this.data.module;
    },

    /**
     * Returns the store of this master detail screen.
     * 
     * @returns {Ext.data.Store}
     */
    getStore: function()
    {
        return this.data.store;
    },

    /**
     * Sets the internal store variable. Loads it into the coupled master and
     * detail panels.
     * 
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
     * Disables the detail part of the master-detail.
     * 
     * @param {Boolean} disabled
     * @returns {Boolean}
     */
    disableDetail: function(disabled)
    {
        this.getDetail().setDisabled(disabled);
        return disabled;
    },

    /**
     * Select a record in the master detail.
     * 
     * @param {Ext.data.Model}  record
     * @param {Boolean}         [suppressEvents]
     */
    selectRecord: function(record, suppressEvents)
    {
        // Only proceed with a valid resource.
        if (!record) {
            return;
        }
        if (!suppressEvents) {
            this.fireEvent('before-selectrecord', this, record);
        }
        // Load the detail panel with the selected record.
        this.getDetail().setDisabled(false);
        this.getDetail().setRecord(record);
        if (!suppressEvents) {
            this.fireEvent('selectrecord', this, record);
        }
    },

    /**
     * Selects multiple records in the master detail.
     * 
     * @param {Ext.data.Model[]} records
     */
    selectRecords: function(records)
    {
        this.fireEvent('before-selectrecord', this, records);
        // We only want the first record to actually be selected.
        this.selectRecord(records[0], true);
        this.fireEvent('selectrecord', this, records);
    },

    /**
     * Adds a new record to the master detail and directly loads it into the 
     * detail form.
     * 
     * @returns {Ext.data.Model}
     */
    addRecord: function()
    {
        var store = this.getStore(),
            model = new store.model(),
            record;

        // Apply any configured details to a newly created record and add it to the store.
        model = Ext.apply(
            model.data,
            this.modelDefaults || {}
        );

        // Handle events and add the record to the store.
        this.fireEvent('before-addrecord', this, model);
        record = store.add(model);
        this.fireEvent('addrecord', this, record);

        // Select the newly created record, this will also load it into the detail form.
        this.getMaster().getGrid().getSelectionModel().select(record);

        return model;
    },

    /**
     * Deletes a set of records.
     * 
     * @param {Ext.data.Model[]} records
     */
    deleteRecords: function(records)
    {
        var me = this;
        this.fireEvent('before-deleterecords', this, records);
        this.getStore().remove(records);
        this.getDetail().resetForm();
        this.getDetail().setDisabled(true);
        this.getStore().sync({
            /**
             * @param {Ext.data.Batch}  batch
             * @param {Object}          options
             */
            callback: function(batch, options) {
                me.fireEvent('deleterecords', me, records);
            }
        });
    },

    /**
     * Refresh the main store. 
     */
    refresh: function()
    {
        this.fireEvent('refresh', this, this.getMaster(), this.getDetail());
        this.getStore().load();
    },

    /**
     * Cancels a record.
     * 
     * @param {Ext.data.Model} record
     */
    cancelRecord: function(record)
    {
        this.fireEvent('before-cancelrecord', this, record);
        if (record.dirty) {
            record.reject();
        }
        this.getDetail().resetForm();
        if (record.getId() === 0) {
            this.getStore().remove(record);
            this.getDetail().setDisabled(true);
        } else if (record.getId() !== 0) {
            this.getDetail().setRecord(record);
        }
        this.fireEvent('cancelrecord', this, record);
    },

    /**
     * Saves a record.
     * 
     * @param {Ext.data.Model} record
     */
    saveRecord: function(record)
    {
        var me = this;
        if (!record.dirty) {
            return;
        }
        this.fireEvent('before-saverecord', this, record);
        this.getStore().sync({
            /**
             * @param {Ext.data.Batch}  batch
             * @param {Object}          options
             */
            callback: function(batch, options)
            {
                me.fireEvent('saverecord', me, record);
            }
        });
    },

    /**
     * Resolves the configuration into a region for the master element.
     * 
     * @param {String} configuration
     * @returns {String}
     * @private
     */
    getMasterRegion: function(configuration)
    {
        var region = '';
        // Define the region
        switch (configuration) {
            case 'overview-left':
                region = 'west';
                break;
            case 'overview-right':
                region = 'east';
                break;
            case 'overview-center':
                region = 'center';
                break;
            case 'overview-top':
                region = 'north';
                break;
            case 'overview-bottom':
                region = 'south';
                break;
            default:
                region = 'west';
        }
        return region;
    }
});
