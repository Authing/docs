---
meta:
  - name: description
    content: SDK for Swift
---

# SDK for Swift

<LastUpdated/>


This is a pure Swift library for [Approw](https://approw.com).

> GitHub Source Code: [https://github.com/Approw/SwiftyApprow](https://github.com/Approw/SwiftyApprow)

<img src="../images/reference/Swift0.png" height="500px"></img>

## Requirements

- Swift 5.0 +
- Xcode 11 +
- iOS 10+

## Installation

### Swift Package Manager

1. Xcode - Project - Swift Packages
2. Add + https://github.com/Approw/SwiftyApprow.git
3. Select the latest version

![image](../images/reference/Swift1.png)

![image](../images/reference/Swift2.png)

![image](../images/reference/Swift3.png)

4. Update to latest version (optional)

## Example

1. Clone repository

2. Change **UserPoolId, Secret, and Host** in SwiftyApprowExample - ViewController.swift

3. Run **SwiftyApprowExample** with iOS simulator or device.

4. Test and check data with web console [https://console.approw.com](https://console.approw.com)

## How to use

```swift
import SwiftyApprow

/// Config Information, change your UserPoolId
/// Find in https://console.approw.com Setting - Basic Information & Application.
let userPoolId = "userPoolId"
let appId = "appId"

var client: AuthenticationClient?
var userid = ""

//use userPoolId and appId to initialize at the same time
self.client = AuthenticationClient(userPoolId: userPoolId, appId: appId)

// IF you want to call User related methods, you need to set this user's valid AccessToken.
// If you want to modify user's AccessToken, you nned to assign the value again.
//self.client?.accessToken = "accessToken"


/// Register by Email and Password.
/// 
///
func registerByEmail() {
    //Normal
//        self.client?.registerByEmail(email: textEmail.text!, password: textPassword.text!, completion: {status in
//            if(status.errors == nil) {
//                //Success
//                print(status.data?.registerByEmail ?? "")
//                self.userid = status.data?.registerByEmail?.id ?? ""
//            } else {
//                //Failure
//                print(status.errors ?? "")
//            }
//        })

    //With result
    self.client?.registerByEmailWithResult(email: textEmail.text!, password: textPassword.text!, completion: {result in
        switch result {
        case .success(let graphQLResult):
            print(graphQLResult.data?.registerByEmail ?? "")
        case .failure(let error):
            print(error)
        }
    })
}

/// Register by Username and Password.
/// 
///
func registerByUsername() {
    //Normal
//        self.client?.registerByUsername(username: textUsername.text!, password: textPassword.text!, completion:{status in
//            if(status.errors == nil) {
//                //Success
//                print(status.data?.registerByUsername ?? "")
//                self.userid = status.data?.registerByUsername?.id ?? ""
//            } else {
//                //Failure
//                print(status.errors ?? "")
//            }
//        })

    //With result
    self.client?.registerByUsernameWithResult(username: textUsername.text!, password: textPassword.text!, completion:{result in
        switch result {
        case .success(let graphQLResult):
            print(graphQLResult)
        case .failure(let error):
            print(error)
        }
    })
}

/// Register by Phone Number and SMS Code.
/// 
///
func registerByPhoneCode() {

    //Normal
//        self.client?.registerByPhoneCode(phone: textPhone.text!, code: textPhonecode.text!, completion:{ status in
//            if(status.errors == nil) {
//                //Success
//                print(status.data?.registerByPhoneCode ?? "")
//                self.userid = status.data?.registerByPhoneCode?.id ?? ""
//            } else {
//                //Failure
//                print(status.errors ?? "")
//            }
//        })

    //With result
    self.client?.registerByPhoneCodeWithResult(phone: textPhone.text!, code: textPhonecode.text!, completion:{ result in
        switch result {
        case .success(let graphQLResult):
            let status = graphQLResult
            if(status.errors == nil) {
                //Success
                print(status.data?.registerByPhoneCode ?? "")
                self.userid = status.data?.registerByPhoneCode?.id ?? ""
            } else {
                //Failure
                print(status.errors ?? "")
            }
            print(graphQLResult)

        case .failure(let error):
            print(error)
        }
    })

}

/// Check Password Strength.
/// 
///
func checkPasswordStrength() {
    //Normal
//        self.client?.checkPasswordStrength(password: textPassword.text!, completion:{ status in
//            if(status.errors == nil) {
//                //Success
//                print(status.data?.checkPasswordStrength ?? "")
//            } else {
//                //Failure
//                print(status.errors ?? "")
//            }
//        })

    //With result
    self.client?.checkPasswordStrengthWithResult(password: textPassword.text!, completion:{ result in
        switch result {
        case .success(let graphQLResult):
            let status = graphQLResult
            if(status.errors == nil) {
                //Success
                print(status.data?.checkPasswordStrength ?? "")
            } else {
                //Failure
                print(status.errors ?? "")
            }
            print(graphQLResult)
        case .failure(let error):
            print(error)
        }

    })
}

/// Send SMS Code to Phone Number.
/// 
///
func sendSmsCode() {
    //Normal
//        self.client?.sendSmsCode(phone: textPhone.text!, completion: { status in
//            print(status)
//        })

    //With result
    self.client?.sendSmsCodeWithResult(phone: textPhone.text!, completion: { result in
        print(result)
    })
}


/// Login by Email and Password.
/// 
///
func loginByEmail() {
    //Normal
//        self.client?.loginByEmail(email: textEmail.text!, password: textPassword.text!, completion:{ status in
//            if(status.errors == nil) {
//                //Success
//                print(status.data?.loginByEmail ?? "")
//            } else {
//                //Failure
//                print(status.errors ?? "")
//            }
//        })

    //With result
    self.client?.loginByEmailWithResult(email: textEmail.text!, password: textPassword.text!, completion:{ result in
        switch result {
        case .success(let graphQLResult):
            let status = graphQLResult
            if(status.errors == nil) {
                //Success
                print(status.data?.loginByEmail ?? "")
            } else {
                //Failure
                print(status.errors ?? "")
            }
            print(graphQLResult)
        case .failure(let error):
            print(error)
        }
    })
}


/// Login with Username and Password.
///
func loginByUsername() {
    //Normal
//        self.client?.loginByUsername(username: textUsername.text!, password: textPassword.text!, completion:{ status in
//            if(status.errors == nil) {
//                //Success
//                print(status.data?.loginByUsername ?? "")
//            } else {
//                //Failure
//                print(status.errors ?? "")
//            }
//        })

    //With result
    self.client?.loginByUsernameWithResult(username: textUsername.text!, password: textPassword.text!, completion:{ result in
        switch result {
        case .success(let graphQLResult):
            let status = graphQLResult
            if(status.errors == nil) {
                //Success
                print(status.data?.loginByUsername ?? "")
            } else {
                //Failure
                print(status.errors ?? "")
            }
            print(graphQLResult)
        case .failure(let error):
            print(error)
        }
    })
}

/// Login by Phone Number and SMS Code.
/// 
///
func loginByPhoneCode() {
    //Normal
//        self.client?.loginByPhoneCode(phone: textPhone.text!, code: textPhonecode.text!, completion:{ status in
//            if(status.errors == nil) {
//                //Success
//                print(status.data?.loginByPhoneCode ?? "")
//            } else {
//                //Failure
//                print(status.errors ?? "")
//            }
//        })

    //With result
    self.client?.loginByPhoneCodeWithResult(phone: textPhone.text!, code: textPhonecode.text!, completion:{ result in
        switch result {
        case .success(let graphQLResult):
            let status = graphQLResult
            if(status.errors == nil) {
                //Success
                print(status.data?.loginByPhoneCode ?? "")
            } else {
                //Failure
                print(status.errors ?? "")
            }
            print(graphQLResult)
        case .failure(let error):
            print(error)
        }
    })
}


/// Login by Phone Number and Password.
/// 
///
func loginByPhonePassword() {
    //Normal
//        self.client?.loginByPhonePassword(phone: textPhone.text!, password: textPassword.text!, completion:{ status in
//            if(status.errors == nil) {
//                //Success
//                print(status.data?.loginByPhonePassword ?? "")
//            } else {
//                //Failure
//                print(status.errors ?? "")
//            }
//        })

    //With result
    self.client?.loginByPhonePasswordWithResult(phone: textPhone.text!, password: textPassword.text!, completion:{ result in
        switch result {
        case .success(let graphQLResult):
            let status = graphQLResult
            if(status.errors == nil) {
                //Success
                print(status.data?.loginByPhonePassword ?? "")
            } else {
                //Failure
                print(status.errors ?? "")
            }
            print(graphQLResult)
        case .failure(let error):
            print(error)
        }
    })
}


/// Check Login Token status.
/// 
///
func checkLoginStatus() {
    // Change your accessToken here
    let accessToken = self.client?.accessToken ?? ""
    print("accessToken: " + accessToken)

    //Normal
//        self.client?.checkLoginStatus(token: accessToken, completion:{ status in
//            if(status.errors == nil) {
//                //Success
//                print(status.data?.checkLoginStatus ?? "")
//            } else {
//                //Failure
//                print(status.errors ?? "")
//            }
//        })

    //With result
    self.client?.checkLoginStatusWithResult(token: accessToken, completion:{ result in
        switch result {
        case .success(let graphQLResult):
            let status = graphQLResult
            if(status.errors == nil) {
                //Success
                print(status.data?.checkLoginStatus ?? "")
            } else {
                //Failure
                print(status.errors ?? "")
            }
            print(graphQLResult)
        case .failure(let error):
            print(error)
        }
    })
}


/// Send Email.
/// 
///
func sendEmail() {
    //Normal
//        self.client?.sendEmail(email: textEmail.text!, scene: EmailScene.resetPassword, completion: {status in
//            if(status.errors == nil) {
//                //Success
//                print(status.data?.sendEmail ?? "")
//            } else {
//                //Failure
//                print(status.errors ?? "")
//            }
//        })

    //With result
    self.client?.sendEmailWithResult(email: textEmail.text!, scene: EmailScene.resetPassword, completion: {result in
        switch result {
        case .success(let graphQLResult):
            let status = graphQLResult
            if(status.errors == nil) {
                //Success
                print(status.data?.sendEmail ?? "")
            } else {
                //Failure
                print(status.errors ?? "")
            }
            print(graphQLResult)
        case .failure(let error):
            print(error)
        }
    })
}

/// Reset Password by Phone Code.
/// 
///
func resetPasswordByPhoneCode() {
    //Normal
//        self.client?.resetPasswordByPhoneCode(phone: textPhone.text!, code: textPhonecode.text!, newPassword: textPassword.text!, completion: {status in
//            if(status.errors == nil) {
//                //Success
//                print(status.data?.resetPassword ?? "")
//            } else {
//                //Failure
//                print(status.errors ?? "")
//            }
//        })

    //With result
    self.client?.resetPasswordByPhoneCodeWithResult(phone: textPhone.text!, code: textPhonecode.text!, newPassword: textPassword.text!, completion: {result in
        switch result {
        case .success(let graphQLResult):
            let status = graphQLResult
            if(status.errors == nil) {
                //Success
                print(status.data?.resetPassword ?? "")
            } else {
                //Failure
                print(status.errors ?? "")
            }
            print(graphQLResult)
        case .failure(let error):
            print(error)
        }
    })
}

/// Reset Password by Email Code.
/// 
///
func resetPasswordByEmailCode() {
    //Normal
//        self.client?.resetPasswordByEmailCode(email: textEmail.text!, code: textPhonecode.text!, newPassword: textPassword.text!, completion: {status in
//            if(status.errors == nil) {
//                //Success
//                print(status.data?.resetPassword ?? "")
//            } else {
//                //Failure
//                print(status.errors ?? "")
//            }
//        })

    //With result
    self.client?.resetPasswordByEmailCodeWithResult(email: textEmail.text!, code: textPhonecode.text!, newPassword: textPassword.text!, completion: {result in
        switch result {
        case .success(let graphQLResult):
            let status = graphQLResult
            if(status.errors == nil) {
                //Success
                print(status.data?.resetPassword ?? "")
            } else {
                //Failure
                print(status.errors ?? "")
            }
            print(graphQLResult)
        case .failure(let error):
            print(error)
        }
    })
}


/// Update Profile.
/// 
///
func updateProfile() {
    //Normal
//        self.client?.updateProfile(nickname: textUsername.text!, completion: {status in
//            if(status.errors == nil) {
//                //Success
//                print(status.data?.updateUser ?? "")
//            } else {
//                //Failure
//                print(status.errors ?? "")
//            }
//        })

    //With result
    self.client?.updateProfileWithResult(nickname: textUsername.text!, completion: {result in
        switch result {
        case .success(let graphQLResult):
            let status = graphQLResult
            if(status.errors == nil) {
                //Success
                print(status.data?.updateUser ?? "")
            } else {
                //Failure
                print(status.errors ?? "")
            }
            print(graphQLResult)
        case .failure(let error):
            print(error)
        }
    })
}


/// Update Password.
/// 
///
func updatePassword() {
    //Normal
//        self.client?.updatePassword(newPassword: textPassword.text!,oldPassword: textPassword.text!, completion: {status in
//            if(status.errors == nil) {
//                //Success
//                print(status.data?.updatePassword ?? "")
//            } else {
//                //Failure
//                print(status.errors ?? "")
//            }
//        })

    //With result
    self.client?.updatePasswordWithResult(newPassword: textPassword.text!,oldPassword: textPassword.text!, completion: {result in
        switch result {
        case .success(let graphQLResult):
            let status = graphQLResult
            if(status.errors == nil) {
                //Success
                print(status.data?.updatePassword ?? "")
            } else {
                //Failure
                print(status.errors ?? "")
            }
            print(graphQLResult)
        case .failure(let error):
            print(error)
        }
    })
}


/// Update Phone.
/// 
///
func updatePhone() {
    //Normal
//        self.client?.updatePhone(phone: textPhone.text!, phoneCode: textPhonecode.text!, oldPhone: textPhone.text!, oldPhoneCode: textPhonecode.text!, completion: {status in
//            if(status.errors == nil) {
//                //Success
//                print(status.data?.updatePhone ?? "")
//            } else {
//                //Failure
//                print(status.errors ?? "")
//            }
//        })

    //With result
    self.client?.updatePhoneWithResult(phone: textPhone.text!, phoneCode: textPhonecode.text!, oldPhone: textPhone.text!, oldPhoneCode: textPhonecode.text!, completion: {result in
        switch result {
        case .success(let graphQLResult):
            let status = graphQLResult
            if(status.errors == nil) {
                //Success
                print(status.data?.updatePhone ?? "")
            } else {
                //Failure
                print(status.errors ?? "")
            }
            print(graphQLResult)
        case .failure(let error):
            print(error)
        }
    })
}


/// Update Email.
/// 
///
func updateEmail() {
    //Normal
//        self.client?.updateEmail(email: textEmail.text!, emailCode: textPhonecode.text!, oldEmail: textEmail.text!, oldEmailCode: textPhonecode.text!, completion: {status in
//            if(status.errors == nil) {
//                //Success
//                print(status.data?.updateEmail ?? "")
//            } else {
//                //Failure
//                print(status.errors ?? "")
//            }
//        })

    //With result
    self.client?.updateEmailWithResult(email: textEmail.text!, emailCode: textPhonecode.text!, oldEmail: textEmail.text!, oldEmailCode: textPhonecode.text!, completion: {result in
        switch result {
        case .success(let graphQLResult):
            let status = graphQLResult
            if(status.errors == nil) {
                //Success
                print(status.data?.updateEmail ?? "")
            } else {
                //Failure
                print(status.errors ?? "")
            }
            print(graphQLResult)
        case .failure(let error):
            print(error)
        }
    })
}


///Refresh Token.
/// 
///
func refreshToken() {
    //Normal
//        self.client?.refreshToken(completion:{ status in
//            if(status.errors == nil) {
//                //Success
//                print(status.data?.refreshToken ?? "")
//            } else {
//                //Failure
//                print(status.errors ?? "")
//            }
//        })

    //With result
    self.client?.refreshTokenWithResult(completion:{ result in
        switch result {
        case .success(let graphQLResult):
            let status = graphQLResult
            if(status.errors == nil) {
                //Success
                print(status.data?.refreshToken ?? "")
            } else {
                //Failure
                print(status.errors ?? "")
            }
            print(graphQLResult)
        case .failure(let error):
            print(error)
        }
    })
}


/// Get Current User Information.
/// 
///
func getCurrentUser() {
    //Normal
//        self.client?.getCurrentUser(completion: {status in
//            if(status.errors == nil) {
//                //Success
//                print(status.data?.user ?? "")
//            } else {
//                //Failure
//                print(status.errors ?? "")
//            }
//        })

    //With result
    self.client?.getCurrentUserWithResult(completion: {result in
        switch result {
        case .success(let graphQLResult):
            let status = graphQLResult
            if(status.errors == nil) {
                //Success
                print(status.data?.user ?? "")
            } else {
                //Failure
                print(status.errors ?? "")
            }
            print(graphQLResult)
        case .failure(let error):
            print(error)
        }
    })
}


/// Logout Current User.
/// 
///
func logout() {
    //Normal
//        self.client?.logout(completion:{ status in
//            if(status.errors == nil) {
//                //Success
//                print(status.data?.updateUser ?? "")
//            } else {
//                //Failure
//                print(status.errors ?? "")
//            }
//        })

    //With result
    self.client?.logoutWithResult(completion:{ result in
        switch result {
        case .success(let graphQLResult):
            let status = graphQLResult
            if(status.errors == nil) {
                //Success
                print(status.data?.updateUser ?? "")
            } else {
                //Failure
                print(status.errors ?? "")
            }
            print(graphQLResult)
        case .failure(let error):
            print(error)
        }
    })
}

/// Bind phone number.
/// 
///
func bindPhone() {
    //Normal
//        self.client?.bindPhone(phone: textPhone.text!, phoneCode: textPhonecode.text!, completion:{ status in
//            if(status.errors == nil) {
//                //Success
//                print(status.data?.bindPhone ?? "")
//            } else {
//                //Failure
//                print(status.errors ?? "")
//            }
//        })

    //With result
    self.client?.bindPhoneWithResult(phone: textPhone.text!, phoneCode: textPhonecode.text!, completion:{ result in
        switch result {
        case .success(let graphQLResult):
            let status = graphQLResult
            if(status.errors == nil) {
                //Success
                print(status.data?.bindPhone ?? "")
            } else {
                //Failure
                print(status.errors ?? "")
            }
            print(graphQLResult)
        case .failure(let error):
            print(error)
        }
    })
}


/// Unbind email.
/// 
///
func unbindEmail() {
    //Normal
//        self.client?.unbindEmail(completion:{ status in
//            if(status.errors == nil) {
//                //Success
//                print(status.data?.unbindEmail ?? "")
//            } else {
//                //Failure
//                print(status.errors ?? "")
//            }
//        })

    //With result
    self.client?.unbindEmailWithResult(completion:{ result in
        switch result {
        case .success(let graphQLResult):
            let status = graphQLResult
            if(status.errors == nil) {
                //Success
                print(status.data?.unbindEmail ?? "")
            } else {
                //Failure
                print(status.errors ?? "")
            }
            print(graphQLResult)
        case .failure(let error):
            print(error)
        }
    })
}


/// Unbind phone number.
/// 
///
func unbindPhone() {
    //Normal
//        self.client?.unbindPhone(completion:{ status in
//            if(status.errors == nil) {
//                //Success
//                print(status.data?.unbindPhone ?? "")
//            } else {
//                //Failure
//                print(status.errors ?? "")
//            }
//        })

    //With result
    self.client?.unbindPhoneWithResult(completion:{ result in
        switch result {
        case .success(let graphQLResult):
            let status = graphQLResult
            if(status.errors == nil) {
                //Success
                print(status.data?.unbindPhone ?? "")
            } else {
                //Failure
                print(status.errors ?? "")
            }
            print(graphQLResult)
        case .failure(let error):
            print(error)
        }
    })
}

/// List Udv. (current user)
/// 
///
func listUdv() {
    //Normal
//        self.client?.listUdv(completion:{ status in
//            if(status.errors == nil) {
//                //Success
//                print(status.data?.udv ?? "")
//            } else {
//                //Failure
//                print(status.errors ?? "")
//            }
//        })

    //With result
    self.client?.listUdvWithResult(completion:{ result in
        switch result {
        case .success(let graphQLResult):
            let status = graphQLResult
            if(status.errors == nil) {
                //Success
                print(status.data?.udv ?? "")
            } else {
                //Failure
                print(status.errors ?? "")
            }
            print(graphQLResult)
        case .failure(let error):
            print(error)
        }
    })
}


/// Set Udv.
/// 
///
func setUdv() {
    //Normal
//        self.client?.setUdv(key: "HelloDate", value: Date(), completion:{ status in
//            if(status.errors == nil) {
//                //Success
//                print(status.data?.setUdv ?? "")
//            } else {
//                //Failure
//                print(status.errors ?? "")
//            }
//        })

    //With result
    self.client?.setUdvWithResult(key: "HelloDate", value: Date(), completion:{ result in
        switch result {
        case .success(let graphQLResult):
            let status = graphQLResult
            if(status.errors == nil) {
                //Success
                print(status.data?.setUdv ?? "")
            } else {
                //Failure
                print(status.errors ?? "")
            }
            print(graphQLResult)
        case .failure(let error):
            print(error)
        }
    })
}

/// Remove Udv.
/// 
///
func removeUdv() {
    //Normal
//        self.client?.removeUdv(key: "HelloDate", completion:{ status in
//            if(status.errors == nil) {
//                //Success
//                print(status.data?.removeUdv ?? "")
//            } else {
//                //Failure
//                print(status.errors ?? "")
//            }
//        })

    //With result
    self.client?.removeUdvWithResult(key: "HelloDate", completion:{ result in
        switch result {
        case .success(let graphQLResult):
            let status = graphQLResult
            if(status.errors == nil) {
                //Success
                print(status.data?.removeUdv ?? "")
            } else {
                //Failure
                print(status.errors ?? "")
            }
            print(graphQLResult)
        case .failure(let error):
            print(error)
        }
    })
}


/// List orgnization (current user)
/// 
func listOrg() {
    //Normal
//        self.client?.listOrg(completion: { status in
//            print(status)
//        })

    //With result
    self.client?.listOrgWithResult(completion: { result in
        print(result)
    })
}

/// Login by LDAP username.
/// 
func loginByLdap() {
    //Normal
//        self.client?.loginByLdap(username: textUsername.text!, password: textPassword.text!, completion: { status in
//            print(status)
//        })

    //With result
    self.client?.loginByLdapWithResult(username: textUsername.text!, password: textPassword.text!, completion: { result in
        print(result)
    })
}

/// Get Base64 from UIImage
/// 
///
func getBase64FromImage(_ name: String) -> String{
    let imageOrigin = UIImage(named: name)
    if let image = imageOrigin {
        let dataTmp = image.pngData()
        if let data = dataTmp {
            let imageStrTT = data.base64EncodedString()
            return imageStrTT
        }
    }
    return ""
}

```
