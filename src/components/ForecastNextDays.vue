<template>
  <div
    class="col-span-3 lg:col-span-1 h-full bg-gray-800/20 backdrop-blur-xl border border-gray-100/10 rounded-lg"
  >
    <div class="text-gray-200/40 w-full p-1 pl-2 border-b border-b-gray-100/10">
      Forecast for the coming days
    </div>
    <ul class="mt-4 flex flex-col">
      <li v-for="(forecast, index) in cityStore.forecastNextDays" :key="forecast.day" class="">
        <div class="flex items-center justify-between mx-4 py-2 border-b border-gray-100/20" :class="{'pt-0': index === 0, 'border-b-0' : index === cityStore.forecastNextDays?.length - 1}">
          <div class="font-bold text-white w-10">{{ forecast.day }}.</div>
          <div class="w-10 grid place-items-center">
            <img
                class="size-8"
                :src="`https://openweathermap.org/img/wn/${forecast.mostFrequentIcon}@2x.png`"
                alt="weather_icon"
            />
          </div>

          <div class="flex justify-between items-center gap-2">
            <div class="font-bold w-8 text-right text-gray-200/60">
              {{ Math.floor(forecast.minTemp) }}°
            </div>
            <div
              :class="`rounded-full w-20 h-2`"
              :style="{
                backgroundImage: `linear-gradient(90deg, hsl(${Math.floor(forecast.minTempHue)},77%,62%) 0%, hsl(${Math.floor(forecast.maxTempHue)},77%,62%) 100%)`
              }"
            ></div>
            <div class="text-white w-6 font-bold">{{ Math.ceil(forecast.maxTemp) }}°</div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import {useCityStore} from '../stores/useCityStore.ts'

const cityStore = useCityStore()
</script>
