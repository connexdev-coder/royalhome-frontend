import { defineStore } from "pinia";
import { useDelete, useGet, usePost } from "@/hooks/fetch";

type managerType = {
  manager_name: string;
};

export const useProfileStore = defineStore("profile", {
  state: () => ({
    isAuthenticated: false,
    isAuthChecked: false,
    userDetails: null as any,
  }),
  actions: {
    async checkAuth() {
      if (this.isAuthChecked) return;

      try {
        const { data, error, status, refresh }: any = await useGet(
          `managers/profile`
        );

        if (status.value === "success") {
          this.isAuthenticated = true;

          if (data.value.data.length > 0) {
            this.userDetails = data.value.data[0];
          }
        }

        if (status.value == "error") {
          this.isAuthenticated = false;
          this.isAuthChecked = false;
          this.userDetails = null;

          reloadNuxtApp();
        }
      } catch (error) {
        //
      } finally {
        this.isAuthChecked = true;
      }
    },

    logout() {
      useCookie("token").value = null;
      useCookie("user-type").value = null;
      this.isAuthenticated = false;
      this.isAuthChecked = false;
      this.userDetails = null;
      reloadNuxtApp();
    },
  },
});
