<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Cloud from '@/components/cloud.vue'
import Dialog from '@/components/dialog.vue'
import sceneManager from "@/core/SceneManager";

const scene = ref({});
const currentSceneId = ref('scene1');
const loading = ref(false);

const toggleQuestion = ref(false);

const event = ref<HTMLElement | null>(null);

const loadScene = async (id) => {
  loading.value = true
  try {
    const res = await fetch(`/api/backend/scene/${id}`)
    scene.value = await res.json()
    currentSceneId.value = id
  } catch (err) {
    scene.value = { text: 'Failed to load scene.' }
  }
  loading.value = false
}

const submitChoice = async (index) => {
  const choice = scene.value.choices[index];
  if (choice.scene3D) {
    loading.value = true;                           // optional - shows spinner
    try {
      sceneManager.setActiveSceneByName(choice.scene3D); // ← pass the name
      toggleQuestion.value = false;                 // hide the dialog window
    } finally {
      loading.value = false;
    }
    return;                                         // stop here
  }

  loading.value = true
  try {
    const res = await fetch('/api/backend/answer-question', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sceneId: currentSceneId.value,
        choiceIndex: index,
      }),
    })
    scene.value = await res.json()
    currentSceneId.value = Object.keys(scene.value)[0] || currentSceneId.value
  } catch (err) {
    scene.value = { text: 'Something went wrong.' }
  }
  loading.value = false
}

onMounted(() => {
  loadScene(currentSceneId.value);
  event.value?.addEventListener('click', () => {
    toggleQuestion.value = true;
  });
})
</script>

<template>
  <div ref="event" class="w-screen h-screen fixed font-barlow left-0 top-0 flex flex-col justify-center items-center">
    <!-- Display the scene text -->
    <div class="absolute top-52" v-if="!toggleQuestion">
      <p class="text-5xl">{{ scene.text }}</p>
    </div>
    <Dialog v-if="toggleQuestion" class="absolute bottom-8 left-8">
      <p>{{ scene.text }}</p>
    </Dialog>

    <!-- Clouds for choices -->
    <div class="absolute grid grid-cols-3 grid-rows-3 place-items-center h-full px-8 w-screen">
      <Cloud
          v-for="(choice, index) in scene.choices"
          :key="index"
          :text="choice.text"
          :class="'grid-' + (choice.position ?? index + 1)"
          @click="submitChoice(index)"
      />
    </div>
  </div>
</template>

<style scoped>
.grid-9 {
  grid-column: 3;
  grid-row: 3;
}

.grid-8{
  grid-column: 2;
  grid-row: 3;
}

.grid-7 {
  grid-column: 1;
  grid-row: 3;
}

.grid-6 {
  grid-column: 3;
  grid-row: 2;
}

.grid-5 {
  grid-column: 2;
  grid-row: 2;
}

.grid-4 {
  grid-column: 1;
  grid-row: 2;
}

.grid-3 {
  grid-column: 3;
  grid-row: 1;
}

.grid-2 {
  grid-column: 2;
  grid-row: 1;
}

.grid-1 {
  grid-column: 1;
  grid-row: 1;
}
</style>