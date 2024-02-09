<template>
  <div class="container" v-for="product in data" :key="product.id">
    <div class="title">{{ product.name }}</div>
    <div class="content">
      <p>
        Price: <span>R$ {{ Number(product.price).toFixed(2) }}</span>
      </p>
      <p>
        Amount: <span>{{ product.amount }}</span>
      </p>
      <p>
        Total: <span>R$ {{ product.total }}</span>
      </p>
    </div>

    <div>
      <div class="action-container">
        <button class="btn btn-default" type="button">Check</button>
        <button class="btn btn-negative" type="button">Delete</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { MyProductsProps } from "@/modules/myProducts/types/myProductsType";

const { data } = defineProps<{ data: MyProductsProps[] }>();
</script>

<style scoped lang="scss">

.content {
  margin-top: 30px;
}
.action-container {
  height: 100%;

  flex: 1;
  display: flex;
  align-items: flex-end;
  gap: 20px;
}

span {
  font-size: 12px;
}
</style>
