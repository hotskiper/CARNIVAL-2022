import axios from 'axios'
import router from '../router'
axios.interceptors.response.use(
  response => {
    const data = response.data
    const $message = app.__vue__.$message;
    // if(data.code === '0000') {
    //   router.push({ path: 'login' })
    // }
    if(data.status !== 200) {
      $message({
        type: 'warning',
        message: data.msg || '操作失败'
      })
    }
    return response;
  },
  config => {
    if (localStorage.token) {
      config.headers.Authorization = `bearer ${localStorage.token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
/**
 * 登陆
 */
export const checkLogin = () => {
  return axios.get('/api/getUserInfo?id=5daabed21e16331d205c1857')
}

/**
 * 获取商品管理列表
 */
export const getGoodsData = (param) => {
  // return axios.get('/api/data/goodsList.json')
  return axios.post('/api/carnival/v1/query_prize_info',param)
}

/**
 * 保存商品
 */
export const updateGoodsData = (param) => {
  // return axios.get('/api/data/goodsList.json')
  return axios.post('/api/carnival/v1/update_stock', param)
}

/**
 * 获取订单管理列表
 */
export const getOrderData = (param) => {
  // return axios.get('/api/data/orderList.json')
  return axios.post('/api/carnival/v1/query_order_info',param)
}

/**
 * 获取积分管理列表
 */
export const getIntData = (param) => {
  return axios.post('/api/carnival/v1/query_user_account',param)
}

/**
 * 获取个人积分详情
 */
export const getIntDetail = () => {
  return axios.get('/api/data/intDetail.json')
}






//other project use , to be delete
/**
 * 任务列表--进行中
 */
export const getTableData = data => {
  return axios.post('/ailab/minibox/excutetask',data)
}

/**
 * 任务列表--已完成
 */
export const getCompleteTask = data => {
  return axios.post('/ailab/minibox/completetask',data)
}

/**
 * 任务列表--新建任务--项目获取
 */
export const getTaskService = data => {
  return axios.post('/ailab/minibox/getTaskService',data)
}

/**
 * 任务列表--新建任务--提交
 */
export const addtask = data => {
  return axios.post('/ailab/minibox/addtask',data)
}

/**
 * 任务列表--删除完成任务
 */
export const deleteCompleteTask = data => {
  return axios.post('/ailab/minibox/deletetask',data)
}


/**
 * 任务列表--终止正在执行
 */
export const stopCreateTask = data => {
  return axios.post('/ailab/minibox/stoptask',data)
}


/**
 * 任务列表--导出
 * */
export const exporttask = data => {
  return axios.post('/ailab/api/minibox/exporttask',data)
}


/**
 * 重点人特征库列表
 * */
export const getKeyGroupData = () => {
  return axios.request({
    url:'/facepredator/ailab/minibox/group/info',
    method: 'get',
  })
}


/**
* 新增特征库
* */
export const addKeyGroup = data => {
  return axios.post('/facepredator/ailab/minibox/group/add',data)
}

/**
 * 编辑特征库
 * */
export const editKeyGroup = data => {
  return axios.post('/facepredator/ailab/minibox/group/update',data)
}

/**
 * 删除特征库
 * */

export const deleteKeyGroup = data => {
  return axios.post('/facepredator/ailab/minibox/group/delete',data)
}

/**
 * 任务列表--详情
 * */

export const requsetTaskdetail = data => {
  return axios.post('/ailab/minibox/taskdetail',data)
}

/**
 *特征库详情接口
 * */
export const getKeyGroupInfo = data => {
  return axios.post('/facepredator/ailab/minibox/group/data',data)
}

/**
 *特征库详情-子库接口
 * */
export const getChildTaskDetails = (url,data) => {
  return axios.post(url+'/ailab/minibox/task/details',data)
}

/**
 *
 * 删除选中项
 * */
export const deleteKeyGroupInfo = data => {
  return axios.post('/facepredator/ailab/minibox/face/delete',data)
}

/**
 * 重点人导出
 * */
export const exportKeyGroupInfo = data => {
  return axios.post('/facepredator/ailab/minibox/face/export',data)
}

/*上传*/
export const uploadKeyGroupInfo = data => {
  return axios.post('/facepredator/ailab/minibox/face/add',data)
}

/**
 * 编辑文件
 * */
export const editKeyGroupInfo = data => {
  return axios.post('/facepredator/ailab/minibox/face/update',data)
}

/**
 * 菜单配置
 * */
export const getMenuList = () => {
  return axios.get('ailab/minibox/getmenu')
}

/**
 * 特征库人脸导出
 * */
export const faceUpload = data => {
  return axios.post('/facepredator/ailab/minibox/face/upload',data)
}

