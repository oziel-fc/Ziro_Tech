<script setup lang="ts">
  import { computed } from 'vue'
  import { useRoute } from 'vue-router'
  import dataCategories from '../../data/descriptionCategories'
  import { slugify } from '../../utils/utils'
  import { useSearchStore } from '../../utils/useSearchStore'
  import { useSort } from '../../utils/composables/currentSortType'
  import SortProducts from './SortProducts.vue'

  const route = useRoute()
  const searchedItem = useSearchStore()
  const { currentSortType } = useSort()


  // Function who changes every time with the change of the route
  const currentCategory = computed(() => {
    const category = route.params.category
    
    if (typeof category !== 'string') return undefined

    return dataCategories.find(
      c => slugify(c.category.name) === slugify(category)
    )
  })

  const currentSubcategory = computed(() => {
    const subcategory = route.params.subcategory

    if (typeof subcategory !== 'string') return undefined
    if (!currentCategory.value) return undefined

    return currentCategory.value.subcategories.find(
      sub => slugify(sub.name) === slugify(subcategory)
    )
  })


  // Functions to show the description
  const showTitle = computed(() => {
    if (route.path === '/') {
      return 'Destaques'
    }
    if (currentCategory.value && !currentSubcategory.value) {
      return currentCategory.value.category.name
    }
    if (currentCategory.value && currentSubcategory.value) {
      return currentSubcategory.value.name
    }
    if (searchedItem.searchQuery != null && searchedItem.searchQuery != '') {
      return searchedItem.searchQuery
    }
  })

  const showDescription = computed(() => {
    if (route.path === '/') {
      return 'Os produtos mais populares e selecionados especialmente para você.'
    }
    if (currentCategory.value && !currentSubcategory.value) {
      return currentCategory.value.category.description
    }
    if (currentCategory.value && currentSubcategory.value) {
      return currentSubcategory.value.description
    }
  })
</script>

<template>
  <section :class="$style.description" v-if="showTitle">
    <div :class="$style.viewport_description" v-if="searchedItem.searchQuery === null">
      <div :class="$style.organize_elements">
        
        <div :class="$style.text_elements">
          <h1 :id="$style.desc_text">
            {{ showTitle }}
          </h1>
          <p>
            {{ showDescription }}
          </p>
        </div>
        
        <SortProducts/>

      </div>
      

      <hr :style="{
        border: 'none',
        height: '1px',
        backgroundColor: '#b3b3b3',
        width: '100%',
        margin: '10px 0'
      }">

      
    </div>

    <div :class="$style.viewport_description" v-if="searchedItem.searchQuery != null">
      <h1 :class="$style.searched_text">
        Você buscou por: <strong>{{ showTitle }}</strong>
      </h1>
    </div>

  </section>
</template>

<style module>
  .description {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .viewport_description {
    width: var(--default-page-width);
    padding: 18px 0px;
    margin-top: 10px;
  }
  .organize_elements {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .text_elements {
    display: flex;
    flex-direction: column;
    width: fit-content;
  }
  #desc_text {
    color: black;
    font-size: 23px;
    margin: 8px 0px;
  }
  .description p {
    color: black;
    font-size: 14px;
  }
  .searched_text {
    color: black;
    font-size: 23px;
    margin: 8px 0px;
    font-weight: 400;
  }
</style>