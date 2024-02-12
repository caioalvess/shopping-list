<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <div class="field">
        <label for="productName">Name</label>
        <div class="input">
          <input
            required
            type="text"
            id="productName"
            v-model="productName"
            placeholder="1kg Feijão"
          />
        </div>
      </div>

      <div class="field">
        <label for="productPrice">Price</label>
        <div class="input">
          <input
            required
            type="text"
            id="productPrice"
            v-model="productPrice"
            placeholder="R$ 6,89"
          />
        </div>
      </div>
      <div class="field">
        <label for="productAmount">Amount</label>
        <div class="input">
          <input
            required
            type="string"
            id="productAmount"
            v-model="productAmount"
            placeholder="Lista de compras prezunic"
          />
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
const emit = defineEmits(["submit", "cancel"]);

const productName = defineModel<string>("name");
const productPrice = defineModel<string>("price");
const productAmount = defineModel<string>("amount");

function handleSubmit() {
  return emit("submit");
}

function handleCancel() {
  return emit("cancel");
}
</script>

<style scoped>
p {
  margin-bottom: 20px;
}

form {
  height: 100%;

  display: flex;
  flex-direction: column;
  gap: 20px;

  position: relative;
}

.action-container {
  height: 100%;

  display: flex;
  align-items: flex-end;
  gap: 20px;
}
</style>
