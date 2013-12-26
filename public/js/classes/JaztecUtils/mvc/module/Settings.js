Ext.define('JaztecUtils.mvc.module.Settings', function() {
    var data = {
        name: ''
    };
    return {
        /**
         * @returns {string}
         */
        getName: function()
        {
            return data.name;
        },
        /**
         * @returns {string}
         */
        setName: function(name)
        {
            data.name = name;
        }
    }
});