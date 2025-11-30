import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import ResourcesView from '../views/ResourcesView.vue'
import ResourceFormView from '../views/ResourceFormView.vue'
import ResourceDetails from '../views/ResourceDetails.vue'
import { getToken } from '../services/authService'

const routes = [
  { path: '/', redirect: '/resources' },
  { path: '/login', name: 'login', component: LoginView },
  { path: '/resources', name: 'resources', component: ResourcesView, meta: { requiresAuth: true } },
  { path: '/resources/new', name: 'resource-new', component: ResourceFormView, meta: { requiresAuth: true } },
  { path: '/resources/:id/edit', name: 'resource-edit', component: ResourceFormView, meta: { requiresAuth: true } },
  { path: '/resources/:id', name: 'resource-details', component: ResourceDetails, meta: { requiresAuth: true } }
]

const router = createRouter({ history: createWebHistory(), routes })

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const token = getToken()
    if (!token) {
      return next({ name: 'login' })
    }
  }
  next()
})

export default router
