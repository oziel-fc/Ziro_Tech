<!-- CategoryItem.vue -->
<script setup lang="ts">
const props = defineProps<{
  category: string
  subcategories: string[]
}>()
</script>

<template>
  <li :class="$style.category">
    <a href="/">
      <span>{{ category }}</span>
    </a>

    <ul :class="$style.sub_element" v-if="subcategories.length">
      <li :class="$style.subcategorie" v-for="item in subcategories" :key="item">
        <a href="">
          <span>{{ item }}</span>
        </a>
      </li>
    </ul>
  </li>
</template>

<style module>
  .category {
    position: relative;
    width: 160px;
    height: 35px;
    font-size: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

  }

  .category span {
    color: white;
  }
  
  /* ul element */
  .sub_element {
    width: 100%;
    position: absolute;
    display: none;
    top: 100%;   /* aparece logo abaixo do li da categoria */
    left: 0;
    z-index: 1001;
  }

  .category:hover .sub_element {
    display: flex;
    flex-direction: column;
  }

  .subcategorie {
    height: 35px;
    background-color: #1b1b1b;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .subcategorie:hover {
    background-color: #252525;
    /* text-decoration: underline;
    text-decoration-color: black;
    text-underline-offset: 3px;
    text-decoration-thickness: 2px; */
  }
  
  .subcategorie span {
    font-size: 13px;
  }
</style>