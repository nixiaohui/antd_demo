<template>
  <div>
    <a-form :layout="formLayout" :form="form" @submit="handleSubmit">
      <a-form-item
        label="Form Layout"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-radio-group
          default-value="horizontal"
          @change="handleFormLayoutChange"
        >
          <a-radio-button value="horizontal">
            Horizontal
          </a-radio-button>
          <a-radio-button value="vertical">
            Vertical
          </a-radio-button>
          <a-radio-button value="inline">
            Inline
          </a-radio-button>
        </a-radio-group>
      </a-form-item>
      <a-form-item
        label="菜单标题"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-input placeholder="标题" 
          v-decorator="[
            'title',
            { rules: [{ required: true, message: '菜单的标题一定要有哦' }] }
          ]"
        />
      </a-form-item>
      <a-form-item
        label="URL"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-input placeholder="匹配地址" v-decorator="['url']" />
      </a-form-item>
      <a-form-item
        label="icon"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-input placeholder="缩略图标" v-decorator="['icon']" />
      </a-form-item>
      <a-form-item
        label="父级菜单"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-select placeholder="选择父级菜单" v-decorator="['parent_id']" style="width: 180px" @change="handleChange">
          <a-select-option value="0" >无</a-select-option>
          <template v-for="item in menu_items">
            <a-select-option :value="item.id" :key="item.id">{{ item.title }}</a-select-option>
          </template>
        </a-select>
      </a-form-item>
      <a-form-item
        label="菜单排序"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-input placeholder="菜单排序id" v-decorator="['sort_id']" />
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
      form: this.$form.createForm(this),
      menu_items: {}
    }
  },
  async mounted() {
    const response = await axios.get('/menu/items')
    this.menu_items = response.data.menu_items
  },
  computed: {
    formItemLayout () {
      const { formLayout } = this;
      return formLayout === 'horizontal' ? {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
      } : {}
    },
    buttonItemLayout () {
      const { formLayout } = this;
      return formLayout === 'horizontal' ? {
        wrapperCol: { span: 14, offset: 4 },
      } : {}
    },
  },
  methods: {
    handleFormLayoutChange  (e) {
      this.formLayout = e.target.value
    },
    handleChange (value) {
      console.log(value)
    },
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields(async (err, values) => {
        if (!err) {
          const response = await axios.post('/menu/item', values)
          this.$router.push({name:'MenuList'})
        }
      })
    }
  }
}
</script>
