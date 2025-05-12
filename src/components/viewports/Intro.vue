  <script setup lang="ts">
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';

  const fadeOut = ref(false); // Control fade-out
  const hideContent = ref(false); // Hides content after fade

  const start = () => {
    fadeOut.value = true;
    setTimeout(() => {
      hideContent.value = true; // Completely hide after fade
    }, 500);
  };
  </script>

  <template>
    <section class="h-screen w-screen flex justify-center items-center bg-amber-100 text-white text-6xl">
      <div v-if="!hideContent" :class="['flex w-full h-full justify-between p-16 transition-opacity duration-500', fadeOut ? 'opacity-0' : 'opacity-100']">
        <div class="flex flex-col justify-between h-full">
          <img src="/image/memo%20logo%20zwart.png" alt="Logo" class="w-40">
          <div class="flex items-end gap-12">
            <button class="font-bold px-12 py-10 bg-blue-600 text-white rounded hover:bg-blue-700 text-5xl cursor-pointer">
              CREDITS
            </button>
            <button
                @click="start"
                class="font-bold px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 text-5xl cursor-pointer"
            >
              START
            </button>
          </div>
        </div>
        <div>
          <img src="" alt="3dlogo">
        </div>
      </div>
      <div v-if="hideContent" class="h-full w-full bg-amber-400">

      </div>
    </section>
  </template>