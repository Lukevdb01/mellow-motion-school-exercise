<template>
  <div class="w-full h-full fixed left-0 top-0 flex flex-col justify-center items-center">
    <!-- Display the scene text -->
    <div class="mb-12 text-center px-4">
      <p class="text-2xl font-bold text-white bg-black/25 px-6 py-3 rounded-xl shadow">
        {{ scene.text }}
      </p>
    </div>

    <!-- Clouds for choices -->
    <div class="flex justify-center gap-12">
      <Cloud
          v-for="(choice, index) in scene.choices"
          :key="index"
          :text="choice.text"
          @click="submitChoice(index)"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Cloud from '@/components/cloud.vue'

const scene = ref({})
const currentSceneId = ref('scene1')
const loading = ref(false)

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
  loadScene(currentSceneId.value)
})
</script>
