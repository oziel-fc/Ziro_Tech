<script setup>
    import ProductHeader from '../Product/ProductHeader.vue';
</script>

<template>
  <section :class="$style.product">
    <ProductHeader/>
  </section>
</template>

<style module>
.product {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>