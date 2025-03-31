export default [
    {
        path: "/",
        name: "dashboard",
        component: () => import('./dashboard.vue')
    },
    {
        path: "/hello",
        name: "helloworld",
        component: () => import('./helloWorld.vue')
    },
    {
        path: "/user",
        name: "user",
        component: () => import('./user.vue')
    }
]