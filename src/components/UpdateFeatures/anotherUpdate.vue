<template>
  <div
    :class="[
      'min-h-screen transition-colors duration-300 font-inter bg-gray-50 dark:bg-[#0f0f11] text-gray-900 dark:text-gray-200',
    ]"
  >
    <!-- TOP NAV -->
    <header
      class="flex items-center justify-between px-4 py-4 md:px-8 shadow-sm bg-white/70 dark:bg-[#141417]/70 backdrop-blur-xl sticky top-0 z-30"
    >
      <div class="flex items-center gap-3">
        <div
          class="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-600 to-blue-400 dark:from-blue-500 dark:to-blue-700 flex items-center justify-center text-white text-lg font-semibold shadow"
        >
          {{ avatar }}
        </div>
        <div>
          <p class="font-semibold text-lg">{{ user.name }}</p>
          <p class="text-xs text-gray-500 dark:text-gray-400">
            Welcome back 👋
          </p>
        </div>
      </div>

      <div class="flex items-center gap-4">
        <button
          @click="toggleDark"
          class="p-2 rounded-lg bg-gray-200 dark:bg-[#1d1d21] shadow text-gray-700 dark:text-gray-300"
        >
          <span v-if="!isDark">🌙</span>
          <span v-else>☀️</span>
        </button>

        <button
          @click="logout"
          class="px-4 py-2 bg-red-600 text-white rounded-xl text-sm shadow hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </header>

    <!-- MAIN CONTENT -->
    <main class="px-4 md:px-8 py-6 space-y-8">

      <!-- ACTIVE PLAN -->
      <section
        class="rounded-3xl p-6 bg-gradient-to-br from-blue-600 to-blue-400 dark:from-blue-500 dark:to-blue-700 text-white shadow-lg"
      >
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-semibold">Your Active Plan</h2>
          <span
            class="px-3 py-1 text-xs rounded-full bg-white/20 backdrop-blur-lg border border-white/30"
          >
            {{ activePlan.status }}
          </span>
        </div>

        <p class="mt-3 text-3xl font-bold">
          {{ activePlan.name }}
        </p>

        <p class="text-sm mt-1 opacity-80">
          Expires: {{ activePlan.expires }}
        </p>

        <!-- PASSWORD BOX -->
        <div
          class="mt-4 bg-white/20 border border-white/30 rounded-xl px-4 py-3 flex items-center justify-between"
        >
          <div>
            <p class="text-xs opacity-80">Wi-Fi Password</p>
            <p class="text-lg font-semibold">{{ wifiPassword }}</p>
          </div>

          <button
            @click="copyPassword"
            class="px-3 py-1 bg-white/30 text-white rounded-lg text-sm"
          >
            {{ copied ? "Copied!" : "Copy" }}
          </button>
        </div>

        <div class="mt-5 flex gap-2">
          <button
            class="flex-1 py-3 rounded-xl bg-white text-blue-600 font-semibold shadow-md"
          >
            Renew Plan
          </button>
          <button
            class="flex-1 py-3 rounded-xl bg-black/20 border border-white/30 font-semibold shadow"
          >
            Upgrade
          </button>
        </div>
      </section>

      <!-- QUICK ACTIONS -->
      <section>
        <h2 class="text-lg font-semibold mb-3">Quick Actions</h2>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div
            class="rounded-2xl p-4 bg-white dark:bg-[#141417] shadow hover:scale-[1.02] transition cursor-pointer"
          >
            <p class="text-2xl">🎁</p>
            <p class="font-semibold mt-2">Invite & Earn</p>
            <p class="text-xs text-gray-500 dark:text-gray-400">
              Get reward per invite
            </p>
          </div>

          <div
            class="rounded-2xl p-4 bg-white dark:bg-[#141417] shadow hover:scale-[1.02] transition cursor-pointer"
          >
            <p class="text-2xl">📶</p>
            <p class="font-semibold mt-2">Buy Plan</p>
            <p class="text-xs text-gray-500 dark:text-gray-400">
              Browse available plans
            </p>
          </div>

          <div
            class="rounded-2xl p-4 bg-white dark:bg-[#141417] shadow hover:scale-[1.02] transition cursor-pointer"
          >
            <p class="text-2xl">📱</p>
            <p class="font-semibold mt-2">Device</p>
            <p class="text-xs text-gray-500 dark:text-gray-400">
              See connected device
            </p>
          </div>

          <div
            class="rounded-2xl p-4 bg-white dark:bg-[#141417] shadow hover:scale-[1.02] transition cursor-pointer"
          >
            <p class="text-2xl">🛟</p>
            <p class="font-semibold mt-2">Support</p>
            <p class="text-xs text-gray-500 dark:text-gray-400">
              Get help anytime
            </p>
          </div>
        </div>
      </section>

      <!-- PLANS -->
      <section>
        <div class="flex items-center justify-between mb-3">
          <h2 class="text-lg font-semibold">Available Plans</h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div
            v-for="plan in plans"
            :key="plan.id"
            class="rounded-2xl p-5 bg-white dark:bg-[#141417] border dark:border-[#1f1f23] shadow hover:shadow-lg hover:scale-[1.02] transition cursor-pointer"
          >
            <p class="text-xl font-semibold">{{ plan.name }}</p>
            <p class="text-3xl font-bold mt-1">₦{{ format(plan.price) }}</p>
            <p class="text-xs text-gray-500 dark:text-gray-400">
              {{ plan.duration }}
            </p>

            <ul class="mt-4 text-sm space-y-1">
              <li>• {{ plan.speed }} speed</li>
              <li>• {{ plan.desc }}</li>
            </ul>

            <button
              @click="openPurchase(plan)"
              class="mt-5 w-full py-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700"
            >
              Subscribe
            </button>
          </div>
        </div>
      </section>

      <!-- TRANSACTIONS -->
      <section>
        <h2 class="text-lg font-semibold mb-3">Recent Transactions</h2>

        <div
          v-if="transactions.length === 0"
          class="text-sm text-gray-500 dark:text-gray-400"
        >
          No transactions yet.
        </div>

        <div class="space-y-3">
          <div
            v-for="tx in transactions"
            :key="tx.id"
            class="rounded-xl p-4 bg-white dark:bg-[#141417] border dark:border-[#1f1f23] shadow"
          >
            <p class="font-semibold">{{ tx.title }}</p>
            <p class="text-xs text-gray-500 dark:text-gray-400">
              {{ tx.date }}
            </p>
            <p class="text-sm mt-1">{{ tx.amount }}</p>
          </div>
        </div>
      </section>
    </main>

    <!-- PURCHASE MODAL -->
    <transition name="fade">
      <div
        v-if="showPurchase"
        class="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      >
        <div
          class="bg-white dark:bg-[#141417] rounded-2xl p-6 w-11/12 max-w-md shadow-xl border dark:border-[#1f1f23]"
        >
          <h2 class="text-lg font-semibold">
            Purchase: {{ tempPlan?.name }}
          </h2>
          <p class="text-sm text-gray-500 dark:text-gray-400">
            ₦{{ format(tempPlan?.price) }} • {{ tempPlan?.duration }}
          </p>

          <div class="mt-6 flex justify-end gap-2">
            <button @click="closePurchase" class="px-4 py-2 rounded-xl border">
              Cancel
            </button>
            <button
              @click="confirmPurchase"
              class="px-4 py-2 bg-blue-600 text-white rounded-xl shadow"
            >
              Pay Now
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const isDark = ref(false);
const toggleDark = () => {
  isDark.value = !isDark.value;
  document.documentElement.classList.toggle("dark", isDark.value);
};

