<template>
  <div class="login">
    <h2>Login</h2>
    <form @submit.prevent="submit">
      <input v-model="email" placeholder="Email" type="email" required />
      <input v-model="password" placeholder="Senha" type="password" required />
      <button type="submit">Entrar</button>
    </form>
    <div v-if="error" class="error">{{ error }}</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { login } from '../services/authService'
import { useRouter } from 'vue-router'

const email = ref('admin@example.com')
const password = ref('123456')
const error = ref(null)
const router = useRouter()

const submit = async () => {
  try {
    error.value = null
    await login(email.value, password.value)
    router.push({ name: 'resources' })
  } catch (err) {
    error.value = err?.response?.data?.error || 'Falha no login'
  }
}
</script>

<style scoped>
.login { padding: 20px; max-width: 400px; margin:auto }
input { display:block; width:100%; margin-bottom:10px; padding:8px }
.error { color: red; margin-top:10px }
</style>
