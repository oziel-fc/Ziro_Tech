<script setup>
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
    
    let selected_img = ref(1)

    const changeBanner = (step) => {
        const len = carousel_items.length

        if (step == 1) {
            selected_img.value += step
            if (selected_img.value > len) {
                selected_img.value = 1
            }
        }
        else if (step == -1) {
            selected_img.value -= 1
            if (selected_img.value < 1) {
                selected_img.value = len
            }
        }
    }
</script>


<template>
  <div :class="$style.carousel">
    

    <div :class="$style.carousel_track">
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
            :class="[$style.indicators_bars, selected_img === i ? $style.active : '']"
            :key="i"
            @click="selected_img = i">
        </div>
    </div>

  </div>
</template>

<style module>
    .carousel {
        position: relative;
        background-color: aquamarine;
        width: 100%;
        aspect-ratio: 5.56 / 1;
    }
    .carousel img {
        width: 100%;
        height: 100%;
    }
    .carousel_track {
        height: 100%;
        overflow: hidden;
        position: relative;
        width: 100%;
        z-index: 1;
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
        transition: background-color 0.5s ease, transform 0.5s ease;
    }
    .active {
        background-color: #ffffff;
        transform: scale(1.05);
    }
</style>