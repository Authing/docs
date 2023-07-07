# 浏览器指纹模块

<LastUpdated/>

> 此模块主要用来管理 浏览器指纹 相关操作，快速使用浏览器指纹相关数据接口以及功能。

使用方法：

```javascript
import { AuthenticationClient } from 'authing-js-sdk';
const authenticationClient = new AuthenticationClient({
  appId: "AUTHING_APP_ID",
  appHost: 'https://{YOUR_DOMAIN}.authing.cn',
});

authenticationClient.browserFingerprint.getBrowserFingers; // 获取指纹信息 & 设备 id
authenticationClient.browserFingerprint.createDevice; // 浏览器设备上报
authenticationClient.browserFingerprint.myDevicesList; // 用户中心 - 列表
authenticationClient.browserFingerprint.myDevicesUnbind; // 用户中心 - 移除设备
authenticationClient.browserFingerprint.myDevicesLogout; // 用户中心 - 登出设备

```


## 获取指纹信息 & 设备 id

#### 示例

```js
import { AuthenticationClient } from "authing-js-sdk";

const authenticationClient = new AuthenticationClient({
  appId: "AUTHING_APP_ID",
  appHost: 'https://{YOUR_DOMAIN}.authing.cn',
});

const { browserId, deviceFingers } =  await authenticationClient.browserFingerprint.getBrowserFingers();

const {
  userAgentFingerprint, //浏览器用户代理指纹
  audioFingerprint, //音频设置和硬件特征指纹
  canvasFingerprint, //2D图像和动画绘制特征指纹
  screenResolutionFingerprint, //浏览器分辨率指纹
  webglFingerprint, //显卡及驱动程序指纹
  fontsFingerprint, //字体及输入设备特征指纹
  pluginsFingerprint, //浏览器预装插件指纹信息
} = deviceFingers;

console.log(browserId); //浏览器设备id
```

## 浏览器设备上报
#### 示例

```js
await authenticationClient.browserFingerprint.createDevice()
```

#### 返回值

```json
boolean : true / false
```


## 订阅设备事件

#### 示例

```js
import { AuthenticationClient } from "authing-js-sdk";
 
const authenticationClient = new AuthenticationClient( {
    appId: "AUTHING_APP_ID",
    appHost: 'https://{YOUR_DOMAIN}.authing.cn',
    socketUri:'YOUR_SOCKET_URL',
    token:'YOUR_TOKEN',
 });
 
//获取设备id
const { browserId } =  await authenticationClient.browserFingerprint.getBrowserFingers();
//事件监听
authenticationClient. event.sub(
  'authing.device.force-logout',
  (msgDataStr: string) => {
    const msgData = JSON.parse(msgDataStr);
    const { appId: msgAppid, logoutType, deviceId } = msgData;
    //对比必须是当前 appid 和当前设备
    if (msgAppid === appId && deviceId === browserId) {
            switch (logoutType) {
              case 0:
                console.log('使其他设备登出')
                break;
              case 1:
                console.log('个人中心 - 设备解绑')
                break;
              case 2:
                console.log('用户列表 - 个人详情 - 挂起设备')
                break;
              case 3:
                console.log('设备管理 - 挂起设备')
                break;
              case 4:
                console.log('用户列表 - 个人详情 - 禁用设备')
                break;
              case 5:
                console.log('设备管理 - 禁用设备')
                break;
              case 6:
                console.log('用户列表 - 个人详情 - 移除设备（解绑）')
                break;
              case 7:
                console.log('设备管理 - 删除设备')
                break;
              default:
                break;
            }
    }
  },
  () => {}
);
```

## 用户中心 - 列表
#### 示例

```js
import { AuthenticationClient } from "authing-js-sdk";

const authenticationClient = new AuthenticationClient({
    appId: "AUTHING_APP_ID",
    appHost: 'https://{YOUR_DOMAIN}.authing.cn',
});

const list = await authenticationClient.browserFingerprint.myDevicesList()
```

#### 示例数据

```json
[
  {
    "device": {
      "name": "chrome/114.0.0.0",
      "type": "Browser",
      "status": "activated",
      "os": "Mac OS",
      "version": "114.0.0.0",
      "mod": null,
      "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
      "deviceId": "47a5d2ab86d90e6d2a8b7efcba939eec"
    },
    "lastLoginTime": "2023-07-06T02:25:08.879Z",
    "lastIp": "49.7.66.98",
    "online": true
  }
]
```


## 用户中心 - 移除设备
#### 参数

- `deviceUniqueId` \<string\> 当前用户的设备唯一标识

#### 示例

```js
await authenticationClient.browserFingerprint.myDevicesUnbind('47a5d2ab86d90e6d2a8b7efcba939eec')
```

#### 返回值

```json
boolean : true / false
```

## 用户中心 - 登出设备
#### 参数

- `deviceUniqueId` \<string\> 当前用户的设备唯一标识

#### 示例

```js
 await authenticationClient.browserFingerprint.myDevicesLogout('47a5d2ab86d90e6d2a8b7efcba939eec')
```

#### 返回值

```json
boolean : true / false
```
