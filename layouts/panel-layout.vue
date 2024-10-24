<template>
  <div style="direction: ltr" class="flex flex-col items-center">
    <!-- Header -->
    <div
      class="bg-sixty text-overSixty border-b-[0.5px] w-full flex flex-row items-center justify-between px-3 py-2"
    >
      <h1 class="font-bold" v-if="userDetails != null">
        {{ userDetails.name }}
      </h1>

      <button
        @click="logout"
        class="text-destructive px-2 py-1 rounded-lg text-sm"
      >
        LOGOUT
      </button>
    </div>

    <!-- Content -->
    <div class="overflow-y-auto overflow-x-clip h-full w-full">
      <div class="p-5 h-full w-full">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useProfileStore } from "~/stores/users/profile_store";

const { logout } = useProfileStore();
const { userDetails } = storeToRefs(useProfileStore());
</script>
