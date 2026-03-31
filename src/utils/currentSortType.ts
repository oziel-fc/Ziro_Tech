import { ref } from 'vue'

export type SortType = 'relevance' | 'price-asc' | 'price-desc'

// Default value
const currentSortType = ref<SortType>('price-desc')

export function useSort() {
  return {
    currentSortType
  }
}