<template>
  <div>
    <input v-model="novaMensagem.titulo" placeholder="Título" />
    <textarea v-model="novaMensagem.texto" placeholder="Mensagem"></textarea>
    <input v-model="novaMensagem.autor" placeholder="Autor" />
    <button @click="enviar">Enviar</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['enviarMensagem'])

const novaMensagem = ref({
  titulo: '',
  texto: '',
  autor: ''
})

const enviar = () => {
  if (
    !novaMensagem.value.titulo.trim() ||
    !novaMensagem.value.texto.trim() ||
    !novaMensagem.value.autor.trim()
  )
    return

  emit('enviarMensagem', { ...novaMensagem.value })

  novaMensagem.value = { titulo: '', texto: '', autor: '' }
}
</script>

<style scoped>
div {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
}
input,
textarea {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
}
textarea {
  min-height: 80px;
}
button {
  background: #42b983;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
}
button:hover {
  background: #36986b;
}
</style>