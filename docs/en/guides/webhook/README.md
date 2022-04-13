---
meta:
  - name: description
    content: Using Webhook to monitor user events
---

# Using Webhook to monitor user events

<LastUpdated/>

Webhook allows you to monitor user registration, login and other behaviors, so as to do some custom processing.

The method of using Webhook is to configure the HTTP URL in the Approw platform. When your user logs in, registers, and changes the password, a POST request will be sent to the remote HTTP URL.

## Configuring Webhooks

On the **Extention Capabilities** - **Webhooks** page，you can manage the webhook you defined：

![](~@imagesEnUs/webhooks/webhook-en-01.png)
Click the Add Webhook button to create a new Webhook to subscribe to specific events

![](~@imagesEnUs/webhooks/webhook-en-02.png)
Fill out the form and check the Webhook event

![](~@imagesEnUs/webhooks/webhook-en-03.png)

::: img-description
Webhook List
:::

A new Webhook can be created to subscribe to a specific event by clicking on the Create button in the upper right corner:

![](~@imagesEnUs/webhooks/webhook-en-04.png)
After the creation is successful, you will enter the Webhook list page

::: img-description
Configuring Webhook
:::

### Parameter Explanation

| Parameter name     | Parameter explanation                                                                                                                               |
| :----------- | :--------------------------------------------------------------------------------------------------------------------------------------- |
| Name  | Webhook name |
| Callback link     | The HTTP URL address for remotely receiving webhook events                                                                                                    |
| Request key     | After setting the key (the value is set by the developer), Approw will attach this key to each request（HTTP Header：X-Authing-Token）. You can verify this key to avoid some illegal operations |
| Request data format | Specify the data format of the Request body when initiating a Webhook request. The optional values are `application/json` and `application/x-www-form-urlencoded`                      |
| Trigger event     | [Whether to enable this Hook](use-webhook.md#支持的事件)                                                                                            |
| Whether to enable this Hook         | Whether to enable this Hook                                                                                                                          |

## Debugging Webhook

The Hook request events you just created are empty, so you can trigger a "test event" by clicking on "Test".

![](~@imagesEnUs/webhooks/webhook-en-05.png)

::: img-description
Webhook test
:::
![](~@imagesEnUs/webhooks/webhook-en-07.png)

The requested data

```js
{
    "description": "A test from Authing Webhook"
}
```

After a successful test you will see detailed request and return information.



## Supported Events

### Event List

| Event name                | Event description                                                                                           |
| :-------------------- | :------------------------------------------------------------------------------------------------- |
| login                 | Login event, this event will be triggered when the user logs in, regardless of whether the login is successful or not                               |
| register              | Registration event, this event will be triggered when the user registers or the administrator manually creates a user, regardless of whether it is successful or not, it will be triggered                       |
| mfaVerify             | MFA verification event, when the user logs in and triggers MFA, and enters the MFA verification code after the second login, it will be triggered regardless of success or failure      |
| user:updated          | Password modification event, this event will be triggered when the user changes the password or the administrator manually changes the password, regardless of success or failure               |
| user:password-changed | Modify user information time, when users modify their own information or administrators manually modify user information will trigger the word time, regardless of success or failure will be triggered |
| user:email-verified   | User mailbox is verified event                                                                             |
| permission:add        | Add authorization events, authorization objects can be users, roles, and organizational structures                                             |
| permission:revoke     | Cancel authorization events. Cancel the rule of Authorization objects can be users, roles, and organizational structures                                                |

### Request type

Specify the data format of the Request body when initiating a Webhook request. The optional values are `application/json` and `application/x-www-form-urlencoded`

## Attached data

Each event will carry some specific request parameters.

### Request headers

We will carry some custom header information in the HTTP POST header, as shown in the following table:

| Header                     | 描述                                                                                        |
| :------------------------- | :------------------------------------------------------------------------------------------ |
| `user-agent`               | The value is `'authing-webhook@2.0'`，which means this request is from Approw                                    |
| `x-authing-webhook-secret` | The request secret key is the secret key you set in the Webhook configuration. This secret key can be verified to prevent malicious requests from third parties |
| `x-authing-userpool-id`    | Approw user pool ID                                                                         |

### Request body

The request body will also carry some specific parameters

| Parameter name      | Description                                                                                                    |
| :---------- | :------------------------------------------------------------------------------------------------------ |
| `eventName` | Event name. Possible values are `login`, `register`, `user:updated`,`user:password-changed`, `user:email-verified` |
| `data`      | The corresponding details of the event                                                                                 |

#### Request example

- Login event

  ```json
  {
    "eventName": "login",
    "data": {
      "id": "5f702fcc913544c358cb2123",
      "arn": "arn:cn:authing:59f86b4832eb28071bdd9214:user:5f702fcc913544c358cb2123",
      "userPoolId": "59f86b4832eb28071bdd9214",
      "username": "xxx",
      "email": null,
      "emailVerified": false,
      "phone": null,
      "phoneVerified": false,
      "unionid": "35447896",
      "openid": "35447896",
      "identities": [],
      "nickname": "xxxx",
      "registerSource": ["social:github"],
      "photo": "https://avatars2.githubusercontent.com/u/35447896?v=4",
      "password": null,
      "oauth": "",
      "token": "",
      "tokenExpiredAt": "1602484037172",
      "loginsCount": 4,
      "lastLogin": "1601188037190",
      "lastIP": null,
      "signedUp": "2020-09-27T14:23:08+08:00",
      "blocked": false,
      "isDeleted": false,
      "device": null,
      "browser": null,
      "company": "Authing",
      "name": null,
      "givenName": null,
      "familyName": null,
      "middleName": null,
      "profile": "",
      "preferredUsername": null,
      "website": null,
      "gender": "U",
      "birthdate": null,
      "zoneinfo": null,
      "locale": null,
      "address": null,
      "formatted": null,
      "streetAddress": null,
      "locality": null,
      "region": null,
      "postalCode": null,
      "country": null,
      "createdAt": "2020-09-27T14:23:08+08:00",
      "updatedAt": "2020-09-27T14:27:17+08:00",
      "customData": ""
    }
  }
  ```

- Registration Events

  ```json
  {
    "eventName": "register",
    "data": {
      "id": "5f702fcc913544c358cb2123",
      "arn": "arn:cn:authing:59f86b4832eb28071bdd9214:user:5f702fcc913544c358cb2123",
      "userPoolId": "59f86b4832eb28071bdd9214",
      "username": "xxx",
      "email": null,
      "emailVerified": false,
      "phone": null,
      "phoneVerified": false,
      "unionid": "35447896",
      "openid": "35447896",
      "identities": [],
      "nickname": "xxxx",
      "registerSource": ["social:github"],
      "photo": "https://avatars2.githubusercontent.com/u/35447896?v=4",
      "password": null,
      "oauth": "",
      "token": "",
      "tokenExpiredAt": "1602484037172",
      "loginsCount": 4,
      "lastLogin": "1601188037190",
      "lastIP": null,
      "signedUp": "2020-09-27T14:23:08+08:00",
      "blocked": false,
      "isDeleted": false,
      "device": null,
      "browser": null,
      "company": "Authing",
      "name": null,
      "givenName": null,
      "familyName": null,
      "middleName": null,
      "profile": "",
      "preferredUsername": null,
      "website": null,
      "gender": "U",
      "birthdate": null,
      "zoneinfo": null,
      "locale": null,
      "address": null,
      "formatted": null,
      "streetAddress": null,
      "locality": null,
      "region": null,
      "postalCode": null,
      "country": null,
      "createdAt": "2020-09-27T14:23:08+08:00",
      "updatedAt": "2020-09-27T14:27:17+08:00",
      "customData": ""
    }
  }
  ```

- Change Password Event

  ```json
  {
    "eventName": "user:password-changed",
    "data": {
      "userId": "5f702fcc913544c358cb2123"
    }
  }
  ```

- Modify user information event

  ```json
  {
    "eventName": "user:updated",
    "data": {
      "user": {
        "id": "5f702fcc913544c358cb2123",
        "arn": "arn:cn:authing:59f86b4832eb28071bdd9214:user:5f702fcc913544c358cb2123",
        "userPoolId": "59f86b4832eb28071bdd9214",
        "username": "xxx",
        "email": null,
        "emailVerified": false,
        "phone": null,
        "phoneVerified": false,
        "unionid": "35447896",
        "openid": "35447896",
        "identities": [],
        "nickname": "xxxx",
        "registerSource": ["social:github"],
        "photo": "https://avatars2.githubusercontent.com/u/35447896?v=4",
        "password": null,
        "oauth": "",
        "token": "",
        "tokenExpiredAt": "1602484037172",
        "loginsCount": 4,
        "lastLogin": "1601188037190",
        "lastIP": null,
        "signedUp": "2020-09-27T14:23:08+08:00",
        "blocked": false,
        "isDeleted": false,
        "device": null,
        "browser": null,
        "company": "Authing",
        "name": null,
        "givenName": null,
        "familyName": null,
        "middleName": null,
        "profile": "",
        "preferredUsername": null,
        "website": null,
        "gender": "U",
        "birthdate": null,
        "zoneinfo": null,
        "locale": null,
        "address": null,
        "formatted": null,
        "streetAddress": null,
        "locality": null,
        "region": null,
        "postalCode": null,
        "country": null,
        "createdAt": "2020-09-27T14:23:08+08:00",
        "updatedAt": "2020-09-27T14:27:17+08:00",
        "customData": ""
      },
      "updates": {
        "nickname": "xxxx"
      }
    }
  }
  ```

- User mailbox verification event

```json
{
  "eventName": "user:email-verified",
  "data": {
    "userId": "xxxxx",
    "email": "xxxx"
  }
}
```

- MFA verification event

```json
{
  "eventName": "mfaVerify",
  "data": {
    "userId": "xxxxx",
    "isValid": true // 是否验证通过
  }
}
```

- Adding authorization event

```json
{
  "eventName": "permission:add",
  "data": {
    "userPoolId": "xxxxx",
    "policies": ["xxxx"], // 授权的策略 ID 列表
    "targetType": "USER", // 授权对象类型，USER | ROLE | GROUP | ORG
    "targetIdentifiers": ["xxxx"], // 授权对象 ID 列表，如 用户 ID
    "namespace": "xxxx" // 授权的策略所属的权限组
  }
}
```

- Cancellation of authorization events

```json
{
  "eventName": "permission:revoke",
  "data": {
    "userPoolId": "xxxxx",
    "policies": ["xxxx"], // 授权的策略 ID 列表
    "targetType": "USER", // 授权对象类型，USER | ROLE | GROUP | ORG
    "targetIdentifiers": ["xxxx"], // 授权对象 ID 列表，如 用户 ID
    "namespace": "xxxx" // 授权的策略所属的权限组
  }
}
```
