# 检测用户登录状态

----------

若使用 ```JavaScript``` 调用，需要使用 ```then().catch()``` 捕获结果和错误。

#### Authing.checkLoginStatus(token)

- **参数:**

  - ```{String} token```
    - 此参数客户端可选，服务端必选，可将 token 字符串传入以检查此 token 是否可以使用，若不传入，则默认使用 Authing SDK 当前状态下维护的 token

- **使用方法:**

  - ``` javascript
	Authing.checkLoginStatus();
  	```

- **返回数据:**

  - ``` javascript
{
        status: true,
        message: '已登录'
    }
    ```

    当 status 为 false 时，有三种情况，分别返回：
  - ``` javascript
{
        status: false,
        code: 2020,
        message: '未登录'
    }
 
    ```
    或
    
  - ``` javascript
{
        status: false,
        code: 2206,
        message: '登录信息已过期'
    }
 
    ```
    或

   ``` javascript
{
        status: false,
        code: 2207,
        message: '登录信息有误'
    }
 
    ```