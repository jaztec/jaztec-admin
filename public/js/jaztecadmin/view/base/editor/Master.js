/*globals Ext, JaztecAdmin*/
/**
 * Master section of a masterdetail editor.
 * @author Jasper van Herpt <jasper.v.herpt@gmail.com>
 */
Ext.define('JaztecAdmin.view.base.editor.Master', {
    extend: 'Ext.panel.Panel',
    border: false,

    data: null,

    initComponent: function()
    {
        var me = this,
            items,
            grid;

        // Get the main grid.
        grid = this.getGrid();

        // Fill the master items.
        items = [
            grid
        ];

        me.items = items;
        me.callParent(arguments);
    },

    /**
     * Returns the grid that will be used as master grid.
     * @param {Object} cfg
     * @returns {Ext.grid.Panel}
     */
    getGrid: function(cfg)
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
            store: store
        };

        // Return the grid panel.
        return Ext.create('Ext.grid.Panel', gridCfg);
    },

    /**
     * Get the parent master detail that houses this master panel.
     * @returns {JaztecAdmin.view.base.editor.MasterDetail}
     */
    getMasterDetail: function()
    {
        return this.masterDetail;
    }
});
