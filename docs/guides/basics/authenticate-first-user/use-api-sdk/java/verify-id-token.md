Java 可以使用 [java-jwt](https://github.com/auth0/java-jwt) 来验证 IdToken：

```java
String token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXUyJ9.eyJpc3MiOiJhdXRoMCJ9.AbIJTDMFc7yUa5MhvcP03nJPyCPzZtQcGEp-zWfOkEE";
try {
    Algorithm algorithm = Algorithm.HMAC256("secret");
    JWTVerifier verifier = JWT.require(algorithm)
        .withIssuer("auth0")
        .build(); //Reusable verifier instance
    DecodedJWT jwt = verifier.verify(token);

    //Get user info
    JWTClaimsSet jwtClaimSet = JWTParser.parse(token)
        .getJWTClaimsSet();
    Map<String, Object> map = jwtClaimSet.getClaims();
} catch (JWTVerificationException | ParseException exception){
    //Invalid signature/claims
}
```