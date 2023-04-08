<template>
    <form @submit.prevent="handleSubmit">
        <p>Are you sure you want to leave?</p>
        <button type="submit">Logout</button>
    </form>
</template>

<script>
export default {
    name: "VFormLogout",
    inheritAttrs: false,
    customOptions: {},
};
</script>

<script setup>
const emits = defineEmits(["processData"]);
const handleSubmit = () => {
    emits("processData");
};
</script>

<style lang="scss" scoped>
p {
    @apply text-center text-lg italic;
}
button {
    @apply w-full p-2 bg-blue-200 hover:bg-blue-300 rounded-md;
}
</style>
