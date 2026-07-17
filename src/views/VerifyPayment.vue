<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-6">
    <h2 class="text-2xl font-semibold mb-4 text-gray-800">Verifying Payment...</h2>
    <p class="text-gray-600">{{ message }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import config from '@/config/api'

const route = useRoute()
const router = useRouter()
const message = ref('Please wait while we confirm your payment.')

onMounted(async () => {
  const reference = route.query.reference
  const token = localStorage.getItem('token')

  // If user is not logged in, save reference and go to login
  if (!token) {
    router.push(`/login?reference=${reference}`)
    return
  }

  try {
    const res = await axios.get(`${config.BACKEND}/data/verify-payment?reference=${reference}`, {
      headers: { Authorization: `Bearer ${token}` },
    })

    if (res.data.success) {
      message.value = ' Payment successful! Redirecting to your dashboard...'
    } else {
      message.value = ' Payment failed or not completed.'
    }

    setTimeout(() => {
      router.push('/dashboard')
    }, 2000)
  } catch (err) {
    console.error('Payment verification failed:', err)
    message.value = ' Something went wrong verifying payment.'
    setTimeout(() => router.push('/dashboard'), 2500)
  }
})
</script>
