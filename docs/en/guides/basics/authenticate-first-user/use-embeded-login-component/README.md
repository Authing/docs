# Use embeded login component to authenticate

<LastUpdated/>

The embedded login component (Guard) is considered to be the best balance between flexibility and integration.If the integration requires a deeper level of customization or the [hosting mode](../use-hosted-login-page.md) cannot be used in some scenarios where the front end and back end are separated, it is recommended to use this mode.The embedded login component is built and updated by {{$localeConfig.brandName}}, using the best practice security design in industry. Only a few lines of JavaScript code is needed and then it can be integrated into your development project.

> You can click [here](/concepts/embeded-vs-hosted.md) to understand the difference between the {{$localeConfig.brandName}} hosted login page (Hosted) and the embedded login component (Embedded).

## Embedded login component introduction

The following functions are integrated in the {{$localeConfig.brandName}} embedded login component:

- Login: including account password login (including mobile phone number + password, email + password, username + password) and SMS code login.
- Registration: including mobile phone SMS code registration, and username and password registration.
- Social login, such as GitHub login (need to be configured in the background first).
- APP QR code login (need to access APP scan code login first).
- Mini Program QR code login (need to be configured in the background).
- Enterprise identity source login (need to configure enterprise identity source).
- Forget password and reset password.
- MFA validation.

It has the following features:

- Lightweight: All resources are packaged in only a few hundred KB.
- Responsive: compatible with mobile and PC web pages.
- Customization: It can support a complete UI customization function.

<iframe src="https://codesandbox.io/embed/red-microservice-6613h?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="authing-react-guard"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>

## Integrate with different front-end frameworks

<StackSelector snippet="ui-components-example" selectLabel="选择前端框架" :order="['react', 'vue', 'angular', 'native-javascript']"/>

## Validate user token in back-end

The `token` field of the user information is a standard [OIDC IdToken](/concepts/id-token.md). You can use the application ID and Secret to verify this `token` on the backend.

An example of `token`:

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZjIxNTFiZWFlNWE4YjRjZTZiMGJhZTkiLCJiaXJ0aGRhdGUiOiIiLCJmYW1pbHlfbmFtZSI6IiIsImdlbmRlciI6IiIsImdpdmVuX25hbWUiOiIiLCJsb2NhbGUiOiIiLCJtaWRkbGVfbmFtZSI6IiIsIm5hbWUiOiIiLCJuaWNrbmFtZSI6IiIsInBpY3R1cmUiOiJodHRwczovL3VzZXJjb250ZW50cy5hdXRoaW5nLmNuL2F1dGhpbmctYXZhdGFyLnBuZyIsInByZWZlcnJlZF91c2VybmFtZSI6InRlc3RAZXhhbXBsZS5jb20iLCJwcm9maWxlIjoiIiwidXBkYXRlZF9hdCI6IjIwMjEtMDEtMThUMDc6NDg6NTUuNzgxWiIsIndlYnNpdGUiOiIiLCJ6b25laW5mbyI6IiIsImFkZHJlc3MiOnsiY291bnRyeSI6IiIsInBvc3RhbF9jb2RlIjoiIiwicmVnaW9uIjoiIiwiZm9ybWF0dGVkIjoiIn0sInBob25lX251bWJlciI6bnVsbCwicGhvbmVfbnVtYmVyX3ZlcmlmaWVkIjpmYWxzZSwiZW1haWwiOiJ0ZXN0QGV4YW1wbGUuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJkYXRhIjp7InR5cGUiOiJ1c2VyIiwidXNlclBvb2xJZCI6IjVhOWZhMjZjZjg2MzVhMDAwMTg1NTI4YyIsImFwcElkIjoiNjAwNTNiNzQxNjQ3OGRlMmU4OGZhYjQzIiwiaWQiOiI1ZjIxNTFiZWFlNWE4YjRjZTZiMGJhZTkiLCJ1c2VySWQiOiI1ZjIxNTFiZWFlNWE4YjRjZTZiMGJhZTkiLCJfaWQiOiI1ZjIxNTFiZWFlNWE4YjRjZTZiMGJhZTkiLCJwaG9uZSI6bnVsbCwiZW1haWwiOiJ0ZXN0QGV4YW1wbGUuY29tIiwidXNlcm5hbWUiOiJ0ZXN0QGV4YW1wbGUuY29tIiwidW5pb25pZCI6bnVsbCwib3BlbmlkIjpudWxsLCJjbGllbnRJZCI6IjVhOWZhMjZjZjg2MzVhMDAwMTg1NTI4YyJ9LCJ1c2VycG9vbF9pZCI6IjVhOWZhMjZjZjg2MzVhMDAwMTg1NTI4YyIsImF1ZCI6IjYwMDUzYjc0MTY0NzhkZTJlODhmYWI0MyIsImV4cCI6MTYxMjE2NTg4OCwiaWF0IjoxNjEwOTU2Mjg4LCJpc3MiOiJodHRwczovL3NhbXBsZS1hcHAuYXV0aGluZy5jbi9vaWRjIn0.SNyGBffF-zBqDQFINGxUJZrWSAADHQhbEOsKvnH4SLg
```

You can decode the IdToken in [this website](https://jwt.io/):

![](../images/jwt.io.png)

The `sub` field is the ID of the user, and the `aud` field is the ID of the application. You can learn the detailed definition of each field of OIDC `IdToken` through [this article](https://docs.microsoft.com/en-us/azure/active-directory/develop/id-tokens).

Basically all languages provide libraries for validating `IdToken`. Take Node.js as an example, you can use [JSON Web Token](https://www.npmjs.com/package/jsonwebtoken) to verify `IdToken`.

```javascript
const jwt = require("jsonwebtoken");

try {
  const data = jwt.verify("YOUR_ID_TOKEN", "YOUR_APP_SECRET");
} catch (error) {
  // token might be invalid or expired
  console.error(error);
}
```

If the validation is successful, you can get the unique ID of the user through the sub field, and then you can combine the user ID with your own business logic code. If you need to assign different roles and privileges to different users, you can learn how to assign roles and privileges to users for fine-grained permission control.

## Detailed parameter and event list

The {{$localeConfig.brandName}} embedded login component is highly customizable. The {{$localeConfig.brandName}} embedded login component supports highly customizable.In addition to customizing the basic configuration such as the title and Logo, you can also control the visibility of the login method, fully customize the style through custom CSS, and so on. In addition to successful login events, the {{$localeConfig.brandName}} embedded login component also encapsulates events such as successful registration, login failure, and login registration mode switching. For detailed documentation, please refer to [the Guard document](/reference/guard/#api-reference).