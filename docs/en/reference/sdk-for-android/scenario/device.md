

# Device management

<LastUpdated/>

First make sure it's done [quick start](./quick.md)。

:::hint-info
This feature was added in android guard sdk 1.5.7 version.
:::

<br>

Device management is performed by the `DeviceManager` class, which encapsulates the device management API for ease of use.

## Reporting device

:::hint-info
Need to report to device before account login.
:::

Call `createDevice` method to quickly report the device, example:

```java
DeviceManager.getInstance().createDevice(this, new AuthCallback<JSONObject>() {
  @Override
  public void call(int code, String message, JSONObject data) {
      if (code == 10002){
          // Please select and use Authing.init(context, "AUTHING_APP_ID");
      } else if (code == 10029){
          // Please select to apply for READ_PHONE_STATE permission，sdk < 29 need
      } else if (code == 200){
          // success
      }
  }
});
```

You can also report it automatically in the following ways, for example:

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
        // success
    }
});
```

## Get device information

Call the `deviceList` method to get device information, example：

```java
DeviceManager.getInstance().deviceList(1, 50, null, "Android", "", 
                (AuthCallback<ArrayList<DeviceData>>) (code, message, deviceList) -> {
    if (code == 200) {
        // success
    }
});
```

## Off-line device

Call the `logoutByDeviceId` method to go offline, example:

```java
DeviceManager.getInstance().logoutByDeviceId(deviceId, (AuthCallback<JSONObject>) (code, message, data) -> {
    if (code == 200) {
        // success
    }
});
```

## Remove device

Call the `removeDevice` method remove device information，example：

```java
DeviceManager.getInstance().removeDevice(deviceId, (AuthCallback<JSONObject>) (code, message, data) -> {
    if (code == 200) {
        // success
    }
});
```

## Subscribe device event

Call the `subDeviceEvent` method to subscribe to a device event, for example:

```java
DeviceManager.getInstance().subDeviceEvent(new IDeviceReceiver() {
            @Override
            public void onOpen() {
								// Connection successful
            }

            @Override
            public void onReceiverEvent(DeviceEvent deviceEvent) {
                // Receive event message
              	int logoutType = deviceEvent.getLogoutType();
                if (logoutType == DeviceManager.LOGOUT_ANOTHER) {
       							//User side: Personal Center - Log out
                } else if (logoutType == DeviceManager.PROFILE_UNBIND) {
         						//User side: Personal Center - Unbind the device
                } else if (logoutType == DeviceManager.SUSPEND_DEVICE_BY_USER) {
     								//Administrator: User list - Personal Details - Suspend the device
                } else if (logoutType == DeviceManager.SUSPEND_DEVICE) {
     								//Administrator: Manage devices - Suspend devices
                } else if (logoutType == DeviceManager.DISABLE_DEVICE_BY_USER ) {
										//Administrator: User list - Personal Details - Disable devices
                } else if (logoutType == DeviceManager.DISABLE_DEVICE) {
										//Administrator: Manage devices - Disable devices
                } else if (logoutType == DeviceManager.DELETE_DEVICE_BY_USER) {
										//Administrator: User List - Personal Details - Remove Device (Unbind)
                } else if (logoutType == DeviceManager.DELETE_DEVICE) {
										//Administrator: Manage devices - Delete devices
                }
            }

            @Override
            public void onError(String s) {
									// Connection failure
            }
        });
```

## Shutdown device event

Call the `closeDeviceEvent` method to close the device subscription event for a single account, example:

```java
DeviceManager.getInstance().closeDeviceEvent(token);
```

## Disable all device events

Call the `closeAllDeviceEvent` method to close the device subscription event for all accounts as shown in the following example:

```java
DeviceManager.getInstance().closeAllDeviceEvent();
```

