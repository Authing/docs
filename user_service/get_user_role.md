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
      "totalCount": 2,
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

#### Authing.queryRoles(options)

- **参数:**

  - ```{Object} options```
    - page: 第几页，选填，默认为 1
    - count: 总数，选填，默认为 10

- **使用方法:**

  - ``` javascript
	Authing.queryRoles({
      page: 1,
      count: 10
  });
  	```

- **返回数据:**

  - ``` javascript
    {
      "totalCount": 1,
      "list": [
        {
          "_id": "5ca5c3a88a61c7304fb1299a",
          "name": "管理员",
          "client": "5c9c659cb9440b05cb2570e6",
          "descriptions": null,
          "createdAt": "Thu Apr 04 2019 16:43:20 GMT+0800 (CST)",
          "permissions": "{\"routes\": \"/api/v1\"}"
        }
      ]
    }
    ```

## 创建用户角色

#### Authing.createRole(options)

- **参数:**

  - ```{Object} options```
    - name: 角色名称，必填
    - descriptions: 角色描述，必填

- **使用方法:**

  - ``` javascript
	Authing.createRole({
        name: '测试角色',
        descriptions: '测试角色的描述'
  });
  	```

- **返回数据:**

  - ``` javascript
    {
      "_id": "5ca5c5dd8a61c7ffbfb129a9",
      "name": "测试角色",
      "client": "5c9c659cb9440b05cb2570e6",
      "descriptions": "测试角色的描述"
    }
    ```

## 修改角色权限

#### Authing.updateRolePermissions(options)

- **参数:**

  - ```{Object} options```
    - name: 角色名称，必填
    - roleId: 角色 ID，必填
    - permissions: 角色权限，必填。输入自定义的权限字符串，可以是 JSON 或数组；之后可以通过 API 获取此处设置的权限既而实现自己的业务逻辑。

- **使用方法:**

  - ``` javascript
	Authing.updateRolePermissions({
      name: '测试角色',
      roleId: '5ca5c5dd8a61c7ffbfb129a9',
      permissions: 'route:all'
  });
  	```

- **返回数据:**

  - ``` javascript
    {
      "_id": "5ca5c5dd8a61c7ffbfb129a9",
      "name": "测试角色",
      "client": "5c9c659cb9440b05cb2570e6",
      "descriptions": "测试角色的描述",
      "permissions": "route:all"
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

#### Authing.removeUserFromRole(options)

- **参数:**

  - ```{Object} options```
    - roleId: 角色 ID，必填
    - user: 要指派的用户 ID，必填

- **使用方法:**

  - ``` javascript
	Authing.removeUserFromRole({
      user: '5ca332d265520f3d751b0f63',
      roleId: '5ca5c5dd8a61c7ffbfb129a9',
  });
  	```

- **返回数据:**

  - ``` javascript
    {
      "_id": null,
      "client": null,
      "group": null,
      "user": null
    }
    ```