// vue.config.js
const webpack = require('webpack');

module.exports = {
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false',
      }),
    ],
  },
 
  chainWebpack: config => {
    // 配置 mp3 文件的处理方式
    config.module
      .rule('media')
      .test(/\.(mp3|wav|ogg)$/)
      .use('url-loader')
      .loader('url-loader')
      .options({
        limit: 8192,  // 如果文件小于 8KB，会转为 base64
        name: 'assets/audio/[name].[hash:8].[ext]'  // 设置音频文件的输出路径
      });
  },

};


