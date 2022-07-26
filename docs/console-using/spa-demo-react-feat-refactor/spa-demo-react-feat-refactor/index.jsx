import * as React from 'react'
import { createRoot } from 'react-dom/client'

import { AuthingProvider } from '@/enhance-authing-sdk'
import App from '@/App'

const root = createRoot(document.getElementById('root'))

root.render(
  <AuthingProvider
    appId="62be97e30fa6ea1c1ced35c0"
    appHost="https://spa-demo-2022.authing.cn"
    redirectUri="http://localhost:3000/callback"
    tokenEndPointAuthMethod="none"
    introspectionEndPointAuthMethod="none">
    <App />
  </AuthingProvider>
)
