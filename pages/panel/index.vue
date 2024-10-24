<template>
  <div class="flex flex-col items-stretch text-start gap-2 w-full">
    <h1 class="font-bold">Admin Panel</h1>

    <!-- Furniture -->
    <h1 class="font-bold mt-4">Furniture</h1>
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
      <NuxtLink
        v-for="page in furniture_pages"
        class="aspect-square bg-ten text-overTen text-2xl h-fit w-full flex items-center justify-center rounded-md text-center"
        :to="page.route"
      >
        {{ page.name }}
      </NuxtLink>
    </div>

    <!-- Cosmetics -->
    <h1 class="font-bold mt-4">Cosmetics</h1>
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
      <NuxtLink
        v-for="page in cosmetic_pages"
        class="aspect-square bg-ten text-overTen text-2xl h-fit w-full flex items-center justify-center rounded-md text-center"
        :to="page.route"
      >
        {{ page.name }}
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
let furniture_pages = [
  {
    name: "Categories",
    route: "/panel/furniture/category",
  },
  {
    name: "Orders",
    route: "/panel/furniture/orders",
  },
];

let cosmetic_pages = [
  {
    name: "Brands",
    route: "/panel/cosmetic/brands",
  },
];

definePageMeta({
  layout: "panel-layout",
});

let api_url = useRuntimeConfig().public.api_url;

definePageMeta({
  layout: "panel-layout",
});
</script>

<style scoped></style>
