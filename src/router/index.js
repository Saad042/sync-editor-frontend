import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'listing',
    component: function () {
      return import(/* webChunkName: "listing" */ '../views/ListingView.vue');
    },
  },
  {
    path: '/doc/create',
    name: 'create',
    component: function () {
      return import(/* webpackChunkName: "edit" */ '../views/EditView.vue');
    },
  },
  {
    path: '/doc/:id/edit',
    name: 'edit',
    component: function () {
      return import(/* webpackChunkName: "edit" */ '../views/EditView.vue');
    },
  },
  {
    path: '/doc/:id/view',
    name: 'view',
    component: function () {
      return import(/* webpackChunkName: "view" */ '../views/ItemView.vue');
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
