# 上传头像

----------

#### Authing.selectAvatarFile(cb)

- **参数:**

  - ```{function} cb```

- **使用方法:**

  - ``` javascript
	Authing.selectAvatarFile(cb);
  	```
- **结果:**

  - 此API会打开文件选择窗口供用户选择文件, 用户选取文件后, 会调用cb, 并把文件对象作为参数传入cb函数。可将此文件对象作为photo参数传入[update](/user_service/update_user.md)。