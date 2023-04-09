import { defineStore } from "pinia";

import axios from "../plugin/axios";
// import { notify } from "@kyvg/vue3-notification";
import { useNotification } from "@kyvg/vue3-notification";
const { notify } = useNotification();
// import { useAlertStore } from '@/stores';

const baseUrl = `${import.meta.env.VITE_API_URL}`;

export const useAuthStore = defineStore({
    id: "auth",
    state: () => ({
        // initialize state from local storage to enable user to stay logged in
        user: JSON.parse(localStorage.getItem("user")),
        returnUrl: null,
    }),
    getters: {
        getUser(state) {
            return state.user;
        },
    },
    actions: {
        async login(form) {
            await axios.get(`${baseUrl}/sanctum/csrf-cookie`).then(async () => {
                try {
                    const { data, status } = await axios
                        .post(`${baseUrl}/api/auth/login`, form)
                        .catch(({ response: { data } }) => {
                            for (let key in data.errors) {
                                data.errors[key].forEach((value) => {
                                    notify({
                                        title: `${key}`.toLocaleUpperCase(),
                                        text: `${value}`,
                                        type: "warn",
                                    });
                                });
                            }
                            notify({
                                title: "Error on 'Login' Request",
                                type: "error",
                            });
                        });
                    if (status === 202) {
                        this.user = data;
                        localStorage.setItem("user", JSON.stringify(data));
                        notify({
                            title: "Login successful",
                            type: "success",
                        });
                    }
                    // redirect to previous url or default to home page
                    // router.push(this.returnUrl || '/');
                } catch (error) {
                    console.warn('Error on "Login" Request');
                }
            });
        },
        async register(form) {
            await axios.get(`${baseUrl}/sanctum/csrf-cookie`).then(async () => {
                try {
                    const { data, status } = await axios
                        .post(`${baseUrl}/api/auth/register`, form)
                        .catch(({ response: { data } }) => {
                            for (let key in data.errors) {
                                data.errors[key].forEach((value) => {
                                    notify({
                                        title: `${key}`.toLocaleUpperCase(),
                                        text: `${value}`,
                                        type: "warn",
                                    });
                                });
                            }
                            notify({
                                title: "Error on 'Register' Request",
                                type: "error",
                            });
                        });
                    if (status === 201) {
                        this.user = data;
                        localStorage.setItem("user", JSON.stringify(data));
                        notify({
                            title: "Register successful",
                            type: "success",
                        });
                    }
                } catch (error) {
                    console.warn('Error on "Register" Request');
                }
            });
            // redirect to previous url or default to home page
            // router.push(this.returnUrl || '/');
        },
        async logout() {
            await axios.get(`${baseUrl}/sanctum/csrf-cookie`).then(async () => {
                try {
                    const { status } = await axios
                        .post(`${baseUrl}/api/auth/logout`)
                        .catch(({ response: { data, status } }) => {
                            for (let key in data.errors) {
                                data.errors[key].forEach((value) => {
                                    notify({
                                        title: `${key}`.toLocaleUpperCase(),
                                        text: `${value}`,
                                        type: "warn",
                                    });
                                });
                            }
                            if (status === 401) {
                                this.user = null;
                                localStorage.removeItem("user");
                                notify({
                                    title: "Forced Logout successful",
                                    type: "warn",
                                });
                            } else {
                                notify({
                                    title: "Error on 'Logout' Request",
                                    type: "error",
                                });
                            }
                        });
                    if (status === 204) {
                        this.user = null;
                        localStorage.removeItem("user");
                        notify({
                            title: "Logout successful",
                            type: "success",
                        });
                    }
                } catch (error) {
                    console.warn('Error on "Logout" Request');
                }
                // redirect to previous url or default to home page
                // router.push(this.returnUrl || '/');
            });
        },
    },
});
