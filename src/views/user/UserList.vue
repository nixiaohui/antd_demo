<template>
  <div>
    <a-button class="editable-add-btn" @click="handleAdd">添加</a-button>
    <a-table :columns="columns" :dataSource="data" :loading="loading" bordered>
      <template slot="operation" slot-scope="text, record">
        <div class='editable-row-operations'>
          <span>
            <a @click="handleEdit(record.id)">编辑</a> 
            <a @click="handleEditGroup(record.id)">编辑组别</a> 
            <a-popconfirm
              v-if="data.length"
              title="Sure to delete?"
              @confirm="() => handleDelete(record.id)">
              <a href="javascript:;">删除</a>
            </a-popconfirm>
          </span>
        </div>
      </template>
    </a-table>  
  </div>

</template>
<script>
import axios from 'axios'
const columns = [{
  title: 'id',
  dataIndex: 'id',
  width: '10%',
  scopedSlots: { customRender: 'id' },
}, {
  title: '用户名',
  dataIndex: 'username',
  width: '25%',
  scopedSlots: { customRender: 'username' },
}, {
  title: '邮箱',
  dataIndex: 'email',
  width: '40%',
  scopedSlots: { customRender: 'email' },
}, {  
  title: '操作',
  dataIndex: 'operation',
  scopedSlots: { customRender: 'operation' },
}]
export default {
  data () {
    return {
      user_items: [],
      data: [],
      columns,
      loading: false
    }
  },
  async mounted() {   
    await this.fetch()
  },
  methods: {
    async fetch () {
      this.loading = true
      const response = await axios.get('/user/items')
      this.loading = false
      this.data = response.data.users
    },
    handleEdit(id) {
      this.$router.push({ name: 'EditUser', params: { id: id }})
    },
    handleEditGroup(id) {
      this.$router.push({ name: 'EditUserGroup', params: { id: id }})
    },
    async handleDelete(key) {
      const user_item = this.data.filter(item => item.key === key)[0]
      const response = await axios.delete(`/user/item/${user_item.id}`)
      if (response.data.code !== 1) {
        console.log(response.data)
      } else {
        console.log('删除成功')
      }
    },
    handleAdd() {
      this.$router.push({ name: 'AddUser'})
    },
    onChange(pageNumber) {
      console.log('Page: ', pageNumber);
    }
  },
}
</script>
<style scoped>
.editable-row-operations a {
  margin-right: 8px;
}
.editable-add-btn {
  margin-bottom: 8px;
}
</style>
