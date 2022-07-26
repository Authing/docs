<template>
  <div class="callback-container">
    <div>{{ message }}</div>
  </div>
</template>

<script scoped>
export default {
  name: 'Callback',
  data () {
    return {
      message: 'This is callback page ~'
    }
  },
  mounted () {
    this.handleAuthingLoginCallback()  
  },
  methods: {
    async handleAuthingLoginCallback () {
      await this.$authing.enchancedLoginCallback()
      
      this.$router.replace({
        name: 'Personal'
      })
    }
  }
}
</script>
