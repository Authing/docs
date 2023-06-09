# ASAD 表单代填接入教程
<LastUpdated/>

## 什么是 ASAD ？
{{$localeConfig.brandName}}  Secure Authentication for Desktop 是一项 Authing 开发的功能，可为不支持标准认证协议（OAuth2.0、OIDC、SAML、CAS）的外部桌面端应用程序提供单点登录 (SSO) 功能。<br>

管理员可以给用户分配应用账密。 Authing 将账密加密存储在数据库中。在用户访问被分配了账号密码的应用的登录界面时，Authing 会自动填充账号密码，并进行登录。最终用户只需登录 Authing，就可直接访问被分配的应用。

## 如何使用

### 自定义 ASAD 应用
在 Authing 应用市场找一个支持 ASAD 的应用，以下我们以「钉钉」为例进行演示。

![](~@imagesZhCn/guides/asad/1.png)
### 获取应用
点击进入详情，点击右上角「获取应用」

![](~@imagesZhCn/guides/asad/2.png)
### 填写基本配置
填写应用名称，点击「下一步」

![](~@imagesZhCn/guides/asad/3.png)

### 填写登录配置

![](~@imagesZhCn/guides/asad/4.png)
填写如下配置信息，然后点击「完成」
<ul>
  <li>首先输入应用安装路径，如「钉钉」的安装路径为： C:\Program Files (x86)\DingDing</li>
  <li>填写应用名称：方便更快速定位到当前应用</li>
  <li>
      然后填写 ASAD 自动登录步骤，自动登录步骤必须是合法的 JSON 字符串，且为对象数组，ASAD 插件会根据此数组按顺序执行对象操作。数组中对象的所有 key 如下：<br>
      <ul>
        <li>action：表示当前步骤的操作类型，所有操作类型为<br>
              <ul>
                <li>type：输入，如输入账号 </li>
                <li>click：点击，如点击登录按钮</li>
              </ul>
        </li>
        <li>target：表示当前步骤的操作目标，值为字符串，接受所有 querySelector (opens new window)能接受的 dom 元素选择器，如 #password</li>
        <li>value：表示当前步骤的操作值<br>
          <ul>
            <li>type：输入，如输入账号 </li>
            <li>在 type 操作中使用时，值为字符串，可用 <code><span v-pre>{{account}}</span></code> 表示绑定的账号，<code><span v-pre>{{password}}</span></code> 表示绑定的密码</li>
          </ul>
        </li>
      </ul>
  </li>
  <li>账号分配方式：支持管理员设置账号和密码；用户设置账号和密码</li>
</ul>

### 分配账号
以管理员设置账号和密码为例，在分配账号页面，给用户分配应用账号

![](~@imagesZhCn/guides/asad/5.png)
### 访问授权
在访问授权页面，添加应用访问授权

![](~@imagesZhCn/guides/asad/6.png)
![](~@imagesZhCn/guides/asad/7.png)
### 体验登录
完成后即可立即**体验登录**

![](~@imagesZhCn/guides/asad/8.png)