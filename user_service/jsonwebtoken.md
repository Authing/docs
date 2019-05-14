# 解析 JSON Web Token（仅支持 JavaScript）

----------

解析 JSON Web Token 需要使用应用的密钥，密钥在控制台中可以获取到。

以下以 Node 为例（需要安装 `jsonwebtoken`）。

``` javascript
const jwt = require('jsonwebtoken');

try {
  let decoded = jwt.verify('JSON Web Token from client', 'your_secret');
  // 解析成功
} catch (error) {
  // 不合法
}
```