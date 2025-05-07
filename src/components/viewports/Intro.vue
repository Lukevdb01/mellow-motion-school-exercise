<script setup lang="ts">
import { onMounted, ref } from 'vue';
import {useRouter} from "vue-router";

const showRedBlock = ref(true);
const router = useRouter();
const counter = ref(10); // Initialize counter to 3 seconds

onMounted(() => {
  const interval = setInterval(() => {
    counter.value -= 1;
    if (counter.value <= 0) {
      clearInterval(interval);
      router.push('/game-container');
    }
  }, 1000);
});
</script>

<template>
  <section v-if="showRedBlock" class="h-screen w-screen overflow-hidden z-10">
    <div class="w-full h-full bg-red-500 flex items-center justify-center text-white text-6xl">
      {{ counter }}
    </div>
  </section>
</template>