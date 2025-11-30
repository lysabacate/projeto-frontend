<template>
  <div id="app">
    <header class="top">
      <nav>
        <router-link to="/resources">Recursos</router-link>
        <router-link to="/resources/new">Novo</router-link>
      </nav>
      <div>
        <span v-if="user">{{ user.name }}</span>
        <button v-if="user" @click="doLogout">Sair</button>
        <router-link v-else to="/login">Login</router-link>
      </div>
    </header>
    <router-view />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import router from './router'
import { getUser, logout } from './services/authService'

const user = ref(getUser())

function doLogout() {
  logout()
  user.value = null
  router.push({ name: 'login' })
}
onMounted(() => {})
</script>

<style>
body { font-family: Arial, sans-serif; margin: 0; }
#app { padding: 16px; max-width: 900px; margin: auto; }
</style>