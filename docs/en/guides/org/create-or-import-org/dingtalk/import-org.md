#### 创建钉钉应用

1. 你需要先 [钉钉开放平台](https://open.dingtalk.com/) 注册一个 **具备通讯录权限** 的企业内部应用，如下图所示：

![](https://cdn.authing.cn/blog/20201019214932.png)

选择开发模式为企业自助开发：

<img src="https://cdn.authing.cn/blog/20201019214944.png" height="400px">

在权限管理页面，添加通讯录相关的所有权限：

![](https://cdn.authing.cn/blog/20201019214954.png)

![](https://cdn.authing.cn/blog/20201019215001.png)

#### 配置服务器出口 IP

在此填入你的服务器出口 IP 地址：

![](https://cdn.authing.cn/blog/20201019215016.png)

由于钉钉平台限制，同一个 IP 只能被一个企业 Use ，所以你需要在**服务器出口 IP 对应的服务器**上部署一个具备 https 转发能力的代理，{{$localeConfig.brandName}} 会通过这个代理与钉钉服务器进行通信 。你可以 Use [goproxy](https://github.com/snail007/goproxy/blob/master/README_ZH.md) 等开源代理方案，或者购买匿名代理 IP。如果你不知道怎么部署，请见：

::: page-ref /guides/faqs/how-to-build-a-proxy.md
:::

#### 在 {{$localeConfig.brandName}} 控制台配置

在**连接身份源** - **企业身份源**页面找到**钉钉通讯录**：

![](https://cdn.authing.cn/blog/20201019215241.png)

在此你需要填入以下信息：

- 企业 ID（CorpId）
- 钉钉应用的 AppKey
- 钉钉应用的 AppSecret
- 服务器出口代理

![](https://cdn.authing.cn/blog/20201019215306.png)

![](https://cdn.authing.cn/blog/20201019215311.png)

请确保应用 ID 和密钥无误，以及代理可用，否则可能会遇到下面这种提示：

![](https://cdn.authing.cn/blog/20201019215321.png)

#### 首次全量同步

成功配置之后，你就可以将钉钉企业通讯录里面的组织结构和用户导入到 {{$localeConfig.brandName}} 组织机构了。下面我们会以北京非凡科技有限公司（虚拟，下文简称非凡公司）为例：

这是非凡公司最开始的组织架构，一共有三个部门，4 名员工：

<img src="https://cdn.authing.cn/blog/20201019215342.png" height="400px">

在 {{$localeConfig.brandName}} 控制台用户管理 - 组织架构页面点击右上角的 导入组织机构 - 从钉钉导入：

![](https://cdn.authing.cn/blog/20201019215351.png)

一小段时间之后，钉钉的组织机构将会被导入 {{$localeConfig.brandName}} 组织机构：

![](https://cdn.authing.cn/blog/20201019215400.png)

你可以在同步历史记录页面查看进度：

![](https://cdn.authing.cn/blog/20201019215409.png)

#### 从钉钉增量同步到 {{$localeConfig.brandName}} 组织机构

#### 同步组织结构的变动

##### 添加部门

在这里添加了一个法务部门：

![](https://cdn.authing.cn/blog/20201019215430.png)

可以看到其被马上同步到了 {{$localeConfig.brandName}} 的组织机构:

![](https://cdn.authing.cn/blog/20201019215440.png)

在商业化部门下面添加一个大中华区部门：

![](https://cdn.authing.cn/blog/20201019215453.png)

一段时间之后他也被同步到了 {{$localeConfig.brandName}} 组织机构：

![](https://cdn.authing.cn/blog/20201019215512.png)

##### 删除部门

将法务部门删除：

![](https://cdn.authing.cn/blog/20201019215532.png)

其在 {{$localeConfig.brandName}} 组织机构中也被删除了：

![](https://cdn.authing.cn/blog/20201019215541.png)

##### 修改部门

这里把**研发**部门改名为**产研**：

![](https://cdn.authing.cn/blog/20201019215606.png)

可以看到也成功更新了：

![](https://cdn.authing.cn/blog/20201019215615.png)

#### 同步人员的变动

##### 添加成员

在运营部门下面添加一名新成员：

![](https://cdn.authing.cn/blog/20201019215633.png)

![](https://cdn.authing.cn/blog/20201019215639.png)

##### 删除成员

将刚刚添加的成员删除：

![](https://cdn.authing.cn/blog/20201019215653.png)

![](https://cdn.authing.cn/blog/20201019215700.png)

##### 修改成员信息

修改小红的姓名为小红红：

![](https://cdn.authing.cn/blog/20201019215713.png)

![](https://cdn.authing.cn/blog/20201019215719.png)

#### 查看同步历史记录

你可以点击**导入组织机构** - **查看导入历史**在**同步历史记录**页面查看进度：

![](https://cdn.authing.cn/blog/20201019215747.png)

如果同步失败，你可以在此看到详细的错误日志：

![](https://cdn.authing.cn/blog/20201019215801.png)

![](https://cdn.authing.cn/blog/20201019215806.png)
