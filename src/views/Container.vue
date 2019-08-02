<template>
  <a-layout id="components-layout-demo-top-side-2">
    <a-layout-header class="header">
      <div class="logo" />
      <a-menu
        theme="dark"
        mode="horizontal"
        :defaultSelectedKeys="['2']"
        :style="{ lineHeight: '64px' }"
      >
        <a-menu-item key="1">nav 1</a-menu-item>
        <a-menu-item key="2">nav 2</a-menu-item>
        <a-menu-item key="3">nav 3</a-menu-item>
      </a-menu>
    </a-layout-header>
    <a-layout>
      <a-layout-sider width="200" style="background: #fff">
        <a-menu
          mode="inline"
          :defaultSelectedKeys="['1']"
          :defaultOpenKeys="['sub1']"
          :style="{ height: '100%', borderRight: 0 }"
        >
          <template v-for="item in menu_items">
            <a-sub-menu  v-if="!item.parent_id && item.children_menu.length" :key="item.id">
              <span slot="title">
                <a-icon :type="item.icon ? item.icon : 'right'" />{{item.title}}
              </span>
              <a-menu-item v-for="child_item in item.children_menu" :key="child_item.id">
                <span  @click="handleMenuClick(child_item.id)"><a-icon :type="child_item.icon ? child_item.icon : 'right'" />{{child_item.title}}</span>
              </a-menu-item>
            </a-sub-menu>
            <a-menu-item v-if="!item.parent_id && !item.children_menu.length" :key="item.id">
              <span @click="handleMenuClick(item.id)">
                <a-icon :type="item.icon ? item.icon : 'right'" />{{item.title}}
              </span>
            </a-menu-item>
          </template>
        </a-menu>
      </a-layout-sider>
      <a-layout style="padding: 0 24px 24px">
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item>首页</a-breadcrumb-item>
          <a-breadcrumb-item v-for="(item, index) in cMenu" :key="index">{{ item.title }}</a-breadcrumb-item>          
        </a-breadcrumb>
        <a-layout-content :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '280px' }">
          <router-view></router-view>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      collapsed: false,
      menu_items: [],
      cMenu:[]
    }
  },
  async mounted() {
    await this.fetch({results:100})
  },
  methods: {
    async fetch (params={}) {
      await axios.get('/menu/items',{params}).then((res) => {
        if (res.data.code === 1) {
          const menu_items = res.data.items
          menu_items.forEach(item => {
            let children_menu = []
            children_menu = menu_items.filter(child => child.parent_id === item.id)
            item.children_menu = children_menu
            item.children_menu.sort((item1, item2) => {
              return item1.sort_id - item2.sort_id
            })
          })
          this.menu_items = menu_items
          this.menu_items.sort((item1, item2) => {
            return item1.sort_id - item2.sort_id
          })
        }
      })
    },
    handleMenuClick(id) {
      this.cMenu = []
      const cMenu = this.menu_items.find(item=>item.id===id)
      if (cMenu.parent_id) {
        const pMenu = this.menu_items.find(item=>item.id===cMenu.parent_id)
        this.cMenu.push(pMenu)
      }
      this.cMenu.push(cMenu)
      this.$router.push({path:cMenu.url})
    }
  }
}
</script>

<style>
#components-layout-demo-top-side-2 .logo {
  width: 120px;
  height: 31px;
  background: rgba(255,255,255,.2);
  margin: 16px 28px 16px 0;
  float: left;
}
</style>
