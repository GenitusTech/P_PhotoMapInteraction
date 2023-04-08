import { defineStore } from "pinia";

import axios from "../plugin/axios";
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
            try {
                await axios
                    .get(`${baseUrl}/sanctum/csrf-cookie`)
                    .then(async () => {
                        const { data, status } = await axios
                            .post(`${baseUrl}/api/auth/login`, form)
                            .catch(({ response: { data } }) => {
                                for (let key in data.errors) {
                                    data.errors[key].forEach((value) => {
                                        console.warn(key, ": ", value);
                                    });
                                }
                            });
                        if (status === 202) {
                            this.user = data;
                            localStorage.setItem("user", JSON.stringify(data));
                        }
                        // redirect to previous url or default to home page
                        // router.push(this.returnUrl || '/');
                    });
            } catch (error) {
                console.warn('Error on "Login" Request');
            }
        },
        async register(form) {
            try {
                await axios
                    .get(`${baseUrl}/sanctum/csrf-cookie`)
                    .then(async () => {
                        const { data, status } = await axios
                            .post(`${baseUrl}/api/auth/register`, form)
                            .catch(({ response: { data } }) => {
                                for (let key in data.errors) {
                                    data.errors[key].forEach((value) => {
                                        console.warn(key, ": ", value);
                                    });
                                }
                            });
                        if (status === 201) {
                            this.user = data;
                            localStorage.setItem("user", JSON.stringify(data));
                        }
                    });
            } catch (error) {
                console.warn('Error on "Register" Request');
            }
            // redirect to previous url or default to home page
            // router.push(this.returnUrl || '/');
        },
        async logout() {
            try {
                await axios
                    .get(`${baseUrl}/sanctum/csrf-cookie`)
                    .then(async () => {
                        const { status } = await axios
                            .post(`${baseUrl}/api/auth/logout`)
                            .catch(({ response: { data } }) => {
                                for (let key in data.errors) {
                                    data.errors[key].forEach((value) => {
                                        console.warn(key, ": ", value);
                                    });
                                }
                            });
                        if (status === 204) {
                            this.user = null;
                            localStorage.removeItem("user");
                        }
                        // redirect to previous url or default to home page
                        // router.push(this.returnUrl || '/');
                    });
            } catch (error) {
                console.warn('Error on "Logout" Request');
            }
        },
    },
});
