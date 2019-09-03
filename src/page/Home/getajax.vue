<template>
  <div>中专获取token页</div>
</template>
<script>
// import { getToken } from '/api/index.js'
// import { userInfo } from '/api/index.js'
import { setStore } from '/utils/storage'
// import store from './store/'

// 格式化时间函数 2
export default {
  // 生命周期函数
  created() {
    this.gettoken()
  },

  methods: {
    // 发送留言
    gettoken() {
      // getToken()
      //   .then(res => {
      //     console.log(res)
      //     // setStore('token', res.data.token)
      //     // this.$router.push({ path: 'http://localhost:9999/#/home' })
      //     this.$router.push({ path: '#/home' })
      //   })
      //   .catch(res => {
      //     alert('获取token失败')
      //   })
      // alert(111)
      var opt = window.location.href.split('=')[1]
      console.log(opt)
      var opts = opt.split('#')[0]
      window.location.ticket = opts
      console.log(window.location.ticket)
      console.log(opts)
      setStore('ticket', opts)
      // this.$router.push({ path: 'http://localhost:9999/#/home' })
      // window.location.href = 'http://192.168.1.153:9999/#/home'
      window.location.href = 'http://localhost:9999/#/home'

      // let data = new FormData()
      // var tick = getStore('ticket')
      // console.log(tick)
      // data.append(' ticket', tick)
      // userInfo(data)
      // .then(res => {
      //   debugger
      //   // if (res && res.data) {
      //   //   store.commit('RECORD_USERINFO', {
      //   //     info: res.data.user
      //   //   })
      //   // }
      //   console.log(res)
      // })
      // .catch(console.log(data))
    }
  }
}
</script>

