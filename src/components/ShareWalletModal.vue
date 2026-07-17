<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4"
  >
    <div class="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 relative">
      <h2 class="text-xl font-bold mb-4 text-gray-800"><img src="" alt=""> Send Money</h2>

      <form @submit.prevent="sendMoney" class="space-y-4">
        <div>
          <label class="text-sm text-gray-600">Recipient Phone Number</label>
          <input
            v-model="phone"
            type="text"
            placeholder="e.g. 08012345678"
            class="border rounded-lg w-full p-3 mt-1 focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div>
          <label class="text-sm text-gray-600">Amount (₦)</label>
          <input
            v-model.number="amount"
            type="number"
            placeholder="Enter amount"
            class="border rounded-lg w-full p-3 mt-1 focus:ring-2 focus:ring-blue-400"
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
            class="px-5 py-2 rounded-lg bg-blue-800 cursor-pointer hover:hover:bg-gradient-to-r from-blue-400 to-cyan-300 text-white"
            :disabled="loading"
          >
            {{ loading ? "Sending..." : "Send" }}
          </button>
        </div>
      </form>

      <p v-if="message" class="mt-3 text-sm text-green-600">{{ message }}</p>
      <p v-if="error" class="mt-3 text-sm text-red-600">{{ error }}</p>
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

const emit = defineEmits(["close", "share"]);

const phone = ref("");
const amount = ref("");
const message = ref("");
const error = ref("");
const loading = ref(false);

async function sendMoney() {
  message.value = "";
  error.value = "";

  if (!phone.value || !amount.value) {
    error.value = "Please enter recipient phone and amount";
    return;
  }

  loading.value = true;

  try {
    const res = await axios.post(`${api.BACKEND}/wallet/share`, {
      from: props.user?._id,
      to: phone.value,
      amount: amount.value,
    });

    if (res.data.success) {
      message.value = "Money sent successfully!";
      phone.value = "";
      amount.value = "";
      emit("share", res.data);
      setTimeout(() => emit("close"), 1500);
    } else {
      error.value = res.data.message || "Failed to send money.";
    }
  } catch (err) {
    console.error("Send money failed:", err);
    error.value = err.response?.data?.message || "Something went wrong.";
  } finally {
    loading.value = false;
  }
}
</script>
