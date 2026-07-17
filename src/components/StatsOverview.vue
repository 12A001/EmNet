<template>
  <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
    <div
      v-for="(item, index) in stats"
      :key="index"
      class="bg-white rounded-2xl shadow-md p-4 text-center"
    >
      <h3 class="text-2xl font-bold text-blue-600">{{ item.value }}</h3>
      <p class="text-gray-500 text-sm">{{ item.label }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  stats: Array,
});
</script>
