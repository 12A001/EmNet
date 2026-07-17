<template>
  <header
    class="flex flex-col sm:h-35 sm:flex-row sm:items-center sm:justify-between mb-6 bg-gradient-to-r from-blue-400 to-cyan-300 rounded-2xl shadow-md  px-6 py-4"
  >
    <div>
      <h1 class="text-xl sm:text-2xl font-bold text-gray-800">
         Welcome back,
        <span v-if="user && user.name">{{ user.name }}</span>
        <span v-else>Loading...</span>
      </h1>

      <p class="text-gray-500 text-sm mt-1">
        {{ currentDate }}
      </p>
    </div>

    <img
      src="@/assets/images/emnet-logo.jpg"
      alt="EmNet Logo"
      class="w-12 h-12 sm:w-14 sm:h-14 rounded-full mt-3 sm:mt-0 object-cover"
    />
  </header>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import api from "@/config/api";

// reactive data
const user = ref(null);
const currentDate = ref("");


onMounted(async () => {
  // current date
  const date = new Date();
  currentDate.value = date.toLocaleDateString("en-NG", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // fetch current user
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.warn("No token found. Redirect to login if needed.");
      return;
    }

    const res = await axios.get(`${api.BACKEND}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    // backend returns user directly, so assign res.data
    user.value = res.data;

    // optionally persist to localStorage for other components
    localStorage.setItem("user", JSON.stringify(res.data));
  } catch (err) {
    console.error("Error fetching current user:", err);
  }
});
</script>
