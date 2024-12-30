import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/public/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/menu_and_categories',
    name: 'MenuAndCategories',
    component: () => import('../views/private/admin/MenuAndCategories.vue')
  },

  {
    path: "/orders",
    name: "Orders",
    component: () => import("../views/private/cashier/Orders.vue"),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
