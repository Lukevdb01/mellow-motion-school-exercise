<template>
  <div class="w-full left-0 bottom-0 absolute">
    <!-- Tabs -->
    <ol class="flex h-full flex-row justify-center gap-x-24 items-center bg-white/25">
      <li
          v-for="(choice, index) in scene.choices"
          :key="index"
          class="bg-gray-400 p-4 h-full cursor-pointer"
          @click="submitChoice(index)"
      >
        {{ choice.text }}
      </li>
    </ol>

    <!-- Display the scene text -->
    <div class="mt-4 text-center">
      <p class="text-lg">{{ scene.text }}</p>
    </div>

    <!-- Reload Button -->
    <div class="mt-6 text-center">
      <button
          @click="loadScene(currentSceneId)"
          class="px-4 py-2 bg-gray-500/25 text-white rounded hover:bg-gray-600/25"
      >
        🔄 Reload Scene
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const scene = ref({})
const currentSceneId = ref('scene1')
const loading = ref(false)

const loadScene = async (id) => {
  loading.value = true
  try {
    // Fetch the scene data from the backend API
    const res = await fetch(`/api/backend/scene/${id}`)
    scene.value = await res.json()
    currentSceneId.value = id
  } catch (err) {
    scene.value = { text: 'Failed to load scene.' }
  }
  loading.value = false
}

const submitChoice = async (index) => {
  loading.value = true
  try {
    // Send the user's choice to the backend to get the next scene
    const res = await fetch('/api/backend/answer-question', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sceneId: currentSceneId.value,
        choiceIndex: index,
      }),
    })

    // Update the scene with the next scene
    scene.value = await res.json()
    currentSceneId.value = Object.keys(scene.value)[0] || currentSceneId.value
  } catch (err) {
    scene.value = { text: 'Something went wrong.' }
  }
  loading.value = false
}

onMounted(() => {
  loadScene('scene1')
})
</script>

<style scoped>
.bg-gray-400:hover {
  background-color: #3b3b3b;
  cursor: pointer;
}

.text-center {
  text-align: center;
}
</style>
