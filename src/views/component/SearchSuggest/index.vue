<template>
  <div>
    <van-cell
      icon="search"
      v-for="(text, index) in suggestionsList"
      :key="index"
      @click="$emit('search', text)"
    >
      <div slot="title" v-html="highLight(text)"></div>
    </van-cell>
    <div class="noMore" v-if="suggestionsList.length === 0">没有更多</div>

  </div>
</template>

<script>
import { getSearchSuggestionsApi } from '@/api/search.js'
import { debounce } from 'lodash'
export default {
  data () {
    return {
      suggestionsList: []
    }
  },
  props: {
    searchText: {
      type: String,
      require: true
    }
  },
  watch: {
    searchText: {
      immediate: true,
      // 安装lodash第三方包，按需导入函数
      // debounced（防抖动）函数，该函数会从上一次被调用后，延迟 wait 毫秒后调用 func 方法。
      // value 是最新变化的搜索词
      handler: debounce(function (value) {
        this.getSearchSuggestions(value)
        // console.log(value)
      }, 200)
      // handler (value) {
      //   // console.log(value)
      //   this.getSearchSuggestions(value)
      // }
    }
  },
  methods: {
    async getSearchSuggestions (q) {
      try {
        const { data } = await getSearchSuggestionsApi(q)
        // console.log(data.data.options)
        this.suggestionsList = data.data.options
        // console.log(this.suggestionsList)
      } catch (err) {
        console.log('获取失败')
      }
    },
    highLight (text) {
      const highLightHtmlStr = `<span style="color: #3296fa">${this.searchText}</span>`
      // 动态正则表达式需要通过调用RegExp构造函数创建对象
      // 参数1：匹配模式字符串
      // 参数2：匹配模式gi，全局忽略大小写
      const reg = new RegExp(this.searchText, 'gi')
      // replace()替换方法直接返回新数组
      return text.replace(reg, highLightHtmlStr)
    }
  }

}
</script>

<style scoped lang="less">
.noMore {
  padding-top: 20px;
  font-size: 28px;
text-align: center;
}

</style>
