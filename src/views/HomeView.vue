<script setup lang="ts">
import CountryInput from '@/components/CountryInput.vue'
import Map from '@/components/Map.vue'
import CurrentWeather from '@/components/CurrentWeather.vue'
import { useCityStore } from '@/stores/useCityStore'
import Wallpaper from '@/components/Wallpaper.vue'
import ForecastNextDays from '@/components/ForecastNextDays.vue'
import ForecastNextHours from '@/components/ForecastNextHours.vue'

import { FULL_TIME_CONFIG } from '@/libs/constants'

import { computed } from 'vue'
import LottieAnimation from 'lottie-vuejs/src/LottieAnimation.vue'

const cityStore = useCityStore()

const date = computed(() => {
  if (cityStore.currentTime) {
    return cityStore.currentTime?.toLocaleString('en-US', { ...FULL_TIME_CONFIG })
  } else {
    return new Date().toLocaleString('en-US', { ...FULL_TIME_CONFIG })
  }
})
</script>

<template>
  <main class="relative min-h-screen w-full">
    <Wallpaper />
    <div v-if="!cityStore.isFirstPlaceLoaded" class="grid h-screen w-screen place-content-center">
      <lottie-animation
        path="../src/assets/lottie/loader-weather.json"
        :speed="1"
        :loop="true"
        :auto-play="true"
        :width="200"
      />
    </div>
    <template v-else>
      <div
        class="absolute flex flex-col gap-4 mt-8 sm:mt-0 sm:gap-0 sm:flex-row sm:justify-between items-center justify-center w-full top-0 left-0 py-4 px-4"
      >
        <div class="text-gray-100/60">{{ date }}</div>
        <CountryInput />
      </div>

      <div class="flex w-full flex-col items-center justify-center">
        <div class="flex flex-col gap-8 max-w-6xl w-[80vw] mt-52 sm:mt-20">
          <CurrentWeather />
          <ForecastNextHours />
          <div class="grid gap-8 grid-cols-3 mb-20">
            <ForecastNextDays />
            <div class="col-span-3 lg:col-span-2">
              <Map />
            </div>
          </div>
        </div>
      </div>
    </template>
  </main>
</template>
