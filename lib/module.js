const { resolve } = require("path");

async function nuxtModule(moduleOptions) {
  const options = Object.assign({}, this.options.laravelecho, moduleOptions);
  // const options = Object.assign({}, moduleOptions);
  this.addPlugin({
    src: resolve(__dirname, "plugin.js"),
    fileName: "nuxt-laravelecho.js",
    options,
    ssr: false
  });
}

module.exports = nuxtModule;
module.exports.meta = require("../package.json");
