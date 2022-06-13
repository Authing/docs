After obtaining the user information, you can get the user's identity credential (the `token` field ), which you can carry in subsequent requests sent by the client to the backend server `token`, for `axios` example :

```js
const axios = require("axios");
axios
  .get({
    url: "https://yourdomain.com/api/v1/your/resources",
    headers: {
      Authorization: "Bearer ID_TOKEN"
    }
  })
  .then(res => {
    // custom codes
  });
```

The legitimacy of this needs to be checked in the back-end interface to verify the user's identity. For details of the verification method, see Verifying User Identity Credentials (token) . After identifying the user's identity, you may also need to perform permission management on the user to determine whether the user has permission to operate this API.
