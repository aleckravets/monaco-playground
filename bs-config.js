var historyApiFallback = require('connect-history-api-fallback');

module.exports = {
    open: true,
    reloadDebounce: 600,
    server: {
        baseDir: "dist"
    },
    middleware: [
        historyApiFallback({
            // disableDotRule: true,
            verbose: true,
            rewrites: [
                {
                    from: /^\/file\/.*$/,
                    to: function (context) {
                        return '/index.html';
                    }
                }
            ]
        })
    ]
};