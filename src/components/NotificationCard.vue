<template>
  <transition-group name="slide-down" tag="div" class="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2 w-[95%] sm:w-96">
    <div v-for="(n, index) in notifications" :key="n.id" class="flex items-start gap-3 bg-white dark:bg-slate-800 text-slate-800 dark:text-gray-100 shadow-lg rounded-xl px-4 py-3 border dark:border-slate-700">
      <component :is="iconFor(n.type)" class="w-5 h-5 mt-1 text-cyan-500 flex-shrink-0" />
      <div class="flex-1">
        <p class="font-semibold text-sm">{{ n.title }}</p>
        <p class="text-xs text-gray-500 dark:text-gray-400">{{ n.message }}</p>
      </div>
      <button @click="remove(index)" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">✕</button>
    </div>
  </transition-group>
</template>

<script setup>
import { AlertTriangle, Info, CheckCircle, Zap } from 'lucide-vue-next';

const { notifications } = defineProps({
  notifications: { type: Array, required: true }
});

const emit = defineEmits(['remove']);
function remove(i) { emit('remove', i); }

function iconFor(type) {
  if (type === 'warning') return AlertTriangle;
  if (type === 'success') return CheckCircle;
  if (type === 'electric') return Zap;
  return Info;
}
</script>


<style scoped>
.slide-down-enter-active, .slide-down-leave-active { transition: all .4s ease; }
.slide-down-enter-from, .slide-down-leave-to { opacity: 0; transform: translateY(-30px); }
</style>
