import Vue from 'vue'
import Router from 'vue-router'
import Pages from '@/components/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/1',
      name: 'pages',
      component: Pages,
      children: [
        {
          path: ':id',
          component: Pages,
        },
      ],
    },
  ],
  mode: 'history'
})
