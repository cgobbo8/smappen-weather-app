<script setup lang="ts">
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LControlLayers, LMarker } from "@vue-leaflet/vue-leaflet";
import {useCityStore} from "@/stores/useCityStore";
import { watch, ref } from 'vue'
import {ToulouseLatLng} from "@/libs/constants";

const cityStore = useCityStore()

const map = ref<LMap | null>(null);
const mapPosition = ref([+ToulouseLatLng.lat, +ToulouseLatLng.lon]);


watch(() => cityStore.currentLatLon, (value) => {
  if (!value) return
  mapPosition.value = [value.lat, value.lon]
})

const dispatchLatLonChange = (event: {latlng: {lat: number, lng: number}}) => {
  cityStore.dispatchLatLonChange({lat: event.latlng.lat, lon: event.latlng.lng});
};

</script>



<template>
  <div class="rounded-lg overflow-hidden w-full aspect-video">

  <l-map ref="map" :zoom="10" v-model:center="mapPosition" @click="dispatchLatLonChange" >
    <l-control-layers />
    <l-marker v-if="cityStore.currentLatLon" :lat-lng="[cityStore.currentLatLon.lat, cityStore.currentLatLon.lon]"></l-marker>


    <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        layer-type="base"
        name="OpenStreetMap"
    ></l-tile-layer>
  </l-map>
  </div>
</template>

<style scoped>

</style>
