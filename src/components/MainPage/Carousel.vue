<script setup>
    const imgs_carousel = [{
            path: "../../assets/carousel/phone_headset.png",
            link: "/",
            alt: "Banner dos Fones e Headsets"
        },
        {
            path: "../../assets/carousel/hardware.png",
            link: "/",
            alt: "Banner de Hardware"
        },
        {
            path: "../../assets/carousel/mouse_keyboard.png",
            link: "/",
            alt: "Banner dos Mouses e Teclados"
        }
    ]
</script>


<template>
  <div :class="$style.carousel">
    

    <div :class="$style.carousel_track">
        
    </div>

    <div :class="$style.navigators">
        <div :class="[$style.carousel_btn, $style.left]"></div>
        <div :class="[$style.carousel_btn, $style.right]"></div>
    </div>
    
    <div :class="$style.indicators">

    </div>

  </div>
</template>

<style module>
    .carousel {
        position: relative;
        background-color: aquamarine;
        width: 100%;   /* ou qualquer valor */
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
    }
    .navigators {
        align-items: center;
        display: flex;
        height: 100%;
        justify-content: space-between;
        pointer-events: none;
        position: absolute;
        top: 0;
        width: 100%;
        z-index: 1;
    }
    .indicators {
        align-items: center;
        display: flex;
        justify-content: space-between;
        pointer-events: none;
        position: absolute;
        bottom: 0;
        width: 100%;
        z-index: 1;
    }
    .carousel_btn {
        width: 50px;
        height: 50px;
    }
    .carousel_btn.left {
        background-image: url('../../assets/carousel/back.png');
    }
    .carousel_btn.right {
        background-image: url('../../assets/carousel/next.png');
    }
</style>