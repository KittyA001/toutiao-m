import request from '../utils/request'
// import store from '@/store'
// 发起axios请求，并按需导出
// 导出的是一个promise对象
// 登录信息
export const userApi = data => {
  return request({
    url: '/v1_0/authorizations',
    method: 'POST',
    data
  })
}
// 获取验证码
export const codeApi = mobile => {
  return request({
    url: `/v1_0/sms/codes/${mobile}`,
    method: 'GET'
  })
}
// 获取用户个人信息
export const getUserInfoApi = () => {
  return request({
    url: '/v1_0/user',
    method: 'GET'
    // 发送请求头数据
    // headers: {
    //   // 身份认证，用户令牌token
    //   Authorization: `Bearer ${store.state.user.token}`

    // }
  })
}
// 获取频道列表信息
export const getChannelsApi = () => {
  return request({
    url: '/v1_0/user/channels',
    method: 'GET'
  })
}
// 获取用户个人资料
export const getProLileApi = () => {
  return request({
    url: '/v1_0/user/profile',
    method: 'GET'
  })
}
// 更新用户个人资料
export const upDataProLileApi = data => {
  return request({
    url: '/v1_0/user/profile',
    method: 'PATCH',
    data
  })
}
// 更新用户个人头像
export const updatePhotoApi = data => {
  return request({
    url: 'v1_0/user/photo',
    method: 'PATCH',
    data
  })
}
// 更新用户个人收藏列表
export const getCollectListApi = data => {
  return request({
    url: '/v1_0/article/collections',
    method: 'GET',
    data
  })
}
