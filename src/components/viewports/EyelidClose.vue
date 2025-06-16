<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps({
  modelValue: Boolean,
  backgroundColor: {
    type: String,
    default: 'bg-black',
  },
});

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
        }, 2500); // 1.5s animation + 1s stay-closed delay
      }
    }
);
</script>

<template>
  <div v-if="visible" class="eyelid-container">
    <div class="eyelid upper-eyelid" :class="backgroundColor"></div>
    <div class="eyelid lower-eyelid" :class="backgroundColor"></div>
  </div>
</template>

<style scoped>
.eyelid-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
  pointer-events: none;
  overflow: hidden;
}

.eyelid {
  position: absolute;
  width: 100%;
  left: 0;
  right: 0;
}

.upper-eyelid {
  height: 50vh;
  top: 0;
  animation: upper-eyelid-close 1.5s ease-in forwards;
}

.lower-eyelid {
  height: 50vh;
  bottom: 0;
  animation: lower-eyelid-close 1.5s ease-in forwards;
}

@keyframes upper-eyelid-close {
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(0%);
  }
}

@keyframes lower-eyelid-close {
  0% {
    transform: translateY(100%);
  }
  100% {
    transform: translateY(0%);
  }
}
</style>
