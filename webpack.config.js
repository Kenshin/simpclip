
const webpack = require( 'webpack' ),
    plugins = [

      // public reqire( xxx )
      new webpack.ProvidePlugin({
        React    : 'react',
        ReactDOM : 'react-dom',
        Notify   : 'notify',
      }),

      // chunk files
      new webpack.optimize.CommonsChunkPlugin({
        names     : [ 'vendors' ],
        minChunks : Infinity
      }),

      // defined environment variable
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify( 'production' ) // or development
      }),

    ],

    // conditions environment
    isProduction = function () {
      return process.env.NODE_ENV === 'production';
    },

    // only when environment variable is 'production' call
    deploy = ( function () {
      var CopyWebpackPlugin  = require( 'copy-webpack-plugin'  ),
          CleanWebpackPlugin = require( 'clean-webpack-plugin' );

      // environment verify
      if ( isProduction() ) {

        // delete publish folder
        plugins.push(
          new CleanWebpackPlugin([ 'publish' ], {
            verbose: true,
            dry    : false,
          })
        );

        // copy files
        plugins.push(
          new CopyWebpackPlugin([
            { from   : "src/manifest.json" ,              to : '../' },
            //{ from   : 'src/options/options.html',        to : '../options/' },
            { context: 'src/assets/icons/',  from : "*" , to : '../assets/icons' },
            { context: 'src/assets/images/', from : "*" , to : '../assets/images' },
            //{ context: 'src/_locales/',    from : "*/*" , to : '../_locales/' },
          ])
        );

        // call uglifyjs plugin
        plugins.push(
          new webpack.optimize.UglifyJsPlugin({
            compress: {
              sequences: true,
              dead_code: true,
              conditionals: true,
              booleans: true,
              unused: true,
              if_return: true,
              join_vars: true,
              drop_console: true
            },
            mangle: {
              except: [ '$', 'exports', 'require' ]
            },
            output: {
              comments: false
            }
          })
        );

      }
    })(),

    // webpack config
    config = {
      entry: {

        vendors : [

          // react
          './node_modules/react/dist/react.min.js',
          './node_modules/react-dom/dist/react-dom.min.js',

          // vendors
          'babel-polyfill',
          'jquery',

        ],

        contentscripts : './src/contentscripts.js',
        //background     : './src/background.js',
      },

      output: {
        path     :  isProduction() ? './publish/bundle' : './src/bundle',
        filename : '[name].js'
      },

      devServer: {
        inline: true,
        port  : 7777
      },

      plugins: plugins,

      module: {
        loaders: [{
            test: /\.js[x]?$/,
            exclude: /node_modules/,
            loader: 'babel',
            query: {
              presets: [ 'es2015', 'stage-0', 'react' ]
            }
        },

        // css files
        { test: /\.css$/,           loader: 'style!css' },

        // stylus files
        { test: /\.styl$/,          loader: 'style!css!stylus' },

        // image in js
        { test: /\.(png|jpg|gif)$/, loader: 'url?limit=12288' },

        // expose jquery
        {
          test  : require.resolve( './src/vender/jquery-3.3.1.min.js' ),
          loader: 'expose?jQuery!expose?$'
        }
        ]
      },

      stylus: {
        use: [require('nib')()],
        import: ['~nib/lib/nib/index.styl']
      },

      resolve: {
        alias : {
          jquery     : __dirname + '/src/vender/jquery-3.3.1.min.js',
          md5        : __dirname + '/src/vender/md5.min.js',
          markdown   : __dirname + '/node_modules/turndown/lib/turndown.browser.umd.js',

          notify_css : __dirname + '/src/vender/notify/notify.css',
          notify     : __dirname + '/src/vender/notify/notify.js',
        }
      }

};

module.exports = config;
