<template>
  <div class="min-h-screen bg-gray-50 text-gray-900">
    <Navbar />
    <router-view />


    
  </div>
</template>

<script setup>
import Navbar from './components/NavBar.vue';



</script>

<style scoped>
/* Fade + slide animation */
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
.fade-slide-enter-to {
  opacity: 1;
  transform: translateY(0);
}
.fade-slide-leave-from {
  opacity: 1;
  transform: translateY(0);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
