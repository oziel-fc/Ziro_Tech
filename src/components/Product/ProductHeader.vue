<script setup lang="ts">
    import { useRoute } from 'vue-router'
    import { DataProducts } from '../../utils/useProductStore'
    import { computed, ref, watchEffect, onMounted } from 'vue'
    import { slugify } from '../../utils/utils'
    import { formatBRL, capitalize, ensureTrailingColon } from '../../utils/utils'
    import { RouterLink } from 'vue-router'
    

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

    const carouselRef = ref(null);
    const carouselWidth = ref(0); 

    onMounted(() => {
        const observer = new ResizeObserver((entries) => {
            for (let entry of entries) {
            carouselWidth.value = entry.contentRect.width;
            }
        });
            if (carouselRef.value) {
                observer.observe(carouselRef.value);
            }
    });

    const valueScrollThumb = ref(0)
    const widthThumbElement = ref(110)

    const scrollThumb = () => {

        if (valueScrollThumb.value === 0) {
            valueScrollThumb.value = ((productImages.value.length - 6) * widthThumbElement.value) * -1
        }
        else {
            valueScrollThumb.value = 0
        }
    }

    watchEffect(() => {
        // Sempre que o objeto product ou shopee ou variation mudar, isso dispara
        // console.log('Estado atual da variação:', product.value?.shopee?.variation);
        // console.log(productImages);
        // console.log(currentImage.value);
        // console.log(carouselWidth.value*currentImage.value)
        // console.log(valueScrollThumb.value)
        console.log(variationImageIndexes.value)
    });
</script>

<template>
  <div :class="$style.product_header">
    <div :class="$style.product_images">
        <div :class="$style.carousel_product_image" ref="carouselRef">

            <div :class="$style.current_image" :style="{width: `${productImages.length * 100}%`, transform: `translateX(calc(${carouselWidth}px * -${currentImage}))`}">
                <div v-for="imgPath in productImages">
                    <img :class="$style.carousel_image" :src="imgPath" >
                </div>
            </div>
        </div>

        <div :class="$style.viewport_thumb">
            <div :class="$style.thumbnail_images">
                <div :class="$style.thumb_image" v-for="(imagePath, imgIndex) in productImages" 
                    @click="toggleCurrentImage(imgIndex)"
                    :style="{transform: `translateX(${valueScrollThumb}px)`}">

                    <img :src="imagePath" :alt="`${imgIndex}`">
                </div>
            </div>
            <div v-if="productImages.length > 6">
                <button :id="$style.next_button" @click="scrollThumb()" :style="valueScrollThumb ? {left: '-25px'} : {right: '-25px'}">
                    <svg 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        stroke-width="2" 
                        stroke-linecap="round" 
                        stroke-linejoin="round"
                    >
                        <path d="M10 6 8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" v-if="!valueScrollThumb"/>
                        <path d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z" v-if="valueScrollThumb"/>
                    </svg>
                </button>
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

        <hr :style="{
            border: 'none',
            height: '1px',
            backgroundColor: '#b3b3b3',
            width: '100%',
            margin: '10px 0'
        }">

        <!-- Variation -->
        <div v-if="Object.keys(variation)[0] != 'None'">
            <div :class="$style.variations" v-for="[typeVariation, variationOptions] in Object.entries(variation)" :key="typeVariation">
                
                
                <span>
                    {{ ensureTrailingColon(typeVariation) }}
                </span>
                <span :style="{marginLeft: '5px'}"><strong>{{ variationOptions[selectedVariation] }}</strong></span>
                
                <div :class="$style.variation_option">
                    <button v-for="(imageRelatedIndex, optionRelatedIndex) in variationImageIndexes"
                        :class="$style.option"
                        :style="selectedVariation === optionRelatedIndex ? 'border: 2px solid black' : ''"
                        @click="toggleCurrentImage(imageRelatedIndex), selectedVariation = optionRelatedIndex">

                        <img :src="productImages[imageRelatedIndex]">
                    </button>
                </div>
            </div>
        </div>

        <!-- Specifications -->
        <div :class="$style.viewport_specs">

        </div>

        <div :class="$style.buy_button">
            
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
    width: 100%;
    /* border: 1px solid red; */
    overflow: hidden;
}
.viewport_thumb {
    height: 144px;
    width: 650px;
    display: flex;
    align-items: center;
    position: relative;
}
.thumb_image {
    flex-shrink: 0;
    cursor: pointer;
    width: 100px;
    height: 100px;
    margin-right: 10px;
    transition: transform 1s cubic-bezier(0.25, 0.8, 0.25, 1);
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
    margin-top: 10px;
}
.brand_info {
    margin-top: 5px;
    display: flex;
    justify-content: space-between;    
}
.variations {
    /* display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px; */
}
.variation_option {
    width: 100%;
    height: 60px;
    display: flex;
    flex-direction: row;
    gap: 5px;
    /* display: grid;
    grid-template-columns: repeat(3, 1fr); 
    gap: 5px; */
}
.option {
    margin-top: 8px;
    height: 45px;
    width: 45px;
    border-radius: 4px;
    border: 2px solid #b3b3b3;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #e3e3e3;
}
.option img {
    width: 100%;
    height: 100%;
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

/* Specs */
.viewport_specs {
    width: 100%;
    height: 100px;
    background-color: red;
}
.buy_button {
    width: 100%;
    height: 100px;
    background-color: rebeccapurple;
}
</style>