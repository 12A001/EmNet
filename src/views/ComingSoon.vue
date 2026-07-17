<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center p-6">
    <div class="max-w-md">
      <Rocket class="w-20 h-20 mx-auto mb-6 text-blue-600 animate-bounce" />
      <h1 class="text-4xl font-bold text-gray-800 mb-3">Coming Soon</h1>
      <p class="text-gray-600 mb-6">
        This feature is currently being built to serve you better.
        Please check back later or stay tuned for updates!
      </p>
      <router-link
        to="/dashboard"
        class="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
      >
        <ArrowLeft class="w-5 h-5" />
        Go Back to Dashboard
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { Rocket, ArrowLeft } from "lucide-vue-next";
</script>
