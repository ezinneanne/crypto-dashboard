<script setup>
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS, Title, Tooltip, Legend,
  LineElement, CategoryScale, LinearScale, PointElement
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement)

defineProps({
  alerts: { type: Array, required: true }
})

const chartData = computed(() => {
  return {
    labels: alerts.map(a => new Date(a.timestamp).toLocaleTimeString()),
    datasets: [{
      label: 'Price (USD)',
      data: alerts.map(a => a.price),
      borderColor: '#06b6d4',
      tension: 0.2
    }]
  }
})

const chartOptions = {
  responsive: true,
  plugins: { legend: { labels: { color: 'white' } } },
  scales: {
    x: { ticks: { color: 'white' } },
    y: { ticks: { color: 'white' } }
  }
}
</script>

<template>
  <Line :data="chartData" :options="chartOptions" />
</template>
