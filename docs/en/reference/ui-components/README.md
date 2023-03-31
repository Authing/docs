---
meta:
  - name: description
    content: Login component (Guard)
---

# Login Component (Guard)

<LastUpdated/>

The Authing login component (Guard) is an embeddable login form that can be configured according to your needs and is recommended for single-page applications. It allows you to easily add various social login methods so that your users can log in seamlessly and have a consistent login experience on different platforms. Guard shields many implementation details of low-level authentication for developers, as well as cumbersome UI development.

Guard can be integrated into your React, Vue.js, Angular, and native JavaScript projects. You can use this component to quickly implement the login authentication process.

![Guard demo](../../images/reference/guard-demo.jpg)

## Function list

#### Rich login and registration methods

Built-in rich login and registration methods for developers to choose:

- Account password login (including mobile phone number + password, email + password, user name + password);
- SMS login;
- APP scan code login ([need to access APP scan code login first](/guides/authentication/qrcode/use-self-build-app/overview.md)）；
- Social login, such as GitHub login ([need to be configured in the background](/guides/connections/social.md)）；
- Enterprise identity source login ([needs to configure enterprise identity source](/guides/connections/enterprise.md)）；

#### Built-in forgot password process

The Guard has a built-in interactive UI for forgetting the password, so you don't need to write any additional code.

#### Built-in multi-factor authentication (MFA) capability

Guard has built-in multi-factor authentication (MFA) function. When your application enables multi-factor authentication, users can use this component to complete multi-factor authentication. You don't need to write any additional code.

#### Responsive layout

Responsive layout, perfectly compatible with mobile and PC terminals, and you can easily customize the login box style through custom CSS.

#### Compatible with all mainstream front-end frameworks

- [Native JavaScript call](./native-javascript.md);
- [Vue components](./vue.md);
- [React components](./react.md);
- [Angular components](./angular.md).

## Online example

<iframe src="https://codesandbox.io/embed/red-microservice-6613h?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="authing-react-guard"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

## Use in React project

You can include the `@authing/react-ui-components` package in your React project. For details, please refer to the[React login component usage documentation](./react.md).

## Use in Vue.js project

You can include the `@authing/vue-ui-components` package in your Vue.js project. For details, please refer to the [ Vue.js login component usage documentation](./vue.md).

## Use in Angular project

You can include the `@authing/ng-ui-components` package in your Vue.js project. For details, please refer to the [Angular login component usage documentation](./angular.md).

## Use in native JavaScript projects

You can include the `@authing/native-js-ui-components` package in your native JavaScript project. For details, please refer to the [Native JavaScript login component usage documentation](./native-javascript.md).

## Get help

请访问 [Authing Chat](https://forum.authing.cn/)。
