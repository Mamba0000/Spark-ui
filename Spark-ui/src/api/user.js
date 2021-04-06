import request from '@/utils/request'

export function login(data) {
  // params URL传参 data:body传参
  console.log(request)
  return request({
    url: '/spark-auth/token',
    method: 'post',
    params: data,
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
