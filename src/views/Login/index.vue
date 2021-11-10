<template>
    <div class="login_content">
        <van-nav-bar title="登录" class="login_title">
            <van-icon slot="left" name="cross" class="cross"
            @click="$router.back()"
             />
        </van-nav-bar>
        <!-- 登录表单 -->
        <!--
            表单验证：
              1、给 van-field 组件配置 rules 验证规则
                参考文档：https://youzan.github.io/vant/#/zh-CN/form#rule-shu-ju-jie-gou
              2、当表单提交的时候会自动触发表单验证
                 如果验证通过，会触发 submit 事件
                 如果验证失败，不会触发 submit
           -->
        <!-- type="number" maxlength="11" 是html5的表单属性-->
        <!-- 通过ref属性 获取组件对象
                通过this.$refs.名字 获取组件对象
            -->
        <van-form ref="form" @submit="onSubmit">
          <!-- 手机号 -->
            <van-field v-model="user.mobile" name="mobile" placeholder="请输入手机号"
             :rules="formRules.mobile" type="number" maxlength="11"
             >
                <!-- 具名插槽 -->
                <i slot="left-icon" class="toutiao toutiao-shouji"></i>
            </van-field>
            <!-- 验证码 -->
            <van-field v-model="user.code" name="code" placeholder="请输入验证码"
             :rules="formRules.code" type="number" maxlength="6"
             >
                <!-- 具名插槽 -->
                <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
                <template #button>
                    <!-- @finish="isCountDownShow = false" 倒计时结束时触发事件 -->
                    <van-count-down :time="60*1000" format="ss 秒" v-if="isCountDownShow" @finish="isCountDownShow = false" />
                    <!-- 在表单中，除了提交按钮外，可能还有一些其他的功能性按钮，如发送验证码按钮。
                  在使用这些按钮时，要注意将native-type设置为button，否则会触发表单提交。 -->
                    <van-button class="btn_msg" round size="small" type="default" @click="btnCode" native-type="button" v-else>获取验证码</van-button>
                </template>
            </van-field>
            <div class="login-btn-wrap" style="margin: 16px;">
                <van-button class="login-btn" block type="info" native-type="submit">登录</van-button>
            </div>
        </van-form>
    </div>
</template>

<script>
import { userApi, codeApi } from '@/api/user.js'
export default {
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      },
      formRules: {
        mobile: [
          {
            required: true,
            message: '请填写用户名'
          },
          {
            pattern: /^1[3,5,7,8]\d{9}$/,
            message: '手机号格式不正确'
          }
        ],
        code: [
          {
            required: true,
            message: '请填写验证码'
          },
          {
            pattern: /^\d{6}$/,
            message: '验证码格式不正确'
          }
        ]
      },
      isCountDownShow: false
    }
  },
  methods: {
    async onSubmit () {
      // 发起请求
      // try里边的一定是成功的，catch铺抓错误
      // 只能通过this.$toast来调用Toast组件
      // 加载轻提示
      this.$toast.loading({
        duration: 0, // 展示时长(ms)，值为 0 时，toast 不会消失，默认是2000
        message: '加载中...',
        forbidClick: true // 通过 forbidClick 属性可以禁用背景点击。
      })
      const user = this.user
      try {
        // 解构出第一个data
        const {
          data: { data }
        } = await userApi(user)
        // console.log(data)
        this.$store.commit('upDataUser', data) // 存储Token和refresh_token
        this.$toast.success('登录成功') // 成功提示
        this.$router.back()
      } catch (err) {
        if (err.response.status === 400) {
          // console.log('手机号或验证码错误！')
          this.$toast.fail('手机号或验证码错误') // 失败提示
        } else {
          console.log('未知错误', err)
          this.$toast.fail('未知错误') // 失败提示
        }
      }
    },
    async btnCode () {
      // 校验手机号，手机号正确才能发送验证码
      try {
        // 通过ref属性获得Form表单实例，再调用validate方法，返回值是Promise
        // validate：验证表单，支持传入 name 来验证单个或部分表单项
        // 只校验手机号
        await this.$refs.form.validate('mobile') // 返回的是Promise
        console.log('验证通过')
      } catch (err) {
        // try不成功就会执行catch
        return console.log(err)
      }
      this.isCountDownShow = true // 验证通过显示倒计时
      // 发起请求获取验证码
      try {
        await codeApi(this.user.mobile)
        this.$toast('获取成功') // 成功提示
        console.log(this.user.mobile)
      } catch (err) {
        if (err.response.status === 429) {
          this.$toast('获取频繁，稍后重试') // 失败提示
        } else {
          this.$toast('获取失败，稍后重试') // 失败提示
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.login_content {
    .login_title {
        .cross {
            color: #fff;
        }
    }
    .toutiao {
        font-size: 37px;
    }
    .btn_msg {
        width: 152px;
        height: 46px;
        line-height: 46px;
        background-color: #ededed;
        font-size: 22px;
        color: #8d8d8d;
    }
    .login-btn-wrap {
        padding: 53px 33px;
        .login-btn {
            background-color: #6db4fb;
            border: none;
            border-radius: 10px;
        }
    }
}
</style>
