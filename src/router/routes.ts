import { createRouter, createWebHistory } from 'vue-router'
import Description from '../components/Utils/Description.vue'

const routes = [
  {
    path: '/:category',
    component: Description
  },
  {
    path: '/:category/:subcategory',
    component: Description
  }
]

export default createRouter({
  history: createWebHistory(),
  routes
})
