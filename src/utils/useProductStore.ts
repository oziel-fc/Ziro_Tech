import { ref, computed } from "vue"
import { slugify } from "./utils"
import { useRoute } from "vue-router"

/* =========================
  Types
========================= */

export interface Variation {
  [key: string]: string[]
}

interface BaseMarketplaceProduct {
  name: string
  price: string
  brand: string
  model: string
  category: string
  subcategory: string
  description: string
  images: string[]
  link: string
  stock: number
}

/* =========================
   Shopee
========================= */

interface ShopeeProduct extends BaseMarketplaceProduct {
  variation: Variation
}

/* =========================
   OLX
========================= */

interface OlxProduct extends BaseMarketplaceProduct {
  // For the future
}

/* =========================
  Main Product
========================= */

export interface RawProduct {
  shopee: ShopeeProduct | null
  olx: OlxProduct | null
}

/* =========================
  Storage
========================= */

export const DataProducts = ref<RawProduct[]>([])
export const isLoading = ref(false)

export const loadData = async () => {
  if (DataProducts.value.length > 0) return

  isLoading.value = true

  try {
    const url =
      "https://raw.githubusercontent.com/oziel-fc/products_ziro/refs/heads/master/products.json"

    const response = await fetch(url)
    if (!response.ok) throw new Error("Erro na requisição")

    const rawJSON: RawProduct[] = await response.json()

    DataProducts.value = rawJSON
    // console.log(DataProducts.value)
  } catch (err) {
    console.error("Error while searching for JSON: ", err)
  } finally {
    isLoading.value = false
  }
}

export function useProduct() {
    const route = useRoute()

    const product = computed(() => {
        const id = route.params.product

        return DataProducts.value.find(p =>
            (p.shopee && slugify(p.shopee.name) === id) ||
            (p.olx && slugify(p.olx.name) === id)
        )
    })

    return { product }
}