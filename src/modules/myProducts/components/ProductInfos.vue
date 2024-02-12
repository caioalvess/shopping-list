<template>
  <div class="info">
    <div class="title">Informations</div>
    <div class="info-box">
      <span>Total value: </span><span>R$ {{ totalValue }}</span>
    </div>
    <div class="info-box">
      <span>Remaining products: </span><span>{{ remainingProducts }}</span>
    </div>
    <div class="info-box">
      <span>Amount: </span><span>{{ amount }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
const { totalValue, remainingProducts, amount } = defineProps<{
  totalValue: string;
  remainingProducts: number;
  amount: number;
}>();
</script>

<style scoped lang="scss">
.info-box {
  display: flex;
  flex-direction: column;
  gap: 10px;
  span {
    font-size: 13px;
  }
}
</style>
