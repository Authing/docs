

# 设备管理

<LastUpdated/>

首先确保已经完成了 [开发准备工作](./quick.md)。

:::hint-info
此功能在 android guard sdk 1.5.7 版本新增。
:::

<br>

设备管理由 `DeviceManager` 类来完成相应的功能操作，对设备管理 API 进行了封装，便于使用。

## 上报设备

:::hint-info
需要在账号登陆之前上报设备。
:::

调用 `createDevice` 方法可以快速上报设备，示例：

```java
DeviceManager.getInstance().createDevice(this, new AuthCallback<JSONObject>() {
  @Override
  public void call(int code, String message, JSONObject data) {
      if (code == 10002){
          // 请选调用 Authing.init(context, "AUTHING_APP_ID");
      } else if (code == 10029){
          // 请选申请 READ_PHONE_STATE 权限，sdk < 29 需要
      } else if (code == 200){
          // 成功
      }
  }
});
```

也可以通过如下方式自主上报，示例：

```java
DeviceInfo deviceInfo = new DeviceInfo();
deviceInfo.setDeviceUniqueId("");
deviceInfo.setName("");
deviceInfo.setVersion("Android 13");
deviceInfo.setHks("");
deviceInfo.setFde("");
deviceInfo.setHor("");
deviceInfo.setType("Mobile");
deviceInfo.setProducer("");
deviceInfo.setMod("");
deviceInfo.setOs("Android");
deviceInfo.setSn("");
deviceInfo.setImei("");
deviceInfo.setMeid("");
deviceInfo.setDescription("");
DeviceManager.getInstance().createDevice(deviceInfo, (AuthCallback<JSONObject>) (code, message, data) -> {
    if (code == 200 && data != null) {
        // 成功
    }
});
```

## 获取设备信息

调用 `deviceList` 方法获取设备信息，示例：

```java
DeviceManager.getInstance().deviceList(1, 50, null, "Android", "", 
                (AuthCallback<ArrayList<DeviceData>>) (code, message, deviceList) -> {
    if (code == 200) {
        // 成功
    }
});
```

## 下线设备

调用 `logoutByDeviceId` 方法下线设备，示例：

```java
DeviceManager.getInstance().logoutByDeviceId(deviceId, (AuthCallback<JSONObject>) (code, message, data) -> {
    if (code == 200) {
        // 成功
    }
});
```

## 移除设备

调用 `removeDevice` 方法移除设备信息，示例：

```java
DeviceManager.getInstance().removeDevice(deviceId, (AuthCallback<JSONObject>) (code, message, data) -> {
    if (code == 200) {
        // 成功
    }
});
```

## 订阅设备事件

调用 `subDeviceEvent` 方法订阅设备事件，示例：

```java
DeviceManager.getInstance().subDeviceEvent(new IDeviceReceiver() {
            @Override
            public void onOpen() {
								// 连接成功
            }

            @Override
            public void onReceiverEvent(DeviceEvent deviceEvent) {
                // 接收事件消息
              	int logoutType = deviceEvent.getLogoutType();
                if (logoutType == DeviceManager.LOGOUT_ANOTHER) {
       							//用户侧： 个人中心 - 退出登录
                } else if (logoutType == DeviceManager.PROFILE_UNBIND) {
         						//用户侧： 个人中心 - 设备解绑
                } else if (logoutType == DeviceManager.SUSPEND_DEVICE_BY_USER) {
     								//管理员侧： 用户列表 - 个人详情 - 挂起设备
                } else if (logoutType == DeviceManager.SUSPEND_DEVICE) {
     								//管理员侧： 设备管理 - 挂起设备
                } else if (logoutType == DeviceManager.DISABLE_DEVICE_BY_USER ) {
										//管理员侧： 用户列表 - 个人详情 - 禁用设备
                } else if (logoutType == DeviceManager.DISABLE_DEVICE) {
										//管理员侧： 设备管理 - 禁用设备
                } else if (logoutType == DeviceManager.DELETE_DEVICE_BY_USER) {
										//管理员侧： 用户列表 - 个人详情 - 移除设备（解绑）
                } else if (logoutType == DeviceManager.DELETE_DEVICE) {
										//管理员侧： 设备管理 - 删除设备
                }
            }

            @Override
            public void onError(String s) {
									// 连接失败
            }
        });
```

## 关闭设备事件

调用 `closeDeviceEvent` 方法关闭单个账号的设备订阅事件，示例：

```java
DeviceManager.getInstance().closeDeviceEvent(token);
```

## 关闭所有设备事件

调用 `closeAllDeviceEvent` 方法关闭所有账号的设备订阅事件，示例：

```java
DeviceManager.getInstance().closeAllDeviceEvent();
```

