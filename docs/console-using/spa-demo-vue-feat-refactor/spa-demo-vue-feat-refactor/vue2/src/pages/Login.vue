<template>
  <div class="login-container">
    <div style="margin-bottom: 30px;">
      <button v-if="!userInfo" @click="onLogin">登录</button>
      <button v-else @click="onLogout">登出</button>
    </div>

    <div v-if="userInfo">
      <div>用户信息：</div>
      <textarea cols="100" rows="30" :value="userInfo"></textarea>
    </div>
  </div>
</template>

<script scoped>
export default {
  name: 'Login',
  data () {
    return {
      userInfo: ''
    }
  },
  mounted () {
    this.getUserInfo()
  },
  methods: {
    getUserInfo () {
      this.$authing.getCurrentUser().then(userInfo => {
        this.userInfo = userInfo && JSON.stringify(userInfo, null, 2) || ''
      })
    },

    onLogin () {
      this.$authing.enhancedLogin()
    },

    onLogout () {
      this.$authing.enhancedLogout()
    }
  }
}
</script>
