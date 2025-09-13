<script setup>
import Sidebar from './components/Sidebar.vue'
</script>

<template>
  <div class="bg-gray-900 min-h-screen text-white font-sans flex">
    <!-- Sidebar -->
    <Sidebar />

    <!-- Main Content -->
    <main class="flex-1 p-4 md:p-8">
      <router-view />
    </main>
  </div>
</template>
