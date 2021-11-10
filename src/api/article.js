import request from '@/utils/request.js'
// 获取文章列表
export const getArticleListApi = params => {
  return request({
    url: '/v1_1/articles',
    method: 'GET',
    params
  })
}
// 获取文章详情
export const getArticleDetailApi = articleId => {
  return request({
    url: `/v1_0/articles/${articleId}`,
    method: 'GET'
  })
}
// 关注用户 target目标文章id
export const followUserApi = target => {
  return request({
    url: '/v1_0/user/followings',
    method: 'POST',
    data: {
      target
    }
  })
}
// 取消关注 target目标文章id
export const unFollowUserApi = target => {
  return request({
    url: `/v1_0/user/followings/${target}`,
    method: 'DELETE'
  })
}
// 收藏用户 target目标文章id
export const collectArticleApi = target => {
  return request({
    url: '/v1_0/article/collections',
    method: 'POST',
    data: {
      target
    }
  })
}
// 取消收藏 target目标文章id
export const unCollectArticleApi = target => {
  return request({
    url: `/v1_0/article/collections/${target}`,
    method: 'DELETE'
  })
}
// 对文章点赞 target目标文章id
export const likeArticleApi = target => {
  return request({
    url: '/v1_0/article/likings',
    method: 'POST',
    data: {
      target
    }
  })
}
// 取消对文章点赞 target目标文章id
export const unlikeArticleApi = target => {
  return request({
    url: `/v1_0/article/likings/${target}`,
    method: 'DELETE'
  })
}
