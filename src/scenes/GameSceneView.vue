<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Cloud from '@/components/cloud.vue'
import Dialog from '@/components/dialog.vue'

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
  <div ref="event" class="w-full h-screen fixed font-barlow left-0 top-0 flex flex-col justify-center items-center">
    <!-- Display the scene text -->
    <div class="absolute top-52" v-if="!toggleQuestion">
      <p class="text-5xl">{{ scene.text }}</p>
    </div>
    <Dialog v-if="toggleQuestion" class="absolute bottom-8 left-8">
      <p>{{ scene.text }}</p>
    </Dialog>

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
