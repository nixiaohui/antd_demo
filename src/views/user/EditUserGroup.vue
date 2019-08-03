<template>
  <div>
    <a-card title="给用户添加分组">
      <template v-for="item in groupList">
        <!-- initOptions', 'initGroup', 'initHalfChecked', 'initCheckedAll', 'initCheckedList -->
        <MyCheckGroup :initOptions="item.children" :initCheckedList="item.checkedList" :initGroup="item" :initCheckedAll="item.checked" :key="item.id" @onChange="getMsg"/>
      </template>
    </a-card>
    <a-button type="primary" @click="onSave" class="save-button">保存</a-button>
  </div>
</template>
<script>
  import axios from 'axios'
  import MyCheckGroup from '@/components/CheckGroup.vue'
  export default {
    data () {
      return {
        groupList: [],
        checkedList: [],
        dataTosend: [],
        userGroups: []
      }
    },
    components: {
      MyCheckGroup
    },
    mounted() {
      this.fetch()
      this.getUserGroups()
      this.groupList.forEach((group)=>{
        let children = group.children
        let checkedList = []
        this.userGroups.forEach((uGroup) => {
          if (group.id === uGroup.id) {
            group.checked = true
          }
          if (children.length) {
            children.forEach((child) => {
              if (uGroup.id === child.id) {
                checkedList.push(child.id)
              }
            })
            group.checkedList = checkedList
            this.checkedList[group.id] = checkedList
          }
        })
      })
    },
    methods: {
      async fetch() { 
        const hide = this.$message.loading('数据加载中...', 0)
        let data = []
        await axios.get('/group/items',{params:{results:100}}).then((res) => {
          setTimeout(hide, 0)
                // <!-- initOptions', 'initGroup', 'initHalfChecked', 'initCheckedAll', 'initCheckedList -->
          if (res.data.code === 1) {
            data = res.data.items   // 所有分组记录
            data.filter((item) => {
               let children = data.filter(child=>child.parent_id === item.id)
               item.children = children
               if (!item.parent_id) {
                  this.groupList.push(item) // 一级分组的数据列表
                  this.checkedList[item.id] = []
                  return item
               }
            })
            this.$message.success('数据加载成功', 2)
          } else {
            this.$message.error('数据加载出错', 2)            
          }
        }).catch((err) => {
            this.$message.error(`发生错误成功: ${err}`, 2)
        })
      },
      async getUserGroups() {
        await axios.get(`/user/${this.$route.params.id}/group`).then((res) => {
          if (res.data.code === 1) {
            this.userGroups = res.data.items.Groups
          }
        }).catch((err) => {
          console.log(err.message)
        })
      },
      getMsg(msg) {
        this.dataTosend[msg.item.id] = msg.list
      },
      async onSave() {
        const loading = this.$message.loading('正在保存数据...', 0)
        let groupToSend = this.dataTosend
        let list = []
        groupToSend.forEach(item=> {
          if (item && item.length) {
            item.forEach(child=>list.push(child))
          }
        })
        await axios.post(`/user/${this.$route.params.id}/group`, {groups: list}).then((res) => {
          setTimeout(loading, 0)
          if(res.data.code === 1) {
            this.$message.success('更新成功...', 2)
            this.$router.push({name: 'UserList'})
          } else {
            this.$message.error(`发生错误： ${res.data.message}`, 2)
          }
        }).catch((err) => {
          setTimeout(loading, 0)
          console.log(err)
          this.$message.error(`发生错误: ${err.message}`, 2)
        })
      }
    }
  }
</script>
<style>
  .box-class {
    margin-bottom: 25px;
  }
  .save-button {
    margin-top: 20px;
  }
</style>
