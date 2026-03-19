<script setup lang="ts">
  import { formatBRL, capitalize } from '../../../utils/utils';

  const props = defineProps<{
    name: string
    brand: string
    model: string
    stock: number
    price: string
  }>();
</script>

<template>
  <h1 :id="$style.title">
      {{ name }}
  </h1>
  <!-- Stock Verification and Style -->
  <span :id="$style.disponibility" :style="{ color: stock > 0 ? 'green' : 'red' }">
      {{ stock > 0 ? 'PRODUTO DISPONÍVEL' : 'PRODUTO INDISPONÍVEL' }}
  </span>

  <span :id="$style.price">
      {{ formatBRL(price) }}
  </span>

  <!-- Brand and Model Info -->
  <div :class="$style.brand_info">
      <span :id="$style.brand">
          Marca:
          <RouterLink :to="`/search/${brand}`" :style="{ textDecoration: 'none', color: 'inherit'}">
              <span><strong>{{ capitalize(brand) }}</strong></span>
          </RouterLink>
      </span>
      <span :id="$style.model">
          Modelo: 
          <strong><span>{{ model }}</span></strong>
      </span>
  </div>
</template>

<style module>
#title {
    font-size: 25px;
    font-weight: 800;
    line-height: 24px;
}
#price {
    font-size: 20px;
    font-weight: 800;
}
#disponibility {
    font-weight: 700;
    margin-top: 10px;
}
.brand_info {
    margin-top: 5px;
    display: flex;
    justify-content: space-between;    
}
</style>