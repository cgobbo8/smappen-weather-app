<script setup>
import { useCityStore } from '../stores/useCityStore.ts'

const cityStore = useCityStore()
</script>

<template>
  <div
    v-if="cityStore"
    class="bg-gray-800/20 backdrop-blur-xl border border-gray-100/10 rounded-lg w-full h-40 flex flex-col"
  >
    <div class="text-gray-200/40 w-full p-1 pl-2 border-b border-b-gray-100/10">
      Forecast for the coming hours
    </div>
    <ul class="scrollbar-none flex justify-start items-center relative h-full overflow-x-scroll">
      <li class="relative h-full p-4 flex flex-col justify-between items-center">
        <div class="text-xs font-black text-gray-200">Now</div>
        <img
          class="size-8"
          :src="`https://openweathermap.org/img/wn/${cityStore.selectedCity?.weather?.weather?.[0]?.icon}@2x.png`"
          alt="weather_icon"
        />
        <div class="font-bold text-gray-200">
          {{ Math.round(cityStore.selectedCity?.weather?.main?.temp) }}°
        </div>
      </li>
      <li
        v-for="weather in cityStore.forecastNextHours"
        :key="weather.dt"
        class="relative h-full p-4 flex flex-col justify-between items-center"
      >
        <div class="text-xs font-black text-gray-200">
          {{ new Date(weather.dt_txt).toLocaleTimeString('en-US').replace(':00:00 ', '') }}
        </div>
        <img
          class="size-8"
          :src="`https://openweathermap.org/img/wn/${weather.weather?.[0]?.icon}@2x.png`"
          alt="weather_icon"
        />
        <div class="font-bold text-gray-200">{{ Math.round(weather.main.temp) }}°</div>
      </li>
    </ul>
  </div>
</template>
