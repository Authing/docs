---
meta:
  - name: description
    content: DAP 用户目录
---

# 使用 {{$localeConfig.brandName}} 的 LDAP 用户目录

<LastUpdated/>

{{$localeConfig.brandName}} 支持使用 LDAP 协议查看、修改、增加和删除用户信息。本页面包含了一些基础信息和使用教程。如果你还不了解 LDAP 协议是什么，可以先阅读概念 - [什么是 LDAP](/concepts/ldap.md)。

## 基本信息

| 信息 | 值  |
| :--- | :-- |
| Hostname                | ldap://ldap.authing.cn                             |
| Port                    | 1389                                               |
| LDAP Distinguished Name(BindDN) | ou=users, o=AUTHING_USERPOOL_ID, dc=authing, dc=cn |
| Base DN                 | ou=users, o=AUTHING_USERPOOL_ID, dc=authing, dc=cn |

`BindDN` 主要与 `secret` 配合完成身份验证，而 `BaseDN` 则定义了用户从何处进行操作

```
dc=authing,dc=cn					- {{$localeConfig.brandName}}	
└── o=AUTHING_USERPOOL_ID			- userPool
    └── ou=users					- users(常用作 BindDN，以及 BaseDN)
    	├── uid=USER_ID				- 用户
    	└── o=develop				- 自己定义的组织机构
			└── uid=USER_ID			- 组织机构下的成员
```

## 认证方式

访问 {{$localeConfig.brandName}} LDAP 服务器需要使用 {{$localeConfig.brandName}} 的[用户池 ID \(UserPool Id\) 和用户池密钥 \(UserPool Secret\)](/guides/faqs/get-userpool-id-and-secret.md)，认证命令如下所示：


使用用户池的 BindDN 信息与秘钥登录，基于用户池进行查找，返回结果包含用户数据，以及组织机构数据


```bash
$ ldapsearch -H ldap://ldap.authing.cn:1389 -x -D "ou=users,o=AUTHING_USERPOOL_ID,dc=authing,dc=cn" -w "AUTHING_USERPOOL_SECRET"  -LLL -b "ou=users,o=AUTHING_USERPOOL_ID,dc=authing,dc=cn"
```

若密钥 \(Secret\) 不正确会返回如下信息：

```
	ldap_bind: Invalid credentials (49)
	matched DN: ou=users, o=AUTHING_USERPOOL_ID, dc=authing, dc=cn
	additional info: InvalidCredentialsError
```

这是一个示例的返回结果，与你的查询结果一般是不同的，以供参考：

