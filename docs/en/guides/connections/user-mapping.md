# Account Matching Rules for Identity Provider Connections

<LastUpdated/>

When a user logs in using a third-party source configured by the administrator, we merge user information according to the identity source connection account matching rules. Friendship prompts you to use this feature with caution if the corresponding matching field in the identity source is not credible and there is a risk that user identity information will be used by a third party.

Whether the identity source connection supports account matching rules only takes effect when the administrator opens this login method in the configuration. Detailed matching rules are shown in the following table:

<table>
  <thead>
    <tr>
      <th>Identity Provider</th>
      <th>Scenes</th>
      <th>Support account matching rules</th>
      <th>Match Field</th>
    </tr>
  </thead>
  <tr>
    <td>Gitlab</td>
    <td>Web</td>
    <td>Yes</td>
    <td>Email</td>
  </tr>
  <tr>
    <td rowspan="7">Wechat</td>
    <td>WeChat QR Code on PC</td>
    <td>No</td>
    <td>None</td>
  </tr>
  <tr>
    <td>WeChat Web Page</td>
    <td>No</td>
    <td>None</td>
  </tr>
  <tr>
    <td>Pull-up Mini Program on App</td>
    <td>No</td>
    <td>None</td>
  </tr>
  <tr>
    <td>Mobile APP</td>
    <td>No</td>
    <td>None</td>
  </tr>
  <tr>
    <td>Mini Program QR Code on PC</td>
    <td>Yes</td>
    <td>Phone number</td>
  </tr>
  <tr>
    <td>Wechat Official Accounts QR Code</td>
    <td>No</td>
    <td>None</td>
  </tr>
  <tr>
    <td>Mini Program</td>
    <td>No</td>
    <td>None</td>
  </tr>
  <tr>
    <td>Github</td>
    <td>Web</td>
    <td>Yes</td>
    <td>Email</td>
  </tr>
  <tr>
    <td rowspan="2">WeCom</td>
    <td>WeCom Self-built App QR Code</td>
    <td>Yes</td>
    <td>Phone number、Email</td>
  </tr>
  <tr>
    <td>WeCom Service Provider App QR Code</td>
    <td>No</td>
    <td>None</td>
  </tr>
  <tr>
    <td rowspan="2">Lark</td>
    <td>Feishu Marketplace App</td>
    <td>Yes</td>
    <td>Phone number、Email</td>
  </tr>
  <tr>
    <td>Feishu Custom App</td>
    <td>Yes</td>
    <td>Phone number、Email</td>
  </tr>
  <tr>
    <td>Slack</td>
    <td>Web</td>
    <td>Yes</td>
    <td>Email</td>
  </tr>
  <tr>
    <td>DingTalk</td>
    <td>Web</td>
    <td>No</td>
    <td>None</td>
  </tr>
  <tr>
    <td>LinkedIn</td>
    <td>Web</td>
    <td>No</td>
    <td>None</td>
  </tr>
  <tr>
    <td>Twitter</td>
    <td>Web</td>
    <td>No</td>
    <td>None</td>
  </tr>
  <tr>
    <td>Facebook</td>
    <td>Web</td>
    <td>Yes</td>
    <td>Email</td>
  </tr>
  <tr>
    <td>Baidu</td>
    <td>Web</td>
    <td>No</td>
    <td>None</td>
  </tr>
  <tr>
    <td rowspan="2">Apple</td>
    <td>Web</td>
    <td>Yes</td>
    <td>Email</td>
  </tr>
  <tr>
    <td>Mobile APP</td>
    <td>Yes</td>
    <td>Email</td>
  </tr>
  <tr>
    <td rowspan="2">Alipay</td>
    <td>Web</td>
    <td>No</td>
    <td>None</td>
  </tr>
  <tr>
    <td>Mobile APP</td>
    <td>No</td>
    <td>None</td>
  </tr>
  <tr>
    <td>QQ</td>
    <td>Web</td>
    <td>No</td>
    <td>None</td>
  </tr>
  <tr>
    <td>Google</td>
    <td>Web</td>
    <td>Yes</td>
    <td>Email</td>
  </tr>
  <tr>
    <td>OAuth 2.0</td>
    <td>Web</td>
    <td>No</td>
    <td>None</td>
  </tr>
  <tr>
    <td>OIDC</td>
    <td>Web</td>
    <td>Yes</td>
    <td>Phone number、Email</td>
  </tr>
  <tr>
    <td>SMAL</td>
    <td>Web</td>
    <td>No</td>
    <td>None</td>
  </tr>
  <tr>
    <td>CAS</td>
    <td>Web</td>
    <td>No</td>
    <td>None</td>
  </tr>
  <tr>
    <td>LDAP</td>
    <td>Web</td>
    <td>No</td>
    <td>None</td>
  </tr>
  <tr>
    <td>Azure AD</td>
    <td>Web</td>
    <td>Yes</td>
    <td>Phone number、Email</td>
  </tr>
  <tr>
    <td>Windows AD</td>
    <td>Web</td>
    <td>No</td>
    <td>None</td>
  </tr>
  <tr>
    <td>QingCloud</td>
    <td>Web</td>
    <td>Yes</td>
    <td>Phone number、Email</td>
  </tr>
</table>
