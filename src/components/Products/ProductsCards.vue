<script setup lang="ts">
  import { useRoute } from 'vue-router';
  import CreateProductCard from './CreateProductCard.vue';
  import { ref, onMounted, computed, watch } from 'vue';
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

  const filteredDataProducts = computed<ProductSimple[]>(() => {
    const currentRoute = route.params;
    const productsData = RAWDataProducts.value;

    return productsData.filter(product => {
      const productSubcategory = slugify(product.shopee?.subcategory || '');
      const productCategory = slugify(product.shopee?.category || '');

      if (currentRoute.subcategory && productSubcategory === currentRoute.subcategory) return true;
      if (!currentRoute.subcategory && productCategory === currentRoute.category) return true;
      
      
      
      return false;
    });
  });
  // watch(filteredDataProducts, (novoValor) => {
  //   console.log("Produtos atualizados:", novoValor);
  // }, { deep: true });
  
  const isLoading = ref<boolean>(true);

  watch(RAWDataProducts, (data) => {
    if (data && data.length > 0) {
      isLoading.value = false
    }
  })

  onMounted(() => {
    loadData()
  })
  
</script>

<template>
    <section :class="$style.products_section">

      <div :class="$style.products_cards" v-if="filteredDataProducts.length > 0">
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