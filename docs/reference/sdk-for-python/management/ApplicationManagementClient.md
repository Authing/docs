---
meta:
  - name: description
    content: 管理应用与协议 - Python SDK
---

# 管理应用

<LastUpdated/>

此模块用于管理 {{$localeConfig.brandName}} 应用，包含对应用的管理，对应用协议的管理，对应用资源的管理及应用使用情况。

> 初始化模块

```python
from authing.v2.management import ManagementClient, ManagementClientOptions

management_client = ManagementClient(
  options=ManagementClientOptions(
    user_pool_id='AUTHING_USERPOOL_ID',
    secret='AUTHING_USERPOOL_SECRET',
))

management.applications.list() # 应用列表
management.applications.create() # 创建应用
...
```

## 创建应用

> 创建应用

```python
def create(self, name, identifier, redirect_uris, logo=None)
```

#### 参数

- `name` \<str\> 应用名称
- `identifier` \<str\> 应用唯一标志符
- `redirect_uris` \<list\> 回调链接
- `logo` \<str\> Logo 图标地址

#### 示例

```python
management.applications.create(
    name='name',
    identifier='appcode',
    redirect_uris=['https://www.authing.cn']
)
```

#### 示例数据

```json
{
  "oidcJWEConfig": null,
  "disabledOidcConnections": null,
  "protocol": "oidc",
  "adConnections": null,
  "casConfig": null,
  "oidcProviderEnabled": true,
  "isDemo": false,
  "isOfficial": false,
  "updatedAt": "2021-09-23T03:29:52.195Z",
  "logo": "default-app-logo.png",
  "enableDeviceMutualExclusion": false,
  "id": "614bf4af279893d5ab64",
  "createdAt": "2021-09-23T03:29:52.195Z",
  "registerTabs": null,
  "disabledCasConnections": null,
  "disabledSocialConnections": null,
  "isIntegrate": false,
  "oauthProviderEnabled": false,
  "userPoolId": "61384d3e302f1f75e69c",
  "jwks": {
    "keys": [
      {
        "use": "sig",
        "e": "AQAB",
        "d": "SsOSG0qbvl1UGJtX8K6yfQ3ntkNLOf9liVzzAXxHYYO18PxTOQcj2UfUUL3s8-puuWFsdVw0w2MakjR9ImloE9aKj_qEI_9sLyy2tJuuG0NsIkU1ZkSseguXRPqVJ0ZzbhqCRRHxdYZobjqbwcZjaJ4G20itx8PV74ww7XssdUsBTD5rVKWCow-P_DEhdNxDVlrBWbcdUZyyCd49SKSdFQRYaiZ3Q7Cz0kJfckU6Jmebqrnqc7RAyHo6dHFR30XnbZ3IebQGQwJJr6rWVOCa1XYzq05UuX_5ms8gsV3--i5BRGOav1JW_fzes1bEhprRGXS89YG9IGdDS1NQB8HUAQ",
        "alg": "RS256",
        "n": "uM7BRo-IDDcPl94_yRDIfMEyjITCl8rtmBJFpANyHjagWSmqhaM3vv7AIin60rMPdPXPzn4G0B3MAeIoXoiwogwD9r2yJFH_WWQUXeobn85TWDKra9NDUQB3bSzGRH5IhOtA7hwzF68ax_9mtfPJkjqukTxUPXbPTPdh0XEEyLkQ_ymJKUUj1ktHvLzdz5SuihKmXCuH3UrT7ZLEvGuyfIQfb9ooksElyGZ7xS57KdyrFpUGJqpgXcFAy_jrmViB0vbTYltIte9N5hBZEFvl9iT-DBNMnofQ-9Fxqj_hC4btxaNLzuLsRFzc0OF9MVT4g5BUwr_2OJRYdirVjlVWkQ",
        "q": "0wuqid6BM5M-YP3iqNVOw-AFjVKoQ1rlNss6qgCWKi0IxPIXr_z0f6ExX5Sktlyy4VS1WQ6mABOwW7u4r5GtkmU84b4abPRO62tYUsOVzYuUrZ5f1gIMh32QrHkeQ32Qe4E6ki3Yj-8lkUlZrJQNmm1WtxJRIFMF45Wy7PQ7klE",
        "p": "4CxU-GgtkYjZXmaM6EN-ml8kTZuKSXSoJQC9ZnlE5MRNIy3P5eUo0RyJPhgQc4OeWa5ao5YwsNlTnaw_5zWGRpNN1qY_S2d54_2sWdffoyhTYEwoRueEurKvi2rdijPzV7LGOChEUglrqRwgVjJR55mNkVjPmSbVoZYfrnvmMEE",
        "kty": "RSA",
        "qi": "qJlp7WGScpkaBerQSfi4YQL7MfPu6fwnDYZFZSkKRLMmLemz5mVI98-YzPongTriYcg6aTATNRz_AP3in-JVsIFCiy5UzWGiS8cogXOZx9_ax3aDJqO4vDb2uXF4NiArDhg_clSqw6LLYuqrXEsMzq65Qt3neoyLSiNhVsaOdUM",
        "kid": "7A5VN-RRhynlRZxGazbbxiKFL9UeSaakf1xVPJPNUTE",
        "dp": "2PgveYojaLPCZ0rsYLVK6RDi6zZ7HuOJBt9zcaY4Fw8j9cOWb9Vfrx1mfDIAYj1m2zgUxDZOhCykcHxSEW9NuitCcFnR8yKA6DkTQpXc_2a9Y_vyE8ZrQeRGYbMaH3Rut1fx4FKg5aH2kOQHLEZh3b5SNfZ2X64loNLTcSa8QcE",
        "dq": "tFI3eG1A_4xDtCO5UoBPOFVk6QdC9anoRxUGHtM5evfXkk83pgr_7T0RLpWW1qoFvTnfaSR2-YHZIcgXWQujvn35svf3JDjqZYPmh3DNwj4M3vt-7x_5DJtgzbz--rOCi8QzA0tgyjqPYr_FewtVRCk_-lQQNQo68eWqZ4OWksE"
      }
    ]
  },
  "oauthConfig": {
    "introspection_endpoint_auth_method": "client_secret_post",
    "redirect_uris": ["https://www.authing.cn"],
    "access_token_lifetime": 1209600,
    "refresh_token_lifetime": 2592000,
    "grants": ["authorization_code"],
    "revocation_endpoint_auth_method": "client_secret_post",
    "client_secret": "4e432aee82e1fb8259d808c5bdf6",
    "id": "614bf4af279893d5ab64"
  },
  "extendsFields": null,
  "skipMfa": false,
  "ssoPageCustomizationSettings": null,
  "secret": "4e432aee82e1fb8259d808c5bdf6",
  "isDeleted": false,
  "template": null,
  "css": "/* \n  Edit login page css\n  eg\uff1a\n  .authing-guard-layout {\n    background: black !important;\n  }\n  Change the background color\n*/",
  "extendsFieldsEnabled": false,
  "ssoEnabled": false,
  "samlConfig": null,
  "description": null,
  "samlProviderEnabled": false,
  "enableSubAccount": false,
  "disabledOauth2Connections": null,
  "loginRequireEmailVerified": false,
  "disabledSamlConnections": null,
  "oidcConfig": {
    "token_endpoint_auth_method": "client_secret_post",
    "cas_expire": 1209600,
    "refresh_token_expire": 2592000,
    "jwks_uri": null,
    "request_object_encryption_enc": null,
    "userinfo_encrypted_response_alg": null,
    "jwks": null,
    "userinfo_encrypted_response_enc": null,
    "skip_consent": true,
    "grant_types": ["authorization_code", "password", "refresh_token"],
    "authorization_code_expire": 600,
    "userinfo_signed_response_alg": null,
    "access_token_expire": 1209600,
    "id_token_signed_response_alg": "HS256",
    "response_types": ["code"],
    "request_object_signing_alg": null,
    "id_token_encrypted_response_enc": null,
    "id_token_encrypted_response_alg": null,
    "id_token_expire": 1209600,
    "request_object_encryption_alg": null
  },
  "defaultLoginTab": "password",
  "redirectUris": ["https://www.authing.cn"],
  "showAuthorizationPage": false,
  "casProviderEnabled": false,
  "identifier": "python-sdk-unittest-gllr",
  "name": "python sdk unittest mqhd",
  "qrcodeScanning": {
    "redirect": false,
    "interval": 1500
  },
  "disabledAzureAdConnections": null,
  "agreementEnabled": false,
  "ext": null,
  "registerDisabled": false,
  "isDefault": false,
  "ldapConnections": null,
  "passwordTabConfig": null,
  "permissionStrategy": {
    "defaultStrategy": "ALLOW_ALL",
    "denyPolicyId": null,
    "enabled": false,
    "allowPolicyId": null
  },
  "logoutRedirectUris": null,
  "loginTabs": null,
  "defaultRegisterTab": "email"
}
```

