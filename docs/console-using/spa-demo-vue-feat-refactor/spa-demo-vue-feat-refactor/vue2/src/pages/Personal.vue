<template>
  <div class="personal-container">{{ message }}</div>
</template>

<script scoped>
export default {
  name: 'Personal',
  data () {
    return {
      message: 'this is personal page ~'
    }
  }
}
</script>