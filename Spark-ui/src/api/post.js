import request from '@/utils/request'

/**
 *  岗位列表
 * @param {*} data
 * @returns
 */
export function list(data) {
  return request({
    url: '/service-uum/post/list',
    method: 'get',
    params: {
      deptName: data.deptName
    }
  })
}
