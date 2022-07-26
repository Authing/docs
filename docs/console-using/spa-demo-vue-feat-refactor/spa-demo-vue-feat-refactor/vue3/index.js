import { createApp } from 'vue'

import router from '@/router'

import App from '@/App'

import { enhancedAuthing } from '@/plugins/enhancedAuthing'

const app = createApp(App)

app.use(enhancedAuthing, {
  appId: '62be97e30fa6ea1c1ced35c0',
  appHost: 'https://spa-demo-2022.authing.cn',
  redirectUri: 'http://localhost:3000/callback',
  tokenEndPointAuthMethod: 'none',
  introspectionEndPointAuthMethod: 'none'
})

app.use(router)

app.mount('#app')