## 获取应用列表

> 获取应用列表

```python
def list(self, page=1, limit=10)
```

#### 参数

- `page` \<int\> 页码，默认为 1
- `limit` \<int\> 每页个数，默认为 10

#### 示例

```python
management.applications.list()
```

#### 示例数据

```json
{
  "totalCount": 1,
  "list": [
    {
      "oidcJWEConfig": null,
      "isOfficial": false,
      "protocol": "oidc",
      "adConnections": [],
      "casConfig": null,
      "isDemo": false,
      "updatedAt": "2021-09-23T03:29:52.195Z",
      "logo": "https://files.authing.co/authing-console/default-app-logo.png",
      "enableDeviceMutualExclusion": false,
      "id": "614bf4af279893d5ab64",
      "isDeleted": false,
      "registerTabs": ["email", "phone"],
      "disabledCasConnections": [],
      "ssoPageCustomizationSettings": null,
      "isIntegrate": false,
      "oauthProviderEnabled": false,
      "userPoolId": "61384d3e302f1f75e69c",
      "jwks": {
        "keys": [
          {
            "use": "sig",
            "e": "AQAB",
            "d": "SsOSG0qbvl1UGJtX8K6yfQ3ntkNLOf9liVzzAXxHYYO18PxTOQcj2UfUUL3s8-puuWFsdVw0w2MakjR9ImloE9aKj_qEI_9sLyy2tJuuG0NsIkU1ZkSseguXRPqVJ0ZzbhqCRRHxdYZobjqbwcZjaJ4G20itx8PV74ww7XssdUsBTD5rVKWCow-P_DEhdNxDVlrBWbcdUZyyCd49SKSdFQRYaiZ3Q7Cz0kJfckU6Jmebqrnqc7RAyHo6dHFR30XnbZ3IebQGQwJJr6rWVOCa1XYzq05UuX_5ms8gsV3--i5BRGOav1JW_fzes1bEhprRGXS89YG9IGdDS1NQB8HUAQ",
            "alg": "RS256",
            "n": "uM7BRo-IDDcPl94_yRDIfMEyjITCl8rtmBJFpANyHjagWSmqhaM3vv7AIin60rMPdPXPzn4G0B3MAeIoXoiwogwD9r2yJFH_WWQUXeobn85TWDKra9NDUQB3bSzGRH5IhOtA7hwzF68ax_9mtfPJkjqukTxUPXbPTPdh0XEEyLkQ_ymJKUUj1ktHvLzdz5SuihKmXCuH3UrT7ZLEvGuyfIQfb9ooksElyGZ7xS57KdyrFpUGJqpgXcFAy_jrmViB0vbTYltIte9N5hBZEFvl9iT-DBNMnofQ-9Fxqj_hC4btxaNLzuLsRFzc0OF9MVT4g5BUwr_2OJRYdirVjlVWkQ",
            "q": "0wuqid6BM5M-YP3iqNVOw-AFjVKoQ1rlNss6qgCWKi0IxPIXr_z0f6ExX5Sktlyy4VS1WQ6mABOwW7u4r5GtkmU84b4abPRO62tYUsOVzYuUrZ5f1gIMh32QrHkeQ32Qe4E6ki3Yj-8lkUlZrJQNmm1WtxJRIFMF45Wy7PQ7klE",
            "p": "4CxU-GgtkYjZXmaM6EN-ml8kTZuKSXSoJQC9ZnlE5MRNIy3P5eUo0RyJPhgQc4OeWa5ao5YwsNlTnaw_5zWGRpNN1qY_S2d54_2sWdffoyhTYEwoRueEurKvi2rdijPzV7LGOChEUglrqRwgVjJR55mNkVjPmSbVoZYfrnvmMEE",
            "kty": "RSA",
            "qi": "qJlp7WGScpkaBerQSfi4YQL7MfPu6fwnDYZFZSkKRLMmLemz5mVI98-YzPongTriYcg6aTATNRz_AP3in-JVsIFCiy5UzWGiS8cogXOZx9_ax3aDJqO4vDb2uXF4NiArDhg_clSqw6LLYuqrXEsMzq65Qt3neoyLSiNhVsaOdUM",
            "kid": "7A5VN-RRhynlRZxGazbbxiKFL9UeSaakf1xVPJPNUTE",
            "dp": "2PgveYojaLPCZ0rsYLVK6RDi6zZ7HuOJBt9zcaY4Fw8j9cOWb9Vfrx1mfDIAYj1m2zgUxDZOhCykcHxSEW9NuitCcFnR8yKA6DkTQpXc_2a9Y_vyE8ZrQeRGYbMaH3Rut1fx4FKg5aH2kOQHLEZh3b5SNfZ2X64loNLTcSa8QcE",
            "dq": "tFI3eG1A_4xDtCO5UoBPOFVk6QdC9anoRxUGHtM5evfXkk83pgr_7T0RLpWW1qoFvTnfaSR2-YHZIcgXWQujvn35svf3JDjqZYPmh3DNwj4M3vt-7x_5DJtgzbz--rOCi8QzA0tgyjqPYr_FewtVRCk_-lQQNQo68eWqZ4OWksE"
          }
        ]
      },
      "oauthConfig": {
        "introspection_endpoint_auth_method": "client_secret_post",
        "redirect_uris": ["https://www.authing.cn"],
        "access_token_lifetime": 1209600,
        "refresh_token_lifetime": 2592000,
        "grants": ["authorization_code"],
        "revocation_endpoint_auth_method": "client_secret_post",
        "client_secret": "4e432aee82e1fb8259d808c5bdf6",
        "id": "614bf4af279893d5ab64"
      },
      "extendsFields": [],
      "skipMfa": false,
      "oidcProviderEnabled": true,
      "secret": "4e432aee82e1fb8259d808c5bdf6",
      "createdAt": "2021-09-23T03:29:52.195Z",
      "template": null,
      "isDefault": false,
      "extendsFieldsEnabled": false,
      "ssoEnabled": false,
      "samlConfig": null,
      "description": null,
      "disabledSocialConnections": null,
      "samlProviderEnabled": false,
      "enableSubAccount": false,
      "disabledOauth2Connections": [],
      "loginRequireEmailVerified": false,
      "disabledSamlConnections": [],
      "oidcConfig": {
        "token_endpoint_auth_method": "client_secret_post",
        "post_logout_redirect_uris": [],
        "refresh_token_expire": 2592000,
        "cas_expire": 1209600,
        "access_token_expire": 1209600,
        "skip_consent": true,
        "grant_types": ["authorization_code", "password", "refresh_token"],
        "authorization_code_expire": 600,
        "id_token_signed_response_alg": "HS256",
        "redirect_uris": ["https://www.authing.cn"],
        "response_types": ["code"],
        "client_id": "614bf4af279893d5ab64",
        "client_secret": "4e432aee82e1fb8259d808c5bdf6",
        "id_token_expire": 1209600
      },
      "defaultLoginTab": "password",
      "redirectUris": ["https://www.authing.cn"],
      "showAuthorizationPage": false,
      "casProviderEnabled": false,
      "passwordTabConfig": {
        "enabledLoginMethods": [
          "username-password",
          "email-password",
          "phone-password"
        ]
      },
      "name": "python sdk unittest mqhd",
      "qrcodeScanning": {
        "redirect": false,
        "interval": 1500
      },
      "disabledAzureAdConnections": [],
      "agreementEnabled": false,
      "ext": null,
      "registerDisabled": false,
      "css": "/* \n  Edit login page css\n  eg\uff1a\n  .authing-guard-layout {\n    background: black !important;\n  }\n  Change the background color\n*/",
      "disabledOidcConnections": [],
      "ldapConnections": null,
      "identifier": "python-sdk-unittest-gllr",
      "permissionStrategy": {
        "denyPolicyId": null,
        "defaultStrategy": "ALLOW_ALL",
        "enabled": false,
        "allowPolicyId": null
      },
      "logoutRedirectUris": [],
      "loginTabs": ["phone-code", "password"],
      "defaultRegisterTab": "email"
    }
  ]
}
```

