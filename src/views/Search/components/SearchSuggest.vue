<template>
  <div>
    <van-cell v-for="(item, index) in list" :key="index" icon="search" @click="$emit('search',item)">
      <template #title>
        <span v-html="highlight(item)"></span>
      </template>
    </van-cell>
  </div>
</template>

<script>
// 响应式的数据，写在data，非响应式的写在 export default 上面
import { getSuggestList } from '@/api/search'
let timer = null
export default {
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  created () { },
  data () {
    return {
      list: []
    }
  },
  methods: {
    // 因为这块要渲染的不是普通字符串 而是html片段 所以必须要用 v-html v-html 是属性绑定 所以不能用过滤器
    // 所以只能用在methods中
    highlight (str) {
      const reg = new RegExp(this.searchText, 'g')
      return str.replace(reg, `<span style="color:red">${this.searchText}</span>`)
    }
  },
  computed: {},
  watch: {
    searchText: {
      handler (newVal) {
        clearTimeout(timer)
        timer = setTimeout(async () => {
          try {
            const res = await getSuggestList(newVal)
            console.log(res)
            this.list = res.data.data.options
          } catch (err) {
            console.log(err)
          }
        }, 900)
      },
      immediate: true // 立即监听 组件在创建的时候就会被监听一次
    }
  },
  // 组件被销毁了，要清理掉定时器 避免内存泄漏
  beforeDestroy () {
    clearTimeout(timer)
  },
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
</style>
