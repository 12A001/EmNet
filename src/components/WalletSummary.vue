<template>
  <div
    class="bg-[#003366] rounded-2xl shadow-md p-6 text-black mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between"
  >
    <div>
      <p class="text-sm uppercase tracking-wide text-white opacity-90">Wallet Balance</p>
      <h2 class="text-3xl text-white font-bold mt-1">₦{{ balance.toLocaleString() }}</h2>
    </div>

    <div class="mt-4 sm:mt-0 flex gap-3">
      <button
        @click="$emit('fundWallet')"
        class="bg-white text-[#003366] font-semibold px-5 py-2 cursor-pointer rounded-lg shadow hover:bg-pink-50 transition"
      >
        Fund Wallet
      </button>

      <button
        @click="$emit('shareWallet')"
        class="bg-blue-800 text-white font-semibold px-5 py-2 cursor-pointer rounded-lg shadow hover:bg-gradient-to-r from-blue-400 to-cyan-300"
      >
        Share
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  balance: {
    type: Number,
    required: true,
  },
});
</script>
