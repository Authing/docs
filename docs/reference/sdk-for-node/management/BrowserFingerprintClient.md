# 管理浏览器指纹

<LastUpdated/>

> 此模块主要用来管理 浏览器指纹 相关操作，快速使用浏览器指纹相关数据接口以及功能。

使用方法：

```javascript
import { ManagementClient } from 'authing-js-sdk'

const managementClient = new ManagementClient({
  userPoolId: 'YOUR_USERPOOL_ID',
  secret: 'YOUR_USERPOOL_SECRET',
})
```


## 管理员设备管理相关功能

### 设备管理 - 列表

#### 参数

- `options.page` \<int\> 分页，获取第几页，默认从 1 开始。
- `options.limit` \<int\> 每页条目数量，默认为 10 个。

#### 示例

```js
const list = await managementClient.browserFingerprint.getDeviceList(options)
```
##### 示例数据

```json
{
    "data": [
      {
        "id": "64a55e45002360ccaaf03a88",
        "name": "chrome/114.0.0.0",//设备名称
        "loginCount": 4, //登录次数
        "os": "Mac OS", //系统
        "pluginsLength": 5, //  浏览器安装插件数量
        "status": "activated", //状态
        "productSub": "20030107", // 浏览器产品其他信息 
        "hks": null, //硬件存储秘钥
        "language": "zh-CN", //语音
        "deviceUniqueId": "4f24fab0d59272eca1365f742d69d9e6", //唯一设备 ID
        "screenWidth": 1920, //显示器宽度
        "metaCreateTime": 1688559173197, //创建时间
        "endTime": null, //挂起结束时间
        "ip": "49.7.66.98", //近登录 IP
        "mimeTypes": "[{\"type\":\"application/pdf\",\"description\":\"Portable Document Format\",\"suffixes\":\"pdf\"},{\"type\":\"text/pdf\",\"description\":\"Portable Document Format\",\"suffixes\":\"pdf\"}]", //浏览器的 MIME 类型数量
        "screenResolutionFingerprint": "72650525657bada16f55bf389ed83e60", //浏览器分辨率
        "webglFingerprint": "f639647c7bbd25bba16201bb4efd9e9e", //显卡及驱动程序指纹
        "description": null, //设备描述
        "onLine": true, //浏览器是否连接到网络
        "meid": null, //设备识别码
        "vendor": "Google", //浏览器厂家信息
        "fontsFingerprint": "6a1c2628518297552aea0012c63767db",  //字体及输入设备特征指纹
        "product": "WebKit",  //浏览器产品名称
        "imei": null, //国际设备识别码
        "canvasFingerprint": "01de172f1e21ac5e5e8b8bd5eafed897",  //2D 图像和动画绘制特征指纹
        "cookie": true, //是否开启 Cookies
        "mod": null, //设备模组
        "producer": null, //设备制造商
        "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36", //浏览器用户代理
        "audioFingerprint": "baa5294f4f33b5d27d5796b3b63c1f15", //音频设置和硬件特征指纹
        "pluginsFingerprint": "51f39c433a012791fdbdea2159a60068", //浏览器预装插件指纹信息
        "sn": null,  //设备序列号
        "screenHeight": 1080, //显示器高度
        "userAgentFingerprint": "0684c9635cd7939d659c26e58c1fb97c", //浏览器用户代理
        "hor": null, //硬件越狱
        "colorDepth": 24, //屏幕设置色彩位数
        "fde": null, //磁盘加密
        "mimeTypesLength": 2, //浏览器的 MIME 类型数量
        "plugins": "[{\"name\":\"PDF Viewer\",\"description\":\"Portable Document Format\"},{\"name\":\"Chrome PDF Viewer\",\"description\":\"Portable Document Format\"},{\"name\":\"Chromium PDF Viewer\",\"description\":\"Portable Document Format\"},{\"name\":\"Microsoft Edge PDF Viewer\",\"description\":\"Portable Document Format\"},{\"name\":\"WebKit built-in PDF\",\"description\":\"Portable Document Format\"}]", //浏览器安装插件信息列表
        "type": "Browser", //设备类型
        "version": "114.0.0.0", //系统版本
        "appCodeName": "Chrome", //浏览器代码名称
        "loginTime": 1688624246308 //最近活跃时间
    }
    ],
    "totalCount": 2 //数量
}
```
### 设备管理 - 详情
#### 示例

