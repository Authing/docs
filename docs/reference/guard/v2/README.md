---
    directoryList: [
        {
            name: 'React',
            link: 'reference/guard/v2/web.html',
            img: 'react@2x.png',
            github: "https://github.com/authing/guard",
        },
        {
            name: 'Vue',
            link: 'reference/guard/v2/web.html',
            img: 'vue@2x.png',
            github: "https://github.com/authing/guard",
        },
        {
            name: 'Angular',
            link: 'reference/guard/v2/web.html',
            img: 'angular@2x.png',
            github: "https://github.com/authing/guard",
        },
        {
            name: 'JavaScript',
            link: 'reference/guard/v2/web.html',
            img: 'javascript@2x.png',
            github: "https://github.com/authing/guard",
        }
    ]
---
# 接入 Authing Guard

<LastUpdated/>

Authing Guard 是你「即取即用」的登录组件，根据下面的引导完成嵌入，为你的应用轻松接入认证能力。

![Guard-index](./images/guard_index.png)

:::hint-info
推荐使用 Guard 5.0 及以上版本，低于 5.0 的版本将不再维护！
:::

<table>
	<tr>
	    <th>版本</th>
        <th>描述</th>
	    <th>快速开始</th>  
	</tr>
    <tr>
        <td rowspan="4">Guard 5.0</td>
        <td rowspan="4">
            <p>具备 Guard 4.0 的全部能力，并在此基础上做了以下优化：</p>
            <p>1. 内置 Authing 认证 JS SDK，并在此基础上将登录功能 API 化。</p>
            <p>2. 针对 React、Vue、Angular 分别封装了 hooks、plugin、service，使用更方便。</p>
            <p>3. 兼容 React18。</p>
        </td>
        <td>
            <a href="https://docs.authing.cn/v2/reference/guard/v2/web.html" _target="blank">
                将 Guard 接入到 React 项目
            </a>
        </td>
	</tr>
	<tr>
        <td>
            <a href="https://docs.authing.cn/v2/reference/guard/v2/web.html" _target="blank">
                将 Guard 接入到 Vue 项目
            </a>
        </td>
	</tr>
	<tr>
        <td>
            <a href="https://docs.authing.cn/v2/reference/guard/v2/web.html" _target="blank">
                将 Guard 接入到 Angular 项目
            </a>
        </td>
	</tr>
    <tr>
        <td>
            <a href="https://docs.authing.cn/v2/reference/guard/v2/web.html" _target="blank">
            将 Guard 接入到原生 JS 项目
            </a>
        </td>
    </tr>
	<tr>
        <td rowspan="4">Guard 4.0</td>
        <td rowspan="4">
            <p>1. 拥有丰富的登录注册方式。</p>
            <p>2. 内置多种功能，无需额外编写代码。</p>
            <p>3. 拥有响应式布局，兼容移动端和 PC 端。</p>
            <p>4. 兼容前端所有主流框架。</p>
        </td>
        <td>
            <a href="https://docs.authing.cn/v2/reference/guard/v2/react.html" _target="blank">
                将 Guard 接入到 React 项目
            </a>
        </td>
	</tr>
	<tr>
        <td>
            <a href="https://docs.authing.cn/v2/reference/guard/v2/vue.html" _target="blank">
                将 Guard 接入到 Vue 项目
            </a>
        </td>
	</tr>
	<tr>
        <td>
            <a href="https://docs.authing.cn/v2/reference/guard/v2/angular.html" _target="blank">
                将 Guard 接入到 Angular 项目
            </a>
        </td>
	</tr>
    <tr>
        <td>
            <a href="https://docs.authing.cn/v2/reference/guard/v2/native-javascript.html" _target="blank">
            将 Guard 接入到原生 JS 项目
            </a>
        </td>
    </tr>
</table>

Authing Guard 是 Authing 身份认证和用户管理能力的入口，在为你的应用接入 Authing Guard 后，你的应用将能够使用 Authing 开放的各种认证相关能力，包括但不限于：

## 丰富多样的认证方式

- [账号密码认证](/guides/authentication/basic/password/)
- [短信验证码认证](/guides/authentication/basic/sms/)
- [连接外部身份源认证](/guides/connections/)（[社交账号登录](/guides/authentication/social/)、[企业账号登录](/guides/connections/enterprise.html)）
- [自建 APP 扫码认证](/guides/authentication/qrcode/use-self-build-app/)
- [手机号一键登录](/guides/oneauth/)
- [单点登录 SSO](/reference/sdk-for-sso-spa.html)
- [多因素认证 MFA](/guides/security/mfa/README.md)

## 所有主流认证协议

- [JWT](/concepts/jwt-token.html)
- [OIDC、OAuth2.0](/concepts/oidc/oidc-overview.html)
- [SAML](/concepts/saml/saml-overview.html)
- [LDAP](/guides/org/ldap-user-directory/)

## [**自定义登录框样式**](/guides/authentication/branding/#样式配置)

- 可视化配置界面
- 自定义加载图标和背景
- 登录框内部组件布局
- 自定义 CSS

## [**登录相关的辅助能力**](/guides/authentication/branding/#功能配置)

- 忘记密码时用户可重置密码
- 登录注册协议
- 登录注册信息补全

## 获取帮助

请访问 [Authing 论坛](https://forum.authing.cn/)。
