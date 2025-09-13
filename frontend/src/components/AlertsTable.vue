<script setup>
defineProps({
  alerts: { type: Array, required: true }
})
</script>

<template>
  <div class="bg-gray-800 rounded-lg shadow-lg p-4 overflow-x-auto">
    <table class="w-full text-left">
      <thead class="text-gray-400">
        <tr>
          <th class="p-3">Coin</th>
          <th class="p-3">Price</th>
          <th class="p-3">24h Change</th>
          <th class="p-3 hidden md:table-cell">Timestamp</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(alert, i) in alerts" :key="i" class="border-t border-gray-700 hover:bg-gray-700/50">
          <td class="p-3 font-bold">{{ alert.coinName }} ({{ alert.symbol.toUpperCase() }})</td>
          <td class="p-3">${{ alert.price.toLocaleString() }}</td>
          <td :class="alert.change24h > 0 ? 'text-green-400' : 'text-red-400'" class="p-3 font-semibold">
            {{ alert.change24h.toFixed(2) }}%
          </td>
          <td class="p-3 hidden md:table-cell text-gray-500">{{ new Date(alert.timestamp).toLocaleString() }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
