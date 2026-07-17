<template>
  <div class="bg-white rounded-2xl shadow-md p-6">
    <h2 class="text-lg font-semibold mb-4">Buy Data</h2>

    <!-- Loading state -->
    <div v-if="loading" class="text-center text-gray-500 py-6">
      Loading plans...
    </div>

    <!-- No plans / select network -->
    <div v-else-if="plans.length === 0" class="text-center text-gray-500 py-6">
      Select a network to view available data plans.
    </div>

    <!-- Data plans grid -->
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div
        v-for="plan in plans"
        :key="plan.id"
        class="border rounded-xl p-4 flex items-center justify-between hover:shadow-lg transition"
      >
        <div class="flex items-center space-x-3">
          <img
            :src="getNetworkLogo(plan)"
            alt="Network Logo"
            class="w-10 h-10 rounded-full object-contain bg-gray-50 border"
          />

          <div>
            <p class="font-semibold text-gray-800">
              {{ formatNetworkName(plan) }}
            </p>
            <p class="text-sm text-gray-500">
              {{ plan.size }} • {{ plan.validity }}
            </p>
          </div>
        </div>

        <button
          @click="$emit('purchase', plan)"
          class="bg-yellow-500 hover:bg-yellow-600 cursor-pointer text-white px-4 py-2 rounded-lg text-sm"
        >
          ₦{{ plan.sellPrice }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import mtnLogo from '@/assets/images/New-mtn-logo.jpg'
import airtelLogo from '@/assets/images/Airtel_logo-01.png'
import gloLogo from '@/assets/images/glo-Logo.jpg'
import mobile9Logo from '@/assets/images/9mobile-1.svg'
import defaultLogo from '@/assets/images/emnet-logo.jpg'

defineProps({
  plans: Array,
  loading: Boolean,
})

// Helper: Detect network name and show the right logo
const getNetworkLogo = (plan) => {
  const name = (plan.name || plan.network || '').toLowerCase()
  if (name.includes('mtn')) return mtnLogo
  if (name.includes('airtel')) return airtelLogo
  if (name.includes('glo')) return gloLogo
  if (name.includes('9mobile') || name.includes('etisalat')) return mobile9Logo
  return defaultLogo
}

const formatNetworkName = (plan) => {
  const name = (plan.name || plan.network || '').toLowerCase()
  if (name.includes('mtn')) return 'MTN'
  if (name.includes('airtel')) return 'Airtel'
  if (name.includes('glo')) return 'Glo'
  if (name.includes('9mobile') || name.includes('etisalat')) return '9mobile'
  return plan.name
}
</script>
