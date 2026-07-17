<template>
  <main>
    <!-- HERO SECTION -->
    <section
      class="relative pt-24 pb-24 overflow-hidden bg-cover bg-center bg-no-repeat"
      :style="`background-image: url(${heroBackground});`"
    >
      <div
        class="absolute inset-0 bg-gradient-to-b from-black/50 via-black/50 to-[#0a1a3c]/80"
      ></div>

      <div
        class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
      >
        <!-- LEFT TEXT -->
        <div class="text-white animate-drop-in relative z-10">
          <p class="text-sm text-blue-400 font-semibold tracking-wide uppercase">
            Welcome to EmNet
          </p>
          <h1 class="mt-3 text-5xl sm:text-6xl font-extrabold leading-tight drop-shadow-xl">
            Buy Data, Pay Bills & Stay Connected Instantly!
          </h1>
          <p class="mt-4 text-gray-200 max-w-xl leading-relaxed">
            Get affordable data bundles for <b>MTN, Airtel, Glo and 9mobile</b>. Pay electricity,
            TV, and betting bills easily — all in one place.
          </p>

          <div class="mt-8 flex flex-col sm:flex-row gap-4">
            <button
              class="px-8 py-3 bg-gradient-to-r cursor-pointer from-[#003366] to-[#1e40af] hover:from-[#1e40af] hover:to-[#1d4ed8] rounded-xl text-white font-semibold shadow-xl transition-all duration-300 hover:scale-105"
            >
              <router-link to="/login"> Get Started </router-link>
            </button>
            <!-- <button
              class="px-8 py-3 border cursor-pointer border-blue-400 rounded-xl text-blue-400 hover:bg-blue-500/20 font-semibold transition-all duration-300 hover:scale-105"
            >
              Fund Wallet
            </button> -->
          </div>
        </div>

        <!-- RIGHT IMAGE + FLOATING LOGOS -->
        <div class="relative flex justify-center lg:justify-end animate-fade-in">
          <div class="relative w-72 h-52 sm:w-80 sm:h-70 md:w-90 md:h-90 animate-float-slow">
            <img
              :src="heroMain"
              alt="Happy EmNet User"
              class="rounded-3xl object-cover w-full h-full shadow-2xl ring-4 ring-white/20"
            />
            <div
              v-for="(img, i) in floatingImages"
              :key="i"
              :class="[
                img.class,
                'absolute w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-white/80 backdrop-blur-sm shadow-2xl flex items-center justify-center ring-4 ring-blue-400/30 animate-float',
              ]"
            >
              <img :src="img.src" alt="Network logo" />
            </div>
          </div>
        </div>
      </div>

      <div class="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg
          class="relative block w-full h-20"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          viewBox="0 0 1200 120"
        >
          <path
            d="M321.39,56.44C190.34,73.72,62.12,104.5,0,120H1200V0C1135.31,22.14,1022.52,52.18,875.31,64.39,729.1,76.52,550.68,39.6,321.39,56.44Z"
            fill="#fff"
          ></path>
        </svg>
      </div>
    </section>

    <!-- SERVICES SECTION -->
    <section class="bg-white text-gray-900 py-20 -mt-px">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 class="text-2xl font-semibold text-[#003366]">Our Services</h3>
        <p class="mt-2 text-gray-600 max-w-xl">
          Enjoy the best telecom deals and fast automated services.
        </p>

        <div class="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          <div
            v-for="service in services"
            :key="service.title"
            class="bg-gray-50 hover:bg-gradient-to-r hover:from-[#003366] hover:to-[#1e40af] hover:text-white rounded-xl p-5 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center"
          >
            <div
              class="w-12 h-12 rounded-md bg-blue-100 flex items-center justify-center text-[#003366] mb-3 transition-all duration-300 group-hover:bg-white"
            >
              <component :is="service.icon" class="w-6 h-6" />
            </div>
            <div class="text-sm font-medium">{{ service.title }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- STATS SECTION -->
    <section class="relative bg-gradient-to-r from-[#dbeafe] to-[#bfdbfe] text-gray-800 py-24">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 class="text-3xl sm:text-4xl font-bold mb-8 text-gray-900">
            Fast, Reliable, and Always Affordable
          </h2>
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-5">
            <div
              v-for="(stat, index) in stats"
              :key="index"
              class="text-center bg-white/70 backdrop-blur-md rounded-xl shadow-md p-4"
            >
              <div class="text-4xl font-extrabold text-[#003366]">{{ stat.display }}</div>
              <div class="text-sm text-gray-700 mt-1">{{ stat.label }}</div>
            </div>
          </div>
        </div>
        <div class="relative animate-slide-in">
          <img
            :src="womanImage"
            alt="Happy EmNet User"
            class="w-full rounded-3xl shadow-xl border-4 border-white/40"
          />
        </div>
      </div>
    </section>

 <!-- PARTNERS SECTION -->
<section class="bg-white py-16">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <h2 class="text-3xl font-bold text-[#003366] mb-6">Our Partners</h2>
    <p class="text-gray-600 mb-10">
      We work with trusted networks and payment providers to ensure seamless service.
    </p>

    <div class="flex justify-center items-center gap-12 flex-wrap">
      <div
        v-for="(logo, index) in partnerLogos"
        :key="index"
        class="w-28 p-4 bg-white rounded-xl shadow-lg opacity-90 hover:opacity-100 hover:scale-105 transition-transform duration-300"
      >
        <img :src="logo" class="w-full h-16 object-contain" />
      </div>
    </div>
  </div>
</section>

    <!-- FOOTER -->
    <footer class="bg-white text-gray-700 border-t border-gray-200">
      <div class="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <h3 class="text-2xl font-bold text-[#003366] mb-3">EmNet</h3>
          <p class="text-sm text-gray-600 leading-relaxed">
            Your trusted platform for cheap data bundles and seamless bill payments.
          </p>
        </div>

        <div>
          <h4 class="text-lg font-semibold text-[#003366] mb-3">Quick Links</h4>
          <ul class="space-y-2">
            <li><RouterLink to="/" class="hover:text-blue-500">Home</RouterLink></li>
            <li><RouterLink to="/services" class="hover:text-blue-500">Services</RouterLink></li>
            <li><RouterLink to="/contact" class="hover:text-blue-500">Contact</RouterLink></li>
          </ul>
        </div>

        <div>
          <h4 class="text-lg font-semibold text-[#003366] mb-3">Bills We Support</h4>
          <ul class="space-y-2">
            <li>Electricity</li>
            <li>TV Subscription</li>
            <li>Betting Wallets</li>
            <li>Data & Airtime</li>
          </ul>
        </div>

        <div>
          <h4 class="text-lg font-semibold text-[#003366] mb-3">Stay Updated</h4>
          <form class="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Your email"
              class="flex-1 rounded-lg bg-gray-100 border border-gray-300 px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <!-- <button
              type="submit"
              class="px-6 py-2 rounded-lg bg-gradient-to-r from-[#003366] to-[#1e40af] text-white hover:from-[#1e40af] hover:to-[#1d4ed8] transition"
            >
              Subscribe
            </button> -->
          </form>
        </div>
      </div>

      <div class="border-t border-gray-200 text-center text-sm text-gray-500 py-6">
        {{ new Date().getFullYear() }} EmNet. All rights reserved.
      </div>
    </footer>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import heroBackground from '@/assets/images/woman-happy.png'
import heroMain from '@/assets/images/side-bg.jpg'
import womanImage from '@/assets/images/buydata.webp'
import paystackLogo from '@/assets/images/paystack-logo-2.png'

import { Wifi, Zap, Tv, DollarSign, Smartphone, Battery } from 'lucide-vue-next'
// ← REMOVED: import router from '@/router'

const floatingImages = [
  {
    src: new URL('@/assets/images/New-mtn-logo.jpg', import.meta.url).href,
    class: 'floating-img-1',
  },
  {
    src: new URL('@/assets/images/Airtel_logo-01.png', import.meta.url).href,
    class: 'floating-img-3',
  },
  { src: new URL('@/assets/images/glo-logo.jpg', import.meta.url).href, class: 'floating-img-4' },
  { src: new URL('@/assets/images/9mobile-1.svg', import.meta.url).href, class: 'floating-img-2' },
]
const partnerLogos = [
  new URL('@/assets/images/New-mtn-logo.jpg', import.meta.url).href,
  new URL('@/assets/images/Airtel_logo-01.png', import.meta.url).href,
  new URL('@/assets/images/glo-logo.jpg', import.meta.url).href,
  new URL('@/assets/images/9mobile-1.svg', import.meta.url).href,
  paystackLogo
]

const services = [
  { title: 'Buy Data', icon: Wifi },
  { title: 'Airtime Top-Up', icon: Smartphone },
  { title: 'Pay Electricity Bills', icon: Zap },
  { title: 'TV Subscriptions', icon: Tv },
  { title: 'Betting Wallets', icon: DollarSign },
  { title: 'Smile Network', icon: Battery },
]

// Animated Stats
const stats = ref([
  { label: 'Data Sold', value: 250000, display: '₦0' },
  { label: 'Users Served', value: 800, display: '0+' },
  { label: 'Transactions Daily', value: 50, display: '0+' },
])

const formatNumber = (num, prefix = '', suffix = '+') => {
  if (num >= 1000000) return `${prefix}${(num / 1000000).toFixed(1)}M${suffix}`
  if (num >= 1000) return `${prefix}${Math.floor(num / 1000)}k${suffix}`
  return `${prefix}${num}${suffix}`
}

onMounted(() => {
  stats.value.forEach((stat) => {
    const duration = 1500 // ms
    let startTime = null

    const animate = (now) => {
      if (!startTime) startTime = now
      const progress = Math.min((now - startTime) / duration, 1)
      const current = Math.floor(progress * stat.value)

      stat.display =
        stat.label === 'Data Sold'
          ? formatNumber(current, '₦', '+')
          : formatNumber(current, '', '+')

      if (progress < 1) requestAnimationFrame(animate)
    }

    requestAnimationFrame(animate)
  })
})
</script>

<style scoped>
@keyframes float {
  0%,
  100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-15px) rotate(3deg);
  }
}
.animate-float-slow {
  animation: float 8s ease-in-out infinite;
}
.animate-float {
  animation: float 6s ease-in-out infinite;
}

@keyframes drop-in {
  from {
    opacity: 0;
    transform: translateY(-40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-drop-in {
  animation: drop-in 1s ease-out forwards;
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
.animate-fade-in {
  animation: fade-in 1.5s ease-out forwards;
}

/* Floating Logos */
:deep(.floating-img-1),
:deep(.floating-img-2),
:deep(.floating-img-3),
:deep(.floating-img-4) {
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(10px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  overflow: hidden;
}
:deep(.floating-img-1 img),
:deep(.floating-img-2 img),
:deep(.floating-img-3 img),
:deep(.floating-img-4 img) {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 9999px;
}

/* Logo positions */
:deep(.floating-img-1) {
  top: -25px;
  left: -35px;
  animation-delay: 0s;
}
:deep(.floating-img-2) {
  bottom: -30px;
  right: -40px;
  animation-delay: 1s;
}
:deep(.floating-img-3) {
  bottom: -40px;
  left: 50px;
  animation-delay: 2s;
}
:deep(.floating-img-4) {
  top: 60px;
  right: -45px;
  animation-delay: 3s;
}
</style>
