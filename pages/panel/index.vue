<template>
  <div class="flex flex-col items-start w-full gap-5"></div>
</template>

<script setup lang="ts">
import { useGet } from "~/hooks/fetch";
import type { categoryType } from "~/types/tableTypes";

let api_url = useRuntimeConfig().public.api_url;

definePageMeta({
  layout: "panel-layout",
});
</script>

<style scoped></style>
