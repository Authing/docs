# 返回码对照表

<LastUpdated/>

API 错误码列表请参阅：[错误代码](https://docs.authing.cn/v2/reference/error-code.html)

| Code | 说明                                                   |
| :--: | :----------------------------------------------------- |
| 1636 | 跳转去 mfa 验证                                        |
| 1639 | 首次登录需要重置密码                                   |
| 1640 | 微信账号登录询问绑定，只允许绑定已有账号               |
| 1641 | 微信账号登录询问绑定，允许绑定已有账号，或者创建新账号 |
| 2921 | 微信账号登录询问绑定，多账号选择后绑定                 |

以下几种为 Android SDK 特有错误码：

| Code  | Message                                             | 说明                                                         | 建议                                                         |
| :---: | :-------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| 10001 | Network error                                       | 网络请求错误，当手机无网络、网络请求异常时返回此错误。       | 检查手机是否有网络信号，或切换网络环境重试。                 |
| 10002 | Config not found                                    | 获取 Public config 失败，当获取不到 Authing 控制台应用配置时，返回此错误。 | 确认 Authing 控制台是否按文档要求进行配置，并查看打印台详细报错。 |
| 10003 | Login failed                                        | 登录失败，当获取不到用户时返回此错误。                       | 确认当前账号已登录成功并且本地有 User 对象。                 |
| 10004 | JSON parse failed                                   | JSON 解析失败，当调用网络请求时返回 JSON 为空或 JSON 格式错误时，返回此错误。 | 查看打印台详细报错，定位具体错误 API 或 URL。                |
| 10005 | OnClick auth failed                                 | 易盾一键登录授权失败时，返回此错误。                         | 查看打印台易盾详细报错，易盾返回码对照表请查看：[易盾返回码（包括电信、联通、移动-iOS、移动-Android）](https://support.dun.163.com/documents/287305921855672320?docId=314946816851496960) 。 |
| 10006 | OnClick login cancelled                             | 易盾一键登录授权取消时，返回此错误。                         |                                                              |
| 10007 | Alipay auth failed                                  | 支付宝登录授权失败时，返回此错误。                           |                                                              |
| 10008 | 在 60 秒内已发送短信验证码                          | 短信验证码发送频繁时，返回此错误。                           |                                                              |
| 10009 | Upload avatar failed                                | 更新头像失败时，返回此错误。                                 | 查看打印台详细报错，定位具体原因。                           |
| 10010 | Login by FaceBook canceled/Login by FaceBook failed | Facebook登录取消或者失败                                     |                                                              |
| 10011 |                                                     | WebAuthn 登录取消或者失败                                    |                                                              |
| 10012 | Login by Weibo canceled/Login by Weibo failed       | 微博登录取消或者失败                                         |                                                              |
| 10013 | Login by QQ canceled/Login by QQ failed             | QQ 登录取消或者失败                                          |                                                              |
| 10014 | Login by Baidu canceled/Login by Baidu failed       | 百度登录取消或者失败                                         |                                                              |
| 10015 | Login by Linkedin canceled/Login by Linkedin failed | Linkedin 登录取消或者失败                                    |                                                              |
| 10016 | Login by DingTalk canceled/Login by DingTalk failed | 钉钉登录取消或者失败                                         |                                                              |
| 10017 | Login by Douyin canceled/Login by Douyin failed     | 抖音登录取消或者失败                                         |                                                              |
| 10018 | Login by Github canceled/Login by Github failed     | Github 登录取消或者失败                                      |                                                              |
| 10019 | Login by Gitee canceled/Login by Gitee failed       | Gitee 登录取消或者失败                                       |                                                              |
| 10020 | Login by GitLab canceled/Login by GitLab failed     | GitLab 登录取消或者失败                                      |                                                              |
| 10021 | Login by Xiaomi canceled/Login by Xiaomi failed     | 小米登录取消或者失败                                         |                                                              |
| 10022 | Login by Kuaishou canceled/Login by Kuaishou failed | 快手登录取消或者失败                                         |                                                              |
| 10023 | Login by Line canceled/Login by Line failed         | Line 登录取消或者失败                                        |                                                              |
| 10024 | Login by Slack canceled/Login by Slack failed       | Slack 登录取消或者失败                                       |                                                              |
| 10025 | Login by Huawei canceled/Login by Huawei failed     | 华为 登录取消或者失败                                        |                                                              |
| 10027 | Login by OPPO canceled/Login by OPPO failed         | OPPO 登录取消或者失败                                        |                                                              |
| 10028 | Login by Amazon canceled/Login by Amazon failed     | Amazon 登录取消或者失败                                      |                                                              |
