<script setup lang="ts">
import {ref, onMounted, nextTick} from 'vue'
import Cloud from '@/components/cloud.vue'
import sceneManager from "@/core/SceneManager";
import Dialog from '@/components/dialog.vue'
import EyelidBlink from "@/components/EyelidBlink.vue";
import scene2Scene from "@/scenes/scene2.scene";

const showIntro = ref(false);
const introVideo = ref<HTMLVideoElement | null>(null);
const scene = ref<any>({}); // Use 'any' for now, or define a more specific interface for scene
const currentSceneId = ref('dialog1');
const loading = ref(false);
const showBlink = ref(false);
const introNextSceneId = ref<string | null>(null);
const introNextScene3D = ref<string | null>(null);
const showEndScreen = ref(false);

const toggleQuestion = ref(false);

const event = ref<HTMLElement | null>(null);

const loadScene = async (id) => {
  loading.value = true
  try {
    const res = await fetch(`http://localhost:8001/mellow-motion/backend/scene/${id}`, {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    });
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    scene.value = await res.json();
    currentSceneId.value = id;
  } catch (err) {
    console.error('Failed to load scene:', err);
    scene.value = {text: 'Failed to load scene.'};
  } finally {
    loading.value = false;
  }
}

const walkToMirror = () => {
  const activeScene = sceneManager.getActiveScene();
  if (activeScene instanceof scene2Scene) {
    activeScene.walkToMirrorStart();
    console.log("Walking to mirror1...");
  } else {
    console.warn("Active scene is not scene2, or walkToMirror is not available.");
  }
};

const verzorging = () => {
  console.log("Starting self-care routine...");
  // Add any UI changes or animations here
};

const endExperience = () => {
  showEndScreen.value = true;
}


const submitChoice = async (index: number) => {
  const choice = scene.value.choices[index];

  if (choice.text === "Start de ervaring") {
    introNextSceneId.value = choice.next;
    introNextScene3D.value = choice.scene3D ?? null;
    showIntro.value = true;
    await nextTick(() => {
      introVideo.value?.play();
    });
    return;
  }

  if (choice.scene3D) {
    showBlink.value = true;
    sceneManager.setActiveSceneByName(choice.scene3D);
    toggleQuestion.value = false;
  }

  if (choice.function) {
    if (choice.function === "walkToMirror") {
      walkToMirror();
    } else if (choice.function === "Verzorging") {
      verzorging();
    } else if (choice.function === "endExperience") {
      endExperience();
    }
  }

  loading.value = true;
  try {
    const res = await fetch('http://localhost:8001/mellow-motion/backend/answer-question', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        sceneId: currentSceneId.value,
        choiceIndex: index,
      }),
    });

    const nextScene = await res.json();
    scene.value = nextScene;
    currentSceneId.value = choice.next ?? currentSceneId.value;  // ✅ set it directly
  } catch (err) {
    console.error('Failed to submit choice:', err);
    scene.value = {text: 'Something went wrong.'};
  } finally {
    loading.value = false;
  }
};

const blinkFinished = () => {
  showBlink.value = false;
  toggleQuestion.value = false;
}

onMounted(() => {
  const video = introVideo.value;

  if (video) {
    video.addEventListener('ended', () => {
      showIntro.value = false;
      if (introNextScene3D.value) {
        sceneManager.setActiveSceneByName(introNextScene3D.value);
        introNextScene3D.value = null;
      }
      if (introNextSceneId.value) {
        loadScene(introNextSceneId.value);
        currentSceneId.value = introNextSceneId.value;
        introNextSceneId.value = null;
      }
    });
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && showIntro.value) {
        video.pause();
        showIntro.value = false;
        if (introNextScene3D.value) {
          sceneManager.setActiveSceneByName(introNextScene3D.value);
          introNextScene3D.value = null;
        }
        if (introNextSceneId.value) {
          loadScene(introNextSceneId.value);
          currentSceneId.value = introNextSceneId.value;
          introNextSceneId.value = null;
        }
      }
    });

  }

  loadScene(currentSceneId.value);
});

</script>

