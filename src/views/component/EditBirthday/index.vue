<template>
  <div>
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="onConfirm"
        @cancel="onCancel"
        />
  </div>
</template>

<script>
import { upDataProLileApi } from '@/api/user.js'
import dayjs from 'dayjs' // 导入dayjs包
export default {
  props: {
    value: {
      type: String,
      reqiured: true
    }
  },
  data () {
    return {
      minDate: new Date(1900, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(this.value) // 转换为时间对象
    }
  },
  methods: {
    // // 改变时触发
    // onChange (picker, value, index) {
    //   this.localGender = index
    // },
    // 确认修改
    async onConfirm (value) {
      this.currentDate = value // 为时间对象
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true, // 禁止背景点击
        duration: 0 // 持续展示
      })
      try {
        // 发起请求
        // 转换为字符串
        const currentDate = dayjs(this.currentDate).format('YYYY-MM-DD') // 日期格式化
        this.currentDate = currentDate
        const res = await upDataProLileApi({
          birthday: currentDate
        })
        console.log(res)
        // 关闭选择器
        this.$emit('close')
        // 更新视图
        this.$emit('input', this.currentDate)
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
