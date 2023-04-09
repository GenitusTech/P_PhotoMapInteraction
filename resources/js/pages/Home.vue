<template>
    <div id="page--home">
        <v-osm />
    </div>
</template>

<script>
export default {
    name: "PageHome",
    inheritAttrs: false,
    customOptions: {},
};
</script>

<script setup>
import VOsm from "../components/osm/OSM.vue";
</script>

<style lang="scss" scoped>
//
</style>
