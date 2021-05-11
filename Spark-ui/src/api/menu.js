import request from '@/utils/request'

/**
 *  菜单列表
 * @param {*} data
 * @returns
 */
export function list(data) {
  // params URL传参 data:body传参
  return request({
    url: '/service-uum/menu/list',
    method: 'get',
    params: {
      code: data.code,
      current: data.current,
      size: data.size,
      name: data.name
    }
  })
}

/**
 *  菜单列表 tree
 * @param {*} data
 * @returns
 */
export function tree(data) {
  // params URL传参 data:body传参
  return request({
    url: '/service-uum/menu/tree',
    method: 'get',
    params: {
    }
  })
}

/**
 * 删除菜单
 * @param {*} data  '12375,12321'
 * @returns
 */
export function deleteLogic(data) {
  // params URL传参 data:body传参
  return request({
    url: '/service-uum/menu/deleteLogic',
    method: 'post',
    params: { ids: data }
  })
}

/**
 * 添加或修改菜单
 * @param {} data
 * @returns
 */
export function addOrUpdate(data) {
  // params URL传参 data:body传参
  console.log(request)
  return request({
    url: '/service-uum/menu/addOrUpdate',
    method: 'post',
    data: {
      parentId: data.parentId,
      code: data.code,
      name: data.name,
      alias: data.alias,
      path: data.path,
      id: data.id,
      sort: data.sort,
      source: data.source,
      category: data.category,
      action: data.action,
      isOpen: data.isOpen,
      remark: data.remark,
      hidden: data.hidden,
      icon: data.icon,
      status: data.status,
      isDeleted: data.isDeleted
    }
  })
}
