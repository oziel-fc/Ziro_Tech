<script setup lang='ts'>
    import { computed, watchEffect } from 'vue';
    import { DataProducts } from '../../utils/useProductStore';
    import { useProduct } from '../../utils/useProductStore';
    import CreateProductCard from '../Cards/CreateProductCard.vue';

    const { product } = useProduct()

    interface ProductSimple {
        shopee: {
        name: string;
        category: string;
        subcategory: string;
        price: string;
        images: string[];
        } | null;
    }

    const relatedProduct = computed<ProductSimple[]>(() => {
        
        return DataProducts.value.filter(rawProduct => {
            // Equal names
            if (rawProduct.shopee?.name === product.value?.shopee?.name) {
                return false
            }

            // Brand
            if (rawProduct.shopee?.brand == product.value?.shopee?.brand) {
                return true
            }
            // Subcategory
            if (rawProduct.shopee?.subcategory == product.value?.shopee?.subcategory) {
                return true
            }
        })
    })

    watchEffect(() => {
        // console.log(relatedProduct.value)
    })
    
</script>


<template>
  <section :class="$style.related" v-if="relatedProduct[0] != null">
    <hr :style="{
        border: 'none',
        height: '1px',
        backgroundColor: '#b3b3b3',
        width: '100%',
        margin: '10px 0'
    }">

    <h2>Produtos Relacionados</h2>
    <div :class="$style.viewport_cards">
        <!-- Size Page / Quantity Items - Gap Between Cards -->
        <CreateProductCard
            v-for="product in relatedProduct"
            :title="product.shopee?.name || ''"
            :price="''" 
            :img_path="product.shopee?.images[0] || ''"
            :size-width="`calc((var(--default-page-width) / 6) - 20px)`"
        />
    </div>
  </section>
</template>


<style module>
.related {
    width: var(--default-page-width);
}
.related h2 {
    color: black;
    padding-bottom: 25px;
}
.viewport_cards {
    display: flex;
    flex-direction: row;
    gap: 20px;
}
</style>