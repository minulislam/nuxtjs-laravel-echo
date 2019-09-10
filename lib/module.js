const { resolve } = require('path');

async function nuxtModule (moduleOptions) {
  const options = Object.assign({}, moduleOptions);

  this.addPlugin({
    src: resolve(__dirname, 'plugin.js'),
    fileName: 'nuxt-echo.js',
    options,
    ssr: false
  });
}

module.exports = nuxtModule;
module.exports.meta = require('../package.json');
