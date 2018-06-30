// config.js

// listening port
let port = 8000;

// config object
const config = {
  port: 8000,
  appName: "zerp-viewport",
  appDir: __dirname,
  appURLBase: `https://localhost:${port}`
};

// export the config
module.exports = config;
