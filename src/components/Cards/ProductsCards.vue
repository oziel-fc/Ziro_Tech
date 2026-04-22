<script setup lang="ts">
  import { useRoute } from 'vue-router';
  import CreateProductCard from './CreateProductCard.vue';
  import { computed, nextTick, watch, watchEffect} from 'vue';
  import { DataProducts, isLoading } from '../../utils/useProductStore';
  import { useSort } from '../../utils/currentSortType';
  import { useFilteredProducts } from '../../utils/useFilteredProducts';
  import NoResults from './NoResults.vue';
import NoStock from './NoStock.vue';

  const route = useRoute()
  const { currentSortType } = useSort()


  // Return the product if is equal of the route
  const { filteredDataProducts } = useFilteredProducts(
    DataProducts,
    currentSortType
  )

  const isCategoryOrSub = computed(() => {
    if (route.params.category) {
      return true
    }
    if (route.params.subcategories) {
      return true
    }

    return false
  }) 

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

  watchEffect(() => {
    // console.log(isCategoryOrSub.value)
  })
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

      <NoResults  v-if="filteredDataProducts.length <= 0 && !isLoading && !isCategoryOrSub"/>

      <NoStock v-if="filteredDataProducts.length <= 0 && !isLoading && isCategoryOrSub"/>

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
  @media (max-width: 768px) {
    .products_cards {
      grid-template-columns: repeat(2, 1fr);
      margin-top: 20px;
    }
  }
  @media (max-width: 650px) {
    .products_cards {
      gap: 8px;
    }
  }
</style>