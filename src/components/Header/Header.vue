<script setup lang="ts">
  import Searcher from './Searcher.vue';
  import CategoryItems from './CategoryItems.vue';

  const menu = [
    {
      category: "PERIFÉRICOS",
      subcategories: ["MOUSES", "TECLADOS", "TECLADOS MECÂNICOS", "HEADSETS", "HEADPHONES", "FONES DE OUVIDO"]
    },
    {
      category: "HARDWARE",
      subcategories: ["MEMÓRIAS RAM", "SSDs", "PENDRIVES", "REDES"]
    },
    {
      category: "ACESSÓRIOS",
      subcategories: ["CABOS", "MOUSEPADS", "ADAPTADORES", "DECORAÇÃO"]
    },
    {
      category: "OUTROS",
      subcategories: ["FERRAMENTAS"]
    }
  ]

</script>

<template>
  <header>
    <div :class="$style.container">
      <a :class="$style.link_logo" href="/">
        <img :id="$style.logo" src="../../../public/ziro_logo.png" alt="Ziro Logo">
      </a>
      <div>
        <ul :class="$style.category_bar">
          <CategoryItems
            v-for="item in menu"
              :key="item.category"
              :category="item.category"
              :subcategories="item.subcategories"
          />
        </ul>
      </div>
      <Searcher/>
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
    justify-content: space-between;
    align-items: end;
  }
  .link_logo {
    display: flex;
    align-items: center;
    margin-bottom: 18px;
  }
  #logo {
    height: 32px;
  }
  .category_bar {
    display: flex;
    flex-direction: row;
  }
</style>