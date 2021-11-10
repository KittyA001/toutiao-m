<template>
  <van-icon
    color="#777"
    :name="value === 1 ? 'good-job' : 'good-job-o'"
    :class="value === 1 ? 'red' : ''"
    :loading="loading"
    @click="collectArticle"
    ></van-icon>
</template>

<script>
import { likeArticleApi, unlikeArticleApi } from '@/api/article.js'
export default {
  props: {
    value: {
      type: Number,
      require: true
    },
    articleId: {
      type: [Number, String, Object],
      reqiured: true
    }
  },
  data () {
    return {
      loading: false
    }
  },
  methods: {
    async collectArticle () {
      let status = -1 // 无状态
      this.loading = true
      if (this.value === 1) {
        // 已点赞，取消点赞
        try {
          await unlikeArticleApi(this.articleId)
          // 自己制作报错
          // if (Math.random() > 0.5) {
          //   JSON.parse('566dgdghs')
          // }
        } catch (err) {
          return this.$toast('取消点赞失败！')
        }
      } else {
        // 未点赞，点赞
        try {
          await likeArticleApi(this.articleId)
          // 自己制作报错
          // if (Math.random() > 0.5) {
          //   JSON.parse('566dgdghs')
          // }
          status = 1 // 点赞状态
        } catch (err) {
          return this.$toast('点赞失败！')
        }
      }
      this.$emit('input', status) // 更新父组件的article.attitude
      this.$toast.success(this.value === 1 ? '取消点赞' : '点赞成功')
      this.loading = false
    }
  }
}
</script>

<style scoped lang="less">
.red {
    color: #e57263 !important;
}

</style>
