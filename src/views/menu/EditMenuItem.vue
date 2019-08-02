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
        <a-input placeholder="请输入标题"
          v-decorator="[
            'title',
            { 
              initialValue: menu_item.title,
              rules: [{ required: true, message: '菜单的标题一定要有哦' }] 
            }
          ]"
        />
      </a-form-item>
      <a-form-item  
        label="URL"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-input placeholder="请输入匹配地址"
          v-decorator="[
          'url',
          {initialValue: menu_item.url}
          ]" 
        />
      </a-form-item>
      <a-form-item
        label="icon"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-input placeholder="请输入匹配缩略图标" 
          v-decorator="[
          'icon',
          {initialValue: menu_item.icon}
          ]" />
      </a-form-item>
      <a-form-item
        label="父级菜单"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-select placeholder="请选择父级菜单" 
          v-decorator="[
          'parent_id',
          {initialValue: menu_item.parent_id}
          ]" style="width: 180px">
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
        <a-input :placeholder="menu_item.sort_id" :setFieldsValue="menu_item.sort_id"  
          v-decorator="[
          'sort_id',
          {initialValue: menu_item.sort_id}
          ]" 
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
      formLayout: 'horizontal',
      form: this.$form.createForm(this),
      menu_items: [],
      menu_item: {}
    }
  },
  async mounted() {
    const response = await axios.get('/menu/items',{params:{results:100}})
    this.menu_items = response.data.items
    this.menu_items.forEach(item => {
      if (this.$route.params.id === item.id) {
        this.menu_item = item
        if (item.parent_id) {
          this.menu_items.forEach(item => {
            this.menu_item.parent_title = item.title
          })
        }
      }
    })
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
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields(async (err, values) => {
        if (!err) {
          const hide = this.$message.loading('正在提交修改...', 0)
          await axios.post(`/menu/item/${this.menu_item.id}`, values).then((res) => {
            let {code, message} = res.data
            setTimeout(hide, 0)
            if (code === 1) {
              this.$message.success(message, 2)
              this.$router.push({name: 'MenuList'})
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
