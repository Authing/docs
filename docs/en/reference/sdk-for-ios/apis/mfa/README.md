# MFA API

<LastUpdated/>

## MFA check

Check if phone number or email address can be used for MFA

```swift
func mfaCheck(phone: String?, email: String?, completion: @escaping(Int, String?, Bool?) -> Void)
```

**param**

* `phone` phone number to be checked. can be null
* `email` email address to be checked. can be null

**example**

```swift
AuthClient().mfaCheck(phone: "13012345678", email: nil) { code, message, ok in
    if (code == 200) {
        if (ok) {
            
        }
    }
}

AuthClient().mfaCheck(phone: nil, email: "abc@gmail.com") { code, message, ok in
    if (code == 200) {
        if (ok) {
            
        }
    }
}
```

<br>

## SMS

MFA by SMS

```swift
func mfaVerifyByPhone(phone: String, code: String, completion: @escaping(Int, String?, UserInfo?) -> Void)
```

**param**

* `phone` phone number
* `code` SMS verification code

**example**

```swift
AuthClient().mfaVerifyByPhone(phone: "13012345678", code: "1234") { code, message, userInfo in
    // userInfo
}
```

<br>

## Email

MFA by email

```swift
func mfaVerifyByEmail(email: String, code: String, completion: @escaping(Int, String?, UserInfo?) -> Void)
```

**param**

* `email` email address
* `code` email verification code

**example**

```swift
AuthClient().mfaVerifyByEmail(email: "abc@gmail.com", code: "1234") { code, message, userInfo in
    // userInfo
}
```

<br>

## TOTP

MFA by TOTP (Time-based One Time Password)

```swift
func mfaVerifyByOTP(code: String, completion: @escaping(Int, String?, UserInfo?) -> Void)
```

**param**

* `code` TOTP code

**example**

```swift
AuthClient().mfaVerifyByTOTP(code: "1234") { code, message, userInfo in
    // userInfo
}
```

<br>

## Recovery code

MFA by recovery code. When user binds TOTP, a recovery code will be generated. User should save this code securely and pass it as parameter for this API

>When MFA succeed, a new recovery code will be generated, the old one becomes invalid

```swift
func mfaVerifyByRecoveryCode(code: String, completion: @escaping(Int, String?, UserInfo?) -> Void)
```

**param**

* `code` recovery code

**example**

```swift
AuthClient().mfaVerifyByRecoveryCode(code: "1234") { code, message, userInfo in
    // userInfo
}
```

<br>

## Upload face photo

Upload a photo before face recognition, this interface returns the `Key` value of the photo, used for face verification.

```swift
func uploadFaceImage(_ image: UIImage,_ isPrivate: Bool = true, completion: @escaping (Int, String?) -> Void)
```

**param**

* *image* photo

**example**

```swift
AuthClient().uploadFaceImage(image) { code, key in
    // key: Face recognition parameter
}
```

<br>

## Bind face photo

First face verification binding face. Before calling this interface, you need to call the [Upload face photo](#upload-face-photo) interface to get the photo `key` value

```swift
func mfaAssociateByFace(photoKeyA: String, photoKeyB: String, completion: @escaping(Int, String?, UserInfo?) -> Void)
```

**param**

* *photoKeyA* The Key from the first photo
* *photoKeyB* The Key from the second photo

**example**

```swift
AuthClient().mfaAssociateByFace(photoKeyA: "photoKeyA", photoKeyB: "photoKeyB") { code, message, userInfo in
    // userInfo
}
```

<br>

## Face verification

Multi-factor authentication through face recognition. Before calling this interface, you need to call the [upload face photo](#upload-face-photo) interface to get the photo `key` value

```swift
func mfaVerifyByFace(photoKey: String, completion: @escaping(Int, String?, UserInfo?) -> Void)
```

**param**

* *photoKey* Key

**example**

```swift
AuthClient().mfaVerifyByFace(photoKey: "photoKey") { code, message, userInfo in
    // userInfo、
}
```

<br>
