<template>
  <div class="editName_content">
      <van-nav-bar
        title="设置昵称"
        left-text="取消"
        right-text="完成"
        @click-left="$emit('close')"
        @click-right="finish"
      />
      <div class="write">
          <van-field
            v-model="localName"
            rows="2"
            autosize
            type="textarea"
            maxlength="7"
            placeholder="请输入昵称"
            show-word-limit
            />
      </div>
  </div>
</template>

<script>
import { upDataProLileApi } from '@/api/user.js'
export default {
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      localName: this.value
    }
  },
  methods: {
    // finish () {
    //   console.log(this.localName)
    // }
    async finish () {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true, // 禁止背景点击
        duration: 0 // 持续展示
      })
      try {
        const localName = this.localName
        const res = await upDataProLileApi({
          name: localName
        })
        console.log(res)
        this.$emit('close')
        this.$emit('input', this.localName)
        this.$toast.success('修改成功')
      } catch (err) {
        // console.log(err)
        this.$toast('修改失败！')
      }
    }

  }

}
</script>

<style scoped lang="less">
.editName_content {
    /deep/.van-nav-bar__content {
       background: #fff !important;
    }
    /deep/.van-nav-bar__title {
        color: #323233;
    }
    .write {
        padding: 20px;
    }

}

</style>
