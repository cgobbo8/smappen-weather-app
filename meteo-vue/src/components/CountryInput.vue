<script setup lang="ts">
import { ref, watch } from 'vue'
import {useCityStore} from "@/stores/useCityStore";
import { useDebounceFn } from '@vueuse/core'
import type {City} from "@/types/city";

const cityStore = useCityStore()

let inputValue = ref('')

const dispatchCitiesLoading = useDebounceFn(() => {
  cityStore.dispatchLoadCities(inputValue.value)
}, 800)

watch(inputValue, (value) => {
  !!value?.length && dispatchCitiesLoading()
})

const isPanelOpen = ref(false)

const openPanel = () => {
  isPanelOpen.value = true
}

const onInputBlur = (event: FocusEvent) => {
  if ((event?.relatedTarget as HTMLDivElement | null)?.hasAttribute('data-panel')) return;
  closePanel();
}

const closePanel = () => {
  isPanelOpen.value = false;
}

const selectCity = (city: City) => {
  cityStore.dispatchSelectCity(city);
  inputValue.value = '';
  closePanel();
  cityStore.cleanCities();
}
</script>

<template>
  <div class="relative">
    <input @focus="openPanel" @blur="onInputBlur" placeholder="Please enter a city" class="shadow bg-gray-800 appearance-none border border-gray-700 rounded w-80 py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:border-blue-600 focus:shadow-outline" type="text" v-model="inputValue" />
    <div v-if="true" @blur="closePanel" data-panel tabindex="0" class="absolute top-[calc(100%+1rem)] max-h-60 overflow-x-scroll bg-gray-800 shadow-xl w-full rounded-md">
      <ul class="overflow-y-auto h-full">
        <li @click="() => selectCity(city)"  v-for="(city, i) in cityStore.loadedCities" :key="city.name + i" class="p-2" :class="{'border-b border-gray-700 hover:bg-gray-500 cursor-pointer': i !== cityStore.loadedCities.length - 1}">{{ city.label }}</li>
      </ul>
    </div>
  </div>
</template>

