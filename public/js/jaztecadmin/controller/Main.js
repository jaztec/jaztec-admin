Ext.define('JaztecAdmin.controller.Main', {
    extend: 'JaztecUtils.mvc.Module',
    stores: [],
    views: [],
    refs: [],
    init: function() {
        var me = this;
    },
    /**
     * This function should implement code to register actions related
     * to this controller into the global system.
     * @param {JaztecUtils.mvc.Application} app
     */
    registerSystem: function(app)
    {
        var settings = Ext.create('JaztecUtils.mvc.module.Settings');
        settings.setName('Algemeen');
        app.modules.push(settings);
    }
});