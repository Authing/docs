# 获取应用配置信息和权限

<LastUpdated/>

<<<<<<< HEAD
为了保证 **数据安全**，在进行数据同步时，上下游身份源会对 Authing 发出的请求进行识别和鉴权。如果无法识别身份或者不具备数据操作的权限，则会拒绝请求。因此在数据同步之前，Authing 需要拿到上下游身份源颁发的令牌，该令牌用于身份认证和权限鉴定。令牌获取步骤如下：
=======
为了保证 **数据安全**，在进行数据同步时，上下游身份源会对 {{$localeConfig.brandName}} 发出的请求进行识别和鉴权。如果无法识别身份或者不具备数据操作的权限，则会拒绝请求。因此在数据同步之前，{{$localeConfig.brandName}} 需要拿到上下游身份源颁发的令牌，该令牌用于身份认证和权限鉴定。令牌获取步骤如下：
>>>>>>> ba53c2dd0bf518dbfa90efa3ac5d7ac5dfcd8126

## 第一步 获取配置信息

在上下游身份源后台管理页面或售后拿到 **配置信息** 所需的数据。

<<<<<<< HEAD
本章节将针对各类上下游应用介绍如何获取应用配置项和权限。

### 获取飞书配置项和权限

#### 获取飞书配置项

1. 进入[飞书开放平台](https://open.feishu.cn/)，打开 **开发者后台**。

2. 创建一个**企业自建应用**。</br>![](../../images/feishu-dev-background.png)</br>a. 选择 **企业自建应用** 选项。</br>b. 自定义 **应用名称** 和 **应用描述**。</br>
c. 点击 **确定创建** 按钮。</br>

3. 获取 **App ID**、**App Secret** 和 **Encrypt Key**、**Verification Token**（后两者用于实时同步）。</br>![](../../images/feishu-acquire-config-info.png)</br>a. 在 **企业自建应用** 列表单击刚创建的自建应用，进入应用详情页。</br>b. 点击左侧导航栏 **凭证与基础信息** 菜单获取 **App ID** 和 **App Secret**。c. 点击导航栏 **事件订阅** 菜单获取 **Encrypt Key** 和 **Verification Token**（本步骤仅适用于实时同步）。</br>::: hint-info​
对于非实时同步，执行步骤 4；否则，执行步骤 5。
:::

4. 将 **App ID** 和 **App Secret** 填入 Authing 控制台在建同步任务的 **配置信息** 模块，然后执行步骤 6。
   
5. 对于实时同步，将 **App ID**、**App Secret**、**Encrypt Key** 和 **Verification Token** 填入同步任务 **配置信息** 模块。</br>::: hint-info​
如果飞书开放平台 **事件订阅** 处显示 **Encrypt Key** 未开启，点击重置按钮生成新值，或者点击编辑按钮自定义。</br>需要注意的是，重置 **Encrypt Key**，则现有值会失效，可能影响部分功能。</br>如果飞书开放平台 **事件订阅** 处显示 **Encrypt Key** 未开启，点击重置按钮生成新值，或者点击编辑按钮自定义。需要注意的是，重置 **Encrypt Key**，则现有值会失效，可能影响部分功能。![](../../images/encrypt-key.png)
:::

6. 点击 **连接测试** 按钮。</br>提示检验成功。

#### 配置飞书权限

要配置飞书权限，执行以下步骤：

1. 配置 **事件订阅请求网址 URL**。</br>
a. 在获取应用配置信息后，需要 [配置用户同步字段映射](/docs/guides/sync-new/create-sync-new/field-mapping-new.md)、[配置同步时机](/docs/guides/sync-new/create-sync-new/sync-type-new.md) 及 [配置同步策略](/docs/guides/sync-new/create-sync-new/sync-policy-new.md)，点击 **创建**。</br>
b. 重新进入配置详情页，Authing 会在 **配置信息** 模块自动生成一个回调地址，该地址用于接收飞书事件。拷贝该 URL。</br>
c. 将该地址填入飞书开发平台应用详情页 **事件订阅** 的 **请求地址配置**，点击 **保存**。

2. 添加需要监听的事件。</br>
a. 在飞书应用详情 **事件订阅->已添加事件** 点击右上角 **添加事件** 按钮。</br>
b. 勾选以下事件并点击 **确认添加**：</br>
   - 用户状态变更</br>
   - 部门新建</br>
   - 部门被删除</br>
   - 部门信息变化</br>
   - 通讯录范围权限被更新</br>
   - 员工入职</br>
   - 员工离职</br>
   - 员工信息变化</br>
   - 用户组被创建</br>
   - 用户组被删除</br>
   - 用户组信息变化</br>

3. 设置权限。</br>
a. 在飞书应用详情的 **权限管理** 页面，选择该应用所需的权限，如：</br>
   - 获取用户邮箱
   - 获取用户手机号
   - 获取用户 userid
   - 通过手机号或者邮箱获取用户 ID
   - 获取用户基本信息
   - 获取用户统一 ID
   - 以应用身份访问通讯录

   b. 设置 **权限范围** 为 **全部成员**。</br>![](../../images/privilege-management.png)</br>
   c. 设置权限之后，如果有 **需审核权限**，你需要发布最新版本。</br>
   ::: hint-info
* **免审权限** 开通即生效，无需发布版本。
* 创建新版本时，注意**可用范围**选择**所有员工**和通讯录权限保持一致。
:::

![](../../images/new-version.png)

### 获取企业微信配置项和权限
### 获取钉钉配置项和权限
### 获取纷享销客配置项和权限
### 获取其他应用配置项和权限

## 第二步 申请身份源

Authing 对上下游身份源发出申请并携带配置项数据。

## 第三步 验证配置信息

上下游身份源对配置项数据进行验证，然后颁发令牌给 Authing。

## 第四步 测试令牌的有效性

::: hint-info​
Authing 同步中心的 **测试连通** 功能只能检测令牌的有效性，无法确定令牌是否具有读写上下游身份源数据的权限。因此需要在上下游身份源的后台管理页面开通相应权限，比如上游同步需要通讯录读权限，下游同步需要通讯录读权限和写权限。
:::
=======
本章节将针对各类上下游应用介绍如何获取应用配置项和权限：

* [获取飞书配置项和权限](/guides/sync-new/create-sync-new/get-config-new/feishu.md)<br/>
* [获取企业微信配置项和权限](/guides/sync-new/create-sync-new/get-config-new/wechatwork.md)<br/>
* [获取钉钉配置项和权限](/guides/sync-new/create-sync-new/get-config-new/dingding.md)<br/>
* [获取纷享销客配置项和权限](/guides/sync-new/create-sync-new/get-config-new/fxiaoke.md)<br/>
* [获取其他应用配置项和权限](/guides/sync-new/create-sync-new/get-config-new/others.md)<br/>

## 第二步 申请身份源

{{$localeConfig.brandName}} 对上下游身份源发出申请并携带配置项数据。

## 第三步 验证配置信息

上下游身份源对配置项数据进行验证，然后颁发令牌给 {{$localeConfig.brandName}}。

## 第四步 测试令牌的有效性

::: hint-info
{{$localeConfig.brandName}} 同步中心的 **测试连通** 功能只能检测令牌的有效性，无法确定令牌是否具有读写上下游身份源数据的权限。因此需要在上下游身份源的后台管理页面开通相应权限，比如上游同步需要通讯录读权限，下游同步需要通讯录读权限和写权限。
:::

>>>>>>> ba53c2dd0bf518dbfa90efa3ac5d7ac5dfcd8126
