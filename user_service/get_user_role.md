# 用户权限管理

----------

若使用 ```JavaScript``` 调用，需要使用 ```then().catch()``` 捕获结果和错误。

你可以在控制台中创建角色、为角色配置权限和为角色指派用户（配置方式请参考：[配置用户角色和权限](/quick_start/user_role.md)），然后使用本页的 API 根据用户 ID 操作用户角色和权限。

## 获取用户权限和角色

#### Authing.queryPermissions(userId)

- **参数:**

  - ```{String} userId```

- **使用方法:**

  - ``` javascript
	Authing.queryPermissions('USER_ID');
  	```

- **返回数据:**

  - ``` javascript
    {
      "totalCount": 0,
      "list": [
        {
          "group": {
            "name": "管理员",
            "permissions": "{\"routes\": \"/api/v1\"}"
          }
        },
        {
          "group": {
            "name": "读者",
            "permissions": ""
          }
        }
      ]
    }
    ```

## 获取应用下所有角色

#### Authing.queryRoles(clientId)

- **参数:**

  - ```{String} clientId```

- **使用方法:**

  - ``` javascript
	Authing.queryRoles('CLIENT_ID');
  	```

- **返回数据:**

  - ``` javascript
    {
      "totalCount": 0,
      "list": [
        {
          "group": {
            "name": "管理员",
            "permissions": "{\"routes\": \"/api/v1\"}"
          }
        },
        {
          "group": {
            "name": "读者",
            "permissions": ""
          }
        }
      ]
    }
    ```

## 新建用户角色

#### Authing.createRole(userId)

- **参数:**

  - ```{String} userId```

- **使用方法:**

  - ``` javascript
	Authing.createRole('USER_ID');
  	```

- **返回数据:**

  - ``` javascript
    {
      "totalCount": 0,
      "list": [
        {
          "group": {
            "name": "管理员",
            "permissions": "{\"routes\": \"/api/v1\"}"
          }
        },
        {
          "group": {
            "name": "读者",
            "permissions": ""
          }
        }
      ]
    }
    ```

## 修改角色权限

#### Authing.updateRolePermissions(userId)

- **参数:**

  - ```{String} userId```

- **使用方法:**

  - ``` javascript
	Authing.updateRolePermissions('USER_ID');
  	```

- **返回数据:**

  - ``` javascript
    {
      "totalCount": 0,
      "list": [
        {
          "group": {
            "name": "管理员",
            "permissions": "{\"routes\": \"/api/v1\"}"
          }
        },
        {
          "group": {
            "name": "读者",
            "permissions": ""
          }
        }
      ]
    }
    ```

## 指派用户到某角色

#### Authing.assignUserToRole(userId)

- **参数:**

  - ```{String} userId```

- **使用方法:**

  - ``` javascript
	Authing.createRole('USER_ID');
  	```

- **返回数据:**

  - ``` javascript
    {
      "totalCount": 0,
      "list": [
        {
          "group": {
            "name": "管理员",
            "permissions": "{\"routes\": \"/api/v1\"}"
          }
        },
        {
          "group": {
            "name": "读者",
            "permissions": ""
          }
        }
      ]
    }
    ```

## 将用户从某角色中移除

#### Authing.removeUserFromRole(userId)

- **参数:**

  - ```{String} userId```

- **使用方法:**

  - ``` javascript
	Authing.createRole('USER_ID');
  	```

- **返回数据:**

  - ``` javascript
    {
      "totalCount": 0,
      "list": [
        {
          "group": {
            "name": "管理员",
            "permissions": "{\"routes\": \"/api/v1\"}"
          }
        },
        {
          "group": {
            "name": "读者",
            "permissions": ""
          }
        }
      ]
    }
    ```