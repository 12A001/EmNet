<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
  >
    <div class="bg-white p-6 rounded-2xl shadow-lg max-w-sm w-full text-center">
      <h3 class="text-xl font-semibold mb-4">Payment Status</h3>
      <p class="text-gray-700 mb-4">{{ message }}</p>
      <button
        @click="$emit('close')"
        class="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg w-full"
      >
        Close
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  show: Boolean,
  message: String
})
</script>
