<template>
  <div>
    <a-radio-group @change="onChange" v-model="value">
      <a-radio :value="1">菜单访问</a-radio>
      <a-radio :value="2">页面元素</a-radio>
      <a-radio :value="3">文件资源</a-radio>
      <a-radio :value="4">功能操作</a-radio>
      <a-radio :value="5">其他</a-radio>
    </a-radio-group>
  </div>
</template>
<script>
export default {
  data () {
    return {
      value: 1,
    }
  },
  methods: {
    onChange (e) {
      console.log('radio checked', e.target.value)
    },
  },
}
</script>
