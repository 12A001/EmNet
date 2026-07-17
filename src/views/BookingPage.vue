<template>
  <section class="min-h-screen bg-[#eef2ff] text-gray-800 flex flex-col">
    <!-- Hero -->
    <div class="text-center py-16 px-6 bg-[#003366] text-white">
      <h1 class="text-4xl md:text-5xl font-extrabold mb-4">
        Book Your <span class="text-[#60a5fa]">Flight</span> with EmNet
      </h1>
      <p class="max-w-2xl mx-auto text-lg text-gray-200 leading-relaxed">
        Find, compare, and book affordable flights easily. Travel smart with EmNet — your trusted
        partner for safe and seamless bookings.
      </p>
    </div>

    <!-- Booking Form -->
    <div class="flex-1 bg-white/90 rounded-t-3xl -mt-10 p-6 md:p-12 shadow-lg">
      <div class="max-w-5xl mx-auto">
        <div class="bg-white rounded-2xl shadow-xl p-6 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- From -->
          <div class="relative">
            <label class="text-sm font-semibold text-gray-600 flex items-center gap-2 mb-2">
              <i class="lucide lucide-map-pin w-4 h-4 text-[#003366]"></i> From
            </label>
            <input
              v-model="form.origin"
              placeholder="City or airport"
              class="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#003366] outline-none"
            />
          </div>

          <!-- To -->
          <div class="relative">
            <label class="text-sm font-semibold text-gray-600 flex items-center gap-2 mb-2">
              <i class="lucide lucide-map-pin w-4 h-4 text-[#003366] rotate-180"></i>
              To
            </label>
            <input
              v-model="form.destination"
              placeholder="City or airport"
              class="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#003366] outline-none"
            />
          </div>

          <!-- Departure Date -->
          <div>
            <label class="text-sm font-semibold text-gray-600 flex items-center gap-2 mb-2">
              <i class="lucide lucide-calendar w-4 h-4  text-[#003366]"></i>
              Departure Date
            </label>
            <input
              type="date"
              v-model="form.departDate"
              class="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#003366] outline-none"
            />
          </div>

          <!-- Return Date -->
          <div v-if="form.tripType === 'roundtrip'">
            <label class="text-sm font-semibold text-gray-600 flex items-center gap-2 mb-2">
              <i class="lucide lucide-calendar w-4 h-4 text-[#003366]"></i>
              Return Date
            </label>
            <input
              type="date"
              v-model="form.returnDate"
              class="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#003366] outline-none"
            />
          </div>

          <!-- Trip Type -->
          <div class="md:col-span-2 flex gap-6 items-center mt-2">
            <label class="flex items-center gap-2 text-sm font-medium">
              <input type="radio" value="oneway" v-model="form.tripType" />
              One Way
            </label>
            <label class="flex items-center gap-2 text-sm font-medium">
              <input type="radio" value="roundtrip" v-model="form.tripType" />
              Round Trip
            </label>
          </div>

          <!-- Search Button -->
          <button
            @click="handleSearch"
            class="mt-6 inline-flex px-10 py-3 cursor-pointer bg-[#003366] text-white font-semibold rounded-full shadow hover:bg-[#001d3d] transition items-center gap-2 justify-center"
          >
            Search Flights
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = ref({
  origin: '',
  destination: '',
  departDate: '',
  returnDate: '',
  tripType: 'oneway',
})

// Redirect to Coming Soon page
function handleSearch() {
  router.push({ path: '/flights-coming-soon' })
}
</script>

<style scoped>
section {
  background-image: linear-gradient(to bottom right, #eef2ff, #ffffff);
}
</style>
