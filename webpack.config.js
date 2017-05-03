var debug = process.env.Node_EVN !== "production";
var webpack = require('webpack');
var config = {
	context : __dirname + "/src/",
	devtool : debug ? "inline-sourcemap" : null,
	
   entry: './js/client.js',
	
   output: {
      path:__dirname + "/src/",
      filename: 'client.min.js',
   },
	
   devServer: {
      inline: true,
      port: 1142
   },
	
   module: {
      loaders: [
         {
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel-loader',
            query: {
               presets: ['es2015', 'react','stage-0'],
			   plugins : ['react-html-attrs','transform-class-properties','transform-decorators-legacy']

            }
         }
      ]
   },
   plugins : debug ? [] : [
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.optimize.UglifyJsPlugin({mangle:false,source:false}),
	],
   node: {
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
   }
}

module.exports = config;