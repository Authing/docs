# Use social login authentication

<LastUpdated/>

Social login refers to the process in which users use social platform identity authentication information to authenticate and log in to third-party applications or URLs. For example, people often use personal WeChat, QQ, Weibo and other social accounts to log in to Didi and NetEase Cloud Music. Social login not only helps simplify the user's login experience on third-party platforms, but also provides a simpler and more convenient way for users to create new accounts on third-party platforms. Both for normal users and enterprises, social login has unparalleled advantages.

## Social login list

{{$localeConfig.brandName}} currently supports 4 social logins around the world, such as GitHub, Apple, etc. The following is a complete list:

!!!include(en/common/social-connections-table.md)!!!

## Custom social login

{{$localeConfig.brandName}} provides the ability to integrate a **custom OAuth2.0 identity provider**. If you need to connect to a social login identity source that is not built in {{$localeConfig.brandName}}, you can <router-link to="/connections/custom-social-provider/" target="_blank">read this guide</router-link>.

## Choose the appropriate development integration method

{{$localeConfig.brandName}} social login supports four integration methods: **JavaScript SDK**, **embedded login components**, **hosted login pages** and **manually calling the social login interface**. Each different integration method has its own advantages and disadvantages. You can use your own business needs to choose the right way.

The following is a comparison of the advantages and disadvantages of various methods:

| Integration method                                                 | Advantages                                                                                                                                                                        | Disadvantages                                                                                         | Recommend                                               |
| ------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| JavaScript SDK <img width=200 style="display:inline;float:right"/> | Easy to integrate, only a few lines of code are required. The highest degree of customization is possible.                                                                        |                                                                                                       | <img width=120 style="display:inline;float:right"/> Yes |
| embedded login components                                          | Easy to integrate, only a few lines of code are required. You can integrate this component into your application. Relatively high degree of customization.                        |                                                                                                       | Yes                                                     |
| hosted login pages                                                 | Operation and maintenance are simple, and {{$localeConfig.brandName}} is responsible for operation and maintenance. Each application has an independent second-level domain name. | Cannot be embedded in your app                                                                        | Yes                                                     |
| manually calling the social login interface                        |                                                                                                                                                                                   | You need to manually parse the user information from the URL. Relatively complicated and troublesome. | No                                                      |

The following is the details of integration method for each method:

<StackSelector snippet="social-login" selectLabel="Method" :order="['sdk', 'embeded-component', 'hosted-page', 'manually']"/>
