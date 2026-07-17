<template>
  <div class="min-h-screen bg-[#003366] text-gray-900 px-4 sm:px-6 md:px-10 py-6">
    <!-- Header -->
    <div class="flex justify-between items-center mb-6  flex-wrap gap-3">
      <DashboardHeader :user="user" />
      <button
        @click="logout"
        class="px-4 py-2 rounded-lg font-medium transition-all cursor-pointer text-white bg-red-600 hover:bg-red-700  shadow-md w-full sm:w-auto  text-center"
      >
        Logout
      </button>
    </div>

    <!-- REFERRAL WALLET -->
    <div class="bg-white p-4 rounded-xl shadow mb-5 w-full flex justify-between h-25 items-center">
      <p class="text-gray-700 font-semibold">Referral Bonus Wallet</p>
      <p class=" text-[#003366] pr-6 font-bold text-lg">₦{{ bonusBalance }}</p>
    </div>

    <!--  REFERRAL LINK  -->
    <div class="bg-white p-4 rounded-xl shadow mb-5 w-full">
      <p class="text-gray-700 font-semibold mb-1">Your Referral Link</p>

      <div class="flex items-center gap-2 flex-wrap">
        <input
          :value="referralLink"
          readonly
          class="flex-1 border rounded-lg p-2 text-sm text-gray-700 bg-gray-100 w-full sm:w-auto"
        />
        <button
          @click="copyReferral"
          :disabled="copied"
          class="px-3 py-2 bg-[#003366] text-white rounded-lg cursor-pointer text-sm hover:bg-gradient-to-r from-blue-400 to-cyan-300 w-full sm:w-auto disabled:opacity-60 transition-all"
        >
          <span v-if="!copied">Copy</span>
          <span v-else>Copied!</span>
        </button>
      </div>

      <p class="text-xs text-gray-500 mt-2">
        Share this link and earn rewards when users sign up through you.
      </p>
    </div>

    <!--  REFERRAL BONUSES HISTORY  -->
    <!-- <div class="bg-white p-4 rounded-xl shadow mb-5 w-full">
      <p class="text-gray-700 font-semibold mb-2">Referral Bonuses Earned</p>
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="bg-gray-100">
            <th class="p-2 border">From User</th>
            <th class="p-2 border">Data Plan</th>
            <th class="p-2 border">Bonus Earned</th>
            <th class="p-2 border">Date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="bonus in referralBonuses" :key="bonus.id" class="border-t">
            <td class="p-2 border">{{ bonus.fromUserName }}</td>
            <td class="p-2 border">{{ bonus.planName }}</td>
            <td class="p-2 border text-green-600">₦{{ bonus.amount }}</td>
            <td class="p-2 border">{{ new Date(bonus.date).toLocaleDateString() }}</td>
          </tr>
          <tr v-if="referralBonuses.length === 0">
            <td colspan="4" class="p-2 text-gray-400 text-center">No bonuses earned yet</td>
          </tr>
        </tbody>
      </table>
    </div> -->

    <!-- Network selection -->
    <div class="flex gap-3 mb-4 ">
      <button
        v-for="net in networks"
        :key="net"
        @click="selectedNetwork = net"
        :class="[
          'px-4 py-2 rounded-lg font-medium transition-all border',
          selectedNetwork === net
            ? networkColors[net]
            : 'bg-white text-gray-800 border-gray-300 cursor-pointer hover:bg-gray-100',
        ]"
      >
        {{ net }}
      </button>
    </div>

    <!-- Phone number input -->
    <div class="bg-white p-4 rounded-xl shadow mb-4" v-if="selectedNetwork">
      <label class="block text-gray-700 font-medium mb-2">Enter Phone Number</label>
      <input
        v-model="userPhone"
        type="tel"
        placeholder="e.g. 08012345678"
        class="w-full border rounded-lg p-2 outline-none focus:ring-2 focus:ring-yellow-500"
      />
      <p v-if="userPhone && !checkNumberMatchesNetwork()" class="text-red-600 mt-2">
        ⚠️ The phone number does not match the selected network!
      </p>
    </div>

    <!-- Buy Data Plans -->
    <BuyDataPlans
      v-if="selectedNetwork"
      :plans="filteredPlansByNetwork"
      :loading="loadingPlans"
      :network-color="networkColors[selectedNetwork]"
      @purchase="handlePurchase"
    />

    <!-- Transactions -->
     <div class="mt-3">
    <TransactionsList :transactions="displayedTransactions" :loading="loadingTransactions" />
