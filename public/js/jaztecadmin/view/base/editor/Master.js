/*globals Ext, JaztecAdmin*/
/**
 * Master section of a masterdetail editor.
 * @author Jasper van Herpt <jasper.v.herpt@gmail.com>
 */
Ext.define('JaztecAdmin.view.base.editor.Master', {
    extend: 'Ext.panel.Panel',
    border: false,
    layout: {
        type: 'vbox',
        align: 'stretch',
        pack: 'center'
    },

    /**
     * @cfg {Object} data
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
                handler: Ext.bind(this.onAddButtonClick, this)
            });
        };
        // Add a delete button
        if (this.showDeleteButton === true) {
            panel.add({
                xtype: 'button',
                iconCls: 'icon-bin-small',
                handler: Ext.bind(this.onDeleteButtonClick, this)
            });
        };
        // Add a refresh button
        if (this.showRefreshButton === true) {
            panel.add({
                xtype: 'button',
                iconCls: 'icon-refresh-small',
                handler: Ext.bind(this.onRefreshButtonClick, this)
            });
        };
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
    }
});
