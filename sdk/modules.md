# 开始编写

----------

要开始 Authing SDK 的编写，需要先了解 Authing 的模块分布。

Authing 对外开放的有两大模块：

1. 用户模块（UserService）
2. OAuth 模块（OAuthService）

在请求这两个模块的方法时，建议初始化不同的 Graphql Client 进行数据交互。

## 用户模块

用户模块负责处理用户的注册／登录／权限验证等操作。

### 请求链接

``https://users.authing.cn/graphql``

### 请求方式

以 JavaScript 为例

``` javascript
...

this.UserService = new ApolloClient({
  	link: concat(authMiddleware, httpLink),
  	cache: new InMemoryCache()
});

...
```

## OAuth模块

OAuth 模块负责 OAuth 登录／注册等操作。

### 请求链接

``https://oauth.authing.cn/graphql``


### 请求方式

以JavaScript为例

``` javascript
...

this.OAuthService = new ApolloClient({
  	link: concat(authMiddleware, httpLink),
  	cache: new InMemoryCache()
});

...
```

## 程序流程

点击[这里](https://docs.authing.cn/#/quick_start/javascript)查看[JavaScript SDK](https://docs.authing.cn/#/quick_start/javascript)的使用方法，以体验流程。

括号内的为对应使用的模块

1. 认证 Client Id 和 Secret 是否合法(UserService);
2. 如果认证失败，则抛出错误;
3. 如果认证成功，则初始化 UserService 和 OAuthService;

## 需要的 Client 列表

建议在编写 SDK 时，初始化以下三个模块：

1. AuthService：用来认证 ClientId 和 Secret 是否正确，以及做一些应用所有者才有权限做的事情
2. UserService：用来处理当前登录/注册操作，以及当前用户有权限做的事情
3. OAuthService：用来处理 OAuth 登录/注册动作

## 其他规范和注意事项

1. 使用面向对象的编程方法，方法名称及参数参考文档：[用户接口](https://docs.authing.cn/#/user_service/user_service)
2. 写好单元测试，测试好每一个接口
3. 做好错误处理，边界检查
4. **Authing 的某些 GraphQL 查询需要发送不同的token，详情请看 [GraphQL 请求列表](https:///docs.authing.cn/#/sdk/gql)中的相关说明**