</div>
    <!-- View/Close Transactions -->
    <div v-if="olderTransactions.length" class="text-center mt-2">
      <button
        v-if="!showAllTransactions"
        @click="showAllTransactions = true"
        class="px-4 py-2  bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        View All Transactions
      </button>
      <button
        v-else
        @click="showAllTransactions = false"
        class="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
      >
        Close Transactions
      </button>
    </div>


    <PaymentStatusModal
      :show="showPaymentModal"
      :message="paymentMessage"
      @close="showPaymentModal = false"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import config from '@/config/api'

import DashboardHeader from '@/components/DashboardHeader.vue'
import BuyDataPlans from '@/components/BuyDataPlans.vue'
import TransactionsList from '@/components/TransactionsList.vue'
import PaymentStatusModal from '@/components/PaymentStatusModal.vue'

const user = ref(null)
const transactions = ref([])
const dataPlans = ref([])
const referralBonuses = ref([])
const bonusBalance = ref(0)
const userPhone = ref('')
const copied = ref(false)
const selectedNetwork = ref(null)
const loadingPlans = ref(true)
const loadingTransactions = ref(true)
const showPaymentModal = ref(false)
const paymentMessage = ref('')
const showAllTransactions = ref(false)
const networks = ['MTN', 'GLO', 'Airtel', '9mobile']

const route = useRoute()
const router = useRouter()

function logout() {
  localStorage.clear()
  router.push('/login')
}

//  REFERRAL LINK LOGIC
const FRONTEND_URL = import.meta.env.VITE_FRONTEND_URL || 'http://localhost:5173'

const referralLink = computed(() => {
  if (!user.value?._id) return ''
  return `${FRONTEND_URL}/signup?ref=${user.value.referralCode || user.value._id}`
})

const copyReferral = async () => {
  try {
    await navigator.clipboard.writeText(referralLink.value)

    copied.value = true

    setTimeout(() => {
      copied.value = false
    }, 2000) // revert after 2 seconds
  } catch (err) {
    console.error('Copy failed:', err)
  }
}

// Network colors when selected
const networkColors = {
  MTN: 'bg-yellow-500 text-white hover:bg-yellow-600',
  GLO: 'bg-green-500 text-white hover:bg-green-600',
  Airtel: 'bg-red-500 text-white hover:bg-red-600',
  '9mobile': 'bg-purple-500 text-white hover:bg-purple-600',
}

const networkPrefixes = {
  MTN: [
    '0803',
    '0806',
    '0703',
    '0706',
    '0707',
    '0810',
    '0813',
    '0814',
    '0816',
    '0903',
    '0906',
    '0913',
    '0916',
    // visafone blocks
    '07025',
    '07026',
    '0704',
  ],

  GLO: ['0805', '0807', '0705', '0811', '0815', '0905', '0915'],

  Airtel: ['0802', '0808', '0701', '0708', '0812', '0901', '0902', '0904', '0907', '0912'],

  '9mobile': ['0809', '0817', '0818', '0908', '0909'],
}

// Check phone matches network
function checkNumberMatchesNetwork() {
  if (!selectedNetwork.value || !userPhone.value) return true
  let number = userPhone.value.trim()
  if (number.startsWith('+234')) number = '0' + number.slice(4)
  else if (number.startsWith('234')) number = '0' + number.slice(3)
  const prefix = number.slice(0, 4)
  return networkPrefixes[selectedNetwork.value].includes(prefix)
}

// Filter plans by network
const filteredPlansByNetwork = computed(() => {
  if (!selectedNetwork.value) return []
  return dataPlans.value.filter((plan) =>
    (plan.network || plan.name || '').toLowerCase().includes(selectedNetwork.value.toLowerCase()),
  )
})

