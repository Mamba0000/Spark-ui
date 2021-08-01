import request from '@/utils/request'

/**
 *  租户列表
 * @param {*} data
 * @returns
 */
export function list(data) {
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
export function removeByIds(data) {
  return request({
    url: '/service-uum/tenant/removeByIds',
    method: 'post',
    params: { ids: data }
  })
}

/**
 * 添加或修改用户
 * @param {} data
 * @returns
 */
export function saveOrUpdate(data) {
  return request({
    url: '/service-uum/tenant/saveOrUpdate',
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
