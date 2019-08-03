<template>
  <div>
    <div>
      <a-checkbox
        :indeterminate="halfChecked"
        @change="onCheckAll"
        :checked="checkAll"
      >
        {{group.name}}
      </a-checkbox>
    </div>
    <div class="sub-group" v-if="groupOptions.length">
      <br/>
      <a-checkbox-group :options="groupOptions" v-model="checkedList" @change="onChange" />
    </div>  
  </div>
</template>
<script>
export default {
  props: ['initOptions', 'initGroup', 'initHalfChecked', 'initCheckedAll', 'initCheckedList'],
  data () {
    return {
      group: this.initGroup,
      halfChecked: this.initHalfChecked,
      checkAll: this.initCheckedAll,
      groupOptions:[],
      checkedList: []
    }
  },
  methods: {
    onChange(checkedList) {
      this.halfChecked = !!checkedList.length && (checkedList.length < this.groupOptions.length)
      this.checkAll = checkedList.length === this.groupOptions.length
      this.sendMsg()
    },
    onCheckAll(e) {
      if (this.groupOptions.length > 0) {
        this.checkedList = e.target.checked ? this.groupOptions.map(item=>item.id) : []
        this.halfChecked = false
        this.checkAll = e.target.checked
      } else {
        this.checkAll = e.target.checked
      }
      this.sendMsg()
    },
    sendMsg() {
      let list = []
      if (this.checkAll) {
        list.push(this.group.id)
      }
      if (this.checkedList.length) {
        this.checkedList.forEach(item=>list.push(item))
      }
      const msg = {
        item: this.group,
        list: list
      }
      this.$emit('onChange', msg)
    },
    loadGroupOptions() {
      if (this.initOptions.length) {
        const p = this.initOptions.map((item) => {
          item.label = item.name
          item.value = item.id
          return item
        })
        return p
      } else {
        return []
      }
    }
  },
  mounted() {
    this.groupOptions = this.loadGroupOptions()
    console.log(this.initCheckedList)
    this.checkedList = this.initCheckedList[this.initGroup.id]
    console.log(this.checkedList)
  }
  // computed: {
  //   optionLabels() {
  //     if (this.pOptions.length) {
  //       const p = this.pOptions
  //       const op = p.map(item=>{
  //          item.label = item.name
  //          item.value = item.id
  //          return item
  //       })
  //       return op
  //     }
  //   }
  // },
  // mounted() {
  //   console.log(this.pOptions.length)
  // },
  // methods: {
  //   onCheckAllChange(e) {
  //     if (this.pOptions.length) {
  //       this.cList = e.target.checked ? this.optionLabels: []
  //       this.indeterm = false
  //       this.checkAll = e.target.checked
  //     } else {
  //       this.checkAll = e.target.checked
  //     }
  //     this.sendMsg()
  //   },
  //   onChange(checkedList) {
  //     this.indeterm = !!checkedList.length && (checkedList.length < this.pOptions.length)
  //     this.checkAll = checkedList.length === this.pOptions.length
  //     this.sendMsg()
  //   },

  // }
}
</script>

<style>
  .sub-group { 
    border-top: 1px solid #E9E9E9;
    margin-bottom: 30px;
  }
</style>