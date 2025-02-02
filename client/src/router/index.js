import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import store from '../store';

Vue.use(VueRouter);

const routes = [
   {
      path: '/',
      name: 'Home',
      component: Home,
   },
   {
      path: '/:id',
      component: () => import('../views/V.vue'),
   },
];

const router = new VueRouter({
   mode: 'history',
   base: process.env.BASE_URL,
   routes,
   scrollBehavior() {
      return { x: 0, y: 0 };
   },
});

router.beforeEach((to, from, next) => {
   if (to.matched.some((record) => record.meta.requiresAuth)) {
      if (!store.getters.isLoggedIn) {
         // Redirect to login page
         next('/login');
      } else {
         next();
      }
   } else if (to.matched.some((record) => record.meta.requiresGuest)) {
      if (store.getters.isLoggedIn) {
         // Redirect to login page
         next('/profile');
      } else {
         next();
      }
   } else {
      next();
   }
});

export default router;
