<template>
  <div v-if="data.length" class="wrapper">
    <table>
      <tr v-for="product in data" :key="product.id">
        <td class="checkbox-row">

            <input type="checkbox" checked />

        </td>
        <td>{{ product.name }}</td>
        <td>{{ product.price }}</td>
        <td>{{ product.amount }}</td>
        <td>{{ product.total }}</td>
        <td class="btn-row">
          <div class="nes-btn is-error"><i class="nes-icon close is-small"></i></div>
        </td>
      </tr>
    </table>
  </div>

  <div v-else><p>Empty</p></div>
</template>

<script setup lang="ts">
import type { MyProductsProps } from "@/modules/myProducts/types/myProductsType";

const { data } = defineProps<{ data: MyProductsProps[] }>();
</script>

<style scoped>
.wrapper {
  width: 100%;
  margin: 30px 0;
}

table {
  width: 100%;
  border-collapse: collapse;
}

tr {
  text-align: center;
}

td {
  font-size: 14px;
  border-color: black;
  border-style: solid;
  border-width: 4px;
}

button {
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
