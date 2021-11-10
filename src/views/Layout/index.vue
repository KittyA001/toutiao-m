<template>
  <div class="layout_content">
    <!-- 挂载点 -->
      <router-view></router-view>
      <!-- 底部选项 -->
      <van-tabbar route class="tab_bar">
        <van-tabbar-item to="/home">
        <!-- 自定义图标，用具名插槽 -->
          <i slot="icon" class="toutiao toutiao-shouye"></i>
          <span>首页</span>
        </van-tabbar-item>
        <van-tabbar-item to="/query">
          <i slot="icon" class="toutiao toutiao-wenda"></i>
          <span>问答</span>
        </van-tabbar-item>
        <van-tabbar-item to="/video">
          <i slot="icon" class="toutiao toutiao-shipin"></i>
          <span>视频</span>
        </van-tabbar-item>
        <van-tabbar-item to="/my">
          <i slot="icon" class="toutiao toutiao-wode"></i>
          <span>{{ $store.state.user ? '我的' : '未登录'}}</span>
        </van-tabbar-item>
      </van-tabbar>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less">
.layout_content {
    .tab_bar {
      background: #fff;
        .toutiao {
            font-size: 40px;
        }
        span {
            font-size: 20px;
        }
    }
}

</style>
