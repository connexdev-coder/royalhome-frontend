<template>
  <div
    :style="{ direction: locale == 'en' ? 'ltr' : 'rtl' }"
    class="bg-sixty text-ten overflow-x-hidden"
  >
    <div
      :class="useRoute().path == '/' ? '' : 'max-w-[1200px] m-auto'"
      class="text-lg h-screen"
    >
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </div>
  </div>
</template>

<script setup lang="ts">
const { locale } = useI18n();

useHead({
  title: "Royal Home  ",
  meta: [{ name: "description", content: "" }],
});
</script>

<style>
.tenFilter {
  filter: invert(23%) sepia(29%) saturate(3840%) hue-rotate(199deg)
    brightness(91%) contrast(88%);
}

.whiteFilter {
  filter: invert(100%) sepia(100%) saturate(1%) hue-rotate(239deg)
    brightness(104%) contrast(101%);
}
</style>
