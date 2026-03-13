<script setup lang="ts">
    import { useRoute } from 'vue-router'
    import { DataProducts } from '../../utils/useProductStore'
    import { computed, ref, watchEffect } from 'vue'
    import { slugify } from '../../utils/formatters'
    import { formatBRL, capitalize } from '../../utils/formatters'
    import { RouterLink } from 'vue-router'
    

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
    
    const brand = computed(() => {
        if (!product.value) {
            return ''
        }

        if (product.value.shopee) {
            return product.value.shopee.brand
        }

        return product.value.olx?.brand ?? ''
    })

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

    let currentImage = ref<number>(0)

    const toggleCurrentImage = (imageIndex: number) => {
        currentImage.value = imageIndex
    }

    watchEffect(() => {
        // Sempre que o objeto product ou shopee ou variation mudar, isso dispara
        // console.log('Estado atual da variação:', product.value?.shopee?.variation);
        // console.log(productImages);
        console.log(currentImage.value);
    });
</script>

<template>
  <div :class="$style.product_header">
    <div :class="$style.product_images">
        <div :class="$style.carousel_product_image">

            <div :class="$style.current_image" :style="{width: `${productImages.length * 100}%`}">
                <div v-for="imgPath in productImages">
                    <img :class="$style.carousel_image" :src="imgPath" >
                </div>
            </div>
        </div>
        
        <div :class="$style.thumbnail_images">
            <div :class="$style.thumb_image" v-for="(imagePath, index) in productImages" @click="toggleCurrentImage(index)">
                <img :src="imagePath" :alt="`${index}`">
            </div>
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

        <!-- Brand and Model Info -->
        <div :class="$style.brand_info">
            <span :id="$style.brand">
                Marca:
                <RouterLink :to="`/search/${brand}`" :style="{ textDecoration: 'none', color: 'inherit'}">
                    <span><strong>{{ capitalize(brand) }}</strong></span>
                </RouterLink>
            </span>
            <span :id="$style.model">
                Modelo: 
                <strong><span>{{ product?.shopee?.model || product?.olx?.model }}</span></strong>
            </span>
        </div>

        <!-- Variation -->
        <div v-if="Object.keys(variation)[0] != 'None'">
            <div :class="$style.variations" v-for="[type, options] in Object.entries(variation)" :key="type">
                
                
                <span :style="{width: '100px'}">
                    {{ type }}
                </span>
                
                <div :class="$style.variation_option" :style="{width: '500px'}">
                    <button :class="$style.option" v-for="option in options" :key="option">
                        <img src="" alt="">
                        <span>
                            {{ option }}
                        </span>
                    </button>
                </div>

            </div>
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
    width: 700px;
    height: 800px;
    /* border: 1px solid blue; */
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
.carousel_product_image {
    height: 650px;
    width: 650px;
    /* border: 1px solid green; */
    overflow: hidden;
}
.current_image {
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: row;
    transition: transform 1s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.carousel_image {
    width: 100%;
    height: 100%;
}

.thumbnail_images {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 18%;
    width: 650px;
    /* border: 1px solid red; */
    overflow: hidden;
}
.thumb_image {
    flex-shrink: 0;
    cursor: pointer;
    width: 100px;
    height: 100px;
    margin-right: 10px;
}
.thumb_image img {
    height: 100%;
    width: 100%;
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
.variations {
    display: grid;
    grid-template-columns: 1fr 1fr; /* Divide em duas colunas iguais (frações) */
    gap: 10px;
}
.variation_option {
    display: grid;
    grid-template-columns: repeat(3, 1fr); 
    gap: 5px;
}
.option {
    min-height: 40px;
    border-radius: 2px;
    border: 1px solid white;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>