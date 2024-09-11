<template>
  <div id="temperature" v-if="cityStore.selectedCity" class="w-full">
    <div id="city" class="flex-col items-center justify-center">
      <div class="text-center text-xs font-medium text-gray-200/60">City</div>
      <div class="text-center text-3xl font-medium text-gray-200">
        {{ cityStore.selectedCity.city?.locality }},
        {{ cityStore.selectedCity.city?.country }}
      </div>
      <div v-if="cityStore.selectedCity?.city?.address" class="text-center text-gray-200/40">
        {{ cityStore.selectedCity.city?.housenumber }} {{ cityStore.selectedCity.city?.address }}
      </div>
    </div>
    <div class="mt-8 flex flex-col items-center">
      <div class="text-8xl font-thin tracking-tighter text-gray-200">
        {{ Math.round(cityStore.selectedCity?.weather?.main?.temp) }}°
      </div>
      <img
        class="size-20"
        :src="`https://openweathermap.org/img/wn/${cityStore.selectedCity?.weather?.weather?.[0]?.icon}@2x.png`"
        alt="weather_icon"
      />
      <div class="capitalize text-gray-200/60">{{ cityStore.selectedCity?.weather?.weather?.[0]?.description }}</div>
    </div>
  </div>
  <div v-else class="text-center text-3xl text-gray-600">Please enter a city</div>
</template>

<script setup>
import { useCityStore } from '../stores/useCityStore.ts'

const cityStore = useCityStore()
</script>
