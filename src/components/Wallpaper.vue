<template>
  <div
    class="absolute top-0 left-0 -z-10 h-full w-screen overflow-hidden bg-red-400 bg-gradient-to-b from-sky-900 to-sky-600 from-20%"
  >
    <!--  <div class="text-8xl text-white"> {{sunRotation}}</div>-->
    <div
      class="absolute top-0 left-0 h-full w-full bg-black"
      :style="{ opacity: nightLayerValue }"
    ></div>

    <lottie-animation
      v-if="weatherType === WEATHER_TYPE.RAINY || weatherType === WEATHER_TYPE.THUNDER"
      class="h-full top-0 bg-gray-400/50 absolute scale-[300%] opacity-20"
      path="../../src/assets/lottie/rain-lottie.json"
      :speed="0.6"
      :loop="true"
      :auto-play="true"
    />

    <img
      :style="{ opacity: nightLayerValue }"
      src="/src/assets/images/background-space.png"
      alt="background space"
    />
    <div
      v-if="weatherType === WEATHER_TYPE.THUNDER"
      class="absolute top-0 left-0 h-full w-full bg-white lightning"
    ></div>
    <div
      v-if="weatherType === WEATHER_TYPE.THUNDER"
      class="absolute top-40 right-1/3 h-96 w-6 rotate-12 bg-white blur-2xl lightning"
    ></div>

    <div
      id="sunContainer"
      v-if="sunRotation !== -1"
      class="absolute left-1/2 aspect-square w-[80%]"
      :style="{ transform: `translateX(-50%) rotate(${Math.round(sunRotation)}deg)` }"
    >
      <div
        id="sun"
        class="absolute top-1/2 left-0 -translate-y-1/2 rounded-full bg-yellow-100 blur-xl size-20 md:size-60 md:blur-3xl"
      ></div>
    </div>
    <div
      id="moonContainer"
      v-if="moonRotation !== -1"
      class="absolute left-1/2 aspect-square w-[80%]"
      :style="{ transform: `translateX(-50%) rotate(${moonRotation}deg)` }"
    >
      <div
        id="sun"
        class="absolute top-1/2 left-0 -translate-y-1/2 rounded-full bg-white blur-xl size-20 md:size-40 md:blur-3xl"
      ></div>
    </div>

    <div
      v-if="
        weatherType === WEATHER_TYPE.RAINY ||
        weatherType === WEATHER_TYPE.THUNDER ||
        weatherType === WEATHER_TYPE.CLOUDY
      "
      class="absolute w-full left-0 to-[10%] bg-gray-500 blur-2xl h-20"
    ></div>

    <div
      v-if="
        weatherType === WEATHER_TYPE.RAINY ||
        weatherType === WEATHER_TYPE.THUNDER ||
        weatherType === WEATHER_TYPE.CLOUDY
      "
      class="absolute top-0 left-0 h-full w-screen bg-gray-500 opacity-20"
    ></div>

    <template
      v-if="
        weatherType === WEATHER_TYPE.RAINY ||
        weatherType === WEATHER_TYPE.THUNDER ||
        weatherType === WEATHER_TYPE.CLOUDY
      "
    >
      <div
        v-for="(_, index) in Array.from({ length: 20 })"
        :key="index"
        class="absolute top-10 left-10 h-40 w-96 blur-2xl cloud"
        :class="`cloud-${index + 1}`"
        :style="{ opacity: Math.round(Math.random() * 10) / 10 }"
      >
        <div
          class="absolute top-1/2 left-1/2 h-40 w-80 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-b from-gray-600 to-gray-900"
        ></div>
        <div
          class="absolute top-1/2 left-1/2 h-20 w-40 -translate-y-1/2 bg-gradient-to-b from-gray-600 to-gray-900 translate-x-[40%]"
        ></div>
        <div></div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useCityStore } from '../stores/useCityStore.ts'
