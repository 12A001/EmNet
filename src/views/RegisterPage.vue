<template>
  <section class="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#dbeafe] to-[#ffffff] p-4">
    <div class="bg-white/80 backdrop-blur-md shadow-2xl rounded-3xl w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 overflow-hidden">

      <!-- LEFT -->
      <div class="hidden md:flex flex-col justify-center p-10 bg-gradient-to-br from-[#003366] to-[#001d3d] text-white">
        <h1 class="text-4xl font-extrabold mb-4">Join <span class="text-cyan-300">EmNet</span> Today</h1>
        <p class="text-lg leading-relaxed mb-6">
          Get instant access to <strong>cheap, fast, and long-lasting</strong> data plans — trusted by thousands daily.
        </p>
        <ul class="space-y-3 text-sm">
          <li class="flex items-center gap-2"><Check class="w-5 h-5 text-cyan-300" /> Instant activation</li>
          <li class="flex items-center gap-2"><Check class="w-5 h-5 text-cyan-300" /> 24/7 support</li>
          <li class="flex items-center gap-2"><Check class="w-5 h-5 text-cyan-300" /> No hidden fees</li>
        </ul>
      </div>

      <!-- RIGHT -->
      <div class="p-8 md:p-12 flex flex-col justify-center relative">
        <div class="md:hidden text-center mb-8">
          <h1 class="text-3xl font-extrabold text-[#003366] mb-2">Create Your EmNet Account</h1>
          <p class="text-gray-600">Join thousands buying cheap, fast and reliable data daily.</p>
        </div>

        <!-- SIGNUP FORM -->
        <form v-if="!otpSent" @submit.prevent="handleSignup" class="space-y-5">
          <!-- Name -->
          <div>
            <label class="block text-gray-700 font-medium mb-1">Full Name</label>
            <input v-model="name" type="text" placeholder="John Mike" class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none transition" required />
          </div>

          <!-- Phone -->
          <div>
            <label class="block text-gray-700 font-medium mb-1">Phone Number</label>
            <input v-model="phone" type="tel" placeholder="08012345678" class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none transition" @input="validatePhone" required />
            <p v-if="phoneError" class="text-red-500 text-sm mt-1">{{ phoneError }}</p>
          </div>

          <!-- Email -->
          <div>
            <label class="block text-gray-700 font-medium mb-1">Email Address</label>
            <input v-model="email" type="email" placeholder="you@example.com" class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none transition" required />
          </div>

          <!-- Password -->
          <div>
            <label class="block text-gray-700 font-medium mb-1">Password</label>
            <input v-model="password" type="password" placeholder="********" class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none transition" required />
          </div>

          <!-- Updated Button -->
          <button type="submit" :disabled="loading" class="w-full py-3 bg-[#003366] text-white font-semibold cursor-pointer rounded-lg shadow hover:bg-[#001d3d] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
            <span v-if="!loading">Sign Up</span>
            <span v-else>Processing...</span>
          </button>
        </form>

        <!-- OTP FORM -->
        <form v-else @submit.prevent="verifyOTP" class="space-y-5">
          <p class="text-center text-gray-700 mb-2">An OTP has been sent to your email. Enter it below to verify your account.</p>
          <p class="text-center text-gray-500 mb-4">Time left: {{ formattedOtpTime }}</p>

          <!-- OTP Inputs -->
          <div class="flex justify-center gap-2">
            <input v-for="(digit, index) in otpDigits" :key="index"
              ref="otpRefs"
              type="text"
              maxlength="1"
              class="w-12 h-12 text-center text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              @input="onOtpInput(index, $event)"
              @keydown="onOtpKeydown(index, $event)"
              @paste="onOtpPaste($event)"
            />
          </div>

          <!-- Resend OTP -->
          <div class="flex justify-between items-center mt-2">
            <button type="button" @click="resendOTP" :disabled="loading || resendAttempts >= 3 || cooldown > 0" class="text-sm text-blue-600 hover:text-blue-800 disabled:text-gray-400 transition">
              <span v-if="cooldown === 0" class="cursor-pointer">Resend OTP</span>
              <span v-else>Wait {{ formatCooldown }}</span>
            </button>
            <p class="text-sm text-gray-500">Attempts: {{ resendAttempts }} / 3</p>
          </div>
        </form>

        <!-- Toast -->
        <transition name="fade">
          <div v-if="successMessage" class="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-green-500 text-white font-medium px-5 py-3 rounded-full shadow-lg text-center text-sm sm:text-base animate-bounce-in">
            {{ successMessage }}
          </div>
        </transition>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, nextTick, computed, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import api from '@/config/api.js'
