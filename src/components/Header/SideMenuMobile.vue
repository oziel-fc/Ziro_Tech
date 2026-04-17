<script setup lang='ts'>

</script>


<template>
  <div :class="$style.sideMenu">
    <div :id="$style.topMenu">
      <RouterLink :to="'/'">
        <img src="../../../public/ziro_logo.png" alt="Logo do Menu Lateral">
      </RouterLink>
      <button>
        <img src="../../assets/close.png" alt="Botão de Fechar">
      </button>
    </div>
  </div>
</template>


<style module>
.sideMenu {
  height: 100vh;
  z-index: 1001;
  width: 300px;
  position: absolute;
  background-color: black;
  border: solid 1px red;
}
#topMenu {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px 10px 0px 20px;
}
#topMenu img {
  height: 30px;
}
</style>