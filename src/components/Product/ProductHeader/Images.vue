<script setup lang="ts">
    import { ref, watchEffect } from 'vue';
    import { getWidthOf } from '../../../utils/useElementWidth';
    import { computed, watch } from 'vue';
    import { useScreenWidth } from '../../../utils/useScreenWidth';
    import emblaCarouselVue from 'embla-carousel-vue';
    
    const { screenWidth } = useScreenWidth();
    const isVerticalScreen = computed(() => {return screenWidth.value <= 850})
    
    const props = defineProps<{
        scrollByVariation?: number
        productImages: string []
    }>();

    const [emblaRef, emblaApi] = emblaCarouselVue({ loop: false })
    const scrollTo = (index: number) => {
        emblaApi.value?.scrollTo(index)
    }
    watch(() => props.scrollByVariation, (newValue) => {
        if (newValue === undefined) return
        emblaApi.value?.scrollTo(newValue)
    })

    // Carousel Config

    const carouselWidth = getWidthOf(emblaRef)

    const valueScrollThumb = ref(0)
    const thumbRef = ref(null)
    const widthThumbnails = getWidthOf(thumbRef)
    const widthThumbElement = computed(() => {
        return widthThumbnails.value / 6
    }) 

    const scrollThumb = () => {

        if (valueScrollThumb.value === 0) {
            valueScrollThumb.value = ((props.productImages.length - 6) * widthThumbElement.value) * -1
        }
        else {
            valueScrollThumb.value = 0
        }
    }

    watchEffect(() => {
        // console.log(carouselWidth.value)
    })
</script>

<template>
  <div :class="[$style.product_images, $style.embla]">
        <div :class="[$style.embla__viewport]" ref="emblaRef">
            <div :class="[$style.embla__container]">
                <div v-for="(imgPath, index) in productImages" 
                    :class="[$style.embla__slide]"
                    :key="index">
                    <img :class="$style.carousel_image" :src="imgPath" >
                </div>
            </div>
        </div>

        <div :class="$style.viewport_thumb">
            <div :class="$style.thumbnail_images" ref="thumbRef">
                <div :class="$style.thumb_image" 
                    v-for="(imagePath, imgIndex) in productImages" 
                    @click="scrollTo(imgIndex)"
                    :style="{transform: `translateX(${valueScrollThumb}px)`}">

                    <img :src="imagePath" :alt="`${imgIndex}`" :loading="'lazy'">
                </div>
            </div>
            <div v-if="productImages.length > 6 && !isVerticalScreen">
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
</template>

<style module>
    /* Embla styles */
    .embla__viewport {
        overflow: hidden;
    }
    .embla__container {
        display: flex;
        touch-action: pan-y pinch-zoom;
    }
    .embla__slide {
        flex: 0 0 100%;
        min-width: 0;
        cursor: grab;
    }
    .embla__slide:active {
        cursor: grabbing;
    }

    
    .product_images {
        /* width: 700px; */
        /* height: 800px; */
        width: 50%;
        max-width: 700px;
        aspect-ratio: 7 / 8;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .carousel_product_image {
        width: 100%;
        max-width: 650px;
        aspect-ratio: 1 / 1;
        /* height: 650px; */
        /* width: 650px; */
        overflow: hidden;
    }
    /* .current_image {
        height: 100%;
        position: relative;
        display: flex;
        flex-direction: row;
        transition: transform 1s cubic-bezier(0.25, 0.8, 0.25, 1);
    } */
    .carousel_image {
        width: 100%;
        height: 100%;
    }
    .thumbnail_images {
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 100%;
        overflow: hidden;
    }
    .viewport_thumb {
        width: 100%;
        max-width: 650px;
        aspect-ratio: 650 / 144;
        /* height: 144px; */
        /* width: 650px; */
        display: flex;
        align-items: center;
        position: relative;
    }
    .thumb_image {
        flex-shrink: 0;
        cursor: pointer;
        width: calc((100% - (5 * 10px)) / 6);
        aspect-ratio: 1 / 1;
        margin-right: 10px;
        transition: transform 1s cubic-bezier(0.25, 0.8, 0.25, 1);
    }
    .thumb_image img {
        height: 100%;
        width: 100%;
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
    @media (max-width: 850px) {
        .product_images {
            width: 100%;
            max-width: none;
            height: fit-content;
            aspect-ratio: auto;
        }
        .viewport_thumb {
            aspect-ratio: auto;
            padding-top: 15px;
            padding-bottom: 10px;
        }
        .thumbnail_images {
            overflow-x: auto;
            overflow-y: hidden;
            scroll-snap-type: x mandatory;
            scroll-behavior: smooth;
        }
        .thumbnail_images::-webkit-scrollbar {
            display: none;
        }
        .thumb_image {
            width: calc((100% - (3 * 10px)) / 4);
            scroll-snap-align: start;
        }
    }
</style>