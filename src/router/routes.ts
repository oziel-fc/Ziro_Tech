import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../components/Views/HomeView.vue'
import ProductView from '../components/Views/ProductView.vue'

const routes = [
  {
    path: '/',
    component: HomeView
  },
  {
    path: '/:category',
    component: HomeView
  },
  {
    path: '/:category/:subcategory',
    component: HomeView
  },
  {
    path: '/p/:product',
    component: ProductView
  },
  {
    path: '/search/:searched',
    component: HomeView
  }
]

export default createRouter({
  history: createWebHistory(),
  routes
})
