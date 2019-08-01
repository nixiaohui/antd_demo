import Vue from 'vue'
import Router from 'vue-router'
import Container from '@/views/Container.vue'
import AddMenuItem from '@/views/menu/AddMenuItem.vue'
import EditMenuItem from '@/views/menu/EditMenuItem.vue'
import MenuList from '@/views/menu/MenuList.vue'

import UserList from '@/views/user/UserList.vue'
import AddUser from '@/views/user/AddUser.vue'

import PrivilegeList from '@/views/privilege/PrivilegeList.vue'
import AddPrivilege from '@/views/privilege/AddPrivilege.vue'

import TestState from '@/views/TestState'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Index',
      redirect: '/home',
      component: Container,
      children: [
        {
          path: '/menu',
          name: 'Menu',
          redirect: '/menu/menu_list',
          component: {
            render (c) { return c('router-view') }
          },
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
          ]
        },
        {
          path: 'user',
          name: 'User',
          redirect: '/user/user_list',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
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
          ]
        },
        {
          path: 'privilege',
          name: 'Privilege',
          redirect: '/privilege/privilege_list',
          component: {
            render (c) {
              return c('router-view')
            }
          },
          children: [
            {
              path: 'privilege_list',
              name: 'PrivilegeList',
              component: PrivilegeList
            },
            {
              path: 'add_privilege',
              name: 'AddPrivilege',
              component: AddPrivilege
            }
          ]
        },
        {
          path: '/home',
          name: 'Home',
          component: TestState,
        },
        {
          path: '/about',
          name: 'about',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
        },
        {
          path: '/step_test',
          name: 'StepTest',
          component: () => import('@/views/privilege/Step.vue'),
          children: [
            {
              path: 'select_privilege_type',
              name: 'SelectPrivilegeType',
              component: () => import('@/views/privilege/SelectPrivilegeType.vue')
            }
          ]
        }
      ]
    }
  ]
})
