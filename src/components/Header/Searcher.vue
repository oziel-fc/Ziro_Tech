<script setup lang="ts">
    import { ref } from 'vue'
    import { useSearchStore } from '../../utils/useSearchStore'
    import { useRouter } from 'vue-router'
    import { useIsMobile } from '../../utils/useIsMobile'

    const router = useRouter()
    const searchStore = useSearchStore()
    const localSearch = ref('') 
    const { isMobile } = useIsMobile()

    const handleSearch = () => {
        const search = localSearch.value.trim()

        if (!search) return

        searchStore.setSearch(search)
        router.push(`/search/${search}`)
    }

</script>


<template>
  <div :class="$style.search_bar" v-if="!isMobile">
    <input
        @keydown.enter="handleSearch"
        v-model="localSearch"
        :class="$style.input" 
        type="search" 
        placeholder="O que você procura?" 
        />
    <button :class="$style.button_search" 
        @click="handleSearch">
        <img src="../../../src/assets/search.png" alt="Lupa">
    </button>
  </div>
</template>

<style module>
    .search_bar {
        width: 300px;
        height: 34px;
        margin-bottom: 12px;
        border: 2px solid #ccc;
        display: flex;
        border-radius: 4px;
    }
    .input {
        flex-grow: 1; /* O input ocupa todo o espaço restante */
        padding: 0px 5px;
        border: none;
        outline: none; /* Remove a borda padrão de foco */
        font-size: 13px;
    }
    .button_search {
        background-color: black;
        width: 30px;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .button_search img {
        width: 20px;
        height: 20px;
    }

    /* Responsiveness */
    @media (max-width: 1350px) {
        .search_bar {
            width: 260px;
            height: 32px;
        }
    }
    @media (max-width: 1250px) {
        .search_bar {
            width: 240px;
        }
    }
    @media (max-width: 1180px) {
        .search_bar {
            width: 220px;
        }
    }
    @media (max-width: 1100px) {
        .search_bar {
            width: 200px;
        }
        .input {
            font-size: 12px;
        }
    }
</style>