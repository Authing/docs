获取到用户信息之后，你可以得到用户的身份凭证（用户信息的 `token` 字段），你可以在客户端后续发送给后端服务器的请求中携带上此 `token`, 以 `axios` 为例：

```js
const axios = require("axios");
axios
  .get({
    url: "https://yourdomain.com/api/v1/your/resources",
    headers: {
      Authorization: "Bearer ID_TOKEN",
    },
  })
  .then((res) => {
    // custom codes
  });
```

在后端接口中需要检验此 `token` 的合法性，来验证用户的身份，验证方式详情请见[验证用户身份凭证（token）](/guides/faqs/how-to-validate-user-token.html)。识别用户身份之后，你可能还需要[对该用户进行权限管理](/guides/access-control/)，以判断用户是否对此 API 具备操作权限。
