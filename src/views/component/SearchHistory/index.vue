<template>
    <div class="history_content">
        <van-cell title="搜索历史" >
            <div v-if="isDeleteShow">
                <span @click="$emit('clearHistory')">全部删除</span> &nbsp;&nbsp;
                <span @click="isDeleteShow = false">完成</span>
            </div>
            <van-icon name="delete-o" v-else @click="isDeleteShow = true"/>
        </van-cell>
        <van-cell
            :title="item"
            v-for="(item, index) in historyList"
            :key="index"
            @click="historyItemClick(item, index)"
        >
            <van-icon name="close" v-show="isDeleteShow"/>
        </van-cell>
    </div>
</template>

<script>

export default {
  props: {
    historyList: {
      type: Array,
      require: true
    }
  },
  data () {
    return {
      isDeleteShow: false
    }
  },
  methods: {
    historyItemClick (item, index) {
      if (this.isDeleteShow) {
        // props参数为简单数据类型不能修改也不能赋值
      // props参数可以修改，但不能赋值
        this.historyList.splice(index, 1)
      } else {
        this.$emit('search', item)
      }
    }
  }
}
</script>

<style>

</style>
