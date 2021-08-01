import request from '@/utils/request'

// 用户登录
export function login(data) {
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
export function removeByIds(data) {
  return request({
    url: '/service-uum/user/removeByIds',
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
    url: '/service-uum/user/saveOrUpdate',
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

export function resetPassword(data) {
  return request({
    url: '/service-uum/user/resetPassword',
    method: 'post',
    params: {
      newPassword: data.password,
      newPassword1: data.rePassword2,
      userId: data.id
    }
  })
}

export function listAllTreeRoleByUser(data) {
  return request({
    url: '/service-uum/user/listAllTreeRoleByUser',
    method: 'get',
    params: {
      id: data.id,
      tenantId: data.tenantId

    }
  })
}

/**
 * 用户授权
 * @param {*} data  '12375,12321'
 * @returns
 */
export function grantRole(data) {
  return request({
    url: '/service-uum/user/grantRole',
    method: 'post',
    params: {
      userIds: data.userIds,
      roleIds: data.roleIds
    }
  })
}

