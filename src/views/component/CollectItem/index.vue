<template>
<van-cell class="collect_item_content"
:to="{
        name: 'article',
        params: {
          articleId: article.art_id
        }
      }"
>
      <van-cell
        center
        :border="false"
        class="collect-item"
      >
        <van-image
        slot="icon"
        class="avatar"
        round
        fit="cover"
        src="https://img01.yzcdn.cn/vant/cat.jpeg"
        />
        <div slot="title" class="title-wrap">
        <div class="user-name">{{ article.aut_name }}</div>
        </div>

        <div slot="label">
        <div class="bottom-info">
            <span class="comment-pubdate">{{ article.pubdate | relativeTime }}</span>
        </div>
        </div>
     </van-cell>
      <van-cell
      :border="false"
      class="article_item"
      >
        <div class="van-multi-ellipsis--l2" slot="title">{{ article.title }}</div>
    </van-cell>
    <!-- 底部区域 -->
    <div class="article-bottom">
      <div class="item">
          <van-icon
            name="comment-o"
            color="#777"
            />
          <span>{{ article.comm_count }}</span>
      </div>
      <div class="item">
          <van-icon
            color="#777"
            name="good-job-o"
        />
        <span>{{ article.like_count }}</span>
      </div>
      <div class="item">
          <van-icon
            color="#777"
            name="star-o"
        />
        <span>{{ article.collect_count }}</span>
      </div>
    </div>
    <!-- /底部区域 -->
</van-cell>
</template>

<script>
export default {
  props: {
    article: {
      type: Object,
      required: true
    }
  }

}
</script>

<style scoped lang="less">
.collect_item_content {
    margin-bottom: 15px;
    padding: unset;
.collect-item {
  .avatar {
    width: 72px;
    height: 72px;
    margin-right: 25px;
  }
  .van-cell__label {
      margin-top: unset;
  }

}
.article_item {
    /deep/.van-cell__title {
        span {
            font-size: 32px;
            color: #3f3f3f;
        }
    }

}
.article-bottom {
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    background-color: #fff;
    .van-icon {
      font-size: 40px;
    }
    .item {
        font-size: 35px;
        color: #6c6c6c;
        span {
            padding-left: 5px;
        }
    }
  }
}
</style>
