<script setup lang='ts'>
    import { computed } from 'vue';
    import { DataProducts } from '../../utils/useProductStore';
    import { useProduct } from '../../utils/useProductStore';
    import CreateProductCard from '../Cards/CreateProductCard.vue';
    import { type ProductSimple } from '../../utils/utils';
    
    const { product } = useProduct()

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
            if (rawProduct.shopee?.category == product.value?.shopee?.category) {
                return true
            }
        })
    })


</script>


<template>
  <section :class="$style.related">
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
            <div :class="$style.card" v-for="product in relatedProduct">
                <CreateProductCard
                :title="product.shopee?.name || ''"
                :price="''" 
                :stock="product.shopee?.stock || 0"
                :img_path="product.shopee?.images[0] || ''"
                />
            </div>
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
    gap: 20px;
    display: flex;
    align-items: center;
    overflow-x: auto;
    overflow-y: hidden;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
}
.card {
    flex-shrink: 0;
    cursor: pointer;
    width: calc((100% - (5 * 20px)) / 6);
    aspect-ratio: 1 / 1;
    scroll-snap-align: start;
}
.grid_cards::-webkit-scrollbar {
    display: none;
}

.grid_cards {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
@media (max-width: 1000px) {
    .related {
        padding: 0;
    }
    .card {
        /* Value - Gap / Items + Lateral Padding / Items */
        width: calc(((100% - (4 * 20px)) / 4) + (var(--mobile-padding) / 4));
    }
}
@media (max-width: 800px) {
    .card {
        /* Value - Gap / Items + Lateral Padding / Items */
        width: calc(((100% - (3 * 20px)) / 3) + (var(--mobile-padding) / 3));
    }
}
@media (max-width: 600px) {
    .card {
        /* Value - Gap / Items + Lateral Padding / Items */
        width: calc(((100% - (2 * 20px)) / 2) + (var(--mobile-padding) / 2));
    }
}
</style>