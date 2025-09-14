<script setup>
import { ref, onMounted } from 'vue'
import api from '../api.js'
import TrendingCard from '../components/TrendingCard.vue'

const trending = ref([])
const isLoading = ref(true)

onMounted(async () => {
  const res = await api.get('/api/trending-coins')
  trending.value = res.data
  isLoading.value = false
})
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold mb-6">🚀 Trending Coins</h1>
    <div v-if="isLoading">Loading...</div>

    <div v-else class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <TrendingCard v-for="coin in trending" :key="coin.symbol" :coin="coin" />
    </div>
  </div>
</template>
