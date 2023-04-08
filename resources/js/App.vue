<template>
    <div id="app-vue">
        <core-header />
        <core-main />
        <core-footer />
        <notifications position="bottom right" :duration="7000" />
    </div>
</template>

<script setup>
import CoreHeader from "./components/core/Header.vue";
import CoreMain from "./components/core/Main.vue";
import CoreFooter from "./components/core/Footer.vue";
</script>

<style lang="scss" scoped>
#app-vue {
    @apply flex flex-col min-h-screen;
    header {
        @apply h-16;
    }
    main {
        @apply flex-grow;
    }
    footer {
        @apply h-8;
    }
}
</style>
