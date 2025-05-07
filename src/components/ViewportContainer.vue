<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue';
import Renderer from '@/core/Renderer';
import sceneManager from '@/core/SceneManager';
import Game from '@/scenes/game.scene';

const renderer = new Renderer();
const viewport = ref<HTMLElement | null>(null);

const resizeHandler = () => {
  if (renderer.renderer) {
    renderer.renderer.setSize(viewport.value?.offsetWidth ?? 0, viewport.value?.offsetHeight ?? 0);
  }
};

onMounted(() => {
  window.addEventListener('resize', resizeHandler);
  resizeHandler(); // Set initial size

  nextTick(() => {
    viewport.value = document.getElementById('viewport');
    sceneManager.addScene(new Game());
    renderer.init();
    renderer.render();
    renderer.target(viewport);
  });
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeHandler);
});
</script>

<template>
  <section class="w-full h-full overflow-hidden" id="viewport"></section>
</template>