import { Check } from 'lucide-vue-next'

const router = useRouter()
const route = useRoute()

// Form
const name = ref('')
const email = ref('')
const password = ref('')
const phone = ref('')
const phoneError = ref('')
const otp = ref('')
const otpSent = ref(false)
const successMessage = ref('')
const loading = ref(false)

const otpDigits = ref(['','','','','',''])
const otpRefs = ref([])

// OTP timer
const otpTimeLeft = ref(10 * 60)
let otpTimer = null

const startOtpTimer = () => {
  if (otpTimer) clearInterval(otpTimer)
  otpTimeLeft.value = 10 * 60
  otpTimer = setInterval(() => {
    if (otpTimeLeft.value <= 0) {
      clearInterval(otpTimer)
      showToast('OTP expired. Please request a new one.')
      return
    }
    otpTimeLeft.value--
  }, 1000)
}

const formattedOtpTime = computed(() => {
  const min = String(Math.floor(otpTimeLeft.value / 60)).padStart(2,'0')
  const sec = String(otpTimeLeft.value % 60).padStart(2,'0')
  return `${min}:${sec}`
})

// Country & referrer
const regionDetected = ref(null)
const countryCode = ref('NG')
const referrer = ref(route.query.ref || null)

// OTP resend
const resendAttempts = ref(0)
const cooldown = ref(0)
let cooldownInterval = null

const formatCooldown = computed(() => {
  const min = String(Math.floor(cooldown.value / 60)).padStart(2,'0')
  const sec = String(cooldown.value % 60).padStart(2,'0')
  return `${min}:${sec}`
})

// On mounted: detect region
onMounted(async () => {
  try {
    const res = await fetch('https://ipapi.co/json/')
    const data = await res.json()
    regionDetected.value = data.country_name
    countryCode.value = data.country_code
  } catch (err) {
    console.warn('Unable to detect region:', err.message)
    regionDetected.value = null
  }
})

// Phone validation
const validatePhone = () => {
  phone.value = phone.value.replace(/\D/g, '')
  phoneError.value = phone.value.length !== 11 ? 'Phone number must be exactly 11 digits.' : ''
}

const formatPhoneForBackend = (localPhone) => localPhone.startsWith('0') ? '+234' + localPhone.slice(1) : localPhone

// Toast
const showToast = (message) => {
  successMessage.value = message
  setTimeout(() => { successMessage.value = '' }, 3000)
}

