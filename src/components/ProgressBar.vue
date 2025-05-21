<script setup lang="ts">
import { ref, watch } from 'vue'
import sceneManager from '@/core/sceneManager'

interface SceneCollection {
  name: string
  base: string
}

const activeScene = ref<SceneCollection | null>(null)
const activeBaseScene = ref<string | null>(null)
const imageSources = ref<Array<{ key: string; src: string; alt: string }>>([])

function updateActiveScene(newCollection: SceneCollection | null) {
  activeScene.value = newCollection
  const sceneName = newCollection?.name ?? null

  activeBaseScene.value = sceneName?.replace(/-extended$/, '') ?? null

  const collections = sceneManager.getSceneCollections()
  imageSources.value = collections.map(({ name, base }) => {
    const isActive = activeBaseScene.value === name
    return {
      key: name,
      src: `/images/${base}${isActive ? '-extended' : ''}.webp`,
      alt: `${name} scene image`,
    }
  })
}

// ✅ Reageer automatisch op sceneManager.activeSceneName
watch(() => sceneManager.activeSceneName.value, () => {
  updateActiveScene(sceneManager.getActiveSceneCollection())
}, { immediate: true })
</script>

<template>
  <ol class="absolute top-0 right-0 left-6 w-max h-full flex flex-col items-start justify-center gap-8">
    <li v-for="image in imageSources" :key="image.key" class="w-max">
      <img :src="image.src" :alt="image.alt" class="w-1/7 h-auto"/>
    </li>
  </ol>
</template>
