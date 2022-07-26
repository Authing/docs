import Vue from 'vue'

import router from '@/router'
import App from '@/App'

import { enhancedAuthing } from '@/plugins/enhancedAuthing'

Vue.use(enhancedAuthing, {
  appId: '62be97e30fa6ea1c1ced35c0',
  appHost: 'https://spa-demo-2022.authing.cn',
  redirectUri: 'http://localhost:3000/callback',
  tokenEndPointAuthMethod: 'none',
  introspectionEndPointAuthMethod: 'none'
})

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
