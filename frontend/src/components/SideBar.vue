<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <aside class="w-64 bg-gray-800 min-h-screen p-6">
    <h2 class="text-2xl font-bold text-cyan-400 mb-8">Crypto Watcher</h2>
    <nav class="space-y-4">
      <RouterLink to="/" class="block text-lg hover:text-cyan-300">📊 Dashboard</RouterLink>
      <RouterLink to="/alerts" class="block text-lg hover:text-cyan-300">🔔 Alerts</RouterLink>
      <RouterLink to="/trending" class="block text-lg hover:text-cyan-300">🚀 Trending</RouterLink>
    </nav>
  </aside>
</template>