```bash
# 用户池信息
dn: ou=users,o=59f86b4832eb28071bdd9214,dc=authing,dc=cn
objectclass: organization
objectclass: top
o: 59f86b4832eb28071bdd9214
name:: cm9vdCDnlKjmiLfmsaA=

# 用户池下的用户信息（test）
dn: uid=601d54c27569df18f85e2c71,ou=users,o=59f86b4832eb28071bdd9214,dc=authin
 g,dc=cn
id: 601d54c27569df18f85e2c71
createdAt:: RnJpIEZlYiAwNSAyMDIxIDIyOjIyOjU4IEdNVCswODAwICjkuK3lm73moIflh4bml7
 bpl7Qp
updatedAt:: RnJpIEZlYiAwNSAyMDIxIDIyOjIyOjU4IEdNVCswODAwICjkuK3lm73moIflh4bml7
 bpl7Qp
userPoolId: 59f86b4832eb28071bdd9214
email: 1409458062@qq.com
username: test
photo: https://files.authing.co/authing-console/default-user-avatar.png
gender: U
registerSource: import:manual
emailVerified: false
phoneVerified: false
blocked: false
signedUp:: RnJpIEZlYiAwNSAyMDIxIDIyOjIyOjU4IEdNVCswODAwICjkuK3lm73moIflh4bml7b
 pl7Qp
objectclass: users
cn: test
uid: 601d54c27569df18f85e2c71

# 用户池下的用户信息（root）
dn: uid=5a597f35085a2000144a10ed,ou=users,o=59f86b4832eb28071bdd9214,dc=authin
 g,dc=cn
id: 5a597f35085a2000144a10ed
createdAt:: TW9uIEZlYiAwMSAyMDIxIDE3OjA1OjU0IEdNVCswODAwICjkuK3lm73moIflh4bml7
 bpl7Qp
updatedAt:: TW9uIEZlYiAwMSAyMDIxIDE3OjI2OjU5IEdNVCswODAwICjkuK3lm73moIflh4bml7
 bpl7Qp
userPoolId: 59f86b4832eb28071bdd9214
email: root@authing.cn
username: root
photo: https://files.authing.co/authing-console/default-user-avatar.png
lastIp:: Ojox
gender: U
registerSource: offcial:import
emailVerified: false
phoneVerified: false
lastLogin:: TW9uIEZlYiAwMSAyMDIxIDE3OjI2OjU5IEdNVCswODAwICjkuK3lm73moIflh4bml7
 bpl7Qp
blocked: false
signedUp:: TW9uIEZlYiAwMSAyMDIxIDE3OjA1OjU0IEdNVCswODAwICjkuK3lm73moIflh4bml7b
 pl7Qp
objectclass: users
cn: root
uid: 5a597f35085a2000144a10ed

# 用户池下的用户信息（17602502507）
dn: uid=601d59a5f04ee72cb058bdbb,ou=users,o=59f86b4832eb28071bdd9214,dc=authin
 g,dc=cn
id: 601d59a5f04ee72cb058bdbb
createdAt:: RnJpIEZlYiAwNSAyMDIxIDIyOjQzOjQ5IEdNVCswODAwICjkuK3lm73moIflh4bml7
 bpl7Qp
updatedAt:: RnJpIEZlYiAwNSAyMDIxIDIyOjQzOjQ5IEdNVCswODAwICjkuK3lm73moIflh4bml7
 bpl7Qp
userPoolId: 59f86b4832eb28071bdd9214
phone: 17602502507
photo: https://files.authing.co/authing-console/default-user-avatar.png
gender: U
registerSource: import:manual
emailVerified: false
phoneVerified: false
blocked: false
signedUp:: RnJpIEZlYiAwNSAyMDIxIDIyOjQzOjQ5IEdNVCswODAwICjkuK3lm73moIflh4bml7b
 pl7Qp
objectclass: users
uid: 601d59a5f04ee72cb058bdbb

# 用户池下的组织信息（小白）
dn: o=601d14d1267b84c06a32e463,ou=users,o=59f86b4832eb28071bdd9214,dc=authing,
 dc=cn
id: 601d14d1267b84c06a32e463
createdAt: 2021-02-05T09:50:09.073Z
updatedAt: 2021-02-05T09:50:09.073Z
userPoolId: 59f86b4832eb28071bdd9214
orgId: 601d14d15ac1c3f008997f53
name:: 5bCP55m9
description:: 6L+Z5piv5qC557uE57uH
code: 5584
o: 601d14d1267b84c06a32e463
objectclass: organization
path:: 5bCP55m9
parent: Root
parentId: 0
parentCode: root

# 用户池下的小白组织下的用户信息（test）
dn: uid=601d54c27569df18f85e2c71,o=601d14d1267b84c06a32e463,ou=users,o=59f86b4
 832eb28071bdd9214,dc=authing,dc=cn
id: 601d54c27569df18f85e2c71
createdAt:: RnJpIEZlYiAwNSAyMDIxIDIyOjIyOjU4IEdNVCswODAwICjkuK3lm73moIflh4bml7
 bpl7Qp
updatedAt:: RnJpIEZlYiAwNSAyMDIxIDIyOjIyOjU4IEdNVCswODAwICjkuK3lm73moIflh4bml7
 bpl7Qp
userPoolId: 59f86b4832eb28071bdd9214
email: 1409458062@qq.com
username: test
photo: https://files.authing.co/authing-console/default-user-avatar.png
gender: U
registerSource: import:manual
emailVerified: false
phoneVerified: false
blocked: false
signedUp:: RnJpIEZlYiAwNSAyMDIxIDIyOjIyOjU4IEdNVCswODAwICjkuK3lm73moIflh4bml7b
 pl7Qp
objectclass: organizationalPerson
cn: test
uid: 601d54c27569df18f85e2c71

# 用户池下的小白组织下的用户信息（17602502507）
dn: uid=601d59a5f04ee72cb058bdbb,o=601d14d1267b84c06a32e463,ou=users,o=59f86b4
 832eb28071bdd9214,dc=authing,dc=cn
id: 601d59a5f04ee72cb058bdbb
createdAt:: RnJpIEZlYiAwNSAyMDIxIDIyOjQzOjQ5IEdNVCswODAwICjkuK3lm73moIflh4bml7
 bpl7Qp
updatedAt:: RnJpIEZlYiAwNSAyMDIxIDIyOjQzOjQ5IEdNVCswODAwICjkuK3lm73moIflh4bml7
 bpl7Qp
userPoolId: 59f86b4832eb28071bdd9214
phone: 17602502507
photo: https://files.authing.co/authing-console/default-user-avatar.png
gender: U
registerSource: import:manual
emailVerified: false
phoneVerified: false
blocked: false
signedUp:: RnJpIEZlYiAwNSAyMDIxIDIyOjQzOjQ5IEdNVCswODAwICjkuK3lm73moIflh4bml7b
 pl7Qp
objectclass: organizationalPerson
uid: 601d59a5f04ee72cb058bdbb

```

