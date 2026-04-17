import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../components/Views/HomeView.vue'
import ProductView from '../components/Views/ProductView.vue'
import SearchView from '../components/Views/SearchView.vue'
import RedirectView from '../components/Views/RedirectView.vue'

import { isValidCategory } from '../utils/categoryValidator'

const routes = [
  {
    path: '/',
    component: HomeView
  },
  {
    path: '/p/:product',
    component: ProductView
  },
  {
    path: '/search/:searched',
    component: SearchView
  },
  {
    path: '/:category/:subcategory?',
    component: HomeView,
    meta: {
      validateCategory: true
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: RedirectView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to) => {
  if (to.meta.validateCategory) {
    const category = to.params.category as string
    const subcategory = to.params.subcategory as string | undefined

    if (!isValidCategory(category, subcategory)) {
      return { name: 'NotFound' }
    }
  }
})

export default router