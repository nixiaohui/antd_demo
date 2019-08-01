<template>
  <div>
    <a-steps :current="current">
      <a-step v-for="item in steps" :key="item.title" :title="item.title" />
    </a-steps>
    <div class="steps-content">
<!--       {{steps[current].content}} -->
      <router-view></router-view>
    </div>
    <div class="steps-action">
      <a-button
        v-if="current < steps.length - 1"
        type="primary" @click="next"
      >
        Next
      </a-button>
      <a-button
        v-if="current == steps.length - 1"
        type="primary"
        @click="$message.success('Processing complete!')"
      >
        Done
      </a-button>
      <a-button
        v-if="current>0"
        style="margin-left: 8px"
        @click="prev"
      >
        Previous
      </a-button>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        current: 0,
        steps: [{
          title: '选择权限类型',
          content: 'First-content',
        }, {
          title: '选择相关权限',
          content: 'Second-content',
        }, {
          title: '提交',
          content: 'Last-content',
        }],
      }
    },
    methods: {
      next() {
        this.current++
      },
      prev() {
        this.current--
      }
    },
    watch: {
      current(newValue, oldValue) {
        console.log(newValue)
        if (newValue === 0) {
          this.$router.push({name:'SelectPrivilegeType'})
        }
        if (newValue === 1) {
          this.$router.push({name:'SelectPrivilegeType'})
        }
        if (newValue === 2) {
          this.$router.push({name:'SelectPrivilegeType'})          
        }
      }
    }
  }
</script>
<style scoped>
  .steps-content {
    margin-top: 16px;
    border: 1px dashed #e9e9e9;
    border-radius: 6px;
    background-color: #fafafa;
    min-height: 200px;
    text-align: center;
    padding-top: 80px;
  }

  .steps-action {
    margin-top: 24px;
  }
</style>
