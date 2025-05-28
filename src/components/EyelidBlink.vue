<script setup lang="ts">
import {ref, watch} from 'vue';

const props = defineProps({
  modelValue: Boolean,
  backgroundColor: {
    type: String,
    default: 'bg-black',
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
  <div v-if="visible" class="eyelid-container">
    <!-- Upper eyelid -->
    <div class="eyelid upper-eyelid" :class="backgroundColor"></div>

    <!-- Lower eyelid -->
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
  animation: upper-eyelid-blink 3s ease-in-out forwards;
}

.lower-eyelid {
  height: 50vh;
  bottom: 0;
  animation: lower-eyelid-blink 3s ease-in-out forwards;
}

@keyframes upper-eyelid-blink {
  0% {
    transform: translateY(-100%);
  }
  15% {
    transform: translateY(0%);
  }
  85% {
    transform: translateY(0%);
  }
  100% {
    transform: translateY(-100%);
  }
}

@keyframes lower-eyelid-blink {
  0% {
    transform: translateY(100%);
  }
  15% {
    transform: translateY(0%);
  }
  85% {
    transform: translateY(0%);
  }
  100% {
    transform: translateY(100%);
  }
}
</style>