Ext.application({
    
    name: App.name,
    
    appFolder: App.basePath + App.appFolder,
    
    controllers: [
        
    ],
    
    launch: function() {
        JaztecAdmin.data = Ext.create('KJSencha.data.Factory');
        Ext.create('JaztecAdmin.view.Viewport');
        
        debugger;
    }
});
