<script setup lang="ts">
const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  hover: {
    type: Boolean,
    default: false,
  }
});
</script>

<template>
  <div class="cloud-speech-bubble cursor-pointer ">
    <div class="cloud-content">
      <p class="scribble-text">{{ props.text }}</p>
    </div>
  </div>
</template>

<style scoped>
@keyframes float {
  0% {
    transform: translateY(0px) translateX(0px);
  }

  25% {
    transform: translateY(-5px) translateX(5px);
  }

  50% {
    transform: translateY(0px) translateX(0px);
  }

  75% {
    transform: translateY(5px) translateX(-5px);
  }

  100% {
    transform: translateY(0px) translateX(0px);
  }
}

@keyframes bubble-pulse {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.08);
  }

  100% {
    transform: scale(1);
  }
}

.cloud-speech-bubble {
  display: flex;
  background-color: #fff;
  padding: 20px;
  border-radius: 30px;
  min-width: 40px;
  max-width: clamp(220px, 80vw, 400px);
  min-height: 40px;
  margin: 20px;
  position: relative;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #333;
  animation: float 10s ease-in-out infinite;
  z-index: 1;
}

.cloud-speech-bubble::before,
.cloud-speech-bubble::after {
  content: "";
  background-color: #fff;
  border-radius: 50%;
  display: block;
  position: absolute;
  z-index: 1;
  animation: bubble-pulse 3s ease-in-out infinite;
}

.cloud-speech-bubble::before {
  width: 44px;
  height: 44px;
  top: -12px;
  left: 28px;
  box-shadow: -50px 30px 0 -12px #fff;
  animation-delay: 0.3s;
}

.cloud-speech-bubble::after {
  bottom: -10px;
  right: 10%;
  width: 30px;
  height: 30px;
  box-shadow: 40px -34px 0 0 #fff,
    -28px -6px 0 -2px #fff,
    -24px 17px 0 -6px #fff,
    -5px 25px 0 -10px #fff;
  animation-delay: 0.8s;
}

.speech-bubble-pointer {
  position: absolute;
  bottom: -10px;
  left: 20%;
  width: 0;
  height: 0;
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
  border-top: 20px solid #fff;
  z-index: 0;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
}

.cloud-content {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  position: relative;
  align-items: center;
  justify-content: center;
  z-index: 40;
}

.scribble-text {
  font-family: cursive;
  font-size: 1.25rem;
  line-height: 1.5;
  margin: 0;
  padding: 0;
  transform: rotate(-2deg);
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  -moz-user-select: none;
}
</style>