<script setup>
import { ref, onMounted } from 'vue'
import { getMensagens, criarMensagem } from '@/services/mensagensService.js'
import MensagemCard from '@/components/MensagemCard.vue'
import MensagemForm from '@/components/MensagemForm.vue'

</script>