# Open organizational data to the public using the LDAP protocol

<LastUpdated/>

{{$localeConfig.brandName}} supports the opening of organizational data through the [LDAP](/concepts/ldap.md) protocol.

On the **User Management** - **LDAP** page of the console, open the LDAP user directory of the user pool:

![](~@imagesZhCn/guides/org/Xnip2021-02-25_14-54-20.png)

And check the `department` field in the **extended information field**:

![](~@imagesZhCn/guides/org/Xnip2021-02-25_14-53-35.png)

## Use LDAP protocol to get organization data

You can use `ldapsearch` to get all users under the organization:

```
ldapsearch -H ldap://ldap.authing.cn:1389 						   	  \
			 -x -D "ou=users,o=USERPOOL_ID,dc=authing,dc=cn" \
			 -w "USERPOOL_SECRET"  							 	  \
			 -LLL 													   	  \
			 -b "ou=users,o=USERPOOL_ID,dc=authing,dc=cn" "objectClass=organizationalPerson" | php ./utf8ldif.php
```

Sample user data is as follows:

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

## Configure the visible range of the organization

By default, `ldapsearch` can obtain the data of all organizations under the user pool, and you can modify its visible range to a certain department:

![](~@imagesZhCn/guides/org/Xnip2021-02-25_15-07-47.png)


## Next

If you want to learn more about the detailed API of the {{$localeConfig.brandName}} LDAP user directory, you can learn more about it [here](/guides/users/ldap-user-directory.md).