// Fetch user
async function getUser() {
  try {
    const token = localStorage.getItem('token')
    if (!token) return router.push('/login')
    const res = await axios.get(`${config.BACKEND}/user/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    user.value = res.data.user
    localStorage.setItem('user', JSON.stringify(res.data.user))
    if (user.value?.phone) userPhone.value = user.value.phone

    // Use walletBalance from user for bonus
    bonusBalance.value = user.value.walletBalance || 0

    await Promise.all([fetchTransactions(), fetchDataPlans()])
    fetchReferralBonuses()
  } catch (err) {
    console.error(err)
    router.push('/login')
  }
}

// Fetch data plans
async function fetchDataPlans() {
  try {
    const res = await axios.get(`${config.BACKEND}/data/plans`)
    if (res.data?.success && res.data.data) {
      const grouped = res.data.data
      dataPlans.value = Object.values(grouped).flatMap((net) => Object.values(net).flat())
    }
  } catch (err) {
    console.error(err)
  } finally {
    loadingPlans.value = false
  }
}

// Fetch transactions
async function fetchTransactions() {
  try {
    loadingTransactions.value = true
    const storedUser = JSON.parse(localStorage.getItem('user'))
    const res = await axios.get(`${config.BACKEND}/transactions/${storedUser._id}`)
    transactions.value = res.data.transactions || []
  } catch (err) {
    console.error(err)
  } finally {
    loadingTransactions.value = false
  }
}

// Derive referral bonuses from transactions
function fetchReferralBonuses() {
  referralBonuses.value = transactions.value
    .filter((tx) => tx.type === 'referral_bonus')
    .map((tx) => ({
      id: tx._id,
      fromUserName: tx.description.match(/from (.+)'s purchase/)?.[1] || 'Unknown',
      planName: '', // optionally parse if stored
      amount: tx.amount,
      date: tx.createdAt,
    }))
}

// Transactions computed
const latestTransactions = computed(() => {
  const sorted = [...transactions.value].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
  )
  return sorted.slice(0, 3).map((tx) => ({ ...tx, group: 'Latest' }))
})

const olderTransactions = computed(() => {
  const sorted = [...transactions.value].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
  )
  return sorted.slice(3).map((tx) => {
    const date = new Date(tx.createdAt)
    const now = new Date()
    const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24))
    let group = ''
    if (diffDays < 7) group = `${diffDays} day(s) ago`
    else if (diffDays < 30) group = `${Math.floor(diffDays / 7)} week(s) ago`
    else group = `${Math.floor(diffDays / 30)} month(s) ago`
    return { ...tx, group }
  })
})

const displayedTransactions = computed(() =>
  showAllTransactions.value
    ? [...latestTransactions.value, ...olderTransactions.value]
    : latestTransactions.value,
)

// Purchase data
async function handlePurchase(plan) {
  if (!userPhone.value) {
    alert('Enter phone number')
    return
  }
  if (!checkNumberMatchesNetwork()) {
    alert('Phone number does not match selected network')
    return
  }

  const token = localStorage.getItem('token')
  const payload = {
    planId: plan._id || plan.id,
    phone: userPhone.value.trim(),
    network: plan.network.toLowerCase(),
    size: plan.dataId || plan.size,
  }
  try {
    const res = await axios.post(`${config.BACKEND}/data/initiate-payment`, payload, {
      headers: { Authorization: `Bearer ${token}` },
    })
    if (res.data?.success && res.data.checkout_url) window.location.href = res.data.checkout_url
    else alert(res.data?.message || 'Payment init failed')
  } catch (err) {
    console.error(err)
    alert('Payment failed')
  }
}

// Paystack verification
async function checkPaystackRedirect() {
  const reference = route.query.reference
  if (!reference) return
  try {
    const token = localStorage.getItem('token')
    const res = await axios.get(`${config.BACKEND}/data/verify-payment?reference=${reference}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    paymentMessage.value = res.data.success ? 'Payment Successful' : 'Payment failed or incomplete'
    showPaymentModal.value = true
  } catch (err) {
    console.error(err)
    paymentMessage.value = 'Payment verification failed'
    showPaymentModal.value = true
  }
}

onMounted(() => {
  getUser()
  checkPaystackRedirect()
})
</script>
