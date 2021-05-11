import request from '@/utils/request'

/**
 *  权限列表
 * @param {*} data
 * @returns
 */
export function list(data) {
  // params URL传参 data:body传参
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
export function deleteLogic(data) {
  // params URL传参 data:body传参
  return request({
    url: '/service-uum/permission/deleteLogic',
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
  // params URL传参 data:body传参
  console.log(request)
  return request({
    url: '/service-uum/permission/addOrUpdate',
    method: 'post',
    data: {
      name: data.name,
      value: data.value,
      description: data.description,
      categoryId: data.categoryId
    }
  })
}
