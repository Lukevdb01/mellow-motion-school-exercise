<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Cloud from '@/components/cloud.vue'
import sceneManager from "@/core/SceneManager";
import Dialog from '@/components/dialog.vue' // Assuming Dialog is a Vue component

const scene = ref<any>({}); // Use 'any' for now, or define a more specific interface for scene
const currentSceneId = ref('scene1');
const loading = ref(false);

const toggleQuestion = ref(false);

const event = ref<HTMLElement | null>(null);

const loadScene = async (id) => {
  loading.value = true
  try {
    const res = await fetch(`/api/backend/scene/${id}`);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    scene.value = await res.json();
    currentSceneId.value = id;
  } catch (err) {
    console.error('Failed to load scene:', err);
    scene.value = { text: 'Failed to load scene.' };
  } finally {
    loading.value = false;
  }
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
    });
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const responseData = await res.json();
    scene.value = responseData;
    // Assuming the response structure might be { "newSceneId": { "text": "...", "choices": [...] } }
    // Adjust this based on your actual backend response for currentSceneId
    currentSceneId.value = Object.keys(scene.value)[0] || currentSceneId.value;
  } catch (err) {
    console.error('Failed to submit choice:', err);
    scene.value = { text: 'Something went wrong.' };
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  loadScene(currentSceneId.value);

  // Add click listener to the main event div to toggle the question/dialog
  if (event.value) {
    event.value.addEventListener('click', () => {
      toggleQuestion.value = true;
    });
  }
})
</script>

<template>
  <div ref="event" class="w-screen h-screen fixed font-barlow left-0 top-0 flex flex-col justify-center items-center">

    <div
      v-if="!toggleQuestion && scene.text"
      v-motion
      :initial="{ opacity: 0 }"
      :enter="{ opacity: 1, transition: { delay: 2000, duration: 1000 } }"
      :leave="{ opacity: 0, transition: { duration: 500 } }"
      class="absolute top-52 text-center"
    >
      <p class="text-5xl font-barlow font-medium">{{ scene.text }}</p>
    </div>

    <Dialog
      v-if="toggleQuestion"
      v-motion-fade
      class="absolute bottom-8 left-8"
    >
      <p>{{ scene.text }}</p>
    </Dialog>

    <div v-motion
      :initial="{ opacity: 0 }"
      :enter="{ opacity: 1, transition: { delay: 3000, duration: 1000 } }"
      :leave="{ opacity: 0, transition: { duration: 500 } }" class="absolute grid grid-cols-3 grid-rows-3 place-items-center h-full px-8 w-screen">
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