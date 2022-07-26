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

<script setup>
import { inject, ref, onMounted } from 'vue'

const $authing = inject('$authing')
const userInfo = ref('')

const getCurrentUser = async () => {
  const _userInfo = await $authing.getCurrentUser()
  userInfo.value = _userInfo && JSON.stringify(_userInfo, null, 2) || ''
}
const onLogin = () => $authing.enhancedLogin()
const onLogout = () => $authing.enhancedLogout()

onMounted(() => {
  getCurrentUser()
})
</script>
