<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import dataCategories from '../../data/dataCategories'
import { slugify } from '../../utils/slugify'
// import { watchEffect } from 'vue'

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


// watchEffect(() => {
//   // console.log('currentCategory agora é:', currentCategory.value, currentSubcategory.value)
// })

</script>

<template>
  <section :class="$style.description" v-if="currentCategory">
    <div>
      <h1>
        {{ currentSubcategory?.name || currentCategory?.category.name }}
      </h1>
      <p>
        {{
          currentSubcategory && currentSubcategory.description
            ? currentSubcategory.description
            : currentSubcategory
              ? ''
              : currentCategory?.category.description
        }}
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