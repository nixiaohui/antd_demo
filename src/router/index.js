import Vue from 'vue'
import Router from 'vue-router'
import Container from '@/views/Container.vue'
import AddMenuItem from '@/views/AddMenuItem.vue'
import EditMenuItem from '@/views/EditMenuItem.vue'
import MenuList from '@/views/MenuList.vue'
import UserList from '@/views/user/UserList.vue'
import AddUser from '@/views/user/AddUser.vue'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Index',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'Home',
      component: Container,
      children: [
        {
          path: 'menu_list',
          name: 'MenuList',
          component: MenuList
        },
        {
          path: 'add_menu_item',
          name: 'AddMenuItem',
          component: AddMenuItem
        },
        {
          path: 'edit_menu_item',
          name: 'EditMenuItem',
          component: EditMenuItem
        },
        {
          path: 'user_list',
          name: 'UserList',
          component: UserList
        },
        {
          path: 'add_user',
          name: 'AddUser',
          component: AddUser
        }
      ],
    },
    {
      path: '/menu',
      name: 'Menu',
      redirect: '/home/menu_list'
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
    }
  ]
})
