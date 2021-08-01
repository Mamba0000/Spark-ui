import request from '@/utils/request'

/**
 *  角色列表
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
 *  角色 关联的菜单列表
 * @param {*} data
 * @returns
 */
export function listAllMenuByRoleIds(data) {
  return request({
    url: '/service-uum/role/listAllTreeMenuByRoleIds',
    method: 'get',
    params: { ids: data }
  })
}

/**
 *  角色 授予菜单
 * @param {*} data
 * @returns
 */
export function grantRoleMenu(data) {
  return request({
    url: '/service-uum/role/grantRoleMenu',
    method: 'post',
    data: { roleIds: data.roleIds, menuIds: data.menuIds }
  })
}

// /**
//  *  角色 关联的权限列表
//  * @param {*} data
//  * @returns
//  */
// export function listPermissionByRoleIds(data) {
//   return request({
//     url: '/service-uum/role/listPermissionByRoleIds',
//     method: 'get',
//     params: { ids: data }
//   })
// }

/**
 *  角色 关联的权限列表
 * @param {*} data
 * @returns
 */
export function listAllTreePermissionByRoleIds(data) {
  return request({
    url: '/service-uum/role/listAllTreePermissionByRoleIds',
    method: 'get',
    params: { ids: data }
  })
}

/**
 *  角色 授权权限
 * @param {*} data
 * @returns
 */
export function grantRolePermission(data) {
  return request({
    url: '/service-uum/role/grantRolePermission',
    method: 'post',
    data: { roleIds: data.roleIds, permissionIds: data.permissionIds }
  })
}

/**
 * 删除角色
 * @param {*} data  '12375,12321'
 * @returns
 */
export function removeByIds(data) {

  return request({
    url: '/service-uum/role/removeByIds',
    method: 'post',
    params: { ids: data }
  })
}

/**
 * 添加或修改角色
 * @param {} data
 * @returns
 */
export function saveOrUpdate(data) {

  return request({
    url: '/service-uum/role/saveOrUpdate',
    method: 'post',
    data: {
      roleName: data.roleName,
      roleAlias: data.roleAlias,
      id: data.id
    }
  })
}
