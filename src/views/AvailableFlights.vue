
<!-- WILL FETCH AND SHOW AVAILABLE FLIGHTS  /  FROM  B0OOKINGPAGE TO HERE -->



<template>
  <section class="min-h-screen bg-[#f0f6ff] py-10 px-6">
    <!-- Header -->
    <div class="text-center mb-10">
      <h1 class="text-3xl md:text-4xl font-extrabold text-[#003366]">
        Available Flights
      </h1>
      <p class="text-gray-600 mt-2">
        Choose a flight that fits your schedule and budget
      </p>
    </div>

    <!-- Flight Results -->
    <div class="max-w-6xl mx-auto">
      <div v-if="flights.length" class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div
          v-for="(flight, i) in flights"
          :key="i"
          class="bg-white rounded-2xl shadow p-6 hover:shadow-lg transition border border-gray-200"
        >
          <!-- Airline and Route -->
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div class="flex items-center gap-4">
              <div
                class="w-12 h-12 flex items-center justify-center bg-[#003366]/10 text-[#003366] rounded-full"
              >
                <i class="lucide lucide-plane w-5 h-5"></i>
              </div>
              <div>
                <h2 class="text-lg font-semibold text-[#003366]">
                  {{ flight.airline || "Unknown Airline" }}
                </h2>
                <p class="text-gray-500 text-sm">
                  {{ flight.origin }} → {{ flight.destination }}
                </p>
              </div>
            </div>

            <!-- Flight Info -->
            <div class="flex flex-col sm:flex-row gap-6 text-gray-700 mt-3 md:mt-0">
              <div class="flex items-center gap-2">
                <i class="lucide lucide-clock w-4 h-4 text-[#003366]"></i>
                <span class="text-sm">{{ flight.time || "N/A" }}</span>
              </div>
              <div class="flex items-center gap-2">
                <i class="lucide lucide-calendar w-4 h-4 text-[#003366]"></i>
                <span class="text-sm">{{ flight.date || "—" }}</span>
              </div>
              <div class="flex items-center gap-2">
                <i class="lucide lucide-users w-4 h-4 text-[#003366]"></i>
                <span class="text-sm">{{ flight.seats || "—" }} Seats</span>
              </div>
            </div>
          </div>

          <!-- Price & Book Button -->
          <div
            class="flex flex-col sm:flex-row items-center justify-between mt-6 border-t pt-4"
          >
            <p class="text-lg font-semibold text-[#003366]">
              {{ flight.currency || "NGN" }}
              {{ Number(flight.price || 0).toLocaleString() }}
            </p>
            <button
              @click="goToFinalBooking(flight)"
              class="mt-3 sm:mt-0 inline-block bg-[#003366] text-white px-6 py-2 rounded-full font-medium hover:bg-[#001d3d] transition"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center text-gray-500 py-20">
        <i class="lucide lucide-plane text-5xl text-gray-400 mb-4"></i>
        <p class="text-lg font-medium">No flights found.</p>
        <p class="text-sm mt-1 text-gray-400">
          Try adjusting your search details.
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

// Flights data + search form info passed from BookingPage.vue
const flights = route.state?.flights || [];
const searchData = route.state?.searchData || {};

/**
 * Redirect user to final booking page with selected flight + passengers info
 */
function goToFinalBooking(flight) {
  router.push({
    path: "/final-booking",
    state: {
      flight: {
        ...flight,
        originCode: searchData.originCode,
        destinationCode: searchData.destinationCode,
      },
      passengers: {
        adults: searchData.adults,
        children: searchData.children,
        infants: searchData.infants,
      },
      tripType: searchData.tripType,
      travelClass: searchData.travelClass,
      departDate: searchData.departDate,
      returnDate: searchData.returnDate,
      currency: searchData.currency,
    },
  });
}
</script>

<style scoped>
section {
  background-image: linear-gradient(to bottom right, #f0f6ff, #ffffff);
}
</style>
