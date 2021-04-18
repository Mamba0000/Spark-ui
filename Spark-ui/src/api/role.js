import request from '@/utils/request'

/**
 *  权限列表
 * @param {*} data
 * @returns
 */
export function list(data) {
  return request({
    url: '/service-uum/role/list',
    method: 'get',
    params: {
      roleName: data.roleName,
      roleAlias: data.roleAlias,
      tenantId: data.tenantId
    }
  })
}
