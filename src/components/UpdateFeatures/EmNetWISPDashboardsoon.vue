<template>
  <div class="min-h-screen bg-gray-50 text-gray-900 p-6 md:p-10">
    <!-- Top bar -->
    <header class="flex items-center justify-between gap-4 mb-6">
      <div class="flex items-center gap-4">
        <img src=" " alt="EmNet" class="w-12 h-12 rounded-md shadow-sm object-cover" />
        <div>
          <h1 class="text-2xl font-semibold">EmNet Dashboard</h1>
          <p class="text-sm text-gray-500">Manage subscriptions, devices & market coverage</p>
        </div>
      </div>

      <div class="flex items-center gap-3">
        <div class="text-right">
          <p class="text-sm text-gray-500">Welcome back, <span class="font-medium">{{ user?.name || 'User' }}</span></p>
          <p class="text-xs text-gray-400">Last login: {{ lastLogin }}</p>
        </div>
        <button @click="logout" class="ml-3 px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700">Logout</button>
      </div>
    </header>

    <!-- Main grid -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- LEFT: Account & Wallet -->
      <aside class="col-span-1 space-y-4">
        <div class="bg-white rounded-xl p-4 shadow">
          <h2 class="text-sm text-gray-500">Account</h2>
          <div class="mt-3 flex items-center gap-3">
            <div class="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center text-xl font-semibold text-gray-700">{{ avatarInitial }}</div>
            <div>
              <p class="font-medium">{{ user?.name || '—' }}</p>
              <p class="text-xs text-gray-400">{{ user?.email || 'No email' }}</p>
            </div>
          </div>

          <div class="mt-4 border-t pt-4">
            <p class="text-xs text-gray-500">Referral Balance</p>
            <p class="text-xl font-semibold text-green-600">₦{{ formatMoney(bonusBalance) }}</p>
            <button @click="copyReferral" :disabled="copied" class="mt-3 w-full px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-60">{{ copied ? 'Copied' : 'Copy referral link' }}</button>
          </div>
        </div>

        <div class="bg-white rounded-xl p-4 shadow">
          <h2 class="text-sm text-gray-500">Active Subscription</h2>
          <div v-if="activePlan" class="mt-3">
            <p class="font-medium">{{ activePlan.name }}</p>
            <p class="text-xs text-gray-400">Valid until {{ formatDate(activePlan.expiresAt) }}</p>
            <p class="mt-2 text-sm">Speed: <span class="font-medium">{{ activePlan.speed }}</span></p>
            <div class="mt-3 flex gap-2">
              <button class="px-3 py-2 bg-yellow-500 text-white rounded-lg">Renew</button>
              <button class="px-3 py-2 bg-gray-100 rounded-lg">View details</button>
            </div>
          </div>
          <div v-else class="mt-3 text-sm text-gray-500">No active plan. Purchase a subscription to stay connected when you move.</div>
        </div>

        <div class="bg-white rounded-xl p-4 shadow">
          <h2 class="text-sm text-gray-500">Device Management</h2>
          <p class="text-xs text-gray-400 mt-2">Register POS machines and personal devices for priority access.</p>
          <div class="mt-3 space-y-2">
            <div v-for="d in devices" :key="d.id" class="flex items-center justify-between p-2 border rounded-md">
              <div>
                <p class="font-medium">{{ d.label }}</p>
                <p class="text-xs text-gray-400">{{ d.type }} · {{ d.lastSeen ? formatDate(d.lastSeen) : 'Never connected' }}</p>
              </div>
              <div class="flex items-center gap-2">
                <button @click="togglePriority(d)" class="px-2 py-1 text-sm rounded-md border">{{ d.priority ? 'Unprioritise' : 'Prioritise' }}</button>
              </div>
            </div>
            <div v-if="devices.length === 0" class="text-xs text-gray-400">No devices registered yet</div>
          </div>
        </div>
      </aside>

      <!-- MIDDLE: Coverage Map & Plans -->
      <main class="col-span-2 space-y-6">
        <section class="bg-white rounded-xl p-4 shadow">
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-semibold">Market Coverage — Live</h2>
            <div class="text-sm text-gray-500">5 masts · 42 poles deployed</div>
          </div>

          <div class="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
            <!-- Map placeholder -->
            <div class="lg:col-span-2 bg-gray-50 rounded-md border-dashed border-2 border-gray-200 p-4 flex items-center justify-center">
              <div class="text-center text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto mb-3" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M21 10c0 6-9 12-9 12s-9-6-9-12a9 9 0 0118 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                <p class="font-medium">Coverage Map</p>
                <p class="text-xs">(Placeholder) Integrate Leaflet or Google Maps to visualize masts & poles.</p>
              </div>
            </div>

            <!-- Mast summary -->
            <div class="space-y-3">
              <div class="p-3 rounded-md bg-white border shadow-sm">
                <p class="text-xs text-gray-500">Total Backhaul</p>
                <p class="text-lg font-semibold">{{ formatMbps(backhaulMbps) }} Mbps</p>
              </div>
              <div class="p-3 rounded-md bg-white border shadow-sm">
                <p class="text-xs text-gray-500">Users Online</p>
                <p class="text-lg font-semibold">{{ usersOnline }}</p>
              </div>
              <div class="p-3 rounded-md bg-white border shadow-sm">
                <p class="text-xs text-gray-500">POS Transactions/hr</p>
                <p class="text-lg font-semibold">{{ posTxPerHour }}</p>
              </div>
            </div>
          </div>
        </section>

        <!-- Plans -->
        <section class="bg-white rounded-xl p-4 shadow">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-lg font-semibold">Subscription Plans</h2>
            <div class="text-sm text-gray-500">All plans grant roaming across EmNet markets</div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div v-for="plan in plans" :key="plan.id" class="border rounded-xl p-4 hover:shadow-md transition">
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="font-semibold">{{ plan.name }}</h3>
                  <p class="text-xs text-gray-400 mt-1">{{ plan.description }}</p>
                </div>
                <div class="text-right">
                  <p class="text-lg font-bold">₦{{ formatMoney(plan.price) }}</p>
                  <p class="text-xs text-gray-400">{{ plan.durationLabel }}</p>
                </div>
              </div>

              <ul class="mt-3 text-sm text-gray-600 space-y-1">
                <li>• Speed: {{ plan.speed }}</li>
                <li>• Fair usage: {{ plan.fu }}</li>
                <li>• Priority: {{ plan.priority ? 'Included' : 'Optional' }}</li>
              </ul>

              <div class="mt-4 flex gap-2">
                <button @click="openPurchase(plan)" class="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg">Subscribe</button>
                <button @click="viewPlan(plan)" class="px-3 py-2 border rounded-lg">Details</button>
              </div>
            </div>
          </div>
        </section>

        <!-- Transactions / Activity -->
        <section class="bg-white rounded-xl p-4 shadow">
          <h2 class="text-lg font-semibold mb-3">Recent Activity</h2>
          <div v-if="transactions.length === 0" class="text-sm text-gray-400">No recent activity</div>
          <ul class="space-y-2">
            <li v-for="t in recentTransactions" :key="t.id" class="p-3 border rounded-md flex justify-between items-center">
              <div>
                <p class="font-medium">{{ t.title }}</p>
                <p class="text-xs text-gray-400">{{ formatDate(t.date) }}</p>
              </div>
              <div class="text-sm text-gray-700">{{ t.meta }}</div>
            </li>
          </ul>
        </section>
      </main>
    </div>

    <!-- Purchase Modal -->
    <transition name="fade">
      <div v-if="showPurchase" class="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
        <div class="w-full max-w-lg bg-white rounded-xl p-6 shadow-lg">
          <h3 class="text-lg font-semibold">Subscribe to {{ activePlanTemp?.name }}</h3>
          <p class="text-sm text-gray-500 mt-2">Roaming enabled · Priority for registered devices (optional)</p>

          <div class="mt-4 grid grid-cols-1 gap-3">
            <label class="block text-sm">Phone to link (optional)</label>
            <input v-model="purchasePhone" placeholder="e.g. 08012345678" class="w-full border rounded-md p-2" />

            <label class="block text-sm">Device to prioritise (POS) (optional)</label>
            <select v-model="selectedDevice" class="w-full border rounded-md p-2">
              <option value="">-- none --</option>
              <option v-for="d in devices" :key="d.id" :value="d.id">{{ d.label }}</option>
            </select>

            <div class="flex items-center gap-3">
              <input type="checkbox" v-model="acceptTos" id="tos" class="h-4 w-4" />
              <label for="tos" class="text-xs text-gray-500">I accept EmNet Terms & Conditions</label>
            </div>
          </div>

          <div class="mt-5 flex justify-end gap-2">
            <button @click="closePurchase" class="px-4 py-2 border rounded-lg">Cancel</button>
            <button :disabled="!acceptTos" @click="confirmPurchase" class="px-4 py-2 bg-green-600 text-white rounded-lg">Pay ₦{{ formatMoney(activePlanTemp?.price || 0) }}</button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// --- Mocked / starter data (replace with your API calls) ---
