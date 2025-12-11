<template>
  <div class="comment">
    <p>{{ model.texto }}</p>
    <small>{{ model.autor }} • {{ new Date(model.createdAt).toLocaleString() }}</small>
    <div class="actions">
      <button @click="$emit('edit', model)">Editar</button>
      <button @click="$emit('delete', model.id)">Excluir</button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({ model: { type: Object, required: true } })
const emit = defineEmits(['edit', 'delete'])
</script>

<style scoped>
.comment { border-bottom: 1px solid #eee; padding: 8px 0 }
.actions { margin-top: 8px }
button { margin-right: 6px }
</style>