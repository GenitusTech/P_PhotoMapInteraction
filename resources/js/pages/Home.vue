<template>
    <div>
        HOME
        <br />
        {{ getUser }}
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
import { computed } from "vue";
import { useAuthStore } from "../store/auth";

const authStore = useAuthStore();
const getUser = computed(() => {
    return authStore.getUser;
});
</script>

<style lang="scss" scoped>
//
</style>
