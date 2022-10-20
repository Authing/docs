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

| 名称 | 类型 | <div style="width:80px">是否必填</div> | 默认值 | <div style="width:300px">描述</div> | <div style="width:200px"></div>示例值</div> |
| ---- | ---- | ---- | ---- | ---- | ---- |


<!-- 暂时不显示示例代码 -->
<!-- ## 示例代码
```go
package main

import (
    "github.com/Authing/authing-golang-sdk/management"
    "github.com/Authing/authing-golang-sdk/dto"

    "fmt"
)

func main() {
    options := management.ClientOptions {
        AccessKeyId:     "AUTHING_USERPOOL_ID",
        AccessKeySecret: "AUTHING_USERPOOL_SECRET",
    }

    client, err := management.NewClient(&options)
    if err != nil {
        // The exception needs to be handled by the developer.
    }

    response := client.system(
    
    
  )
}
```
 -->

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

| 名称 | 类型 | <div style="width:80px">是否必填</div> | <div style="width:300px">描述</div> | <div style="width:200px">示例值</div> |
| ---- |  ---- | ---- | ---- | ---- |
| publicKey | string | 是 | RSA256 公钥   |  `xxxxxxxxxxxxxxxxxxxxxx` |


### <a id="SystmeInfoSM2Config"></a> SystmeInfoSM2Config

| 名称 | 类型 | <div style="width:80px">是否必填</div> | <div style="width:300px">描述</div> | <div style="width:200px">示例值</div> |
| ---- |  ---- | ---- | ---- | ---- |
| publicKey | string | 是 | SM2 公钥   |  `xxxxxxxxxxxxxxxxxxxxxx` |


### <a id="SystmeInfoVersion"></a> SystmeInfoVersion

| 名称 | 类型 | <div style="width:80px">是否必填</div> | <div style="width:300px">描述</div> | <div style="width:200px">示例值</div> |
| ---- |  ---- | ---- | ---- | ---- |
| server | string | 是 | Authing 核心服务版本号   |  `2.0.0` |
| console | string | 是 | Authing 控制台版本号   |  `2.0.0` |
| login | string | 是 | Authing 托管登录页版本号   |  `2.0.0` |


