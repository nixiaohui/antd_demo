<template>
  <div>
    <a-form :layout="formLayout" :form="form" @submit="handleSubmit">
      <a-form-item
        label="用户级别名称"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-input placeholder="请输入用户级别名称"
          v-decorator="[
            'name',
            { 
              rules: [{ required: true, message: '用户级别名称一定要有哦' }],
              initialValue: currentGroup.name 
            },
          ]"
        />
      </a-form-item>
      <a-form-item
        label="所属组别"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-select placeholder="选择所属组别" v-decorator="['parent_id', {initialValue:currentGroup.parent_id}]" style="width: 180px">
          <a-select-option value="0" >无</a-select-option>
          <template v-for="item in data">
            <a-select-option :value="item.id" :key="item.id">{{ item.name }}</a-select-option>
          </template>
        </a-select>
      </a-form-item>
      <a-form-item
        :wrapper-col="buttonItemLayout.wrapperCol"
      >
        <a-button type="primary" html-type="submit">
          提交
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import axios from 'axios' 
export default {
  name:'EditGroup',
  data () {
    return {
      data: [],
      currentGroup: {},
      formLayout: 'horizontal',
      formItemLayout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 }
      },
      buttonItemLayout: {
        wrapperCol: { span: 14, offset: 4 }
      },
      form: this.$form.createForm(this)
    }
  },
  async mounted() {
    await this.fetch({results:100})
  },
  methods: {
    async fetch(params={}) {
      await axios.get('/group/items', params).then((res) => {
        if (res.data.code === 1) {
          const data = res.data.items
          this.currentGroup = data.filter(item=>item.id === this.$route.params.id)[0]
          this.data = data.filter(item=>{
            if((item.id !== this.$route.params.id) && item.parent_id !== this.currentGroup.id )
              return item
          })
          console.log(this.$route.params.id)
        } else {
          this.message.error('无法获取用户组数据',2)
        }
      }).catch((err) => {
        this.$message.error(err.message, 2)      
      })
    },
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields(async (err, values) => {
        if (!err) {
          const hide = this.$message.loading('正在更新用户组别...', 0)
          await axios.post(`/group/item/${this.$route.params.id}`, values).then((res)=>{
            setTimeout(hide, 0)
            let { code, message, item } = res.data
            if (code === 1) {
              this.$message.success(message + item.name, 2)
              this.$router.push({name:'GroupList'})
            } else {
              this.$message.error(message, 2)
            }
          }).catch((err) => {
            this.$message.error(err.message, 2)
          })
        }
      })
    }
  }
}
</script>
