<template>
  <div class="wrapper">
    <form @submit.prevent="handleSubmit">
      <div class="nes-field">
        <label for="productName">Name</label>
        <input
          class="nes-input"
          required
          type="text"
          id="productName"
          v-model="productName"
          placeholder="1kg Feijão"
        />
      </div>

      <div class="nes-field">
        <label for="productPrice">Price</label>
        <input
          class="nes-input"
          required
          type="text"
          id="productPrice"
          v-model="productPrice"
          placeholder="R$ 6,89"
        />
      </div>
      <div class="nes-field">
        <label for="productAmount">Amount</label>
        <input
          class="nes-input"
          required
          type="string"
          id="productAmount"
          v-model="productAmount"
          placeholder="Lista de compras prezunic"
        />
      </div>

      <div class="action-container">
        <button class="nes-btn is-primary" type="submit">Submit</button>
        <button class="nes-btn is-error" @click="handleCancel" type="button">
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
.wrapper {
  height: 100%;

  flex: 1;
  display: flex;
  flex-direction: column;
}

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

  flex: 1;
  display: flex;
  align-items: flex-end;
  gap: 20px;

  padding: 20px 0;
}
</style>
