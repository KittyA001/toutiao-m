// 获得本地存储
export const getItem = key => {
// 如果存储的不是json字符串，try里边就会报错，执行catch代码
  const data = window.localStorage.getItem(key)
  try {
    return JSON.parse(data)
  } catch (err) {
    return data
  }
}
// 创建本地存储
export const setItem = (key, value) => {
  if (typeof value === 'object') {
    value = JSON.stringify(value) // 如果存储的数据类型是对象则需要转换成json字符串
  }
  window.localStorage.setItem(key, value)
}
// 删除本地储存
export const removeItem = key => {
  window.localStorage.removeItem(key)
}
