import { type ProductSimple } from "./utils"
import { type SortType } from "./currentSortType"

const parsePrice = (price?: string | number) => {
  if (!price) return 0

  if (typeof price === 'number') return price

  const firstPrice = price.split('-')[0]?.trim() || ''

  return Number(
    firstPrice
      .replace(/[^\d,.-]/g, '')
      .replace(/\./g, '')
      .replace(',', '.')
  )
}

export const sortProducts = (
  products: ProductSimple[],
  sortType: SortType
): ProductSimple[] => {

  return [...products].sort((a, b) => {

    const aStock = a.shopee?.stock ?? 0
    const bStock = b.shopee?.stock ?? 0

    const aHasStock = aStock > 0
    const bHasStock = bStock > 0

    // First products with stock
    if (aHasStock !== bHasStock) {
      return aHasStock ? -1 : 1
    }

    if (sortType === 'relevance') {
      return 0
    }

    const aPrice = parsePrice(a.shopee?.price)
    const bPrice = parsePrice(b.shopee?.price)

    if (sortType === 'price-asc') {
      return aPrice - bPrice
    }

    if (sortType === 'price-desc') {
      return bPrice - aPrice
    }

    return 0
  })
}