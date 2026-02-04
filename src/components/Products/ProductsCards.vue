<script setup lang="ts">
  import { useRoute } from 'vue-router';
  import CreateProductCard from './CreateProductCard.vue';
  import { ref, onMounted, watch } from 'vue';
  import { slugify } from '../../utils/slugify';

  const route = useRoute()

  interface ProductSimple {
    shopee: {
      name: string;
      category: string;
      subcategory: string;
      price: string;
      images: string[];
    } | null;
  }

  const RAWDataProducts = ref<ProductSimple[]>([])
  const filteredDataProducts = ref<ProductSimple[]>([])

  const loadData = async () => {
    try {
      const url = 'https://raw.githubusercontent.com/oziel-fc/products_ziro/refs/heads/master/products.json'
      
      const response = await fetch(url)
      const rawJSON = await response.json()
      
      RAWDataProducts.value = rawJSON
      // console.log(RAWDataProducts.value)
    } catch (err) {
      console.error("Error while searching for JSON: ", err)
    }
  }

  watch(
    () => route.params,
    (currentRoute) => {
      filteredDataProducts.value = RAWDataProducts.value.filter(
          product => slugify(product.shopee?.subcategory || '') == currentRoute.subcategory
      );
      console.log(filteredDataProducts)
    },
    { immediate: true}
  )

  onMounted(() => {
    loadData()
  })
  
</script>

<template>
    <section :class="$style.products_section">
      <div :class="$style.products_cards">
        <CreateProductCard
        v-for="product in filteredDataProducts"
          :title="product.shopee?.name || 'Carregando...'" 
          :price="product.shopee?.price || ''" 
          :img_path="product.shopee?.images[0] || ''"
        />
      </div>
    </section>
</template>

<style module>
.products_section {
  display: flex;
  width: 100%;
  justify-content: center;
}
.products_cards {
  display: grid;
  /* Cria 4 colunas com tamanhos iguais (1fr) */
  grid-template-columns: repeat(4, 1fr); 
  /* Espaçamento entre os cards */
  gap: 20px; 
  width: var(--default-page-width);
  margin-top: 60px;
}


</style>