## 删除应用

> 删除应用

```python
def delete(self, app_id)
```

#### 参数

- `app_id` \<str\> 应用 ID

#### 示例

```python
management.applications.delete(’appid‘)
```

#### 示例数据

```python
bool
```

## 通过应用 id 查找应用详情

> 通过应用 id 查找应用详情

```python
def find_by_id(self, app_id)
```

#### 参数

- `app_id` \<str\> 应用 ID

#### 示例

```python
management.applications.find_by_id(’appid‘)
```

## 获取资源列表

> 根据筛选条件，查询用户池下的资源列表

```python
def list_resources(self, app_id, page=1, limit=10, resource_type=None)
```

#### 参数

- `app_id` \<str\> 应用 ID
- `resource_type` \<str\> 资源类型，可选值为 `DATA`、`API`、`MENU`、`UI`、`BUTTON`
- `page` \<int\> 页码，默认为 1
- `limit` \<int\> 每页个数，默认为 10

#### 示例

```python
management.applications.list_resources(
    app_id="61384d3ee1b81342e5635",
    resource_type="MENU"
)
```

#### 返回数据

```json
{
  "list": [
    {
      "id": "60646ed1c7a558f935c6d49c",
      "createdAt": "2021-03-31T12:45:05.175Z",
      "updatedAt": "2021-03-31T12:45:05.175Z",
      "userPoolId": "600a8f29cead8fc0127f9da6",
      "code": "pihh4j7j4ehh",
      "actions": [
        {
          "name": "book:write",
          "description": "图书写入操作"
        }
      ],
      "type": "DATA",
      "description": "chair",
      "namespaceId": 22997,
      "apiIdentifier": null,
      "namespace": "600a8f4e37708b363024a3ca"
    }
  ],
  "totalCount": 1
}
```

