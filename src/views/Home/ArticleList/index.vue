<template>
    <div class="articleList">
        <!--
      List 列表组件：瀑布流滚动加载，用于展示长列表。

      List 组件通过 loading 和 finished 两个变量控制加载状态，
      当组件初始化或滚动到到底部时，会触发 load 事件并将 loading 自动设置成 true，此时可以发起异步操作并更新数据，
      数据更新完毕后，将 loading 设置成 false 即可。
      若数据已全部加载完毕，则直接将 finished 设置成 true 即可。

      - load 事件：
        + List 初始化后会触发一次 load 事件，用于加载第一屏的数据。
        + 如果一次请求加载的数据条数较少，导致列表内容无法铺满当前屏幕，List 会继续触发 load 事件，直到内容铺满屏幕或数据全部加载完成。

      - loading 属性：控制加载中的 loading 状态
        + 非加载中，loading 为 false，此时会根据列表滚动位置判断是否触发 load 事件（列表内容不足一屏幕时，会直接触发）
        + 加载中，loading 为 true，表示正在发送异步请求，此时不会触发 load 事件

      - finished 属性：控制加载结束的状态
        + 在每次请求完毕后，需要手动将 loading 设置为 false，表示本次加载结束
        + 所有数据加载结束，finished 为 true，此时不会触发 load 事件
     -->
        <van-pull-refresh v-model="refreshing"
          @refresh="onRefresh"
          :success-duration="1500"
          :success-text="RefreshText"
          :error.sync="error"
        >
            <van-list v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad"
              :error.sync="error"
              error-text="请求失败，点击重新加载"
            >
              <article-item v-for="(obj, index) in list" :key="index"
              :article="obj"
              ></article-item>
              <!-- <van-cell v-for="(obj, index) in list" :key="index" :title="obj.title" /> -->
            </van-list>
        </van-pull-refresh>
    </div>
</template>

<script>
import { getArticleListApi } from '@/api/article.js'
import ArticleItem from '@/components/ArticleItem'
export default {
  props: {
    channels: {
      type: Object,
      require: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: null,
      error: false,
      refreshing: false,
      RefreshText: '刷新成功'
    }
  },
  components: {
    ArticleItem
  },
  methods: {
    // 初始化或滚动到底部的时候会触发调用 onLoad
    async onLoad () {
      try {
        // 1. 请求获取数据
        const { data: { data } } = await getArticleListApi({
          channel_id: this.channels.id, // 频道id
          // 可以简单理解为页码，
          // 传入的值为当前的时间戳 Date now()
          // 如果时间戳有值就会用当前的时间戳
          timestamp: this.timestamp || Date.now(),
          with_top: 1
        })
        // 模拟报错场景
        // if (Math.random() > 0.5) {
        //   JSON.parse('adfdgfhh')
        // }
        // console.log(data)
        // 2. 把请求结果数据放到 list 数组中
        // results是一个对应不同时间戳的数组
        // 扩展运算符把数组里的每一个数据追加到data的数组中渲染出来
        this.list.push(...data.results)
        // console.log(this.list)
        // 3. 本次数据加载结束之后要把加载状态设置为结束
        this.loading = false
        // console.log(data)
        // 如果返回的数组不为空，更新获取下一页数据的时间戳，如果为空，则加载完成
        if (data.results) {
          this.timestamp = data.pre_timestamp
        } else {
          // 4. 判断数据是否全部加载完成
          this.finished = true
        }
      } catch (err) { // 当报错时把error改为true，提示"请求失败，点击重新加载"
        this.error = true
        this.loading = false // 报错时同时结束加载
      }
    },
    async onRefresh () {
      try {
        // 1. 请求获取数据
        const { data: { data } } = await getArticleListApi({
          channel_id: this.channels.id, // 频道id
          // 可以简单理解为页码，
          // 传入的值为当前的时间戳 Date now()
          timestamp: Date.now(), // 最新数据用当前的时间戳
          with_top: 1
        })
        // 模拟报错场景
        // if (Math.random() > 0.5) {
        //   JSON.parse('adfdgfhh')
        // }
        // console.log(data)
        // 2. 把请求结果数据放到 list 数组中
        // results是一个对应不同时间戳的数组
        // 扩展运算符把数组里的每一个数据追加到data的数组的最前项，然后渲染出来
        this.list.unshift(...data.results)
        // 3. 本次数据加载结束之后要把加载状态设置为结束
        this.RefreshText = `刷新成功,更新了${data.results.length}条数据`
        this.refreshing = false
      } catch (err) {
        this.RefreshText = '刷新失败'
        this.refreshing = false
      }
    }
  }
}
</script>

<style scoped lang="less">
.articleList {
    padding-bottom: 100px;
    height: 80vh; // vh视口单位，1vh为视口高度的百分之一，vw为视口宽度的百分之一
    overflow-y: scroll;
}
</style>
