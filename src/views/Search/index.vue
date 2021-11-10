<template>
  <div class="search_content">
        <form action="/" class="form">
            <van-search
                v-model="searchText"
                show-action
                placeholder="请输入搜索关键词"
                background="#3296fa"
                @search="onSearch"
                @cancel="onCancel"
                @focus="isResultShow = false"
            />
        </form>
        <!-- 搜索结果 -->
        <search-result
          v-if="isResultShow"
          :searchText="searchText"
        ></search-result>
        <!-- 搜索建议 -->
        <search-suggest
          v-else-if="searchText"
          :searchText='searchText'
          @search="onSearch"
        ></search-suggest>
        <!-- 搜索历史 -->
        <search-history
          v-else :historyList="historyList"
          @clearHistory="historyList = []"
          @search="onSearch"
        ></search-history>
  </div>
</template>

<script>
import SearchHistory from '@/views/component/SearchHistory'
import SearchSuggest from '@/views/component/SearchSuggest'
import SearchResult from '@/views/component/SearchResult'
import { setItem, getItem } from '@/utils/storage.js'
export default {
  data () {
    return {
      searchText: '',
      isResultShow: false,
      historyList: getItem('localHistory') || [] // 渲染本地存储的历史记录

    }
  },
  methods: {
    onSearch (val) {
      const value = val.trim() // 去除两边空格
      //   console.log(val)
      // 更新搜索词
      if (value) {
        this.searchText = value
      } else {
        return
      }
      // 更新搜索历史列表
      const index = this.historyList.indexOf(value) // 搜素字符在吗数组中对应的索引号
      if (index !== -1) {
        this.historyList.splice(index, 1)
        this.historyList.unshift(value)
      } else {
        this.historyList.unshift(value)
      }
      // console.log(this.historyList)
      // 渲染展示结果
      this.isResultShow = true
    },
    onCancel () {
      this.$router.back()
    }
  },
  components: {
    SearchHistory,
    SearchSuggest,
    SearchResult
  },
  watch: {
    historyList () {
      setItem('localHistory', this.historyList) // 存储历史记录到本地存储
    }
  }
}
</script>

<style scoped lang="less">
.search_content {
    padding-top: 108px;
    .form {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 1;
        width: 100%;
    }
    /deep/.van-search--show-action {
    padding-left: 37px;
    }
    .van-search__action {
        color: #fff;
        padding-left: 30px;
        padding-right: 30px;
    }
}
</style>
