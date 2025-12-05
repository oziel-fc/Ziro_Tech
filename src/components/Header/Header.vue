<script setup lang="ts">
</script>

<template>
  <header>
    <div :class="$style.container">
      <a :class="$style.link_logo" href="/">
        <img :id="$style.logo" src="../../../public/ziro_logo.png" alt="logo">
      </a>
    </div>
  </header>
</template>

<style module>
  header {
    width: 100%;
    height: 105px;
    background-color: black;
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
  }
  .container {
    width: var(--default-page-width);
    height: 100%;
    display: flex;
    position: relative;
    align-items: end;
    padding-bottom: 12px;
  }
  .link_logo {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    margin-left: 10px;
  }
  #logo {
    height: 32px;
  }
</style>