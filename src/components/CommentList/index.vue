<template>
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    :error.sync="error"
    error-text="请求失败，点击重新加载"
    :immediate-check="false"
    @load="onLoad"
  >
  <!-- immediate-check：是否在初始化时立即执行滚动位置检查
  关闭列表在可视范围内自动加载，因为已经在create中自动调用loading方法了，
  如果不关闭，回复评论的列表会加载两次
   -->
  <!-- 把点击回复评论时的当前评论信息传给二级父组件，$event为事件参数：子组件传的值-->
      <comment-item
        v-for="(item, index) in List"
        :key="index"
        :comment="item"
        @replyComment="$emit('replyComment', $event)"
      />
  </van-list>
</template>

<script>
import { getCommentListApi } from '@/api/comment.js'
import CommentItem from '@/components/CommentItem'
export default {
  props: {
    source: { // 源id，文章id或评论id
      type: [Number, String, Object],
      require: true
    },
    totalCount: {
      type: [Number, String],
      require: true
    },
    List: {
      type: Array,
      default: () => [] // 默认值，父组件传值就用父级的，不传值就用本组件的数据
    },
    type: {
      type: String,
      // 自定义prop数据验证
      validator (value) {
        return ['a', 'c'].includes(value) // 传入的值必须是这两个
      },
      default: 'a'
    }
  },
  data () {
    return {
    // list: [],
      loading: false,
      finished: false,
      offset: null, // 下一页数据的标记
      limit: 10,
      error: false
    }
  },
  components: {
    CommentItem
  },
  created () {
    this.loading = true
    this.onLoad() // 初始化后，也就是vue实例创建后就加载数据，这样评论总数才能出现
  },
  methods: {
    async onLoad () {
      try {
        // 1.获取数据
        const { data } = await getCommentListApi({
          // 获取文章的评论和获取评论的回复是同一个接口
          // 唯一的区别是接口参数不一样
          // type
          // a文章的评论
          // c评论的回复
          // source
          // 文章的评论，则传递文章的ID
          // 评论的回复，则传递评论的ID
          // 当数字超过js安全指数范围时要先手动toString()转换为字符串，
          // 不然axios自动转换字符串拼接会带引号导致报错
          type: this.type, // 评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
          source: this.source.toString(), // 源id，文章id或评论id
          offset: this.offset, // 获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
          limit: this.limit // 获取的评论数据个数，不传表示采用后端服务设定的默认每页数据量
        })
        // 主动制造报错
        // if (Math.random() > 0.5) {
        //   JSON.parse('sfkgfhnsak')
        // }
        console.log('评论列表', data)
        const { results } = data.data
        // console.log(results)
        // 2.更新列表数据
        this.List.push(...results)
        this.$emit('total_count', data.data) // 向父级传数据，是一个对象
        // console.log(this.list)
        // 3.设置loading为false
        this.loading = false
        // 4.判断数据是否全部加载完成,
        if (results.length) {
          // 有数据更新下一页数据页码
          this.offset = data.data.last_id
        } else {
          // 没有数据finished设置为true
          this.finished = true
        }
      } catch (err) {
        // console.log(err)
        this.loading = false
        this.error = true
      }
    }
  }
}
</script>

<style>

</style>
