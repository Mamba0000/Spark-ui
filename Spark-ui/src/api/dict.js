import request from '@/utils/request'

/**
 *  字典列表
 * @param {*} data
 * @returns
 */
export function list(data) {
  return request({
    url: '/service-system/dict/list',
    method: 'get',
    params: {
      dictKey: data.dictKey,
      dictValue: data.dictValue,
      code: data.code,
      current: data.current,
      size: data.size
    }
  })
}

/**
 *  字典列表 tree
 * @param {*} data
 * @returns
 */
export function tree(data) {
  return request({
    url: '/service-system/dict/tree',
    method: 'get',
    params: {}
  })
}

/**
 * 删除字典
 * @param {*} data  '12375,12321'
 * @returns
 */
export function removeByIds(data) {
  return request({
    url: '/service-system/dict/removeByIds',
    method: 'post',
    params: { ids: data }
  })
}

/**
 * 添加或修改字典
 * @param {} data
 * @returns
 */
export function saveOrUpdate(data) {
  debugger
  return request({
    url: '/service-system/dict/saveOrUpdate',
    method: 'post',
    data: {
      parentId: data.parentId,
      dictKey: data.dictKey,
      dictValue: data.dictValue,
      code: data.code,
      id: data.id,
      sort: data.sort,
      remark: data.remark,
      isDeleted: data.isDeleted
    }
  })
}
