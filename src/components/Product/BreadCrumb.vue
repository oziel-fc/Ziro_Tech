<script setup lang='ts'>
    import { RouterLink } from 'vue-router';
    import { useProduct } from '../../utils/useProductStore';
    import { slugify } from '../../utils/utils';
    import { computed } from 'vue';
    
    const { product } = useProduct()

    const category = computed(() => {
        if (!product.value) {
            return ''
        }
        if (product.value.shopee?.category) {
            return product.value.shopee.category
        }
        if (product.value.olx?.category) {
            return product.value.olx.category
        }
        return ''
    })

    const subcategory = computed(() => {
        if (!product.value) {
            return ''
        }

        if (product.value.shopee?.subcategory) {
            return product.value.shopee.subcategory
        }

        if (product.value.olx?.subcategory) {
            return product.value.olx.subcategory
        }

        return ''
    })

    const productName = computed(() => {
        if (!product.value) {
            return ''
        }

        if (product.value.shopee?.name) {
            return product.value.shopee.name
        }

        if (product.value.olx?.name) {
            return product.value.olx.name
        }

        return ''
    })
</script>


<template>
  <nav :class="$style.bread_crumb">
    <ol>
        <!-- Home -->
        <li>
            <RouterLink to="/" :style="{ textDecoration: 'none', color: 'inherit'}">
                <span>Home</span>
            </RouterLink>
        </li>
        <li>/</li>
        <!-- Category -->
        <li>
            <RouterLink :to="`/${slugify(category)}`" :style="{ textDecoration: 'none', color: 'inherit'}">
                <span>{{ category }}</span>
            </RouterLink>
        </li>
        <li>/</li>
        <!-- Subcategory -->
        <li>
            <RouterLink :to="`/search/${slugify(subcategory)}`" :style="{ textDecoration: 'none', color: 'inherit'}">
                <span>{{ subcategory }}</span>
            </RouterLink>
        </li>
        <li>/</li>
        <!-- Product Name -->
        <li>
            <span>{{ productName }}</span>
        </li>
    </ol>
  </nav>
</template>


<style module>
.bread_crumb {
    width: var(--default-page-width);
    color: #6b6b6b;
    display: flex;
    justify-content: initial;
    flex-direction: row;
    padding-bottom: 16px;
    font-weight: 700;
}
.bread_crumb ol {
    display: flex;          
    flex-wrap: wrap;       
    list-style: none;
    padding: 0;
    margin: 0;
    align-items: center; 
    gap: 8px;
}
.bread_crumb li {
    width: fit-content;
}
</style>