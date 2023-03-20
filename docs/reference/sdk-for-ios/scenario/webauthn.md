# 自定义 WebAuthn 认证流程

<LastUpdated/>

由于 WebAuthn 认证器分为两部分：本地凭证及服务端凭证，所以开发者在使用 WebAuthn 时，需要本地校验成功后，再去请求服务端验证器。
自定义 WebAuthn 认证流程需要调用 WebAuthn 原生 SDK API，以下将为开发者提供最完整的开发方案及代码示例。

## 绑定 WebAuthn

在绑定之前，需要通过 **getWebauthnRegistrationParam()** 获取到 WebAuthn 初始化配置：

```swift
AuthClient().getWebauthnRegistrationParam() {code, message, res
    // res 将返回，下一步时将需要以下参数:
    - challenge: 挑战码
    - userId: 用户 ID
    - userName: 用户名称
    - displayName:  用户展示名称
    - rpId: 信赖方 domain
    - rpName: 信赖方名称
    - timeout: 超时时间，毫秒
    - ticket: ticket 参数
}
```

当获取到 WebAuthn 初始化配置后，即可调用本地绑定接口，在本地绑定成功后，调用绑定 API 去服务端进行绑定：

```swift
let attestation = [
    AttestationConveyancePreference.direct,
    AttestationConveyancePreference.indirect,
    AttestationConveyancePreference.none,
][0]

let verification = [
    UserVerificationRequirement.required,
    UserVerificationRequirement.preferred,
    UserVerificationRequirement.discouraged
][0]

let requireResidentKey = true

let store = KeychainCredentialStore()
let authenticator = InternalAuthenticator(ui: self.userConsentUI, credentialStore: store)

self.webAuthnClient = WebAuthnClient(
    origin:        "https://\(rpId)",
    authenticator: authenticator
)

var options = PublicKeyCredentialCreationOptions()
options.challenge = Util.stringEncodeToUInt8Array(challenge)
options.user.id = Bytes.fromString(userId)
options.user.name = userName
options.user.displayName = displayName
options.rp.id = rpId
options.rp.name = rpName 
options.attestation = attestation
options.addPubKeyCredParam(alg: .es256)
options.authenticatorSelection = AuthenticatorSelectionCriteria(
    requireResidentKey: requireResidentKey,
    userVerification: verification
)
 options.timeout = UInt64(timeout ?? 60000)

firstly {
    
    self.webAuthnClient.create(options)
    
}.done { credential in
    
    let cid = credential.id
    let rid = Base64.encodeBase64URL(credential.rawId)
    let att = Base64.encodeBase64URL(credential.response.attestationObject)
    let clidata = Base64.encodeBase64URL(credential.response.clientDataJSON.data(using: .utf8)!)
    
    AuthClient().webauthnRegistration(ticket: ticket ?? "", credentialId: cid, rawId: rid, attestationObject: att, clientDataJSON: clidata, authenticatorCode: Util.isFullScreenIphone() == true ? "face" : "fingerprint") { code, message, res in
    }

}.catch { error in

}
```

## 登录 WebAuthn

在登录之前，需要通过 **getWebauthnAuthenticationParam()** 获取到 WebAuthn 初始化配置：

```swift
AuthClient().getWebauthnAuthenticationParam() {code, message, res
    // res 将返回，下一步时将需要以下参数:
    - challenge: 挑战码
    - rpId: 信赖方 domain
    - timeout: 超时时间，毫秒
    - ticket: ticket 参数，验证时回传
    - userVerification
}
```

当获取到 WebAuthn 初始化配置后，即可调用登录接口，在本地绑定登录后，调用登录 API 去服务端进行验证：


```swift   
let store = KeychainCredentialStore()
let authticator = InternalAuthenticator(ui: self.userConsentUI, credentialStore: store)

self.webAuthnClient = WebAuthnClient(
    origin:        "https://\(rpId)",
    authenticator: authticator
)
        
var options = PublicKeyCredentialRequestOptions()
options.challenge = Util.stringEncodeToUInt8Array(challenge)
options.rpId = rpId
switch userVerification {
case "required":
    options.userVerification = UserVerificationRequirement.required
    break
case "preferred":
    options.userVerification = UserVerificationRequirement.preferred
    break
case "discouraged":
    options.userVerification = UserVerificationRequirement.discouraged
    break
default:
    options.userVerification = UserVerificationRequirement.required
    break
}
options.timeout = UInt64(timeout ?? 60000)

firstly {
    
    self.webAuthnClient.get(options)
    
}.done { assertion in
    
    let cid = assertion.id
    let rawId = Base64.encodeBase64URL(assertion.rawId)
    let attData = Base64.encodeBase64URL(assertion.response.authenticatorData)
    let clientData = Base64.encodeBase64URL(assertion.response.clientDataJSON.data(using: .utf8)!)
    let sig = Base64.encodeBase64URL(assertion.response.signature)
    let userHandle = Base64.encodeBase64URL(assertion.response.userHandle!)
                
    AuthClient().webauthnAuthentication(ticket: ticket ?? "", credentialId: cid, rawId: rawId, authenticatorData: attData, userHandle: userHandle, clientDataJSON: clientData, signature: sig) { code, message, res in
    }
}.catch { error in
}
```

## 解绑 WebAuthn

解绑 WebAuthn 需要先本地获取到凭证 ID，调用解绑 API 去服务端进行解绑，解绑成功后，将本地凭证一并删除：

```swift
AuthClient().webauthnRemoveCredential(credentialID: cid) { code, message, res in
    if let statusCode = res?["statusCode"] as? Int,
        statusCode == 200 {
        // 删除本地凭证
       for publicKey in store.loadAllCredentialSources(rpId: rpid) {
            if Base64.encodeBase64URL(publicKey.id) == cid {
                _ = store.deleteCredentialSource(publicKey)
            }
        }
    }
}
```