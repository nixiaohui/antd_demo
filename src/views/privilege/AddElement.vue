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
            { rules: [{ required: true, message: '页面元素标签一定要有哦' }] }
          ]"
        />
      </a-form-item>
      <a-form-item
        label="描述"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-textarea placeholder="页面元素相关说明" :rows="4" v-decorator="['description']" />
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
  methods: {
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields(async (err, values) => {
        if (!err) {
          const hide = this.$message.loading('正在添加菜单...', 0)
          await axios.post('/element/item', values).then((res)=>{
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
