<template>
  <div>
    <a-form :layout="formLayout" :form="form" @submit="handleSubmit">
      <a-form-item
        label="标签"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-input placeholder="页面元素标签" 
          v-decorator="[
            'tag',
            { initialValue: elementItem.tag },
            { rules: [{ required: true, message: '页面元素标签一定要有哦' }] }
          ]"
        />
      </a-form-item>
      <a-form-item
        label="描述"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-textarea placeholder="页面元素相关说明" :rows="4" v-decorator="['description', { initialValue: elementItem.description}]" />
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
  data () {
    return {
      elementItem: {},
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
    await this.fetch(this.$route.params.id)
  },
  methods: {
    async fetch(id){
      const hide = this.$message.loading('数据加载中...', 0)
      await axios.get(`element/item/${id}`).then((res) => {
        setTimeout(hide, 0)
        if (res.data.code === 1) {
          this.$message.success('数据加载成功...', 1)
          this.elementItem = res.data.item  
        }
      })
      
    },
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields(async (err, values) => {
        if (!err) {
          const hide = this.$message.loading('正在添加菜单...', 0)
          await axios.post(`/element/item/${this.$route.params.id}`, values).then((res)=>{
            setTimeout(hide, 0)
            let { code, message, item } = res.data
            if (code === 1) {
              this.$message.success(message + item.tag, 2)
              this.$router.push({name:'ElementList'})
            } else {
              this.$message.error(message, 2)
            }
          })
        }
      })
    }
  }
}
</script>
