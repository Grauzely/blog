import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _39c5ec6d = () => interopDefault(import('..\\pages\\search.vue' /* webpackChunkName: "pages/search" */))
const _1519009d = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))
const _3483c05a = () => interopDefault(import('..\\pages\\_category\\index.vue' /* webpackChunkName: "pages/_category/index" */))
const _87835c0a = () => interopDefault(import('..\\pages\\_category\\_subcategory\\index.vue' /* webpackChunkName: "pages/_category/_subcategory/index" */))
const _8af09e9a = () => interopDefault(import('..\\pages\\_category\\_subcategory\\_slug.vue' /* webpackChunkName: "pages/_category/_subcategory/_slug" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/search",
    component: _39c5ec6d,
    name: "search"
  }, {
    path: "/",
    component: _1519009d,
    name: "index"
  }, {
    path: "/:category",
    component: _3483c05a,
    name: "category"
  }, {
    path: "/:category/:subcategory",
    component: _87835c0a,
    name: "category-subcategory"
  }, {
    path: "/:category/:subcategory/:slug",
    component: _8af09e9a,
    name: "category-subcategory-slug"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