```js
const list = await managementClient.browserFingerprint.getDeviceDetails('64a55e45002360ccaaf03a88')
```
##### 示例数据

```json
 {
    "id": "64a55e45002360ccaaf03a88",
    "name": "chrome/114.0.0.0",//设备名称
    "loginCount": 4, //登录次数
    "os": "Mac OS", //系统
    "pluginsLength": 5, //  浏览器安装插件数量
    "status": "activated", //状态
    "productSub": "20030107", // 浏览器产品其他信息 
    "hks": null, //硬件存储秘钥
    "language": "zh-CN", //语音
    "deviceUniqueId": "4f24fab0d59272eca1365f742d69d9e6", //唯一设备 ID
    "screenWidth": 1920, //显示器宽度
    "metaCreateTime": 1688559173197, //创建时间
    "endTime": null, //挂起结束时间
    "ip": "49.7.66.98", //近登录 IP
    "mimeTypes": "[{\"type\":\"application/pdf\",\"description\":\"Portable Document Format\",\"suffixes\":\"pdf\"},{\"type\":\"text/pdf\",\"description\":\"Portable Document Format\",\"suffixes\":\"pdf\"}]", //浏览器的 MIME 类型数量
    "screenResolutionFingerprint": "72650525657bada16f55bf389ed83e60", //浏览器分辨率
    "webglFingerprint": "f639647c7bbd25bba16201bb4efd9e9e", //显卡及驱动程序指纹
    "description": null, //设备描述
    "onLine": true, //浏览器是否连接到网络
    "meid": null, //设备识别码
    "vendor": "Google", //浏览器厂家信息
    "fontsFingerprint": "6a1c2628518297552aea0012c63767db",  //字体及输入设备特征指纹
    "product": "WebKit",  //浏览器产品名称
    "imei": null, //国际设备识别码
    "canvasFingerprint": "01de172f1e21ac5e5e8b8bd5eafed897",  //2D 图像和动画绘制特征指纹
    "cookie": true, //是否开启 Cookies
    "mod": null, //设备模组
    "producer": null, //设备制造商
    "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36", //浏览器用户代理
    "audioFingerprint": "baa5294f4f33b5d27d5796b3b63c1f15", //音频设置和硬件特征指纹
    "pluginsFingerprint": "51f39c433a012791fdbdea2159a60068", //浏览器预装插件指纹信息
    "sn": null,  //设备序列号
    "screenHeight": 1080, //显示器高度
    "userAgentFingerprint": "0684c9635cd7939d659c26e58c1fb97c", //浏览器用户代理
    "hor": null, //硬件越狱
    "colorDepth": 24, //屏幕设置色彩位数
    "fde": null, //磁盘加密
    "mimeTypesLength": 2, //浏览器的 MIME 类型数量
    "plugins": "[{\"name\":\"PDF Viewer\",\"description\":\"Portable Document Format\"},{\"name\":\"Chrome PDF Viewer\",\"description\":\"Portable Document Format\"},{\"name\":\"Chromium PDF Viewer\",\"description\":\"Portable Document Format\"},{\"name\":\"Microsoft Edge PDF Viewer\",\"description\":\"Portable Document Format\"},{\"name\":\"WebKit built-in PDF\",\"description\":\"Portable Document Format\"}]", //浏览器安装插件信息列表
    "type": "Browser", //设备类型
    "version": "114.0.0.0", //系统版本
    "appCodeName": "Chrome", //浏览器代码名称
    "loginTime": 1688624246308 //最近活跃时间
  }
```

### 设备管理 - 设备状态
#### 参数

- `id` \<string\> 当前设备 ID

##### 示例

