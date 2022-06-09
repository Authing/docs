如果你想接入 LDAP 服务，请按照以下步骤完成 LDAP 配置。

#### 添加 LDAP 服务

![](https://cdn.authing.cn/blog/20201107163714.png)
::: img-description
添加 LDAP 服务
:::

![](https://cdn.authing.cn/blog/20201107163722.png)
::: img-description
添加 LDAP 服务页面
:::

#### 填写相关信息

在弹出的对话框中填写相关信息，如果你不知道如何填写可以点击右上角的「点击这里」填充测试配置信息。

![](https://cdn.authing.cn/blog/20201107163734.png)
::: img-description
LDAP 服务信息测试
:::

![](https://cdn.authing.cn/blog/20201107163752.png)
::: img-description
Use 我们提供的 LDAP 服务信息
:::

#### 参数解释

1. `LDAP 别名`，必填，自定义的 LDAP 服务名称
2. `LDAP 链接`，必填，LDAP 服务器的地址，如：ldap://dc.fabrikam.com
3. `Base DN`，必填，用于连接 LDAP 的用户名，此用户名将用于测试连接结果和搜索用户或用户组
4. `密码`，必填，用于连接 LDAP 的密码，该密码将会被加密存储到数据库中
5. `绑定端点`，必填，定义从哪个目录开始搜索，如：dc=fabrikam,dc=local
6. `查询条件`，必填，如果这里是 mail 表示查询用户信息是通过邮箱信息来查询的。注意，该字段信息与 LDAP 数据库存储数据的字段相对应，如果如果存储用户邮箱信息的字段是 email, 这里就需要修改成 email。

#### 连通性测试

连通性测试可以帮助你检查参数是否填写正确了，如果你填入了「测试配置」，那么点击页面上的「连通性测试」应该可以看到如下结果：

![](https://cdn.authing.cn/blog/20201107165043.png)
::: img-description
连通性测试
:::

你可以用这个测试来测试不同的 `Base DN` 和`密码`。

#### 验证用户

验证用户可以帮助你检查查询条件是否正确，如果查询条件不正确，会返回无法找到用户的错误。

我们给出的测试用户名是 `admin`，密码是 `admin`，查询条件是 `cn`，这是一个 `openLDAP` 提供的默认账密信息，点击「验证用户」后应该看到如下结果：

![](https://cdn.authing.cn/blog/20201107163802.png)
::: img-description
验证用户
:::

如果将查询条件从 `cn` 改为 `cnn`，那么此时应该返回如下结果：

![](https://cdn.authing.cn/blog/20201107163810.png)
::: img-description
查询条件测试
:::

用户可用此方式，通过修改 `绑定端点` 和 `查询条件` 完成对 LDAP 的调试。

配置完成后，访问任意 OAuth 应用或 OIDC 应用即可 Use LDAP 账号登录。

::: hint-info
我们准备了一个[LDAP 测试应用](https://ldap-test.authing.cn)可让你体验 Use LDAP 登录的全流程：

测试账户：admin

测试密码：admin
:::
