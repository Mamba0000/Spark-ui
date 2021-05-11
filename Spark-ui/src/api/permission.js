import request from '@/utils/request'

// 用户登录
export function login(data) {
  // params URL传参 data:body传参
  console.log(request)
  return request({
    url: '/spark-auth/token',
    method: 'post',
    params: data,
    data
  })
}

/**
 *  用户列表
 * @param {*} data
 * @returns
 */
export function list(data) {
  // params URL传参 data:body传参
  return request({
    url: '/service-uum/user/list',
    method: 'get',
    params: {
      account: data.account,
      current: data.current,
      size: data.size,
      tenantId: data.tenantId
    }
  })
}

/**
 * 删除用户
 * @param {*} data  '12375,12321'
 * @returns
 */
export function deleteLogic(data) {
  // params URL传参 data:body传参
  return request({
    url: '/service-uum/user/deleteLogic',
    method: 'post',
    params: { ids: data }
  })
}

/**
 * 添加或修改用户
 * @param {} data
 * @returns
 */
export function addOrUpdate(data) {
  // params URL传参 data:body传参
  console.log(request)
  return request({
    url: '/service-uum/user/addOrUpdate',
    method: 'post',
    data: {
      account: data.account,
      avatar: data.avatar,
      code: data.code,
      deptId: data.deptId,
      email: data.email,
      id: data.id,
      isDeleted: data.isDeleted,
      name: data.name,
      password: data.password,
      phone: data.phone,
      postId: data.postId,
      realName: data.realName,
      sex: data.sex,
      status: data.status
    }
  })
}

export function info(token) {
  return request({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
