/*globals Ext, JaztecAdmin*/
/**
 * Master section of a masterdetail editor.
 * @author Jasper van Herpt <jasper.v.herpt@gmail.com>
 */
Ext.define('JaztecAdmin.view.base.editor.Master', {
    extend: 'Ext.panel.Panel',
    layout: {
        type: 'vbox',
        align: 'stretch',
        pack: 'center'
    },

    /**
     * @property {Object} data
     * Holds the internal data for this instance of a Master component.
     * @private
     */
    data: null,

    /**
     * @cfg {Number} width
     * Define the width of the master panel.
     */
    width: 100,

    /**
     * @cfg {Boolean} showAddButton
     * Determine if the entity add button is shown. Defaults to 'true'
     */
    showAddButton: true,

    /**
     * @cfg {Boolean} showDeleteButton
     * Determine if the entity delete button is shown. Defaults to 'false'
     */
    showDeleteButton: false,

    /**
     * @cfg {Boolean} showSearchField
     * Determine a searchfield is shown. Defaults to 'true'
     */
    showSearchField: true,

    /**
     * @cfg {Boolean} showRefreshButton
     * Determine if the entity refresh button is shown. Defaults to 'true'
     */
    showRefreshButton: true,

    initComponent: function()
    {
        var me = this,
            items,
            grid,
            tools;

        // Get the main grid.
        grid = this.createGrid();
        tools = this.createTools();

        // Fill the master items.
        items = [
            tools,
            grid
        ];

        grid.on({
            selectionchange: Ext.bind(this.onSelectionChange, this)
        });

        // Apply some defaults.
        Ext.applyIf({
            border: '0 0 0 3'
        }, this);

        me.items = items;
        me.callParent(arguments);

        // Set the internal data.
        this.data = Ext.apply({
            grid: grid,
            tools: tools
        }, this.data || {});
    },

    /**
     * Returns the grid that will be used as master grid.
     * @param {Object} cfg
     * @returns {Ext.grid.Panel}
     * @private
     */
    createGrid: function(cfg)
    {
        var columns = this.columns || [],
            store,
            gridCfg;

        // Get the store object,
        store = this.getMasterDetail().getStore() || {};

        // Setup the grid configuration.
        gridCfg = {
            border: false,
            columns: columns,
            store: store,
            flex: 1
        };

        // Return the grid panel.
        return Ext.create('Ext.grid.Panel', gridCfg);
    },

    /**
     * Returns the toolpanel with optional add and delete buttons and a searchfield.
     * Depending on the master detail configuration.
     * 
     * @returns {Ext.panel.Panel}
     * @private
     */
    createTools: function()
    {
        var me = this,
            panel;

        panel = Ext.create('Ext.panel.Panel', {
            layout: {
                type: 'hbox'
            },
            bodyPadding: 3,
            items: [],
            border: false
        });
        // Add an add button
        if (this.showAddButton === true) {
            panel.add({
                xtype: 'button',
                iconCls: 'icon-add-small',
                handler: Ext.bind(this.onAdd, this)
            });
        }
        // Add a delete button
        if (this.showDeleteButton === true) {
            panel.add({
                xtype: 'button',
                iconCls: 'icon-bin-small',
                handler: Ext.bind(this.onDelete, this)
            });
        }
        // Add a refresh button
        if (this.showRefreshButton === true) {
            panel.add({
                xtype: 'button',
                iconCls: 'icon-refresh-small',
                handler: Ext.bind(this.onRefresh, this)
            });
        }
        // Add a searchfield
        if (this.showSearchField === true) {
            panel.add(Ext.create('Ext.ux.form.SearchField', {
                store: this.getMasterDetail().getStore() || {},
                flex: 1
            }));
        }

        return panel;
    },

    /**
     * Get the parent master detail that houses this master panel.
     * @returns {JaztecAdmin.view.base.editor.MasterDetail}
     * @private
     */
    getMasterDetail: function()
    {
        return this.masterDetail;
    },

    /**
     * Return the internal gridpanel.
     * 
     * @returns {Ext.grid.Panel}
     */
    getGrid: function()
    {
        return this.data.grid;
    },

    /**
     * @private
     * Calls to its masterdetail to select a record.
     * @param {Ext.selection.Model} sm
     * @param {Ext.data.Model[]}    records
     * @param {Object}              eOpts
     */
    onSelectionChange: function(sm, records, eOpts)
    {
        if (records.length > 1) {
            this.getMasterDetail().selectRecords(records);
            return;
        }
        this.getMasterDetail().selectRecord(records[0]);
    },

    /**
     * @private
     * Calls to its masterdetail to add a record.
     * @param {Ext.button.Button}   button
     * @param {Object\Number}       eOpts
     */
    onAdd: function(button, eOpts)
    {
        // At creation time some integers are released in eOpts, exclude them.
        if (!eOpts || !isNaN(eOpts)) {
            return;
        }
        this.getMasterDetail().addRecord();
    },

    /**
     * @private
     * Calls to its masterdetail to delete a record.
     * @param {Ext.button.Button} button
     */
    onDelete: function(button)
    {
        var records = this.getGrid().getSelectionModel().getSelection();
        this.getMasterDetail().deleteRecords(records);
    },

    /**
     * @private
     * Calls to its masterdetail refresh the store.
     * @param {Ext.button.Button} button
     */
    onRefresh: function(button)
    {
        this.getMasterDetail().refresh();
    }
});
