<template>
  <div>
    <a-button class="editable-add-btn" @click="handleAdd">Add</a-button>
    <a-table :columns="columns" 
      :dataSource="data" 
      :pagination="pagination" 
      :loading="loading"
      :rowKey="record => record.id"
      @change="handleTableChange"  
      bordered
    >
      <span slot="customTitle">标签</span>
      <template slot="action" slot-scope="text, record">
        <div class='editable-row-actions'>
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
  </div>
</template>
<script>
  import axios from 'axios'
  const columns = [{
    dataIndex: 'id',
    key: 'id',
    title: 'ID',
    width: '10%'
  },{
    dataIndex: 'tag',
    key: 'tag',
    width: '20%',
    slots: {title: 'customTitle'},
  }, {
    dataIndex: 'description',
    key: 'description',
    width: '40%',
    title: '描述'
  }, {
    title: 'Action',
    key: 'action',
    width: '30%',
    scopedSlots: { customRender: 'action'}
  }
  ]
  export default {
    data () {
      return {
        data: [],
        pagination: {
          showQuickJumper: true,
          showSizeChanger: true
        },
        columns,
        loading: false
      }
    },
    async mounted(){
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
      async fetch(params={}) {
        this.loading = true
        await axios.get('/element/items', {params}).then((res) => {
          this.loading = false
          if (res.data.code === 1) {
            const pagination = { ...this.pagination }
            pagination.total = res.data.count
            this.pagination = pagination
            this.data = res.data.items
          }
        }).catch((error) =>　{
          console.log(error.message)
        })
      },
      handleAdd() {
        this.$router.push({name:'AddElement'})
      },
      handleEdit(id) {
        this.$router.push({name: 'EditElement', params:{id:id}})
      },
      handleDelete(id) {
        console.log('输时不提供删除功能')
      }
    }
  }

</script>
<style>
.editable-row-actions a {
  margin-right: 8px;
}
  .editable-add-btn {
    margin-bottom: 8px;
  }

</style>