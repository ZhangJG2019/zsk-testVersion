import http from './public'
export const taskHall = (params) => {
  return http.fetchPost('/apis/taskApi/visitorTask', params)
}
// 任务大厅弹窗中确定按钮
export const Save = (params) => {
  return http.fetchPost('/apis/taskApi/urlSubmitTask', params)
}
// 任务大厅弹窗中基因名称数据获取
export const getGene = (params) => {
  return http.fetchGet('/apis/taskApi/genes', params)
}
// 任务大厅弹窗中search请求
export const getSearch = (params) => {
  return http.fetchPost('/apis/taskApi/search', params)
}
