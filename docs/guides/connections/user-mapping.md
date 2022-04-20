# 身份源连接的账号匹配规则

<LastUpdated/>

当用户使用了管理员配置的第三方身份源登录时，我们将按照身份源连接账号匹配规则合并用户信息。友情提示，如果身份源中的对应匹配字段不可信，将存在用户身份信息被第三者冒用的风险，请谨慎使用本功能。

身份源连接是否支持账号匹配规则仅在管理员在配置中开启此登录方式时才会生效。详细匹配规则如下表所示：

<table>
  <thead>
    <tr>
      <th>身份源</th>
      <th>连接方式</th>
      <th>是否要支持账号匹配规则</th>
      <th>匹配字段</th>
      </tr>
  </thead>  <tr>
      <td>Gitlab（gitlab）</td>
      <td>Web</td>
      <td>是</td>
      <td>邮箱</td>
  </tr>
    <tr>
      <td rowspan=7>微信（wechat）</td>
      <td>PC网页扫码</td>
      <td>否</td>
      <td>无</td>
    </tr>
    <tr>
      <td>微信浏览器网页登录</td>
      <td>否</td>
      <td>无</td>
    </tr>
    <tr>
       <td>小程序拉起 APP 登录</td>
       <td>否</td>
       <td>无</td> 
    </tr>
    <tr>
       <td>移动端 APP </td>
       <td>否</td>
       <td>无</td> 
    </tr>
   <tr>
       <td>小登录扫码</td>
       <td>是</td>
       <td>手机号</td> 
    </tr>
   <tr>
       <td>关注公众号扫码 </td>
       <td>否</td>
       <td>无</td> 
    </tr>
   <tr>
       <td>小程序内部登录 </td>
       <td>否</td>
       <td>无</td> 
    </tr>
  <tr>
      <td>Github</td>
      <td>Web</td>
      <td>是</td>
      <td>邮箱</td>
  </tr><tr>
  <td rowspan='2' >企业微信（WeCom）</td>
    <td>企业微信企业内部应用扫码/网页授权登录</td>
    <td>是</td>
    <td>手机号、邮箱
</td>
  </tr><tr>
    <td>企业微信第三方应用扫码授权登录</td>
    <td>否</td>
    <td>无</td>
  </tr><tr>
  <td rowspan='2'>飞书（lark）</td>
    <td>飞书应用商店应用</td>
    <td>是</td>
    <td>手机号、邮箱</td>
  </tr><tr>
    <td>飞书企业自建应用</td>
    <td>是</td>
    <td>手机号、邮箱</td>
  </tr><tr>
  <td>Slack</td>
    <td>Web</td>
    <td>是</td>
    <td>邮箱</td>
  </tr><tr>
  <td>钉钉</td>
   <td>Web</td>
    <td>否</td>
    <td>无</td>
  </tr><tr>
  <td>LinkedIn</td>
  <td>Web</td>
    <td>否</td>
    <td>无</td>
  </tr><tr>
  <td>Twitter</td>
  <td>Web</td>
      <td>否</td>
    <td>无</td>
  </tr><tr>
  <td>Facebook</td>
  <td>Web</td>
      <td>是</td>
    <td>邮箱</td>
  </tr><tr>
  <td>百度</td>
  <td>Web</td>
      <td>否</td>
    <td>无</td>
  </tr><tr>
  <td rowspan='2'>Apple</td>
  <td>Web</td>
      <td>是</td>
    <td>邮箱</td>
  </tr><tr>
  <td>移动端</td>
      <td>是</td>
    <td>邮箱</td>
  </tr><tr>
  <td rowspan='2'>支付宝</td>
  <td>Web</td>
      <td>否</td>
    <td>无</td>
  </tr><tr>
<td>移动端</td>
 <td>否</td>
 <td>无</td>
  </tr><tr>
  <td>QQ</td>
  <td>Web</td>
      <td>否</td>
    <td>无</td>
  </tr><tr>
  <td>Google</td>
  <td>Web</td>
      <td>是</td>
    <td>邮箱</td>
  </tr><tr>
  <td>OAuth 2.0</td>
  <td>Web</td>
      <td>否</td>
    <td>无</td>
  </tr><tr>
  <td>OIDC</td>
  <td>Web</td>
      <td>是</td>
    <td>手机号、邮箱</td>
  </tr><tr>
  <td>SMAL</td>
  <td>Web</td>
      <td>否</td>
    <td>无</td>
  </tr><tr>
  <td>CAS</td>
  <td>Web</td>
      <td>否</td>
    <td>无</td>
  </tr><tr>
  <td>LDAP</td>
  <td>Web</td>
      <td>否</td>
    <td>无</td>
  </tr><tr>
  <td>Azure AD</td>
  <td>Web</td>
     <td>是</td>
    <td>手机号、邮箱</td>
  </tr><tr>
  <td>Windows AD</td>
  <td>Web</td>
      <td>否</td>
    <td>无</td>
  </tr><tr>
  <td>青云</td>
  <td>Web</td>
       <td>是</td>
    <td>手机号、邮箱</td>
  </tr>
</table>
