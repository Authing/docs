# 使用 LDAP 协议对外开放组织机构数据

<LastUpdated/>

{{$localeConfig.brandName}} 支持通过 LDAP 协议对外开放组织机构数据，如果你还不了解 LDAP 协议是什么，可以先阅读概念 - [什么是 LDAP](/concepts/ldap.md)。

在控制台的 **用户管理** - **LDAP** 页面，首先先开启用户池的 LDAP 用户目录：

![](~@imagesZhCn/guides/org/Xnip2021-02-25_14-54-20.png)

并且将 **拓展信息字段** 中的 `department(部门)` 字段勾选上：

![](~@imagesZhCn/guides/org/Xnip2021-02-25_14-53-35.png)

## 使用 LDAP 协议获取组织机构数据

你可以使用 `ldapsearch` 获取组织机构下所有的用户：

```
ldapsearch -H ldap://ldap.authing.cn:1389 						   	  \
			 -x -D "ou=users,o=USERPOOL_ID,dc=authing,dc=cn" \
			 -w "USERPOOL_SECRET"  							 	  \
			 -LLL 													   	  \
			 -b "ou=users,o=USERPOOL_ID,dc=authing,dc=cn" "objectClass=organizationalPerson" | php ./utf8ldif.php
```

示例用户数据如下：

```
dn: uid=5f069f250a1a84316ab66319,ou=5f069f1e0a1a8485f9b662c0,o=5f069f1e0a1a849931b662bd,ou=users,o=5de4cb712a7097f5e064533e,dc=authing,dc=cn
id: 5f069f250a1a84316ab66319
createdAt: Thu Jul 09 2020 04:37:57 GMT+0000 (Coordinated Universal Time)
updatedAt: Thu Feb 25 2021 03:36:32 GMT+0000 (Coordinated Universal Time)
userPoolId: 5de4cb712a7097f5e064533e
email: xiaoming@authing-inc.co
phone: 186xxxx6952
username: 小明
unionid: ww:ww736adab7f131153d:shangsinian
openid: ww:ww736adab7f131153d:shangsinian
nickname: 
company:
photo: http://wework.qpic.cn/bizmail/TZLXMGsT0xbrBtlq0icNNMUSXJRg5lMbslFxibZApC8O2A9ibXibbRVeBg/0
lastIp: 106.121.165.224
name:
givenName:
familyName:
middleName:
profile:
preferredUsername:
website:
gender: M
birthdate:
zoneinfo:
locale:
address:
formatted:
streetAddress:
locality:
region:
postalCode:
country:
registerSource: social:wechatwork
emailVerified: false
phoneVerified: true
lastLogin: Thu Feb 25 2021 03:36:32 GMT+0000 (Coordinated Universal Time)
blocked: false
signedUp: Thu Jul 09 2020 04:37:57 GMT+0000 (Coordinated Universal Time)
objectclass: organizationalPerson
cn: 小明
uid: 5f069f250a1a84316ab66319
department: 研发
departmentParent: 蒸汽记忆
departmentId: 5f069f1e0a1a8485f9b662c0
departmentParentId: 5f069f1e0a1a849931b662bd
departmentCode:
departmentParentCode: root
departmentPath: 蒸汽记忆/研发
```

## 配置组织机构可见范围

默认情况下，`ldapsearch` 可以获取用户池下所有组织的数据，你可以修改其可见范围为某一个部门：

![](~@imagesZhCn/guides/org/Xnip2021-02-25_15-07-47.png)


## 接下来

如果你想详细了解 {{$localeConfig.brandName}} LDAP 用户目录的详细 API，可以[在此了解](/guides/users/ldap-user-directory.md)。 
