# 获取应用配置信息和权限

<LastUpdated/>

为了保证 **数据安全**，在进行数据同步时，上下游身份源会对 Authing 发出的请求进行识别和鉴权。如果无法识别身份或者不具备数据操作的权限，则会拒绝请求。因此在数据同步之前，Authing 需要拿到上下游身份源颁发的令牌，该令牌用于身份认证和权限鉴定。令牌获取步骤如下：

## 第一步 获取配置信息

在上下游身份源后台管理页面或售后拿到 **配置信息** 所需的数据。

本章节将针对各类上下游应用介绍如何获取应用配置项和权限：

* [获取飞书配置项和权限](/guides/sync-new/create-sync-new/get-config-new/feishu.md)<br/>
* [获取企业微信配置项和权限](/guides/sync-new/create-sync-new/get-config-new/wechatwork.md)<br/>
* [获取钉钉配置项和权限](/guides/sync-new/create-sync-new/get-config-new/dingding.md)<br/>
* [获取纷享销客配置项和权限](/guides/sync-new/create-sync-new/get-config-new/fxiaoke.md)<br/>
* [获取其他应用配置项和权限](/guides/sync-new/create-sync-new/get-config-new/others.md)<br/>

## 第二步 申请身份源

Authing 对上下游身份源发出申请并携带配置项数据。

## 第三步 验证配置信息

上下游身份源对配置项数据进行验证，然后颁发令牌给 Authing。

## 第四步 测试令牌的有效性

::: hint-info​
Authing 同步中心的 **测试连通** 功能只能检测令牌的有效性，无法确定令牌是否具有读写上下游身份源数据的权限。因此需要在上下游身份源的后台管理页面开通相应权限，比如上游同步需要通讯录读权限，下游同步需要通讯录读权限和写权限。
:::