```js

const list = await authenticationClient.browserFingerprint.getDeviceStatus('64a53f19e32a3349ab5f2d56')
```

##### 示例数据

```json
{
  "status": "activated" // activated
}
```
##### 字段 status 说明


| 值          | 说明          |
| ----------- | ----------   |
| activated   | 已激活，可以使用|
| suspended   | 挂起          |
| deactivated | 停用          |

### 设备管理 - 移除设备
#### 参数

- `id` \<string\> 当前设备 ID

#### 示例

```js
await managementClient.browserFingerprint.delDevice('64a53f19e32a3349ab5f2d56')
```

#### 返回值

```json
boolean : true / false
```

### 设备管理 - 禁用设备
#### 参数

- `id` \<string\> 当前设备 ID

#### 示例

```js
await managementClient.browserFingerprint.disableDevice('64a53f19e32a3349ab5f2d56')
```

#### 返回值

```json
boolean : true / false
```

### 设备管理 - 启用设备
#### 参数

- `id` \<string\> 当前设备 ID

#### 示例

```js
await managementClient.browserFingerprint.enableDevice('64a53f19e32a3349ab5f2d56')
```

#### 返回值

```json
boolean : true / false
```

### 设备管理 - 挂起设备
#### 参数

- `id` \<string\> 当前设备 id
- `timestamp` \<number\> timestamp 挂起结束时间 精确到毫秒

#### 示例

```js
await managementClient.browserFingerprint.suspendDevice('64a53f19e32a3349ab5f2d56',1689523200000)
```

#### 返回值

```json
boolean : true / false
```



<!-- 分割 用户设备管理相关功能 -->
## 用户设备管理相关功能

### 用户中心 - 设备列表


#### 参数

- `options.page` \<int\> 分页，获取第几页，默认从 1 开始。
- `options.limit` \<int\> 每页条目数量，默认为 10 个。
- `options.uid` \<int\> 用户id。
#### 示例

```js
const list = await managementClient.browserFingerprint.getDeviceUserList(options)
```
##### 示例数据

```json
{
    "data": [
        {
          "id": "64a62604d9c52b1fb1cea2ee", //设备 id
          "deviceName": "chrome/114.0.0.0", //设备名称
          "os": "Mac OS", //设备系统
          "version": "114.0.0.0", //系统版本
          "userId": "64a53f4079c9b6f43e56feb2",
          "deviceUniqueId": "4f24fab0d59272eca1365f742d69d9e6", //设备唯一标识
          "deviceRowId": "64a55e45002360ccaaf03a88", //行 id
          "status": "activated", //状态
          "ip": "49.7.66.98", //最近登录 ip
          "loginTime": 1688624246308, //最近活跃时间
          "isTrust": true,
          "endTime": null //挂起结束时间
        }
    ],
    "totalCount": 2 //数量
}
```


### 用户中心 - 移除设备
#### 参数

- `options.userId` \<string\> 当前 userId
- `options.id` \<string\> 当前设备 ID

#### 示例

```js
await managementClient.browserFingerprint.delDeviceUser(options)
```

#### 返回值

```json
boolean : true / false
```

### 用户中心 - 禁用设备
#### 参数

- `options.userId` \<string\> 当前 userId
- `options.id` \<string\> 当前设备 ID


#### 示例

```js
await managementClient.browserFingerprint.disableDeviceUser(options)
```

#### 返回值

```json
boolean : true / false
```

### 用户中心 - 启用设备
#### 参数

- `options.userId` \<string\> 当前 userId
- `options.id` \<string\> 当前设备 ID

#### 示例

```js
await managementClient.browserFingerprint.enableDeviceUser(options)
```

#### 返回值

```json
boolean : true / false
```

### 用户中心 - 挂起设备
#### 参数

- `options.userId` \<string\> 当前 userId
- `options.id` \<string\> 当前设备 ID
- `options.timestamp` \<number\> timestamp 挂起结束时间 精确到毫秒

#### 示例

```js
await managementClient.browserFingerprint.suspendDeviceUser(options)
```

#### 返回值

```json
boolean : true / false
```
