/*globals Ext, JaztecAdmin*/
/**
 * A panel to house functionality for a master-detail editor.
 * @author Jasper van Herpt <jasper.v.herpt@gmail.com>
 */
Ext.define('JaztecAdmin.view.base.editor.Detail', {
    extend: 'Ext.panel.Panel',
    region: 'center',
    border: false,

    /**
     * @cfg {Object} data
     * Holds the internal data for this instance of a Master component.
     * @private
     */
    data: null,

    initComponent: function()
    {
        var me = this,
            items = [],
            form;

        form = this.createForm();
        items.push(form);

        me.items = items;
        me.callParent(arguments);

        // Set the internal data.
        this.data = Ext.apply({
            form: form
        }, this.data || {});
    },

    /**
     * Setup the detail form according to the provided record.
     * 
     * @param   {Ext.data.Model}  record
     * @returns {Ext.data.Model}
     */
    setRecord: function(record)
    {
        this.getForm().loadRecord(record);

        return record;
    },

    /**
     * Return the detail panels form.
     * 
     * @returns {Ext.form.Panel}
     */
    getForm: function()
    {
        return this.data.form;
    },

    /**
     * Creates the underlying detail form.
     * 
     * @param {type} [options]  Additional parameters
     * @returns {Ext.form.Panel}
     * @private
     */
    createForm: function(options)
    {
        var calcOptions = options || {},
            optionsFields = calcOptions.fields || [],
            formCfg = {},
            form;

        form = Ext.create('Ext.form.Panel', formCfg);

        return form;
    }
});
