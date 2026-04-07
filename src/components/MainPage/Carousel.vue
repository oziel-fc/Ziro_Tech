<script setup lang="ts">
    import { ref, onMounted, onUnmounted, computed } from 'vue'
    import { RouterLink } from 'vue-router'
    import { getWidthOf } from '../../utils/useElementWidth'
    import { useScreenWidth } from '../../utils/useScreenWidth'

    const carouselItems = [
        {
            img: {
                desktop: "/src/assets/carousel/phone_headset.webp",
                mobile: "/src/assets/carousel/phone_headset_mobile.webp"
            },
            link: "search/fone headset headphone",
            alt: "Banner dos Fones e Headsets"
        },
        {
            img: {
                desktop: "/src/assets/carousel/hardware.webp",
                mobile: "/src/assets/carousel/hardware_mobile.webp"
            },
            link: "hardware",
            alt: "Banner dos Hardwares"
        },
        {
            img: {
                desktop: "/src/assets/carousel/mouse_keyboard.webp",
                mobile: "/src/assets/carousel/mouse_keyboard_mobile.webp"
            },
            link: "search/mouse-teclado",
            alt: "Banner dos Mouses e Teclados"
        }
    ]
    

    let currentBanner = ref(1)
    const lenBanners = carouselItems.length
    const carouselMainDiv = ref<HTMLElement | null>(null);
    const carouselWidth = getWidthOf(carouselMainDiv);
    const { screenWidth } = useScreenWidth()
    const isCarouselMobile = computed(() => screenWidth.value < 768)

    const changeBanner = (step) => {
        if (step == 1) {
            currentBanner.value += step
            if (currentBanner.value > lenBanners) {
                currentBanner.value = 1
            }
        }
        else if (step == -1) {
            currentBanner.value -= 1
            if (currentBanner.value < 1) {
                currentBanner.value = lenBanners
            }
        }
    }

    let timerID: ReturnType<typeof setInterval> | null = null;

    const carouselChangeTimer = () => {
        if (timerID) clearInterval(timerID)
        timerID = setInterval(() => {
            currentBanner.value += 1
            if (currentBanner.value > lenBanners) {
                currentBanner.value = 1
            }
        }, 5000)
    }

    const resetChangeTimer = () => {
        if (timerID) {
            clearInterval(timerID)
        };
        carouselChangeTimer();
    };

    onMounted(() => {
        carouselChangeTimer()
    })

    onUnmounted(() => {
        if (timerID) clearInterval(timerID);
    });

    // Function to scroll between banners when in mobile
    let startX = 0
    const dragOffset = ref(0)
    let isDragging = false

    const handleTouchStart = (e: TouchEvent) => {
        const touch = e.touches[0]
        if (!touch) return

        isDragging = true
        startX = touch.clientX
    }

    const handleTouchMove = (e: TouchEvent) => {
        if (!isDragging) return

        const touch = e.touches[0]
        if (!touch) return

        dragOffset.value = touch.clientX - startX
    }

    const handleTouchEnd = () => {
        isDragging = false

        if (dragOffset.value < -50) {
            changeBanner(1)
            resetChangeTimer()
        }

        if (dragOffset.value > 50) {
            changeBanner(-1)
            resetChangeTimer()
        }

        dragOffset.value = 0
    }
</script>


<template>
  <div ref="carouselMainDiv" 
    :class="$style.carousel" 
    @touchstart="handleTouchStart"
    @touchmove="handleTouchMove"
    @touchend="handleTouchEnd">
    
    <div :class="$style.carousel_slides"
    :style="{width: `calc(100% * ${lenBanners})`, 
            transform: `translateX(calc(${carouselMainDiv != null ? carouselWidth : 0}px * -${currentBanner - 1} + ${dragOffset}px))`}"> 
        <div
            v-for="item in carouselItems"
            :class="$style.banner_image">
            <RouterLink :to="`/${item.link}`">
                <img :src="isCarouselMobile ? item.img.mobile : item.img.desktop" :alt="item.alt">
            </RouterLink>
        </div>
    </div>

    <div :class="$style.navigators" v-if="!isCarouselMobile">
        <!-- Back Button -->
        <div :class="$style.carousel_btn_body">
            <div :class="[$style.carousel_btn, $style.left]"
                @click="changeBanner(-1), resetChangeTimer()">
            </div>
        </div>
        <!-- Next Button -->
        <div :class="$style.carousel_btn_body">
            <div :class="[$style.carousel_btn, $style.right]"
                @click="changeBanner(1), resetChangeTimer()">
            </div>
        </div>
    </div>
    
    <div :class="$style.indicators">
        <!-- Indicators are created based on the number of images -->
        <div
            v-for="i in carouselItems.length"
            :class="[$style.indicators_bars, currentBanner === i ? $style.active : '']"
            :key="i"
            @click="currentBanner = i, resetChangeTimer()">
        </div>
    </div>

  </div>
</template>

<style module>
    .carousel {
        width: 100%;
        position: relative;
        aspect-ratio: 1920 / 350;
    }
    .carousel_slides {
        height: 100%;
        overflow: hidden;
        position: relative;
        z-index: 1;
        display: flex;
        flex-direction: row;
        transition: transform 1s cubic-bezier(0.25, 0.8, 0.25, 1);
    }
    .banner_image {
        height: 100%;
        width: 100%;
    }
    .banner_image a {
        display: flex;
        height: 100%;
        width: 100%;
        cursor: pointer;
    }
    .carousel img {
        width: 100%;
        height: 100%;
    }

    .navigators {
        align-items: center;
        display: flex;
        height: 100%;
        justify-content: space-between;
        position: absolute;
        top: 0;
        width: 100%;
        z-index: 10;
        pointer-events: none;
        padding: 0 10px
    }
    .indicators {
        align-items: center;
        display: flex;
        flex-direction: row;
        justify-content: center;
        position: absolute;
        bottom: 0;
        width: 100%;
        z-index: 10;
        height: 35px;
        gap: 5px;
        pointer-events: none;
    }
    .carousel_btn_body {
        height: 45px;
        width: 45px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
    }
    .carousel_btn {
        width: 25px;
        height: 25px;
        pointer-events: auto;
    }
    .carousel_btn.left {
        cursor: pointer;
        background-image: url('../../assets/carousel/arrow.webp');
        background-size: cover;     
        background-repeat: no-repeat;  
        background-position: center; /* centralize */
        transform: scaleX(-1);
    }
    .carousel_btn.right {
        cursor: pointer;
        background-image: url('../../assets/carousel/arrow.webp');
        background-size: cover;     /* fill the div */
        background-repeat: no-repeat;  
        background-position: center; /* centralize */
    }
    .carousel_btn_body:hover {
        background-color: hsla(0, 0%, 100%, .4);
        outline: none;
    }
    .indicators_bars {
        width: 9px;
        height: 9px;
        border-radius: 50%;
        border: #ffffff solid 1px;
        cursor: pointer;
        transition: background-color 1s ease, transform 1s ease;
        pointer-events: auto;
    }
    .indicators_bars:hover {
        background-color: hsla(0, 0%, 100%, .4);
    }
    .active {
        background-color: #ffffff;
        transform: scale(1.05);
    }
    @media (max-width: 768px) {
        .carousel {
            aspect-ratio: 1 / 1;
        }   
    }
</style>