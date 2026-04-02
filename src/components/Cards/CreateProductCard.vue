<script setup lang="ts">
  import { RouterLink } from 'vue-router';
  import { slugify } from '../../utils/utils';
  import { formatBRL } from '../../utils/utils';

  const props = defineProps<{
    title: string,
    img_path: string,
    price: string,
    stock: number,
    sizeWidth?: string,
    transformXFunction?: number,
    showDisponibilityTag?: boolean
  }>()

</script>

<template>
  <div :class="$style.product">
    <RouterLink :to="`/p/${slugify(title)}`">
      <div :class="$style.product_card" :style="{width: sizeWidth || '', transform: `translateX(${transformXFunction}px)`}">
        <div :class="$style.product_img">
          <img :src="img_path" :alt="title" :loading="'lazy'">
        </div>
        <div :class="$style.product_info">
          <span :id="$style.title">{{ title }}</span>
          <div :class="$style.price_stock">
            <span :id="$style.price">{{ formatBRL(price) }}</span>
            <span :id="$style.stock" v-if="showDisponibilityTag && stock === 0" :style="{backgroundColor: 'rgb(194, 40, 31)'}">INDISPONÍVEL</span>
            <span :id="$style.stock" v-if="showDisponibilityTag && stock > 0" :style="{backgroundColor: 'green'}">DISPONÍVEL</span>
          </div>
        </div>
      </div>        
    </RouterLink>
  </div>
  
</template>

<style module>
  .product {
    margin: 0;
  }
  .product_card {
    width: 100%;
    aspect-ratio: 1 / 1.259;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    overflow: hidden;
    background-color: #252525;
    transition: transform 1s cubic-bezier(0.25, 0.8, 0.25, 1)
;
  }
  .product_img {
    width: 100%;
    aspect-ratio: 1 / 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .product_img img {
    height: 96%;
    width: 96%;
    border-radius: 5px;
  }
  .product_info {
    width: 90%;
    height: 72px;
    margin-top: 5px;
    display: flex;
    flex-direction: column;
  }
  .product_info span {
    color: white;
  }
  #title {
    height: 40px;
    color: white;
    font-size: 13px;
    display: -webkit-box;         /* Necessário para o efeito de várias linhas */
    -webkit-line-clamp: 2;       /* Número máximo de linhas */
    -webkit-box-orient: vertical; /* Define a direção do corte */
    overflow: hidden;            /* Esconde o que passar da 2ª linha */
    text-overflow: ellipsis;
  }
  .price_stock {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: end;
  }
  #price {
    color: white;
    font-size: 16px;
    
  }
  #stock {
    font-size: 12px;
    font-weight: 700;
    padding: 0px 5px;
    border-radius: 5px;
    height: 20px;
  }
</style>