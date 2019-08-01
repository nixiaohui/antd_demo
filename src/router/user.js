import UserList from '@/views/user/UserList.vue'
import AddUser from '@/views/user/AddUser.vue'

export default [{
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
}]