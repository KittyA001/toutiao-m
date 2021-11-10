import request from '@/utils/request.js'
// 获取搜索建议列表
export const getSearchSuggestionsApi = q => {
  // rrturn出结果
  return request({
    url: '/v1_0/suggestion',
    method: 'GET',
    params: {
      q
    }
  })
}
export const getSearchResultApi = params => {
  // rrturn出结果
  return request({
    url: '/v1_0/search',
    method: 'GET',
    params
  })
}
