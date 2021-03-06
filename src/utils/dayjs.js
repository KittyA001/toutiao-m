import Vue from 'vue'
import dayjs from 'dayjs'
// 加载语言配置
// 1.加载中文语言包
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'
// 2.全局使用
dayjs.locale('zh-cn')
// dayjs()当前时间
// console.log(dayjs().format('YYYY-MM-DD'))

dayjs.extend(relativeTime)
// relativeTime的方法：
// dayjs().from(dayjs('1990-01-01')) // 31 年后
// dayjs().from(dayjs('1990-01-01'), true) // 31 年
// dayjs().fromNow()
// dayjs().to(dayjs('1990-01-01')) // 31 年前
// dayjs().toNow()

// 定义一个全局过滤器，然后就可以在任何组件的模板中使用了
// 其实过滤器就相当于一个全局可用的方法(仅供模板使用)
// 参数1:过滤器名称
// 参数2:过滤器函数
// 使用方式:{{表达式|过滤器名称}}
// 管道符前面的表达式的结果会作为参数传递到过滤器函数中
// 过滤器的返回值会渲染到使用过滤器的模板位置
Vue.filter('relativeTime', value => {
  return dayjs().to(dayjs(value)) // 多少年前
})
