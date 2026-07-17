
<template>
  <div class="min-h-screen bg-gradient-to-b from-white via-slate-50 to-[#f5f7fa] text-gray-900 antialiased">

    <!-- TOP NAV / MOBILE -->
    <nav class="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center gap-3">
            <img src="" alt="EmNet" class="w-10 h-10 rounded-lg bg-gray-100 shadow-sm object-cover" />
            <div>
              <div class="text-lg font-semibold tracking-tight">EmNet</div>
              <div class="text-xs text-gray-400">Regional Wi-Fi & Roaming</div>
            </div>
          </div>

          <div class="hidden md:flex items-center gap-4">
            <div class="text-right mr-2">
              <div class="text-sm text-gray-700">Welcome, <span class="font-medium">{{ user?.name }}</span></div>
              <div class="text-xs text-gray-400">Last login: {{ lastLogin }}</div>
            </div>
            <button @click="logout" class="inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M17 16l4-4m0 0l-4-4m4 4H7"></path><path d="M7 8v8"></path></svg>
              Logout
            </button>
          </div>

          <!-- mobile menu button -->
          <button @click="mobileMenu = !mobileMenu" class="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:bg-gray-100">
            <svg v-if="!mobileMenu" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
            <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>
      </div>

      <!-- mobile menu content -->
      <div v-if="mobileMenu" class="md:hidden border-t border-gray-100 bg-white">
        <div class="px-4 py-3 space-y-2">
          <div class="text-sm font-medium">{{ user?.name }}</div>
          <div class="text-xs text-gray-500">{{ user?.email }}</div>
          <div class="pt-2">
            <button @click="logout" class="w-full text-left px-3 py-2 rounded-md bg-red-600 text-white">Logout</button>
          </div>
        </div>
      </div>
    </nav>

    <!-- MAIN -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

      <!-- Top summary cards -->
      <section class="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-6">
        <div class="bg-white rounded-2xl p-4 shadow hover:shadow-lg transition">
          <div class="flex items-center justify-between">
            <div>
              <div class="text-sm text-gray-500">Backhaul (MainOne)</div>
              <div class="mt-1 text-2xl font-semibold">{{ formatMbps(backhaulMbps) }} Mbps</div>
            </div>
            <div class="bg-indigo-50 rounded-full p-2">
              <svg class="w-6 h-6 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 20v-6"/></svg>
            </div>
          </div>
          <p class="mt-3 text-xs text-gray-400">Main office routes all masts & manages QoS</p>
        </div>

        <div class="bg-white rounded-2xl p-4 shadow hover:shadow-lg transition">
          <div class="flex items-center justify-between">
            <div>
              <div class="text-sm text-gray-500">Active Users</div>
              <div class="mt-1 text-2xl font-semibold">{{ usersOnline }}</div>
            </div>
            <div class="bg-amber-50 rounded-full p-2">
              <svg class="w-6 h-6 text-amber-600" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M5 12h14"/></svg>
            </div>
          </div>
          <p class="mt-3 text-xs text-gray-400">Concurrent users across all masts</p>
        </div>

        <div class="bg-white rounded-2xl p-4 shadow hover:shadow-lg transition">
          <div class="flex items-center justify-between">
            <div>
              <div class="text-sm text-gray-500">POS Tx / hr</div>
              <div class="mt-1 text-2xl font-semibold">{{ posTxPerHour }}</div>
            </div>
            <div class="bg-green-50 rounded-full p-2">
              <svg class="w-6 h-6 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 5v14"/></svg>
            </div>
          </div>
          <p class="mt-3 text-xs text-gray-400">Priority traffic kept reliable</p>
        </div>
      </section>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">

        <!-- LEFT COLUMN -->
        <aside class="space-y-6 lg:col-span-1 order-2 lg:order-1">

          <!-- account card -->
          <div class="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div class="flex items-center gap-4">
              <div class="w-14 h-14 rounded-xl bg-gray-100 flex items-center justify-center text-xl font-semibold shadow">{{ avatarInitial }}</div>
              <div>
                <div class="text-md font-semibold">{{ user?.name }}</div>
                <div class="text-xs text-gray-400">{{ user?.email }}</div>
              </div>
            </div>

            <div class="mt-4 border-t pt-4">
              <div class="text-xs text-gray-500">Referral Balance</div>
              <div class="mt-1 text-2xl font-bold text-emerald-600">₦{{ formatMoney(bonusBalance) }}</div>
              <div class="mt-3 flex gap-2">
                <button @click="copyReferral" :disabled="copied" class="flex-1 px-3 py-2 bg-indigo-600 text-white rounded-lg shadow-sm">
                  {{ copied ? 'Copied' : 'Copy referral' }}
                </button>
                <button @click="openInviteModal" class="px-3 py-2 border rounded-lg">Invite</button>
              </div>
            </div>
          </div>

          <!-- current subscription -->
          <div class="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div class="flex items-start justify-between gap-3">
              <div>
                <div class="text-sm text-gray-500">Your Plan</div>
                <div class="mt-1 font-semibold text-gray-800">{{ activePlan?.name || 'No active plan' }}</div>
                <div class="text-xs text-gray-400 mt-1">{{ activePlan ? `Valid until ${formatDate(activePlan.expiresAt)}` : 'Get connected instantly' }}</div>
              </div>
              <div class="text-right">
                <div class="text-lg font-bold">{{ activePlan ? `₦${formatMoney(activePlan.price)}` : '-' }}</div>
                <div class="text-xs text-gray-400">Roaming enabled</div>
              </div>
            </div>

            <template v-if="activePlan && activePassword">
              <div class="mt-4 bg-gray-50 p-3 rounded-lg border border-dashed">
                <div class="flex items-center justify-between">
                  <div>
                    <div class="text-xs text-gray-500">Wi-Fi password (use on EmNet Wi-Fi)</div>
                    <div class="font-mono mt-1 text-lg font-semibold">{{ activePassword.password }}</div>
                    <div class="text-xs text-gray-400 mt-1">Expires: {{ formatDate(activePassword.expiresAt) }}</div>
                  </div>
                  <div class="flex flex-col gap-2">
                    <button @click="copyPassword" class="px-3 py-2 bg-indigo-600 text-white rounded-lg">Copy</button>
                    <button @click="revokePassword" class="px-3 py-2 border rounded-lg text-sm">Revoke</button>
                  </div>
                </div>
              </div>
            </template>

            <div class="mt-4 flex gap-2">
              <button @click="openPlans" class="flex-1 px-3 py-2 bg-rose-600 text-white rounded-lg shadow">Browse Plans</button>
              <button @click="manageDevices" class="px-3 py-2 border rounded-lg">Devices</button>
            </div>
          </div>

          <!-- devices (read-only) -->
          <div class="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div class="flex items-center justify-between">
              <div class="text-sm font-semibold text-gray-700">Registered Devices</div>
              <div class="text-xs text-gray-400">{{ devices.length }}</div>
            </div>

            <ul class="mt-3 space-y-2">
              <li v-for="d in devices" :key="d.id" class="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
                <div>
                  <div class="font-medium text-gray-800">{{ d.label }}</div>
                  <div class="text-xs text-gray-400">{{ d.type }} • {{ d.lastSeen ? formatDate(d.lastSeen) : 'Never' }}</div>
                </div>
                <div class="text-xs">
                  <span v-if="d.priority" class="px-2 py-1 bg-amber-100 text-amber-700 rounded-full">Priority</span>
                </div>
              </li>
            </ul>
          </div>

        </aside>

        <!-- CENTER / RIGHT: main widgets -->
        <section class="lg:col-span-2 order-1 lg:order-2 space-y-6">

          <!-- Coverage map + telemetry -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="md:col-span-2 bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
              <div class="flex items-center justify-between">
                <h3 class="font-semibold text-gray-800">Coverage Map</h3>
                <div class="text-xs text-gray-400">Live · Click to view</div>
              </div>
              <div class="mt-3 h-64 md:h-72 rounded-lg bg-gradient-to-br from-gray-50 to-white border border-gray-200 flex items-center justify-center">
                <!-- Placeholder - integrate Leaflet or Mapbox -->
                <div class="text-center text-gray-400">
                  <svg class="mx-auto mb-2" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 2l3 7h7l-5.5 4 2 7L12 16l-6.5 4 2-7L2 9h7l3-7z"/></svg>
                  <div class="font-medium">Map placeholder</div>
                  <div class="text-xs mt-1">Replace with Leaflet / Mapbox</div>
                </div>
              </div>
            </div>

            <div class="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
              <div class="flex items-center justify-between">
                <div>
                  <div class="text-sm text-gray-500">Uptime</div>
                  <div class="text-xl font-semibold">99.98%</div>
                </div>
                <div class="text-xs text-gray-400">Monthly</div>
              </div>

              <div class="mt-4">
                <!-- simple sparkline placeholder -->
                <div class="h-24 flex items-center justify-center text-xs text-gray-400">Sparkline chart placeholder</div>
              </div>
            </div>
          </div>

          <!-- PLANS GRID -->
          <div class="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div class="flex items-center justify-between mb-4">
              <h3 class="font-semibold text-gray-800">Subscription Plans</h3>
              <div class="text-xs text-gray-400">Roaming across EmNet markets</div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div v-for="plan in plans" :key="plan.id" class="p-4 rounded-xl border hover:shadow-md transition relative overflow-hidden">
                <div class="absolute top-0 right-0 -mt-2 -mr-2">
                  <div class="px-3 py-1 rounded-bl-xl bg-gradient-to-r from-indigo-500 to-indigo-600 text-white text-xs font-semibold">{{ plan.durationLabel }}</div>
                </div>

                <div class="flex items-center justify-between">
                  <div>
                    <div class="text-lg font-semibold text-gray-900">{{ plan.name }}</div>
                    <div class="text-xs text-gray-400 mt-1">{{ plan.description }}</div>
                  </div>
                  <div class="text-right">
                    <div class="text-2xl font-bold">₦{{ formatMoney(plan.price) }}</div>
                    <div class="text-xs text-gray-400">monthly</div>
                  </div>
                </div>

                <ul class="mt-3 text-sm text-gray-600 space-y-1">
                  <li>• Speed: <span class="font-medium">{{ plan.speed }}</span></li>
                  <li>• FUP: {{ plan.fu }}</li>
                  <li>• Priority: {{ plan.priority ? 'Yes' : 'No' }}</li>
                </ul>

                <div class="mt-4 flex gap-2">
                  <button @click="openPurchase(plan)" class="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg shadow">Subscribe</button>
                  <button @click="viewPlan(plan)" class="px-3 py-2 border rounded-lg">Details</button>
                </div>
              </div>
            </div>
          </div>

          <!-- Recent activity -->
          <div class="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div class="flex items-center justify-between">
              <h3 class="font-semibold text-gray-800">Recent Activity</h3>
              <div class="text-xs text-gray-400">Latest transactions & events</div>
            </div>

            <div class="mt-3 space-y-2">
              <div v-if="transactions.length === 0" class="text-sm text-gray-400 p-3">No recent activity</div>
              <div v-else>
                <div v-for="t in recentTransactions" :key="t.id" class="p-3 border rounded-lg bg-gray-50 flex items-center justify-between">
                  <div>
                    <div class="font-medium text-gray-800">{{ t.title }}</div>
                    <div class="text-xs text-gray-400">{{ formatDate(t.date) }}</div>
                  </div>
                  <div class="text-sm text-gray-700">{{ t.meta }}</div>
                </div>
              </div>
            </div>
          </div>

        </section>

      </div>
    </main>

    <!-- PURCHASE MODAL (ThemeForest style) -->
    <transition name="modal">
      <div v-if="showPurchase" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
        <div class="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl transform transition-all scale-100">
          <div class="grid grid-cols-1 md:grid-cols-2">
            <!-- left: details -->
            <div class="p-6 bg-gradient-to-b from-indigo-600 to-indigo-700 text-white">
              <div class="flex items-center justify-between">
                <div>
                  <div class="text-sm opacity-80">You're about to purchase</div>
                  <div class="mt-2 text-2xl font-bold">{{ activePlanTemp?.name }}</div>
                </div>
                <div class="text-right">
                  <div class="text-xs opacity-80">Price</div>
                  <div class="text-xl font-semibold">₦{{ formatMoney(activePlanTemp?.price || 0) }}</div>
                </div>
              </div>

              <ul class="mt-6 text-sm space-y-2">
                <li class="flex items-start gap-2"><svg class="w-4 h-4 mt-1" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M5 13l4 4L19 7"/></svg> High-speed roaming inside EmNet coverage</li>
                <li class="flex items-start gap-2"><svg class="w-4 h-4 mt-1" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 20v-6"/></svg> Priority for POS where available</li>
                <li class="flex items-start gap-2"><svg class="w-4 h-4 mt-1" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 2l3 7h7l-5.5 4 2 7L12 16l-6.5 4 2-7L2 9h7l3-7z"/></svg> One password for your devices</li>
              </ul>

              <div class="mt-6">
                <div class="text-xs opacity-80">After payment</div>
                <div class="mt-2 text-sm">You will receive a Wi-Fi password in your dashboard — use it to join the EmNet SSID on your phone. Roaming across EmNet markets is automatic.</div>
              </div>

              <div class="mt-6">
                <button @click="confirmPurchase" :disabled="paymentProcessing" class="w-full inline-flex items-center justify-center gap-2 py-3 bg-amber-500 hover:bg-amber-600 text-black font-semibold rounded-xl shadow-lg">
                  <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 1v22"/></svg>
                  <span v-if="!paymentProcessing">Pay ₦{{ formatMoney(activePlanTemp?.price || 0) }}</span>
                  <span v-else>Processing...</span>
                </button>
                <button @click="closePurchase" class="mt-3 w-full px-4 py-2 border rounded-xl text-sm bg-white">Cancel</button>
              </div>
            </div>

            <!-- right: summary & UX -->
            <div class="p-6">
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 font-semibold">{{ activePlanTemp?.name ? activePlanTemp.name.charAt(0) : 'E' }}</div>
                <div>
                  <div class="text-sm text-gray-600">Plan</div>
                  <div class="font-semibold text-gray-900">{{ activePlanTemp?.name || '—' }}</div>
                </div>
              </div>

              <div class="mt-4 text-sm text-gray-600">
                <p><strong>What you get:</strong></p>
                <ul class="mt-2 list-disc list-inside text-gray-600 space-y-1">
                  <li>Roaming across EmNet markets</li>
                  <li>Single password access — use on your phone</li>
                  <li>Priority traffic for POS where configured</li>
                </ul>
              </div>

              <div class="mt-6">
                <div class="text-xs text-gray-500">Support</div>
                <div class="mt-2 text-sm text-gray-700">If payment fails, contact support@emnet.ng with your reference.</div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </transition>

    <!-- INVITE MODAL (simple) -->
    <transition name="fade">
      <div v-if="showInvite" class="fixed inset-0 z-40 flex items-center justify-center bg-black/40 px-4">
        <div class="bg-white rounded-xl p-4 max-w-md w-full shadow">
          <div class="flex items-center justify-between">
            <div class="text-lg font-semibold">Invite friends</div>
            <button @click="showInvite=false" class="text-gray-500">Close</button>
          </div>
          <div class="mt-3 text-sm text-gray-600">Share your referral link to earn bonuses.</div>
          <div class="mt-4 flex gap-2">
            <input readonly :value="referralLink" class="flex-1 px-3 py-2 border rounded" />
            <button @click="copyReferral" class="px-3 py-2 bg-indigo-600 text-white rounded">Copy</button>
          </div>
        </div>
      </div>
    </transition>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

