# Development integration overview

<LastUpdated/>

{{$localeConfig.brandName}} provides two different styles of API: `RESTful` and `GraphQL`. The SDKs are divided into two categories:

- Management SDK: For administrators to manage {{$localeConfig.brandName}} resources, such as managing users, roles, applications, organizations, configurations, etc.;
- Authentication SDK: For end users to perform operations with the identity of the end user, such as logging in and registering, modifying personal information, resetting passwords, etc.

## Integrate authentication into your application

We recommend using Guard, a [front-end login component](./guard/README.md) provided by {{$localeConfig.brandName}}, which shields developers from many implementation details of the underlying authentication, and also includes cumbersome UI development. If you need to implement the login interface UI by yourself, you can use the `Authentication SDK` provided by us for each language. In the single sign-on scenario, we provide the [single sign-on SDK](./sdk-for-sso.md) to help you implement it quickly.
Some authentication scenarios include:

- Obtain the identity credential `id_token` after the user logs in;
- Use the user's `id_token` to obtain user information;
- Use multi-factor authentication (MFA) as an additional means of authentication.

## Manage your resources in {{$localeConfig.brandName}}

Basically, all the operations you perform in the {{$localeConfig.brandName}} console can be done using the Management SDK, thus realizing automated operation and maintenance management.
Some typical management scenarios include:

- Manage your role in Authing;
- View audit logs and user behavior logs;
- Manage user directories, etc.

## Supported SDKs

Based on this, {{$localeConfig.brandName}} further encapsulates the API into a multi-language SDK, and currently supports the following common languages/scenarios:

- [Java](./sdk-for-java/README.md)
- [Node.js/JavaScript](./sdk-for-node/README.md)
- [Python](./sdk-for-python/README.md)
- [PHP](./sdk-for-php/README.md)
- [C#](./sdk-for-csharp/README.md)
- [Swift](./sdk-for-swift.md)
- [Flutter](./sdk-for-flutter.md)
- [Go](./sdk-for-go.md)
- [Ruby](./sdk-for-ruby.md)

On top of this, we further encapsulated the SDK into a highly customized and universal login form component, which you can quickly integrate into your project. For details, please see: [Login component](./guard/README.md).

Authing's SDK has empowered many customers: Higher Education Press uses Java, Delphi, iOS and other SDK languages, PetroChina uses Python and C# versions of the SDK, and Southeast University uses Java, Delphi, C# and other development languages of the SDK.

In addition, we also provide a [JavaScript SSO SDK](./sdk-for-sso.md) specifically for single sign-on scenarios, which can help you quickly implement single sign-on.

Finally, we also have a guiding process for [quickly integrating {{$localeConfig.brandName}} in the Web framework](./frameworks.md).
You can choose the appropriate API or SDK in combination with your own business scenarios.
