<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Renderer from '@/core/Renderer';
import Entry from '@/scenes/entry.scene';
import sceneManager from '@/core/SceneManager';
import Game from '@/scenes/game.scene';

const renderer = new Renderer();
const viewport = ref(null);

onMounted(() => {
  sceneManager.addScene(new Game());
  sceneManager.addScene(new Entry());

  console.log(sceneManager._sceneArray);

  renderer.init();
  renderer.render();
  renderer.target(viewport);
});
</script>

<template>
  <section class="w-full h-full overflow-hidden" ref="viewport"></section>
</template>
