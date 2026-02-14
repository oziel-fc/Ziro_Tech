import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { slugify } from './slugify'

export const useSearchStore = defineStore('search', () => {
    const searchQuery = ref<String | null>(null)
    const route = useRoute()

    watch(
        () => route.params.searched,
        (newSearch) => {
            if (newSearch) {
                searchQuery.value = slugify(newSearch as string)
            }
        },
        { immediate: true }
    )

    function setSearch(newValue: string) {
        searchQuery.value = newValue
    }

    function cleanSearch() {
        searchQuery.value = null
    }
    
    console.log(searchQuery.value)

    return { searchQuery, setSearch, cleanSearch }
})