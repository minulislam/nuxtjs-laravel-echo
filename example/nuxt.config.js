const { resolve } = require("path");

module.exports = {
  rootDir: resolve(__dirname, ".."),
  buildDIr: resolve(__dirname, ".nuxt"),
  srcDir: __dirname,
  render: {
    resourceHints: false
  },
  modules: [
    [
      "@@",
      {
        component: "fa",
        imports: [
          {
            set: "@fortawesome/free-solid-svg-icons",
            icons: ["faCog", "faCalendar", "faHome", "faCircle", "faCheck"]
          }
        ]
      }
    ]
  ],
  laravelecho: {
    driver: "laravel-websockets",
    endpoint: "/api/broadcasting/auth",
    drivers: {
      [`${process.env.BROADCASTER}`]: {
        driver: "laravel-websockets",
        endpoint: "/api/v1/broadcasting/auth",
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
