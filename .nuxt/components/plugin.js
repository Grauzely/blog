import Vue from 'vue'

const globalComponents = {
  AppSearchInput: () => import('../..\\components\\global\\AppSearchInput.vue' /* webpackChunkName: "components_global/AppSearchInput" */).then(c => c.default || c),
  Card: () => import('../..\\components\\global\\Card.vue' /* webpackChunkName: "components_global/Card" */).then(c => c.default || c),
  Dropdown: () => import('../..\\components\\global\\Dropdown.vue' /* webpackChunkName: "components_global/Dropdown" */).then(c => c.default || c),
  Footer: () => import('../..\\components\\global\\Footer.vue' /* webpackChunkName: "components_global/Footer" */).then(c => c.default || c),
  NavBar: () => import('../..\\components\\global\\NavBar.vue' /* webpackChunkName: "components_global/NavBar" */).then(c => c.default || c),
  PageCategory: () => import('../..\\components\\global\\PageCategory.vue' /* webpackChunkName: "components_global/PageCategory" */).then(c => c.default || c),
  Paginator: () => import('../..\\components\\global\\Paginator.vue' /* webpackChunkName: "components_global/Paginator" */).then(c => c.default || c),
  PrevNext: () => import('../..\\components\\global\\PrevNext.vue' /* webpackChunkName: "components_global/PrevNext" */).then(c => c.default || c)
}

for (const name in globalComponents) {
  Vue.component(name, globalComponents[name])
}
