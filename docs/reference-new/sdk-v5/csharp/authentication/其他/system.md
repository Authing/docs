# 获取服务器公开信息

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

<LastUpdated />

可端点可获取服务器的公开信息，如 RSA256 公钥、SM2 公钥、Authing 服务版本号等。

## 请求参数

| 名称 | 类型 | 必填 | 默认值 | 描述 | 示例值 |
| ---- | ---- | ---- | ---- | ---- | ---- |


## 示例代码

```csharp

using Authing.CSharp.SDK.Models;
using Authing.CSharp.SDK.Services;
using Authing.CSharp.SDK.Utils;
using Authing.CSharp.SDK.UtilsImpl;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Example
{
    class Program
    {
      private static ManagementClientOptions options;
      private static string ACCESS_Key_ID = "AUTHING_USERPOOL_ID";
      private static string ACCESS_KEY_SECRET = "AUTHING_USERPOOL_SECRET";

      static void Main(string[] args)
      {
          MainAsync().GetAwaiter().GetResult();
      }

      private static async Task MainAsync()
      {
          options = new ManagementClientOptions()
          {
              AccessKeyId = ACCESS_Key_ID,
              AccessKeySecret = ACCESS_KEY_SECRET,
          };

          ManagementClient managementClient = new ManagementClient(options);
        
          SystemInfoResp  result = await managementClient.System
          (            
          );
        }
    }
}

```



## 请求响应

类型： `SystemInfoResp`

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| rsa | <a href="#SystmeInfoRSAConfig">SystmeInfoRSAConfig</a> | RSA256 加密配置信息 |
| sm2 | <a href="#SystmeInfoSM2Config">SystmeInfoSM2Config</a> | 国密 SM2 加密配置信息 |
| version | <a href="#SystmeInfoVersion">SystmeInfoVersion</a> | 国密 SM2 加密配置信息 |
| publicIps | array | Authing 服务对外 IP 列表 |



示例结果：

```json
{
  "rsa": {
    "publicKey": "xxxxxxxxxxxxxxxxxxxxxx"
  },
  "sm2": {
    "publicKey": "xxxxxxxxxxxxxxxxxxxxxx"
  },
  "version": {
    "server": "2.0.0",
    "console": "2.0.0",
    "login": "2.0.0"
  }
}
```

## 数据结构


### <a id="SystmeInfoRSAConfig"></a> SystmeInfoRSAConfig

| 名称 | 类型 | 必填 | 描述 | 示例值 |
| ---- |  ---- | ---- | ---- | ---- |
| publicKey | string | 是 | RSA256 公钥。  |  `xxxxxxxxxxxxxxxxxxxxxx` |


### <a id="SystmeInfoSM2Config"></a> SystmeInfoSM2Config

| 名称 | 类型 | 必填 | 描述 | 示例值 |
| ---- |  ---- | ---- | ---- | ---- |
| publicKey | string | 是 | SM2 公钥。  |  `xxxxxxxxxxxxxxxxxxxxxx` |


### <a id="SystmeInfoVersion"></a> SystmeInfoVersion

| 名称 | 类型 | 必填 | 描述 | 示例值 |
| ---- |  ---- | ---- | ---- | ---- |
| server | string | 是 | Authing 核心服务版本号。  |  `2.0.0` |
| console | string | 是 | Authing 控制台版本号。  |  `2.0.0` |
| login | string | 是 | Authing 托管登录页版本号。  |  `2.0.0` |


