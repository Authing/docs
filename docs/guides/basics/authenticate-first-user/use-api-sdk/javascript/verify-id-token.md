Node.js 可以使用 [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) 来验证 IdToken：

```javascript
const jwt = require('jsonwebtoken')

try {
  const data = jwt.verify('YOUR_ID_TOKEN', 'YOUR_APP_SECRET')
} catch (error) {
  // token might be invalid or expired
  console.error(error)
}
```