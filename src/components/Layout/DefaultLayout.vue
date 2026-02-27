<script setup>
    import { RouterView } from 'vue-router';
    import PageHeader from '../Header/PageHeader.vue';
    import HomeView from '../Views/HomeView.vue';
    import { onMounted } from 'vue';
    import { loadData } from '../../utils/useProductStore';

    onMounted(() => {
      loadData()
    })
</script>

<template>
  <PageHeader/>
  <RouterView/>
</template>

<style scoped>

</style>