<template>
    <!-- <van-cell title="单元格" value="内容" label="描述信息" /> -->
    <!-- :to="`/article:${article.art_id}`" -->
    <van-cell
      class="article_item"
      :to="{
        name: 'article',
        params: {
          articleId: article.art_id
        }
      }">
        <div class="van-multi-ellipsis--l2" slot="title">{{ article.title }}</div>
            <!-- 自定义标题下方 label 的内容 -->
        <div slot="label">
            <!-- 封面为三张图片 -->
            <div class="cover" v-if="article.cover.type === 3">
                <div class="cover_item" v-for="(img_url, index) in article.cover.images" :key="index">
                    <van-image class="pic_more" fit="cover" :src="img_url" />
                </div>
            </div>
            <!-- lable内容 -->
            <div class="lable">
                <span>{{ article.aut_name}}</span>
                <span>{{ article.comm_count}}评论</span>
                <span>{{ article.pubdate | relativeTime}}</span>
            </div>
        </div>
        <!-- 自定义右侧 value 的内容 -->
        <!-- 当封面只有一张图时 -->
        <div slot="default" v-if="article.cover.type === 1">
            <van-image class="pic" fit="cover" :src="article.cover.images[0]" />
        </div>
    </van-cell>
</template>

<script>
export default {
  props: {
    article: {
      type: Object,
      require: true
    }
  }
}
</script>

<style scoped lang="less">
.article_item {
    /deep/.van-cell__title {
        span {
            font-size: 32px;
            color: #3f3f3f;
        }
    }

    .van-cell__label {
        .lable {
            span {
                font-size: 22px;
                margin-right: 25px;
                color: #cacaca;
            }
        }
    }
    .van-cell__value {
        flex: unset;
        width: 232px;
        height: 146px;
        padding-left: 25px;
        .pic {
            width: 100%;
            height: 146px;
        }
    }
    .cover {
        display: flex;
        .cover_item {
            flex: 1;
            &:not(:last-child) {
                padding-right: 4px;
            }
            .pic_more {
                width: 100%;
                height: 146px;
            }
        }
    }
}
</style>
