<template>
  <div>
    <template v-for="item in allCheckList">
      <MyCheckGroup :Options="plainOptions[item.id]" :chList="checkedList[item.id]" :group="item" :key="item.id" @onChange="getMsg"/>
    </template>
  </div>
</template>
<script>
  import axios from 'axios'
  import MyCheckGroup from '@/components/CheckGroup.vue'
  export default {
    data () {
      return {
        allCheckList: [],
        checkedList: [],
        indeterminates: [],
        checkAlls: [],
        plainOptions: [],
        dataTosend: []
      }
    },
    components: {
      MyCheckGroup
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
              // item.childrenName = children.map(child=>child.name)
              item.children = children
              if (!item.parent_id) {
                this.checkedList[item.id] = []
                this.plainOptions[item.id] = item.children
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
      getMsg(msg) {
        this.dataTosend[msg.item.id] = msg.list
        console.log(this.dataTosend)
      }
      // onChange (checkedList) {
      //   // console.log(checkedList)
      //   const id = this.checkedList.indexOf(checkedList)
      //   this.indeterminates[id] = !!this.checkedList[id].length && (this.checkedList[id].length < this.plainOptions[id].length)
      //   this.checkAlls[id] = this.checkedList[id].length === this.plainOptions[id].length
      //   // console.log(id)
      // },
      // onCheckAllChange (e) {
      //   // Object.assign(this, {
      //   //   // checkedList[e.target.value] = e.target.checked ? this.plainOptions[e.target.value] : [],
      //   //   // indeterminate: false,
      //   //   // checkAlls[e.target.value]: e.target.checked,
      //   // })
      //   // console.log(e.target.checked)
      //   // console.log(this.checkAlls[e.target.value])
      //   // const id = e.target.value
      //   this.checkedList[e.target.value] = e.target.checked ? this.plainOptions[e.target.value] : []
      //   this.indeterminates[e.target.value] = false
      //   this.checkAlls[e.target.value] = e.target.checked
      //   // console.log(id)
      //   // console.log(this.checkAlls)
      // }
    }
  }
</script>
<style>
  .box-class {
    margin-bottom: 25px;
  }
</style>




<template>
  <div>
    <div>
      <a-checkbox
        :indeterminate="indeterm"
        @change="onCheckAllChange"
        :checked="checkAll"
      >
        {{item.name}}
      </a-checkbox>
    </div>
    <div :style="{ borderTop: '1px solid #E9E9E9', marginBottom: '30px'}" v-if="pOptions.length">
      <br/>
      <a-checkbox-group :options="optionLabels" v-model="cList" @change="onChange" />
    </div>  
  </div>
</template>
<script>
export default {
  props: ['Options', 'group', 'indeter', 'isChecked', 'chList'],
  data () {
    return {
      item: this.group,
      indeterm: this.indeter,
      checkAll: this.isChecked,
      pOptions: this.Options,
      cList: this.chList
    }
  },
  computed: {
    optionLabels() {
      if (this.pOptions.length) {
        const p = this.pOptions
        const op = p.map(item=>{
           item.label = item.name
           item.value = item.id
           return item
        })
        return op
      }
    }
  },
  mounted() {
    console.log(this.pOptions.length)
  },
  methods: {
    onCheckAllChange(e) {
      if (this.pOptions.length) {
        this.cList = e.target.checked ? this.optionLabels: []
        this.indeterm = false
        this.checkAll = e.target.checked
      } else {
        this.checkAll = e.target.checked
      }
      this.sendMsg()
    },
    onChange(checkedList) {
      this.indeterm = !!checkedList.length && (checkedList.length < this.pOptions.length)
      this.checkAll = checkedList.length === this.pOptions.length
      this.sendMsg()
    },
    sendMsg() {
      let list = []
      if (this.checkAll) {
        list.push(this.item.id)
      }
      if (this.cList.length) {
        this.cList.forEach(item=>list.push(item.id))
      }
      const msg = {
        item: this.item,
        list: list
      }
      this.$emit('onChange', msg)
    }
  }
}
</script>
