<template>
  <div>
    <form @submit.prevent="send">
      <textarea v-model="form.texto" placeholder="Comentário" required></textarea>
      <input v-model="form.autor" placeholder="Autor" required />
      <button type="submit">{{ form.id ? 'Atualizar' : 'Adicionar' }}</button>
    </form>
  </div>
</template>

<script setup>
import { watch, ref } from 'vue'
const props = defineProps({ model: { type: Object, default: null }, resourceId: { type: Number } })
const emit = defineEmits(['save', 'cancel'])
const form = ref({ id: null, texto: '', autor: '' })

watch(() => props.model, (nv) => {
  if (nv) form.value = { ...nv }
  else form.value = { id: null, texto: '', autor: '' }
}, { immediate: true })

const send = () => {
  if (!form.value.texto.trim() || !form.value.autor.trim()) return
  const payload = { ...form.value }
  if (!payload.id) payload.resourceId = props.resourceId
  emit('save', payload)
  form.value = { id: null, texto: '', autor: '' }
}
</script>

<style scoped>
textarea, input { display:block; width:100%; margin-bottom:10px; padding:8px }
</style>