/*globals Ext, JaztecAdmin*/
/**
 * A panel to house functionality for a master-detail editor.
 * @author Jasper van Herpt <jasper.v.herpt@gmail.com>
 */
Ext.define('JaztecAdmin.view.base.editor.Detail', {
    extend: 'Ext.panel.Panel',
    region: 'center',

    /**
     * @cfg {Object} data
     * Holds the internal data for this instance of a Master component.
     * @private
     */
    data: null,

    /**
     * @cfg {Array} fields
     * The fields which are to be displayed in the detail form.
     */

    /**
     * @cfg {Object} formCfg
     * Extra configuration for the detail form..
     */

     /**
      * @cfg buttonCfg
      * Configuration for the toolbar in the bottom of the detail form.
      */

    initComponent: function()
    {
        var me = this,
            items = [],
            dockedItems = [],
            form,
            buttons;

        // Set the layout.
        this.layout = {
            type: 'vbox',
            align: 'stretch'
        };

        // Create the form.
        form = this.createForm(me);
        items.push(form);

        // Create the button panel.
        buttons = this.createButtons(this.buttonCfg);
        dockedItems.push(buttons);

        me.items = items;
        me.dockedItems = dockedItems;
        me.callParent(arguments);

        // Set the internal data.
        this.data = Ext.apply({
            form: form,
            buttonPanel: buttons
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
        if (!record) {
            return;
        }
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
            formCfg = calcOptions.formCfg || {},
            form;

        // Apply some defaults to the form configuration.
        formCfg = Ext.applyIf({
            border: false,
            region: 'center',
            bodyPadding: 10,
            layout: {
                type: 'vbox',
                align: 'stretch'
            }
        }, formCfg);

        // Add the fields to the configuration.
        formCfg = Ext.apply({
            items: calcOptions.fields || []
        }, formCfg);

        form = Ext.create('Ext.form.Panel', formCfg);

        return form;
    },

    /**
     * Create the button panel of the detail form.
     * 
     * @param {Object} [config]
     * @returns {JaztecAdmin.view.base.toolbar.Toolbar}
     * @private
     */
    createButtons: function(config)
    {
        var calcConfig = config || {},
            toolbar;

        // Prepare the configuration.
        calcConfig = Ext.apply({
            dock: 'bottom'
        }, calcConfig);

        // Create the toolbar.
        toolbar = Ext.create('JaztecAdmin.view.base.toolbar.Toolbar', calcConfig);

        // Add a save and cancel button.
        toolbar.addToolItem(1, {
            xtype: 'button',
            text: 'Save',
            iconCls: 'icon-save-small',
            handler: Ext.bind(this.onSaveRecord, this)
        });
        toolbar.addToolItem(2, {
            xtype: 'button',
            text: 'Cancel',
            handler: Ext.bind(this.onCancelRecord, this)
        });
        return toolbar;
    },

    /**
     * Calls to its owning masterdetail to save changes to the record.
     * @param {Ext.button.Button} button
     * @private
     */
    onSaveRecord: function(button)
    {
        var record = this.getForm().getRecord();
        this.getForm().getForm().updateRecord(record);
        this.getMasterDetail().saveRecord(record);
        // Return the button to unpressed.
        button.toggle(false, false);
    },

    /**
     * Calls to its owning masterdetail to cancel the current changes.
     * @param {Ext.button.Button} button
     * @private
     */
    onCancelRecord: function(button)
    {
        var record = this.getForm().getRecord();
        this.getForm().getForm().updateRecord(record);
        this.getMasterDetail().cancelRecord(record);
        // Return the button to unpressed.
        button.toggle(false, false);
    },

    /**
     * Get the parent master detail that houses this master panel.
     * @returns {JaztecAdmin.view.base.editor.MasterDetail}
     * @private
     */
    getMasterDetail: function()
    {
        return this.masterDetail;
    }
});
