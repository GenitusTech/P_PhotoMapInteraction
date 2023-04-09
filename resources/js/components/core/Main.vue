<template>
    <main>
        <router-view v-slot="{ Component }">
            <keep-alive>
                <component :is="Component" />
            </keep-alive>
        </router-view>
    </main>
</template>

<script>
export default {
    name: "CoreMain",
    inheritAttrs: false,
    customOptions: {},
};
</script>

<script setup>
//
</script>

<style lang="scss" scoped>
main {
    @apply grid gap-0 grid-cols-1 grid-rows-1;
}
</style>
