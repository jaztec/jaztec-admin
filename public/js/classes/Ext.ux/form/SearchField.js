Ext.define('Ext.ux.form.SearchField', {
    extend: 'Ext.form.field.Trigger',
    alias: 'widget.searchfield',
    /**
     * Reset knop class
     * @private
     */
    trigger1Cls: Ext.baseCSSPrefix + 'form-clear-trigger',
    /**
     * Zoek knop class
     * @private
     */
    trigger2Cls: Ext.baseCSSPrefix + 'form-search-trigger',
    /**
     * Bevat het huidige veld een zoekopdracht?
     * @private
     */
    hasSearch: false,
    paramName: 'query',
    mode: 'local',
    filterProperty: null,
    searchModes: {
        'local': {
            search: function()
            {
                var me = this;

                var filterProperties = me.filterProperty;

                var filterVal = me.getValue();

                var filterFn = function(record, id)
                {
                    var search = new RegExp(filterVal, 'i');

                    var found = false;

                    Ext.each(filterProperties, function(prop)
                    {
                        if (search.test(record.get(prop)))
                        {
                            found = true;
                            return false;
                        }
                    });

                    return found;
                }

                me.store.clearFilter();
                me.store.filterBy(filterFn, filterFn);
            },
            clear: function()
            {
                this.store.clearFilter();
            }
        },
        'remote': {
            search: function()
            {
                var me = this,
                    store = me.store,
                    proxy = store.getProxy(),
                    value = me.getValue();

                proxy.extraParams[me.paramName] = value;
                store.currentPage = 1;
                store.load({start: 0});
            },
            clear: function()
            {
                var me = this,
                    store = me.store,
                    proxy = store.getProxy(),
                    val;

                proxy.extraParams[me.paramName] = '';
                proxy.extraParams.start = 0;
                store.currentPage = 1;
                store.load({start: 0});
            }
        }
    },
    initComponent: function()
    {
        this.callParent(arguments);
        this.store = Ext.getStore(this.store);
        this.on('specialkey', function(f, e) {
            if (e.getKey() == e.ENTER) {
                this.onTrigger2Click();
            }
        }, this);
    },
    afterRender: function()
    {
        this.callParent();
        this.setTrigger1Visibility(false);
        this.doComponentLayout();
    },
    /**
     * Het klikken van de reset knop
     */
    onTrigger1Click: function()
    {
        if (this.hasSearch) {
            this.setValue('');
            this.searchModes[this.mode].clear.apply(this);
            this.hasSearch = false;
            this.setTrigger1Visibility(false);
            this.doComponentLayout();
        }
    },
    /**
     * Klikken van de zoekknop
     */
    onTrigger2Click: function()
    {
        if (this.getValue().length < 1) {
            this.onTrigger1Click();
            return;
        }

        this.searchModes[this.mode].search.apply(this);

        this.hasSearch = true;
        this.setTrigger1Visibility(true);
        this.doComponentLayout();
    },
    /**
     * Zet de zichtbaarheid van de trigger 1 (reset knop)
     * 
     * @param {Boolean} visible Zichtbaar ja/nee
     */
    setTrigger1Visibility: function(visible)
    {
        if (visible) {
            this.triggerEl.item(0).parent().setDisplayed(null);
        } else {
            this.triggerEl.item(0).parent().setDisplayed('none');
        }
    },
    listeners: {
        specialkey: function(f, e) {
            if (e.getKey() == e.ENTER) {
                this.onTrigger2Click();
            }
        }
    }
}); 