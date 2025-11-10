<template>
  <div class="app">
    <h1>Mensagens do DB.json</h1>

    <mensagem-form @enviarMensagem="adicionarMensagem" />

    <mensagem-card
      v-for="m in mensagens"
      :key="m.id"
      :mensagem="m"
      @excluir="removerMensagem(m.id)"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getResources, createResource, deleteResource } from './services/resourceService'
import MensagemForm from './components/MensagemForm.vue'
import MensagemCard from './components/MensagemCard.vue'

const mensagens = ref([])

onMounted(async () => {
  const res = await getResources()
  mensagens.value = res.data
})

const adicionarMensagem = async (novaMensagem) => {
  const res = await createResource(novaMensagem)
  mensagens.value.push(res.data)
}

const removerMensagem = async (id) => {
  await deleteResource(id)
  mensagens.value = mensagens.value.filter(m => m.id !== id)
}
</script>

<style scoped>
.app {
  padding: 20px;
  max-width: 600px;
  margin: auto;
  font-family: Arial, sans-serif;
}
</style>