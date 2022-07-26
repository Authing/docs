<template>
  <div class="home-container">
    <div style="margin-bottom: 30px;">{{ message }}</div>
    <button @click="toLogin">go to login page</button>
  </div>
</template>

<script scoped>
export default {
  name: 'Home',
  data () {
    return {
      message: 'This is home page ~'
    }
  },
  methods: {
    toLogin () {
      this.$router.push({
        name: 'Login'
      })
    }
  }
}
</script>
