# 发起绑定 MFA 认证要素请求

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

<LastUpdated />

当用户未绑定某个 MFA 认证要素时，可以发起绑定 MFA 认证要素请求。不同类型的 MFA 认证要素绑定请求需要发送不同的参数，详细见 profile 参数。发起验证请求之后，Authing 服务器会根据相应的认证要素类型和传递的参数，使用不同的手段要求验证。此接口会返回 enrollmentToken，你需要在请求「绑定 MFA 认证要素」接口时带上此 enrollmentToken，并提供相应的凭证。

## 请求参数

| 名称 | 类型 | <div style="width:80px">是否必填</div> | 默认值 | <div style="width:300px">描述</div> | <div style="width:200px"></div>示例值</div> |
| ---- | ---- | ---- | ---- | ---- | ---- |
| profile | <a href="#FactorProfile">FactorProfile</a> | 是 | - | MFA 认证要素详细信息  | `{"phoneNumber":"188xxxx8888","phoneCountryCode":"+86"}` |
| factorType | string | 是 | - | MFA 认证要素类型，目前共支持短信、邮箱验证码、OTP、人脸四种类型的认证要素。  | `SMS` |


<!-- 暂时不显示示例代码 -->
<!-- ## 示例代码
```py
from authing import ManagementClient

management_client = ManagementClient(
    access_key_id="AUTHING_USERPOOL_ID",
    access_key_secret="AUTHING_USERPOOL_SECRET",
)

data = management_client.send_enroll_factor_request(
     factor_type: "SMS",
     profile: {
         phone_number: "188xxxx8888",
       phone_country_code: "+86",
       email: "test@example.com",
    },
  
)
```
 -->

## 请求响应

类型： `SendEnrollFactorRequestRespDto`

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| statusCode | number | 业务状态码，可以通过此状态码判断操作是否成功，200 表示成功。 |
| message | string | 描述信息 |
| apiCode | number | 细分错误码，可通过此错误码得到具体的错误类型。 |
| requestId | string | 请求 ID。当请求失败时会返回。 |
| data | <a href="#SendEnrollFactorRequestDataDto">SendEnrollFactorRequestDataDto</a> | 响应数据 |



示例结果：

