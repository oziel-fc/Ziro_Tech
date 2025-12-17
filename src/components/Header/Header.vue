<script setup lang="ts">
  import Searcher from './Searcher.vue';
  import CategoryItems from './CategoryItems.vue';
  import { ref, onMounted } from 'vue';

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
  
  const lenCategoriesBars = menu.length
  const categoryBarElement = ref<HTMLUListElement | null>(null);
  const categoryBarWidth = ref(0);
  const hoverIndex = ref(0)

  // Function to update the value of width everytime who changes
  onMounted(() => {
    if (!categoryBarElement.value) return;

    const observer = new ResizeObserver(([entry]) => {
      const width = entry?.contentRect.width;
      if (width !== undefined) {
        categoryBarWidth.value = width;
      }
    });

    observer.observe(categoryBarElement.value);
  });

  // Function coming from the component category, this func acts everytime hover the category element
  const hoverElementIndex = (id: number) => {
    hoverIndex.value = id
  }

</script>

<template>
  <header>
    <div :class="$style.container">
      <a :class="$style.link_logo" href="/">
        <img :id="$style.logo" src="../../../public/ziro_logo.png" alt="Ziro Logo">
      </a>
      <div>
        <ul :class="$style.category_bar" ref="categoryBarElement">
          <CategoryItems
            v-for="(item, index) in menu"
              :key="item.category"
              :category="item.category"
              :subcategories="item.subcategories"
              :index="index"
              @hover-capture-id="hoverElementIndex"
          />

          <div :id="$style.marker" :style="{width: `calc(${categoryBarWidth}px / ${lenCategoriesBars})`, 
            transform: `translateX(${(categoryBarWidth / lenCategoriesBars) * hoverIndex}px)`}"></div>
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
  #marker {
    display: none;
    height: 6px;
    background: #1b1b1b !important;
    position: absolute;
    bottom: 0;
    z-index: 1;
    transition: transform 0.3s ease;
    pointer-events: none;
  }
  .category_bar:hover #marker {
    display: block;
  }
</style>