<template>
  <div>
    <a-table :columns="columns" 
      :dataSource="privilege_items" 
      :pagination="pagination" 
      :loading="loading"
      :rowKey="record => record.id"
      @change="handleTableChange"  
      bordered
    >
      <template slot="Menus" slot-scope="Menus">{{Menus[0].title}}</template>
      <template slot="operation" slot-scope="record">
        <div class='editable-row-operations'>
          <span>
            <a @click="handleEdit(record.id)">Edit</a> 
            <a-popconfirm
              v-if="privilege_items.length"
              title="Sure to delete?"
              @confirm="() => handleDelete(record.id)">
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
  title: '标签',
  dataIndex: 'Menus',
  width: '25%',
  scopedSlots: { customRender: 'Menus' },
}, {
  title: '类别',
  dataIndex: 'privilege_type',
  width: '25%',
  scopedSlots: { customRender: 'privilege_type' },
}, {  
  title: '操作',
  dataIndex: 'operation',
  scopedSlots: { customRender: 'operation' },
}]
export default {
  data () {
    return {
      privilege_items: [],
      columns,
      loading: false,
      pagination: {
        showQuickJumper: true,
        showSizeChanger: true
      }
    }
  },
  async mounted() {   
    await this.fetch()
  },
  methods: {
     handleTableChange (pagination) {
      console.log(pagination)
      const pager = { ...this.pagination }
      pager.current = pagination.current
      this.pagination = pager
      this.fetch({
        results: pagination.pageSize,
        page: pagination.current,
      })
    },
    async fetch (params={}) {
      this.loading = true
      const response = await axios.get('/privilege/items',{params}).then((res) => {
        const pagination = { ...this.pagination }
        // Read total count from server
        // pagination.total = data.totalCount;
        pagination.total = res.data.count
        this.loading = false
        this.pagination = pagination
        return res.data.privilege_items
      })
      this.privilege_items = response
    },
    handleEdit(id) {
      const privilege_item = this.privilege_items.filter(item => item.id === id)[0]
      this.$router.push({ name: 'EditMenuItem', params: { id: privilege_item.id }})
    },
    async handleDelete(id) {
      const privilege_item = this.privilege_items.filter(item => item.id === id)[0]
      const response = await axios.delete(`/privilege/item/${privilege_item.id}`)
      if (response.data.code !== 1) {
        console.log(response.data)
      } else {
        console.log('删除成功')
      }
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