## 创建资源

> 创建一个资源

```python
def create_resource(self, app_id, code, resource_type, actions, description=None)
```

#### 参数

- `app_id` \<str\> 应用 ID
- `code` \<str\> 资源标识符
- `resource_type` \<str\> 资源类型，可选值为 `DATA`、`API`、`MENU`、`UI`、`BUTTON`
- `actions` \<Array<{ name: str, description: str }>\> 资源操作对象数组。其中 name 为操作名称，填写一个**动词**，description 为操作描述，填写描述信息
- `description` \<str\> 资源描述信息

#### 示例

```python
management_client.applications.create_resource(
  code='book',
  type='DATA',
  description='book',
  actions=[
    {
      name: 'book:write',
      description: '图书写入操作',
    },
  ],
  app_id='600a8f4e37708b363024a3ca',
)
```

#### 返回数据

```json
{
  "userPoolId": "600a8f29cead8fc0127f9da6",
  "code": "book",
  "actions": [
    {
      "name": "book:write",
      "description": "图书写入操作"
    }
  ],
  "type": "DATA",
  "description": "book",
  "namespaceId": 22997,
  "createdAt": "2021-04-06T11:49:07.656Z",
  "updatedAt": "2021-04-06T11:49:07.656Z",
  "id": "606c4ab3d7fb66a8e1517132",
  "apiIdentifier": null
}
```