## Search


基于用户池进行查找，返回结果包含用户数据，以及组织机构数据。-LLL 表示禁止输出与过滤条件不匹配的信息，如果不带此项，你将得到获取结果的条目数以及请求部分信息.


```bash
$ ldapsearch -H ldap://ldap.authing.cn:1389 -x -D "ou=users,o=AUTHING_USERPOOL_ID,dc=authing,dc=cn" -w "AUTHING_USERPOOL_SECRET"  -LLL -b "ou=users,o=AUTHING_USERPOOL_ID,dc=authing,dc=cn"
```

### 查询过滤(Search Filte)

基于用户池进行查找并过滤，返回结果包含用户数据，以及组织机构数据。

> 有关过滤的所有功能，可以参考 [RFC-2254](https://www.ietf.org/rfc/rfc2254.txt)


#### 相等

此项查找用户池下具有性别属性，且属性值为 U 的所有信息，因为组织机构不具有该属性，只有用户具有该属性，结果将会返回用户性别为 U 的用户信息。


```bash
$ ldapsearch -H ldap://localhost:1389 -x -D "ou=users,o=AUTHING_USERPOOL_ID,dc=authing,dc=cn" -w "AUTHING_USERPOOL_SECRET" -LLL -b "ou=users,o=AUTHING_USERPOOL_ID,dc=authing,dc=cn" -s sub '(gender=U)'
```

#### 不等

与不等类似，此项查找用户池下具有 cn (用户名)属性，且属性值不为 hahhaha 的所有信息，因为组织机构不具有该属性，只有用户具有该属性，结果将会返回用户姓名不为 `hahhaha` 的条目信息（其实只有用户具有 cn 属性，所以结果全是用户信息）。

```bash
$ ldapsearch -H ldap://localhost:1389 -x -D "ou=users,o=AUTHING_USERPOOL_ID,dc=authing,dc=cn" -w "AUTHING_USERPOOL_SECRET" -LLL -b "ou=users,o=AUTHING_USERPOOL_ID,dc=authing,dc=cn" -s sub '(!(cn=hahhaha))'
```

#### 大于等于

与前两者类似，此项查找用户池下具有 code (组织单位标记码)属性，且属性值 `大于或等于` 50 的所有信息，因为用户不具有该属性，只有组织机构具有该属性，结果将会返回组织单位标记码大于或等于的条目信息。


```bash
$ ldapsearch -H ldap://localhost:1389 -x -D "ou=users,o=AUTHING_USERPOOL_ID,dc=authing,dc=cn" -w "AUTHING_USERPOOL_SECRET" -LLL -b "ou=users,o=AUTHING_USERPOOL_ID,dc=authing,dc=cn" -s sub '(code>=50)'
```

#### 小于等于

此项查找用户池下具有 code (组织单位标记码)属性，且属性值 `小于或等于` 50 的所有信息，因为用户不具有该属性，只有组织机构具有该属性，结果将会返回组织单位标记码大于或等于的条目信息。


```bash
$ ldapsearch -H ldap://localhost:1389 -x -D "ou=users,o=AUTHING_USERPOOL_ID,dc=authing,dc=cn" -w "AUTHING_USERPOOL_SECRET" -LLL -b "ou=users,o=AUTHING_USERPOOL_ID,dc=authing,dc=cn" -s sub '((code<=50)'
```

#### 查找模式
```
dc=authing,dc=cn					- {{$localeConfig.brandName}}	
└── o=AUTHING_USERPOOL_ID			- userPool
    └── ou=users					- users(常用作 BindDN，以及 BaseDN)
    	├── uid=USER1_ID				- 用户
    	└── o=develop				- 自己定义的组织机构
			└── uid=USER2_ID			- 组织机构下的成员
```
##### base 模式(只查找 baseDN 信息)

以上图为例，base 模式只会查找并返回 BaseDN 的信息，即 `用户池` 节点信息

```
dn: ou=users,o=AUTHING_USERPOOL_ID,dc=authing,dc=cn
...属性相关信息...
```

```bash
$ ldapsearch -H ldap://localhost:1389 -x -D "ou=users,o=AUTHING_USERPOOL_ID,dc=authing,dc=cn" -w "AUTHING_USERPOOL_SECRET" -b "ou=users,o=AUTHING_USERPOOL_ID,dc=authing,dc=cn" -s base
```

##### one 模式(只查找 baseDN 信息下的子节点)

以上图为例，one 模式会查找`BaseDN` 及 `BaseDN 子节点` 并返回相关信息。
```
dn: ou=users,o=AUTHING_USERPOOL_ID,dc=authing,dc=cn
...属性相关信息...

dn: uid=USER1_ID,ou=users,o=AUTHING_USERPOOL_ID,dc=authing,dc=cn
...属性相关信息...

dn: o=develop,ou=users,o=AUTHING_USERPOOL_ID,dc=authing,dc=cn
...属性相关信息...
```

```bash
$ ldapsearch -H ldap://localhost:1389 -x -D "ou=users,o=AUTHING_USERPOOL_ID,dc=authing,dc=cn" -w "AUTHING_USERPOOL_SECRET" -b "ou=users,o=AUTHING_USERPOOL_ID,dc=authing,dc=cn" -s one
```

##### sub 模式(查找 baseDN 信息下的所有节点)

以上图为例，sub 模式会查找`BaseDN` 和 `BaseDN 下的所有节点` 并返回相关信息。
```
dn: ou=users,o=AUTHING_USERPOOL_ID,dc=authing,dc=cn
...属性相关信息...

dn: uid=USER1_ID,ou=users,o=AUTHING_USERPOOL_ID,dc=authing,dc=cn
...属性相关信息...

dn: o=develop,ou=users,o=AUTHING_USERPOOL_ID,dc=authing,dc=cn
...属性相关信息...

dn: uid=USER2_ID,o=develop,ou=users,o=AUTHING_USERPOOL_ID,dc=authing,dc=cn
...属性相关信息...
```

```bash
$ ldapsearch -H ldap://localhost:1389 -x -D "ou=users,o=AUTHING_USERPOOL_ID,dc=authing,dc=cn" -w "AUTHING_USERPOOL_SECRET" -b "ou=users,o=AUTHING_USERPOOL_ID,dc=authing,dc=cn" -s sub
```

### 返回结果过滤(只返回指定属性)

如果你使用过 SQL，此功能与 `select` 类似。不增加过滤结果可能是这样的：
```
dn: ou=users,o=AUTHING_USERPOOL_ID,dc=authing,dc=cn
cn: authing
username: authing
uid: user1
...其他属性...
```
如图增加相关过滤条件，则结果是这样的
```
dn: ou=users,o=AUTHING_USERPOOL_ID,dc=authing,dc=cn
uid: user1
```
```bash
$ ldapsearch -H ldap://localhost:1389 -x -D "ou=users,o=AUTHING_USERPOOL_ID,dc=authing,dc=cn" -w "AUTHING_USERPOOL_SECRET" -b "ou=users,o=AUTHING_USERPOOL_ID,dc=authing,dc=cn" -s sub  dn uid
```

## Add

创建一个名为 user.ldif 的文件然后复制以下内容进去：

```
dn: cn=authingUserName, ou=users, o=AUTHING_USERPOOL_ID, dc=authing, dc=cn
objectClass: users
cn: authingUserName
```

然后执行以下命令：

该操作会在 `用户池` 中新增一个 `用户`


```bash
$ ldapadd -H ldap://ldap.authing.cn:1389 -x -D "ou=users,o=AUTHING_USERPOOL_ID,dc=authing,dc=cn" -w "AUTHING_USERPOOL_SECRET" -f ./user.ldif
```

## Modify

创建一个名为 modify.ldif 的文件然后复制以下内容进去：

```
dn: cn=authingUserName, ou=users, o=AUTHING_USERPOOL_ID, dc=authing, dc=cn
changetype: modify
replace: mail
mail: test@authing.cn
```

然后执行以下命令：

该操作会在 `用户池` 中根据 modify 中的 `DN` 查找相关用户信息，查找成功，则根据 `changetype` 选择操作 `用户信息` ，`信息` 来自于 `changetype` 下面的信息 


```bash
$ ldapmodify -H ldap://ldap.authing.cn:1389 -x -D "ou=users,o=AUTHING_USERPOOL_ID,dc=authing,dc=cn" -w "AUTHING_USERPOOL_SECRET" -f ./modify.ldif
```

## Delete

该操作会在 `用户池` 中根据 `DN` 查找相关用户信息，查找成功，则进行删除，这是一个敏感操作 

```bash
$ ldapdelete -H ldap://ldap.authing.cn:1389 -x -D "ou=users,o=AUTHING_USERPOOL_ID,dc=authing,dc=cn" -w "AUTHING_USERPOOL_SECRET" "cn=authingUserName, ou=users, o=AUTHING_USERPOOL_ID, dc=authing,dc=cn"
```

## Other
### compare

该操作用于判断 `LDAP Server` 目录树中 `DN` 值和 `指定条目值` 是否属于同一个条目，是则返回 `true`，否则返回 `false`

```bash
$ ldapcompare -H ldap://ldap.authing.cn:1389 -x -D "ou=users,o=AUTHING_USERPOOL_ID,dc=authing,dc=cn" -w "AUTHING_CLIENT_SECRET" "uid=uid,o=oid,ou=users,o=AUTHING_USERPOOL_ID,dc=authing,dc=cn" "gender:U"
```

### modifyDN

用于对 `LDAP Server` 中的 `RDN` 条目的修改， 可以从标准的条目信息输入， `RDN` 指 `DN` 的首项， 例如 `cn=oldUserName，o=5fa24415c124111859e23e4b，ou=users，o=AUTHING_USERPOOL_ID，dc=authing，dc=cn" "cn=newUserName` 中的 `cn=oldUserName`， 由于不管是 `用户的DN` 还是 `组织结构的DN` 相关信息多数都是 `id` 相关的值， 所以当你修改 `cn=oldUserName` 其实 `等同于` 修改用户名


```bash
$ ldapmodrdn -H ldap://ldap.authing.cn:1389 -x -D "ou=users,o=AUTHING_USERPOOL_ID,dc=authing,dc=cn" -w "AUTHING_CLIENT_SECRET" "cn=oldUserName,o=5fa24415c124111859e23e4b,ou=users,o=AUTHING_USERPOOL_ID,dc=authing,dc=cn" "cn=newUserName"
```
### whoami

用于验证 `LDAP 服务器` 的身份，输入正确绑定 DN 以及密码，会返回指定的信息，否则会提示 `ldap_bind: invalid credentials(49)` 错误，这一般由于 `密码错误` 造成的，请检查 `对应的密码` 及 `绑定 DN 信息` 即可。 返回信息 `user@authing.cn`


```bash
$ ldapwhoami -H ldap://ldap.authing.cn:1389 -x -D "ou=users,o=AUTHING_USERPOOL_ID,dc=authing,dc=cn" -w "AUTHING_CLIENT_SECRET"
```