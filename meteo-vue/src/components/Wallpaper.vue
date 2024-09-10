<template>
  <div class="bg-red-400 absolute overflow-hidden top-0 left-0 w-screen h-full bg-gradient-to-b from-sky-900 from-20% to-sky-600 -z-10">
    <div class="text-8xl font-black text-white">{{hour}}/{{nightLayerValue}}</div>
    <div class="absolute top-0 left-0 w-full h-full bg-black"
      :style="{opacity: nightLayerValue}"
    ></div>
    <img :style="{opacity: nightLayerValue}" src="/src/assets/background-space.png" alt="background space">
    <div
        id="sunContainer"
        v-if="sunRotation !== -1"
        class="absolute left-1/2 w-[80%] aspect-square"
        :style="{transform: `translateX(-50%) rotate(${sunRotation}deg)`}"
    >
      <div id="sun" class="absolute top-1/2 left-0 -translate-y-1/2 bg-yellow-100 size-20 md:size-60 rounded-full blur-xl md:blur-3xl"> </div>
    </div>
    <div
        id="moonContainer"
        v-if="moonRotation !== -1"
        class="absolute left-1/2 w-[80%] aspect-square"
        :style="{transform: `translateX(-50%) rotate(${moonRotation}deg)`}"
    >
      <div id="sun" class="absolute top-1/2 left-0 -translate-y-1/2 bg-white size-20 md:size-40 rounded-full blur-xl md:blur-3xl"> </div>
    </div>

      <div v-for="(_, index) in Array.from({length: 10})" class="cloud absolute  h-40 w-96 blur-xl" :class="`cloud-${index + 1}`">
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-40 bg-gradient-to-b from-gray-600 to-gray-900"></div>
        <div class="absolute top-1/2 left-1/2 translate-x-[40%] -translate-y-1/2 w-40 h-20 bg-gradient-to-b from-gray-600 to-gray-900"></div>
        <div></div>
      </div>


  </div>
</template>

<style scoped>

.cloud {
  animation: float 20s linear infinite;
}

.cloud.cloud1 {
  top: 0%;
  left: -200px; /* Start off-screen */
  width: 250px;
  height: 150px;
  animation-duration: 25s;
}

.cloud.cloud2 {
  top: 30%;
  left: -250px; /* Start off-screen */
  width: 300px;
  height: 180px;
  animation-duration: 30s;
}

.cloud.cloud3 {
  top: 50%;
  left: -150px; /* Start off-screen */
  width: 220px;
  height: 130px;
  animation-duration: 28s;
}

@keyframes float {
  0% {
    transform: translateX(-100%); /* Start off-screen on the left */
  }
  100% {
    transform: translateX(100vw); /* End off-screen on the right */
  }
}


</style>

<script setup>
import {computed} from "vue";
import {useCityStore} from "../stores/useCityStore.ts";
import {interpolate, interpolateCircularInverse} from '../utils/index.ts'

const cityStore = useCityStore();

const hour = computed(() => {
  let date = cityStore.currentTime ?? new Date();
  let hour = date.toLocaleTimeString('fr-FR', {hour: "numeric"})
  return Number(hour.toLocaleLowerCase().replace(' h', ''));
})

const moonRotation = computed(() => {
  if (hour.value > 8 && hour.value < 20) return -1;

  if (hour.value === 8) return 180;

  return 180 - interpolateCircularInverse({
    value: hour.value,
    minInput: 8, // morning
    maxInput: 20, // night
    minOutput: 90,
    maxOutput: 180
  })
})

const sunRotation = computed(() => {
  if (moonRotation.value !== -1) return -1;
  if (hour.value < 8 || hour.value > 20) return -1;

  return interpolate({
    value: hour.value,
    minInput: 8, // morning
    maxInput: 20, // night
    minOutput: 90,
    maxOutput: 180
  })
})
const nightLayerValue = computed(() => {
  if (hour.value > 22 || hour.value < 6) return .8;
  if (hour.value > 10 && hour.value < 18) return 0;

  if (hour.value >= 18 && hour.value <= 22) {
    console.log(hour.value)
    return interpolate({
      value: hour.value,
      minInput: 18, // morning
      maxInput: 22, // night
      minOutput: 0,
      maxOutput: 100
    }) / 100

  }

  return .2
})

const getCloudStyles = (index) => {
  // Calculer les variables CSS en fonction de l'index
  const animationDuration = `${10 + index * 3}s`; // Durée de l'animation variant de 10s à 40s
  const startPosition = `${-200 - index * 100}px`; // Position de départ variant de -200px à -1200px
  const size = `${100 + index * 20}px`; // Taille des nuages variant de 100px à 300px

  return {
    '--animation-duration': animationDuration,
    '--start-position': startPosition,
    '--size': size,
  };
};

</script>
