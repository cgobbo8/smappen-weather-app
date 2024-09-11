<template>
  <div
    class="rounded-lg overflow-hidden w-full aspect-square md:aspect-video"
    :style="{ filter: isDarkMap ? 'invert(1) hue-rotate(180deg) grayscale(0.7)' : '' }"
  >
    <l-map
      ref="map"
      :zoom="10"
      :useGlobalLeaflet="false"
      v-model:center="mapPosition"
      @click="dispatchLatLonChange"
    >
      <l-control-layers />
      <l-marker
        v-if="cityStore.currentLatLon"
        :lat-lng="[cityStore.currentLatLon.lat, cityStore.currentLatLon.lon]"
      ></l-marker>

      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        layer-type="base"
        name="OpenStreetMap"
      ></l-tile-layer>
    </l-map>
  </div>
</template>

<script setup lang="ts">
import 'leaflet/dist/leaflet.css'
import { LControlLayers, LMap, LMarker, LTileLayer } from '@vue-leaflet/vue-leaflet'
import { useCityStore } from '@/stores/useCityStore'
import { computed, ref, watch } from 'vue'
import { TOULOUSE_LAT_LNG } from '@/libs/constants'

const cityStore = useCityStore()

const map = ref<LMap | null>(null)
const mapPosition = ref([+TOULOUSE_LAT_LNG.lat, +TOULOUSE_LAT_LNG.lon])

watch(
  () => cityStore.currentLatLon,
  (value) => {
    if (!value) return
    mapPosition.value = [value.lat, value.lon]
  }
)

const dispatchLatLonChange = (event: {
  latlng: { lat: number; lng: number; wrap: () => { lat: number; lng: number } }
}) => {
  cityStore.dispatchLatLonChange({ lat: event.latlng.wrap().lat, lon: event.latlng.wrap().lng })
}

const isDarkMap = computed(() => {
  let date = cityStore.currentTime ?? new Date()
  let hour = date.toLocaleTimeString('fr-FR', { hour: 'numeric' })
  const hourNum = Number(hour.toLocaleLowerCase().replace(' h', ''))
  return hourNum < 6 || hourNum > 22
})
</script>
