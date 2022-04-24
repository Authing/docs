---
noToc: true
lastUpdated: true
sidebarType: page
noPageNav: true
downloadDemo:
  title: 本页资源
  description: 下载一个 React 快速开始的示例程序或在 GitHub 查看。
  downloadUrl: https://github.com/Authing/spa-demo-react/archive/refs/heads/master.zip
  jumpUrl: https://github.com/Authing/spa-demo-react
---

# React 快速开始

你可以使用 Authing 快速为新开发的或已有的 React 应用集成**认证能力**。本教程讲述如何使用 Authing SDK 为你的 React 应用添加认证能力。

系统要求：React 16+

> 如果您只需登录组件，可参考 [**登录组件文档**](https://docs.authing.cn/v2/reference/guard/react.html)

## 配置 Authing

你需要先在 Authing 创建一个应用。进入[**控制台**](https://console.authing.cn) > **应用**，点击右上角的「添加应用」。

![](~@imagesZhCn/quickstarts/create-app.png)

**认证地址**填写一个域名，作为这个应用在 Authing 的唯一标识，**回调链接**填写：`http://localhost:4000/callback`

![](~@imagesZhCn/quickstarts/spa/create-app-2.png)

在应用列表找到你的应用，进入**应用详情**。在「高级配置」选项卡中的「安全性」卡片，**id_token 签名算法**选择 **RS256**，然后点击「保存」。

![](~@imagesZhCn/quickstarts/spa/set-app.png)

在「安全性」卡片中，配置**换取 token 身份验证方式**、**检验 token 身份验证方式**、**撤回 token 身份验证方式**为 **none**。

![](~@imagesZhCn/quickstarts/spa/set-auth-method.png)

### 配置登录回调地址

当用户在 Authing 完成认证后，Authing 会将用户重定向到回调地址。必须在这里配置回调地址白名单，否则用户会遇到回调地址不匹配的错误信息。本教程需要用到的回调地址是 `http://localhost:4000/callback` 请在**登录回调地址**中粘贴此链接。

![](~@imagesZhCn/quickstarts/spa/set-url.png)

### 配置登出回调地址

当用户在 Authing 完成退出后，Authing 会将用户重定向到登出回调地址。**必须在这里配置登出回调地址白名单**，否则用户会遇到登出回调地址不匹配的错误信息。本教程需要用到的回调地址是 `http://localhost:4000` 请在**登出回调地址**中粘贴此链接。

![](~@imagesZhCn/quickstarts/spa/set-url.png)

### 记录应用信息

记录以下信息：

- 应用 ID
- 应用密钥
- 应用域名

![](~@imagesZhCn/quickstarts/save-app-info.png)

## 集成 Authing

### 修改 Demo 配置

如果你下载了[示例 Demo 代码](https://github.com/Authing/spa-demo-react)，需要修改 src/App.js 第 11 行，修改配置为你的应用配置。

```js
const authing = new AuthenticationClient({
	appId: 'APP_ID',
	appHost: 'https://{你的域名}.authing.cn',
	redirectUri: 'http://localhost:4000/callback'
});
```

然后运行：

```bash
$ npm install
$ npm start
```

### 安装 SDK

在你的应用项目中安装 authing-js-sdk 包。然后初始化一个 SDK 实例。

```bash
$ npm install authing-js-sdk
```

```js
const { AuthenticationClient } = require('authing-js-sdk');
const authing = new AuthenticationClient({
	appId: 'APP_ID',
	appHost: 'https://{你的域名}.authing.cn',
	redirectUri: 'http://localhost:4000/callback',
	tokenEndPointAuthMethod: 'none'
});
```

Authing JS SDK 接收以下参数：

- appId，应用 ID，可以在应用详情页面获得。
- appHost：应用认证地址，将`{应用域名}`替换为你的应用实际的域名。
- redirectUri：应用回调地址，在 Authing 完成认证后跳回的地址。必须在控制台回调地址白名单提前配置，**随意填写一定会报错！**
- tokenEndPointAuthMethod：token 端点身份验证方式，可选值为 `client_secret_post`、`client_secret_basic`、`none`，默认为 `client_secret_post`。SPA 场景填 `none`。

### 发起登录

Authing SDK 能够让你快速集成登录到 React 应用。你需要生成一个 **code_verifier 值**和它的**摘要值**，将 **code_verifier** 保存，而将其**摘要值**填入 buildAuthorizeUrl 来构建登录链接。然后在登录按钮点击时将浏览器重定向到该地址，让用户在 Authing 托管的登录页完成认证。登录成功后，Authing 会将用户重定向回你的应用。

```js
const { AuthenticationClient } = require('authing-js-sdk');
const authing = new AuthenticationClient({
	appId: 'APP_ID',
	appHost: 'https://{你的域名}.authing.cn',
	redirectUri: 'http://localhost:4000/callback'
});

function LoginBtn() {
	return (
		<button
			onClick={() => {
				// PKCE 场景使用示例
				// 生成一个 code_verifier
				let codeChallenge = authing.generateCodeChallenge();
				localStorage.setItem('codeChallenge', codeChallenge);
				// 计算 code_verifier 的 SHA256 摘要
				let codeChallengeDigest = authing.getCodeChallengeDigest({ codeChallenge, method: 'S256' });
				// 构造 OIDC 授权码 + PKCE 模式登录 URL
				let url = authing.buildAuthorizeUrl({ codeChallenge: codeChallengeDigest, codeChallengeMethod: 'S256' });
				window.location.href = url;
			}}
		>
			登录
		</button>
	);
}
```

### 处理回调

用户在 Authing 完成认证后，会回调到业务应用。我们需要从 **query** 中取出 **code**，从 localStorage 中取出发起登录时的 code_verifier，然后调用 getAccessTokenByCode 函数，**获取 Access token**。之后使用 Access token 调用 getUserInfoByAccessToken 函数，**获取用户信息**。最后跳转到应用的其他页面。

```js
function HandleCallback() {
	let location = useLocation();
	let query = new URLSearchParams(location.search);
	let code = query.get('code');
	let codeChallenge = localStorage.getItem('codeChallenge');
	let history = useHistory();
	useEffect(() => {
		(async () => {
			let tokenSet = await authing.getAccessTokenByCode(code, { codeVerifier: codeChallenge });
			const { access_token, id_token } = tokenSet;
			let userInfo = await authing.getUserInfoByAccessToken(tokenSet.access_token);
			localStorage.setItem('accessToken', access_token);
			localStorage.setItem('idToken', id_token);
			localStorage.setItem('userInfo', JSON.stringify(userInfo));
			history.push('/');
		})();
	});
	return <div>加载中...</div>;
}
```

### 展示用户信息

我们可以使用以下组件根据登录状态展示用户信息。

```js
function HomePage() {
	const [isAuthenticated, setIsAuthenticated] = useState();
	useEffect(() => {
		let userInfo = localStorage.getItem('userInfo');
		setIsAuthenticated(!!userInfo);
	}, []);
	return (
		<div className="App">
			{isAuthenticated ? <LogoutBtn /> : <LoginBtn />}
			<div>
				<div>用户信息：</div>
				<Profile />
			</div>
		</div>
	);
}
function Profile() {
	let userInfo = localStorage.getItem('userInfo');
	return userInfo ?? '无';
}
```

### 用户登出

使用 buildLogoutUrl 方法构造登出地址，需要传入当前登出用户的 **Id token** 和**登出回调地址**，登出回调地址**必须配置**在控制台的应用登出回调白名单中，**随意填写一定会报错！**

```js
function LogoutBtn() {
	return (
		<button
			onClick={() => {
				let idToken = localStorage.getItem('idToken');
				localStorage.clear();
				let url = authing.buildLogoutUrl({ expert: true, redirectUri: 'http://localhost:4000', idToken });
				window.location.href = url;
			}}
		>
			登出
		</button>
	);
}
```

## 调用资源 API

接下来讲述如何从 React 应用**请求外部资源服务器的 API**。

> 如果你跟随之前的步骤为你的 React 应用集成了认证功能，需要先**登出**，我们需要一个新的 Access token。

### 搭建服务端 API

首先需要搭建服务端 API 接口，供 React 应用调用。本教程我们使用一个现成的 API Server。

克隆 API Server 仓库：

```bash
$ git clone https://github.com/Authing/m2m-demo-express.git
```

进入项目目录，安装依赖：

```bash
$ npm install
```

在 app.js 第 12 行，修改配置为你的应用配置：

```js
// 授权中间件，Access token 必须存在，并且能被 Authing 应用公钥验签
const checkJwt = jwt({
	// 从 Authing 应用服务发现地址动态获取验签公钥
	secret: jwksRsa.expressJwtSecret({
		cache: true,
		rateLimit: true,
		jwksRequestsPerMinute: 5,
		jwksUri: `https://{应用域名}.authing.cn/oidc/.well-known/jwks.json`
	}),

	// 验证受众和颁发者
	audience: 'APP_ID',
	issuer: [`https://{应用域名}.authing.cn/oidc`],
	algorithms: ['RS256']
});
```

启动 API Server：

```bash
$ npm start
```

详情参考[文档](/quickstarts/apiServer/nodeJsExpress)。

### 设置资源权限

为了获取一个具备资源权限的 Access token，首先需要在 Authing 定义**谁具备什么资源的什么权限**。

#### 创建一个用户

在**用户管理** > **用户列表**，点击右侧的「创建」按钮。

创建一个测试用户。

![](~@imagesZhCn/quickstarts/spa/create-user.png)

#### 创建资源

在应用详情页面，点击「授权」选项卡，在「API 资源」卡片点击添加。

![](~@imagesZhCn/quickstarts/apiServer/create-resource-1.png)

填写资源名称：order，资源描述：订单，API 接口的 URL 地址：`http://localhost:5000/api/protected`，为资源定义一个**操作**，本教程为**订单资源**定义一个**读取操作**，点击添加操作，操作类型填 `read`，描述填读取订单。最后点击保存。

