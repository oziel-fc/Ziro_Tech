import { createRouter, createWebHistory } from 'vue-router'
import Description from '../components/Utils/Description.vue'
import ProductsCards from '../components/Products/ProductsCards.vue'

const routes = [
  {
    path: '/',
    component: Description
  },
  {
    path: '/:category',
    component: Description
  },
  {
    path: '/:category/:subcategory',
    component: Description
  },
  {
    path: '/p/:product',
    component: ProductsCards
  },
  {
    path: '/search/:searched',
    component: ProductsCards
  }
]

export default createRouter({
  history: createWebHistory(),
  routes
})
