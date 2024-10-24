<template>
  <div
    class="h-full flex flex-col md:flex-row items-center justify-center gap-10 p-5 max-w-2xl w-full m-auto"
  >
    <img
      src="/assets/images/logo_dark.png"
      class="w-52"
      alt="royal home"
      srcset=""
    />
    <form
      @submit.prevent="onSubmit"
      class="w-full flex flex-col items-stretch gap-1"
    >
      <h1 class="font-bold text-center text-3xl mb-5 uppercase">Royal Home</h1>
      <input
        type="text"
        name="username"
        v-model="credentials.username"
        class="border-[1px] bg-sixty border-ten rounded-md p-2"
        placeholder="Username"
      />

      <input
        type="text"
        name="password"
        v-model="credentials.password"
        class="border-[1px] bg-sixty border-ten rounded-md p-2"
        placeholder="Password"
      />

      <span class="text-sm text-red-500 text-start">
        {{ request.warning }}
      </span>

      <input
        type="submit"
        :class="request.loading ? 'animate-pulse opacity-50' : ''"
        class="cursor-pointer bg-ten text-sixty rounded-md p-2"
        value="Login"
      />
    </form>
  </div>
</template>

<script setup lang="ts">
import { usePost } from "~/hooks/fetch";

const credentials = ref({ username: "royalhome", password: "royal123" });
const request = ref({ loading: false, warning: "" });

async function onSubmit() {
  request.value.loading = true;
  request.value.warning = "";
  const { data, error, status }: any = await usePost(
    "managers/login",
    credentials.value
  );

  request.value.loading = false;

  if (status.value == "success") {
    const token = useCookie("token", { maxAge: 10000000 });
    token.value = data.value.token;
    reloadNuxtApp();
  } else {
    request.value.warning = "Credentials Wrong";
  }
}
</script>

<style scoped>
* {
  direction: ltr;
}
</style>
