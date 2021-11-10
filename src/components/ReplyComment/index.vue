<template>
  <div class="comment-reply">
      <van-nav-bar
        :title="comment.reply_count > 0 ? `${comment.reply_count}条回复` : '暂无回复'"
        class="title"
      >
        <van-icon
            slot="left"
            name="cross"
            @click="$emit('close')"
        />
      </van-nav-bar>
      <div class="content">
           <comment-item :comment="comment"></comment-item>
           <comment-list :source="comment.com_id" type="c" :List="replyCommentList"></comment-list>
      </div>
      <div class="write_reply">
          <van-button
            round size="small"
            class="reply_bnt"
            @click="isWritePopupShow = true"
            >写评论</van-button>
      </div>
      <!-- 回复评论写评论弹出层 -->
        <van-popup
          v-model="isWritePopupShow"
          position="bottom"
        >
            <!-- 弹出层写评论 -->
            <!-- articleId评论id -->
            <write-comment
            :target="comment.com_id"
            :articleId="articleId"
            @publish_comment="replyComFn"
            ></write-comment>
        </van-popup>
  </div>
</template>

<script>
import CommentItem from '@/components/CommentItem'
import CommentList from '@/components/CommentList'
import WriteComment from '@/components/WriteComment'
export default {
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  // 我们都可以使用 inject 选项来接收指定的我们想要添加在这个实例上的 property：
  // 不要滥用，很多父组件都需要传给所有后代的时候再用这种方法
  inject: {
    articleId: {
      type: [Number, String, Object],
      default: null
    }
  },
  data () {
    return {
      isWritePopupShow: false,
      replyCommentList: [] // 回复评论列表
    }
  },
  components: {
    CommentItem,
    CommentList,
    WriteComment
  },
  methods: {
    // 评论回复更新视图
    // newCommentData是一个对象
    replyComFn (newCommentData) {
      this.comment.reply_count++
      this.isWritePopupShow = false
      this.replyCommentList.unshift(newCommentData.new_obj)
      console.log(this.replyCommentList)
    }
  }

}
</script>

<style scoped lang="less">
.comment-reply {
    // height: 100vh;
    // display: flex;
    .title {
        /deep/.van-nav-bar__content {
        // position: fixed;
        background-color: #fff;
        .van-nav-bar__left {
            .van-icon {
                color: #3296fa;
            }
        }
        .van-nav-bar__title {
        color: #000;
        }
        }
    }
    .content {
        padding-top: 92px;
        // position: fixed;
        // left: 0;
        // right: 0;
        // overflow-y: auto;
    }
    .write_reply {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        height: 88px;
        justify-content: center;
        align-items: center;
        border-top: 1px solid #d8d8d8;
        background: #fff;
        .reply_bnt {
            width: 60%;
        }
    }
}

</style>
