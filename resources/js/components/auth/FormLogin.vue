<template>
    <form @submit.prevent="handleSubmit">
        <maz-phone-number-input
            @country-code="updateCountryCode"
            default-country-code="FR"
            :only-countries="['FR', 'BE', 'DE']"
            :custom-countries-list="{
                FR: 'France',
                BE: 'Belgique',
                DE: 'Allemagne',
            }"
            v-model="form.phone"
            show-code-on-list
        />
        <input
            class="form-input"
            v-model="form.password"
            type="password"
            name="password"
            placeholder="Password"
        />
        <button type="submit">Login</button>
    </form>
</template>

<script>
export default {
    name: "VFormLogin",
    inheritAttrs: false,
    customOptions: {},
};
</script>

<script setup>
import MazPhoneNumberInput from "maz-ui/components/MazPhoneNumberInput";
import { reactive } from "vue";

const emits = defineEmits(["processData"]);
const form = reactive({
    phone: "",
    country_code: "",
    password: "",
});
// const rules = {};
const updateCountryCode = (value) => {
    form.country_code = value;
};
const handleSubmit = () => {
    emits("processData", form);
};
</script>

<style lang="scss" scoped>
button {
    @apply w-full p-2 bg-blue-200 hover:bg-blue-300 rounded-md;
}
</style>
