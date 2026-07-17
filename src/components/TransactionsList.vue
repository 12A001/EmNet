<template>
  <div class="bg-white rounded-2xl shadow-md p-6">
    <h2 class="text-lg font-semibold mb-4">Recent Transactions</h2>

    <div v-if="loading" class="text-center text-gray-500 py-6">
      Fetching transactions...
    </div>

    <ul v-else class="divide-y divide-gray-100">
      <li
        v-for="(txn, index) in transactions"
        :key="index"
        class="py-3 flex justify-between items-center"
      >
        <div>
          <p class="font-semibold text-gray-700">{{ txn.description || txn.type }}</p>
          <p class="text-sm text-gray-500">{{ formatDate(txn.createdAt) }}</p>
        </div>
        <span
          :class="[
            'font-semibold px-2 py-1 rounded-lg',
            txn.status === 'success'
              ? 'bg-green-100 text-green-700'
              : 'bg-red-100 text-red-700'
          ]"
        >
          ₦{{ txn.amount.toLocaleString() }} ({{ txn.status }})
        </span>
      </li>
    </ul>
  </div>
</template>

<script setup>
defineProps({
  transactions: Array,
  loading: Boolean,
});

const formatDate = (date) => new Date(date).toLocaleString("en-NG");
</script>
