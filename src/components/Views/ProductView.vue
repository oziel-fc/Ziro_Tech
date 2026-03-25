<script setup lang="ts">
  import { watch, ref } from 'vue';
  import BreadCrumb from '../Product/BreadCrumb.vue';
  import ProductHeader from '../Product/ProductHeader/ProductHeader.vue';
  import ProductDescription from '../Product/ProductDescription.vue';
  import RelatedProducts from '../Product/RelatedProducts.vue';
  import { useProduct } from '../../utils/useProductStore';

  const { product } = useProduct()

  const isReady = ref(false)

  watch(product, (newValue) => {
    if (newValue) {
      isReady.value = false

      setTimeout(() => {
        isReady.value = true
      }, 200)
    }
  }, { immediate: true })
</script>

<template>
  <section :class="$style.product_section" v-if="isReady">
    <BreadCrumb/>
    <ProductHeader/>
    <ProductDescription/>
    <RelatedProducts/>
  </section>

  <div :class="$style.loading" v-if="!isReady">
    <img src="../../assets/loading.apng" alt="Gif de Loading">
  </div>
</template>

<style module>
.product_section {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 24px;
  flex-direction: column;
}
.loading {
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>