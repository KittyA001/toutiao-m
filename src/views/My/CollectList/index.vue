<template>
  <div class="tags_list_content">
    <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
          :error.sync="error"
          error-text="请求失败，点击重新加载"
        >
        <collect-item
          v-for="(item, index) in list"
          :key="index"
          :article="item"
          ></collect-item>
      </van-list>
  </div>
</template>

<script>
import { getCollectListApi } from '@/api/user.js'
import CollectItem from '@/views/component/CollectItem'
export default {
  data () {
    return {
      list: [],
      page: 1,
      pageNum: 10,
      loading: false,
      finished: false,
      error: false
    }
  },
  components: {
    CollectItem
  },
  methods: {
    async onLoad () {
      console.log(this.page)
      try {
        // 1.获取用户收藏信息
        const { data } = await getCollectListApi({
          page: this.page,
          per_page: this.pageNum
        })
        // 模拟报错场景
        // if (Math.random() > 0.5) {
        //   JSON.parse('adfdgfhh')
        // }
        const { results } = data.data
        console.log(data)
        // 2.更新列表和页码
        this.list.push(...results)
        // console.log(this.list)
        // 3.关闭加载状态
        this.loading = false
        // 4.判断是否加载完成
        // 如果返回的数组不为空，更新获取下一页数据的时间戳，如果为空，则加载完成
        if (results.length) {
          this.page++
        } else {
          this.finished = true
        }
      } catch (err) {
        // console.log(err)
        this.error = true
        this.loading = false
      }
    }
  }
}
</script>

<style scoped lang="less">

</style>
