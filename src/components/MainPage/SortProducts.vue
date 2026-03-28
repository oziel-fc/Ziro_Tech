<script setup lang='ts'>
  import { useSort } from '../../utils/composables/currentSortType';
  import { type SortType } from '../../utils/composables/currentSortType';
  import { ref, watchEffect, computed } from 'vue'
  import { getWidthOf } from '../../utils/useElementWidth';
  import { isLoading } from '../../utils/useProductStore';

  const { currentSortType } = useSort()

  const sortOptions: { label: string; value: SortType }[] = [
    { label: 'Relevância', value: 'relevance' },
    { label: 'Maior preço', value: 'price-desc' },
    { label: 'Menor preço', value: 'price-asc' }
  ]

  const viewportSort = ref(null)
  const width = getWidthOf(viewportSort)

  const currentSortLabel = computed(() => {
    return sortOptions.find(option => option.value === currentSortType.value)?.label
  })

  const setCurrentSort = (newCurrentSort: SortType) => {
    isLoading.value = true
    currentSortType.value = newCurrentSort
  

    setTimeout(() => {
      isLoading.value = false
    }, 200)
  }

  const isActive = ref<boolean>(false)

  watchEffect(() => {
    // console.log(width.value)
  })
</script>


<template>
  <div :class="$style.viewport_sort" ref="viewportSort">
    <button :class="$style.sort_button" @click="isActive = !isActive">
      <div :id="$style.sort_icon">
        <img src="../../assets/sort.png" alt="Ícone de Ordenação">
      </div>
      <span>{{ currentSortLabel }}</span>
      <div :id="$style.arrow">
        <img src="../../assets/arrow.png" alt="Seta Indicativa de Ativação" :style="{transform: isActive ? `scaleY(-1)` : ''}">
      </div>
    </button>

    <ul :class="$style.sort_options" :style="{width: `${width}px`}" v-if="isActive">
      <li v-for="option in sortOptions" @click="setCurrentSort(option.value)">
        {{ option.label }}
      </li>
    </ul>
  </div>
</template>


<style module>
.viewport_sort {
  font-size: 15px;
  color: black;
  height: 32px;
  width: 165px;
  border: 1px solid black;
  border-radius: 4px;
}
.viewport_sort img {
  width: 100%;
  height: 100%;
}
.sort_button {
  width: 100%;
  height: 100%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 10px;
}
#arrow {
  width:fit-content;
  height: 100%;
  display: flex;
  align-items: center;
}
#arrow img {
  height: 15px;
  width: 15px;
}
#sort_icon {
  width:fit-content;
  height: 100%;
  display: flex;
  align-items: center;
}
#sort_icon img {
  height: 14px;
  width: 14px;
}
.sort_options {
  border: 1px solid black;
  border-radius: 4px;
  margin-top: 2px;
  background-color: whitesmoke;
  z-index: 1001;
  display: flex;
  flex-direction: column;
  padding: 5px 0px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 12px;
}
.sort_options li {
  height: 25px;
  width: 100%;
  text-align: center;
  cursor: pointer;
}
.sort_options li:hover {
  text-decoration: underline;
}
</style>