## 更新资源

> 更新一个资源

```python
def update_resource(self, app_id, code, resource_type=None, actions=None, description=None)
```

#### 参数

- `code` \<str\> 资源标识符
- `app_id` \<str\> 资源所在的权限分组标识
- `type` \<str\> 资源类型，可选值为 `DATA`、`API`、`MENU`、`UI`、`BUTTON`
- `actions` \<Array<{ name: str, description: str }>\> 资源操作对象数组。其中 name 为操作名称，填写一个**动词**，description 为操作描述，填写描述信息
- `description` \<str\> 资源描述信息

#### 示例

```python
updated = management_client.applications.update_resource(
  code='code',
  description='新的描述',
  type='DATA',
  actions=[
    { name: 'write', description: '图书写入操作2' },
    { name: 'read', description: '图书读取操作2' },
  ],
  app_id='600a8f4e37708b363024a3ca',
})
```

#### 返回数据

```json
{
  "id": "606c4ab3d7fb66a8e1517132",
  "createdAt": "2021-04-06T11:49:07.656Z",
  "updatedAt": "2021-04-06T11:59:26.879Z",
  "userPoolId": "600a8f29cead8fc0127f9da6",
  "code": "book",
  "actions": [
    {
      "name": "book:write",
      "description": "图书写入操作2"
    },
    {
      "name": "book:read",
      "description": "图书读取操作2"
    }
  ],
  "type": "DATA",
  "description": "新的描述",
  "namespaceId": 22997,
  "apiIdentifier": null
}
```

## 删除资源

> 删除一个应用下的资源

```python
def delete_resource(self, app_id, code)
```

#### 参数

- `code` \<str\> 资源标识符
- `app_id` \<str\> 应用 ID

#### 示例

```python
managementClient.applications.delete_resource(
  code=code,
  app_id='600a8f4e37708b363024a3ca'
)
```

#### 返回数据

```python
bool
```

## 获取应用访问控制策略列表

> 获取应用访问控制策略列表

```python
def get_access_policies(self, app_id, page=1, limit=10)
```

#### 参数

- `app_id` \<str\> 应用 ID
- `page` \<int\> 页码，默认为 1
- `limit` \<int\> 每页个数，默认为 10

