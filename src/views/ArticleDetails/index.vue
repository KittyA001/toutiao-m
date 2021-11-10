<template>
  <div class="article_item_content">
    <van-nav-bar
      title="黑马头条"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="article_main">
        <!-- 文章加载中 -->
        <van-loading
          size="24px"
          vertical
          color="#0094ff"
          text-color="#a1a0a1"
          v-if="loading"
        >加载中...</van-loading>
        <!-- /文章加载中 -->

        <!-- 加载完成-文章详情 -->
        <!-- v-else-if="article.title" 如果有数据则显示 -->
        <div class="article_main markdown-body" v-else-if="article.title">
            <van-cell :title="article.title" class="title" :border="false"/>
            <van-cell
              :border="false"
              class="info"
              center
            >
                <span slot="title">{{ article.aut_name }}</span>
                <span slot="label" class="publish_time">{{article.pubdate | relativeTime}}</span>
                <van-image
                  class="pic"
                  slot="icon"
                  round
                  fit="cover"
                  :src="article.aut_photo"
                />
                <!-- 事件简写时需要传参数，可以直接写$event，$event为事件参数 -->
                <!-- 当一个props参数要传值并且修改，可以简写成v-model的形式 -->
                <!-- 一个组件上的 v-model 默认会利用名为 value 的 prop 和名为 input 的事件 -->
                <!-- v-model="article.is_followed" 实际是
                     value="article.is_followed"
                     @input="article.is_followed = $event"
                 -->
                 <!-- :isFollowed="article.is_followed"
                      @isFollowed="article.is_followed = $event"
                  -->
                <follow-user
                  :autId="article.aut_id"
                  v-model="article.is_followed"
                  ></follow-user>
                <!-- <van-button
                  v-if="article.is_followed"
                  slot="default"
                  round
                  size="small"
                  class="btn"
                  @click="onFollow"
                  :loading="followLoading"
                >已关注</van-button>
                <van-button
                  v-else
                  slot="default"
                  round
                  type="info"
                  icon="plus"
                  size="small"
                  class="btn"
                  @click="onFollow"
                  :loading="followLoading"
                >关注</van-button> -->
            </van-cell>
            <div v-html="article.content" class="content" ref="art_content"></div>
            <van-divider>正文结束</van-divider>

            <!-- 评论列表 -->
            <comment-list
            :source="article.art_id"
            :totalCount="totalCount"
            :List="CommentList"
            @total_count="totalCount = $event.total_count"
            @replyComment="replyCommentFn"
            ></comment-list>
            <!-- /评论列表 -->

            <!-- 底部区域 -->
            <!-- 文章加载完有数据再渲染底部 -->
            <div class="article-bottom">
              <van-button
                class="comment-btn"
                type="default"
                round
                size="small"
                @click="isPopupShow = true"
              >写评论</van-button>
              <van-icon
                name="comment-o"
                :info="totalCount"
                color="#777"
              />
              <collect-article
              v-model="article.is_collected"
              :articleId="article.art_id"
              ></collect-article>
              <!-- <van-icon
                color="#777"
                name="star-o"
              /> -->
              <like-article
              v-model="article.attitude"
              :articleId="article.art_id"
              ></like-article>
              <!-- <van-icon
                color="#777"
                name="good-job-o"
              /> -->
              <van-icon name="share" color="#777"></van-icon>
            </div>
            <!-- /底部区域 -->

            <!-- 评论弹出层 -->
            <van-popup
              v-model="isPopupShow"
              position="bottom"
            >
                <!-- 弹出层写评论 -->
                <!-- articleId文章id -->
                <write-comment
                :target="article.art_id"
                @publish_comment="pubComFn"
                ></write-comment>
            </van-popup>

            <!-- 回复评论弹出层 -->
            <van-popup
              v-model="isReplyShow"
              position="bottom"
              :style="{ height: '100%' }"
            >
                <!-- 弹出层写回复 -->
                <!-- v-if="isReplyShow"的作用是，因为弹出层是懒加载，
                第一次弹出后之后数据不会更新，组件还在没有销毁，只是隐藏起来
                只有销毁后再次弹出才能重新渲染，这里关闭弹出层后reply-comment组件就销毁，
                而van-popup只是隐藏了起来
                 -->
                <reply-comment
                v-if="isReplyShow"
                :comment="currentComment"
                @close="isReplyShow = false"
                />
            </van-popup>
        </div>
        <!-- /加载完成-文章详情 -->

        <!-- 加载失败：404 -->
        <div class="error-wrap" v-else-if="errStatus === 404">
          <van-icon name="failure" />
          <p class="text">该资源不存在或已删除！</p>
        </div>
        <!-- /加载失败：404 -->

        <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
        <div class="error-wrap" v-else>
          <van-icon name="failure" />
          <p class="text">内容加载失败！</p>
          <van-button class="retry-btn" @click="getArticleDetail">点击重试</van-button>
        </div>
        <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->

    </div>
  </div>

