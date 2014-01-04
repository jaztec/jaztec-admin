Ext.define('JaztecAdmin.controller.Main', {
    extend: 'JaztecUtils.app.Module',
    stores: [],
    views: [],
    refs: [],
    /**
     * This function should implement code to register actions related
     * to this controller into the global system.
     * @param {JaztecUtils.mvc.Application} app
     */
    registerSystem: function(app)
    {
        var me = this;
        var desktop = new Ext.ux.desktop.Desktop(app.getDesktopConfig());
        app.setDesktop(desktop);
    }
});