<template>
  <div class="resource-form">
    <form @submit.prevent="onSubmit">
      <input v-model="form.titulo" placeholder="Título" required />
      <textarea v-model="form.texto" placeholder="Mensagem" required></textarea>
      <input v-model="form.autor" placeholder="Autor" required />
      <select v-model="form.status">
        <option value="published">Publicar</option>
        <option value="draft">Rascunho</option>
      </select>
      <input v-model="form.categoria" placeholder="Categoria" />
      <div class="buttons">
        <button type="submit">Salvar</button>
        <button type="button" @click="$emit('cancel')">Cancelar</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { watch, ref } from 'vue'

const props = defineProps({ model: { type: Object, default: null } })
const emit = defineEmits(['save', 'cancel'])

const form = ref({ titulo: '', texto: '', autor: '', status: 'published', categoria: '' })

watch(() => props.model, (nv) => {
  if (nv) form.value = { ...nv }
  else form.value = { titulo: '', texto: '', autor: '', status: 'published', categoria: '' }
}, { immediate: true })

const onSubmit = () => {
  // basic validation
  if (!form.value.titulo.trim() || !form.value.texto.trim() || !form.value.autor.trim()) return
  emit('save', { ...form.value })
}
</script>

<style scoped>
.resource-form { margin-bottom: 12px }
input, textarea, select { display:block; width:100%; padding:8px; margin-bottom:8px }
.buttons { display:flex; gap:8px }
</style>
