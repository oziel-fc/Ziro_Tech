<script setup>
    import { transform } from 'typescript'
    import { ref } from 'vue'

    const carousel_items = [{
            img_path: "/src/assets/carousel/phone_headset.png",
            link: "/",
            alt: "Banner dos Fones e Headsets"
        },
        {
            img_path: "/src/assets/carousel/hardware.png",
            link: "/",
            alt: "Banner dos Hardwares"
        },
        {
            img_path: "/src/assets/carousel/mouse_keyboard.png",
            link: "/",
            alt: "Banner dos Mouses e Teclados"
        }
    ]
    
    let currentBanner = ref(1)
    const lenBanners = carousel_items.length
    const currentScreenWidth = window.innerWidth

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
</script>


<template>
  <div :class="$style.carousel">
    

    <div :class="$style.carousel_slides"
    :style="{width: `calc(100% * ${lenBanners})`, transform: `translateX(calc(${currentScreenWidth}px * -${currentBanner - 1}))`}">
        <div
            v-for="item in carousel_items"
            :class="$style.banner_image">
            <a :href="item.link">
                <img :src="item.img_path" :alt="item.alt">
            </a>
        </div>
    </div>

    <div :class="$style.navigators">
        <!-- Back Button -->
        <div :class="[$style.carousel_btn, $style.left]"
            @click="changeBanner(-1)">
        </div>
        <!-- Next Button -->
        <div :class="[$style.carousel_btn, $style.right]"
            @click="changeBanner(1)">
        </div>
    </div>
    
    <div :class="$style.indicators">
        <!-- Indicators are created based on the number of images -->
        <div
            v-for="i in carousel_items.length"
            :class="[$style.indicators_bars, currentBanner === i ? $style.active : '']"
            :key="i"
            @click="currentBanner = i">
        </div>
    </div>

  </div>
</template>

<style module>
    .carousel {
        position: relative;
        width: 100%;
        aspect-ratio: 5.56 / 1;
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
    }
    .carousel_btn {
        width: 30px;
        height: 30px;
    }
    .carousel_btn.left {
        cursor: pointer;
        background-image: url('../../assets/carousel/back.png');
        background-size: cover;     
        background-repeat: no-repeat;  
        background-position: center; /* centralize */
    }
    .carousel_btn.right {
        cursor: pointer;
        background-image: url('../../assets/carousel/next.png');
        background-size: cover;     /* fill the div */
        background-repeat: no-repeat;  
        background-position: center; /* centralize */
    }
    .indicators_bars {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        border: #ffffff solid 1px;
        cursor: pointer;
        transition: background-color 1s ease, transform 1s ease;
    }
    .active {
        background-color: #ffffff;
        transform: scale(1.05);
    }
</style>