<template>
    <div class="my_content">
          <!-- 用户信息 -->
          <div class="bg user_msg" v-if="user">
            <div class="user_info">
                <div class="left">
                  <van-image
                  round
                  fit="cover"
                  :src="userInfo.photo"
                  class="avatar"
                   />
                  <span class="account">{{ userInfo.name }}</span>
                </div>
                <div class="right">
                  <van-button
                    round size="mini"
                    class="edit_btn"
                    to="/user/editData"
                  >编辑资料</van-button>
                </div>
            </div>
            <div class="user_date">
              <div class="data_item">
                <span class="count">{{ userInfo.art_count }}</span>
                <span class="text">头条</span>
              </div>
              <div class="data_item">
                <span class="count">{{ userInfo.follow_count }}</span>
                <span class="text">关注</span>
              </div>
              <div class="data_item">
                <span class="count">{{ userInfo.fans_count }}</span>
                <span class="text">粉丝</span>
              </div>
              <div class="data_item">
                <span class="count">{{ userInfo.like_count }}</span>
                <span class="text">获赞</span>
              </div>
            </div>
          </div>
          <!-- 未登录界面 -->
          <div class="bg login_page" v-else>
              <div class="login_btn" @click="$router.push('/login')">
                  <img src="~@/assets/mobile.png" alt="">
                  <span>登录/注册</span>
              </div>
          </div>
          <!-- 收藏和历史 -->
          <div class="collect_and_history">
            <van-grid :column-num="2" clickable>
              <van-grid-item to="/user/tags">
                <i slot="icon" class="toutiao toutiao-shoucang"></i>
                <span slot="text" class="text">收藏</span>
              </van-grid-item>
              <van-grid-item>
                <i slot="icon" class="toutiao toutiao-lishi"></i>
                <span slot="text" class="text">历史</span>
              </van-grid-item>
            </van-grid>
          </div>
          <van-cell title="消息通知" is-link/>
          <van-cell title="小智同学" is-link/>
          <!-- 退出登录 -->
          <van-cell title="退出登录" class="login_out" v-if="user" @click="loginOutFn"/>

    </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserInfoApi } from '@/api/user.js'
export default {
  data () {
    return {
      userInfo: {}
    }
  },
  computed: {
    ...mapState(['user'])
  },
  created () {
    // console.log(this.user)
    // 如果登录了，user就会有数据
    if (this.user) {
      this.getUserInfo()
    }
  },
  methods: {
    // 退出登录提示
    loginOutFn () {
      // Dialog组件需要this.$dialog调用
      this.$dialog.confirm({
        title: '确认退出吗？'
      })
        .then(() => {
          // on confirm
          // console.log('确认退出')
          this.$store.commit('upDataUser', null)
        })
        .catch(() => {
          // on cancel
          // console.log('取消退出')
        })
    },
    // 获取用户个人信息
    async getUserInfo () {
      try {
        const { data: { data } } = await getUserInfoApi()
        console.log(data)
        this.userInfo = data
      } catch (err) {
        this.$toast('获取信息失败')
      }
    }
  }
}
</script>

<style lang="less">
.my_content {
.bg {
    height: 361px;
    background: url("~@/assets/banner.png");
    background-size: cover;
}
.login_page {
    display: flex;
    justify-content: center; // 水平居中
    align-items: center; // 垂直居中
    .login_btn {
        display: flex;
        flex-direction: column;
        justify-content: center; // 水平居中
        align-items: center; // 垂直居中
        img {
            width: 132px;
            height: 132px;
        }
        span {
            margin-top: 15px;
            font-size: 28px;
            color: #fff;
        }
    }
}

    .user_info {
        width: 100%;
        height: 231px;
        padding: 76px 32px 23px;
        display: flex;
        justify-content: space-between;
        box-sizing: border-box;
        .left {
          display: flex;
          justify-content: center;
          align-items: center;
          .avatar {
            width: 132px;
            height: 132px;
            margin-right: 25px;
            border: 4px solid #fff
          }
          .account {
            font-size: 30px;
            color: #fff;
          }
        }
        .rihgt {
          .edit_btn {
          padding: 0 5px;
        }
        }
    }

    .user_date {
        width: 100%;
        display: flex;
        // align-items: center;
        .data_item {
          height: 130px;
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          .count {
            font-size: 35px;
            color: #fff;
          }
          .text {
            font-size: 25px;
            color: #fff;
          }

        }
    }
    .collect_and_history {
      margin-bottom: 5px;
      .toutiao {
        font-size: 45px;

      }
      .toutiao-shoucang {
        color: #eb5253;
      }
      .toutiao-lishi {
        color: #ff9d1d;
      }
      .text {
        font-size: 28px;

      }
    }
    .login_out{
      margin-top: 5px;
      text-align: center;
      .van-cell__title {
        color: #d86262;
      }
    }
}

</style>
