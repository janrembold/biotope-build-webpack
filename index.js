const webpack = require('webpack');

const defaults = {};

module.exports = {
    log: () => {
        const package = require('./package.json');
        console.log(`Starting webpack ${package.version}`);
    },

    init: (config) => {
        webpack({
            mode: 'production',
            entry: './src/index.js',
            output: {
                filename: './bundle.js'
            }
        }, (err, stats) => {
            if (err) {
                // TODO handle webpack-related issues, such as misconfiguration, here
                console.error(err.stack || err);
                if (err.details) {
                    console.error(err.details);
                }
                return;
            }

            // TODO handle compilation errors here, see https://webpack.js.org/api/node/#error-handling
            const info = stats.toJson();

            if (stats.hasErrors()) {
                console.error(info.errors);
            }

            if (stats.hasWarnings()) {
                console.warn(info.warnings);
            }

            // TODO render output
            console.log(stats.toString({
                chunks: false,
                colors: true
            }));
        });
    }
};
