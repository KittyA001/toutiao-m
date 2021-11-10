import request from '@/utils/request.js'
// 获取评论或评论回复列表
// GET参数使用params 进行传递
// 我们写的时候是对象，但是最终发给后端的数据是?
// axios 会把params 对象转为key=value?key=value 的格式放到url中去发送
// 当数字超过js安全指数范围时要先手动toString()转换为字符串，
// 不然axios自动转换字符串拼接会带引号导致报错
export const getCommentListApi = params => {
  return request({
    url: '/v1_0/comments',
    method: 'GET',
    params
  })
}
// 对评论点赞 target点赞的评论id
export const likeCommentApi = target => {
  return request({
    url: '/v1_0/comment/likings',
    method: 'POST',
    data: {
      target
    }
  })
}
// 取消对评论点赞 target点赞的评论id
export const unlikeCommentApi = target => {
  return request({
    url: `/v1_0/comment/likings/${target}`,
    method: 'DELETE'
  })
}
// 添加评论或评论回复
export const addCommentApi = data => {
  return request({
    url: '/v1_0/comments',
    method: 'POST',
    data
  })
}
