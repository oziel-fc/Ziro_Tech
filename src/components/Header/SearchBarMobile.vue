<script setup lang="ts">
    import { ref } from 'vue'
    import { useSearchStore } from '../../utils/useSearchStore'
    import { useRouter } from 'vue-router'
    import { slugify } from '../../utils/utils'

    const router = useRouter()
    const searchStore = useSearchStore()
    const localSearch = ref('')

    const handleSearch = () => {
        const search = slugify(localSearch.value)

        if (!search) return

        searchStore.setSearch(search)
        router.push(`/search/${search}`)
    }

</script>


<template>
  <div :class="$style.search_bar">
    <form :class="$style.form_bar" @submit.prevent="handleSearch">
        <input
            v-model="localSearch"
            :class="$style.input" 
            type="search" 
            placeholder="O que você está procurando? Digite Aqui..." 
            />
        <button :class="$style.button_search">
            <img src="../../../src/assets/search.png" alt="Lupa">
        </button>
    </form>
  </div>
</template>

<style module>
    .search_bar {
        width: 100%;
        height: 45px;
    }
    .form_bar {
        display: flex;  /* Alinha o input e o botão lado a lado */
        width: 100%;    
        height: 100%;
        border: 2px solid #ccc;
        border-radius: 4px; 
        overflow: hidden; /* Garante que tudo fique dentro da borda */
    }
    .input {
        flex-grow: 1; /* O input ocupa todo o espaço restante */
        padding: 0px 5px;
        border: none;
        outline: none; /* Remove a borda padrão de foco */
        font-size: 14px;
    }
    .button_search {
        background-color: black;
        width: 40px;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .button_search img {
        width: 25px;
        height: 25px;
    }
</style>