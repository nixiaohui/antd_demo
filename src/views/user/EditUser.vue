<template>
  <div>
    <a-form :layout="formLayout" :form="form" @submit="handleSubmit">
      <a-form-item
        label="邮箱"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-input placeholder="邮箱" 
          v-decorator="[
            'email',
            { 
              rules: [{ required: true, message: '邮箱一定要有哦' }],
              initialValue: currentUser.email
             }
          ]"
        />
      </a-form-item>
      <a-form-item
        label="用户名"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-input placeholder="用户名" v-decorator="['username',
            { 
              rules: [{ required: true, message: '用户名一定不能少哦' }],
              initialValue: currentUser.username
            }]" />
      </a-form-item>
      <a-form-item
        label="密码"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-input placeholder="输入密码" type="password" v-decorator="['password',
            { rules: [
                { required: true, message: '密码要填哦' }, 
                { validator: validateToNextPassword }
              ] 
            }]" />
      </a-form-item>
      <a-form-item
        label="确认密码"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-input placeholder="输入密码" type="password" @blur="handleConfirmBlur" v-decorator="['confirm_password',
            { rules: [
                { required: true, message: '密码需要确认哦' },
                { validator: compareToFirstPassword }
              ] 
            }]" 
        />
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
      currentUser: {},
      confirmDirty: false,
      formLayout: 'horizontal',
      form: this.$form.createForm(this),
      formItemLayout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
      },
      buttonItemLayout: {
        wrapperCol: { span: 14, offset: 4 },
      }
    }
  },
  async mounted(){
    await this.fetch()
  },
  methods: {
    async fetch() {
      const hide = this.$message.loading('数据加载中...', 0)
      await axios.get(`/user/item/${this.$route.params.id}`).then((res) => {
        if (res.data.code === 1) {
          this.currentUser = res.data.item
          setTimeout(hide, 0)
          this.$message.success('加载成功', 2)
        } else {
          this.$message.error(res.data.message, 2)
        }
      }).catch((err) => {
        this.$message.error(`发生错误: ${err.message}`, 2)
      })
    },
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields(async (err, values) => {
        if (!err) {
          const response = await axios.post('/user/item', values)
          console.log(response)
          this.$router.push({name:'UserList'})
        }
      })
    },
    handleConfirmBlur (e) {
      const value = e.target.value
      this.confirmDirty = this.confirmDirty || !!value
    },
    compareToFirstPassword (rule, value, callback) {
      const form = this.form
      if (value && value !== form.getFieldValue('password')) {
        callback('两次密码不一致哦')
      } else {
        callback()
      }
    },
    validateToNextPassword (rule, value, callback) {
      const form = this.form
      if (value && this.confirmDirty) {
        form.validateFields(['confirm_password'], { force: true })
      }
      callback()
    },
  }
}
</script>
