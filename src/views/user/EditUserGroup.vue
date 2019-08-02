<template>
  <div>

    <template v-for="item in allCheckList">
      <div :key="item.id" class="box-class">
        <div >
          <a-checkbox
          :indeterminate="indeterminates[item.id]"
          @change="onCheckAllChange"
          :checked="checkAlls[item.id]"
          >
              {{item.name}}
          </a-checkbox>
        </div>
        <div v-if="item.children!==[]" :style="{ borderTop: '1px solid #E9E9E9' }">
          <br />
              <a-checkbox-group :options="plainOptions[item.id]" v-model="checkedList[item.id]" @change="onChange" />

 <!--           <a-checkbox v-for="child in item.children" :key="child.value" :value="child.value" :change="onChange">{{child.label}}</a-checkbox> -->
        </div>
      </div>
    </template>
  </div>
</template>
<script>
  import axios from 'axios'
  export default {
    data () {
      return {
        allCheckList: [],
        checkedList: [],
        indeterminates: [],
        checkAlls: [],
        plainOptions: []
      }
    },
    async mounted() {
      await this.fetch()
    },
    methods: {
      async fetch() { 
        const hide = this.$message.loading('数据加载中...', 0)
        let data = []
        await axios.get('/group/items',{params:{results:100}}).then((res) => {
          setTimeout(hide, 0)
          if (res.data.code === 1) {
            data = res.data.items
            this.allCheckList = data.filter(item=> {
              const children = data.filter(child=>child.parent_id === item.id)
              item.childrenName = children.map(child=>child.name)
              if (!item.parent_id) {
                this.checkedList[item.id] = []
                this.plainOptions[item.id] = item.childrenName
                this.indeterminates[item.id] = false
                this.checkAlls[item.id] = false
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
      onChange (checkedList) {
        const id = this.checkedList.indexOf(checkedList)
        this.indeterminates[id] = !!this.checkedList[id].length && (this.checkedList[id].length < this.plainOptions[id].length)
        this.checkAlls[id] = this.checkedList[id].length === this.plainOptions[id].length
      },
      onCheckAllChange (e) {
        const id = parseInt(e.target.value)
        this.checkedList[id] = e.target.checked ? this.plainOptions[id] : []
        this.indeterminates[id] = false
        this.checkAlls[id] = e.target.checked
        console.log(e.target.checked)
      }
    }
  }
</script>
<style>
  .box-class {
    margin-bottom: 25px;
  }
</style>
