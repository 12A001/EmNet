 <!-- FOR FINAL BOOING THEN REDIRECT TO PAYMENTPAGE.    FROM BOOKINGPAGE.VUE  TO  AVAILABLEFLIGHTS.VUE TO HERE .-->


<template>
  <section class="min-h-screen bg-[#eef2ff] flex flex-col px-4 py-8 md:px-10">
    <!-- Header -->
    <div class="text-center mb-8">
      <h1 class="text-3xl md:text-4xl font-extrabold text-[#003366]">
        Finalize Your Booking
      </h1>
      <p class="text-gray-600 mt-2">
        Review your flight details and fill in passenger information
      </p>
    </div>

    <div class="max-w-4xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- Flight Summary -->
      <div class="bg-white p-6 rounded-2xl shadow border border-gray-200">
        <h2 class="text-xl font-semibold text-[#003366] mb-4">Flight Summary</h2>

        <div class="flex items-center gap-4 mb-4">
          <i class="lucide lucide-plane w-6 h-6 text-[#003366]"></i>
          <p class="font-medium">
            {{ flight.origin }} ({{ flight.originCode }}) → {{ flight.destination }} ({{ flight.destinationCode }})
          </p>
        </div>

        <div class="flex flex-col gap-2 text-gray-700 mb-4">
          <p>
            <i class="lucide lucide-calendar w-4 h-4 inline mr-2 text-[#003366]"></i>
            Departure: {{ flight.departDate }}
          </p>
          <p v-if="tripType === 'roundtrip'">
            <i class="lucide lucide-calendar w-4 h-4 inline mr-2 text-[#003366]"></i>
            Return: {{ flight.returnDate }}
          </p>
          <p>
            <i class="lucide lucide-users w-4 h-4 inline mr-2 text-[#003366]"></i>
            Passengers: {{ passengers.adults }} Adults, {{ passengers.children }} Children, {{ passengers.infants }} Infants
          </p>
          <p>
            <i class="lucide lucide-briefcase w-4 h-4 inline mr-2 text-[#003366]"></i>
            Class: {{ travelClass }}
          </p>
        </div>

        <div class="mt-4 pt-4 border-t flex justify-between items-center">
          <p class="text-lg font-semibold text-[#003366]">Total Price:</p>
          <p class="text-lg font-bold text-[#003366]">
            {{ flight.currency || 'NGN' }} {{ totalPrice.toLocaleString() }}
          </p>
        </div>
      </div>

      <!-- Passenger Details Form -->
      <div class="bg-white p-6 rounded-2xl shadow border border-gray-200">
        <h2 class="text-xl font-semibold text-[#003366] mb-4">Passenger Details</h2>
        <form @submit.prevent="submitBooking" class="flex flex-col gap-4">
          <div v-for="n in passengers.adults" :key="'adult-' + n">
            <label class="block text-gray-700 font-medium mb-1">Adult {{ n }} Name</label>
            <input
              v-model="passengerInfo.adults[n - 1]"
              type="text"
              placeholder="Full Name"
              class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003366] outline-none"
            />
          </div>

          <div v-for="n in passengers.children" :key="'child-' + n">
            <label class="block text-gray-700 font-medium mb-1">Child {{ n }} Name</label>
            <input
              v-model="passengerInfo.children[n - 1]"
              type="text"
              placeholder="Full Name"
              class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003366] outline-none"
            />
          </div>

          <div v-for="n in passengers.infants" :key="'infant-' + n">
            <label class="block text-gray-700 font-medium mb-1">Infant {{ n }} Name</label>
            <input
              v-model="passengerInfo.infants[n - 1]"
              type="text"
              placeholder="Full Name"
              class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003366] outline-none"
            />
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="mt-4 bg-[#003366] text-white font-semibold px-6 py-3 rounded-full hover:bg-[#001d3d] transition flex items-center justify-center gap-2"
          >
            <span v-if="loading">Booking...</span>
            <span v-else>Confirm & Book</span>
          </button>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// Flight & passenger info
const flight = route.state?.flight || {}
const passengers = route.state?.passengers || { adults: 1, children: 0, infants: 0 }
const tripType = route.state?.tripType || 'oneway'
const travelClass = route.state?.travelClass || 'Economy'

// Form binding
const passengerInfo = ref({
  adults: Array(passengers.adults).fill(''),
  children: Array(passengers.children).fill(''),
  infants: Array(passengers.infants).fill(''),
})

// Total price
const totalPrice = flight.price * (passengers.adults + passengers.children + passengers.infants)

// Loading state
const loading = ref(false)

// Submit booking
async function submitBooking() {
  const allNamesFilled = [
    ...passengerInfo.value.adults,
    ...passengerInfo.value.children,
    ...passengerInfo.value.infants,
  ].every(name => name.trim() !== '')

  if (!allNamesFilled) {
    alert('Please enter all passenger names before proceeding.')
    return
  }

  loading.value = true

  try {
    const res = await fetch('/api/book-flight', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        flight,
        passengers: passengerInfo.value,
        tripType,
        travelClass,
        totalPrice,
      }),
    })

    const data = await res.json()

    if (!data.success) throw new Error(data.message || 'Booking failed')

    // Redirect to Travelpayouts payment page
    window.location.href = data.booking.paymentUrl
  } catch (err) {
    console.error(err)
    alert('Booking failed: ' + err.message)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
section {
  background-image: linear-gradient(to bottom right, #eef2ff, #ffffff);
}
button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
</style>
