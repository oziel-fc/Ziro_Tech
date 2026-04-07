import { computed, type Ref } from "vue"
import { useRoute } from "vue-router"
import { type ProductSimple } from "./utils" 
import { slugify } from "./utils"
import { type SortType } from "./currentSortType"
import { sortProducts } from '../utils/useSortProducts';


export function useFilteredProducts(
  DataProducts: Ref<ProductSimple[]>,
  currentSortType: Ref<SortType>
) {
  const route = useRoute()

  const filteredDataProducts = computed<ProductSimple[]>(() => {
    const { category, subcategory, searched } = route.params
    const productsData = DataProducts.value

    const searchedTerms = slugify(String(searched || ""))
      .split("-")
      .filter(word => word.length > 2)

    return sortProducts(
      productsData.filter(product => {
        const productNameWordlist = slugify(product.shopee?.name || "")
        const productSubcategory = slugify(product.shopee?.subcategory || "")
        const productCategory = slugify(product.shopee?.category || "")

        // Home
        if (route.path === "/") {
            // When in Home shows only the available products
          if (product.shopee?.stock) {
            return true
          }
        }

        // Search Cards
        if (searchedTerms.length > 0) {
          if (
            searchedTerms.some(item =>
              productNameWordlist.includes(item) ||
              item == productCategory ||
              item == productSubcategory
            )
          ) {
            return true
          }
        }

        // Subcategory Cards
        if (subcategory && productSubcategory === subcategory) return true

        // Category Cards
        if (!subcategory && productCategory === category) return true

        return false
      }),
      currentSortType.value
    )
  })

  return {
    filteredDataProducts
  }
}