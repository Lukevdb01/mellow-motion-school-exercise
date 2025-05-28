<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Cloud from '@/components/cloud.vue'
import Dialog from '@/components/dialog.vue' // Assuming Dialog is a Vue component

const scene = ref<any>({}); // Use 'any' for now, or define a more specific interface for scene
const currentSceneId = ref('scene1');
const loading = ref(false);

const toggleQuestion = ref(false);

const event = ref<HTMLElement | null>(null); // Ref for the main div to capture clicks

/**
 * Loads a scene from the backend API.
 * @param {string} id The ID of the scene to load.
 */
const loadScene = async (id: string) => {
  loading.value = true;
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

/**
 * Submits a chosen answer to the backend API.
 * @param {number} index The index of the chosen answer.
 */
const submitChoice = async (index: number) => {
  loading.value = true;
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
  <div ref="event" class="w-full h-screen fixed font-barlow left-0 top-0 flex flex-col justify-center items-center">

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

    <!-- These clouds will appear regardless of toggleQuestion state,
         but their visibility might be implied by the scene.choices data -->
    <div v-motion
      :initial="{ opacity: 0 }"
      :enter="{ opacity: 1, transition: { delay: 3000, duration: 1000 } }"
      :leave="{ opacity: 0, transition: { duration: 500 } }" class="flex justify-center gap-12 mt-auto mb-20">
      <Cloud
        v-for="(choice, index) in scene.choices"
        :key="index"
        :text="choice.text"
        @click="submitChoice(index)"
      />
    </div>
  </div>
</template>

<style scoped>
/* Add any component-specific styles here if needed */
</style>
