<script setup>
import { ref, onMounted } from 'vue';
import Renderer from '@/core/Renderer.js';
import Scene from '@/core/Scene.js';

const renderer = new Renderer();
const viewport = ref(null);

onMounted(() => {
  viewport.value = document.getElementById('viewport');
  renderer.sceneManager.addScene(new Scene('MyDefaultScene'));
  renderer.init(); // <-- Geef de DOM-ref door
  renderer.sceneManager.getActiveScene().addObject();
  // Your code to execute after 30 seconds
  setInterval(() => {
    console.log("30 seconds have passed!");
    renderer.deleteSceneByName('MyDefaultScene');
  }, 15000);


  renderer.render();
  renderer.target(viewport)
});
</script>

<template>
  <section class="w-full h-full overflow-hidden" id="viewport"></section>
</template>
