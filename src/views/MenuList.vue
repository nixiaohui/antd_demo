<template>
  <div>
    <a-button class="editable-add-btn" @click="handleAdd">Add</a-button>
    <a-table :columns="columns" :dataSource="data" :loading="loading" bordered>
      <template slot="operation" slot-scope="text, record">
        <div class='editable-row-operations'>
          <span>
            <a @click="handleEdit(record.key)">Edit</a> 
            <a-popconfirm
              v-if="data.length"
              title="Sure to delete?"
              @confirm="() => handleDelete(record.key)">
              <a href="javascript:;">Delete</a>
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
  title: '标题',
  dataIndex: 'title',
  width: '15%',
  scopedSlots: { customRender: 'title' },
}, {
  title: '地址',
  dataIndex: 'url',
  width: '40%',
  scopedSlots: { customRender: 'url' },
}, {
  title: '父级菜单',
  dataIndex: 'parent_id',
  width: '10%',
  scopedSlots: { customRender: 'parent_id' },
}, {
  title: '排序',
  dataIndex: 'sort_id',
  width: '10%',
  scopedSlots: { customRender: 'sort_id' },
}, {  
  title: '操作',
  dataIndex: 'operation',
  scopedSlots: { customRender: 'operation' },
}]
export default {
  data () {
    return {
      menu_items: [],
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
      const response = await axios.get('/menu/items')
      this.loading = false
      this.menu_items = response.data.menu_items
      this.data = this.menu_items.map(item=>({...item, key: item.id.toString()}))
    },
    handleEdit(key) {
      const menu_item = this.data.filter(item => item.key === key)[0]
      this.$router.push({ name: 'EditMenuItem', params: { id: menu_item.id }})
    },
    async handleDelete(key) {
      const menu_item = this.data.filter(item => item.key === key)[0]
      const response = await axios.delete(`/menu/item/${menu_item.id}`)
      if (response.data.code !== 1) {
        console.log(response.data)
      } else {
        console.log('删除成功')
      }
    },
    handleAdd() {
      this.$router.push({ name: 'AddMenuItem'})
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