import {
  getWeatherType,
  interpolate,
  interpolateCircularInverse,
  WEATHER_TYPE
} from '../utils/index.ts'
import LottieAnimation from 'lottie-vuejs/src/LottieAnimation.vue'

const cityStore = useCityStore()

const hour = computed(() => {
  let date = cityStore.currentTime ?? new Date()
  let hour = date.toLocaleTimeString('fr-FR', { hour: 'numeric' })
  return Number(hour.toLocaleLowerCase().replace(' h', ''))
})

const weatherType = computed(() => getWeatherType(cityStore.selectedCity?.weather?.weather[0].icon))
const moonRotation = computed(() => {
  if (hour.value > 8 && hour.value < 20) return -1

  if (hour.value === 8) return 180

  return (
    180 -
    interpolateCircularInverse({
      value: hour.value,
      minInput: 8, // morning
      maxInput: 20, // night
      minOutput: 90,
      maxOutput: 180
    })
  )
})

const sunRotation = computed(() => {
  if (moonRotation.value !== -1) return -1
  if (hour.value < 8 || hour.value > 20) return -1

  return interpolate({
    value: hour.value,
    minInput: 8, // morning
    maxInput: 20, // night
    minOutput: 90,
    maxOutput: 180
  })
})
const nightLayerValue = computed(() => {
  if (hour.value > 22 || hour.value < 6) return 0.8
  if (hour.value > 10 && hour.value < 18) return 0

  if (hour.value >= 18 && hour.value <= 22) {
    return (
      interpolate({
        value: hour.value,
        minInput: 18, // morning
        maxInput: 22, // night
        minOutput: 0,
        maxOutput: 100
      }) / 100
    )
  }

  return 0.2
})
</script>

<style scoped>
.cloud {
  animation: float 20s linear infinite;
}

.cloud.cloud-1 {
  animation-duration: 40s;
  animation-delay: -5s;
}

.cloud.cloud-2 {
  top: 10%;
  left: -250px;
  width: 300px;
  height: 180px;
  animation-duration: 70s;
  animation-delay: -3s;
}

.cloud.cloud-3 {
  top: 30%;
  left: -150px;
  width: 220px;
  height: 130px;
  animation-duration: 46s;
  animation-delay: -1s;
}

.cloud.cloud-4 {
  top: 0;
  left: -300px;
  width: 250px;
  height: 150px;
  animation-duration: 54s;
  animation-delay: -6s;
}

.cloud.cloud-5 {
  top: 20%;
  left: -200px;
  width: 280px;
  height: 160px;
  animation-duration: 44s;
  animation-delay: -2s;
}

.cloud.cloud-6 {
  top: 40%;
  left: 10vw;
  width: 230px;
  height: 140px;
  animation-duration: 48s;
  animation-delay: -4s;
}

.cloud.cloud-7 {
  top: 10%;
  left: -350px;
  width: 270px;
  height: 155px;
  animation-duration: 52s;
  animation-delay: -7s;
}

.cloud.cloud-8 {
  top: 15%;
  left: 20vw;
  width: 250px;
  height: 150px;
  animation-duration: 42s;
  animation-delay: -3s;
}

.cloud.cloud-9 {
  top: 35%;
  left: -150px;
  width: 240px;
  height: 145px;
  animation-duration: 60s;
  animation-delay: -5s;
}

.cloud.cloud-10 {
  top: 5%;
  left: -280px;
  width: 260px;
  height: 150px;
  animation-duration: 46s;
}

.cloud.cloud-11 {
  top: 25%;
  left: 15vw;
  width: 270px;
  height: 160px;
  animation-duration: 56s;
  animation-delay: -4s;
}

.cloud.cloud-12 {
  top: 45%;
  left: -120px;
  width: 220px;
  height: 130px;
  animation-duration: 44s;
}

.cloud.cloud-13 {
  top: 15%;
  left: 5vw;
  width: 250px;
  height: 150px;
  animation-duration: 48s;
  animation-delay: -6s;
}

.cloud.cloud-14 {
  top: 30%;
  left: -200px;
  width: 260px;
  height: 155px;
  animation-duration: 52s;
  animation-delay: -2s;
}

