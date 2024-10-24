<template>
  <Dialog>
    <DialogTrigger>
      <div
        class="bg-destructive text-sixty px-3 py-1 rounded-sm w-full text-sm"
      >
        Delete
      </div>
    </DialogTrigger>
    <DialogContent>
      <h1 class="text-center">دڵنیایت لە ئەنجامدانی؟</h1>
      <DialogClose> لابردن </DialogClose>
      <button
        @click="deleteItem"
        class="bg-red-500 text-white rounded-lg py-2 px-3"
      >
        بەڵێ
      </button>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { useDelete } from "~/hooks/fetch";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useActionDelete } from "~/hooks/actionFetch";

const props = defineProps<{
  type: string;
  id: number;
}>();

const emit = defineEmits(["refresh"]);

async function deleteItem() {
  const response = await useActionDelete(`${props.type}/${props.id}`);
  if (response.status == 200) {
    emit("refresh", { data: response, type: props.type });
  }
}
</script>
