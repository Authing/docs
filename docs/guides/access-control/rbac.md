# 集成 RBAC 权限模型到你的应用系统

<LastUpdated/>

[前面](./README.md#什么是基于角色的访问控制-rbac)我们介绍了什么是基于角色的访问控制（RBAC），接下来这篇文章介绍如何基于 {{$localeConfig.brandName}} 快速将 RBAC 权限模型集成到你的系统中。

首先了解一下 Authing 中的几个核心概念：

- 用户：你的终端用户；
- 角色：角色是一个逻辑集合，你可以授权一个角色某些操作权限，然后将角色授予给用户，该用户将会继承这个角色中的所有权限；
- 资源：你可以把你应用系统中的实体对象定义为资源，比如订单、商品、文档、书籍等等，每种资源都可以定义多个操作，比如文档有阅读、编辑、删除操作；
- 授权：把某类（个）资源的某些（个）操作授权给角色或者用户。

通过用户、角色、资源、授权的组合，就可以轻松直观地实现灵活、细粒度的权限模型。

## 创建角色

你可以使用 Authing 控制台创建角色：在**权限管理** - **角色管理**中，点击**添加角色**按钮：

- 角色 code: 该角色的唯一标志符，**权限分组内具有唯一性**，只允许包含英文字母、数字、下划线 \_、横线 -，这里我们填 `admin`。
- 角色描述：该角色的描述信息，这里我们填`管理员`。

创建好三个角色：

![](~@imagesZhCn/guides/access-control/5186f15e-b02a-4b7b-b886-a3f26f5f07c8.png)

你也可以使用 API & SDK 创建角色，详情请见[角色 Management SDK](/reference/sdk-for-node/management/RolesManagementClient.md)。

## 授权用户角色

在角色详情页面，你可以将此角色授权给用户。你可以通过用户名、手机号、邮箱、昵称搜索用户：

![](~@imagesZhCn/guides/access-control/Xnip2021-03-01_15-51-01.png)

选择用户之后点击确认，你可以查看被授权此角色的用户列表。

你也可以使用 API & SDK 给用户授予角色，详情请见[角色 Management SDK](/reference/sdk-for-node/management/RolesManagementClient.md)。

## 在后端通过用户角色控制权限

当用户成功认证、获取到 Token 之后，你可以解析到当前用户的 ID，接下来你可以使用我们提供的 API & SDK 在后端获取该用户被授予的角色，这里以 Node.js 为例：

> 这里以 Node SDK 为例，我们同时还支持 Python、Java、C#、PHP 等语言的 SDK，详情[请点击此](/reference/)。

首先获取用户的被授予的所有角色列表：

```javascript
import { ManagementClient } from 'authing-js-sdk'

const managementClient = new ManagementClient({
  userPoolId: 'YOUR_USERPOOL_ID',
  secret: 'YOUR_USERPOOL_SECRET',
})
const { totalCount, list } = await managementClient.users.listRoles('USER_ID')
```

得到用户的所有角色之后，我们可以判断该用户是否具备 `devops` 这个角色：

```javascript
if (!list.map((role) => role.code).includes('devops')) {
  throw new Error('无权限操作！')
}
```

## 创建资源

上一步我们通过用户是否具备某个角色来控制权限，这种权限控制还是比较粗粒度的，因为只判断了用户是否具备某个角色，而没有判断其是否具备某个特定的权限。Authing 在基于角色的访问控制模型（RBAC）的基础上，还能够围绕资源进行更细粒度的授权。

你可以把系统的一些对象抽象为资源，在这些资源上可以定义了一些操作。比如在本文的场景中，Repository、Tag、PR、Release Notes 都是资源，且这些资源都有对应的操作：

- Repository：创建、删除等。
- PR：开启、评论、合并等。
- Tag：创建、删除等。
- Release Notes：创建、阅读、编辑、删除等。

我们在 Authing 中创建这些资源：

![](~@imagesZhCn/guides/access-control/e23be4b2-0072-4989-bdf9-e0cc7c882397.png)

## 授权角色操作资源的权限

而且 Authing 还同时支持给用户、角色授权，如果用户在某个角色中，他也将继承这个角色被授权的权限。所以 Authing 既能够实现标准的 RBAC 权限模型，也能在这基础上进行更细粒度、更动态的权限控制。

比如下面这个例子中，我们给 admin 这个角色授权了 repository 资源的 Create 和 Delete 权限：

![](~@imagesZhCn/guides/access-control/0f443c28-85b5-4127-9177-0cdae41eb3c2.png)

## 在后端判断用户是否具备权限

在上一步我们通过资源授权，做到了授权给某个用户（角色）对某个特定资源的特定操作权限，我们在后端进行接口鉴权的时候，就可以做更细粒度的判断了：

> 这里以 Node SDK 为例，我们同时还支持 Python、Java、C#、PHP 等语言的 SDK，详情[请点击此](/reference/)。

调用 `managementClient.acl.isAllowed` 方法，参数分别为：

- userId: 用户 ID，用户可以被直接授权特定资源的操作，也可以继承角色被授权的权限。
- resource: 资源标志符，如 `repository:123` 表示 ID 为 123 的代码仓库，`repository:*` 表示代码仓库这一类资源。
- action: 特定操作，如 `repository:Delete` 表示删除代码仓库这个操作。
- options: 其他选项，可选
  - options.namespace，资源所属权限分组 code

```javascript
import { ManagementClient } from 'authing-js-sdk'

const managementClient = new ManagementClient({
  userPoolId: 'YOUR_USERPOOL_ID',
  secret: 'YOUR_USERPOOL_SECRET',
})
const { totalCount, list } = await managementClient.acl.isAllowed(
  'USER_ID',
  'repository:123',
  'repository:Delete'
)
```

Authing 策略引擎会根据你配置的权限策略，动态执行策略，最后返回 true 或者 false，你只需要根据返回值就能判断用户是否具备操作权限。

## 接下来

你可以了解如何[基于 ABAC 权限模型对用户进行授权](./abac.md)。