<template>
  <video
      ref="introVideo"
      class="w-screen h-screen absolute z-50 object-cover"
      src="/assets/0000-0306.mp4"
      autoplay
      muted
      playsinline
      v-show="showIntro"
  ></video>
  <div v-if="!showIntro" ref="event" class="w-screen h-screen fixed font-cursive left-0 top-0 flex flex-col justify-center items-center">
    <EyelidBlink v-model="showBlink" @blinkFinished="blinkFinished"/>
    <div
        v-if="!toggleQuestion && scene.text"
        v-motion
        :initial="{ opacity: 0 }"
        :enter="{ opacity: 1, transition: { delay: 500, duration: 1000 } }"
        :leave="{ opacity: 0, transition: { duration: 500 } }"
        class="absolute top-48 text-center w-[80vw]"
    >
      <p class="text-4xl font-papercut text-[#EF3A25] mb-4 font-medium">{{ scene.text }}</p>
      <p v-if="scene.mini_title" class="text-2xl  text-[#F8CA2C] font-papercut">{{ scene.mini_title }}</p>
    </div>

    <Dialog
        v-if="toggleQuestion"
        v-motion-fade
        class="absolute bottom-8 z-10 left-8"
    >
      <p>{{ scene.text }}</p>
    </Dialog>

    <div
        v-if="!showBlink"
        v-motion
        :initial="{ opacity: 0 }"
        :enter="{ opacity: 1, transition: { delay: 1000, duration: 1000 } }"
        :leave="{ opacity: 0, transition: { duration: 500 } }"
        class="absolute grid grid-cols-3 grid-rows-3 place-items-center h-full px-8 w-screen">
      <Cloud
          v-for="(choice, index) in scene.choices"
          :key="index"
          :hover="choice.hover"
          :text="choice.text"
          :class="'grid-' + (choice.position ?? index + 1)"
          @click="submitChoice(index)"
      />
    </div>
  </div>
  <div
      v-if="showEndScreen"
      class="fixed inset-0 z-50 bg-white text-gray-900 overflow-y-auto px-6 py-12 flex justify-center items-start"
  >
    <div class="max-w-3xl w-full space-y-8 relative bg-white shadow-xl rounded-xl p-10">
      <h1 class="text-5xl font-bold text-center text-black">Eindscherm</h1>

      <p class="text-lg leading-relaxed">
        Met dit project willen we de impact laten zien van schoonheidsidealen die op sociale platformen worden gepromoot.
        Door het verhaal heen krijg je een inkijkje in de gedachtegang van ons personage — een gedachtegang die veel jongeren herkennen en delen.
        We laten zien hoe de constante stroom aan beelden en boodschappen op sociale media blijft hangen in je hoofd, en ongemerkt je zelfbeeld en gedachten beïnvloedt.
        Door dit inzichtelijk te maken, hopen we bewustzijn te creëren over hoe diep deze invloed kan gaan.
      </p>

      <div class="bg-gray-100 rounded-md p-6 space-y-4">
        <p class="font-semibold text-lg">Herken jij de negatieve gevolgen van onrealistische beauty standards, of heb je behoefte aan ondersteuning? Praat erover!</p>

        <div>
          <h2 class="font-bold">Alles Oké? Supportlijn (18 t/m 24 jaar)</h2>
          <ul class="list-disc list-inside ml-4">
            <li>📞 0800-0450 (dagelijks van 14:00–22:00)</li>
            <li>💬 Chat: <a href="https://www.allesoke.nl" class="text-blue-600 underline" target="_blank">www.allesoke.nl</a></li>
          </ul>
        </div>

        <div>
          <h2 class="font-bold">De Kindertelefoon (tot 18 jaar)</h2>
          <ul class="list-disc list-inside ml-4">
            <li>📞 0800-0432</li>
            <li>💬 Chat: <a href="https://www.kindertelefoon.nl" class="text-blue-600 underline" target="_blank">www.kindertelefoon.nl</a></li>
          </ul>
        </div>

        <div>
          <h2 class="font-bold">Proud2Bme</h2>
          <ul class="list-disc list-inside ml-4">
            <li>🌐 <a href="https://www.proud2bme.nl" class="text-blue-600 underline" target="_blank">www.proud2bme.nl</a></li>
          </ul>
        </div>
      </div>

      <div class="bg-gray-50 rounded-md p-6">
        <h3 class="font-bold text-xl mb-4">Team Mellow Motion</h3>
        <ul class="list-disc list-inside space-y-1">
          <li>Willemijn van Aspert – 3D-designer en karakter design</li>
          <li>James Wang – 3D-designer en animator</li>
          <li>Luuk Schaeffer – Illustrator en karakter design</li>
          <li>Katja Belotchkina – Grafisch ontwerper, conceptueel bedenker en 3D support</li>
          <li>Melissa Hellemons – Grafisch ontwerper en voorzitter en 3D support</li>
          <li>Samed Bozaslan – Software developer</li>
          <li>Luke van den Broek – Software developer</li>
          <li>Job van der Wielen – Adviseur</li>
        </ul>
      </div>

      <div class="text-center">
        <a
            href="/"
            class="inline-block bg-black text-white px-6 py-3 rounded-full text-lg font-medium hover:bg-gray-800 transition"
        >
          Klik om opnieuw te beginnen
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.grid-9 {
  grid-column: 3;
  grid-row: 3;
}

.grid-8 {
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