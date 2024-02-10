<template>
  <div>
    <p>Do you want to edit this product? Continue changing the values.</p>
    <form @submit.prevent="handleSubmit">
      <div class="field">
        <label for="productName">Name*</label>
        <div>
          <input required type="text" id="productName" v-model="name" />
        </div>
      </div>

      <div class="field">
        <label for="productPrice">Price*</label>
        <div>
          <input required type="text" id="productPrice" v-model="price" />
        </div>
      </div>

      <div class="field">
        <label for="productAmount">Amount*</label>
        <div>
          <input required type="text" id="productAmount" v-model="amount" />
        </div>
      </div>

      <div class="action-container">
        <button class="btn btn-primary" type="submit">Submit</button>
        <button class="btn btn-negative" @click="handleCancel" type="button">
          Cancel
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";

const emit = defineEmits(["confirm", "cancel"]);
const { defaultName, defaultPrice, defaultAmount } = defineProps<{
  defaultName: string;
  defaultPrice: string;
  defaultAmount: string;
}>();

const name = defineModel<string>("name");
const price = defineModel<string>("price");
const amount = defineModel<string>("amount");

function handleSubmit() {
  return emit("confirm");
}

function handleCancel() {
  return emit("cancel");
}

onMounted(() => {
  name.value = defaultName;
  price.value = defaultPrice;
  amount.value = defaultAmount;
});
</script>

<style scoped>
.action-container {
  height: 100%;

  flex: 1;
  display: flex;
  align-items: flex-end;
  gap: 20px;
}
</style>
