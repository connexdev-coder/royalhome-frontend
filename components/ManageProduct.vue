<template>
  <Dialog v-model:open="dialogContentVisible">
    <DialogTrigger>
      <div class="bg-ten text-sixty p-2 rounded-lg w-full">
        <slot />
      </div>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          <h1 class="text-center font-bold"><slot /></h1>
        </DialogTitle>
        <DialogDescription> </DialogDescription>
      </DialogHeader>

      <div class="max-h-[300px] md:max-h-[500px] overflow-y-scroll">
        <form
          ref="dataForm"
          @submit.prevent="onManageDriver"
          class="flex flex-col gap-1"
        >
          <label
            for="dropzone-file"
            class="flex flex-row gap-3 items-center justify-start p-5 border-[1px] border-[#3E72F6] border-dashed rounded-xl w-full cursor-pointer relative overflow-clip"
          >
            <span>هەڵبژاردنی وێنە</span>

            <input
              id="dropzone-file"
              type="file"
              class="hidden"
              @change="onFileChange"
            />
          </label>

          <img
            v-if="props.manageData.image != ''"
            :src="`${api_url}images/${props.manageData.image}`"
            alt=""
            srcset=""
            class="aspect-[16/9] h-[200px] rounded-md object-contain"
          />

          <img
            v-if="previewImage"
            :src="previewImage"
            class="aspect-[16/9] h-[200px] object-contain rounded-xl"
          />
        </form>
      </div>

      <h1 class="text-red-500">{{ warning }}</h1>

      <button
        @click="submitForm"
        class="bg-sixty text-ten rounded-lg py-2 px-3 w-full"
      >
        <slot />
      </button>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useActionPost, useActionPut } from "~/hooks/actionFetch";
import { useUpload } from "~/hooks/fetch";
import type { categoryType, productType } from "~/types/tableTypes";

let api_url = useRuntimeConfig().public.api_url;

const warning = ref("");
const image = ref("");
const dataForm = ref<any>("");

const selectedImage = ref<File | null>(null);
const previewImage = ref<any>(null);
const imageToRemove = ref<string>("");

const props = defineProps<{
  type: string;
  manageData: productType;
  id: any;
}>();

function submitForm() {
  dataForm.value.dispatchEvent(new Event("submit"));
}

const emit = defineEmits(["refresh"]);

async function onManageDriver() {
  warning.value = "";

  if (selectedImage.value) {
    const { data: uploadData, status: uploadStatus }: any = await useUpload(
      "images/upload",
      selectedImage.value
    );

    if (uploadStatus.value != "success") {
      warning.value = "Image is required";
      return;
    }
    imageToRemove.value = props.manageData.image;
    props.manageData.image = uploadData.value.data;
  }

  try {
    const response = await useActionPost("products", {
      ...props.manageData,
      category_id: props.id,
    });

    if (response.status == 200) {
      emit("refresh", { data: response, type: props.type });
      dialogContentVisible.value = false;
    } else {
      warning.value = "هەڵەیەک ڕوویدا، تکایە دووبارە هەوڵبدەرەوە";
    }
  } catch (error) {
    warning.value = warning.value = "هەڵەیەک ڕوویدا، تکایە دووبارە هەوڵبدەرەوە";
  }
}

const dialogContentVisible = ref(false);

function onFileChange(event: Event) {
  if (!event.target) return;

  const inputElement = event.target as HTMLInputElement;
  const file = inputElement.files?.[0];

  if (!file) {
    if (selectedImage.value == null) {
      warning.value = "Image is required";
    }
    return;
  }

  if (!file.type.startsWith("image/")) {
    warning.value = "File must be an image";
    return;
  }

  warning.value = "";
  selectedImage.value = file;
  previewImage.value = URL.createObjectURL(file);
}
</script>
