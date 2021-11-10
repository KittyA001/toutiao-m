<template>
<!-- 因为有v-if所以只有一个标签 -->
  <van-button
      v-if="isFollowed"
      slot="default"
      round
      size="small"
      class="btn"
      @click="onFollow"
      :loading="followLoading"
    >已关注</van-button>
    <van-button
      v-else
      slot="default"
      round
      type="info"
      icon="plus"
      size="small"
      class="btn"
      @click="onFollow"
      :loading="followLoading"
    >关注</van-button>
</template>

<script>
import { followUserApi, unFollowUserApi } from '@/api/article.js'
export default {
  // 自定义v-model 的属性名和事件名，详情看vue.js的自定义事件/自定义组件的v-model
  model: {
    prop: 'isFollowed',
    event: 'isFollowedUser'
  },
  props: {
    isFollowed: {
      type: Boolean,
      require: true
    },
    autId: {
      type: [Number, String, Object],
      require: true
    }
  },
  data () {
    return {
      followLoading: false
    }
  },
  methods: {
    async onFollow () {
      this.followLoading = true // 点击关注按钮时出现加载
      if (this.isFollowed) {
        // 取消关注
        await unFollowUserApi(this.autId)
        // console.log(res)
      } else {
        // 关注
        await followUserApi(this.autId)
        // console.log(res)
      }
      this.$emit('isFollowedUser', !this.isFollowed) // 子向父传值，更新关注状态
      // this.$toast.success(this.isFollowed ? '取消关注' : '关注成功')
      //   this.isFollowed = !this.isFollowed
      this.followLoading = false // 发起请求结束后关闭加载
    }
  }
}
</script>

<style>

</style>
