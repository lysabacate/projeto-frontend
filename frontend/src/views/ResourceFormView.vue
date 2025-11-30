<template>
  <div>
    <h2>{{ editing ? 'Editar Recurso' : 'Novo Recurso' }}</h2>
    <resource-form :model="model" @save="save" @cancel="cancel" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getResource, createResource, updateResource } from '../services/resourceService'
import ResourceForm from '../components/ResourceForm.vue'

const route = useRoute()
const router = useRouter()
const model = ref(null)
const editing = ref(false)

onMounted(async () => {
  const id = route.params.id
  if (id) {
    editing.value = true
    const res = await getResource(id)
    model.value = res.data
  }
})

const save = async (payload) => {
  try {
    if (editing.value) {
      await updateResource(model.value.id, payload)
    } else {
      await createResource(payload)
    }
    router.push({ name: 'resources' })
  } catch (err) {
    console.error(err)
  }
}

const cancel = () => router.back()
</script>
