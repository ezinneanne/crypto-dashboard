<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import AlertsTable from '../components/AlertsTable.vue'

const alerts = ref([])
const isLoading = ref(true)

onMounted(async () => {
  const res = await axios.get('http://localhost:3000/api/crypto-alerts')
  alerts.value = res.data
  isLoading.value = false
})
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold mb-6">🔔 Alerts</h1>
    <div v-if="isLoading">Loading...</div>
    <AlertsTable v-else :alerts="alerts" />
  </div>
</template>
