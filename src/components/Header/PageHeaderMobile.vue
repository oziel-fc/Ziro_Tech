<script setup lang='ts'>
    import SearchBarMobile from './SearchBarMobile.vue';
    import { toggleIsOpen } from '../../utils/menuState';

</script>


<template>
  <header :class="$style.page_header">
    <div :class="$style.container">
        <div :class="$style.vw_MenuLogo">
            <button :class="$style.btn_Menu"
                @click="toggleIsOpen()">
                <img src="../../assets/menu_logo.png" alt="Botão do Menu Mobile">
            </button>
            <RouterLink :to="'/'" :class="$style.link_logo">
                <img :id="$style.logo" src="../../../public/ziro_logo.png" alt="Ziro Logo">
            </RouterLink>
        </div>
    </div>
    <div :class="$style.container_search">
        <SearchBarMobile/>
    </div>
  </header>
</template>


<style module>
.page_header {
    width: 100%;
    height: 150px;
    background-color: black;
    display: flex;
    flex-direction: column;
    padding: var(--mobile-padding) 24px;
    justify-content: end;
}
.container {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding-bottom: 20px;
}
.container_search {
    width: 100%;
    display: flex;
    justify-content: center;
}
.vw_MenuLogo {
    display: flex;
    flex-direction: row;
}
.btn_Menu {
    line-height: 0;
    padding: 5px;
}
.btn_Menu img {
    height: 25px;
}
.link_logo {
    display: flex;
    align-items: center;
}
#logo {
    height: 30px;
    margin-left: 10px;
}
@media (max-width: 450px) {
    #logo {
        height: 26px;
    }
}
</style>