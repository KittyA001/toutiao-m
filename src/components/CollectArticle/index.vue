<template>
    <van-icon
    :name="value ? 'star' : 'star-o'"
    :class="value ? 'orange' : ''"
    :loading="loading"
    @click="collectArticle"
    ></van-icon>
</template>

<script>
import { collectArticleApi, unCollectArticleApi } from '@/api/article.js'
export default {
  props: {
    value: {
      type: Boolean,
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
      this.loading = true
      if (this.value) {
        // 取消收藏
        try {
          await unCollectArticleApi(this.articleId)
          // 自己制作报错
          // if (Math.random() > 0.5) {
          //   JSON.parse('566dgdghs')
          // }
        } catch (err) {
          return this.$toast('取消收藏失败！')
        }
      } else {
        // 收藏
        try {
          await collectArticleApi(this.articleId)
          // 自己制作报错
          // if (Math.random() > 0.5) {
          //   JSON.parse('566dgdghs')
          // }
        } catch (err) {
          return this.$toast('收藏失败！')
        }
      }
      // 因为数据更新不是立即的所有轻提示要与实际value值对应的提示相反
      this.$toast.success(this.value ? '取消收藏' : '收藏成功')
      this.$emit('input', !this.value)
      this.loading = false
    }
  }

}
</script>

<style scoped lang="less">
.orange {
  color:#ff920a
}

</style>
