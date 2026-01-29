<script setup lang="ts">
  import Searcher from './Searcher.vue';
  import CategoryItems from './CategoryItems.vue';
  import { ref, onMounted } from 'vue';
  import dataCategories from '../../data/dataCategories';

  
  const lenCategoriesBars = dataCategories.length
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
      <RouterLink :to="'/'" :class="$style.link_logo">
        <img :id="$style.logo" src="../../../public/ziro_logo.png" alt="Ziro Logo">
      </RouterLink>
      <div>
        <ul :class="$style.category_bar" ref="categoryBarElement">
          <CategoryItems
            v-for="(item, index) in dataCategories"
              :key="item.category.name"
              :category="item.category.name"
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
    transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    pointer-events: none;
  }
  .category_bar:hover #marker {
    display: block;
  }
</style>