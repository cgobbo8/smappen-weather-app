<script setup lang="ts">
import CountryInput from "../components/CountryInput.vue";
import Map from "@/components/Map.vue";
import CurrentWeather from "../components/CurrentWeather.vue";
import {useCityStore} from "../stores/useCityStore";
import Wallpaper from "@/components/Wallpaper.vue";
import {computed} from "vue";
const cityStore = useCityStore();

const date = computed(() => {
  if (cityStore.currentTime) {
    return cityStore.currentTime?.toLocaleString("en-US", {month: "long", day: "numeric", year: "numeric", hour: '2-digit', minute: '2-digit'});

  } else {
    return new Date().toLocaleString("en-US", {month: "long", day: "numeric", year: "numeric"});
  }
})

</script>

<template>
  <main class="relative min-h-screen w-full ">
    <Wallpaper/>
    <div class="absolute flex w-full top-0 left-0 justify-between py-4 px-4 items-center">
      <div class="text-gray-100/60">{{ date }}</div>
      <CountryInput />
    </div>

    <div class="flex w-full flex-col items-center justify-center">
      <div class="flex flex-col gap-8 max-w-6xl w-[80vw] mt-20">
        <CurrentWeather/>
        <div class="bg-gray-800 border border-gray-100/10 rounded-lg w-full h-40  flex flex-col ">
          <div class="text-gray-200/40 w-full p-1 pl-2 border-b border-b-gray-100/10">Forecast for the coming hours</div>
          <ul class="scrollbar-none flex justify-start items-center relative h-full overflow-x-scroll">
            <li class="relative h-full  p-4 flex flex-col justify-between items-center">
              <div class="text-xs font-black">Now</div>
              <img class="size-8"
                   :src="`https://openweathermap.org/img/wn/${cityStore.selectedCity?.weather?.weather?.[0]?.icon}@2x.png`"
                   alt="weather_icon"/>
              <div class="font-bold">{{Math.round(cityStore.selectedCity?.weather?.main?.temp)}}°</div>
            </li>
            <li v-for="weather in cityStore.forecastNextHours" class="relative h-full  p-4 flex flex-col justify-between items-center">
              <div class="text-xs font-black">{{new Date(weather.dt_txt).toLocaleTimeString('en-US').replace(':00:00 ', '')}}</div>
              <img class="size-8"
                   :src="`https://openweathermap.org/img/wn/${weather.weather?.[0]?.icon}@2x.png`"
                   alt="weather_icon"/>
              <div class="font-bold">{{Math.round(weather.main.temp)}}°</div>
            </li>
          </ul>
        </div>
        <div class="grid gap-8 grid-cols-3 mb-20">
          <div class="col-span-1 h-full bg-gray-800 border border-gray-100/10 rounded-lg">
            <div class="text-gray-200/40 w-full p-1 pl-2 border-b border-b-gray-100/10">Forecast for the coming days</div>
            <ul class="mt-4 flex flex-col gap-2">
              <li v-for="forecast in cityStore.forecastNextDays">
                <div class="flex items-center justify-between mx-4">
                  <div class="font-bold text-white">{{ forecast.day }}.</div>
                  <img class="size-8"
                       :src="`https://openweathermap.org/img/wn/${forecast.mostFrequentIcon}@2x.png`"
                       alt="weather_icon"/>
                  <div class="flex justify-between items-center gap-2">
                    <div class="font-bold w-8 text-right">{{Math.floor(forecast.minTemp)}}°</div>
                    <div
                        :class="`rounded-full w-20 h-2`"
                      :style="{backgroundImage: `linear-gradient(90deg, hsl(${Math.floor(forecast.minTempHue)},77%,62%) 0%, hsl(${Math.floor(forecast.maxTempHue)},77%,62%) 100%)`}"
                    ></div>
                    <div class="text-white w-6 font-bold">{{Math.ceil(forecast.maxTemp)}}°</div>
                  </div>

                </div>
              </li>
            </ul>
          </div>
          <div class="col-span-2 ">
            <Map />
          </div>
        </div>
      </div>
    </div>




  </main>
</template>
