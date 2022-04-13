{{$localeConfig.brandName}} embedded login component can be embedded in your application and can be configured according to your needs. It is recommended for single-page applications. It allows you to easily add various social login methods so that your users can log in seamlessly and have a consistent login experience on different platforms.

Guard supports React, Vue, Angular three front-end frameworks and native JS calls. Take the React component as an example: you can pass in socialConnections to specify the social login method that needs to be displayed. If not, all configured ones will be displayed by default.

```javascript
import React from 'react'
import ReactDOM from 'react-dom'
import { AuthingGuard } from '@authing/react-ui-components'
// import css file
import '@authing/react-ui-components/lib/index.min.css'

const App = () => {
  const appId = 'AUTHING_APP_ID'
  const onLogin = (userInfo) => {
    console.log(userInfo)
  }
  return <Guard appId={appId} config={{
    title: '{{$localeConfig.brandName}}',
    socialConnections: ['github'],
  }} onLogin ={onLogin} />
}

ReactDOM.render(<App />, root)
```


For details, please see: [Login component](../../../../reference/guard/README.md).
