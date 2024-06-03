import { createRouter, createWebHashHistory } from 'vue-router'
import GlobalFeed from '@/views/GlobalFeed'
import Register from '@/views/Register'
import Login from '@/views/Login'

const routes = [
    {
        path: '/register',
        name: 'register',
        component: Register
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/',
        name: 'globalfeed',
        component: GlobalFeed
    },
    {
        path: '/feed',
        name: 'yourFeed',
        component: GlobalFeed
    },
    {
        path: '/tags/:slug',
        name: 'tag',
        component: GlobalFeed
    },
    {
        path: '/article/new',
        name: 'createArticle',
        component: GlobalFeed
    },
    {
        path: '/article/:slug',
        name: 'article',
        component: GlobalFeed
    },
    {
        path: '/article/:slug/edit',
        name: 'editarticle',
        component: GlobalFeed
    },
    {
        path: '/settings',
        name: 'settings',
        component: GlobalFeed
    },
    {
        path: '/profiles/:slug',
        name: 'userProfile',
        component: GlobalFeed
    },
    {
        path: '/profiles/:slug/favorites',
        name: 'userProfileFavorites',
        component: GlobalFeed
    },

]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
