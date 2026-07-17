<template>
  <div
    :class="[
      'min-h-screen p-6 transition-colors duration-300',
      darkMode ? 'bg-[#0a1a3c] text-white' : 'bg-gray-50 text-gray-900',
    ]"
  >
    <!-- Header -->
    <header class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold flex items-center gap-2">
        <!-- <Banknote class="w-8 h-8" :class="darkMode ? 'text-yellow-400' : 'text-blue-600'" /> -->
        Admin Dashboard
      </h1>

      <div class="flex items-center gap-3">
        <!-- Dark Mode Toggle -->
        <button
          @click="toggleDarkMode"
          class="flex items-center gap-2 px-4 py-2 cursor-pointer rounded-lg transition font-medium"
          :class="
            darkMode
              ? 'bg-gray-700 hover:bg-gray-600 text-white'
              : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
          "
        >
          <component
            :is="darkMode ? Sun : Moon"
            class="w-5 h-5"
            :class="darkMode ? 'text-yellow-400' : 'text-gray-700'"
          />
          <span>{{ darkMode ? 'Light Mode' : 'Dark Mode' }}</span>
        </button>

        <!-- Logout -->
        <button
          @click="logout"
          class="px-4 py-2 bg-red-500 text-white rounded-lg cursor-pointer hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </header>

    <!-- Loading -->
    <div v-if="loading" class="text-center text-gray-500 py-20">Loading dashboard...</div>

    <!-- Dashboard Content -->
    <div v-else>
      <!-- Stats Overview -->
      <section class="grid gap-6 md:grid-cols-4">
        <div
          v-for="card in statCards"
          :key="card.title"
          class="shadow-lg rounded-2xl p-5 transition-colors duration-300"
          :class="darkMode ? 'bg-[#13254d]' : 'bg-white'"
        >
          <div class="flex justify-between items-center">
            <div>
              <h3 class="text-sm" :class="darkMode ? 'text-gray-300' : 'text-gray-500'">
                {{ card.title }}
              </h3>
              <p class="text-3xl font-semibold" :class="card.colorClass">
                {{ card.value }}
              </p>
            </div>
            <component :is="card.icon" class="w-8 h-8" :class="card.colorClass" />
          </div>
        </div>
      </section>

      <!-- Charts -->
      <section class="grid md:grid-cols-2 gap-8 mt-10">
        <div
          class="rounded-2xl p-5 shadow-lg transition-colors duration-300"
          :class="darkMode ? 'bg-[#13254d]' : 'bg-white'"
        >
          <h2 class="text-lg font-semibold mb-3">Revenue Trend</h2>
          <Bar :data="revenueChartData" :options="chartOptions" />
        </div>

        <div
          class="rounded-2xl p-5 shadow-lg transition-colors duration-300"
          :class="darkMode ? 'bg-[#13254d]' : 'bg-white'"
        >
          <h2 class="text-lg font-semibold mb-3">Daily Transactions</h2>
          <Line :data="transactionChartData" :options="chartOptions" />
        </div>
      </section>

      <!-- Recent Transactions -->
      <section class="mt-12">
        <h2 class="text-lg font-semibold mb-4">Recent Data Purchases</h2>
        <div class="overflow-x-auto">
          <table
            v-if="recentTransactions.length"
            class="min-w-full shadow-lg rounded-2xl transition-colors duration-300"
            :class="darkMode ? 'bg-[#13254d]' : 'bg-white'"
          >
            <thead :class="darkMode ? 'bg-[#1c386e]' : 'bg-gray-100'">
              <tr>
                <th class="py-3 px-4 text-left">User</th>
                <th class="py-3 px-4 text-left">Network</th>
                <th class="py-3 px-4 text-left">Amount</th>
                <th class="py-3 px-4 text-left">Status</th>
                <th class="py-3 px-4 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="txn in recentTransactions"
                :key="txn._id"
                class="border-t transition-colors duration-200"
                :class="
                  darkMode
                    ? 'hover:bg-[#1f3a70] border-gray-700'
                    : 'hover:bg-gray-50 border-gray-200'
                "
              >
                <td class="py-2 px-4">{{ txn.user?.name || 'User' }}</td>
                <td class="py-2 px-4">{{ txn.description }}</td>
                <td class="py-2 px-4">₦{{ txn.amount }}</td>
                <td class="py-2 px-4">
                  <span
                    :class="
                      txn.status === 'success'
                        ? darkMode
                          ? 'bg-green-900 text-green-300'
                          : 'bg-green-100 text-green-700'
                        : darkMode
                          ? 'bg-red-900 text-red-300'
                          : 'bg-red-100 text-red-700'
                    "
                    class="px-2 py-1 rounded"
                  >
                    {{ txn.status }}
                  </span>
                </td>
                <td class="py-2 px-4" :class="darkMode ? 'text-gray-300' : 'text-gray-500'">
                  {{ new Date(txn.createdAt).toLocaleString() }}
                </td>
              </tr>
            </tbody>
          </table>

          <!-- Fallback message if no transactions -->
          <div
            v-else
            class="py-6 text-center text-gray-500"
            :class="darkMode ? 'text-gray-300' : 'text-gray-500'"
          >
            No recent data purchases yet.
          </div>
        </div>
      </section>

      <!-- Registered Users -->
      <section v-if="registeredUsers.length" class="mt-12">
        <h2 class="text-lg font-semibold mb-4">Registered Users</h2>
        <div class="overflow-x-auto">
          <table
            class="min-w-full shadow-lg rounded-2xl transition-colors duration-300"
            :class="darkMode ? 'bg-[#13254d]' : 'bg-white'"
          >
            <thead :class="darkMode ? 'bg-[#1c386e]' : 'bg-gray-100'">
              <tr>
                <th class="py-3 px-4 text-left">Name</th>
                <th class="py-3 px-4 text-left">Email</th>
                <th class="py-3 px-4 text-left">Phone</th>
                <th class="py-3 px-4 text-left">Registered At</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="user in registeredUsers"
                :key="user._id"
                class="border-t transition-colors duration-200"
                :class="
                  darkMode
                    ? 'hover:bg-[#1f3a70] border-gray-700'
                    : 'hover:bg-gray-50 border-gray-200'
                "
              >
                <td class="py-2 px-4">{{ user.name }}</td>
                <td class="py-2 px-4">{{ user.email }}</td>
                <td class="py-2 px-4">{{ user.phone }}</td>
                <td class="py-2 px-4" :class="darkMode ? 'text-gray-300' : 'text-gray-500'">
                  {{ new Date(user.createdAt).toLocaleString() }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- Email / OTP Logs -->
      <section v-if="emailLogs.length" class="mt-12">
        <h2 class="text-lg font-semibold mb-4">Email / OTP Logs</h2>
        <div class="overflow-x-auto">
          <table
            class="min-w-full shadow-lg rounded-2xl transition-colors duration-300"
            :class="darkMode ? 'bg-[#13254d]' : 'bg-white'"
          >
            <thead :class="darkMode ? 'bg-[#1c386e]' : 'bg-gray-100'">
              <tr>
                <th class="py-3 px-4 text-left">Email</th>
                <th class="py-3 px-4 text-left">Type</th>
                <th class="py-3 px-4 text-left">Status</th>
                <th class="py-3 px-4 text-left">Message</th>
                <th class="py-3 px-4 text-left">Resend Count</th>
                <th class="py-3 px-4 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="log in emailLogs"
                :key="log._id"
                class="border-t transition-colors duration-200"
                :class="
                  darkMode
                    ? 'hover:bg-[#1f3a70] border-gray-700'
                    : 'hover:bg-gray-50 border-gray-200'
                "
              >
                <td class="py-2 px-4">{{ log.email }}</td>
                <td class="py-2 px-4">{{ log.type }}</td>
                <td class="py-2 px-4">
                  <span
                    :class="
                      log.status === 'SENT'
                        ? darkMode
                          ? 'bg-green-900 text-green-300'
                          : 'bg-green-100 text-green-700'
                        : darkMode
                          ? 'bg-red-900 text-red-300'
                          : 'bg-red-100 text-red-700'
                    "
                    class="px-2 py-1 rounded"
                  >
                    {{ log.status }}
                  </span>
                </td>
                <td class="py-2 px-4" :class="darkMode ? 'text-gray-300' : 'text-gray-500'">
                  {{ log.message || '-' }}
                </td>
                <td class="py-2 px-4">
                  <span
                    :class="[
                      'px-2 py-1 rounded font-semibold',
                      log.resendCount >= 3
                        ? darkMode
                          ? 'bg-red-900 text-red-300'
                          : 'bg-red-100 text-red-700'
                        : darkMode
                          ? 'bg-green-900 text-green-300'
                          : 'bg-green-100 text-green-700',
                    ]"
                  >
                    {{ log.resendCount || 0 }}
                  </span>
                </td>
                <td class="py-2 px-4" :class="darkMode ? 'text-gray-300' : 'text-gray-500'">
                  {{ new Date(log.createdAt).toLocaleString() }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import router from '@/router'
import axios from 'axios'
import { Banknote, CreditCard, Users, Wallet, Sun, Moon } from 'lucide-vue-next'
import { Bar, Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from 'chart.js'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
)

const loading = ref(true)
const stats = ref({
  totalRevenue: 0,
  totalTransactions: 0,
  totalUsers: 0,
})
const vtuBalance = ref(0)

const recentTransactions = ref([])
const registeredUsers = ref([])
const emailLogs = ref([])

const token = localStorage.getItem('token')

// Dark mode
const darkMode = ref(localStorage.getItem('theme') === 'dark')
const toggleDarkMode = () => {
  darkMode.value = !darkMode.value
  localStorage.setItem('theme', darkMode.value ? 'dark' : 'light')
}

// Stats cards
const statCards = computed(() => [
  {
    title: 'Total Revenue',
    value: `₦${stats.value.totalRevenue.toLocaleString()}`,
    colorClass: 'text-green-500',
    icon: Banknote,
  },
  {
    title: 'Transactions',
    value: stats.value.totalTransactions,
    colorClass: 'text-blue-400',
    icon: CreditCard,
  },
  {
    title: 'Total Users',
    value: registeredUsers.value.length,
    colorClass: 'text-purple-400',
    icon: Users,
  },
  {
    title: 'Paystack Wallet Balance',
    value: `₦${vtuBalance.value.toLocaleString()}`,
    colorClass: 'text-orange-400',
    icon: Wallet,
  },
])

// Charts
const revenueChartData = ref({
  labels: [],
  datasets: [{ label: 'Revenue (₦)', backgroundColor: '#16a34a', data: [] }],
})
const transactionChartData = ref({
  labels: [],
  datasets: [{ label: 'Transactions', borderColor: '#3b82f6', data: [], fill: false }],
})
const chartOptions = { responsive: true, plugins: { legend: { position: 'top' } } }

// Fetch dashboard data
const fetchDashboardData = async () => {
  try {
    const [statsRes, balanceRes, chartRes, emailRes] = await Promise.all([
      axios.get('http://localhost:5002/api/admin/dashboard-stats', {
        headers: { Authorization: `Bearer ${token}` },
      }),

      axios.get('http://localhost:5002/api/admin/paystack-balance', {
        headers: { Authorization: `Bearer ${token}` },
      }),
      axios.get('http://localhost:5002/api/admin/chart-data', {
        headers: { Authorization: `Bearer ${token}` },
      }),
      axios.get('http://localhost:5002/api/admin/email-logs', {
        headers: { Authorization: `Bearer ${token}` },
      }),
    ])
    console.log('Dashboard Stats:', statsRes.data)

    stats.value.totalRevenue = statsRes.data.stats.totalRevenue || 0
    stats.value.totalTransactions = statsRes.data.stats.totalTransactions || 0
    stats.value.totalUsers = statsRes.data.stats.totalUsers || 0

    vtuBalance.value = balanceRes.data.balance || 0

    recentTransactions.value = statsRes.data.recentTransactions || []

    // --- NEW: include resendCount even if 0, latest per email ---
    const logs = emailRes.data.logs || []

    // Aggregate latest log per email
    const latestLogsByEmail = Object.values(
      logs.reduce((acc, log) => {
        const email = log.email
        // Keep only the latest log per email
        if (!acc[email] || new Date(log.createdAt) > new Date(acc[email].createdAt)) {
          acc[email] = log
        }
        return acc
      }, {}),
    )

    emailLogs.value = latestLogsByEmail.map((log) => ({
      ...log,
      resendCount: log.resendCount || 0,
    }))

    revenueChartData.value.labels = chartRes.data.revenue?.map((r) => r.date) || []
    revenueChartData.value.datasets[0].data = chartRes.data.revenue?.map((r) => r.amount) || []

    transactionChartData.value.labels = chartRes.data.transactions?.map((t) => t.date) || []
    transactionChartData.value.datasets[0].data =
      chartRes.data.transactions?.map((t) => t.count) || []
  } catch (err) {
    console.error(err)
    if (err.response?.status === 403 || err.response?.status === 401) {
      localStorage.clear()
      router.push('/login')
    }
  } finally {
    loading.value = false
  }
}

// Fetch Registered Users
const fetchRegisteredUsers = async () => {
  try {
    const res = await axios.get('http://localhost:5002/api/admin/users', {
      headers: { Authorization: `Bearer ${token}` },
    })
    if (res.data.success) {
      registeredUsers.value = res.data.users
    }
  } catch (err) {
    console.error('Failed to fetch users:', err)
  }
}

// Logout
const logout = () => {
  localStorage.clear()
  router.push('/login')
}

// On Mounted
onMounted(async () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  if (!token || user.role !== 'admin') {
    router.push('/login')
    return
  }

  await fetchDashboardData()
  await fetchRegisteredUsers()
})
</script>

