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
      roleAlias: data.roleAlias
    }
  })
}

/**
 * 删除权限
 * @param {*} data  '12375,12321'
 * @returns
 */
export function deleteLogic(data) {
  // params URL传参 data:body传参
  return request({
    url: '/service-uum/role/deleteLogic',
    method: 'post',
    params: { ids: data }
  })
}

/**
 * 添加或修改权限
 * @param {} data
 * @returns
 */
export function addOrUpdate(data) {
  console.log(request)
  return request({
    url: '/service-uum/role/addOrUpdate',
    method: 'post',
    data: {
      roleName: data.roleName,
      roleAlias: data.roleAlias,
      id: data.id
    }
  })
}