![](~@imagesZhCn/quickstarts/apiServer/create-resource-2.png)

#### 资源授权

在「资源授权」选项卡，点击添加。

![](~@imagesZhCn/quickstarts/spa/resource-acl.png)

**被授权主体类型**选择**用户**，**被授权主体**搜索刚才创建的测试用户，**授权作用**选择允许，**资源类型**选择刚刚定义的订单资源，**资源标识符**保留默认，**操作**选择特定操作，选择读取订单操作。最后点击确定。

![](~@imagesZhCn/quickstarts/spa/resource-authz-1.png)

![](~@imagesZhCn/quickstarts/spa/resource-authz-2.png)

### 发起认证授权

Authing SDK 能够让你快速集成登录到 React 应用。你需要生成一个 **code_verifier 值**和它的**摘要值**，将 code_verifier 保存，而将其摘要值填入 buildAuthorizeUrl 来构建登录链接。除此之外，还需要指定 **scope 授权范围**，请求相应的资源权限。然后在登录按钮点击时将浏览器重定向到该地址，让用户在 Authing 托管的登录页完成认证。登录成功后，Authing 会将用户重定向回你的应用。

```js
const { AuthenticationClient } = require('authing-js-sdk');
const authing = new AuthenticationClient({
	appId: 'APP_ID',
	appHost: 'https://{应用域名}.authing.cn',
	redirectUri: 'http://localhost:4000/callback'
});

function LoginBtn() {
	return (
		<button
			onClick={() => {
				// PKCE 场景使用示例
				// 生成一个 code_verifier
				let codeChallenge = authing.generateCodeChallenge();
				localStorage.setItem('codeChallenge', codeChallenge);
				// 计算 code_verifier 的 SHA256 摘要
				let codeChallengeDigest = authing.getCodeChallengeDigest({ codeChallenge, method: 'S256' });
				// 构造 OIDC 授权码 + PKCE 模式登录 URL
				let url = authing.buildAuthorizeUrl({
					scope: 'openid email phone address order:read',
					codeChallenge: codeChallengeDigest,
					codeChallengeMethod: 'S256'
				});
				window.location.href = url;
			}}
		>
			登录
		</button>
	);
}
```