<!-- import { ref, onMounted, computed } from 'vue'
import router from '@/router'
import axios from 'axios'
import { Banknote, CreditCard, Users, Wallet, Sun, Moon } from 'lucide-vue-next'
import { Bar, Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from 'chart.js'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
)

const loading = ref(true)
const stats = ref({
  totalRevenue: 0,
  totalTransactions: 0,
  totalUsers: 0,
})
const vtuBalance = ref(0)

const recentTransactions = ref([])
const registeredUsers = ref([])
const emailLogs = ref([])

const token = localStorage.getItem('token')

// Dark mode
const darkMode = ref(localStorage.getItem('theme') === 'dark')
const toggleDarkMode = () => {
  darkMode.value = !darkMode.value
  localStorage.setItem('theme', darkMode.value ? 'dark' : 'light')
}

// Stats cards
const statCards = computed(() => [
  {
    title: 'Total Revenue',
    value: `₦${stats.value.totalRevenue.toLocaleString()}`,
    colorClass: 'text-green-500',
    icon: Banknote,
  },
  {
    title: 'Transactions',
    value: stats.value.totalTransactions,
    colorClass: 'text-blue-400',
    icon: CreditCard,
  },
  {
    title: 'Total Users',
    value: registeredUsers.value.length,
    colorClass: 'text-purple-400',
    icon: Users,
  },
  {
    title: 'Paystack Wallet Balance',
    value: `₦${vtuBalance.value.toLocaleString()}`,
    colorClass: 'text-orange-400',
    icon: Wallet,
  },
])

