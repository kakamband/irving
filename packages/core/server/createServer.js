const http = require('http');
const https = require('https');
const {
  HTTPS_KEY_PATH,
  HTTPS_CERT_PATH,
} = process.env;

/* eslint-disable global-require, no-console, import/order */
module.exports = function createServer(app) {
  let server;

  if (HTTPS_KEY_PATH && HTTPS_CERT_PATH) {
    const os = require('os');
    const fs = require('fs');
    const path = require('path');

    const key = fs.readFileSync(
      path.join(
        os.homedir(),
        HTTPS_KEY_PATH,
      ),
      'utf8'
    );
    const cert = fs.readFileSync(
      path.join(
        os.homedir(),
        HTTPS_CERT_PATH,
      ),
      'utf8'
    );

    server = https.createServer({ key, cert }, app);
  } else {
    server = http.createServer(app);
  }

  return server;
};
/* eslint-enable */