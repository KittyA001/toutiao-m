<template>
  <div>
    <van-list
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  :error.sync="error"
  error-text="请求失败，点击重新加载"
  @load="onLoad"
>
  <van-cell
    v-for="(article, index) in list"
    :key="index"
    :title="article.title"
    :to="{
        name: 'article',
        params: {
          articleId: article.art_id
        }
      }"
  />
</van-list>
  </div>
</template>

<script>
import { getSearchResultApi } from '@/api/search.js'
export default {
  props: {
    searchText: {
      type: String,
      require: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      error: false
    }
  },
  methods: {
    async onLoad () {
      try {
        // 1.获取数据
        const { data } = await getSearchResultApi({
          page: 1, // 页数，不传默认为1
          per_page: 20, // 每页数量，不传每页数量由后端决定
          q: this.searchText// 搜索关键词
        })
        // 模拟报错场景
        // if (Math.random() > 0.5) {
        //   JSON.parse('adfdgfhh')
        // }
        const { results } = data.data
        // console.log(results)
        // 2.把数据更新到列表
        this.list.push(...results)
        // 3.加载中关闭, loading = false
        this.loading = false
        // 4.判断是否加载完全部内容, finished = true
        if (results.length) {
          this.page++ // 加载还有内容更新页码
        } else {
          this.finished = true // 加载完所有内容，完成加载
        }
      } catch (err) {
        this.error = true
        this.loading = false
      }
    }
  }
}
</script>

<style>

</style>
