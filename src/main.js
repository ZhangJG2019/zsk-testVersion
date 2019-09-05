/* eslint-disable no-debugger */
import Vue from 'vue'
import App from './App'
import router from './router'
// import axios from 'axios'
import store from './store/'
import VueLazyload from 'vue-lazyload'
import infiniteScroll from 'vue-infinite-scroll'
import VueCookie from 'vue-cookie'
import VueResource from 'vue-resource'
import './assets/icon/font-yewuhuafen/iconfont.css'
import './assets/icon/font_jiyinguanlian/iconfont.css'
import $ from 'jquery'
import axios from 'axios'
Vue.prototype.axios = axios
import {
  userInfo
} from './api'
import {
  Tabs,
  TabPane,
  Button,
  ButtonGroup,
  Pagination,
  Checkbox,
  Icon,
  Autocomplete,
  Loading,
  Message,
  Notification,
  Steps,
  Step,
  Table,
  TableColumn,
  Input,
  Dialog,
  DatePicker,
  Select,
  Option,
  Card,
  Tag,
  Breadcrumb,
  BreadcrumbItem,
  Form,
  FormItem,
  CheckboxGroup,
  Row,
  Col,
  Upload,
  TimePicker
} from 'element-ui'
import {
  getStore
} from '/utils/storage'
import VueContentPlaceholders from 'vue-content-placeholders'

const whiteList = ['/home', '/drug', '/gene', '/getajax', '/login', '/register', '/search', '/taskhall', '/forgetpwd'] // 不需要登陆的页面

router.beforeEach(function (to, from, next) {
  if (getStore('token')) {
    let params = {
      params: {
        token: getStore('token')
      }
    }
    userInfo(params).then(res => {
      if (res && res.data) {
        store.commit('RECORD_USERINFO', {
          info: res.data.user
        })
        if (to.path === '/login') { //  跳转到
          next({
            path: '/'
          })
        }
        next()
      } else {
        if (whiteList.indexOf(to.path) !== -1) { // 白名单,如果在白名单中，就免登录
          next()
        } else { // 如果不在白名单中， 就跳转到登录页面
          next('/login')
        }
      }
    })
  } else {
    if (whiteList.indexOf(to.path) !== -1) { // 白名单,如果在白名单中，就免登录
      next()
    } else { // 如果不在白名单中， 就跳转到登录页面
      next('/login')
    }
  }
})

// axios.interceptors.request.use(
//   function (config) {
//     let token = window.localStorage.getItem('token')
//     config.headers.Authorization = token
//     return config
//   }
// )

Vue.use(VueContentPlaceholders)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Button)
Vue.use(ButtonGroup)
Vue.use(Pagination)
Vue.use(Checkbox)
Vue.use(Icon)
Vue.use(Autocomplete)
Vue.use(Steps)
Vue.use(Step)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(TimePicker)
Vue.use(Input)
Vue.use(Dialog)
Vue.use(DatePicker)
Vue.use(Select)
Vue.use(Option)
Vue.use(Loading.directive)
Vue.use(Card)
Vue.use(Tag)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(CheckboxGroup)
Vue.use(Upload)
Vue.use(Row)
Vue.use(Col)
Vue.use(infiniteScroll)
Vue.use(VueCookie)
Vue.use(VueResource)
// 给axios配置给Vue的$http成员
// Vue.prototype.$http = axios
Vue.prototype.$loading = Loading.service
Vue.prototype.$notify = Notification
Vue.prototype.$message = Message

Vue.use(VueLazyload, {
  // preLoad: 1.3,
  // error: 'dist/error.png',
  loading: '/static/images/load.gif'
  // attempt: 1
})
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  $,
  render: h => h(App)
})
