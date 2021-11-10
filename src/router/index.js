import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login/index.vue' // 登录页面
import Layout from '@/views/Layout' // 主页
import Home from '@/views/Home' // 首页
import Query from '@/views/Query' // 问答
import Video from '@/views/Video' // 视频
import My from '@/views/My' // 我的
import Search from '@/views/Search' // 搜索
import ArticleDetails from '@/views/ArticleDetails' // 文章详情
import EditData from '@/views/EditData' // 编辑个人信息
import Tags from '@/views/My/Tags' // 我的里边的收藏、历史标签页

Vue.use(VueRouter)

// 路由表
const routes = [
  // 登录页面
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  // 布局页面
  {
    path: '/',
    name: 'layout',
    component: Layout,
    redirect: '/home', // 强制跳转到这个路径
    children: [
      {
        path: 'home', // 默认子路由，只能有一个
        name: 'home',
        component: Home

      },
      {
        path: 'query',
        name: 'query',
        component: Query
      },
      {
        path: 'video',
        name: 'video',
        component: Video
      },
      {
        path: 'my',
        name: 'my',
        component: My
      }]
  },
  // 搜索页面
  {
    path: '/search',
    name: 'search',
    component: Search
  },
  // 文章详情页面
  // 需要跳转的组件需要如下写法：
  /* :to="{
    name: 'article',
    params: {
      articleId: article.art_id
    }
  }" */
  {
    path: '/article:articleId', // 动态路由路径，articleId为参数
    name: 'article',
    component: ArticleDetails,
    props: true // props属性把路由参数传给组件，路由有动态参数时建议用props传参数
  },
  // 编辑资料页面
  {
    path: '/user/editData',
    name: 'edit',
    component: EditData
  },
  {
    path: '/user/tags',
    name: 'tags',
    component: Tags
  }
]

const router = new VueRouter({
  routes
})

export default router
