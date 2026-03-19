<script setup lang="ts">
    import { useRoute } from 'vue-router'
    import { DataProducts } from '../../../utils/useProductStore'
    import { computed, ref, watchEffect } from 'vue'
    import { slugify } from '../../../utils/utils'
    import { extractTechnicalSpecs } from '../../../utils/utils'
    import Images from './Images.vue'
    import Variations from './Variations.vue'
    import BrandModelStock from './BrandModelStock.vue'
    import Specs from './Specs.vue'
    import BuyButton from './BuyButton.vue'
    

    const route = useRoute()

    // Header Info

    const product = computed(() => {
        const id = route.params.product

        const found = DataProducts.value.find(p =>
            (p.shopee && slugify(p.shopee.name) === id) ||
            (p.olx && slugify(p.olx.name) === id)
        )

        return found
    })
    
    // Variation
    const selectedVariation = ref(0)

    const variation = computed(() => {
        if (!product.value) {
            return {}
        }

        if (product.value.shopee) {
            return product.value.shopee.variation
        }

        return {}
    })

    const productImages = computed(() => {
        if (!product.value) {
            return []
        }

        if (product.value.shopee) {
            return product.value.shopee.images
        }

        return product.value.olx?.images ?? []
    })

    const variationImageIndexes = computed(() => {
        const options = Object.values(variation.value).flat()

        const initialIndex = productImages.value.length - options.length

        return Array.from({ length: options.length }, (_, i) => initialIndex + i)
    })
    
    // Carousel Config
    let currentImage = ref<number>(0)

    const toggleCurrentImage = (imageIndex: number) => {
        currentImage.value = imageIndex
    }
    const toggleSelectedVariation = (newValue: number) => {
        selectedVariation.value = newValue
    }

    // Specifications

    const specs = computed(() => {
        if (!product.value) {
            return ''
        }
        if (product.value.shopee) {
            return extractTechnicalSpecs(product.value.shopee.description)
        }
        if (product.value.olx) {
            return extractTechnicalSpecs(product.value.olx.description)
        }
        return ''
    })
    

    watchEffect(() => {
        
    });
</script>

<template>
  <div :class="$style.product_header">
    <Images
        :product-images="productImages"
        :current-image="currentImage"
        :toggle-current-image="toggleCurrentImage"
    />
    
    <div :class="$style.product_info">
        
        <!-- Info about Brand, Model and Disponibility -->
        <BrandModelStock
            :name="product?.olx?.name || product?.shopee?.name || ''"
            :brand="product?.olx?.brand || product?.shopee?.brand || ''"
            :model="product?.olx?.model || product?.shopee?.model || ''"
            :stock="product?.olx?.stock || product?.shopee?.stock || 0"
            :price="product?.olx?.price || product?.shopee?.price || ''"
        />

        <hr :style="{
            border: 'none',
            height: '1px',
            backgroundColor: '#b3b3b3',
            width: '100%',
            margin: '10px 0'
        }">

        <!-- Variations -->
        <Variations 
            :variation="variation" 
            :selected-variation="selectedVariation"
            :product-images="productImages"
            :variation-image-indexes="variationImageIndexes" 
            :toggle-current-image="toggleCurrentImage"
            :toggle-selected-variation="toggleSelectedVariation"
        />

        <!-- Specifications -->
        <Specs
            :specs="specs"
        />

        <hr :style="{
            border: 'none',
            height: '1px',
            backgroundColor: '#b3b3b3',
            width: '100%',
            margin: '20px 0'
        }">

        <BuyButton
            :shopee="product?.shopee || null"
            :olx="product?.olx || null"
            :shopee_link="product?.shopee?.link || ''"
            :olx_link="product?.olx?.link || ''"
        />
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

.product_info {
    width: 50%;
    padding: 0px 20px 0px 20px;
    display: flex;
    flex-direction: column;
}

</style>