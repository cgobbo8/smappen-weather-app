<script setup>
import { useCityStore } from '../stores/useCityStore.ts'
import { ref } from 'vue'

const cityStore = useCityStore()

const hasScrollToTheEnd = ref(false)
const hasScrollToTheStart = ref(true)

const computeScrollEnd = (event) => {
  hasScrollToTheEnd.value =
    event.target.scrollWidth - event.target.offsetWidth <= event.target.scrollLeft + 50
  hasScrollToTheStart.value = event.target.scrollLeft < 50
}
</script>

<template>
  <div
    v-if="cityStore"
    class="relative bg-gray-800/20 backdrop-blur-xl border border-gray-100/10 rounded-lg w-full h-40 flex flex-col overflow-hidden"
  >
    <div
      class="fixed z-10 transition ease-in duration-500 right-0 bottom-0 h-32 w-40 bg-gradient-to-l from-gray-900/40 to-transparent pointer-events-none"
      :class="{ 'opacity-0': hasScrollToTheEnd }"
    ></div>

    <div
      class="fixed z-10 transition ease-in duration-500 left-0 bottom-0 h-32 w-40 bg-gradient-to-r from-gray-900/40 to-transparent pointer-events-none"
      :class="{ 'opacity-0': hasScrollToTheStart }"
    ></div>

    <div class="text-gray-200/40 w-full p-1 pl-2 border-b border-b-gray-100/10">
      Forecast for the coming hours
    </div>
    <ul
      @scroll="computeScrollEnd"
      class="scrollbar-none flex justify-start items-center relative h-full overflow-y-hidden overflow-x-scroll"
    >
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
