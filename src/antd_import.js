import Vue from 'vue'
import { message } from 'ant-design-vue'
import { Layout, Menu, Breadcrumb } from 'ant-design-vue'
import { Icon, Button } from 'ant-design-vue'
import { Form, Radio, Checkbox, Input, Select } from 'ant-design-vue'
import { Table, Popconfirm, Pagination } from 'ant-design-vue'
import { Steps, Card } from 'ant-design-vue'

Vue.prototype.$message = message

Vue.use(Layout)
Vue.use(Menu)
Vue.use(Breadcrumb)

Vue.use(Icon)
Vue.use(Button)

Vue.use(Form)
Vue.use(Radio)
Vue.use(Input)
Vue.use(Checkbox)
Vue.use(Select)

Vue.use(Table)
Vue.use(Popconfirm)
Vue.use(Pagination)

Vue.use(Steps)
Vue.use(Card)