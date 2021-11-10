<template>
    <div class="home_content">
        <van-nav-bar class="title" fixed>
            <van-button
              round icon="search"
              color="#5babfb"
              slot="title"
              size="small"
              to="/search"
              >搜索</van-button>
        </van-nav-bar>
        <van-tabs v-model="active" animated swipeable class="channel-tabs">
            <van-tab
              :title="obj.name"
              v-for="(obj, index) in channels"
              :key="index"
              @click="active = index"
            >
                <article-list :channels="obj"></article-list>
            </van-tab>
            <div slot="nav-right" class="seat">
            </div>
            <div slot="nav-right" class="more" @click="isChannelsEditShow = true">
                <i class="toutiao toutiao-gengduo"></i>
            </div>
        </van-tabs>
        <van-popup
          v-model="isChannelsEditShow"
          closeable
          close-icon-position="top-left"
          position="bottom"
          :style="{ height: '100%' }"
        >
        <channels-edit :my_channels="channels" :active="active" @upActive='upActiveFn'></channels-edit>
        </van-popup>
    </div>
</template>

<script>
import { getChannelsApi } from '@/api/user.js'
import ArticleList from '../Home/ArticleList'
import ChannelsEdit from '@/components/ChannelsEdit'
import { mapState } from 'vuex'
import { getItem } from '@/utils/storage.js'
export default {
  data () {
    return {
      active: 0,
      channels: [],
      isChannelsEditShow: false // 是否显示编辑弹出层
    }
  },
  components: {
    ArticleList,
    ChannelsEdit
  },
  computed: {
    ...mapState(['user'])
  },
  created () {
    this.getChannels()
  },
  methods: {
    // 获取频道列表信息(也是我的频道)
    async getChannels () {
      let myChannels = []
      try {
        // 登录状态
        if (this.user) {
          const { data } = await getChannelsApi()
          myChannels = data.data.channels
        } else { // 未登录状态
          const localMyChannels = getItem('localMyChannels')
          if (localMyChannels) { // 有本地数据
            myChannels = localMyChannels
          } else { // 没有本地数据, 请求获取默认频道列表
            const { data } = await getChannelsApi()
            myChannels = data.data.channels
          }
        }
      } catch (err) {
        console.log('获取失败')
      }
      this.channels = myChannels
    },
    upActiveFn (index, isChannelsEditShow) {
      this.active = index
      this.isChannelsEditShow = isChannelsEditShow // 传入编辑弹跳层的显示状态
    }
  }
}
</script>

<style scoped lang="less">
.home_content {
    /deep/.van-nav-bar__content {
        background: #3296fa;
        text-align: center;
        color: #fff;
        .van-button {
            width: 555px;
            height: 64px;
            font-size: 28px;
            border: unset;
        }
        .van-icon {
            font-size: 32px;
            color: #fff;
        }
        .van-nav-bar__title {
            max-width: unset;
        }
    }
    // /deep/深度影响子元素的样式
    /deep/.channel-tabs {
        .van-tabs__wrap {
            position: fixed;
            top: 92px;
            z-index: 1;
            left: 0;
            right: 0;
            height: 82px !important;
            width: 100%;
            .van-tabs__nav {
                padding-left: 0;
                padding-right: 0;
                .van-tab--active {
                    color: #333333 !important;
                }
                .van-tab {
                    min-width: 200px;
                    border-right: 2px solid #f0f2f5;
                    color: #777777;
                }
                .van-tabs__line {
                    width: 31px;
                    background: #5aaafa;
                    margin-bottom: 8px;
                }
            }
            .seat {
                width: 66px;
                height: 82px;
                flex-shrink: 0; //不参与flex平分空间，默认为1参与平分
            }
            .more {
                position: fixed;
                right: 0;
                width: 66px;
                height: 82px;
                display: flex;
                justify-content: center;
                align-items: center;
                background: #fff;
                opacity: 0.902;
                .toutiao {
                    font-size: 33px;
                }
                &:before {
                    position: absolute;
                    left: 0;
                    content: "";
                    width: 2px;
                    height: 58px;
                    background: url("~@/assets/gradient-gray-line.png");
                    background-size: contain;
                }
            }
        }
        .van-tabs__content {
            margin-top: 174px;
        }
    }
  //   /deep/ .channel-tabs {
  //     padding-top: 92px;
  //   .van-tab {
  //     border-right: 1px solid #edeff3;
  //     min-width: 200px;
  //     font-size: 30px;
  //     color: #777777;
  //   }

  //   .van-tab--active {
  //     color: #333333;
  //   }

  //   .van-tabs__nav {
  //     padding-bottom: 0;
  //   }

  //   .van-tabs__line {
  //     bottom: 8px;
  //     width: 31px !important;
  //     height: 6px;
  //     background-color: #3296fa;
  //   }

  //   .seat {
  //     flex-shrink: 0;
  //     width: 66px;
  //     height: 82px;
  //   }

  //   .more {
  //     position: fixed;
  //     right: 0;
  //     display: flex;
  //     justify-content: center;
  //     align-items: center;
  //     width: 66px;
  //     height: 82px;
  //     background-color: #fff;
  //     background-color: rgba(255, 255, 255, 0.902);
  //     i.toutiao {
  //       font-size: 33px;
  //     }
  //     &:before {
  //       content: "";
  //       position: absolute;
  //       left: 0;
  //       width: 1px;
  //       height: 58px;
  //       background-image: url(~@/assets/gradient-gray-line.png);
  //       background-size: contain;
  //     }
  //   }
  // }
}
</style>
