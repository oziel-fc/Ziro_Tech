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

  .category:hover {
    background-color: rgb(255 255 255 / 30%);
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
    z-index: 10;
  }

  .category:hover .sub_element {
    display: flex;
    flex-direction: column;
  }

  .subcategorie {
    height: 35px;
    background-color: #dddbdb;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .subcategorie:hover {
    background-color: #e6e6e6;
    text-decoration: underline;
     text-decoration-color: rgba(0, 0, 0, 0.500);
    text-underline-offset: 2px;
    text-decoration-thickness: 1px;
  }
  
  .subcategorie span {
    color: rgba(0, 0, 0, 0.500);;
    font-size: 13px;
  }
</style>