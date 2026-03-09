<script setup lang="ts">
    import { useRoute } from 'vue-router'
    import { DataProducts } from '../../utils/useProductStore'
    import { computed, watch } from 'vue'
    import { slugify } from '../../utils/formatters'
    import { formatBRL, capitalize } from '../../utils/formatters'
    

    const route = useRoute()

    const product = computed(() => {
        const id = route.params.product

        const found = DataProducts.value.find(p =>
            (p.shopee && slugify(p.shopee.name) === id) ||
            (p.olx && slugify(p.olx.name) === id)
        )

        return found
    })
    
    const stock = computed(() => {
        if (!product.value) {
            return 0
        }

        if (product.value.shopee) {
            return product.value.shopee.stock
        }

        return product.value.olx?.stock ?? 0
    })
    // watch(
    //     product,
    //     (newValue) => {
    //         console.log(newValue.shopee.name)
    //     },
    //     { immediate: true }
    // )
</script>

<template>
  <div :class="$style.product_header">
    <div :class="$style.product_images">
        <div :class="$style.current_image">
            
        </div>
        <div :class="$style.thumbnail_images">

        </div>
    </div>
    <div :class="$style.product_info">
        <h1 :id="$style.title">
            {{ product?.shopee?.name }}
        </h1>
        <!-- Stock Verification and Style -->
        <span :id="$style.disponibility" :style="{ color: stock > 0 ? 'green' : 'red' }">
            {{ stock > 0 ? 'PRODUTO DISPONÍVEL' : 'PRODUTO INDISPONÍVEL' }}
        </span>

        <span :id="$style.price">
            {{ formatBRL(product?.shopee?.price) }}
        </span>

        <div :class="$style.brand_info">
            <span :id="$style.brand">
                Marca: 
                <span><strong>{{ capitalize(product?.shopee?.brand || product?.olx?.brand || '') }}</strong></span>
            </span>
            <span :id="$style.model">
                Modelo: 
                <strong><span>{{ product?.shopee?.model || product?.olx?.model }}</span></strong>
            </span>
        </div>
    </div>
  </div>
</template>

<style module>
.product_header {
    width: var(--default-page-width);
    display: flex;
    flex-direction: row;
    color: black;
}
.product_images {
    width: 50%;
    height: 700px;
    border: 1px solid blue;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.product_info {
    width: 50%;
    padding: 0px 20px 0px 20px;
    display: flex;
    flex-direction: column;
}
.current_image {
    height: 80%;
    width: 90%;
    border: 1px solid green;
}
.thumbnail_images {
    height: 20%;
    width: 90%;
    border: 1px solid red;
}
#title {
    font-size: 25px;
    font-weight: 800;
    line-height: 24px;
}
#price {
    font-size: 20px;
    font-weight: 800;
}
#disponibility {
    font-weight: 700;
    margin-top: 9px;
}
.brand_info {
    display: flex;
    justify-content: space-between;    
}
</style>