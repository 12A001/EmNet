<template>
  <section
    :class="[
      'min-h-screen flex items-center justify-center p-4 transition-colors duration-500',
      theme === 'dark'
        ? 'bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100'
        : 'bg-gradient-to-br from-[#dbeafe] to-[#ffffff] text-gray-900',
    ]"
  >
    <div
      :class="[
        'backdrop-blur-md shadow-2xl rounded-3xl w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 overflow-hidden transition-colors duration-500',
        theme === 'dark' ? 'bg-gray-900/80' : 'bg-white/80',
      ]"
    >
      <!-- LEFT: Welcome Message -->
      <div
        :class="[
          'hidden md:flex flex-col justify-center p-10 transition-all duration-500',
          theme === 'dark'
            ? 'bg-gradient-to-br from-gray-800 to-gray-900 text-white'
            : 'bg-gradient-to-br from-[#003366] to-[#001d3d] text-white',
        ]"
      >
        <h1 class="text-4xl font-extrabold mb-4">
          Welcome Back to <span class="text-cyan-300">EmNet</span>
        </h1>
        <p class="text-lg leading-relaxed mb-6">
          Log in to manage your data, pay bills, and stay connected with the
          <strong>fastest, most affordable</strong> plans in Nigeria.
        </p>
        <ul class="space-y-3 text-sm">
          <li class="flex items-center gap-2">
            <span class="text-cyan-300">✔</span> Instant data delivery
          </li>
          <li class="flex items-center gap-2">
            <span class="text-cyan-300">✔</span> 24/7 customer support
          </li>
          <li class="flex items-center gap-2">
            <span class="text-cyan-300">✔</span> Long-lasting, cheap bundles
          </li>
        </ul>
      </div>

      <!-- RIGHT: Login Form -->
      <div class="relative p-8 md:p-12 flex flex-col justify-center">
        <!-- Theme Toggle -->
        <button
          @click="toggleTheme"
          class="absolute top-6 right-6 flex items-center gap-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-cyan-400 transition"
        >
          <Sun v-if="theme === 'light'" class="w-5 h-5" />
          <Moon v-else class="w-5 h-5" />
        </button>

        <!-- Mobile Welcome -->
        <div class="md:hidden text-center mb-8">
          <h1
            class="text-3xl font-extrabold mb-2"
            :class="theme === 'dark' ? 'text-cyan-300' : 'text-[#003366]'"
          >
            Welcome Back
          </h1>
          <p :class="theme === 'dark' ? 'text-gray-400' : 'text-gray-600'">
            Log in to your EmNet account
          </p>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-5">
          <div>
            <label
              class="block font-medium mb-1"
              :class="theme === 'dark' ? 'text-gray-300' : 'text-gray-700'"
              >Email</label
            >
            <input
              v-model="email"
              type="email"
              placeholder="you@example.com"
              :class="[
                'w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition',
                theme === 'dark'
                  ? 'border-gray-700 bg-gray-800 text-white focus:ring-cyan-400'
                  : 'border-gray-300 text-gray-900 focus:ring-blue-400',
              ]"
              required
            />
          </div>

          <div>
            <label
              class="block font-medium mb-1"
              :class="theme === 'dark' ? 'text-gray-300' : 'text-gray-700'"
              >Password</label
            >
            <input
              v-model="password"
              type="password"
              placeholder="********"
              :class="[
                'w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition',
                theme === 'dark'
                  ? 'border-gray-700 bg-gray-800 text-white focus:ring-cyan-400'
                  : 'border-gray-300 text-gray-900 focus:ring-blue-400',
              ]"
              required
            />
          </div>

          <button
            type="submit"
            :disabled="loading"
            :class="[
              'w-full py-3 text-white cursor-pointer font-semibold rounded-lg shadow transition-all duration-300 flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed',
              theme === 'dark'
                ? 'bg-cyan-600 hover:bg-cyan-700'
                : 'bg-[#003366] hover:bg-[#001d3d]',
            ]"
          >
            <span v-if="!loading">Log In</span>

            <span v-else class="flex items-center gap-2">
              <svg
                class="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
              Logging in...
            </span>
          </button>

          <p class="text-center mt-4" :class="theme === 'dark' ? 'text-gray-300' : 'text-gray-700'">
            Don’t have an account?
            <RouterLink
              to="/signup"
              :class="[
                'font-semibold transition',
                theme === 'dark'
                  ? 'text-cyan-400 hover:text-cyan-300'
                  : 'text-[#003366] hover:text-[#1e40af]',
              ]"
            >
              Create one
            </RouterLink>
          </p>
        </form>

        <!-- Toast -->
        <transition name="fade">
          <div
            v-if="toastMessage"
            :class="[
              'absolute bottom-6 left-1/2 transform -translate-x-1/2 font-medium px-6 py-3 rounded-full shadow-lg text-center text-sm sm:text-base animate-bounce-in',
              toastType === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white',
            ]"
          >
            {{ toastMessage }}
          </div>
        </transition>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/config/api.js'
import { Sun, Moon } from 'lucide-vue-next'

const router = useRouter()
const email = ref('')
const password = ref('')
const toastMessage = ref('')
const toastType = ref('success')
const loading = ref(false)

//  Theme handling
const theme = ref(localStorage.getItem('theme') || 'light')
const toggleTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
  document.documentElement.classList.toggle('dark', theme.value === 'dark')
  localStorage.setItem('theme', theme.value)
}
onMounted(() => {
  document.documentElement.classList.toggle('dark', theme.value === 'dark')
})

//  Login
const handleLogin = async () => {
  loading.value = true // START LOADING

  try {
    const res = await fetch(`${api.BACKEND}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email.value.trim(),
        password: password.value.trim(),
      }),
    })

    const data = await res.json()

    if (!res.ok || !data.user || !data.token) {
      throw new Error(data.message || 'Invalid email or password')
    }

    localStorage.setItem('user', JSON.stringify(data.user))
    localStorage.setItem('token', data.token)

    // toastType.value = 'success'
    // toastMessage.value = 'Login successful! Redirecting...'

    setTimeout(() => {
      toastMessage.value = ''
      loading.value = false // END LOADING
      router.push(data.user.role === 'admin' ? '/admin' : '/dashboard')
    }, 1200)
  } catch (err) {
    toastType.value = 'error'
    toastMessage.value = `Error: ${err.message}`

    setTimeout(() => {
      toastMessage.value = ''
      loading.value = false // END LOADING EVEN ON ERROR
    }, 2000)
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes bounce-in {
  0% {
    transform: translate(-50%, 20px);
    opacity: 0;
  }
  60% {
    transform: translate(-50%, -5px);
    opacity: 1;
  }
  100% {
    transform: translate(-50%, 0);
  }
}
.animate-bounce-in {
  animation: bounce-in 0.6s ease;
}
</style>
