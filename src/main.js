import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
// import 'vant/lib/index.css'
import 'amfe-flexible'
// import '@/styles/icon.less'
import 'vant/lib/index.less'
// import '@/styles/reset.less'
import '@/styles/index.less'
import * as obj from '@/filters'

import FollowUser from '@/components/FollowUser.vue'
import '@/components/'
Object.keys(obj).forEach(key => {
  Vue.filter(key, obj[key])
})
Vue.config.productionTip = false
Vue.use(Vant)
Vue.component(FollowUser.name, FollowUser) // 组件名字 ，组件实例对象
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
