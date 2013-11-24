Ext.define('JaztecAdmin.App', {
    extend: 'Ext.ux.desktop.App',

    requires: [
        'Ext.window.MessageBox',

        'Ext.ux.desktop.ShortcutModel',

//        'MyDesktop.SystemStatus',
//        'MyDesktop.VideoWindow',
//        'MyDesktop.GridWindow',
//        'MyDesktop.TabWindow',
//        'MyDesktop.AccordionWindow',
//        'MyDesktop.Notepad',
//        'MyDesktop.BogusMenuModule',
//        'MyDesktop.BogusModule',

//        'MyDesktop.Blockalanche',
        'JaztecAdmin.Settings'
    ],

    init: function() {
        this.callParent();
    },

    getModules : function(){
        return [

        ];
    },

    getDesktopConfig: function () {
        var me = this, ret = me.callParent();

        return Ext.apply(ret, {
            //cls: 'ux-desktop-black',

            contextMenuItems: [
                { text: 'Change Settings', handler: me.onSettings, scope: me }
            ],

            shortcuts: Ext.create('Ext.data.Store', {
                model: 'Ext.ux.desktop.ShortcutModel',
                data: [
//                    { name: 'Grid Window', iconCls: 'grid-shortcut', module: 'grid-win' },
//                    { name: 'Accordion Window', iconCls: 'accordion-shortcut', module: 'acc-win' },
//                    { name: 'Notepad', iconCls: 'notepad-shortcut', module: 'notepad' },
//                    { name: 'System Status', iconCls: 'cpu-shortcut', module: 'systemstatus'}
                ]
            }),

            wallpaper: 'wallpapers/background.jpg',
            wallpaperStretch: true
        });
    },

    // config for the start menu
    getStartConfig : function() {
        var me = this, ret = me.callParent();

        return Ext.apply(ret, {
            title: 'Don Griffin',
            iconCls: 'user',
            height: 300,
            toolConfig: {
                width: 100,
                items: [
                    {
                        text:'Settings',
                        iconCls:'settings',
                        handler: me.onSettings,
                        scope: me
                    },
                    '-',
                    {
                        text:'Logout',
                        iconCls:'logout',
                        handler: me.onLogout,
                        scope: me
                    }
                ]
            }
        });
    },

    getTaskbarConfig: function () {
        var ret = this.callParent();

        return Ext.apply(ret, {
            quickStart: [
                { name: 'Accordion Window', iconCls: 'accordion', module: 'acc-win' },
                { name: 'Grid Window', iconCls: 'icon-grid', module: 'grid-win' }
            ],
            trayItems: [
                { xtype: 'trayclock', flex: 1 }
            ]
        });
    },

    onLogout: function () {
        Ext.Msg.confirm('Logout', 'Are you sure you want to logout?');
    },

    onSettings: function () {
        var dlg = new JaztecAdmin.Settings({
            desktop: this.desktop
        });
        dlg.show();
    }
});
