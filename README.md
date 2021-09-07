nexxOMNIA API Client
=====================

The nexxOMNIA API Client provides easy Access to all API Endpoints of the nexxOMNIA API.

Getting Started
---------------

```
$ npm install nexxomnia-api-nodejs
```

```javascript
const {APIClient, MediaCall, streamtypes} = require("nexxomnia-api-nodejs");

let apiclient = new APIClient();
apiclient.configure(999,"API-SECRET","SESSION-ID");

let apicall = new MediaCall(streamtypes.VIDEO);
apicall.latest();

let result = await apiclient.call(apicall);

let obj=result.getResultIterator(true);
for(let el of obj){
	console.log(el.getGeneral().getID());
}

```

Resources
---------

Please find all further Documentation and Usage Examples [here](https://api.docs.nexx.cloud/api-clients/nodejs).

