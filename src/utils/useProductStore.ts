import { ref } from "vue"

/* =========================
  Types
========================= */

interface Variation {
  [variationName: string]: {
    [optionName: string]: string
  }
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
}

/* =========================
   Shopee
========================= */

interface ShopeeProduct extends BaseMarketplaceProduct {
  stock: number
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
    console.log(DataProducts.value)
  } catch (err) {
    console.error("Error while searching for JSON: ", err)
  } finally {
    isLoading.value = false
  }
}