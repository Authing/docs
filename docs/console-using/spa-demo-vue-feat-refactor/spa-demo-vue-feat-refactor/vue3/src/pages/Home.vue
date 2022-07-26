<template>
  <div class="home-container">
    <div style="margin-bottom: 30px;">{{ message }}</div>
    <button @click="toLogin">go to login page</button>
  </div>
</template>

<script scoped setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const message = 'This is home page ~~'

const toLogin = () => {
  router.push({
    name: 'Login'
  })
}
</script>
