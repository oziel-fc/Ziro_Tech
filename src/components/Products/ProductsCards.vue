<script setup lang="ts">
  import CreateProductCard from './createProductCard.vue';
  import { ref, onMounted } from 'vue';

  interface ProductSimple {
    shopee: {
      name: string;
      price: string;
      images: string[];
    } | null;
  }

  const productsData = ref<ProductSimple[]>([])

  const loadData = async () => {
    try {
      const url = 'https://raw.githubusercontent.com/oziel-fc/products_ziro/refs/heads/master/products.json'
      
      const response = await fetch(url)
      const rawJSON = await response.json()
      
      productsData.value = rawJSON
      // console.log(productsData.value[0]?.shopee?.name)
    } catch (err) {
      console.error("Erro ao buscar o JSON:", err)
    }
  }

  onMounted(() => {
    loadData()
  })

</script>

<template>
    <section :class="$style.products_section">
      <div :class="$style.products_cards">
        <CreateProductCard
        v-for="product in productsData"
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