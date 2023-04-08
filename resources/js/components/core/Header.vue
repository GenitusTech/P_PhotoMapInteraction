<template>
    <header>
        <div class="logo">
            <img :src="placeholderLogo" alt="placeholder-logo" />
        </div>
        <nav>NAVIGATION</nav>
        <v-auth />
    </header>
</template>

<script>
export default {
    name: "CoreHeader",
    inheritAttrs: false,
    customOptions: {},
};
</script>

<script setup>
import placeholderLogo from "../../assets/core/logo.png";
import VAuth from "../auth/Auth.vue";
</script>

<style lang="scss" scoped>
header {
    @apply grid grid-flow-row gap-0 grid-rows-1 grid-cols-3;
    grid-template-columns: 1fr 4fr 1fr;
    & * {
        @apply flex items-center px-2;
    }
    & :nth-child(1) {
        @apply justify-start;
    }
    & :nth-child(2) {
        @apply justify-center;
    }
    & :nth-child(3) {
        @apply justify-end;
    }
    div.logo img {
        @apply h-full object-contain py-1;
    }
    nav {
        @apply border-x;
    }
}
</style>
