<template>
  <section class="min-h-screen bg-[#dbeafe] text-gray-800 flex flex-col">
    <!-- Hero -->
    <div class="text-center py-16 px-6">
        <h1 class="text-4xl md:text-5xl font-extrabold mb-4">
        About <span class="text-[#003366]">EmNet</span>
      </h1>
      <p class="max-w-2xl mx-auto text-lg text-gray-600 leading-relaxed">
        Welcome to <span class="font-semibold text-[#003366]">EmNet</span> — your trusted source for
        <span class="text-[#1e40af] font-medium">cheap, fast, and long lasting data</span>.
        We believe staying connected shouldn’t break the bank, so we bring you affordable data plans that truly last.
      </p>
    </div>

    <!-- Mission -->
    <div class="flex-1 bg-white/70 rounded-t-3xl p-8 md:p-16 shadow-inner">
      <div class="max-w-5xl mx-auto space-y-10">
        <div>
          <h2 class="text-2xl font-bold text-[#003366] mb-3">Our Mission</h2>
          <p class="text-gray-700 leading-relaxed">
            At <span class="font-semibold">EmNet</span>, our mission is simple — to make internet access
            <span class="text-[#003366] font-semibold">affordable, reliable, and accessible</span> for everyone.
            Whether you’re a student, entrepreneur, or family user, we offer flexible data plans that fit your lifestyle.
          </p>
        </div>

        <div>
          <h2 class="text-2xl font-bold text-[#003366] mb-3">Why Choose EmNet?</h2>
          <ul class="list-disc list-inside text-gray-700 space-y-2">
            <li><span class="font-semibold text-[#003366]">Affordable Data:</span> Get more data for less.</li>
            <li><span class="font-semibold text-[#003366]">Long-Lasting Plans:</span> Enjoy extended validity with no hidden charges.</li>
            <li><span class="font-semibold text-[#003366]">Fast & Reliable:</span> Powered by top network providers in Nigeria.</li>
            <li><span class="font-semibold text-[#003366]">Instant Delivery:</span> Your data is activated immediately after payment.</li>
          </ul>
        </div>

        <div>
          <h2 class="text-2xl font-bold text-[#003366] mb-3">Our Vision</h2>
          <p class="text-gray-700 leading-relaxed">
            We envision a connected Nigeria where everyone can afford stable and high-speed data.
            <span class="text-[#1e40af] font-semibold">EmNet</span> is here to bridge the gap between cost and quality.
          </p>
        </div>
        <!-- Founder Card -->
<div
  class="mt-14 bg-gradient-to-br from-[#003366] to-[#0f4c81] rounded-3xl shadow-xl overflow-hidden"
>
  <div class="flex flex-col lg:flex-row items-center gap-8 p-8 md:p-12">

    <!-- Photo -->
<div class="flex-shrink-0">
  <img
    :src="emmanuelImage"
    alt="Emmanuel"
    class="w-44 h-44 rounded-full object-cover border-4 border-white shadow-2xl"
  />
</div>

    <!-- Details -->
    <div class="flex-1 text-center lg:text-left text-white">

      <span class="inline-block bg-white/20 px-4 py-1 rounded-full text-sm font-medium mb-3">
        Founder & Lead Software Engineer
      </span>

      <h2 class="text-2xl font-bold">
        Emmanuel Chidiebere Iheanyi
      </h2>

      <p class="mt-5 text-blue-100 leading-relaxed max-w-3xl">
        Emmanuel is a full-stack software engineer and entrepreneur passionate
        about building technology that solves real-world problems.
        He founded <strong>EmNet</strong> as part of a broader vision to create
        innovative digital products that improve connectivity, simplify everyday
        services, and empower individuals and businesses across Africa.
      </p>

      <p class="mt-4 text-blue-200">
        Beyond EmNet, he is actively developing several technology products
        focused on networking, fintech, productivity, and digital innovation.
      </p>

      <!-- Social Links -->
<div class="flex justify-center lg:justify-start gap-4 mt-8">

  <!-- GitHub -->
  <a
    href="https://github.com/12A001"
    target="_blank"
    rel="noopener noreferrer"
    class="w-11 h-11 rounded-full bg-white text-[#003366] flex items-center justify-center hover:scale-110 transition"
  >
    <Icon icon="mdi:github" class="w-6 h-6" />
  </a>

  <!-- TikTok -->
  <a
    href="https://www.tiktok.com/@manlikeemma001"
    target="_blank"
    rel="noopener noreferrer"
    class="w-11 h-11 rounded-full bg-white text-[#003366] flex items-center justify-center hover:scale-110 transition"
  >
    <Icon icon="ic:baseline-tiktok" class="w-6 h-6" />
  </a>

  <!-- WhatsApp -->
  <a
    href="https://wa.me/447468651524"
    target="_blank"
    rel="noopener noreferrer"
    class="w-11 h-11 rounded-full bg-white text-[#003366] flex items-center justify-center hover:scale-110 transition"
  >
    <Icon icon="mdi:whatsapp" class="w-6 h-6" />
  </a>

</div>

    </div>

  </div>
</div>

        <!-- Call to Action -->
        <div class="text-center mt-12">
          <router-link
            to="/"
            class="inline-block px-6 py-3 bg-[#003366] text-white font-semibold rounded-full shadow hover:bg-[#001d3d] transition"
          >
            Explore Our Data Plans
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Icon } from "@iconify/vue";

import emmanuelImage from "@/assets/images/emmanuel.jpeg";

</script>

<style scoped>
section {
  background-image: linear-gradient(to bottom right, #dbeafe, #ffffff);
}
</style>
