import { createRouter, createWebHashHistory } from "vue-router";
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/spider",
      name: "spider",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../components/Spider/Spider.vue"),
    },
    {
      path: "/",
      name: "home",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => {
        import("../components/TutorialComponent.vue");
      },
    },
  ],
});

export default router;
