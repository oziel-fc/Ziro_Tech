<script setup lang="ts">
  import { RouterLink } from 'vue-router';
  import { slugify } from '../../utils/slugify';

  const props = defineProps<{
    title: string,
    img_path: string,
    price: string
  }>()

</script>

<template>
  <div :class="$style.product">
    <RouterLink :to="`/p/${slugify(title)}`">
      <div :class="$style.product_card">
        <div :class="$style.product_img">
          <img :src="img_path" :alt="title">
        </div>
        <div :class="$style.product_info">
          <span :id="$style.title">{{ title }}</span>
          <span :id="$style.price">{{ price }}</span>
        </div>
      </div>        
    </RouterLink>
  </div>
  
</template>

<style module>
  .product {

  }
  .product_card {
    width: 330px;
    height: 415px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    overflow: hidden;
    background-color: #252525;
;
  }
  .product_img {
    height: 330px;
    width: 330px;
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
  #price {
    color: white;
    font-size: 16px;
  }
</style>