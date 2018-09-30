# 上传头像

**!!!important!!!**
此方法仅 JavaScript 客户端可用

----------

若使用 ```JavaScript``` 调用，需要使用 ```then().catch()``` 捕获结果和错误。

#### Authing.selectAvatarFile(cb)

- **参数:**

  - ```{function} cb```

- **使用方法:**

  - ``` javascript
	Authing.selectAvatarFile(cb);
  	```
- **结果:**

  - 此API会打开文件选择窗口供用户选择文件, 用户选取文件后, 会调用 cb, 并把文件对象作为参数传入 cb 函数。可将此文件对象作为 photo 参数传入[update](/user_service/update_user.md)。