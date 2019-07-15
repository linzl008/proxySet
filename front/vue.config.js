const webpack = require("webpack");

module.exports = {
  publicPath:"./",
  productionSourceMap: !(process.env.SOURCE_MAP === 'close'),//控制sourcemap的开关，生产环境关闭
  configureWebpack: {
    plugins: [
      /*new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "windows.jQuery": "jquery",
      })*/
    ],
    /*
    externals: {
      "BMap":"BMap",
      "BMap_Symbol_SHAPE_POINT":"BMap_Symbol_SHAPE_POINT",
      'AMap': 'AMap',
    },*/
  },
  /*chainWebpack: config => {
    config
        .entry('index')
        .add('babel-polyfill')
  },*/

  devServer: {
    // proxy: {
    //   '/': {
    //     target: 'http://192.168.2.24:8762', //对应自己的接口
    //     changeOrigin: true,
    //     ws: false,
    //     pathRewrite: {
    //       '^/': ''
    //     }
    //   }
    // }
  }

  // css: {
  //     loaderOptions: {
  //         postcss: {
  //             plugins: [
  //                 require('postcss-pxtorem')({
  //                     rootValue: 54,
  //                     unitPrecision: 5,
  //                     propList: ['*'],
  //                     selectorBlackList: [],
  //                     replace: true,
  //                     mediaQuery: false,
  //                     minPixelValue: 4
  //                 }),
  //                 // require('postcss-px2rem')({remUnit: 54}), 
  //             ]
  //         }
  //     }
  // },
  
};