// Charts
const revenueChartData = ref({
  labels: [],
  datasets: [{ label: 'Revenue (₦)', backgroundColor: '#16a34a', data: [] }],
})
const transactionChartData = ref({
  labels: [],
  datasets: [{ label: 'Transactions', borderColor: '#3b82f6', data: [], fill: false }],
})
const chartOptions = { responsive: true, plugins: { legend: { position: 'top' } } }

const fetchDashboardData = async () => {
  try {
    const [statsRes, balanceRes, chartRes, emailRes] = await Promise.all([
      axios.get('http://localhost:5002/api/admin/dashboard-stats', {
        headers: { Authorization: `Bearer ${token}` },
      }),
      axios.get('http://localhost:5002/api/admin/paystack-balance', {
        headers: { Authorization: `Bearer ${token}` },
      }),
      axios.get('http://localhost:5002/api/admin/chart-data', {
        headers: { Authorization: `Bearer ${token}` },
      }),
      axios.get('http://localhost:5002/api/admin/email-logs', {
        headers: { Authorization: `Bearer ${token}` },
      }),
    ])

    stats.value.totalRevenue = statsRes.data.stats.totalRevenue || 0
    stats.value.totalTransactions = statsRes.data.stats.totalTransactions || 0
    stats.value.totalUsers = statsRes.data.stats.totalUsers || 0

    vtuBalance.value = balanceRes.data.balance || 0

    recentTransactions.value = statsRes.data.recentTransactions || []
    emailLogs.value = (emailRes.data.logs || [])
      .filter((log) => log.resendCount > 0)
      .sort((a, b) => b.resendCount - a.resendCount)

    revenueChartData.value.labels = chartRes.data.revenue?.map((r) => r.date) || []
    revenueChartData.value.datasets[0].data = chartRes.data.revenue?.map((r) => r.amount) || []

    transactionChartData.value.labels = chartRes.data.transactions?.map((t) => t.date) || []
    transactionChartData.value.datasets[0].data =
      chartRes.data.transactions?.map((t) => t.count) || []
  } catch (err) {
    console.error(err)
    if (err.response?.status === 403 || err.response?.status === 401) {
      localStorage.clear()
      router.push('/login')
    }
  } finally {
    loading.value = false
  }
}

// Fetch Registered Users
const fetchRegisteredUsers = async () => {
  try {
    const res = await axios.get('http://localhost:5002/api/admin/users', {
      headers: { Authorization: `Bearer ${token}` },
    })
    if (res.data.success) {
      registeredUsers.value = res.data.users
    }
  } catch (err) {
    console.error('Failed to fetch users:', err)
  }
}

// Logout
const logout = () => {
  localStorage.clear()
  router.push('/login')
}

// On Mounted
onMounted(async () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  if (!token || user.role !== 'admin') {
    router.push('/login')
    return
  }

  await fetchDashboardData()
  await fetchRegisteredUsers()
}) -->

<style scoped>
table th,
table td {
  padding: 0.75rem 1rem;
}
</style>
