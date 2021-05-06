import request from '@/utils/request'

/**
 *  权限列表
 * @param {*} data
 * @returns
 */
export function list(data) {
  return request({
    url: '/service-uum/dept/list',
    method: 'get',
    params: {
      deptName: data.deptName
    }
  })
}