// Signup
const handleSignup = async () => {
  if (phoneError.value) {
    showToast(phoneError.value)
    return
  }
  loading.value = true

  if (!regionDetected.value) {
    showToast('Unable to detect your location, proceeding anyway.')
  } else if (countryCode.value !== 'NG') {
    showToast('Registration is restricted to Nigeria only, proceeding anyway.')
  }

  try {
    const res = await fetch(`${api.BACKEND}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name.value,
        email: email.value,
        password: password.value,
        phone: formatPhoneForBackend(phone.value),
        referrer: referrer.value
      }),
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'Signup failed')

    otpSent.value = true
    showToast('OTP sent to your email!')
    startOtpTimer()
    nextTick(() => otpRefs.value[0].focus())
  } catch (err) {
    showToast(err.message)
  } finally {
    loading.value = false
  }
}

// --- OTP handlers (unchanged) ---
const onOtpInput = (index, event) => {
  const value = event.target.value.replace(/\D/g,'')
  if (value.length > 1) {
    const vals = value.split('').slice(0, otpDigits.value.length - index)
    vals.forEach((v,i) => otpDigits.value[index+i] = v)
    nextTick(() => {
      const nextIndex = Math.min(index + vals.length, otpDigits.value.length - 1)
      otpRefs.value[nextIndex].focus()
    })
  } else {
    otpDigits.value[index] = value
    if (value && index < otpDigits.value.length - 1) nextTick(() => otpRefs.value[index+1].focus())
  }
  otp.value = otpDigits.value.join('')
}

watch(otp, (newVal) => {
  if (newVal.length === 6 && !loading.value) {
    verifyOTP()
  }
})

const onOtpKeydown = (index, event) => {
  if (event.key === 'Backspace') {
    otpDigits.value[index] = ''
    if (index > 0) nextTick(() => otpRefs.value[index-1].focus())
  } else if (event.key === 'ArrowLeft' && index > 0) {
    nextTick(() => otpRefs.value[index-1].focus())
  } else if (event.key === 'ArrowRight' && index < otpDigits.value.length - 1) {
    nextTick(() => otpRefs.value[index+1].focus())
  }
}

const onOtpPaste = (event) => {
  const pasted = event.clipboardData.getData('text').replace(/\D/g,'').slice(0,6)
  pasted.split('').forEach((v,i) => otpDigits.value[i] = v)
  otp.value = otpDigits.value.join('')
  nextTick(() => otpRefs.value[Math.min(pasted.length, otpDigits.value.length-1)].focus())
}

// Verify OTP
const verifyOTP = async () => {
  if (otp.value.length !== 6) {
    showToast('Please enter a valid 6-digit OTP')
    return
  }
  loading.value = true
  try {
    const res = await fetch(`${api.BACKEND}/auth/verify-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.value, otp: otp.value }),
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'OTP verification failed')

    if (data.user && data.token) {
      localStorage.setItem('user', JSON.stringify(data.user))
      localStorage.setItem('token', data.token)
    }

    showToast('Email verified! Redirecting...')
    setTimeout(() => router.push('/dashboard'), 2000)
  } catch (err) {
    showToast(err.message)
  } finally {
    loading.value = false
  }
}

// Resend OTP
const resendOTP = async () => {
  if (resendAttempts.value >= 3 && cooldown.value === 0) {
    cooldown.value = 20 * 60
    startCooldownTimer()
    return
  }
  if (cooldown.value > 0) return

  loading.value = true
  try {
    const res = await fetch(`${api.BACKEND}/auth/resend-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.value }),
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'Failed to resend OTP')
    resendAttempts.value++
    showToast('OTP resent to your email!')
    startOtpTimer()
  } catch (err) {
    showToast(err.message)
  } finally {
    loading.value = false
  }
}

// Cooldown timer
const startCooldownTimer = () => {
  if (cooldownInterval) clearInterval(cooldownInterval)
  cooldownInterval = setInterval(() => {
    if (cooldown.value <= 0) {
      clearInterval(cooldownInterval)
      resendAttempts.value = 0
      return
    }
    cooldown.value--
  }, 1000)
}
</script>

<style scoped>
section { background-image: linear-gradient(to bottom right, #dbeafe, #ffffff); }

.fade-enter-active, .fade-leave-active { transition: opacity 0.6s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

@keyframes bounce-in {
  0% { transform: translate(-50%, 20px); opacity: 0; }
  60% { transform: translate(-50%, -5px); opacity: 1; }
  100% { transform: translate(-50%, 0); }
}
.animate-bounce-in { animation: bounce-in 0.6s ease; }
</style>
