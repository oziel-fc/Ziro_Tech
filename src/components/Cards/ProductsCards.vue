<script setup lang="ts">
  import { useRoute } from 'vue-router';
  import CreateProductCard from './CreateProductCard.vue';
  import { nextTick, computed, watch} from 'vue';
  import { slugify } from '../../utils/utils';
  import { DataProducts, isLoading } from '../../utils/useProductStore';
  import { type ProductSimple } from '../../utils/utils';
  import { sortProducts } from '../../utils/useSortProducts';
  import { useSort } from '../../utils/currentSortType';

  const route = useRoute()
  const { currentSortType } = useSort()


  // Return the product if is equal of the route
  const filteredDataProducts = computed<ProductSimple[]>(() => {
    const { category, subcategory, searched } = route.params;
    const productsData = DataProducts.value;
    const searchedTerms = slugify(String(searched || ''))
    .split('-')
    .filter(word => word.length > 2)

    return sortProducts(
      productsData.filter(product => {
        const productNameWordlist = slugify(product.shopee?.name || '')
        const productSubcategory = slugify(product.shopee?.subcategory || '')
        const productCategory = slugify(product.shopee?.category || '')

        // Home
        if (route.path === '/') {
          if (product.shopee?.stock) {
            return true
          }
        }

        // Search Cards
        if (searchedTerms.length > 0) {
          if (searchedTerms.some(item =>
            productNameWordlist.includes(item) ||
            item == productCategory ||
            item == productSubcategory
          )) {
            return true
          }
        }

        // Subcategory Cards
        if (subcategory && productSubcategory === subcategory) return true
        
        // Category Cards
        if (!subcategory && productCategory === category) return true

        return false
      
      }), currentSortType.value
    )
  });


  // Verify the route
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

      <div :class="$style.products_cards" 
        v-if="filteredDataProducts.length > 0 && !isLoading"
        >
        
        <CreateProductCard
          v-for="product in filteredDataProducts"
            :title="product.shopee?.name || 'Carregando...'" 
            :price="product.shopee?.price || ''"
            :stock="product.shopee?.stock || 0"
            :img_path="product.shopee?.images[0] || ''"
            :show-disponibility-tag="true"
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
    margin-top: 30px;
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
  @media (max-width: 1250px) {
    .products_cards {
      gap: 15px;
    }
  }
  @media (max-width: 1024px) {
    .products_cards {
      grid-template-columns: repeat(3, 1fr); 
    }
  }
</style>