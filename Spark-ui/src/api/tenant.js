import request from '@/utils/request'

/**
 *  租户列表
 * @param {*} data
 * @returns
 */
export function list(data) {
  // params URL传参 data:body传参
  return request({
    url: '/service-uum/tenant/list',
    method: 'get',
    params: {
      tenantId: data.tenantId,
      tenantName: data.tenantName,
      contactNumber: data.contactNumber,
      current: data.current,
      size: data.size
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
    url: '/service-uum/tenant/deleteLogic',
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
    url: '/service-uum/tenant/addOrUpdate',
    method: 'post',
    data: {
      id: data.id,
      tenantName: data.tenantName,
      domain: data.domain,
      linkman: data.linkman,
      contactNumber: data.contactNumber,
      address: data.address
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
