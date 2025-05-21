<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps({
  modelValue: Boolean,
  backgroundColor: {
    type: String,
    default: 'bg-amber-100',
  },
})

const emit = defineEmits(['update:modelValue', 'blink-finished']);

const visible = ref(false);

watch(
    () => props.modelValue,
    (val) => {
      if (val) {
        visible.value = true;
        setTimeout(() => {
          emit('blink-finished');
          emit('update:modelValue', false);
          visible.value = false;
        }, 3000); // animation duration
      }
    }
);
</script>

<template>
  <div v-if="visible" class="w-full h-full bg-black"/>
  <div v-if="visible" class="eyelid-overlay" :class="backgroundColor"/>
</template>

<style scoped>
.eyelid-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  pointer-events: none;
  animation: eye-blink 3s ease-in-out forwards;
  clip-path: ellipse(100% 100% at 50% 50%);
}

/* Animate the eye closing to a horizontal slit and opening again */
@keyframes eye-blink {
  0% {
    clip-path: ellipse(100% 100% at 50% 50%);
  }
  25% {
    clip-path: ellipse(100% 0% at 50% 50%);
  }
  75% {
    clip-path: ellipse(100% 0% at 50% 50%);
  }
  100% {
    clip-path: ellipse(100% 100% at 50% 50%);
  }
}
</style>
