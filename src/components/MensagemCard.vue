<template>
  <li class="card">
    <div class="conteudo">
      <h3>{{ props.mensagem.titulo }}</h3>
      <p>{{ props.mensagem.texto }}</p>
      <small>✍️ {{ props.mensagem.autor }}</small>
    </div>
    <button @click="$emit('excluir', props.mensagem.id)">🗑️</button>
    <button @click="$emit('atualizar', props.mensagem)">🔃</button>
  </li>
</template>

<script setup>
const props = defineProps({
  mensagem: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.card {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  background: #f8f8f8;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 10px;
  list-style: none;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
}
.conteudo {
  flex: 1;
}
h3 {
  margin: 0 0 6px;
  color: #333;
}
p {
  margin: 0 0 6px;
  color: #333;
}
small {
  color: #777;
}
button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
}
button:hover {
  color: red;
}
</style>