```json
{
  "statusCode": 200,
  "message": "操作成功",
  "requestId": "934108e5-9fbf-4d24-8da1-c330328abd6c",
  "data": {
    "enrollmentToken": "TQoCISidM0kBji0dxRi3afSDtkvvMiUphenIgLF87y+JOw4T8fDWOsHHXIcvZ2EVESXhTrfGyh1iGf52Cg9e9byeFQvm1VZ0QWrwmzwpntFAVtf1IP9LqVhmzXhBMFvLOcU/z1Eh/n0CrwX0uHNpJoMW9lp9AqHd9HvauaGKX+Y=",
    "otpData": {
      "qrCodeUri": "otpauth://totp/userPoolName:test?secret=xxxx&period=30&digits=6&algorithm=SHA1&issuer=userPoolName",
      "qrCodeDataUrl": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOQAAADkCAYAAACIV4iNAAAAAklEQVR4AewaftIAAAxSSURBVO3BQW4ERxLAQLKh/3+Z62OeCmjMSC4vMsL+wVrrCg9rrWs8rLWu8bDWusbDWusaD2utazysta7xsNa6xsNa6xoPa61rPKy1rvGw1rrGw1rrGg9rrWs8rLWu8bDWusYPH1L5SxWTyknFJ1SmihOVqeINlU9UnKhMFZPKJyo+oTJVnKhMFZPKX6r4xMNa6xoPa61rPKy1rvHDl1V8k8obFZPKVPEJlW9SeaNiUplUpoqpYlKZKk5Upoo3VKaKE5VvqvgmlW96WGtd42GtdY2HtdY1fvhlKm9UvFExqZyoTBVvVJyonKicVEwqk8pJxSdU3lA5qZgqJpWTiknlm1TeqPhND2utazysta7xsNa6xg//cSqfUDmpOFGZKiaVqeKNihOVE5WpYqo4UTmpOFGZKqaKSeWNiv8nD2utazysta7xsNa6xg//cRUnKicVk8qkMlVMFW+oTBUnKm+onKicVEwVk8o3qbxR8f/sYa11jYe11jUe1lrX+OGXVfwllW+qmFROKt5QeaPiDZWpYlI5UTlROal4o2JSmSq+qeImD2utazysta7xsNa6xg9fpvKXVKaKSWWqmFSmikllqphU3qiYVKaKSeVEZar4TRWTylQxqUwV36QyVZyo3OxhrXWNh7XWNR7WWtf44UMVN1GZKt5Q+YTKicpU8YmKT1ScVEwqb1RMKlPFpDJVTCpvVPyXPKy1rvGw1rrGw1rrGj98SGWqmFROKiaVNyomlROVqeITFd+kcqLyTSpvVJyoTBXfVPGGylRxojJVTConFZ94WGtd42GtdY2HtdY1fvhQxaQyVUwqJxVvqPwllaniEyonFb+pYlJ5Q2WqmFR+k8pJxaQyVdzkYa11jYe11jUe1lrXsH/wAZWpYlL5SxWTyknFpDJVnKhMFScqU8WJylTxhspJxaQyVUwqn6h4Q2WqmFT+UsWkMlV84mGtdY2HtdY1HtZa17B/8ItUporfpDJVTConFZPKScWk8omKSWWqOFF5o+I3qXyi4g2VqeJEZar4Nz2sta7xsNa6xsNa6xo/XE7ljYqTikllUjmpmFSmikllqjhRmSomlZOKSeVE5aTiJipTxVQxqZxUTCpTxaRyUvGJh7XWNR7WWtd4WGtd44cvU5kqJpU3KiaVE5WTipOKSeU3qUwVk8obKlPFicpfqnhDZaqYVKaKqWJSOamYVKaKSeWbHtZa13hYa13jYa11jR/+WMWkMlVMKlPFpHJSMalMFZPKJ1SmikllqnijYlKZKiaVk4pJZVKZKiaVv6TyhsqJyknFpDJVfNPDWusaD2utazysta5h/+CLVE4qJpWTiknlpOJE5aRiUjmp+E0qJxVvqEwVb6hMFZPKGxVvqJxUvKHyiYpvelhrXeNhrXWNh7XWNX74sopvUpkqTlSmiqliUplUpopPqLxRcVIxqZxUvKEyVfwmlaliUpkqJpUTlU9UnKhMFZ94WGtd42GtdY2HtdY1fviQylQxqUwVb1ScqPwllZOKT6icqJxUnFScVJxUfKLijYqTijcqJpUTlaniNz2sta7xsNa6xsNa6xo//MsqJpVJZao4qXij4ptUPlHxTSpTxaQyVUwqU8UbFScqU8Wk8kbFicobFX/pYa11jYe11jUe1lrX+OFDFZPKJypOVD6hclLxRsWJylTxCZWTiqniN6m8oTJVTCpvVEwqb1RMKv+mh7XWNR7WWtd4WGtd44cPqbyhclIxqUwVb6icVEwqJxWfUDmpmFR+U8WkMlVMKlPFpDKpfKLimypu9rDWusbDWusaD2uta9g/+EUqU8WkclIxqUwVb6icVEwqb1R8QuWkYlI5qThR+aaKE5WpYlKZKiaVqeJE5aTiDZWp4pse1lrXeFhrXeNhrXWNH75MZar4hMqJyhsVk8obFScqJxWTylQxqUwqb6hMFScVk8pUMal8QmWqeEPlEypTxaTylx7WWtd4WGtd42GtdY0fvqziROWk4g2Vk4qTipOKSeWNikllqnij4g2VT1RMKicqn1CZKt6oeENlUpkqJpXf9LDWusbDWusaD2uta/zwIZU3KiaVE5Wp4g2VqeKbKk5UpopvUpkqTlSmikllqpgq3lCZKiaVqeKkYlI5UZkqPlExqUwVn3hYa13jYa11jYe11jV++FDFpDJVTCpvVLxRcaJyUvGGylQxVZyoTBVvVLxRMalMFZPKScVJxRsqU8Wk8kbFGxX/poe11jUe1lrXeFhrXeOHD6l8k8o3qZxUnKhMFZPKpDJVfJPKb1KZKt5QmSomlaliUvmEyidUpopJ5Tc9rLWu8bDWusbDWusaP3yoYlKZVE4q3lCZKiaVqWJSOVGZKk4q3lB5o+INlROVqeI3qUwVJxVvVLyhMlVMKv+mh7XWNR7WWtd4WGtd44dfVjGpnKicVEwqU8Wk8k0qU8WkMlVMFZPKGypTxVTxhspUMal8omJSmSomlaliqjhRmSreqJhUTiq+6WGtdY2HtdY1HtZa1/jhyyomlaliUjmp+C9TmSqmikllqpgqJpU3KqaKSWWqeEPlpOITKp+o+ETFpDJVfOJhrXWNh7XWNR7WWtf44UMqU8VU8QmVqeKbVP6SylTxhspUMalMFScqv0llqphUpopJZaqYVKaKE5WTiqliUvlND2utazysta7xsNa6xg8fqjhRmSreqPimiknljYo3Kk5U3qg4qfhNKr9JZao4qZhUpoqp4kTl3/Sw1rrGw1rrGg9rrWvYP/gilaliUjmpmFQ+UTGpfFPFpDJVTCpTxYnKScWkclLxhspU8QmVqeINlaniROWk4g2Vk4pPPKy1rvGw1rrGw1rrGj/8yyomlaliUvlNFScqJxXfVPFGxSdUTlSmiknlDZWp4t+kMlVMFb/pYa11jYe11jUe1lrX+OGXqUwVb6hMFW+onFS8UTGpnFS8ofKJikllqphU3qiYVN6omFS+SWWqmFROKk5UTio+8bDWusbDWusaD2uta/zwyyomlZOKN1Q+oTJVTConFZPKJyomlaliUvmmiknlExWTyhsqn1B5Q+Xf9LDWusbDWusaD2uta/zwIZWpYlKZKk5UTiq+qWJSOamYVE5UpooTlaniN1V8ouJEZaqYVCaVv6TyRsVvelhrXeNhrXWNh7XWNX74MpWp4kRlqjhRmSpOVD5RMalMFScqJyqfqJhUTlROKqaKSeVmFW+oTBWTyl96WGtd42GtdY2HtdY1fvhQxaTyRsWkclIxqUwVU8UnVN5QmSpOKiaVSWWqmFSmikllqphUTlROKiaVT1RMKlPFpDJVTCpTxVTxhspU8U0Pa61rPKy1rvGw1rrGD79M5aRiqnij4kRlqphUpooTlUllqnhD5b9MZao4UTlRmSpOKiaVE5Wp4qRiUplUpopPPKy1rvGw1rrGw1rrGj98SOWNijdUpopvqjhROamYVKaKk4oTlUnlROWNiknlpGJSOVGZKk5U3lD5hMpJxUnFNz2sta7xsNa6xsNa6xr2D/7DVKaKE5Wp4i+pnFRMKlPFGypTxaQyVZyofKJiUpkq3lCZKt5QmSreUJkqPvGw1rrGw1rrGg9rrWv88CGVv1RxojJVnKicVJyofKLiEypTxYnKGyonFW+o/CWVqeINlaliqvimh7XWNR7WWtd4WGtd44cvq/gmlTcqJpWp4kRlUpkqvkllqnij4o2KE5WTijdUpopJ5URlqnij4r/kYa11jYe11jUe1lrX+OGXqbxR8UbFpPKJihOVk4o3VCaVE5WbqLyhMlW8oXKi8gmVN1Smik88rLWu8bDWusbDWusaP/zHqUwVv6liUplU3qg4UZkqvkllqvhNFZPKScWJylQxqfyXPKy1rvGw1rrGw1rrGj/8n1GZKk5UTiomlaniDZXfpDJVnFR8omJSeaPiRGWqmCpOKiaVNyomlanimx7WWtd4WGtd42GtdY0fflnFb6qYVN6omFQmld+k8obKVDFVTConFZPKVDGpTBVTxaRyojJVTBVvqJxUvKEyVfymh7XWNR7WWtd4WGtd44cvU/lLKlPFpHJSMVW8oTJVfFPFicpJxYnKVDGpTBUnKlPFpDJVTConFZPKVPEJlaliUjmp+MTDWusaD2utazysta5h/2CtdYWHtdY1HtZa13hYa13jYa11jYe11jUe1lrXeFhrXeNhrXWNh7XWNR7WWtd4WGtd42GtdY2HtdY1HtZa13hYa13jf5JXo0uhVRYoAAAAAElFTkSuQmCC",
      "recoveryCode": "e7ad-aaa4-da75-fa37-57d1-5141"
    }
  }
}
```

