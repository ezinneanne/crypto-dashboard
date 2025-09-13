<script setup>
defineProps({
  coin: { type: Object, required: true }
})
</script>

<template>
  <div class="bg-gray-800 p-5 rounded-lg shadow hover:scale-105 transition">
    <img :src="coin.thumbnail" :alt="coin.coinName" class="w-16 h-16 mb-4 rounded-full" />
    <h2 class="text-xl font-bold">{{ coin.coinName }} ({{ coin.symbol.toUpperCase() }})</h2>
    <p class="text-gray-400">Rank: {{ coin.marketCapRank }}</p>
    <p class="text-gray-400">Score: {{ coin.score }}</p>
    <p class="text-sm text-gray-500 mt-2">Price (BTC): {{ coin.priceBtc }}</p>
  </div>
</template>
