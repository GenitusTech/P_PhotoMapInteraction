<template>
    <div class="h-full bg-red-200">
        <l-map
            ref="map"
            :zoom="zoom"
            :center="center"
            :min-zoom="6"
            :max-zoom="17"
            :zoom-control="false"
            :options="{ zoomControl: false }"
            :max-bounds="[
                [-89, -180],
                [89, 180],
            ]"
        >
            <l-control-zoom position="topright" />
            <l-control-scale
                position="topright"
                :imperial="false"
                :metric="true"
            />
            <l-control-layers position="topleft" />
            <l-marker :lat-lng="center" />
            <l-tile-layer
                v-for="(tileProvider, key) in tileProviders"
                :key="key"
                :name="tileProvider.name"
                :visible="tileProvider.visible"
                :url="tileProvider.url"
                :attribution="tileProvider.attribution"
                layer-type="base"
            >
            </l-tile-layer>
        </l-map>
    </div>
</template>

<script>
export default {
    name: "VOsm",
    inheritAttrs: false,
    customOptions: {},
};
</script>

<script setup>
import { onMounted, ref } from "vue";
import "leaflet";
import {
    LMap,
    LControlZoom,
    LControlScale,
    LControlLayers,
    LTileLayer,
    LMarker,
} from "@vue-leaflet/vue-leaflet";

// START DEBUG
const callCount = ref(0);
// END DEBUG
const map = ref();
const zoom = ref(17);
const center = ref([48.85341, 2.3488]);
const tileProviders = [
    {
        name: "OpenStreetMap",
        visible: true,
        url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        attribution: "",
    },
    {
        name: "OpenTopoMap",
        visible: false,
        url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
        attribution: "",
    },
];
const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 2000,
};
const errorCallback = (error) => {
    console.warn("Error geolocation.watchPosition: ", error);
};
const successCallback = (position) => {
    center.value = [position.coords.latitude, position.coords.longitude];
    console.log(`Count: ${callCount.value} | ${center.value}`);
    callCount.value += 1;
};
onMounted(() => {
    if (window.localStorage.getItem("watchId") !== null) {
        navigator.geolocation.clearWatch(
            window.localStorage.getItem("watchId")
        );
    }
    navigator.geolocation.getCurrentPosition((position) => {
        center.value = [position.coords.latitude, position.coords.longitude];
        window.localStorage.setItem(
            "watchId",
            navigator.geolocation.watchPosition(
                successCallback,
                errorCallback,
                options
            )
        );
    });
});
</script>

<style lang="scss" scoped>
//
</style>
