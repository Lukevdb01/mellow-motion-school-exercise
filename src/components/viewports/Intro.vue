  <script setup lang="ts">
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import EyelidBlink from "@/components/EyelidBlink.vue";

  const fadeOut = ref(false); // Control fade-out
  const hideContent = ref(false); // Hides content after fade
  const showBlink = ref(false);
  const phoneScene = ref(false);

  const start = () => {
    fadeOut.value = true;
    setTimeout(() => {
      hideContent.value = true; // Completely hide after fade
      showBlink.value = true;
    }, 500);
  };

  const startPhoneScene = () => {
      phoneScene.value = true;
      showBlink.value = false;
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
      <div v-if="phoneScene" class="flex flex-col items-center justify-center gap-4">
        <div class="bg-gray-800 rounded h-96 w-56 cursor-pointer">

        </div>
      </div>
    </section>
  </template>
