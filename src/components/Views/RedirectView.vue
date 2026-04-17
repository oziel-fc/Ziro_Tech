<script setup lang='ts'>

</script>


<template>
  <div :class="$style.redirectView">
    <h1>Página não encontrada!</h1>
    <img src="../../assets/redirect/page_not_found.png" alt="">
    <h2>Oops! Algo não saiu como esperado.</h2>
    <p>A página que você está procurando não existe ou foi movida.</p>
    <p>Volte para nossa <RouterLink :to="'/'" :style="{textDecoration: 'underline'}">página inicial.</RouterLink></p>
  </div>
</template>


<style module>
.redirectView {
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 70vh
}
.redirectView h1 {
  font-size: 28px;
}
.redirectView h2 {
  font-size: 22px;
}
.redirectView p {
  font-size: 18px;
  text-align: center;
}
@media (max-width: 650px) {
  .redirectView h1 {
    font-size: 26px;
  }
  .redirectView h2 {
    font-size: 20px;
  }
  .redirectView p {
    font-size: 17px;
  }
}
@media (max-width: 500px) {
  .redirectView h1 {
    font-size: 24px;
  }
  .redirectView h2 {
    font-size: 19px;
  }
  .redirectView p {
    font-size: 16px;
  }
}
</style>