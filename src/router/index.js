import { createRouter, createWebHashHistory } from 'vue-router'
import GlobalFeed from '@/views/GlobalFeed'
import Register from '@/views/Register'
import Login from '@/views/Login'

const routes = [
    {
        path: '/',
        name: 'globalfeed',
        component: GlobalFeed
    },
    {
        path: '/register',
        name: 'register',
        component: Register
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
