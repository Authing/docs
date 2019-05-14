# 验证 JWT 合法性

----------

验证 JWT 的合法性需要使用应用的密钥，密钥在控制台中可以获取到。

以下以 Node 为例（需要安装 `jsonwebtoken`）。

``` javascript
const jwt = require('jsonwebtoken');

try {
  let decoded = jwt.verify('JSON Web Token from client', 'your_secret'),
    expired = (Date.parse(new Date()) / 1000) > decoded.exp
  if (expired) {
    // 过期
  }else {
    // 合法也没过期，正常放行
  }
} catch (error) {
  // 不合法
}
```