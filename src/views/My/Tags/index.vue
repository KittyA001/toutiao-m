<template>
  <div class="info_tags_content">
      <van-nav-bar
      left-arrow
      @click-left="onClickLeft"
      fixed
    />
    <van-tabs v-model="active" animated swipeable class="tag">
      <van-tab title="收藏" name="a">
          <collect-list></collect-list>
      </van-tab>
      <van-tab title="历史" name="b">历史</van-tab>
      <van-tab title="作品" name="c">作品</van-tab>
    </van-tabs>
  </div>
</template>

<script>
import CollectList from '@/views/My/CollectList'
export default {
  data () {
    return {
      active: 0
    }
  },
  components: {
    CollectList
  },
  methods: {
    onClickLeft () {
      this.$router.back()
    }
  }

}
</script>

<style scoped lang="less">
.info_tags_content {
  padding-top: 92px;
  background: #f0f0f0;
  /deep/.van-nav-bar__content {
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
    /deep/.tag {
        .van-tabs__wrap {
        position: fixed;
            top: 92px;
            right: 0;
            left: 0;
            z-index: 1;
        }
        .van-tabs__content {
        margin-top: 92px;
    }
    }
}
</style>
