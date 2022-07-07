<template>
  <div>
    <van-field
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
      center
      ref="field"
    >
      <template #extra>
        <van-button
          type="default"
          :disabled="message.length === 0"
          class="btn"
          @click="onClick"
          >发布</van-button
        >
      </template>
    </van-field>
  </div>
</template>

<script>
import { addComment } from '@/api/comment'
export default {
  created () { },
  props: {
    target: {
      type: [String, Number],
      required: true
    },
    // 如果是对文章进行评论，不用传 对评论进行评论要传
    art_id: {
      type: [String, Number]
    }

  },
  data () {
    return {
      message: ''
    }
  },
  methods: {
    async onClick () {
      try {
        const res = await addComment({
          target: this.target,
          content: this.message,
          art_id: this.art_id
        })
        console.log(res)
        this.$emit('add-comment', res.data.data.new_obj)
      } catch (err) {
        console.log(err)
      }
    }
  },
  mounted () {
    // 组件最终会变成dom解构 $可以获取这个组件的跟标签dom
    this.$refs.field.$el.querySelector('textarea').focus()
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.btn {
  border: none;
}
</style>