/*
  ThemeForest-level Dashboard (frontend-only)
  - no phone input for purchase
  - purchase generates a 'Wi-Fi password' shown after purchase
  - replace confirmPurchase() with real payment flow
*/

// State
const mobileMenu = ref(false)
const user = ref({ name: 'Emmanuel', email: 'you@emnet.ng' })
const lastLogin = new Date().toLocaleString()
const bonusBalance = ref(1200)
const copied = ref(false)

const backhaulMbps = ref(500)
const usersOnline = ref(842)
const posTxPerHour = ref(34)

// Plans (mock)
const plans = ref([
  { id: 'p1', name: 'Starter', price: 2500, durationLabel: '30 days', description: 'Light browsing', speed: '5 Mbps', fu: '10GB/day', priority: false },
  { id: 'p2', name: 'Business', price: 4000, durationLabel: '30 days', description: 'For POS & offices', speed: '25 Mbps', fu: '50GB/day', priority: true },
  { id: 'p3', name: 'Pro', price: 9000, durationLabel: '30 days', description: 'High speed roaming', speed: '100 Mbps', fu: '200GB/day', priority: true },
])

const activePlan = ref(null)
const activePassword = ref(null) // { password: 'abc', expiresAt: Date }

const devices = ref([
  { id: 'd1', label: 'Shop POS - Emeka', type: 'POS', priority: true, lastSeen: new Date() },
  { id: 'd2', label: 'My Phone', type: 'Phone', priority: false, lastSeen: new Date(Date.now() - 1000 * 60 * 60 * 5) },
])

