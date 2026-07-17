<template>
  <header class="bg-[#003366] sticky top-0 z-50 shadow-sm text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-20">
        <router-link
          to="/"
          class="relative inline-flex items-end text-3xl font-extrabold  tracking-wide"
        >
          <span class="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
            Em
          </span>
          <Wifi
              class="absolute -top-5 left-1/2 transform -translate-x-1/2 w-5 h-5 text-blue-400"
            />
          <span class="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
           Net

          </span>
        </router-link>

        <!-- Desktop nav -->
        <nav class="hidden md:flex items-center gap-6 text-base">
          <a href="/" class="px-3 py-2 rounded hover:bg-blue-700 transition">Home</a>

          <div class="relative group ">
            <button class="flex items-center gap-2 px-3 py-2 rounded cursor-pointer hover:bg-blue-700 transition">
              Services
              <ChevronDown class="w-5 h-5" />
            </button>
            <ul
              class="absolute left-0 mt-2 w-60 bg-gradient-to-r from-blue-400 to-cyan-300 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-300 ease-in-out transform scale-95 group-hover:scale-100 py-2 z-50"
            >
              <li><router-link to="/dashboard" class="block px-5 py-3 hover:bg-blue-700 text-sm">Airtime Recharge</router-link></li>
              <li><router-link to="/dashboard" class="block px-5 py-3 hover:bg-blue-700 text-sm">Data Recharge</router-link></li>
              <li><router-link to="/book-flight" class="block px-5 py-3 hover:bg-blue-700 text-sm">Book Flight</router-link></li>
              <li><router-link to="/coming-soon" class="block px-5 py-3 hover:bg-blue-700 text-sm">Decoder TV Recharge</router-link></li>
              <li><router-link to="/coming-soon" class="block px-5 py-3 hover:bg-blue-700 text-sm">Electricity Bill</router-link></li>
            </ul>
          </div>

          <router-link to="/about" class="px-3 py-2 rounded hover:bg-blue-700 transition">About</router-link>
          <router-link to="/contact" class="px-3 py-2 rounded hover:bg-blue-700 transition">Contact</router-link>
        </nav>

        <!-- Desktop buttons -->
        <div class="hidden md:flex items-center gap-3">
          <router-link
            class="px-3 py-1 border border-white rounded-full hover:bg-white hover:text-[#003366] transition text-sm flex items-center gap-1"
            to="/signup"
          >
            <UserPlus class="w-4 h-4" /> Register
          </router-link>
          <router-link
            class="px-3 py-1 bg-white text-[#003366] rounded-lg hover:bg-gray-100 transition text-sm flex items-center gap-1 font-medium"
            to="/login"
          >
            <LogIn class="w-4 h-4" /> Login
          </router-link>
        </div>

        <!-- Mobile hamburger -->
        <button @click="mobileOpen = !mobileOpen" class="md:hidden p-2 rounded hover:bg-gradient-to-r from-blue-400 to-cyan-300">
          <Menu v-if="!mobileOpen" class="w-6 h-6" />
          <X v-else class="w-6 h-6" />
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <transition name="slide-fade">
      <div v-if="mobileOpen" class="md:hidden bg-[#003366] text-white">
        <nav class="flex flex-col px-6 py-4 space-y-2 text-sm">
          <router-link to="/" @click="mobileOpen = false" class="block px-3 py-2 rounded hover:bg-gradient-to-r from-blue-400 to-cyan-300">Home</router-link>

          <details class="group">
            <summary class="flex justify-between items-center cursor-pointer px-3 py-2 rounded hover:bg-gradient-to-r from-blue-400 to-cyan-300">
              <span>Services</span>
              <ChevronDown class="w-4 h-4 group-open:rotate-180 transition" />
            </summary>
            <ul class="mt-2 pl-4 space-y-1 bg-gradient-to-r from-blue-400 to-cyan-300 text-gray-200">
              <li><router-link to="/dashboard" @click="mobileOpen = false" class="block hover:text-cyan-300">Airtime Recharge</router-link></li>
              <li><router-link to="/dashboard" @click="mobileOpen = false" class="block hover:text-cyan-300">Data Recharge</router-link></li>
              <li><router-link to="/book-flight" @click="mobileOpen = false" class="block hover:text-cyan-300">Book Flight</router-link></li>
              <li><router-link to="/coming-soon" @click="mobileOpen = false" class="block hover:text-cyan-300">Decoder TV Recharge</router-link></li>
              <li><router-link to="/coming-soon" @click="mobileOpen = false" class="block hover:text-cyan-300">Electricity Bill</router-link></li>
            </ul>
          </details>

          <router-link to="/about" @click="mobileOpen = false" class="block px-3 py-2 rounded hover:bg-gradient-to-r from-blue-400 to-cyan-300">About</router-link>
          <router-link to="/contact" @click="mobileOpen = false" class="block px-3 py-2 rounded hover:bg-gradient-to-r from-blue-400 to-cyan-300">Contact</router-link>

          <div class="border-t border-blue-500 mt-4 pt-4 space-y-2">
            <router-link to="/signup" @click="mobileOpen = false" class="flex items-center gap-1 px-3 py-2 rounded hover:bg-gradient-to-r from-blue-400 to-cyan-300">
              <UserPlus class="w-4 h-4" /> Register
            </router-link>
            <router-link to="/login" @click="mobileOpen = false" class="flex items-center gap-1 px-3 py-2 rounded bg-white text-[#003366] hover:bg-gray-100 font-medium">
              <LogIn class="w-4 h-4" /> Login
            </router-link>
          </div>
        </nav>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { Menu, X, ChevronDown, UserPlus, LogIn, Wifi } from 'lucide-vue-next'

const mobileOpen = ref(false)
</script>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
