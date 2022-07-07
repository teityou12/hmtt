<template>
  <div>
    <van-loading v-if="isLoading" size=".53333rem" />
    <van-icon
      v-else
      color="#777"
      :name="is_collected ? 'star' : 'star-o'"
      @click="onClick"
    />
  </div>
</template>

<script>
import { addCollect, delCollect } from '@/api/article'
export default {
  name: 'CollectArticle',
  props: {
    is_collected: {
      type: Boolean,
      required: true
    }
  },
  created () { },
  data () {
    return {
      isLoading: false
    }
  },
  methods: {
    async onClick () {
      // 开始发送ajax
      this.isLoading = true
      const target = this.$route.params.article_id
      if (this.is_collected) {
        // 取消收藏
        try {
          await delCollect(target)
          this.$emit('update:is_collected', !this.is_collected)
        } catch (err) {
          console.log(err)
        }
      } else {
        // 添加收藏
        try {
          await addCollect(target)
          this.$emit('update:is_collected', !this.is_collected)
        } catch (err) {
          console.log(err)
        }
      }
      // ajax 结束了
      this.isLoading = false
    }

  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
</style>
