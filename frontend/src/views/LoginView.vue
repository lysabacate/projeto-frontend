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
    const resp = await login(email.value, password.value)
    console.log('LoginView submit resp:', resp)
    router.push({ name: 'resources' })
  } catch (err) {
    console.error('LoginView error:', err)
    const status = err?.response?.status
    // Network Error case (no response): err.message contains 'Network Error'
    const message = err?.response?.data?.error || (err?.message || 'Falha no login')
    if (!err?.response) {
      error.value = 'Erro de rede: não foi possível conectar ao servidor. Verifique se o backend está rodando e se o URL/API está configurado corretamente.'
    } else {
      error.value = status ? `${status}: ${message}` : message
    }
  }
}
</script>

<style scoped>
.login { padding: 20px; max-width: 400px; margin:auto }
input { display:block; width:100%; margin-bottom:10px; padding:8px }
.error { color: red; margin-top:10px }
</style>
