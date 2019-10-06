const { resolve } = require("path");

module.exports = {
  rootDir: resolve(__dirname, ".."),
  buildDIr: resolve(__dirname, ".nuxt"),
  srcDir: __dirname,
  render: {
    resourceHints: false
  },
  modules: ["@@"],
  laravelecho: {
    driver: "laravel-websockets",
    endpoint: "/broadcasting/auth",
    drivers: {
      "laravel-websockets": {
        driver: "laravel-websockets",
        endpoint: "/broadcasting/auth",
        key: "BZKBzbb1eGLaKVLhWwh59MOsbPCa0MwZBtfCDIFD",
        wsHost: "larapro.test",
        wsPort: 6001,
        // wssPort: 443,
        encrypted: false
      }
    },
    authorization: {
      type: "Bearer",
      getter: "auth/token"
    }
  }
};
