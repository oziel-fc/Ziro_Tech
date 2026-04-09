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
   <div  :id="$style.disponibility" :style="{ backgroundColor: stock > 0 ? 'green' : '#c2281f'}">
        <span >
            {{ stock > 0 ? 'PRODUTO DISPONÍVEL' : 'PRODUTO INDISPONÍVEL' }}
        </span>
   </div>
  

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
    margin-top: 5px;
}
#disponibility {
    color: white;
    height: fit-content;
    width: fit-content;
    font-size: 14px;
    font-weight: 700;
    padding: 7px 5px;
    border-radius: 5px;
    margin-top: 10px;
    white-space: nowrap;
    display: inline-flex;
    align-items: center;
    line-height: 0.8;
}
.brand_info {
    margin-top: 5px;
    display: flex;
    justify-content: space-between;    
}
@media (max-width: 1350px) {
    #title {
        font-size: 24px;
    }
}
@media (max-width: 1100px) {
    #title {
        font-size: 22px;
    }
}
</style>