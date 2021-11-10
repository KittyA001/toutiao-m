<template>
  <div>
      <van-picker
        title="性别"
        show-toolbar
        :columns="columns"
        :default-index="localGender"
        @confirm="onConfirm"
        @cancel="onCancel"
        @change="onChange"
      />
  </div>
</template>

<script>
import { upDataProLileApi } from '@/api/user.js'
export default {
  props: {
    value: {
      type: Number,
      reqiured: true
    }
  },
  data () {
    return {
      columns: ['男', '女'],
      localGender: this.value
    }
  },
  methods: {
    // 改变时触发
    onChange (picker, value, index) {
      this.localGender = index
    },
    // 确认修改
    async onConfirm (value, index) {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true, // 禁止背景点击
        duration: 0 // 持续展示
      })
      try {
        // 发起请求
        const localGender = this.localGender
        const res = await upDataProLileApi({
          gender: localGender
        })
        console.log(res)
        // 关闭选择器
        this.$emit('close')
        // 更新视图
        this.$emit('input', this.localGender)
        this.$toast.success('修改成功')
      } catch (err) {
        // console.log(err)
        this.$toast('修改失败！')
      }
    },
    // 取消
    onCancel () {
      this.$emit('close')
    }
  }
}
</script>

<style>

</style>