## 数据结构


### <a id="FactorProfile"></a> FactorProfile

| 名称 | 类型 | <div style="width:80px">是否必填</div> | <div style="width:300px">描述</div> | <div style="width:200px">示例值</div> |
| ---- |  ---- | ---- | ---- | ---- |
| phoneNumber | string | 否 | 当发起绑定手机短信认证要素时，此参数必传。需要传递用户希望绑定的手机号。Authing 服务器会向此手机号发送短信验证码，要求用户在绑定 MFA 阶段提供验证码。一个手机号在一分钟内只能请求一次。   |  `188xxxx8888` |
| phoneCountryCode | string | 否 | 当发起绑定手机短信认证要素且需要绑定国际手机号时可以设置，默认为 +86，中国大陆手机区号。Authing 短信服务暂不内置支持国际手机号，你需要在 Authing 控制台配置对应的国际短信服务。完整的手机区号列表可参阅 https://en.wikipedia.org/wiki/List_of_country_calling_codes。   |  `+86` |
| email | string | 否 | 当发起绑定邮箱验证码认证要素时，此参数必传。需要传递用户希望绑定的邮箱。Authing 服务器会向此邮箱发送邮箱验证码，要求用户在绑定 MFA 阶段提供验证码。一个邮箱在一分钟内只能请求一次。   |  `test@example.com` |


