<script setup lang="ts">
  import { RouterView } from 'vue-router';
  import PageHeader from '../Header/PageHeader.vue';
  import { onMounted, watchEffect } from 'vue';
  import { loadData } from '../../utils/useProductStore';
  import { ref, watch, nextTick } from 'vue'
  import { useRoute } from 'vue-router'

  onMounted(() => {
    loadData()
  })
  

  const mainContainer = ref<HTMLElement | null>(null)
  const route = useRoute()

  // Storage position by route
  const scrollPositions = new Map<string, number>();

  watch(
    () => route.fullPath,
    async (to, from) => {
      // Save last position
      if (mainContainer.value) {
        scrollPositions.set(from, mainContainer.value.scrollTop)
      }

      await nextTick()

      const savedPosition = scrollPositions.get(to)

      mainContainer.value?.scrollTo({
        top: savedPosition ?? 0,
        behavior: 'smooth'
      })
    }
  )
  watchEffect(() => {
    // console.log(scrollPositions)
  })
</script>

<template>
  <main ref="mainContainer">
    <PageHeader/>
    <RouterView/>
  </main>
</template>

<style scoped>
main {
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>