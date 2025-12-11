<template>
  <div id="app">
    <header class="top">
      <nav v-if="!isLoginPage">
        <router-link to="/resources">Recursos</router-link>
        <router-link to="/resources/new">Novo</router-link>
      </nav>
      <div>
        <div> 
          <span v-if="user">{{ user.name }}</span>
          <button v-if="user" @click="doLogout">Sair</button>
        </div>
        <router-link v-if="!isLoginPage" to="/login">Login</router-link>
      </div>
    </header>
    <router-view />
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import router from './router'
import { getUser, logout } from './services/authService'
import { useRoute } from 'vue-router'

const route = useRoute()
const user = ref(getUser())

const isLoginPage = computed(() => route.path === '/login')

function doLogout() {
  logout()
  user.value = null
  router.push({ name: 'login' })
}
onMounted(() => {})
</script>

<style>
body { font-family: Arial, sans-serif; margin: 0; }
.top {display: flex; flex-direction: column; align-items: center; gap: 20px;}
.top>nav {display: flex; align-items: center; gap: 10px;}
.top>div {display: flex; flex-direction: column; align-items: center; gap: 10px;}
.top>div>div {display: flex; align-items: center; gap: 10px;}
#app { padding: 16px; max-width: 900px; margin: auto; }
</style>