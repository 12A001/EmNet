<template>
  <section class="min-h-screen flex flex-col items-center justify-center bg-[#eef2ff] text-gray-800 px-6 text-center">

    <!-- Animated Plane -->
    <div class="relative w-full max-w-md h-32 mb-8">
<Plane class="w-6 h-6" />      <div class="w-full h-1 bg-[#60a5fa]/20 absolute top-1/2 -translate-y-1/2 rounded-full"></div>
    </div>

    <!-- Heading -->
    <h1 class="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#003366] mb-4">
      Flights Coming Soon!
    </h1>

    <!-- Description -->
    <p class="text-md sm:text-lg md:text-xl text-gray-600 max-w-xl leading-relaxed">
      We're working on bringing flight booking to EmNet. Stay tuned and get ready to fly!
    </p>

  </section>
</template>

<script setup>
import { Plane } from 'lucide-vue-next'
</script>

<style scoped>
/* Plane flying animation */
@keyframes fly {
  0% {
    transform: translateX(-100%) rotate(0deg);
  }
  50% {
    transform: translateX(50%) rotate(15deg);
  }
  100% {
    transform: translateX(100%) rotate(0deg);
  }
}

.plane {
  animation: fly 6s linear infinite;
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .plane {
    width: 40px;
    height: 40px;
  }
}
</style>
