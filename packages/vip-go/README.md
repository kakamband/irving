# VIP Go node server setup
This package contains implementations of WordPress VIP's helpers for caching, logging, and monitoring with Newrelic.

## Installation
1. `npm install @irvingjs/vip-go`
2. Import and add the vip go server configuration file to your project's `irving.config.server.js` file:
```javascript
const config = require('@irvingjs/vip-go/irving.config.server.js')

module.exports = {
    packages: [
        config,
    ],
    ...
};
```
3. Update your `package.json` to include the VIP Go preflight checks and the vip-go-friendly build script:
```json
{
    "scripts": {
        "preflight": "npx @automattic/vip-go-preflight-checks",
        "build": "if [ -z $VIP_GO_APP_ID ]; then npm run webpack; else exit 0; fi",
    }
}
```

### Environment
* `VIP_GO_APP_ID` - ID of your VIP Go app. This is not necessary (and should not be added to) your development environment.
* `REDIS_MASTER` - Host and port of redis instance (separated by `:`)
* `REDIS_PASSWORD` - Password necessary for interacting with Redis instance.
* `NEW_RELIC_APP_NAME` - The name of this application, for reporting to New Relic's servers. This value can be also be a comma-delimited list of names.
* `NEW_RELIC_LICENSE_KEY` - Your New Relic license key.
* `NEW_RELIC_NO_CONFIG_FILE` - Indicates all necessary information for configuring newrelic is available in environmental variables. Necessary for VIP Go's integration with newrelic to initialize properly.