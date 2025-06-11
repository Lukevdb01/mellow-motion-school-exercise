  <script setup lang="ts">
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import EyelidBlink from "@/components/EyelidBlink.vue";
import { useHead } from '@vueuse/head';
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
    <section class="h-screen w-screen flex justify-center items-center bg-amber-100 text-white text-6xl">
      <div v-if="!hideContent" :class="['flex w-full h-full justify-between px-8 py-12 transition-opacity duration-500', fadeOut ? 'opacity-0' : 'opacity-100']">
        <div class="flex flex-col justify-between h-full">
          <img src="/image/Titel.svg" alt="Logo" class="w-72 rotate-350">
          <div class="flex items-end gap-6">
            <p class="font-bold text-lg w-96 text-black">
              Mellow Motion wilt in dit project aandacht richten op hoe schoonheidisdealen invloed hebben op de mentale gezondheid van jongeren. Wij nemen jullie mee in het leven van een leeftijdsgenoot die in contact komt met de digitale wereld. Jouw keuzes beinvloeden het verloop van dit verhaal en de mentale staat van ons hoofdpersonage. Klik om door het verhaal heen te gaan!
            </p>
              <img @click="start" src="/image/Start%20button%202.svg" alt="" class="cursor-pointer w-96">
          </div>
        </div>
        <div>
          <img src="" alt="3dlogo">
        </div>
      </div>
      <EyelidBlink v-model="showBlink" @blinkFinished="startPhoneScene"/>
    </section>
  </template>