const user = ref({
  name: "Emmanuel",
});

const avatar = computed(() => user.value.name[0]);

const activePlan = ref({
  name: "Business Plan",
  expires: "28 Feb 2025",
  status: "Active",
});

const wifiPassword = ref("EMNET-12345");
const copied = ref(false);

function copyPassword() {
  navigator.clipboard.writeText(wifiPassword.value);
  copied.value = true;
  setTimeout(() => (copied.value = false), 1500);
}

function logout() {
  alert("Logout triggered.");
}

const plans = ref([
  {
    id: 1,
    name: "Starter",
    price: 2500,
    duration: "30 days",
    desc: "Light browsing",
    speed: "5 Mbps",
  },
  {
    id: 2,
    name: "Business",
    price: 4000,
    duration: "30 days",
    desc: "For POS & shops",
    speed: "25 Mbps",
  },
  {
    id: 3,
    name: "Pro",
    price: 9000,
    duration: "30 days",
    desc: "High speed roaming",
    speed: "100 Mbps",
  },
]);

const transactions = ref([]);

const showPurchase = ref(false);
const tempPlan = ref(null);

function openPurchase(plan) {
  tempPlan.value = plan;
  showPurchase.value = true;
}

function closePurchase() {
  showPurchase.value = false;
}

function confirmPurchase() {
  transactions.value.unshift({
    id: Date.now(),
    title: `Subscribed to ${tempPlan.value.name}`,
    amount: `₦${format(tempPlan.value.price)}`,
    date: new Date().toLocaleString(),
  });

  alert("Purchase simulated!");

  closePurchase();
}

function format(n) {
  return Number(n).toLocaleString();
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
