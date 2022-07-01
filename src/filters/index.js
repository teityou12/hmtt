
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.locale('zh-cn')
dayjs.extend(relativeTime)
/* 时间变成相对时间
@param {*} time
@rewturn
*/
export const dateformat = (time) => {
  return dayjs(time).fromNow()
}
