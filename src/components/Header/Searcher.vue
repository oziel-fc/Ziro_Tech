<script setup lang="ts">
    import { ref } from 'vue'
    import { useSearchStore } from '../../utils/useSearchStore'
    import { useRouter } from 'vue-router'

    const router = useRouter()
    const searchStore = useSearchStore()
    const localSearch = ref('')

    const handleSearch = () => {
        const search = localSearch.value.trim()

        if (!search) return

        searchStore.setSearch(search)
        router.push(`/search/${search}`)
    }

</script>


<template>
  <div :class="$style.search_bar">
    <form :class="$style.input_bar" @submit.prevent="handleSearch">
        <input
            v-model="localSearch"
            :class="$style.input" 
            type="search" 
            placeholder="O que você procura?" 
            />
        <button :class="$style.button_search">
            <img src="../../../src/assets/search.png" alt="Lupa">
        </button>
    </form>
  </div>
</template>

<style module>
    .search_bar {
        width: 300px;
        height: 34px;
        margin-bottom: 12px;
    }
    .input_bar {
        display: flex;  /* Alinha o input e o botão lado a lado */
        width: 100%;    
        height: 100%;
        border: 2px solid #ccc;
        border-radius: 4px; /* Bordas arredondadas */
        overflow: hidden; /* Garante que tudo fique dentro da borda */
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