#### 示例

```python
management.applications.get_access_policies("appid")
```

#### 示例数据

```json
{
  "totalCount": 1,
  "list": [
    {
      "targetType": "ORG",
      "code": "ApplicationLoginAccess:DgdAmUIy",
      "assignedAt": "2021-09-16T10:20:26.693Z",
      "namespace": "6139c4d24e78a4d706b754",
      "enabled": true,
      "policyId": "6141af531fad402eac9fd579",
      "targetIdentifier": "6142e08f64d5a8873598e9fb",
      "policy": {
        "isAuto": false,
        "statements": [
          {
            "resourceType": null,
            "condition": [],
            "resource": "arn:cn:authing:61384d3e302f1f75e9ce95a:application:6139c4d24e78a4d706b7545b",
            "effect": "ALLOW",
            "actions": ["application:login"]
          }
        ],
        "description": "\u5141\u8bb8\u767b\u5f55\u5e94\u7528 6139c4d24e78a4d706b7545b",
        "userPoolId": "61384d3e302f1f75e69c",
        "namespaceId": 47319,
        "code": "ApplicationLoginAccess:DgdAmUIny",
        "createdAt": "2021-09-15T08:31:15.899Z",
        "updatedAt": "2021-09-15T08:31:15.899Z",
        "hidden": true,
        "id": "6141af531fad402eac9fd579",
        "isDefault": true
      },
      "inheritByChildren": true,
      "target": {
        "leaderUserId": null,
        "code": "code",
        "name": "add",
        "userPoolId": "61384d3e302f1f75e69c",
        "source": [],
        "sourceData": null,
        "dataVersion": null,
        "__groupid": null,
        "__id": null,
        "order": null,
        "descriptionI18n": null,
        "__parentid": null,
        "orgId": "6142c2c41c6e6c6cc3edf",
        "updatedAt": "2021-09-16T10:20:39.384Z",
        "nameI18n": null,
        "id": "6142e08f64d5a8873598eb",
        "createdAt": "2021-09-16T06:13:35.447Z",
        "description": ""
      }
    }
  ]
}
```

## 创建应用协议

> 创建一个注册协议

```python
def create_agreement(self, app_id, title, required=True, lang="zh-CN")
```

#### 参数

- `app_id` \<str\> 应用 ID
- `title` \<str\> 标题
- `required` \<bool\> 是否必须
- `lang` \<str\> 语言

#### 示例

```python
management.applications.create_agreement("appid",'title')
```

#### 示例数据

```json
{
  "message": "创建成功",
  "code": 200,
  "data": {
    "lang": "zh-CN",
    "userPoolId": "61384d3e302f1f75e69c",
    "title": "title",
    "required": true,
    "id": 218,
    "appId": "6139c4d24e78a4d706bb",
    "order": 2
  }
}
```

## 应用协议列表

> 应用协议列表

```python
def list_agreement(self, app_id)
```

#### 参数

- `app_id` \<str\> 应用 ID

#### 示例

```python
management.applications.list_agreement("appid")
```

#### 示例数据

```json
{
  "message": "获取数据成功",
  "code": 200,
  "data": {
    "totalCount": 1,
    "list": [
      {
        "lang": "zh-CN",
        "userPoolId": "61384d3e302f1f75e69c",
        "title": "cc",
        "required": true,
        "order": 1,
        "appId": "6139c4d24e78a4d706b7",
        "id": 211
      }
    ]
  }
}
```

## 修改应用协议

> 修改应用协议

```python
def modify_agreement(self, app_id, agreement_id, title, required=True, lang="zh-CN")
```

#### 参数

- `app_id` \<str\> 应用 ID
- `agreement_id` \<str\> 协议 ID
- `title` \<str\> 标题
- `required` \<bool\> 是否必须
- `lang` \<str\> 语言

#### 示例

```python
management.applications.modify_agreement("cc","210",'title')
```

#### 示例数据

```json
{
  "message": "修改成功成功",
  "code": 200,
  "data": {
    "lang": "zh-CN",
    "userPoolId": "61384d3e302f1f75e69c",
    "title": "title",
    "required": true,
    "id": 210,
    "appId": "6139c4d24e78a4d706bb",
    "order": 2
  }
}
```

## 删除应用协议

> 删除应用协议

```python
def delete_agreement(self, app_id, agreement_id)
```

#### 参数

- `app_id` \<str\> 应用 ID
- `agreement_id` \<str\> 应用协议 ID

#### 示例

```python
management.applications.delete_agreement("appid", "210")
```

