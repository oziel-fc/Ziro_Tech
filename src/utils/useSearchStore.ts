import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSearchStore = defineStore('search', () => {
    const searchQuery = ref('') // global state

    // function to set global state
    function setSearch(newValue: string) {
        searchQuery.value = newValue
        console.log(newValue)
    }

    return { searchQuery, setSearch }
})