<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Renderer from '@/core/Renderer';
import sceneManager from '@/core/SceneManager';
import Game from '@/scenes/game.scene';
import IntroViewport from "@/components/viewports/IntroViewport.vue";

const renderer = new Renderer();
const viewport = ref<HTMLElement | null>(null);

onMounted(() => {
  sceneManager.addScene(new Game());

  console.log(sceneManager._sceneArray);

  renderer.init();
  renderer.render();
  renderer.target(viewport);
});
</script>

<template>
  <IntroViewport/>
</template>
