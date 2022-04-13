# **Available Node Modules**

Currently, the following Node Modules can be used in Approw Pipeline:

- [Approw SDK for Node.js](https://github.com/Authing/authing.js)

- Network request library: [axios](https://github.com/axios/axios)

- lodash

- Approw built-in toolset functions: utils

## **Approw SDK for Node.js**

For security reasons, Approw will use your user pool ID (userPoolId) and user pool key (secret) to initialize Approw-js-sdk in a special way. This process will not send your user pool key to the public network. You can use the global variable **Approw** , **please do not initialize the SDK again!**

Developers can directly use the [initialized](https://docs.authing.cn/v2/reference/sdk-for-node/) Approw instance **without manual initialization**! Approw Pipeline will automatically help developers take care of the initialize process.

As follows:

```js
async function pipe(user, context, callback) {
  if (!user.email.endsWith('@Approw.cn')) {
    return callback(null, user, context)
  }

  try {
    await Approw.roles.addUsers('ROLE', [user.id])
  } catch (error) { }

  callback(null, user, context)
}

```

explain:

- 2-4 line: Determining whether the user&#39;s mailbox has @Approw.cnends, if not, you can skip this Pipeline function.

- Lines 6-11 call the [role management SDK](https://docs.authing.cn/v2/reference/sdk-for-node/management/RolesManagementClient.html#%E6%B7%BB%E5%8A%A0%E7%94%A8%E6%88%B7) API to authorize user rolesROLE.

- Here we use env.ROOT\_GROUP\_ID to get the group ID through environment variables, which can avoid hard coding. For how to use environment variables in Pipelien functions, see [Using Environment Variables](https://docs.authing.cn/v2/guides/pipeline/env.html).

- Call the callback function callback on line 13, and the first parameter is null, which means that no error is thrown, and the following authentication process can be continued.  For how to use the callback and the complete API of Pipeline functions, please refer to the [Pipeline function API documentation](https://docs.authing.cn/v2/guides/pipeline/pipeline-function-api-doc.html).

## **Network request library**

Currently Approw supports the useaxiosand supports async/await syntax 🚀!

For detailed axios documentation, please move to [its official documentation](https://github.com/axios/axios).

## **lodash**

Need to be manually imported by the developer:
```js
const _ = require("lodash")
```

For detailed documentation, please move to [its official documentation](https://lodash.com/docs/).

## **Built-in toolset utils**

Approw encapsulates some useful functions for developers to call directly.

Need to be manually imported by the developer:

```js
const utils = require("./utils")
```

## **Check if the IP is in the IP range**

Instructions:

```js
utils.ipRangeCheck(IP, [start, end]) 
```


The return value is boolean.

Example: The following Pipeline function implements the function of registering the whitelist of IP segments.

```js
async function pipe(context, callback) {
  const utils = require("./utils")
  const ip = context.ip
  if (ip && utils.ipRangeCheck(ip, ["110.53.254.1", "110.53.254.255"])) {
    return callback(null, context)
  }
  return callback(new Error('Access Denied!'))
}
```

## **Other Node comes with Module**

Approw Pipeline uses node8 engine, all built-in modules of [node8](https://nodejs.org/dist/v8.17.0/docs/api/documentation.html) It can be used, such asquerystringand so on.