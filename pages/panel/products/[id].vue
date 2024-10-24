<template>
  <div class="flex flex-col items-start w-full gap-5">
    <ManageProduct
      @refresh="onRefresh"
      :manage-data="manageData"
      :id="useRoute().params.id"
      type="add"
    >
      زیادکردن
    </ManageProduct>

    <div
      v-if="status == 'success'"
      class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 w-full items-center justify-center"
    >
      <div
        v-for="item in data.data"
        class="md:h-[300px] flex flex-col items-stretch gap-2"
      >
        <img
          :src="`${api_url}images/${item.image}`"
          alt=""
          srcset=""
          class="object-cover rounded-sm h-[80%]"
        />
        <Delete @refresh="onRefresh" :id="item.product_id" type="products" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGet } from "~/hooks/fetch";
import type { productType } from "~/types/tableTypes";

let api_url = useRuntimeConfig().public.api_url;

const manageData = ref<productType>({
  image: "",
});

definePageMeta({
  layout: "panel-layout",
});

const { data, error, status, refresh } = await useGet(
  `products/${useRoute().params.id}`
);

function onRefresh() {
  refresh();
}
</script>

<style scoped></style>
