<script setup lang="ts">
  import { computed } from 'vue'
  import { useRoute } from 'vue-router'
  import dataCategories from '../../data/descriptionCategories'
  import { slugify } from '../../utils/slugify'

  const route = useRoute()

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
    if (!currentCategory.value && !currentSubcategory.value && !route.params.product) {
      return 'Destaques'
    }
    if (currentCategory.value && !currentSubcategory.value) {
      return currentCategory.value.category.name
    }
    if (currentCategory.value && currentSubcategory.value) {
      return currentSubcategory.value.name
    }
  })

  const showDescription = computed(() => {
    if (!currentCategory.value && !currentSubcategory.value && !route.params.product) {
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
    <div>
      <h1>
        {{ showTitle }}
      </h1>
      <p>
        {{ showDescription }}
    </p>
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
  .description div {
    width: var(--default-page-width);
    padding: 18px 0px;
    margin-top: 10px;
    border-bottom: 1px solid rgb(193 193 193);
  }
  .description h1 {
    color: black;
    font-size: 23px;
    margin: 8px 0px;
  }
  .description p {
    color: black;
    font-size: 14px;
  }
</style>