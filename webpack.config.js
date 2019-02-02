var path = require('path');

module.exports = {
    mode: 'development',
    entry: "./src/Main.ts",
    output: {
        filename: "./dist/bundle.js",
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' as resolvable extensions.
        extensions: [".ts", ".js"]
    },

    module: {
        rules: [
            { test: /\.js$/, loader: "source-map-loader", enforce: 'pre' },

            { test: /\.ts$/, loader: "ts-loader" },

            // Pixi expects people to be using Browserify. We're not, but we still can use
            // its brfs module to deal with pixi code using "fs".
            { include: path.resolve(__dirname, "node_modules/pixi.js"), loader: "transform?brfs", enforce: 'post' }
        ],
    },

    externals: [
        // Don't bundle pixi.js, assume it'll be included in the HTML via a script
        // tag, and made available in the global variable PIXI.
        { "pixi.js": "PIXI" }
    ]

};