<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue';

const props = defineProps<{
  text: string
}>();

const canvasRef = ref<HTMLCanvasElement | null>(null);
let particles: Particle[] = [];
let animationFrameId: number;
let hovering = false;

interface Particle {
  x: number;
  y: number;
  radius: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  opacity: number;
}

function createParticles(textLength: number, width: number, height: number) {
  const count = 1000 + textLength * 15;
  particles = [];
  for (let i = 0; i < count; i++) {
    const radius = 6 + Math.random() * 8;
    const x = Math.random() * width;
    const y = Math.random() * height;
    particles.push({
      x,
      y,
      baseX: x,
      baseY: y,
      radius,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      opacity: 0.05 + Math.random() * 0.1,
    });
  }
}

function animate(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.clearRect(0, 0, width, height);
  particles.forEach((p) => {
    const dx = p.x - p.baseX;
    const dy = p.y - p.baseY;
    if (!hovering) {
      p.x -= dx * 0.05;
      p.y -= dy * 0.05;
    } else {
      p.vx += (Math.random() - 0.5) * 0.2;
      p.vy += (Math.random() - 0.5) * 0.2;
      p.x += p.vx;
      p.y += p.vy;
    }

    ctx.beginPath();
    ctx.fillStyle = `rgba(255,255,255,${p.opacity})`;
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fill();
  });

  animationFrameId = requestAnimationFrame(() => animate(ctx, width, height));
}

function startAnimation() {
  const canvas = canvasRef.value;
  if (!canvas) return;

  const width = 160 + props.text.length * 8;
  const height = 100;
  canvas.width = width;
  canvas.height = height;

  createParticles(props.text.length, width, height);
  const ctx = canvas.getContext('2d');
  if (ctx) {
    animate(ctx, width, height);
  }
}

function onCloudClick() {
  console.log('Cloud clicked!');
}

onMounted(startAnimation);
watch(() => props.text, startAnimation);
onUnmounted(() => cancelAnimationFrame(animationFrameId));
</script>

<template>
  <div
      class="relative inline-block cursor-pointer"
      :style="{
      width: `${160 + props.text.length * 8}px`,
      height: '100px',
    }"
      @mouseenter="hovering = true"
      @mouseleave="hovering = false"
      @click="onCloudClick"
  >
    <!-- Canvas background cloud -->
    <canvas
        ref="canvasRef"
        class="absolute top-0 left-0 z-0 rounded-[50%_/_40%]"
        style="width: 100%; height: 100%; pointer-events: auto;"
    ></canvas>

    <!-- Text -->
    <div
        class="absolute inset-0 flex items-center justify-center z-10 px-10 py-6 text-lg font-medium"
        style="color: black;"
    >
      {{ text }}
    </div>
  </div>
</template>

<style scoped>
canvas {
  filter: blur(8px);
  transition: all 0.3s ease;
}

.cloud:hover canvas {
  transform: scale(1.05);
}
</style>
