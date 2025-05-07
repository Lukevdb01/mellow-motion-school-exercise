<script setup lang="ts">
import { onMounted, ref } from 'vue';
import {useRouter} from "vue-router";

const showRedBlock = ref(true);
const router = useRouter();

onMounted(() => {
  setTimeout(() => {
    router.push('/game-container');
  }, 5000); // 10 seconds
});
</script>

<template>
  <section v-if="showRedBlock" class="h-screen w-screen overflow-hidden z-10">
    <div class="w-full h-full bg-red-500"></div>
  </section>
</template>