<template>
  <div>
    <a-button class="editable-add-btn" @click="handleAdd">Add</a-button>
    <a-table :columns="columns" :dataSource="data" :loading="loading" :rowKey="record=>record.id" bordered>
      <template slot="operation" slot-scope="text, record">
        <div class='editable-row-operations'>
          <span>
            <a @click="handleEdit(record.id)">Edit</a> 
            <a-popconfirm
              v-if="data.length"
              title="Sure to delete?"
              @confirm="() => handleDelete(record.id)">
              <a href="javascript:;">Delete</a>
            </a-popconfirm>
          </span>
        </div>
      </template>
    </a-table>  
    <template>
      <a-pagination showQuickJumper :defaultCurrent="2" :total="500" @change="onChange" />
    </template>
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
  title: '用户组名称',
  dataIndex: 'name',
  width: '25%',
  scopedSlots: { customRender: 'name' },
}, {
  title: '所属级别',
  dataIndex: 'parent_id',
  width: '40%',
  scopedSlots: { customRender: 'parent_id' },
}, {  
  title: '操作',
  dataIndex: 'operation',
  scopedSlots: { customRender: 'operation' },
}]
export default {
  data () {
    return {
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
      const response = await axios.get('/group/items')
      this.loading = false
      this.data = response.data.items
    },
    handleEdit(id) {
      this.$router.push({ name: 'EditGroup', params: { id: id }})
    },
    async handleDelete(key) {
      const response = await axios.delete(`/group/item/${user_item.id}`)
      if (response.data.code !== 1) {
        console.log(response.data)
      } else {
        console.log('删除成功')
      }
    },
    handleAdd() {
      this.$router.push({ name: 'AddGroup'})
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
