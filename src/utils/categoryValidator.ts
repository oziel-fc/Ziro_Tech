import { slugify } from '../utils/utils'
import descriptionCategories from '../data/descriptionCategories'

export const isValidCategory = (category?: string, subcategory?: string) => {
  const foundCategory = descriptionCategories.find(
    c => slugify(c.category.name) === category
  )

  if (!foundCategory) return false

  if (!subcategory) return true

  const foundSubcategory = foundCategory.subcategories.find(
    sub => slugify(sub.name) === subcategory
  )

  return !!foundSubcategory
}