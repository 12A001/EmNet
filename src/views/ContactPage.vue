<template>
  <section class="min-h-screen bg-[#dbeafe] flex flex-col">
    <!-- HEADER -->
    <div class="text-center py-16 px-6">
      <h1 class="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900">
        Get in <span class="text-[#003366]">Touch</span>
      </h1>
      <p class="max-w-2xl mx-auto text-lg text-gray-700">
        Have a question or need support?
        Our team at <span class="text-[#003366] font-semibold">EmNet</span> is always happy to help.
        Reach out to us anytime!
      </p>
    </div>

    <!-- CONTACT CONTENT -->
    <div class="flex-1 bg-white/70 rounded-t-3xl shadow-inner p-8 md:p-16">
      <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">

        <!-- LEFT: FORM -->
        <div>
          <h2 class="text-2xl font-bold text-[#003366] mb-6">Send Us a Message</h2>
          <form @submit.prevent="submitForm" class="space-y-5">

            <div>
              <label class="block text-gray-700 font-medium mb-1">Full Name</label>
              <input
                v-model="name"
                type="text"
                placeholder="Enter your name"
                class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
                required
              />
            </div>

            <div>
              <label class="block text-gray-700 font-medium mb-1">Email Address</label>
              <input
                v-model="email"
                type="email"
                placeholder="you@example.com"
                class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
                required
              />
            </div>

            <div>
              <label class="block text-gray-700 font-medium mb-1">Message</label>
              <textarea
                v-model="message"
                rows="5"
                placeholder="Write your message..."
                class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none transition resize-none"
                required
              ></textarea>
            </div>

            <!-- BUTTON W/ LOADING -->
            <button
              type="submit"
              :disabled="loading"
              class="w-full py-3 bg-[#003366] text-white font-semibold rounded-lg cursor-pointer shadow disabled:opacity-60 disabled:cursor-not-allowed hover:bg-[#001d3d] transition-all duration-300 flex items-center justify-center gap-2"
            >
              <svg
                v-if="loading"
                class="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
              </svg>
              <span>{{ loading ? "Sending Message..." : "Send Message" }}</span>
            </button>
          </form>

          <!-- FEEDBACK MESSAGES -->
          <p v-if="successMessage" class="mt-4 text-green-600 font-medium bg-green-100 px-4 py-2 rounded-lg">
            {{ successMessage }}
          </p>

          <p v-if="errorMessage" class="mt-4 text-red-600 font-medium bg-red-100 px-4 py-2 rounded-lg">
            {{ errorMessage }}
          </p>
        </div>

        <!-- RIGHT: CONTACT INFO -->
        <div class="space-y-6">
          <h2 class="text-2xl font-bold text-[#003366] mb-4">Contact Information</h2>
          <p class="text-gray-700 leading-relaxed">
            You can reach us through any of the channels below.
            We typically respond within a few minutes.
          </p>

<div class="space-y-4">
  <!-- Phone -->
  <div class="flex items-center gap-3">
    <Phone class="text-[#003366]" />
    <div>
      <p class="text-gray-700">+234 903 3142 5919</p>
      <p class="text-gray-700">+44 7468 651524</p>
    </div>
  </div>

  <!-- WhatsApp -->
  <div class="flex items-center gap-3">
    <MessageCircle class="text-green-600" />
    <a
      href="https://wa.me/447468651524"
      target="_blank"
      rel="noopener noreferrer"
      class="text-green-600 hover:text-green-700 font-medium hover:underline"
    >
      Chat with us on WhatsApp
    </a>
  </div>

  <!-- Email -->
  <div class="flex items-center gap-3">
    <Mail class="text-[#003366]" />
    <p class="text-gray-700">emnetwisp@gmail.com</p>
  </div>

  <!-- Location -->
  <div class="flex items-center gap-3">
    <MapPin class="text-[#003366]" />
    <p class="text-gray-700">Lagos, Nigeria</p>
  </div>
</div>

          <div class="mt-10">
            <h3 class="text-lg font-semibold text-[#003366] mb-2">Follow Us</h3>
            <div class="flex justify-center items-center gap-6 text-[#003366]">
              <a href="#" class="hover:text-[#1e40af] transition">
                <Facebook class="w-6 h-6" />
              </a>
              <a href="#" class="hover:text-[#1e40af] transition">
                <X class="w-6 h-6" />
              </a>
              <a href="#" class="hover:text-[#1e40af] transition">
                <Instagram class="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  X,
  MessageCircle
} from "lucide-vue-next";
const name = ref("");
const email = ref("");
const message = ref("");
const successMessage = ref("");
const errorMessage = ref("");
const loading = ref(false);

const submitForm = async () => {
  successMessage.value = "";
  errorMessage.value = "";
  loading.value = true;

  try {
    const res = await fetch("http://localhost:5002/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name.value,
        email: email.value,
        message: message.value,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      successMessage.value = "Thank you! Your message has been sent.";
      name.value = "";
      email.value = "";
      message.value = "";
    } else {
      errorMessage.value = data.error || "Failed to send message.";
    }
  } catch (err) {
    console.error(err);
    errorMessage.value = "Server error. Try again later.";
  }

  loading.value = false;

  setTimeout(() => {
    successMessage.value = "";
    errorMessage.value = "";
  }, 4000);
};
</script>

<style scoped>
section {
  background-image: linear-gradient(to bottom right, #dbeafe, #ffffff);
}
</style>
