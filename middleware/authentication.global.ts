// file: ~/middleware/authentication.global.ts
// import { useAuth } from "~/composables/useAuth";
import { useProfileStore } from "~/stores/users/profile_store";

export default defineNuxtRouteMiddleware(async (to) => {
  const { checkAuth } = useProfileStore();
  const { isAuthenticated } = storeToRefs(useProfileStore());

  await checkAuth();

  if (!isAuthenticated.value && to.path.startsWith("/panel")) {
    return navigateTo("/");
  }

  if (isAuthenticated.value && to.path == "/login") {
    return navigateTo("/panel");
  }
});
