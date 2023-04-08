import { getCurrentInstance } from "vue";

export function useBus() {
    const vm = getCurrentInstance();
    return vm.appContext.config.globalProperties.$bus;
}
