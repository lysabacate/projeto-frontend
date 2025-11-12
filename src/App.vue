<template>
  <div class="app">
    <h1>Mensagens do DB.json</h1>

    <mensagem-form 
      @enviarMensagem="adicionarMensagem" 
      @atualizarMensagem="confirmarAtualizacao"
      :mensagem-edicao="mensagemParaEditar"
    />

    <mensagem-card
      v-for="m in mensagens"
      :key="m.id"
      :mensagem="m"
      @excluir="removerMensagem(m.id)"
      @iniciarEdicao="selecionarMensagemParaEditar"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getResources, createResource, updateResource, deleteResource } from './services/resourceService'
import MensagemForm from './components/MensagemForm.vue'
import MensagemCard from './components/MensagemCard.vue'

const mensagens = ref([])
const mensagemParaEditar = ref(null)

onMounted(async () => {
  const res = await getResources()
  mensagens.value = res.data
})

const adicionarMensagem = async (novaMensagem) => {
  const res = await createResource(novaMensagem)
  mensagens.value.push(res.data)
}

async function removerMensagem(id) {
  try {
    await deleteResource(id);
    mensagens.value = mensagens.value.filter(m => m.id !== id);
  } catch (error) {
    console.error("Erro ao excluir mensagem:", error);
  }
}

function selecionarMensagemParaEditar(mensagem) {
  mensagemParaEditar.value = { ...mensagem }
}

async function confirmarAtualizacao(mensagemAtualizada) {
  try {
    const msgAtualizada = await updateResource(mensagemAtualizada.id, mensagemAtualizada)

    const indexMensagem = mensagens.value.findIndex(m => m.id === mensagemAtualizada.id)
    if (indexMensagem !== -1) {
      mensagens.value[indexMensagem] = msgAtualizada
    }
    
    mensagemParaEditar.value = null 

  } catch (error) {
    console.error("Erro ao atualizar mensagem:", error);
  }
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