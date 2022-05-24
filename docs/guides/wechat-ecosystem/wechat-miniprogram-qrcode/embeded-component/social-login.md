{{$localeConfig.brandName}} 嵌入登录组件可以嵌入到你的应用中，可根据你的需求进行配置，建议用于单页面应用程序。它使你可以轻松添加各种社会化登录方式，以便你的用户可以无缝登录，并且在不同平台拥有一致的登录体验。

Guard 支持 React、Vue、Angular 三种前端框架以及原生 JS 调用，以 React 组件为例：你可以传入 socialConnections 指定需要显示的社会化登录方式，如果不传的话，默认会显示所有已配置的。

```javascript
import React from 'react'
import ReactDOM from 'react-dom'
import { AuthingGuard, LoginMethods } from '@authing/react-ui-components'
// 引入 css 文件
import '@authing/react-ui-components/lib/index.min.css'

const App = () => {
  const appId = 'AUTHING_APP_ID'
  const onLogin = (userInfo) => {
    console.log(userInfo)
  }
  return <Guard 
    appId={appId} 
    config={{
    loginMethods: [
        LoginMethods.WxMinQr
      ]
    }} 
    onLogin ={onLogin} />
}

ReactDOM.render(<App />, root)
```


详细文档请见：[登录组件](/reference-new/guard/README.md)。
