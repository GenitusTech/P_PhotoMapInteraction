<template>
    <footer>
        <span>{{ "------" }}</span>
        <span>{{ "FOOTER" }}</span>
        <span>&copy; {{ currentYear }}</span>
    </footer>
</template>

<script>
export default {
    name: "CoreFooter",
    inheritAttrs: false,
    customOptions: {},
};
</script>

<script setup>
const currentYear = new Date().getFullYear();
</script>

<style lang="scss">
footer {
    @apply grid grid-flow-row gap-0 grid-rows-1 grid-cols-3;
    grid-template-columns: 1fr 2fr 1fr;
    & span {
        @apply flex items-center px-2;
    }
    & span:nth-child(1) {
        @apply justify-start;
    }
    & span:nth-child(2) {
        @apply justify-center;
    }
    & span:nth-child(3) {
        @apply justify-end;
    }
}
</style>
