// 为了方便项目中本地存储的时候 写的时候简化 封装 获取 设置 删除 全部删除工具函数
// window.localStorage.setItem('a',"['a']")
/* 获取 */

export function getItem (key) {
  const res = window.localStorage.getItem(key)

  try {
    return JSON.parse(res)
  } catch (err) {
    return res
  }
}

/* 设置 */
export function setItem (key, value) {
  if (typeof value === 'object') { // 符合数据类型
    window.localStorage.setItem(key, JSON.stringify(value))
  } else {
    window.localStorage.setItem(key, value)
  }
}

/* 根据key删除本地存储中其中的一个 */
export function removeItem (key) {
  window.localStorage.removeItem(key)
}

/* 删除所有本地存储 */
export function clearItem () {
  window.localStorage.clearItem()
}
