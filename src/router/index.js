import { createRouter, createWebHistory } from 'vue-router'
import { apiHost } from '@/config'
const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('./../views/LoginView.vue')
  },
  {
    path: '/',
    name: 'home',
    component: () => import('./../views/HomeView.vue'),
    children: [
      {
        path: 'collection/:collectID(\\d+)',
        name: 'collectionInfo',
        component: () => import('../views/CollectionView.vue'),
        props: true
      },
      {
        path: 'collection',
        name: 'listInfo',
        component: () => import('./../views/ListView.vue'),
        props: true
      },
      {
        path: 'gallery/:collectID(\\d+)/:galleryID(\\d+)/:pageNum(\\d+)',
        name: 'page',
        component: () => import('./../views/PageView.vue'),
        props: true
      },
      {
        path: 'task',
        name: 'task',
        component: () => import('./../views/TaskView.vue'),
        props: true
      }
    ]
  },
  {
    path: '/:pathMatch(.*)',
    redirect: '/',
    hidden: true
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from) => {
  const result = await (await fetch(apiHost + '/auth/check', { credentials: 'include' })).json()
  if (!result.data.isLogin && to.name !== 'login') {
    return { name: 'login' }
  }
})

export default router