#### 示例数据

```json
{
  "message": "删除成功",
  "code": 200
}
```

## 应用协议排序

> 应用协议排序

```python
def sort_agreement(self, app_id, order)
```

#### 参数

- `app_id` \<str\> 应用 ID
- `order` \<list\> 排序后的应用协议 ID

#### 示例

```python
management.applications.sort_agreement("appid",["210",'110'])
```

#### 示例数据

```json
{
  "message": "排序成功",
  "code": 200
}
```

## 刷新应用密钥

> 刷新应用密钥

```python
def refresh_application_secret(self, app_id)
```

#### 参数

- `app_id` \<str\> 应用 ID

#### 示例

```python
management.applications.refresh_application_secret("appid")
```

#### 示例数据

```json
{
  "message": "刷新应用 secret 成功！",
  "code": 200,
  "data": {
    "oidcJWEConfig": null,
    "isOfficial": false,
    "protocol": "oidc",
    "adConnections": [],
    "casConfig": null,
    "isDemo": false,
    "updatedAt": "2021-09-23T07:13:21.225Z",
    "logo": "https://files.authing.co/authing-console/default-app-logo.png",
    "enableDeviceMutualExclusion": false,
    "id": "6139c4d24e78a4d706b7",
    "isDeleted": false,
    "registerTabs": ["email", "phone"],
    "disabledCasConnections": [],
    "ssoPageCustomizationSettings": null,
    "isIntegrate": false,
    "oauthProviderEnabled": false,
    "userPoolId": "61384d3e302f1f75e69c",
    "jwks": {
      "keys": [
        {
          "use": "sig",
          "e": "AQAB",
          "d": "DSyYiMZcqFQ_plqFTJ1CXcJ0Vs2x3nMPpt9gShVdh6HgnLTfRbBALIPlyEC0PYL_JnpgZW92qff1q-9YB39zbvUes4ZdrhCPpONyhTj5UVWCb2xvguebzLgdQmMM1GIWP8y7kAL9mk01bNr7yj3Qt0EjIEaXiiwvclg-YvGjyvCHRfCPV5181Ia3Rw_zYvFNXNYqvAKEKrKuk-5fZbz0Mw3CzdMkc4vqCvMk7eGnTaO-uaRZZe3ZKBkStf27N4KOwHT1mBd8XCAK0aWfyG2-zU6hLJRTPVEpOxkWyq7RRwB4_oGUUpqEzxY_ll8yaqHLh3nWY0i9Kny1u6eZjxTh-Q",
          "alg": "RS256",
          "n": "xczXb-UbE9FQjzqvxujGLIDqMqyVNbfATdP277vx-6AQzsOIReF-qqu9YmG8rzJM6nLEdf4DBDNa1xB6Y8n7GPU_UcJ9alf0lwZbpeLxLhZj38tjfM-KBM3auqMdHW_DHcrTw5_pUfq0pAE1-Dw6tgkr5KdBFfoc4tVn0Y1TuaXTBlabmQAJgcqc0CUlKfbUnbBbsPGbA2w3yUnOBB74XBoXSRYr-zRQBJ8aZ0IOsqovrkAFoSBMzmGxwR2IKlyBxYyWZU8_x8Q_l3BUsQRCPXuOkUn_G2aVeV3biT9u6FGKH-tLxfgeC_LFVsbNUjgIT5mHBrPu2lQwu2BHCeAbKw",
          "q": "xf779mhxY66ed2CMxILWQOOdN3uraBML-3kxBB2oNM27sBawyaMylLEvvYx5gyefZbAf0jbYeM4iB_-uOlR5O5vKy6srzekJmfU-aqtgOM8fJrUpywZsU5xr_jWrgxn3DUp3vHgzVTfaGXe81gyzt8AtP6plpd3MXOnfRql0j78",
          "p": "_78q8phf8AOkgQ7A4JI1QxPGkmXhBS5CQAfJTQgMfyv1jFh2QjkE3TuN3fAn5X4T-bWw00YyiKQZQnjcYLTDw7p1ms70NNcFx1_leFvDooAMJYQuwkQ5gbdGFwzA6B8vf6ZwwTPqAIJHUN8NNDea04GPecp_o_7TPHv5oOpzz5U",
          "kty": "RSA",
          "qi": "ONZxbv_aFoh7WIBbYthhbg8KkTg6FMmgkNbXPCcSdWwbetVBXH7Xky-rwg2-ZJbc7lalFnTaTeSi64un4G-YMi7css5zstORCGT0K-MWi39WazE2c783oCwtCH5eZs1PnGWty6adpLFx2b2ESymB9h3nPxWF3NHKqCuTqxLUnPg",
          "kid": "JjhmE834pqVVPHQOYxIu244hrNITJw9SmKVddwxSvN8",
          "dp": "juU3j_kHkcnXPq0Jo_DNhb8k8mOuSQDBz5kKJtpacSwUtOgwm2vUhfBioiEviZDahGm6dTIBxks6OePh7r7Rqykh0O_VjzidZ_ry8j8DnmZBYyzqG22XXB0VMofTuV7DYWWUFr90_ffM9SjL7eMrxQXdLsWwb-dQC7mRjxGwx8k",
          "dq": "r3bkFh_C9QMH_mU6-t-0Pjc42bWoVogio05oiOw7Z-g2_7tsGpWdOra3xzRZb0jK8tQdry7Zsl2DPTFyVtELyy6qjsn3_PgbgSwcj22mzVGImsYL7peXopVKAzPO9lUpYsbuy8B-RXREvTMmz07caehOcVBx2odwF5tPOpDr8oM"
        }
      ]
    },
    "oauthConfig": {
      "introspection_endpoint_auth_method": "client_secret_post",
      "redirect_uris": ["https://www.authing.cn"],
      "access_token_lifetime": 1209600,
      "refresh_token_lifetime": 2592000,
      "grants": ["authorization_code"],
      "revocation_endpoint_auth_method": "client_secret_post",
      "id": "6139c4d24e78a4d706b7"
    },
    "extendsFields": [],
    "skipMfa": false,
    "oidcProviderEnabled": true,
    "createdAt": "2021-09-09T08:24:50.150Z",
    "template": null,
    "isDefault": false,
    "extendsFieldsEnabled": false,
    "ssoEnabled": false,
    "samlConfig": null,
    "description": null,
    "disabledSocialConnections": null,
    "samlProviderEnabled": false,
    "enableSubAccount": true,
    "disabledOauth2Connections": [],
    "loginRequireEmailVerified": false,
    "disabledSamlConnections": [],
    "oidcConfig": {
      "token_endpoint_auth_method": "client_secret_post",
      "post_logout_redirect_uris": [],
      "refresh_token_expire": 2592000,
      "cas_expire": 1209600,
      "access_token_expire": 1209600,
      "skip_consent": true,
      "grant_types": ["authorization_code", "password", "refresh_token"],
      "authorization_code_expire": 600,
      "id_token_signed_response_alg": "HS256",
      "redirect_uris": ["https://www.authing.cn"],
      "response_types": ["code"],
      "client_id": "6139c4d24e78a4d706b7b",
      "id_token_expire": 1209600
    },
    "defaultLoginTab": "password",
    "redirectUris": ["https://www.authing.cn"],
    "showAuthorizationPage": false,
    "casProviderEnabled": false,
    "passwordTabConfig": {
      "enabledLoginMethods": [
        "username-password",
        "email-password",
        "phone-password"
      ]
    },
    "name": "python sdk unittest xtgf",
    "qrcodeScanning": {
      "redirect": false,
      "interval": 1500
    },
    "disabledAzureAdConnections": [],
    "agreementEnabled": false,
    "ext": null,
    "registerDisabled": false,
    "css": "/* \n  Edit login page css\n  eg：\n  .authing-guard-layout {\n    background: black !important;\n  }\n  Change the background color\n*/",
    "disabledOidcConnections": [],
    "ldapConnections": null,
    "identifier": "python-sdk-unittest-tlhs",
    "permissionStrategy": {
      "denyPolicyId": "6141af53fd36e046da0e20",
      "defaultStrategy": "ALLOW_ALL",
      "enabled": true,
      "allowPolicyId": "6141af531fad402eac9579"
    },
    "logoutRedirectUris": [],
    "loginTabs": ["phone-code", "password"],
    "defaultRegisterTab": "email"
  }
}
```

## 查看应用下已登录用户

> 查看应用下已登录用户

```python
def active_users(self, app_id, page=1, limit=10)
```

#### 参数

- `app_id` \<str\> 应用 ID
- `page` \<int\> 页码，默认为 1
- `limit` \<int\> 每页个数，默认为 10

#### 示例

```python
management.applications.active_users("appid")
```

#### 示例数据

```json
{
  "message": "获取应用登录态用户列表成功",
  "code": 200,
  "data": {
    "totalCount": 0,
    "list": []
  }
}
```
