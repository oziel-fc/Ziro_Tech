<script setup lang='ts'>
    import SearchBarMobile from './SearchBarMobile.vue';

</script>


<template>
  <header :class="$style.page_header">
    <div :class="$style.container">
        <RouterLink :to="'/'" :class="$style.link_logo">
            <img :id="$style.logo" src="../../../public/ziro_logo.png" alt="Ziro Logo">
        </RouterLink>
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
.link_logo {
    display: flex;
    align-items: center;
}
#logo {
    height: 30px;
}
</style>