.cloud.cloud-15 {
  top: 10%;
  left: 25vw;
  width: 280px;
  height: 160px;
  animation-duration: 54s;
  animation-delay: -5s;
}

.cloud.cloud-16 {
  top: 20%;
  left: -150px;
  width: 240px;
  height: 140px;
  animation-duration: 46s;
  animation-delay: -1s;
}

.cloud.cloud-17 {
  top: 40%;
  left: 30vw;
  width: 250px;
  height: 150px;
  animation-duration: 50s;
}

.cloud.cloud-18 {
  top: 30%;
  left: -270px;
  width: 260px;
  height: 155px;
  animation-duration: 44s;
  animation-delay: -3s;
}

.cloud.cloud-19 {
  top: 50%;
  left: 10vw;
  width: 270px;
  height: 160px;
  animation-duration: 48s;
  animation-delay: -6s;
}

.cloud.cloud-20 {
  top: 25%;
  left: -310px;
  width: 230px;
  height: 140px;
  animation-duration: 56s;
}

.lightning {
  opacity: 0;
  animation: lightning 15s infinite 6s;
}

@keyframes float {
  0% {
    transform: translateX(-100vw); /* Start off-screen on the left */
  }
  100% {
    transform: translateX(200vw); /* End off-screen on the right */
  }
}

@keyframes lightning {
  0%,
  99% {
    opacity: 0;
  }
  1%,
  3% {
    opacity: 0.5;
  }
  4%,
  5% {
    opacity: 0;
  }
  6%,
  7% {
    opacity: 0.7;
  }
  8%,
  100% {
    opacity: 0;
  }
}

.rain {
  position: absolute;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
}

.rain.back-row {
  display: none;
  z-index: 1;
  bottom: 60px;
  opacity: 0.5;
}

body.back-row-toggle .rain.back-row {
  display: block;
}

.drop {
  position: absolute;
  bottom: 100%;
  width: 15px;
  height: 120px;
  pointer-events: none;
  animation: drop 0.5s linear infinite;
}

@keyframes drop {
  0% {
    transform: translateY(0vh);
  }
  75% {
    transform: translateY(90vh);
  }
  100% {
    transform: translateY(90vh);
  }
}

.stem {
  width: 1px;
  height: 60%;
  margin-left: 7px;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.25));
  animation: stem 0.5s linear infinite;
}

@keyframes stem {
  0% {
    opacity: 1;
  }
  65% {
    opacity: 1;
  }
  75% {
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
}

.splat {
  width: 15px;
  height: 10px;
  border-top: 2px dotted rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  opacity: 1;
  transform: scale(0);
  animation: splat 0.5s linear infinite;
  display: none;
}

body.splat-toggle .splat {
  display: block;
}

@keyframes splat {
  0% {
    opacity: 1;
    transform: scale(0);
  }
  80% {
    opacity: 1;
    transform: scale(0);
  }
  90% {
    opacity: 0.5;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(1.5);
  }
}

.toggles {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 3;
}

.toggle {
  position: absolute;
  left: 20px;
  width: 50px;
  height: 50px;
  line-height: 51px;
  box-sizing: border-box;
  text-align: center;
  font-family: sans-serif;
  font-size: 10px;
  font-weight: bold;
  background-color: rgba(255, 255, 255, 0.2);
  color: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.3s;
}

.toggle:hover {
  background-color: rgba(255, 255, 255, 0.25);
}

.toggle:active {
  background-color: rgba(255, 255, 255, 0.3);
}

.toggle.active {
  background-color: rgba(255, 255, 255, 0.4);
}

.splat-toggle {
  top: 20px;
}

.back-row-toggle {
  top: 90px;
  line-height: 12px;
  padding-top: 14px;
}

.single-toggle {
  top: 160px;
}

body.single-toggle .drop {
  display: none;
}

body.single-toggle .drop:nth-child(10) {
  display: block;
}
</style>
