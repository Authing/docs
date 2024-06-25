# Custom Code

Custom code nodes allow you to write very flexible custom logic, including but not limited to:

-Perform complex data transformations;
-Send network requests;
-Throw custom exceptions, manually terminate the process, and so on.

Authoring custom code runs in the isolated sandbox environment of Node.js 14, supporting async/await and the latest [ES6]（ https://es6.ruanyifeng.com/ ）Grammar. We provide developers with many out of the box libraries and tool classes:

1. Network request:[axios](https://www.npmjs.com/package/axios)
2. Data operation:[lodash](https://www.npmjs.com/package/lodash)、[ramda](https://www.npmjs.com/package/ramda)
3. Database operations:[pg](https://www.npmjs.com/package/pg)、[mysql2](https://www.npmjs.com/package/mysql2)、[mysql2/promise](https://www.npmjs.com/package/mysql2-promise)、[mongodb](https://www.npmjs.com/package/mongodb)
4. Data encryption:[bcrypt](https://www.npmjs.com/package/bcrypt)、[crypto](https://www.npmjs.com/package/crypto)
5. Date tool:[moment](https://www.npmjs.com/package/moment)、[dayjs](https://www.npmjs.com/package/dayjs)
6. other:[faker](https://www.npmjs.com/package/faker)、[validator](https://www.npmjs.com/package/validator)、[qs](https://www.npmjs.com/package/qs)、[jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)、[uuid](https://www.npmjs.com/package/uuid)、[js-yaml](https://www.npmjs.com/package/js-yaml)
7. Authing built-in tool class: utils (details can be found in the following text)

# Create custom code nodes

You can add <strong> custom code </strong> nodes to the Authing identity automation application list:

![](../static/CssCbyPq6oed92xqvhicAwCfn1g.png)

The configuration of custom code nodes is divided into two parts: input data and function body. For example, if you define a variable data in the input data, you can reference this data in the code through data. If this custom code has a return value, a return statement is required to return the result.

![](../static/DkiCb8ulPoBeLzxk7mKc6gZEn9c.png)

# Authoring built-in tool class

## async utils.<strong>generateSerialNumber</strong>

Function description: Generate a self increasing sequence of user pool isolation levels.

Function definition: async utils. generateSerialNumber (length, start)

Parameter description:

- Length: The length of the self increasing sequence, for example, if set to 6 bits, if not called once, data such as 00000 1 and 00000 2 will be generated.
- Start: The starting value of the self increasing sequence, which defaults to 0, meaning that the first generated sequence value is 00000 1.

Usage scenario:

- Generate a self increasing job number for the user.

Code example: As shown in the following example code, a self increasing sequence with the formats E00001 and E000002 will be generated.

```typescript
return "E" + await utils.generateSerialNumber(6, 0);
```

## async utils.<strong>rsaEncrypt</strong>

Function description: Use RSA public key to encrypt content

Function definition: async utils.<strong>rsaEncrypt</strong>(plainText, publicKey)

Parameter description:

- PlainText: plaintext that needs to be encrypted
- PublicKey: RSA public key, such as

```typescript
-----BEGIN PUBLIC KEY-----
xxxxxxxxxxxxxxxxxxxxxxxx
xxxxxxxxxxxxxxxxxxxxxxxx
xxxxxxxxxxxxxxxxxxxxxxxx
-----END PUBLIC KEY-----
```

## async utils.<strong>rsaDecrypt</strong>

Function description: Use RSA private key to decrypt content

Function definition: async utils <strong> rsaDecrypt </strong>(encrypted, privateKey)

Parameter description:

- Encrypted: The ciphertext that needs to be decrypted
- PrivateKey: RSA key, such as

```typescript
-----BEGIN RSA PRIVATE KEY-----
xxxxxxxxxxxxxxxxxxxxxxxx
xxxxxxxxxxxxxxxxxxxxxxxx
xxxxxxxxxxxxxxxxxxxxxxxx
-----END RSA PRIVATE KEY-----
```

# Common scenario examples

Before writing custom code nodes, we use the incoming JSON data point node Mock to create a copy of the data:

```typescript
[
  {
    "login": "mojombo",
    "id": 1,
    "node_id": "MDQ6VXNlcjE=",
    "avatar_url": "https://avatars.githubusercontent.com/u/1?v=4",
    "gravatar_id": "",
    "url": "https://api.github.com/users/mojombo",
    "html_url": "https://github.com/mojombo",
    "followers_url": "https://api.github.com/users/mojombo/followers",
    "following_url": "https://api.github.com/users/mojombo/following{/other_user}",
    "gists_url": "https://api.github.com/users/mojombo/gists{/gist_id}",
    "starred_url": "https://api.github.com/users/mojombo/starred{/owner}{/repo}",
    "subscriptions_url": "https://api.github.com/users/mojombo/subscriptions",
    "organizations_url": "https://api.github.com/users/mojombo/orgs",
    "repos_url": "https://api.github.com/users/mojombo/repos",
    "events_url": "https://api.github.com/users/mojombo/events{/privacy}",
    "received_events_url": "https://api.github.com/users/mojombo/received_events",
    "type": "User",
    "site_admin": false
  },
  {
    "login": "defunkt",
    "id": 2,
    "node_id": "MDQ6VXNlcjI=",
    "avatar_url": "https://avatars.githubusercontent.com/u/2?v=4",
    "gravatar_id": "",
    "url": "https://api.github.com/users/defunkt",
    "html_url": "https://github.com/defunkt",
    "followers_url": "https://api.github.com/users/defunkt/followers",
    "following_url": "https://api.github.com/users/defunkt/following{/other_user}",
    "gists_url": "https://api.github.com/users/defunkt/gists{/gist_id}",
    "starred_url": "https://api.github.com/users/defunkt/starred{/owner}{/repo}",
    "subscriptions_url": "https://api.github.com/users/defunkt/subscriptions",
    "organizations_url": "https://api.github.com/users/defunkt/orgs",
    "repos_url": "https://api.github.com/users/defunkt/repos",
    "events_url": "https://api.github.com/users/defunkt/events{/privacy}",
    "received_events_url": "https://api.github.com/users/defunkt/received_events",
    "type": "User",
    "site_admin": false
  }
]
```

Then assemble this data in the custom code node:

![](../static/BvjVbIwxVongpexS0yXcG0pVn4V.png)

## Example 1: Traversing input data for data processing

In custom code, Node.js can use methods such as map and filter, as well as for loops, to perform a series of processing on the input data:

For example, adding a field source to each incoming element with a value of "github"

```typescript
return data.map(item => {
    item.source = "github";
    return item;
});
```

You can also introduce [lodash](https://www.npmjs.com/package/lodash) 包：

```typescript
const _ = require("lodash");
return _.map(data, x => {
  x.source = "github";
  return x;
});
```

For example, filter out elements with id less than or equal to 1

```typescript
return data.filter(item => {
    return item.id <= 1;
});
```

## Example 2: Sending network requests in custom code


Authing custom code nodes have built-in [axios](https://www.npmjs.com/package/axios) Network request library, you can use it to send network requests, as shown below: We traverse each element of the input data and then request the follows_URL field to obtain the list of Followers for this GitHub user:：

```typescript
const axios = require("axios");
const getFollowers = async (url) => {
  const { data } = await axios.get(url);
  return data;
};

for (const item of data) {
  const { followers_url } = item;
  const followers = await getFollowers(followers_url);
  item.followers = followers;
}

return data;
```

## Example 3: Filter users who have been updated within 7 days

In the following example, before customizing the code node, we pull user data through the "Get User List" of the Authing node and input the result into the custom code node:

![](../static/XPhmbc3MUoLYY8xkonFcpdDFn3g.png)

We have built-in [moment](https://www.npmjs.com/package/moment)It is very convenient to perform a series of operations on the date:

```typescript
const moment = require("moment");

const targetDate = moment().subtract(7,'d');
return users.filter(user => {
  const { updatedAt } = user;
  return new Date(updatedAt) > targetDate;
});
```

# Precautions

1. Node.js buffer cannot be used in custom code blocks. If you need to operate a buffer in custom code, it is recommended to develop an interface on your server and use HTTP nodes to call it.
2. The built-in tool class functions in Authing are all asynchronous functions that require the use of await.
