<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, onBeforeMount, nextTick } from 'vue';
import Renderer from '@/core/Renderer';
import sceneManager from '@/core/SceneManager';
import Intro from '@/scenes/intro.scene';
import Scene1 from '@/scenes/scene1.scene';
import Scene2 from '@/scenes/scene2.scene';
import Outro from '@/scenes/outro.scene';
import ProgressBar from '@/components/ProgressBar.vue';

const renderer = new Renderer();
const viewport = ref<HTMLElement | null>(null);

const resizeHandler = () => {
  if (renderer.renderer) {
    renderer.renderer.setSize(viewport.value?.offsetWidth ?? 0, viewport.value?.offsetHeight ?? 0);
  }
};

onBeforeMount(() => {
  sceneManager.addScene(new Intro());
  sceneManager.addScene(new Scene1())
  sceneManager.addScene(new Scene2());
  sceneManager.addScene(new Outro());
});

onMounted(() => {
  window.addEventListener('resize', resizeHandler);
  resizeHandler(); // Set initial size

  nextTick(() => {
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
  <div class="relative w-full flex items-center justify-center h-full">
    <ProgressBar />
    <div id="html-canvas"></div>
    <section class="w-full h-full overflow-hidden" ref="viewport"></section>
  </div>
</template>