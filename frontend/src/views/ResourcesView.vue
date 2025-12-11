<template>
  <div>
    <div class="header">
      <h1>Recursos</h1>
      <div>
        <input v-model="filters.q" placeholder="Pesquisar por título/texto/autor" />
        <select v-model="filters.status">
          <option value="">Todos</option>
          <option value="published">Publicados</option>
          <option value="draft">Rascunho</option>
        </select>
        <router-link :to="{ name: 'resource-new' }">Novo</router-link>
      </div>
    </div>

    <div v-if="message">{{ message }}</div>
    <ul>
      <li v-for="r in resources" :key="r.id">
        <h3>{{ r.titulo }}</h3>
        <p>{{ r.texto }}</p>
        <small>{{ r.autor }} — {{ new Date(r.createdAt).toLocaleString() }}</small>
        <div class="actions">
          <router-link :to="{ name: 'resource-details', params: { id: r.id } }">Ver</router-link>
          <router-link :to="{ name: 'resource-edit', params: { id: r.id } }">Editar</router-link>
          <button @click="remove(r.id)">Excluir</button>
        </div>
      </li>
    </ul>
    <div v-if="resources.length === 0">Nenhum recurso encontrado.</div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { getResources } from '../services/resourceService'
import { deleteResource } from '../services/resourceService'

const router = useRouter()
const resources = ref([])
const message = ref(null)
const filters = ref({ q: '', status: '' })

async function load() {
  try {
    const res = await getResources({ q: filters.value.q, status: filters.value.status })
    resources.value = res.data
    if (resources.value.length === 0) message.value = 'Lista vazia'
    else message.value = null
  } catch (err) {
    message.value = 'Erro ao buscar recursos'
  }
}

onMounted(load)

watch(filters, load, { deep: true })

async function remove(id) {
  try {
    if (!confirm('Deseja realmente excluir este recurso?')) return
    await deleteResource(id)
    await load()
  } catch (err) {
    message.value = 'Erro ao excluir recurso'
  }
}
</script>

<style scoped>
.header { display:flex; align-items:center; gap:10px }
.header>div{display: flex; align-items: center; gap: 10px;}
ul { padding: 0 }
li { list-style:none; border-bottom:1px solid #eee; padding:8px 0 }
.actions { margin-top:8px; display: flex; gap: 10px; align-items: center; justify-content: center;}
</style>
