<template>
  <table v-if="data?.length">
    <tr v-for="product in data" :key="product.id">
      <td><input type="checkbox" /></td>
      <td>{{ product.name }}</td>
      <td>{{ product.price }}</td>
      <td>{{ product.amount }}</td>
      <td>{{ product.total }}</td>
      <td><button>X</button></td>
    </tr>
  </table>

  <div v-else><p>Empty</p></div>
</template>

<script setup lang="ts">
import type { ProductProps } from "@/modules/myProducts/types/myProductsType";

const { data } = defineProps<{ data: ProductProps[] | undefined }>();
</script>

<style scoped>
table {
  margin: 30px 0;
  font-family: arial, sans-serif;
  width: 100%;
  border-collapse: collapse;
}

td {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}
</style>
