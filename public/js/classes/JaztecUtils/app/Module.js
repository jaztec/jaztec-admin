Ext.define('JaztecUtils.app.Module', {
    extend: 'Ext.app.Controller',
    
    mixins: {
        module: 'Ext.ux.desktop.Module'
    },

    /**
     * This function should implement code to register actions related
     * to this controller into the global system.
     */
    registerSystem: function() {}
});