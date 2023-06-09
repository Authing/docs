# 设备管理 API

<LastUpdated/>

## 上报设备

```java
public static void createDevice(DeviceInfo deviceInfo, @NotNull AuthCallback<JSONObject> callback)
```

**参数**

* `deviceInfo` 设备信息

**示例**

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
AuthClient.createDevice(deviceInfo, (AuthCallback<JSONObject>) (code, message, data) -> {
    if (code == 200 && data != null) {
        // 成功
    }
});
```

<br>

## 获取设备信息

```java
public void deviceList(int page, int limit, DeviceStatus deviceStatus, String os, String keyword, @NotNull AuthCallback<ArrayList<DeviceData>> callback) 
```

**参数**

* `page` 页数
* `limit` 限制
* `deviceStatus` 设备状态
* `os` 设备系统
* `keyword` 

**示例**

```java
AuthClient.deviceList(1, 50, null, "Android", "", (AuthCallback<JSONObject>) (code, message, data) -> {
    if (code == 200 && data != null) {
        // 成功
    }
});
```

<br>

## 下线设备

```java
public static void logoutByDeviceId(String deviceId, @NotNull AuthCallback<JSONObject> callback)
```

**参数**

* `deviceId` 设备ID

**示例**

```java
AuthClient.logoutByDeviceId("", (AuthCallback<JSONObject>) (code, message, data) -> {
    if (code == 200 && data != null) {
        // 成功
    }
});
```

<br>

## 移除设备

```java
public static void removeDevice(String deviceId, @NotNull AuthCallback<JSONObject> callback)
```

**参数**

* `deviceId` 设备ID

**示例**

```java
AuthClient.removeDevice("", (AuthCallback<JSONObject>) (code, message, data) -> {
    if (code == 200 && data != null) {
        // 成功
    }
});
```

