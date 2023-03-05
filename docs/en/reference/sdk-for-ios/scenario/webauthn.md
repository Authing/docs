# Customize the WebAuthn authentication process

<LastUpdated/>

Since the WebAuthn authenticator is divided into two parts: local credentials and server-side credentials, developers need to request the server-side authenticator after the local verification is successful when using WebAuthn.
Customizing the WebAuthn authentication process requires calling the WebAuthn native SDK API. The following will provide developers with the most complete development solutions and code samples.

## Bind WebAuthn

Before binding, you need to get the WebAuthn initialization configuration through **getWebauthnRegistrationParam()**:

```swift
AuthClient().getWebauthnRegistrationParam() {code, message, res
     // res will be returned, the following parameters will be required for the next step:
     - challenge: challenge code
     - userId: User ID
     - userName: username
     - displayName: user display name
     - rpId: relying party domain
     - rpName: relying party name
     - timeout: timeout, milliseconds
     - ticket: ticket parameter
}
```

After obtaining the initial configuration of WebAuthn, you can call the local binding interface. After the local binding is successful, call the binding API to bind to the server:

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
let authenticator = InternalAuthenticator(ui: self. userConsentUI, credentialStore: store)

self. webAuthnClient = WebAuthnClient(
     origin: "https://\(rpId)",
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
    
     self. webAuthnClient. create(options)
    
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

## Login WebAuthn

Before logging in, you need to get the WebAuthn initialization configuration through **getWebauthnAuthenticationParam()**:

```swift
AuthClient().getWebauthnAuthenticationParam() {code, message, res
     // res will be returned, the following parameters will be required for the next step:
     - challenge: challenge code
     - rpId: relying party domain
     - timeout: timeout, milliseconds
     - ticket: ticket parameter, returned during verification
     - userVerification
}
```

After obtaining the initial configuration of WebAuthn, you can call the login interface. After the local binding login, call the login API to verify on the server:


```swift
let store = KeychainCredentialStore()
let authenticator = InternalAuthenticator(ui: self. userConsentUI, credentialStore: store)

self. webAuthnClient = WebAuthnClient(
     origin: "https://\(rpId)",
     authenticator: authenticator
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
    
     self. webAuthnClient. get(options)
    
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

## Unbind WebAuthn

To unbind WebAuthn, you need to obtain the credential ID locally first, and call the unbind API to unbind the server. After the unbind is successful, delete the local credential:

```swift
AuthClient(). webauthnRemoveCredential(credentialID: cid) { code, message, res in
     if let statusCode = res?["statusCode"] as? Int,
         statusCode == 200 {
         // delete local credentials
        for publicKey in store. loadAllCredentialSources(rpId: rpid) {
             if Base64.encodeBase64URL(publicKey.id) == cid {
                 _ = store.deleteCredentialSource(publicKey)
             }
         }
     }
}
```