const user = ref({ name: 'Emmanuel', email: 'you@emnet.ng' })
const lastLogin = new Date().toLocaleString()
const bonusBalance = ref(1200)
const copied = ref(false)

const plans = ref([
  { id: 'p1', name: 'Starter', price: 2500, durationLabel: '30 days', description: 'Light browsing', speed: '5 Mbps', fu: '10GB/day', priority: false },
  { id: 'p2', name: 'Business', price: 4000, durationLabel: '30 days', description: 'Reliable for POS & team', speed: '25 Mbps', fu: '50GB/day', priority: true },
  { id: 'p3', name: 'Pro', price: 9000, durationLabel: '30 days', description: 'High speed roaming', speed: '100 Mbps', fu: '200GB/day', priority: true },
])

const activePlan = ref(null)
const devices = ref([
  { id: 'd1', label: 'Shop POS - Emeka', type: 'POS', priority: true, lastSeen: new Date() },
  { id: 'd2', label: 'My Phone', type: 'Phone', priority: false, lastSeen: new Date(Date.now() - 1000 * 60 * 60 * 5) },
])

const backhaulMbps = ref(500)
const usersOnline = ref(842)
const posTxPerHour = ref(34)
const transactions = ref([])

// Purchase modal
const showPurchase = ref(false)
const activePlanTemp = ref(null)
const purchasePhone = ref('')
const selectedDevice = ref('')
const acceptTos = ref(false)

