import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
    {
        path: "/",
        name: 'Home',
        component: () => import("@/views/home/index.vue"),
        meta: {
            title: 'Home'
        }
    },
    {
        path: "/about",
        name: "about",
        component: () => import("@/views/about/index.vue"),
        meta: {
            title: 'About'
        }
    }
]

const router = createRouter({
    history: createWebHistory(), // 使用HTML5 History 模式
    routes, // 路由配置
})

// 全局前置守卫，设置页面标题
router.beforeEach((to, _, next) => {
    // 设置页面标题
    if(to.meta.title) {
        document.title = to.meta.title as string;
    }
    next();
})

export default router;