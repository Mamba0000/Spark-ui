import request from '@/utils/request'

/**
 *  权限列表
 * @param {*} data
 * @returns
 */
export function list(data) {
  return request({
    url: '/service-uum/permission/list',
    method: 'get',
    params: {
      name: data.name,
      value: data.value,
      size: data.size,
      current: data.current
    }
  })
}

/**
 * 删除权限
 * @param {*} data  '12375,12321'
 * @returns
 */
export function removeByIds(data) {
  return request({
    url: '/service-uum/permission/removeByIds',
    method: 'post',
    params: { ids: data }
  })
}

/**
 * 添加或修改权限
 * @param {} data
 * @returns
 */
export function saveOrUpdate(data) {
  return request({
    url: '/service-uum/permission/saveOrUpdate',
    method: 'post',
    data: {
      name: data.name,
      value: data.value,
      description: data.description,
      categoryId: data.categoryId,
      parentId: data.parentId,
      id: data.id
    }
  })
}
