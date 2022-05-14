# Login Component (Guard) Configuration Parameter List

<LastUpdated/>

The Authing login component (Guard) provides many advanced configurations, such as customizing the UI and using specific login methods. All configurations are as follows:

| <p>Parameter Name</p><p></p>        | <p>Parameter Description</p><p></p>                                                                                                                                                                                                                                                            | <p>Type</p><p></p>                                                                                                | <p>Required</p><p></p>                  | <p>Default</p><p></p>                                           |
| ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- | --------------------------------------- | --------------------------------------------------------------- |
| <p>target</p><p></p><p></p>         | <p>Specify the mount point of the Guard form, accept all the parameters or dom elements that querySelector (opens new window) can accept, if not passed in, Guard will automatically generate a div tag and put it at the end of the body.</p><p></p>                                          | <p>String</p><p></p><p></p>                                                                                       | <p>HTMLElement</p><p></p>               | <p>No</p><p></p><p></p>                                         |
| <p>mode</p><p></p>                  | <p>Guard display mode</p><p></p>                                                                                                                                                                                                                                                               | <p>[GuardMode](https://docs.authing.cn/v2/reference/guard/parameters.html#guardmode)</p><p></p>                   | <p>No</p><p></p><p></p>                 | <p>GuardMode.Normal</p><p></p>                                  |
| <p>title</p><p></p>                 | <p>**Product name**</p><p></p>                                                                                                                                                                                                                                                                 | <p>String</p><p></p>                                                                                              | <p>No</p><p></p>                        | <p>Authing</p><p></p>                                           |
| <p>logo</p><p></p>                  | <p>**Product logo**</p><p></p>                                                                                                                                                                                                                                                                 | <p>String</p><p></p>                                                                                              | <p>No</p><p></p>                        | <p>[Authing logo]</p><p></p>                                    |
| <p>contentCss</p><p></p>            | <p>**Custom CSS style,**If specified, a node will be inserted into the head of the DOM.such as body {background:#6699 !important;}.</p><p></p>                                                                                                                                                 | <p>String</p><p></p>                                                                                              | <p>No</p><p></p>                        | <p>-</p><p></p>                                                 |
| <p>loginMethods</p><p></p>          | <p>List of common login methods(**include LDAP**) that need to be used.</p><p></p><p></p>                                                                                                                                                                                                      | <p>[LoginMethods](https://docs.authing.cn/v2/reference/guard/parameters.html#loginmethods)[]</p><p></p>           | <p>No</p><p></p>                        | <p>[*LoginMethods.PhoneCode, LoginMethods.Password*]</p><p></p> |
| <p>registerMethods</p><p></p>       | <p>**Registration method that need to be used.**</p><p></p><p></p>                                                                                                                                                                                                                             | <p>[RegisterMethods](https://docs.authing.cn/v2/reference/guard/parameters.html#registermethods)[]</p><p></p>     | <p>No</p><p></p>                        | <p>[*RegisterMethods.Email*,*RegisterMethods.Phone*]</p><p></p> |
| <p>defaultRegisterMethod</p><p></p> | <p>**Registration method displayed by default**</p><p></p>                                                                                                                                                                                                                                     | <p>[RegisterMethods](https://docs.authing.cn/v2/reference/guard/parameters.html#registermethods)</p><p></p>       | <p>No</p><p></p>                        | <p>\_RegisterMethods.Email\*</p><p></p>                         |
| <p>defaultScenes</p><p></p>         | <p>**The interface displayed when the component is opened.**</p><p></p>                                                                                                                                                                                                                        | <p>[GuardScenes](https://docs.authing.cn/v2/reference/guard/parameters.html#guardscenes)</p><p></p>               | <p>No</p><p></p>                        | <p>\_GuardScenes.Login\*</p><p></p>                             |
| <p>socialConnections</p><p></p>     | <p>**Social login list that need to be used.**</p><p></p>                                                                                                                                                                                                                                      | <p>[SocialConnections](https://docs.authing.cn/v2/reference/guard/parameters.html#socialconnections)[]</p><p></p> | <p>No</p><p></p>                        | <p>[]</p><p></p>                                                |
| <p>enterpriseConnections</p><p></p> | <p>List of corporate identity sources(**exclude LDAP**) that need to be used,The list item value is the unique identifier of the configured corporate identity source, attention:The corporate identity source needs to be passed in the corresponding appId before it can be used.</p><p></p> | <p>Array</p><p></p><p></p>                                                                                        | <p>No</p><p></p>                        | <p>[]</p><p></p>                                                |
| <p>defaultLoginMethod</p><p></p>    | <p>**Default login method**.Optional value is one of options.loginMethods.</p><p></p>                                                                                                                                                                                                          | <p>String</p><p></p>                                                                                              | <p>No</p><p></p>                        | <p>_LoginMethods.Password_</p><p></p>                           |
| <p>autoRegister</p><p></p>          | <p>**Whether to merge registration and login**, after the merge, if the user does not exist, it will be automatically registered.</p><p></p>                                                                                                                                                   | <p>Boolean</p><p></p>                                                                                             | <p>No</p><p></p>                        | <p>false</p><p></p>                                             |
| <p>disableRegister</p><p></p>       | <p>**Whether to merge registration and login**,If prohibited, the "register" will be hidden.</p><p></p>                                                                                                                                                                                        | <p>Boolean</p><p></p>                                                                                             | <p>No</p><p></p>                        | <p>false</p><p></p>                                             |
| <p>disableResetPwd</p><p></p>       | <p>**Whether to prohibit password reset,** If prohibited, the "forgot password" will be hidden.</p><p></p>                                                                                                                                                                                     | <p></p><p></p>                                                                                                    | <p></p><p></p>                          | <p></p><p></p>                                                  |
| <p>clickCloseable</p><p></p>        | <p>**Whether to hide the close button in the upper right corner of the login box in Modal mode**, if it is hidden, the user will not be able to close the login box by clicking the button.</p><p></p>                                                                                         | <p>Boolean</p><p></p>                                                                                             | <p>No</p><p></p>                        | <p>true</p><p></p>                                              |
| <p>escCloseable</p><p></p>          | <p>**Whether it is possible to close the login box through the keyboard ESC key in Modal mode.**</p><p></p>                                                                                                                                                                                    | <p>Boolean</p><p></p>                                                                                             | <p>No</p><p></p>                        | <p>true</p><p></p>                                              |
| <p>isSSO</p><p></p>                 | <p>whether it is single sign on</p><p></p>                                                                                                                                                                                                                                                     | <p>Boolean</p><p></p>                                                                                             | <p>No</p><p></p>                        | <p>false</p><p></p>                                             |
| <p>appHost</p><p></p>               | <p>App host</p><p></p>                                                                                                                                                                                                                                                                         | <p>String</p><p></p>                                                                                              | <p>Yes</p><p></p>                       | <p>-</p><p></p>                                                 |
| <p>qrCodeScanOptions</p><p></p>     | <p>QR code login configuration，details:options parameter in [QrCodeAuthenticationClient().startScanning(domId, options)(opens new window)](https://docs.authing.cn/reference/sdk-for-node/authentication/QrCodeAuthenticationClient.html#一键开始扫码)</p><p></p>                             | <p>Objcect</p><p></p>                                                                                             | <p>No</p><p></p>                        | <p>null</p><p></p>                                              |
| <p>apiHost</p><p></p>               | <p>API request address for private deployment</p><p></p><p></p>                                                                                                                                                                                                                                | <p>String</p><p></p>                                                                                              | <p>Yes in private deployment</p><p></p> | <p>[Authing official api address]</p><p></p>                    |

The following is a description of all enumeration values that may be used in the advanced configuration:

## GuardMode

Guard currently has two display methods: `modal | normal`. The `normal` method inserts the form into the specified dom node, which is suitable for scenarios where login is used as a separate page. The `modal` mode displays the form in the form of a modal box, which is suitable for popping up in an existing page. log in. The default display mode is `normal`, and the display mode can be configured by passing in the `mode` parameter:

```javascript
import { AuthingGuard, GuardMode } from "@authing/native-js-ui-components";
// import css files
import "@authing/native-js-ui-components/lib/index.min.css";

const guard = new AuthingGuard("AUTHING_APP_ID", {
  mode: GuardMode.Modal
});

// modal mode need to call the “show” method to display the form
guard.show();
```

::: hint-warning
**Attention**：The native js version of `modal` mode needs to manually call `guard.show()` after initialization to show Guard.
:::

SSO login mode can be enabled by passing in `appHost` and `isSSO`. Guard will detect whether there is a user logged in to this application after the `load` event. If so, the `login` event will be triggered directly to make your next operation easy.

| key    | value    | Description    |
| :----- | :------- | :------------- |
| Modal  | 'modal'  | Modal box mode |
| Normal | 'normal' | Normal mode    |

## LoginMethods

Common login methods supported by Guard

| key       | value        | Description                                                                                                |
| :-------- | :----------- | :--------------------------------------------------------------------------------------------------------- |
| LDAP      | 'ldap'       | LDAP identity directory login(Need to [configure LDAP service](/en/connections/ldap/))                     |
| AppQr     | 'app-qrcode' | APP QR code login(Need to import [APP QR code login](/guides/authentication/qrcode/use-self-build-app/))   |
| Password  | 'password'   | Account password login (including mobile phone number + password, email + password, user name + password.) |
| PhoneCode | 'phone-code' | SMS code login                                                                                             |
| AD        | 'ad'         | AD user directory login                                                                                    |

## RegisterMethods

Registration methods supported by Guard

| key   | value   | Description           |
| :---- | :------ | :-------------------- |
| Email | 'email' | Email registration    |
| Phone | 'phone' | SMS code registration |

## GuardScenes

Guard displayable interface

| key      | value      | Description            |
| :------- | :--------- | :--------------------- |
| Login    | 'login'    | Login interface        |
| Register | 'register' | Registration interface |

## ResetPwdMethods

Password reset methods supported by Guard

| key   | value   | Description                      |
| :---- | :------ | :------------------------------- |
| Email | 'email' | Reset by email verification code |
| Phone | 'phone' | Reset by SMS code                |

## SocialConnections

Guard 支持的社会化登录方式

| key    | value    | Description  |
| :----- | :------- | :----------- |
| Github | 'github' | GitHub login |
| Google | 'google' | Google login |

## Get help

Join us on forum: [#authing-chat](https://forum.authing.cn/)
