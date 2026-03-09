import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { slugify } from './formatters'

export const useSearchStore = defineStore('search', () => {
    const searchQuery = ref<String | null>(null)
    const route = useRoute()

    watch(
        () => route.params.searched,
        (searchedItem) => {
            if (searchedItem) {
                searchQuery.value = slugify(searchedItem as string)
            }
            else {
                searchQuery.value = null
            }
            // Testing the watch function
            // console.log(searchQuery.value)
        },
        { immediate: true }
    )

    function setSearch(newValue: string) {
        searchQuery.value = newValue
    }

    function cleanSearch() {
        searchQuery.value = null
    }
    
    

    return { searchQuery, setSearch, cleanSearch }
})