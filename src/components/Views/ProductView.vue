<script setup>
  import BreadCrumb from '../Product/BreadCrumb.vue';
  import ProductHeader from '../Product/ProductHeader/ProductHeader.vue';
  import ProductDescription from '../Product/ProductDescription.vue';
  import RelatedProducts from '../Product/RelatedProducts.vue';
</script>

<template>
  <section :class="$style.product_section">
    <BreadCrumb/>
    <ProductHeader/>
    <ProductDescription/>
    <RelatedProducts/>
  </section>
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
</style>