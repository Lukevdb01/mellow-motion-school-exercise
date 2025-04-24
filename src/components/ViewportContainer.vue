<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Renderer from '@/core/Renderer';
import Entry from '@/scenes/entry.scene';
import sceneManager from '@/core/SceneManager';
import Game from '@/scenes/game.scene';

const renderer = new Renderer();
const viewport = ref(null);

onMounted(() => {
  viewport.value = document.getElementById('viewport');
  sceneManager.addScene(new Game());
  sceneManager.addScene(new Entry());

  console.log(sceneManager._sceneArray);

  renderer.init(); // <-- Geef de DOM-ref door
  renderer.render();
  renderer.target(viewport);
});
</script>

<template>
  <section class="w-full h-full overflow-hidden" id="viewport"></section>
</template>
