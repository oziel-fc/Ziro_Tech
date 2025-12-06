<template>
  <div :class="$style.search_bar">
    <form :class="$style.input_bar">
        <input :class="$style.input" type="search" placeholder="O que você procura?" />
        <button :class="$style.button_search">
            <img src="../../../src/assets/search.png" alt="">
        </button>
    </form>
  </div>
</template>

<script setup>
</script>

<style module>
    .search_bar {
        width: 300px;
        height: 34px;
    }
    .input_bar {
        display: flex;  /* Alinha o input e o botão lado a lado */
        width: 100%;    
        height: 100%;
        border: 2px solid #ccc;
        border-radius: 4px; /* Bordas arredondadas */
        overflow: hidden; /* Garante que tudo fique dentro da borda */
    }
    .input {
        flex-grow: 1; /* O input ocupa todo o espaço restante */
        padding: 0px 5px;
        border: none;
        outline: none; /* Remove a borda padrão de foco */
        font-size: 13px;
    }
    .button_search {
        background-color: black;
        width: 30px;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .button_search img {
        width: 20px;
        height: 20px;
    }
</style>