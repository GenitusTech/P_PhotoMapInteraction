<template>
    <main class="bg-green-300">
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
//
</style>
