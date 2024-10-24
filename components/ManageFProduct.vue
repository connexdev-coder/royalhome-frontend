<template>
  <Dialog v-model:open="dialogContentVisible">
    <DialogTrigger>
      <div class="bg-ten text-sixty px-3 py-1 rounded-sm w-full text-sm">
        <slot />
      </div>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          <h1 class="text-center font-bold"><slot /></h1>
        </DialogTitle>
      </DialogHeader>

      <div class="h-[300px] overflow-y-scroll">
        <form
          ref="dataForm"
          @submit.prevent="onManageData"
          class="flex flex-col gap-3"
        >
          <label for="">Name</label>
          <input
            type="text"
            v-model="manageData.name"
            name="Product Name"
            class="px-2 py-1 border-[1px] rounded-sm"
          />

          <label for="">Colors</label>
          <input
            type="text"
            v-model="manageData.colors"
            name="Colors"
            class="px-2 py-1 border-[1px] rounded-sm"
          />

          <label for="">Models</label>
          <input
            type="text"
            v-model="manageData.models"
            name="Models"
            class="px-2 py-1 border-[1px] rounded-sm"
          />

          <label for="">Price</label>
          <input
            type="number"
            :min="0"
            v-model="manageData.price"
            name="Price"
            class="px-2 py-1 border-[1px] rounded-sm"
          />

          <label for="">Discount</label>
          <input
            type="number"
            :min="0"
            v-model="manageData.discount"
            name="Discount"
            class="px-2 py-1 border-[1px] rounded-sm"
          />

          <label for="">Is Customizable?</label>
          <select
            v-model="props.manageData.is_customize"
            class="px-2 py-1 border-[1px] rounded-sm"
          >
            <option :value="false">Not Customizable</option>
            <option :value="true">Customizable</option>
          </select>

          <!-- File Upload Section -->
          <label for="fileUpload">Category Image</label>
          <input
            id="fileUpload"
            :multiple="allowMultiple"
            type="file"
            @change="onFilesChange"
            accept="image/*"
            class="py-1 px-2 border-[1px] rounded-sm"
          />

          <label for="">About</label>
          <textarea
            type="text"
            v-model="manageData.about"
            name="Name"
            class="px-2 py-1 border-[1px] rounded-sm"
          />

          <!-- Show Selected Images Preview -->
          <div v-if="previewImages.length" class="flex flex-wrap gap-2 mt-3">
            <div
              v-for="(src, index) in previewImages"
              :key="index"
              class="relative w-32 h-32"
            >
              <img :src="src" class="object-cover w-full h-full rounded" />
              <button
                @click="removeImage(index)"
                class="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
              >
                X
              </button>
            </div>
          </div>
        </form>
      </div>

      <h1 class="text-red-500">{{ warning }}</h1>

      <button
        @click="submitForm"
        class="bg-ten text-sixty rounded-sm py-2 px-3 w-full"
      >
        Submit
      </button>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useActionPost, useActionPut } from "~/hooks/actionFetch";
import { useUpload } from "~/hooks/fetch";
import type { productType } from "~/types/tableTypes";

const dialogContentVisible = ref(false);
const warning = ref("");
const dataForm = ref<any>(null);

const selectedFiles = ref<File[]>([]);
const previewImages = ref<string[]>([]);

const props = defineProps<{
  type: string;
  manageData: productType;
  id: any;
  category_id: any;
  allowMultiple: boolean; // Prop to determine if multiple files are allowed
}>();

const emit = defineEmits(["refresh"]);

function submitForm() {
  dataForm.value.dispatchEvent(new Event("submit"));
}

async function onManageData() {
  warning.value = "";

  if (selectedFiles.value.length === 0 && props.type != "update") {
    warning.value = "Please upload at least one image.";
    return;
  }

  let uploadedImages = [];
  for (const file of selectedFiles.value) {
    const { data: uploadData, status: uploadStatus } = await useUpload(
      "files/upload",
      file
    );

    if (uploadStatus.value !== "success") {
      warning.value = "Image upload failed";
      return;
    }

    uploadedImages.push(uploadData.value.data);
  }

  try {
    const response =
      props.type === "add"
        ? await useActionPost("f_product", {
            ...props.manageData,
            image: uploadedImages[0],
            f_category_id: props.category_id,
          })
        : await useActionPut(
            `f_product/${props.manageData.f_product_id}`,
            selectedFiles.value.length == 0
              ? {
                  ...props.manageData,
                }
              : {
                  ...props.manageData,
                  image: uploadedImages[0],
                }
          );

    if (response.status === 200) {
      emit("refresh", { data: response, type: props.type });
      dialogContentVisible.value = false;
    } else {
      warning.value = "An error occurred. Please try again.";
    }
  } catch (error) {
    warning.value = "An error occurred. Please try again.";
  }
}

function onFilesChange(event: Event) {
  const inputElement = event.target as HTMLInputElement;
  const files = Array.from(inputElement.files || []);

  if (props.allowMultiple) {
    selectedFiles.value = files;
  } else if (files.length > 0) {
    // If single selection is allowed, only take the first file
    selectedFiles.value = [files[0]];
  }

  previewImages.value = selectedFiles.value.map((file) =>
    URL.createObjectURL(file)
  );
}

function removeImage(index: number) {
  selectedFiles.value.splice(index, 1);
  previewImages.value.splice(index, 1);
}
</script>