const transactions = ref([])

// purchase modal
const showPurchase = ref(false)
const paymentProcessing = ref(false)
const activePlanTemp = ref(null)

const showInvite = ref(false)

// helpers
const avatarInitial = computed(() => user.value?.name ? user.value.name.charAt(0).toUpperCase() : 'E')
const referralLink = computed(() => `${window.location.origin}/signup?ref=REF123`)
const recentTransactions = computed(() => transactions.value.slice(0, 6))

// functions
function openPlans() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
  document.querySelector('main')?.scrollIntoView()
}
function manageDevices() {
  alert('Open devices manager (wire to backend).')
}
function viewPlan(plan) {
  activePlanTemp.value = plan
  openPurchase(plan)
}
function openPurchase(plan) {
  activePlanTemp.value = plan
  showPurchase.value = true
}
function closePurchase() {
  showPurchase.value = false
  paymentProcessing.value = false
}

// payment simulation -> replace with backend redirect / payment gateway
async function confirmPurchase() {
  if (!activePlanTemp.value) return
  paymentProcessing.value = true

  // simulate payment delay
  await new Promise((res) => setTimeout(res, 1400))

  // simulate success — in real flow you would call your backend to create order and wait for webhook/verification
  const pwd = generatePassword()
  const expiresAt = new Date(Date.now() + 30 * 24 * 3600 * 1000) // 30 days
  activePlan.value = { ...activePlanTemp.value, expiresAt }
  activePassword.value = { password: pwd, expiresAt }

  // record transaction
  transactions.value.unshift({
    id: Date.now(),
    title: `Purchased ${activePlanTemp.value.name}`,
    date: new Date(),
    meta: `Paid ₦${activePlanTemp.value.price}`,
  })

  paymentProcessing.value = false
  showPurchase.value = false

  // small toast (replace with real toast)
  setTimeout(() => alert('Purchase successful — password generated and shown in your dashboard.'), 300)
}

