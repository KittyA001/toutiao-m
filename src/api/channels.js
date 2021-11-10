import request from '@/utils/request'
// 获得全部频道
export const GetAllChannelsApi = () => {
  return request({
    url: '/v1_0/channels',
    method: 'GET'
  })
}
// 添加频道
export const addChannelsApi = channel => {
  return request({
    url: '/v1_0/user/channels',
    method: 'PATCH',
    data: {
    //   channels: [{
    //     id,
    //     seq
    //   }]
      channels: [channel] // channel是频道对象
    }
  })
}
export const DeleteChannelsApi = channelId => {
  return request({
    url: `/v1_0/user/channels/${channelId}`,
    method: 'DELETE'
  })
}
