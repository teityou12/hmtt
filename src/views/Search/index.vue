<template>
  <div>
    <form action="/">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        background="#3296fa"
        @cancel="$router.go(-1)"
        autofocus
        @search="onSearch"
        @focus="isSearch = false"
      />
      <SearchHistory v-if="searchText === ''" @search="onSearch" />

      <template v-else>
        <SearchResult v-if="isSearch" :searchText="searchText"></SearchResult>
        <SearchSuggest
          v-else
          :searchText="searchText"
          @search="onSearch"
        ></SearchSuggest>
      </template>
    </form>
  </div>
</template>

<script>
import SearchHistory from './components/SearchHistory.vue'
import SearchSuggest from './components/SearchSuggest.vue'
import SearchResult from './components/SearchResult.vue'
export default {
  created () { },
  data () {
    return {
      searchText: '',
      isSearch: false // 默认没有回车
    }
  },
  methods: {
    // 想实现的需求 在搜索input回车的时候 和点击联想建议的时候效果一样
    onSearch (str) {
      this.searchText = str
      this.isSearch = true
      this.$store.commit('setSearchHistoryList', str)
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: { SearchHistory, SearchSuggest, SearchResult }
}
</script>

<style scoped lang='less'>
</style>
