import Vue from 'vue';
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  // base: process.env.BASE_URL,
  base: '/student',
  routes: [
    {
      path: "/",
      meta: {
        title: 'Видео сабақ'
      },
      component: () => import("@/views/Lesson.vue"),
      children: [
        {
          path: "",
          name: "lesson",
          meta: {
            title: "Видео сабақ"
          },
          component: () => import('@/models/lesson/lesson.vue')
        },
        {
          path: "lesson/",
          meta: {
            title: "Видео сабақ"
          },
          component: () => import('@/models/lesson/lesson.vue')
        }
      ]
    },
    {
      path: "/login",
      meta: {
        title: 'Порталға кіру'
      },
      component: () => import("@/views/Auth.vue"),
      children: [
        {
          path: "",
          name: "login",
          meta: {
            title: 'Порталға кіру'
          },
          component: () => import("@/models/auth/login.vue")
        },
        {
          path: "change/password/",
          name: "changePassword",
          metha: {
            title: "Парольді ауыстыру"
          },
          component: () => import("@/models/auth/changePassword.vue")
        }
      ]
    },
    {
      path: "/*",
      component: () => import("@/views/PageNotFound.vue")
    }
  ]
});
