# Applications in Approw

<LastUpdated/>

In Approw, [User Pool](/concepts/user-pool.md) is the minimum unit to separate renter. It's stored user information in your system.  One User Pool may have multiple [applications](/concepts/application.md). Eg: Students in a User Pool, need to access course reservation application, email application and student service center etc. Those applications may share one User Pool.

If you have not created application in Approw, please refer to [How to create Application](./create-app.md).


- [Configuring Login Method](./config-login-methods.md): Add Social Meida or Third Party Identity source in SSO.
- [Registration Agreement](./agreements.md): Before registration, user must agree with your registration terms. You can customize the terms and link.
- [Customize Login UI](./custom-styles.md): {{$localeConfig.brandName}} allows customization Login UI by changing CSS files.
- [Federated Identity Source](./identity-provider.md): {{$localeConfig.brandName}} supports OIDC, OAuth2.0 and SAML. With some configuration. Approw can become an Identity Provider (IdP).
- [Enable Multi-factor Authentication](./mfa.md): {{$localeConfig.brandName}} support MFA. eg: Text verification code, Email verification code, OTP, Face ID, Fingerprint, etc.
- [Implement Single Sign-on between Applications](./sso.md): User only need login one time to access different applications.
- [Mange User Login Status](./session-management.md): Approw admin have access to the current logged in user list. In certain scenario, admin can force a particular user to log off.  