</template>

<script>
import { getArticleDetailApi } from '@/api/article.js'
import { ImagePreview } from 'vant'
import FollowUser from '@/components/FollowUser'
import CollectArticle from '@/components/CollectArticle'
import LikeArticle from '@/components/LikeArticle'
import CommentList from '@/components/CommentList'
import WriteComment from '@/components/WriteComment'
import ReplyComment from '@/components/ReplyComment'
export default {
  props: {
    articleId: {
      type: [Number, String, Object]
    }
  },
  data () {
    return {
      article: {},
      loading: true,
      errStatus: 0, // 报错时的状态码
      followLoading: false,
      totalCount: 0,
      isPopupShow: false, // 是否弹出
      CommentList: [], // 评论列表
      isReplyShow: false,
      currentComment: {} // 当前评论对象
    }
  },
  // provide 选项允许我们指定我们想要提供给后代组件的数据/方法
  provide: function () {
    return {
      articleId: this.articleId
    }
  },
  components: {
    FollowUser,
    CollectArticle,
    LikeArticle,
    CommentList,
    WriteComment,
    ReplyComment
  },
  created () {
    this.getArticleDetail()
  },
  methods: {
    onClickLeft () {
      this.$router.back()
    },
    async getArticleDetail () {
      try {
        const { data } = await getArticleDetailApi(this.articleId)
        // 自己制造报错
        // if (Math.random() > 0.5) {
        //   JSON.parse('sfjdgdlasjfog')
        // }
        console.log('文章详情', data)
        this.article = data.data
        // 在数据更新后获取img节点
        // 因为数据驱动视图不是立即的
        // 定时器为异步任务，等视图更新完毕之后再获取节点
        setTimeout(() => {
          this.previewImg()
        }, 0)
      } catch (err) {
        // 捕捉错误信息，返回的状态码是404则赋值errStatus
        if (err.response && err.response.status === 404) {
          this.errStatus = 404
        }
        // console.log(err)
      }
      this.loading = false
    },
    previewImg () {
      const artContent = this.$refs.art_content
      // console.log(artContent)
      const imgs = artContent.querySelectorAll('img')
      // console.log(imgs)
      const images = []
      imgs.forEach((img, index) => {
        images.push(img.src)
        img.onclick = () => {
          // 因为点击事件为异步任务，所有的img遍历完后才执行，所以输出的图片数组是所有图片的路径
          // console.log(images)
          ImagePreview({
            images, // 所有图片路径的数组
            startPosition: index // 从点击的那张图片开始
          })
        }
      })
    },
    // isFollowedFn (isFllowedState) {
    //   this.article.is_followed = isFllowedState
    // }
    // 文章回复更新视图
    // newCommentData是一个对象
    pubComFn (newCommentData) {
      this.totalCount++
      this.isPopupShow = false
      this.CommentList.unshift(newCommentData.new_obj)
      console.log(this.CommentList)
    },
    // comment为需回复的评论的详细信息
    replyCommentFn (comment) {
      console.log(comment)
      this.currentComment = comment
      this.isReplyShow = true
    }
  }

}
</script>

<style scoped lang="less">
@import './github-markdown.css';
.article_item_content {
  height: 100vh;
  background: #ffffff;
  .article_main {
    padding-top: 92px;
    padding-bottom: 96px;
    background: #ffffff;
  }
  .content {
    padding-top: 50px;
    padding-bottom: 50px;
    background: #ffffff;
  }
/deep/.van-nav-bar__content {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        background: #3296fa;
        text-align: center;
        color: #fff;
        .van-icon {
            font-size: 32px;
            color: #fff;
        }
        .van-nav-bar__title {
            max-width: unset;
        }
    }
    .van-loading {
      height: 600px;
      justify-content: center;
    }
/deep/.title {
      color: #343336;
      font-weight: 700;
      font-size: 40px;
    }
    .van-cell {
      border-bottom: none;
      /deep/.van-cell::after {
                border-bottom: none;
            }
    }
    .info {
      .van-cell__title {
        span {
          font-size: 28px;
        }
        .publish_time {
          font-size: 24px;
        }
      }
      .pic {
        margin-right: 20px;
        width: 75px;
        height: 75px;
      }
      .van-cell__value {
            width: 170px;
            flex:unset !important;
          .van-button {
            width: 170px;
            height: 60px;
          }
      }
    }
.error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    /deep/.van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
    .van-button {
      border: none;
    }
  }
}

</style>
