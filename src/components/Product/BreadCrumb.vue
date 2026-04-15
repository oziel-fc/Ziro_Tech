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
                <p>Home</p>
            </RouterLink>
        </li>
        <li>/</li>
        <!-- Category -->
        <li>
            <RouterLink :to="`/${slugify(category)}`" :style="{ textDecoration: 'none', color: 'inherit'}">
                <p>{{ category }}</p>
            </RouterLink>
        </li>
        <li>/</li>
        <!-- Subcategory -->
        <li>
            <RouterLink :to="`/search/${slugify(subcategory)}`" :style="{ textDecoration: 'none', color: 'inherit'}">
                <p>{{ subcategory }}</p>
            </RouterLink>
        </li>
        <li>/</li>
        <!-- Product Name -->
        <li>
            <p>{{ productName }}</p>
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
    font-size: 16px;
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
@media (max-width: 1150px) {
    .bread_crumb p {
        font-size: 15px;
    }
    .bread_crumb ol {
        gap: 5px;
    }
}
@media (max-width: 900px) {
    .bread_crumb {
        width: 100%;
        overflow: hidden;
    }
    .bread_crumb ol {
        flex-wrap: nowrap;
        gap: 4px;
    }
    .bread_crumb li {
        font-size: 14px;
        min-width: auto;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
}
@media (max-width: 900px) {
    .bread_crumb p {
        font-size: 13px;
    }
    .bread_crumb ol {
        gap: 3px;
    }
}
</style>