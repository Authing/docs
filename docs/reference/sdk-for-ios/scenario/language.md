# 设置语言

<LastUpdated/>

Guard iOS SDK 支持中文、英文、日文、中文繁体，SDK 默认跟随手机语言设置，当无法识别语言时，默认为英文。
开发者如需手动设置语言，可通过 Authing.setLanguage() 设置：

```Swift
Authing.start(<#AUTHING_APP_ID#>)
Authing.setLanguage(language: Language.Chinese.rawValue)
```