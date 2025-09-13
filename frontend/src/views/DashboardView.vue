<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import PriceChart from '../components/PriceChart.vue'

const alerts = ref([])
const isLoading = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    const res = await axios.get('http://localhost:3000/api/crypto-alerts')
    alerts.value = res.data
  } catch (err) {
    error.value = 'Failed to load dashboard data'
    console.error(err)
  } finally {
    isLoading.value = false
  }
})

const latestCoins = computed(() => {
  const map = new Map()
  for (const a of alerts.value) {
    if (!map.has(a.symbol.toUpperCase())) {
      map.set(a.symbol.toUpperCase(), a)
    }
  }
  return Array.from(map.values())
})
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold mb-6">📊 Crypto Dashboard</h1>
    <p class="text-gray-600 mb-8">
      Track real-time cryptocurrency prices, market trends, and performance metrics.
    </p>

    <div v-if="isLoading">Loading...</div>
    <div v-if="error" class="text-red-400">{{ error }}</div>

    <div v-if="!isLoading && !error">
      <section class="grid md:grid-cols-2 gap-6 mb-10">
        <div v-for="coin in latestCoins" :key="coin.symbol" class="bg-gray-800 p-5 rounded-lg">
          <h2 class="text-xl font-bold">{{ coin.coinName }} ({{ coin.symbol }})</h2>
          <p class="text-2xl">${{ coin.price.toLocaleString() }}</p>
          <p :class="coin.change24h > 0 ? 'text-green-400' : 'text-red-400'">
            {{ coin.change24h.toFixed(2) }}% (24h)
          </p>
        </div>
      </section>

      <!-- Chart -->
      <section>
        <PriceChart :alerts="alerts" />
      </section>
    </div>
  </div>
</template>