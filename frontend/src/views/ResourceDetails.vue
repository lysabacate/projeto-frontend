<template>
  <div>
    <h2>{{ resource?.titulo }}</h2>
    <p>{{ resource?.texto }}</p>
    <small>{{ resource?.autor }} • {{ new Date(resource?.createdAt).toLocaleString() }}</small>

    <h3>Comentários</h3>
    <subresource-form :resourceId="resource?.id" :model="editing" @save="saveSubresource" @cancel="cancelEdit" />
    <subresource-card v-for="c in comments" :key="c.id" :model="c" @edit="startEdit" @delete="deleteComment" />
    <div v-if="comments.length === 0">Sem comentários</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getResource } from '../services/resourceService'
import { getSubresources, createSubresource, updateSubresource, deleteSubresource } from '../services/subresourceService'
import SubresourceCard from '../components/SubresourceCard.vue'
import SubresourceForm from '../components/SubresourceForm.vue'

const route = useRoute()
const resource = ref(null)
const comments = ref([])
const editing = ref(null)

async function loadResource() {
  const id = route.params.id
  const res = await getResource(id)
  resource.value = res.data
}

async function loadComments() {
  const id = route.params.id
  const res = await getSubresources(id)
  comments.value = res.data
}

onMounted(() => { loadResource(); loadComments(); })

const saveSubresource = async (payload) => {
  if (payload.id) {
    await updateSubresource(payload.id, { texto: payload.texto, autor: payload.autor })
  } else {
    await createSubresource(payload)
  }
  editing.value = null
  await loadComments()
}

const startEdit = (c) => { editing.value = { ...c } }
const cancelEdit = () => { editing.value = null }
const deleteComment = async (id) => { 
  if (!confirm('Deseja remover este comentário?')) return
  await deleteSubresource(id)
  await loadComments()
}
</script>
