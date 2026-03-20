<script setup>
  import BreadCrumb from '../Product/BreadCrumb.vue';
  import ProductHeader from '../Product/ProductHeader/ProductHeader.vue';
</script>

<template>
  <section :class="$style.product">
    <BreadCrumb/>
    <ProductHeader/>
  </section>
</template>

<style module>
.product {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 24px;
    flex-direction: column;
}
</style>