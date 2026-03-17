<script setup lang="ts">
  import { computed } from 'vue'
  import { useRoute } from 'vue-router'
  import dataCategories from '../../data/descriptionCategories'
  import { slugify } from '../../utils/utils'
  import { useSearchStore } from '../../utils/useSearchStore'

  const route = useRoute()
  const searchedItem = useSearchStore()


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
    <div :class="$style.desc_title" v-if="searchedItem.searchQuery === null">
      <h1 :class="$style.desc_text">
        {{ showTitle }}
      </h1>
      <p>
        {{ showDescription }}
      </p>
    </div>

    <div :class="$style.desc_title" v-if="searchedItem.searchQuery != null">
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
  .desc_title {
    width: var(--default-page-width);
    padding: 18px 0px;
    margin-top: 10px;
    border-bottom: 1px solid rgb(193 193 193);
  }
  .desc_text {
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