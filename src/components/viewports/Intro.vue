  <script setup lang="ts">
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import EyelidBlink from "@/components/EyelidBlink.vue";
import { useHead } from '@vueuse/head';
  import EyelidClose from "@/components/viewports/EyelidClose.vue";
  const router = useRouter();

  const fadeOut = ref(false); // Control fade-out
  const hideContent = ref(false); // Hides content after fade
  const showBlink = ref(false);
  const phoneScene = ref(false);

  useHead({
  title: 'Mellow Motion - zelfbeeld',
  meta: [
    {
      name: 'description',
      content: 'Een interactieve 3D ervaring over zelfzorg en mentale gezondheid. Ontdek hoe social media je zelfbeeld beïnvloedt en reflecteer in de spiegel van je eigen gedachten.',
    },
    {
      name: 'keywords',
      content: 'zelfzorg, mellow motion, storytelling game, mentale gezondheid, social media, zelfbeeld, jongeren, interactief, MIND MIRROR',
    },
    {
      name: 'author',
      content: 'Mellow Motion',
    },
    {
      property: 'og:title',
      content: 'Mellow Motion – Zelfzorg',
    },
    {
      property: 'og:description',
      content: 'Beleef een introspectieve reis over mentale gezondheid, beïnvloed door social media. Kies, voel en reflecteer.',
    },
    {
      property: 'og:image',
      content: 'https://static.lukevdbroek.nl/public/asset.php?file=thumbnail.png',
    },
    {
      property: 'og:url',
      content: 'https://sint-lucas.github.io/sd3-p12-md-project-2425-mellow-motion/',
    },
    {
      name: 'twitter:card',
      content: 'summary_large_image',
    },
  ],
  link: [
    {
      rel: 'canonical',
      href: 'https://sint-lucas.github.io/sd3-p12-md-project-2425-mellow-motion/',
    },
  ],
});

  const start = () => {
    fadeOut.value = true;
    setTimeout(() => {
      hideContent.value = true; // Completely hide after fade
      showBlink.value = true;
    }, 500);
  };

  const startPhoneScene = () => {
    goToGameContainer()
      showBlink.value = false;
  };

  const goToGameContainer = () => {
    router.push({ name: 'game-container' });
  };
  </script>

  <template>
    <section class="relative h-screen w-screen flex justify-center items-center bg-img text-white text-6xl">
      <img src="/images/overlay.png" alt="Background" class="absolute inset-0 w-full h-full object-cover">
      <div v-if="!hideContent" :class="['flex w-full h-full justify-between px-8 py-12 transition-opacity duration-500', fadeOut ? 'opacity-0' : 'opacity-100']">
        <div class="flex flex-col justify-between h-full">
          <div class="flex items-end gap-6 absolute top-0 left-0 p-8">
            <img src="/images/logo.png" alt="Logo" class="w-32 h-auto">              
          </div>
          <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-black text-start">
            <h1 class="text-6xl font-papercut text-[#1b4994] mb-4">Mellow Motion</h1>
            <p class="text-2xl mb-8 font-papercut text-[#EF3A25]">Een interactieve 3D ervaring over zelfzorg en mentale gezondheid.</p>
            <div class="w-full flex justify-center">
              <button @click="start" class="cursor-pointer bg-white absolute text-black px-8 py-4 rounded-lg shadow-lg hover:bg-gray-200 transition-colors duration-300">
                Start
              </button>

            </div>
            </div>
        </div>
      </div>
      <EyelidClose v-model="showBlink" @blinkFinished="startPhoneScene"/>
    </section>
  </template>

  <style scoped>
  .bg-img {
    background-image: url('/images/background.png');
    background-size: cover;
    background-position: center;
  }
  </style>