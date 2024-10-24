<template>
  <div class="flex flex-col items-start gap-2 py-1">
    <div class="flex flex-row items-center w-full justify-between">
      <div class="font-bold flex flex-row items-center gap-1">
        <h1>Futniture Categories</h1>
      </div>

      <div class="flex flex-row items-center gap-2">
        <ManageFCategory
          :allow-multiple="false"
          :manage-data="manageData"
          type="add"
          :id="0"
          @refresh="onRefresh"
        >
          <span> Add Category </span>
        </ManageFCategory>
      </div>
    </div>

    <Table v-if="status == 'success'" class="">
      <TableHeader>
        <TableRow>
          <TableHead
            v-for="column in columns"
            :key="column.column_key"
            class="text-center bg-ten text-white cell_overflow border-[1px]"
          >
            <div
              v-if="column.column_name != null"
              class="flex flex-row items-center justify-center gap-1"
            >
              <span> {{ column.column_name }}</span>
            </div>
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        <TableRow v-for="(row, rowIndex) in data.data" :key="rowIndex">
          <TableCell
            v-for="column in columns"
            :key="column.column_key"
            class="text-center cell_overflow border-[1px] py-0"
          >
            <div
              v-if="column.column_key == 'actions'"
              class="flex flex-row items-center justify-center gap-2 py-1"
            >
              <div v-for="action in column.acitons" class="">
                <Delete
                  v-if="action.action_key == 'delete'"
                  :id="row.f_category_id"
                  :type="action.path"
                  @refresh="onRefresh"
                >
                  Delete
                </Delete>

                <ManageFCategory
                  :allow-multiple="false"
                  type="update"
                  :manage-data="row"
                  :id="row[columns[0].column_key]"
                  v-if="action.action_key == 'update'"
                  @refresh="onRefresh"
                >
                  {{ $t("update") }}
                </ManageFCategory>

                <NuxtLink
                  v-if="action.action_key == 'products'"
                  :to="`/panel/furniture/category/${row.f_category_id}`"
                  class="bg-orange-500 text-white rounded-sm py-1 px-3"
                >
                  Products
                </NuxtLink>
              </div>
            </div>
            <div
              v-else-if="column.column_key == 'image'"
              class="flex items-center justify-center p-1"
            >
              <img
                :src="`${api_url}files/${row.image}`"
                class="w-32 h-32 object-contain"
              />
            </div>
            <div v-else>
              {{ row[column.column_key] }}
            </div>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>
1

<script setup lang="ts">
import { Activity } from "lucide-vue-next";
import ManageFCategory from "~/components/ManageFCategory.vue";
import { useGet } from "~/hooks/fetch";
import type { actionType, categoryType } from "~/types/tableTypes";

const api_url = useRuntimeConfig().public.api_url;

definePageMeta({
  layout: "panel-layout",
});

const checkedDatas = ref([]);

const manageData = ref<categoryType>({
  kr_name: "",
  ar_name: "",
  en_name: "",
  image: "",
});

const columns = [
  { column_key: "f_category_id", column_name: "ID", sort: true, acitons: [] },
  {
    column_key: "image",
    column_name: "Image",
    acitons: [],
  },
  {
    column_key: "en_name",
    column_name: "En Name",
    acitons: [],
  },
  {
    column_key: "ar_name",
    column_name: "Ar Name",
    acitons: [],
  },
  {
    column_key: "kr_name",
    column_name: "Kr Name",
    acitons: [],
  },

  {
    column_key: "actions",
    column_name: "Actions",
    sort: false,
    acitons: [
      { action_key: "products", path: "" },
      { action_key: "update", path: "" },
      { action_key: "delete", path: "f_category" },
    ] as actionType[],
  },
];

const data = ref(null);
const status = ref(null);

async function fetchData() {
  checkedDatas.value = [];
  const { data: resultData, status: resultStatus }: any = await useGet(
    `f_category`
  );
  data.value = resultData.value;
  status.value = resultStatus.value;
}

fetchData();

async function onRefresh() {
  fetchData();
}
</script>
