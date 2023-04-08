<template>
    <teleport to="body">
        <transition
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            enter-active-class="transition ease-out duration-200 transform"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
            leave-active-class="transition ease-in duration-200 transform"
        >
            <div class="modal-backdrop" v-show="props.show">
                <div class="modal-center">
                    <transition
                        enter-from-class="opacity-0 translate-y-10 scale-95"
                        enter-to-class="opacity-100 translate-y-0 scale-100"
                        enter-active-class="transition ease-out duration-300 transform"
                        leave-from-class="opacity-100 translate-y-0 scale-100"
                        leave-to-class="opacity-0 translate-y-10 translate-y-0 scale-95"
                        leave-active-class="ease-in duration-200"
                    >
                        <div
                            class="modal"
                            v-show="props.show"
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="modal-headline"
                        >
                            <div class="heading">
                                <h1>{{ props.title }}</h1>
                                <button
                                    type="button"
                                    @click.stop="
                                        bus.trigger('toggleModal', {
                                            token: props.token,
                                            value: false,
                                        })
                                    "
                                >
                                    <fa-icon :icon="['fas', 'times']" />
                                </button>
                            </div>
                            <div class="content">
                                <slot />
                            </div>
                        </div>
                    </transition>
                </div>
            </div>
        </transition>
    </teleport>
</template>

<script>
export default {
    name: "VModal",
    inheritAttrs: false,
    customOptions: {},
};
</script>

<script setup>
import { useBus } from "../../composable/index";

const bus = useBus();
const props = defineProps({
    title: {
        required: true,
        type: String,
        default: "",
    },
    show: {
        required: true,
        type: Boolean,
        default: false,
    },
    token: {
        required: true,
        type: String,
        default: "",
    },
});
</script>

<style lang="scss" scoped>
.modal-backdrop {
    @apply fixed inset-0 bg-gray-800/50 overflow-y-auto;
    // @apply fixed z-[1000] inset-0 overflow-y-auto bg-black bg-opacity-50;
    & .modal-center {
        @apply flex min-h-screen justify-center items-center;
        & .modal {
            @apply w-1/2 bg-slate-200 rounded-lg overflow-hidden shadow-xl;
            & .heading {
                @apply max-h-11 mb-1 p-2 bg-slate-600 flex flex-row text-white;
                & h1 {
                    @apply uppercase text-lg font-medium flex-grow;
                }
                & button {
                    @apply bg-red-500 hover:bg-red-400 border-2 rounded-md w-8;
                }
            }
            & .content {
                @apply p-2 m-1 bg-white rounded-b-md;
            }
        }
    }
}
</style>
