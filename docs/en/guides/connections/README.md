# Integreate Third-Party Identity Providers

<LastUpdated/>

The identity provider, also known as IdP, is a service which is used to store and manage users' information. Using third-party identity providers could save user management and use costs.

One typical single sign on flow with a thrid-party IdP contains such steps:

- Redirect: When users click "**Use THIRD_PARTY Single Sign On**" at {{$localeConfig.brandName}} login page, they will be redirected to the login page of the third-party IdP.
- Request: Users input their username and password in the third-party IdP's login page such as Google or GitHub.
- Authenticate: The thrid-party IdP will authenticate users' identity.
- Authorize: After users' identity are authenticated, the browser will redirect back to {{$localeConfig.brandName}} with a temporary certificate from the third-party IdP and then the {{$localeConfig.brandName}} will use this certificate to exchange for user's information from the third-party IdP.

The common third-party IdPs include Google, GitHub and other SAML identity service providers. In the Authing, IdPs are classified as such different kinds:

- [Social authentication providers](./social.md), like GitHub or Apple.
- [Enterprise IdPs](./enterprise.md), IdPs which support standard authentication or authorization protocols like OIDC, SAML, CAS, LDAP, Windows Active Directory and Azure Active Directory.
- [Customized Database](/guides/database-connection/overview.md), you can also integrate your database with Authing using customized database script to store users' information.

## Need More Help?

Join us on forum: [#authing-chat](https://forum.authing.cn/)
