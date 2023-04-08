<template>
    <div>
        <button
            v-if="isLoggedIn"
            type="button"
            class="btn-auth"
            @click.stop="toggleModal({ token: 'modalLogout', value: true })"
        >
            <fa-icon :icon="['fas', 'user']" size="lg" />
        </button>
        <button
            v-else
            type="button"
            class="btn-auth"
            @click.stop="toggleModal({ token: 'modalAuth', value: true })"
        >
            <fa-icon :icon="['far', 'user']" size="lg" />
        </button>
        <v-modal
            :title="'Logout'"
            :show="showModalLogout"
            :token="'modalLogout'"
        >
            <v-form-logout @process-data="logoutRequest" />
        </v-modal>
        <v-modal
            :title="'Login / Register'"
            :show="showModalAuth"
            :token="'modalAuth'"
        >
            <div class="switcher">
                <input
                    v-model="switchAuth"
                    type="radio"
                    name="login"
                    value="login"
                />
                <input
                    v-model="switchAuth"
                    type="radio"
                    name="register"
                    value="register"
                />
                <button class="auth-login" @click.stop="switchAuth = 'login'">
                    LOGIN
                </button>
                <button
                    class="auth-register"
                    @click.stop="switchAuth = 'register'"
                >
                    REGISTER
                </button>
            </div>
            <v-form-login
                v-show="switchAuth === 'login'"
                @process-data="loginRequest"
            />
            <v-form-register
                v-show="switchAuth === 'register'"
                @process-data="registerRequest"
            />
        </v-modal>
    </div>
</template>

<script>
export default {
    name: "VAuth",
    inheritAttrs: false,
    customOptions: {},
};
</script>

<script setup>
import { onMounted, ref, onBeforeUnmount, computed } from "vue";
import VModal from "../modal/Modal.vue";
import { useBus } from "../../composable/index";
import VFormLogout from "./FormLogout.vue";
import VFormLogin from "./FormLogin.vue";
import VFormRegister from "./FormRegister.vue";
import { useAuthStore } from "../../store/auth";

const bus = useBus();
const authStore = useAuthStore();
const switchAuth = ref("login");
const showModalAuth = ref(false);
const showModalLogout = ref(false);
const isLoggedIn = computed(() => {
    return !!authStore.getUser;
});
const toggleModal = (data) => {
    switch (data.token) {
        case "modalAuth":
            showModalAuth.value = data.value;
            break;
        case "modalLogout":
            showModalLogout.value = data.value;
            break;
        default:
            showModalAuth.value = false;
            showModalLogout.value = false;
            break;
    }
};
onMounted(() => {
    bus.on("toggleModal", toggleModal);
});
onBeforeUnmount(() => {
    bus.off("toggleModal", toggleModal);
});
const logoutRequest = async () => {
    await authStore.logout();
    toggleModal({ token: "modalLogout", value: false });
};
const loginRequest = async (values) => {
    const { country_code, phone, password } = values;
    await authStore.login({ country_code, phone, password });
    toggleModal({ token: "modalAuth", value: false });
};
const registerRequest = async (values) => {
    const { phone, password, country_code, password_confirmation } = values;
    await authStore.register({
        phone,
        password,
        country_code,
        password_confirmation,
    });
    toggleModal({ token: "modalAuth", value: false });
};
</script>

<style lang="scss" scoped>
.btn-auth {
    @apply border-2 rounded-full w-10 h-10 hover:text-slate-300;
}
.switcher {
    @apply h-8 flex flex-row mb-4;
    button {
        @apply flex-1 mx-1 border-2 rounded-md;
    }
    input[type="radio"] {
        @apply hidden;
    }
    input[name="login"] ~ button {
        @apply bg-slate-400;
    }
    input[name="login"]:checked ~ button.auth-login,
    input[name="register"]:checked ~ button.auth-register {
        @apply bg-slate-600 text-white;
    }
}
</style>
