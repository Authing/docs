# Error code

<LastUpdated/>

See the API error code list：[Error code](https://docs.authing.cn/v2/en/reference/error-code.html)

| Code | 说明                                                         |
| :--: | :----------------------------------------------------------- |
| 1636 | Skip to mfa validation                                       |
| 1639 | The password must be reset upon the first login              |
| 1640 | Wechat account login query binding, only allowed to bind the existing account |
| 1641 | Wechat account login query binding, allowed to bind existing accounts, or create a new account |
| 2921 | Wechat account login query binding, multiple account selection after binding |

The following error codes are unique to the Android SDK：

| Code  | Message                                             | description                                                  | suggestion                                                   |
| :---: | :-------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| 10001 | Network error                                       | Network request error. This error is returned when the mobile phone is not connected or the network request is abnormal. | Check whether the phone has a network signal, or switch the network environment and try again. |
| 10002 | Config not found                                    | Failed to obtain the Public config. This error is returned if the Authing console application configuration cannot be obtained. | Check whether the Authing console is configured according to the document requirements, and check the error information displayed on the printing table. |
| 10003 | Login failed                                        | Login failed. This error is returned when the user cannot be obtained. | Ensure that you have logged in successfully with the current account and that the User object exists locally. |
| 10004 | JSON parse failed                                   | JSON parsing failed. This error is returned if null JSON or incorrect JSON format is returned when a network request is called. | View the printing table for detailed error, locate the specific error API or URL. |
| 10005 | OnClick auth failed                                 | This error is returned when one-click login authorization fails. | Check the printing table easy shield detailed error, easy shield return code comparison table please see:[易盾返回码（包括电信、联通、移动-iOS、移动-Android）](https://support.dun.163.com/documents/287305921855672320?docId=314946816851496960) 。 |
| 10006 | OnClick login cancelled                             | This error is displayed when the one-click login authorization is cancelled. |                                                              |
| 10007 | Alipay auth failed                                  | This error is returned when Alipay login authorization fails. |                                                              |
| 10008 | SMS already send within the last 60 seconds         | This error is returned when the SMS verification code is frequently sent. |                                                              |
| 10009 | Upload avatar failed                                | This error is returned when updating the avatar fails.       | Check the printing table for detailed error and locate the specific cause. |
| 10010 | Login by FaceBook canceled/Login by FaceBook failed | Login by FaceBook canceled or Login by FaceBook failed       |                                                              |
| 10011 |                                                     | Login by WebAuthn canceled or Login by WebAuthn failed       |                                                              |
| 10012 | Login by Weibo canceled/Login by Weibo failed       | Login by Weibo canceled or Login by Weibo failed             |                                                              |
| 10013 | Login by QQ canceled/Login by QQ failed             | Login by QQ canceled or Login by QQ failed                   |                                                              |
| 10014 | Login by Baidu canceled/Login by Baidu failed       | Login by Baidu canceled or Login by Baidu failed             |                                                              |
| 10015 | Login by Linkedin canceled/Login by Linkedin failed | Login by Linkedin canceled or Login by Linkedin failed       |                                                              |
| 10016 | Login by DingTalk canceled/Login by DingTalk failed | Login by DingTalk canceled or Login by DingTalk failed       |                                                              |
| 10017 | Login by Douyin canceled/Login by Douyin failed     | Login by Douyin canceled or Login by DingTalk failed         |                                                              |
| 10018 | Login by Github canceled/Login by Github failed     | Login by Github canceled or Login by Github failed           |                                                              |
| 10019 | Login by Gitee canceled/Login by Gitee failed       | Login by Gitee canceled or Login by Gitee failed             |                                                              |
| 10020 | Login by GitLab canceled/Login by GitLab failed     | Login by GitLab canceled or Login by GitLab failed           |                                                              |
| 10021 | Login by Xiaomi canceled/Login by Xiaomi failed     | Login by Xiaomi canceled or Login by Xiaomi failed           |                                                              |
| 10022 | Login by Kuaishou canceled/Login by Kuaishou failed | Login by Kuaishou canceled or Login by Kuaishou failed       |                                                              |
| 10023 | Login by Line canceled/Login by Line failed         | Login by Line canceled or Login by Line failed               |                                                              |
| 10024 | Login by Slack canceled/Login by Slack failed       | Login by Slack canceled or Login by Slack failed             |                                                              |
| 10025 | Login by Huawei canceled/Login by Huawei failed     | Login by Huawei canceled or Login by Huawei failed           |                                                              |
| 10027 | Login by OPPO canceled/Login by OPPO failed         | Login by OPPO canceled or Login by OPPO failed               |                                                              |
| 10028 | Login by Amazon canceled/Login by Amazon failed     | Login by Amazon canceled or Login by Amazon failed           |                                                              |
