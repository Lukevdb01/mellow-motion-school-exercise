<script setup lang="ts">
import { ref } from 'vue';

const toggleDialog = ref(false);
</script>

<template>

  <div>
    <div v-if="toggleDialog" class="bg-white max-w-[160px] p-4 rounded-[2vw] shadow-lg max-w-md mx-auto text-center">
      <div class="text-lg">
        <slot></slot>
      </div>
    </div>
    <div @click="toggleDialog = !toggleDialog" class="rounded-full bg-white my-4 h-[44px] w-[44px] flex items-center justify-center">
      <img src="/images/question.svg" alt="Question Icon" class="w-8 h-8 mx-auto" />
    </div>
  </div>
</template>

<style scoped></style>