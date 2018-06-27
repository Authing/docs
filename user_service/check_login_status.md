# 检测用户登录状态

----------

#### Authing.checkLoginStatus(token)

- **参数:**

  - ```{String} token```
    - 可选参数，可将token字符串传入以检查此token是否可以使用，若不传入，则默认使用Authing SDK当前状态下维护的token

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

    当status为false时，有三种情况，分别返回：
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