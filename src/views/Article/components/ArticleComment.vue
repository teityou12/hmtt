<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <CommentItem
        v-for="item in commentList"
        :key="item.com_id"
        :item="item"
        @replay-show="$emit('replay-show', $event)"
      ></CommentItem>
    </van-list>
  </div>
</template>

<script>
import { getCommentList } from '@/api/comment'
import CommentItem from './CommentItem.vue'
export default {
  name: 'ArticleComment',
  props: {
    type: {
      type: String,
      required: true,
      // props 自定义校验函数
      validator (value) {
        // return ['a','c'].indexOf(value) !== -1
        return ['a', 'c'].includes(value) // 数据只能是a或c才能校验铜鼓哦
      }
    },

    source: {
      type: [String, Number],
      required: true
    },

    commentList: {
      type: Array,
      required: true
    }

  },

  created () {
    this.getCommentList()
  },
  data () {
    return {
      paramsObj: {
        source: this.source,
        type: this.type,
        limit: 5,
        offset: null
      },
      // commentList: [],
      loading: false,
      finished: false

    }
  },
  methods: {
    async getCommentList () {
      try {
        const res = await getCommentList(this.paramsObj)
        console.log(res)
        // 数据已全部加载完毕，则直接将 finished 设置成true 即可
        if (res.data.data.results.length === 0) {
          this.finished = true
        }
        this.$emit('set-count', res.data.data.total_count)
        this.commentList.push(...res.data.data.results) // 保留每一页数据
        this.paramsObj.offset = res.data.data.last_id
        this.loading = false // 每次当前页面数据拿回来了，就把loading转圈效果关掉
      } catch (err) {
        console.log(err)
      }
    },
    onLoad () {
      this.getCommentList() // 获取下一页数据
    }

  },
  computed: {},
  watch: {},
  filters: {},
  components: { CommentItem }
}
</script>

<style scoped lang='less'>
.publish-wrap {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}

.van-list {
  margin-bottom: 45px;
}
</style>