function openPurchase(plan) {
  activePlanTemp.value = plan
  showPurchase.value = true
}
function closePurchase() {
  showPurchase.value = false
  acceptTos.value = false
  purchasePhone.value = ''
  selectedDevice.value = ''
}
function confirmPurchase() {
  // stub: call your payment flow or route to backend
  transactions.value.unshift({ id: Date.now(), title: `Subscribed: ${activePlanTemp.value.name}`, date: new Date(), meta: `Paid ₦${activePlanTemp.value.price}` })
  activePlan.value = { ...activePlanTemp.value, expiresAt: new Date(Date.now() + 30 * 24 * 3600 * 1000) }
  closePurchase()
  alert('Purchase flow simulated. Hook this to your payment gateway.')
}

function viewPlan(plan) { alert(JSON.stringify(plan, null, 2)) }

function togglePriority(d) { d.priority = !d.priority }

function logout() { /* call backend logout, then redirect */ alert('Logout called (wire to backend)') }

function copyReferral() {
  const link = `${window.location.origin}/signup?ref=REF123` // replace with real
  navigator.clipboard.writeText(link).then(() => {
    copied.value = true
    setTimeout(() => (copied.value = false), 2000)
  })
}

const avatarInitial = computed(() => (user.value?.name ? user.value.name.charAt(0).toUpperCase() : 'E'))

const recentTransactions = computed(() => transactions.value.slice(0, 6))

// Small helpers
function formatMoney(n) { return Number(n).toLocaleString() }
function formatDate(d) { if (!d) return '—'; const dt = new Date(d); return dt.toLocaleString() }
function formatMbps(n) { return Number(n).toLocaleString() }

onMounted(() => {
  // load real data from your backend in production
})
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity .2s }
.fade-enter-from, .fade-leave-to { opacity: 0 }
</style>
