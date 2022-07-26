<template>
  <div class="callback-container">
    <div>{{ message }}</div>
  </div>
</template>

<script scoped setup>
import { inject, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const $authing = inject('$authing')

const message = 'This is callback page ~'

const handleAuthingLoginCallback = async () => {
  await $authing.enchancedLoginCallback()
  router.replace({
    name: 'Personal'
  })
}

onMounted(() => {
  handleAuthingLoginCallback()
})
</script>
