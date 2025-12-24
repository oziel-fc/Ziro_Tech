<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const title = computed(() => route.meta.title as string)
const description = computed(() => route.meta.description as string | null)
</script>

<template>
  <section>
    <h1>{{ title }}</h1>
    <p v-if="description">{{ description }}</p>
  </section>
</template>

<style module>
  section {
    color: black
  }
</style>