### 处理回调

用户在 Authing 完成认证后，会回调到业务应用。我们需要从 **query** 中取出 **code**，从 localStorage 中取出发起登录时的 code_verifier，然后调用 getAccessTokenByCode 函数，**获取 Access token**。之后使用 Access token 调用 getUserInfoByAccessToken 函数，**获取用户信息**。最后跳转到应用的其他页面。

```js
function HandleCallback() {
	let location = useLocation();
	let query = new URLSearchParams(location.search);
	let code = query.get('code');
	let codeChallenge = localStorage.getItem('codeChallenge');
	let history = useHistory();
	useEffect(() => {
		(async () => {
			let tokenSet = await authing.getAccessTokenByCode(code, { codeVerifier: codeChallenge });
			const { access_token, id_token } = tokenSet;
			let userInfo = await authing.getUserInfoByAccessToken(tokenSet.access_token);
			localStorage.setItem('accessToken', access_token);
			localStorage.setItem('idToken', id_token);
			localStorage.setItem('userInfo', JSON.stringify(userInfo));
			history.push('/');
		})();
	});
	return <div>加载中...</div>;
}
```

### 使用 Access token 调用资源 API

接下来我们在 React 应用中调用后端接口。你可以在**请求头中携带 Access token**，API 服务器会检查 Access token 合法性和具备的权限，然后返回数据。

```js
function ResourceBtn() {
	return (
		<button
			onClick={async () => {
				try {
					let accessToken = localStorage.getItem('accessToken');
					let res = await fetch('http://localhost:5000/api/protected', {
						headers: {
							Authorization: 'Bearer ' + accessToken
						},
						method: 'GET'
					});
					let data = await res.json();
					alert(JSON.stringify(data));
				} catch (err) {
					alert('无权访问接口');
				}
			}}
		>
			获取资源
		</button>
	);
}
```

> API 服务器 http://localhost:5000/api/protected 要求 order:read 权限 scope。

恭喜 🎉，到此你学会了在 React 单页应用中集成 Authing 认证授权，并调用外部的资源服务器接口。

## 接下来你可能需要

使用 Authing 保护 API 接口：
::: page-ref /quickstarts/apiServer/nodeJsExpress/
:::

学习资源、角色、权限管理内容：
::: page-ref /guides/access-control/
:::

自建应用 SSO 方案：
::: page-ref /guides/authentication/sso/
:::
