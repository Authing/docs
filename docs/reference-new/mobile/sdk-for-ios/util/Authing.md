# Authing 类

<LastUpdated/>


## 计算密码安全等级

计算密码安全等级，返回三种级别的枚举类型：

- `weak`: 等级低
- `medium`: 等级中
- `strong`: 等级高

```swift
static func computePasswordSecurityLevel(password: String) -> PasswordStrength
```

**示例**

```swift
let res = Util.computePasswordSecurityLevel(password: "123") // .weak
```

<br>