### <a id="SendEnrollFactorRequestDataDto"></a> SendEnrollFactorRequestDataDto

| 名称 | 类型 | <div style="width:80px">是否必填</div> | <div style="width:300px">描述</div> | <div style="width:200px">示例值</div> |
| ---- |  ---- | ---- | ---- | ---- |
| enrollmentToken | string | 是 | 临时凭证 enrollmentToken，有效时间为一分钟。在进行「绑定 MFA 认证要素」时，需要带上此参数。   |  `TQoCISidM0kBji0dxRi3afSDtkvvMiUphenIgLF87y+JOw4T8fDWOsHHXIcvZ2EVESXhTrfGyh1iGf52Cg9e9byeFQvm1VZ0QWrwmzwpntFAVtf1IP9LqVhmzXhBMFvLOcU/z1Eh/n0CrwX0uHNpJoMW9lp9AqHd9HvauaGKX+Y=` |
| otpData |  | 否 | 发起绑定 OTP 类型认证要素时，接口会返回此数据。 嵌套类型：<a href="#SendEnrollFactorRequestOtpDataDto">SendEnrollFactorRequestOtpDataDto</a>。  |  |


### <a id="SendEnrollFactorRequestOtpDataDto"></a> SendEnrollFactorRequestOtpDataDto

| 名称 | 类型 | <div style="width:80px">是否必填</div> | <div style="width:300px">描述</div> | <div style="width:200px">示例值</div> |
| ---- |  ---- | ---- | ---- | ---- |
| qrCodeUri | string | 是 | OTP Auth Uri   |  `otpauth://totp/userPoolName:test?secret=xxxx&period=30&digits=6&algorithm=SHA1&issuer=userPoolName` |
| qrCodeDataUrl | string | 是 | Base64 编码的 OTP 二维码，前端可以用此渲染二维码。   |  `data:image/png;base64,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` |
| recoveryCode | string | 是 | OTP Recovery Code   |  `e7ad-aaa4-da75-fa37-57d1-5141` |


