import Vue from 'vue'
import Router from 'vue-router'
import Persons from './views/Persons.vue'
import Purchases from './views/Purchases.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'persons',
      component: Persons
    },
    {
      path: '/add-person',
      name: 'add-person',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/AddPerson.vue')
    },
    {
      path: '/edit-person/:id',
      name: 'edit-person',
      component: () => import('./views/EditPerson.vue')
    },
    {
      path: '/purchases',
      name: 'purchases',
      component: Purchases
    },
    {
      path: '/edit-purchase/:id',
      name: 'edit-purchase',
      component: () => import('./views/EditPurchase.vue')
    },
    {
      path: '/add-purchase',
      name: 'add-purchase',
      component: () => import('./views/AddPurchase.vue')
    },
    {
      path: '/table',
      name: 'table',
      component: () => import('./views/Table.vue')
    },
  ]
})