function generatePassword() {
  // generate a human-friendly password: 8 chars, letters+digits
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789' // avoid confusing 0,O,1,I
  let out = ''
  for (let i = 0; i < 8; i++) out += chars[Math.floor(Math.random() * chars.length)]
  return out.match(/.{1,4}/g).join('-') // e.g. 'ABCD-1234'
}

function copyReferral() {
  navigator.clipboard.writeText(referralLink.value)
  copied.value = true
  setTimeout(() => (copied.value = false), 1500)
}
function copyPassword() {
  if (!activePassword.value) return
  navigator.clipboard.writeText(activePassword.value.password)
  alert('Password copied — paste into EmNet Wi-Fi password field on your phone.')
}
function revokePassword() {
  if (!activePassword.value) return
  if (!confirm('Revoke the active password? This will disconnect devices using it.')) return
  activePassword.value = null
  alert('Password revoked.')
}

function togglePriority(d) { d.priority = !d.priority }
function logout() { alert('Logout — add backend logic.') }
function openInviteModal() { showInvite.value = true }

// formatters
function formatMoney(n) { return Number(n || 0).toLocaleString() }
function formatDate(d) { if (!d) return '—'; return new Date(d).toLocaleString() }
function formatMbps(n) { return Number(n).toLocaleString() }

// onMounted: load user data from backend in production
onMounted(() => {
  // TODO: fetch user, plans, transactions from backend
})
</script>

<style scoped>
/* small animations and theme touches */
.modal-enter-active, .modal-leave-active {
  transition: all .25s ease;
}
.modal-enter-from { opacity: 0; transform: translateY(12px) scale(.98); }
.modal-enter-to { opacity: 1; transform: translateY(0) scale(1); }
.modal-leave-from { opacity: 1; transform: translateY(0) scale(1); }
.modal-leave-to { opacity: 0; transform: translateY(12px) scale(.98); }

.fade-enter-active, .fade-leave-active { transition: opacity .2s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

/* font smoothing */
* { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }

/* small responsive tweaks */
@media (max-width: 640px) {
  nav div > .text-lg { font-size: 1rem; }
}
</style>
