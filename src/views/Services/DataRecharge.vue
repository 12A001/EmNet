

<!-- WILL BE REPLACED WITH CURRENT BOOKINGPAGE.VUE    WHEN REAL FLIGJTS IS READY -->




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
            <ul v-if="originSuggestions.length" class="absolute z-50 w-full bg-white border mt-1 rounded shadow max-h-40 overflow-auto">
              <li
                v-for="(item, i) in originSuggestions"
                :key="i"
                @click="selectOrigin(item)"
                class="p-2 hover:bg-[#003366]/10 cursor-pointer"
              >
                {{ item.display }}
              </li>
            </ul>
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
            <ul v-if="destinationSuggestions.length" class="absolute z-50 w-full bg-white border mt-1 rounded shadow max-h-40 overflow-auto">
              <li
                v-for="(item, i) in destinationSuggestions"
                :key="i"
                @click="selectDestination(item)"
                class="p-2 hover:bg-[#003366]/10 cursor-pointer"
              >
                {{ item.display }}
              </li>
            </ul>
          </div>

          <!-- Departure Date -->
          <div>
            <label class="text-sm font-semibold text-gray-600 flex items-center gap-2 mb-2">
              <i class="lucide lucide-calendar w-4 h-4 text-[#003366]"></i>
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

          <!-- Passenger Details -->
          <div class="md:col-span-2">
            <label class="text-sm font-semibold text-gray-600 flex items-center gap-2 mb-4">
              <i class="lucide lucide-users w-4 h-4 text-[#003366]"></i>
              Passengers
            </label>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div
                v-for="(type, key) in passengerTypes"
                :key="key"
                class="flex items-center justify-between border border-gray-300 rounded-lg p-3"
              >
                <div>
                  <p class="font-semibold text-gray-700">{{ type.label }}</p>
                  <p class="text-xs text-gray-500">{{ type.desc }}</p>
                </div>
                <div class="flex items-center gap-3">
                  <button
                    @click="decreasePassengers(key)"
                    class="w-7 h-7 bg-gray-200 text-[#003366] font-bold rounded-full hover:bg-gray-300 flex items-center justify-center"
                  >
                    −
                  </button>
                  <span class="font-semibold text-lg">{{ form[key] }}</span>
                  <button
                    @click="increasePassengers(key)"
                    class="w-7 h-7 bg-gray-200 text-[#003366] font-bold rounded-full hover:bg-gray-300 flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Class -->
          <div>
            <label class="text-sm font-semibold text-gray-600 flex items-center gap-2 mb-2">
              <i class="lucide lucide-briefcase w-4 h-4 text-[#003366]"></i>
              Class
            </label>
            <select
              v-model="form.travelClass"
              class="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#003366] outline-none"
            >
              <option>Economy</option>
              <option>Premium Economy</option>
              <option>Business</option>
              <option>First</option>
            </select>
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
            class="mt-6 inline-flex px-10 py-3 bg-[#003366] text-white font-semibold rounded-full shadow hover:bg-[#001d3d] transition items-center gap-2 justify-center"
          >
            Search Flights
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { searchFlights } from '@/api/flights'

// Sample airport dataset
const airports = [
  { city: 'London', name: 'Heathrow', code: 'LHR' },
  { city: 'London', name: 'Gatwick', code: 'LGW' },
  { city: 'Lagos', name: 'Murtala Muhammed', code: 'LOS' },
  { city: 'Abuja', name: 'Nnamdi Azikiwe', code: 'ABV' },
  // add more as needed
]

const router = useRouter()

const form = ref({
  origin: '',
  destination: '',
  departDate: '',
  returnDate: '',
  tripType: 'oneway',
  currency: 'NGN',
  adults: 1,
  children: 0,
  infants: 0,
  originCode: '',
  destinationCode: ''
})

// Passenger types
const passengerTypes = {
  adults: { label: 'Adults', desc: 'Ages 12+' },
  children: { label: 'Children', desc: 'Ages 2–11' },
  infants: { label: 'Infants', desc: 'Under 2' },
}

// Auto-suggestions
const originSuggestions = ref([])
const destinationSuggestions = ref([])

watch(() => form.value.origin, val => {
  originSuggestions.value = airports
    .filter(a => a.city.toLowerCase().includes(val.toLowerCase()) || a.code.toLowerCase().includes(val.toLowerCase()))
    .map(a => ({ display: `${a.city} - ${a.name} (${a.code})`, code: a.code }))
})

watch(() => form.value.destination, val => {
  destinationSuggestions.value = airports
    .filter(a => a.city.toLowerCase().includes(val.toLowerCase()) || a.code.toLowerCase().includes(val.toLowerCase()))
    .map(a => ({ display: `${a.city} - ${a.name} (${a.code})`, code: a.code }))
})

const selectOrigin = (item) => {
  form.value.origin = item.display
  form.value.originCode = item.code
  originSuggestions.value = []
}

const selectDestination = (item) => {
  form.value.destination = item.display
  form.value.destinationCode = item.code
  destinationSuggestions.value = []
}

// Increase/decrease functions
function increasePassengers(type) {
  form.value[type]++
}

function decreasePassengers(type) {
  if (type === 'adults' && form.value.adults === 1) return
  if (form.value[type] > 0) form.value[type]--
}

// Search flights
async function handleSearch() {
  try {
    const payload = {
      ...form.value,
      origin: form.value.originCode,
      destination: form.value.destinationCode
    }
    const flights = await searchFlights(payload)
    router.push({
      path: '/flights',
      state: { flights },
    })
  } catch (err) {
    console.error('Flight search failed:', err.message)
    alert('Failed to load flights. Please try again later.')
  }
}
</script>

<style scoped>
section {
  background-image: linear-gradient(to bottom right, #eef2ff, #ffffff);
}
</style>


