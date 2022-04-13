Swift 可以使用 [JSONWebToken](https://github.com/kylef/JSONWebToken.swift) 来验证 IdToken：

```swift
import JWT
JWT.encode(claims: ["my": "payload"], algorithm: .hs256("secret".data(using: .utf8)!))

// Encoding a claim set
var claims = ClaimSet()
claims.issuer = "fuller.li"
claims.issuedAt = Date()
claims["custom"] = "Hi"

JWT.encode(claims: claims, algorithm: .hs256("secret".data(using: .utf8)!))

// Decoding a JWT
do {
  let claims: ClaimSet = try JWT.decode("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.2_8pWJfyPup0YwOXK7g9Dn0cF1E3pdn299t4hSeJy5w", algorithm: .hs256("secret".data(using: .utf8)!))
  print(claims)
} catch {
  print("Failed to decode JWT: \(error)")
}
```
