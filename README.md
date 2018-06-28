## Overview
Fleeting message viewer.  Post messages to an endpoint and see them come out on the other side in a configurable manner.

### Install
1. `npm install`
2. Copy `app/example-config.json` to `config.json` and set variables to match your environment.
3. From `app` run `node index.js`

### Usage

1. Make a `POST` to `<app-url>/event` with a payload in the following format.  `ttl` is optional.  If omitted the TTL will default to the length used when the `addMessageType()` function was called in your client-side script.

```
  "type": "test",
  "message": "You won't care about this after you see it",
  "ttl": 30
```

2. Watch messages roll through the frontend:
  - Open `<app-url>` in a browser.
  - Use `index.html` as a template and use the `socket.on()` statement to roll your own filtered viewer.
