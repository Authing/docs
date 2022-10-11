# 返回码对照表

<LastUpdated/>

API 错误码列表请参阅：[错误代码](https://docs.authing.cn/v2/reference/error-code.html)

以下几种为 iOS SDK 特有错误码：

| apiCode | message | 说明 | 建议 |
| :----: | :---- | :---- | :---- |
|10001|Network error|网络请求错误，当手机无网络时或网络请求异常时返回此错误。|检查手机是否有网络信号，或切换网络环境重试。|
|10002|Config not found|获取 Public config 失败，当获取不到 Authing 控制台应用配置时返回此错误。|确认 Authing 控制台是否按文档要求进行配置，并查看打印台详细报错。|
|10003|Login failed|登录失败，当获取不到用户时返回此错误。|确认当前账号已登录成功并且本地有 User 对象。|
|10004|JSON parse failed|JSON 解析失败，当调用网络请求时返回 JSON 为空或 JSON 格式错误返回此错误。|查看打印台详细报错，定位具体错误 API 或 URL。|
|10005|Social login failed|易盾一键登录授权失败时，返回此错误。|查看打印台易盾详细报错，易盾返回码对照表请查看：https://support.dun.163.com/documents/287305921855672320?docId=314946816851496960 。|
