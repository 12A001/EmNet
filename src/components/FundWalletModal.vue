<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4"
  >
    <div class="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 relative">
      <h2 class="text-xl font-bold mb-4 text-gray-800"><img src="" alt="">Fund Wallet</h2>

      <form @submit.prevent="initiatePayment" class="space-y-4">
        <div>
          <label class="text-sm text-gray-600">Amount (₦)</label>
          <input
            v-model="amount"
            type="number"
            placeholder="Enter amount"
            class="border rounded-lg w-full p-3 mt-1 focus:ring-2 focus:ring-yellow-400"
            required
          />
        </div>

        <div class="flex justify-end space-x-2 mt-4">
          <button
            type="button"
            @click="$emit('close')"
            class="px-4 py-2 rounded-lg cursor-pointer bg-gray-200 hover:bg-gray-300 text-gray-700"
          >
            Cancel
          </button>

          <button
            type="submit"
            class="px-5 py-2 rounded-lg bg-blue-800 cursor-pointer hover:bg-gradient-to-r from-blue-400 to-cyan-300 text-white"
          >
            Fund
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import api from "@/config/api";

const props = defineProps({
  show: Boolean,
  user: Object,
});

const emit = defineEmits(["close", "funded"]);
const amount = ref("");


async function initiatePayment() {
  try {
    const response = await axios.post(`${api.BACKEND}/wallet/fund`, {
      userId: props.user?._id,
      amount: amount.value,
      paymentMethod: "flutterwave",
    });

    const link = response.data?.checkout_url || response.data?.link;
    if (link) {
      window.location.href = link; // Redirect to Flutterwave checkout
    } else {
      emit("funded", response.data);
      emit("close");
    }
  } catch (error) {
    console.error("Payment initiation failed:", error);
    alert("Payment initiation failed. Please try again.");
  }
}
</script>
