import request from '@/utils/request'

/**
 *  组织部门列表
 * @param {*} data
 * @returns
 */
export function list(data) {
  return request({
    url: '/service-uum/dept/list',
    method: 'get',
    params: {
      deptName: data.deptName,
      current: data.current,
      size: data.size,
      fullName: data.fullName
    }
  })
}

/**
 *  组织部门列表 tree
 * @param {*} data
 * @returns
 */
export function tree(data) {
  return request({
    url: '/service-uum/dept/tree',
    method: 'get',
    params: {
    }
  })
}

/**
 * 删除组织部门
 * @param {*} data  '12375,12321'
 * @returns
 */
export function removeByIds(data) {

  return request({
    url: '/service-uum/dept/removeByIds',
    method: 'post',
    params: { ids: data }
  })
}

/**
 * 添加或修改组织部门
 * @param {} data
 * @returns
 */
export function saveOrUpdate(data) {
  return request({
    url: '/service-uum/dept/saveOrUpdate',
    method: 'post',
    data: {
      parentId: data.parentId,
      deptName: data.deptName,
      fullName: data.fullName,
      categoryId: data.categoryId,
      id: data.id,
      sort: data.sort,
      remark: data.remark,
      isDeleted: data.isDeleted
    }
  })
}
