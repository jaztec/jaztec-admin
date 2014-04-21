/*globals Ext, JaztecAdmin*/
/**
 * @class JaztecAdmin.service.Store
 * 
 * Class which can generate store configuration.
 * @author Jasper van Herpt <jasper.v.herpt@gmail.com>
 */
Ext.define('JaztecAdmin.service.Store', {
    statics: {
        /**
         * Creates a proxy based on an URL appended with CRUD based actions.
         * @param   {String} url        URL to be appended
         * @param   {Object} [config]   Additional configuration
         * @returns {Object} proxyCfg   Proxy configuration
         * @static
         */
        createCrudProxy: function(url, config)
        {
            var options = config || {};

            if ( ! url) {
                Ext.Error.raise('Valid URL is required');
            }

            var obj = {
                type: 'ajax',
                appendId: false,
                batchActions: true,
                api: {
                    create: '/' + url + '/create',
                    read: '/' + url + '/read',
                    update: '/' + url + '/update',
                    destroy: '/' + url + '/destroy'
                },
                reader: {
                    type: 'json',
                    root: 'data',
                    successProperty: 'success',
                    messageProperty: 'message',
                    totalProperty  : 'total'
                },
                writer: {
                    type: 'json',
                    root: 'data'
                },
                listeners: {
                    'metachange': {
                        fn: function(proxy, metaData) {
                            // Optional metadata change later
                        },
                        scope: this
                    }
                }
            };

            return Ext.merge(obj, options);
        }
    }
});
