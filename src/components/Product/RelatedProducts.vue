<script setup lang='ts'>
    import { computed, watchEffect, ref } from 'vue';
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


    // Width of Elements
    const defaultWidthScreen = computed(() => {
        return parseInt(getComputedStyle(document.documentElement).getPropertyValue('--default-page-width').trim())
    })

    const gapBtwCards = ref(20)

    const sizeWidthCard = computed(() => {
        return (defaultWidthScreen.value / 6) - gapBtwCards.value
    })

    const totalWidthCard = sizeWidthCard.value + gapBtwCards.value

    // Scroll Functions of Related Products
    const valueScrollThumb = ref(0)

    const maxScroll = computed(() => {
        return ((relatedProduct.value.length - 6) * totalWidthCard)
    })

    const scrollRight = () => {
        const move = Math.min(
            defaultWidthScreen.value,
            maxScroll.value - Math.abs(valueScrollThumb.value)
        )

        valueScrollThumb.value -= move
    }

    const scrollLeft = () => {
        const move = Math.min(
            defaultWidthScreen.value,
            Math.abs(valueScrollThumb.value)
        )

        valueScrollThumb.value += move
    }

    watchEffect(() => {
        // console.log("Valor Scroll: ", valueScrollThumb.value)
    })
    
</script>


<template>
  <section v-if="relatedProduct[0] != null" :class="$style.related">
    <hr :style="{
        border: 'none',
        height: '1px',
        backgroundColor: '#b3b3b3',
        width: '100%',
        margin: '10px 0'
    }">

    <h2>Produtos Relacionados</h2>
    <div :class="$style.viewport_cards">
        <div :class="$style.grid_cards">
            <!-- Size Page / Quantity Items - Gap Between Cards -->
            <CreateProductCard
                v-for="product in relatedProduct"
                :title="product.shopee?.name || ''"
                :price="''" 
                :img_path="product.shopee?.images[0] || ''"
                :size-width="`${sizeWidthCard}px`"
                :transform-x-function="valueScrollThumb"
            />
        </div>

        <!-- Left Button -->
        <div v-if="valueScrollThumb">
            <button :id="$style.next_button" @click="scrollLeft()" :style="{left: '-25px'}">
                <svg 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    stroke-width="2" 
                    stroke-linecap="round" 
                    stroke-linejoin="round"
                >
                    <path d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
                </svg>
            </button>
        </div>

        <!-- Right Button -->
        <div v-if="Math.abs(valueScrollThumb) < maxScroll">
            <button :id="$style.next_button" @click="scrollRight()" :style="{right: '-25px'}">
                <svg 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    stroke-width="2" 
                    stroke-linecap="round" 
                    stroke-linejoin="round"
                >
                    <path d="M10 6 8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
                </svg>
            </button>
        </div>
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
    width: 100%;
    position: relative;
    display: flex;
    align-items: center;
}
.grid_cards {
    width: 100%;
    flex-direction: row;
    gap: 21px;
    display: flex;
    align-items: center;
    overflow: hidden;
}
#next_button {
    position: absolute;
    transform: translateY(-50%); 
    top: 50%;

    width: 40px;  
    height: 40px;
    border-radius: 50%;

    /* Centralize the SVG */
    display: flex;
    align-items: center;    
    justify-content: center; 

    /* Button Style */
    background-color: rgb(66, 66, 66); 
    color: rgb(95, 99, 105);             
    border: 1px solid rgb(95, 99, 105);
    cursor: pointer;          

    padding: 0;               
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
#next_button svg {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    width: 1em;
    height: 1em;
    display: inline-block;
    -webkit-flex-shrink: 0;
    -ms-flex-negative: 0;
    flex-shrink: 0;
    -webkit-transition: fill 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    transition: fill 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    fill: currentColor;
    font-size: 1.5rem;
}
</style>