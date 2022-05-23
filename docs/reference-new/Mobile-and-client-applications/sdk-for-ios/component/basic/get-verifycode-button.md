# GetVerifyCodeButton

<LastUpdated/>

此组件将给指定电话号码发送短信验证码。电话号码获取优先级如下：

PhoneNumberTextField 内容 -> AccountTextField 内容 -> 存在于 AuthFlow 中的帐号信息

发送短信验证码时，此组件会处于禁用状态并自动播放加载动画

## 示例

<img src="./../images/getverifycodebutton1.png" alt="drawing" width="300"/>
<img src="./../gif/getverifycode.gif" alt="drawing" width="300"/>

## 属性

| 属性名                     | 类型 | 说明 | 默认值 |
| ----------------------- |:--------:| :------:| :-----: |
|  loadingColor     |    UIColor    |   点击后，旋转动画的颜色   |    Authing 主题蓝色   |
|  loadingLocation     |    Int    |   旋转动画的位置。0 表示在文字左边旋转；1 表示在文字上方旋转   |    1   |

## 创建

放置一个 TextField，并将其类型改为 GetVerifyCodeButton

![](./../images/getverifycodebutton2.png)
