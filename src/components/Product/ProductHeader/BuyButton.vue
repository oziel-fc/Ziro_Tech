<script setup lang='ts'>
    const props = defineProps<{
        shopee: Object | null
        olx: Object | null
        shopee_link: string
        olx_link: string
    }>()
</script>


<template>
  <div :class="$style.viewport_buy_button">

            <!-- Shopee Button -->
            <div v-if="props.shopee" :class="[$style.buy_button, $style.shopee_button]">
                <a :href="props.shopee_link" :class="$style.viewport_elem_anim" target="_blank" rel="noopener noreferrer">
                    <div :class="$style.left_elem_anim">
                        <img src="../../../assets/shopping_cart.png" alt="Shopping Cart" :style="{height: '35px', marginLeft: '5px'}">
                        <span>Comprar</span>
                    </div>
                    <div :class="$style.right_elem_anim">
                        <img src="../../../assets/shopee.png" alt="Shopee Icon" :style="{height: '35px'}">
                        <span>Shopee</span>
                    </div>
                </a>
            </div>

            <!-- OLX Button -->
            <div v-if="props.olx" :class="[$style.buy_button, $style.olx_button]">
                <a :href="props.olx_link" :class="$style.viewport_elem_anim" target="_blank" rel="noopener noreferrer">
                    <div :class="$style.left_elem_anim">
                        <img src="../../assets/shopping_cart.png" alt="Shopping Cart" :style="{height: '35px', marginLeft: '5px'}">
                        <span>Comprar</span>
                    </div>
                    <div :class="$style.right_elem_anim">
                        <img src="../../assets/olx.png" alt="OLX Icon" :style="{height: '35px'}">
                        <span>Olx</span>
                    </div>
                </a>
            </div>
        </div>
</template>


<style module>
.buy_button {
    position: relative;
    cursor: pointer;
    width: 100%;
    height: 70px;
    border-radius: 5px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: end;
    overflow: hidden;
}
.viewport_elem_anim {
    display: flex;
    flex-direction: row;
    height: 100%;
    width: 200%;
    position: absolute;
    transition: transform 1s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.buy_button:hover .viewport_elem_anim {
    transform: translateX(50%);
}
.right_elem_anim {
    height: 100%;
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.left_elem_anim {
    height: 100%;
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.buy_button span{
    display: inline-block;
    color: #F2F3F4;
    font-size: 30px;
    line-height: 1;
}
.shopee_button {
    background-color: #ee4d2d;
}
.olx_button {
    margin-top: 10px;
    background-color: #6e0ad6;
}
@media (max-width: 850px) {
    .buy_button {
        margin-bottom: 10px;
    }
}
</style>