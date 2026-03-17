<script setup lang="ts">
  import { useRoute } from 'vue-router';
  import CreateProductCard from './CreateProductCard.vue';
  import { nextTick, computed, watch } from 'vue';
  import { slugify } from '../../utils/utils';
  import { DataProducts, isLoading } from '../../utils/useProductStore';

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


  const filteredDataProducts = computed<ProductSimple[]>(() => {
    const { category, subcategory, searched } = route.params;
    const productsData = DataProducts.value;
    const searchedTerms = slugify(String(searched || ''))
    .split('-')
    .filter(word => word.length > 2)

    return productsData.filter(product => {
      const productNameWordlist = slugify(product.shopee?.name || '')
      const productSubcategory = slugify(product.shopee?.subcategory || '');
      const productCategory = slugify(product.shopee?.category || '');

      // Check if route search exists and compare what are searched with product
      if (searchedTerms.length > 0) {
        if (searchedTerms.some(item => productNameWordlist.includes(item) || item == productCategory || item == productSubcategory)) {
          return true
        }
      }


      if (subcategory && productSubcategory === subcategory) return true;
      if (!subcategory && productCategory === category) return true;
      
     
      
      return false;
    });
  });

  watch(
    () => route.fullPath,
    async () => {
        // console.log("Test")
        isLoading.value = true;
        
        await nextTick(); 
        
        setTimeout(() => {
            isLoading.value = false;
        }, 200); 
    },
    { immediate: true }
);

  
</script>

<template>
    <section :class="$style.products_section">

      <div :class="$style.products_cards" v-if="filteredDataProducts.length > 0 && !isLoading">
        <CreateProductCard
        v-for="product in filteredDataProducts"
          :title="product.shopee?.name || 'Carregando...'" 
          :price="product.shopee?.price || ''" 
          :img_path="product.shopee?.images[0] || ''"
        />
      </div>

      <div :class="$style.warning" v-if="filteredDataProducts.length <= 0 && !isLoading">
        <span>Oops!</span>
        <span>Não encontramos nenhum produto deste tipo!</span>
        <img src="../../assets/box.png" alt="Caixa Vazia" style="width: 100px;">
      </div>

      <div :class="$style.loading" v-if="isLoading">
        <img src="../../assets/loading.apng" alt="Gif de Loading">
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
    /* Create 4 columns of equal size. (1fr) */
    grid-template-columns: repeat(4, 1fr); 
    /* Padding between cards */
    gap: 20px; 
    width: var(--default-page-width);
    margin-top: 60px;
  }
  .warning {
    color: black;
    width: var(--default-page-width);
    height: 300px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .warning span {
    font-size: 22px;
    font-weight: 800;
    text-align: left;
  }
  .warning img {
    margin-top: 20px;
  }

  .loading {
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>