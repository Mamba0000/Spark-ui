import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },
  {
    path: '/system',
    component: Layout,
    redirect: '/system/userManager',
    name: 'system',
    meta: { title: '系统设置-本地', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'userManager',
        name: '用户管理',
        component: () => import('@/views/system/user'),
        meta: { title: '用户管理', icon: 'table' }
      },
      {
        path: 'permissionManager',
        name: '权限管理',
        component: () => import('@/views/system/permission'),
        meta: { title: '权限管理', icon: 'tree' }
      },
      {
        path: 'roleManager',
        name: '角色管理',
        component: () => import('@/views/system/role'),
        meta: { title: '角色管理', icon: 'tree' }
      },
      {
        path: 'menuManager',
        name: '菜单管理',
        component: () => import('@/views/system/menu'),
        meta: { title: '菜单管理', icon: 'tree' }
      },
      {
        path: 'tenantManager',
        name: '租户管理',
        component: () => import('@/views/system/tenant'),
        meta: { title: '租户管理', icon: 'tree' }
      },
      {
        path: 'deptManager',
        name: '组织部门',
        component: () => import('@/views/system/dept'),
        meta: { title: '组织部门', icon: 'tree' }
      },
      {
        path: 'dictManager',
        name: '字典管理',
        component: () => import('@/views/system/dict'),
        meta: { title: '字典管理', icon: 'tree' }
      }
    ]
  },
  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: 'Form', icon: 'form' }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

function generateRoutes(item) {
  let router
  if (item.name) {
    router = generateRouter(item)
  }
  if (item.children) {
    // 目前迭代两层
    item.children.forEach(e => {
      const subRouter = generateRouter(e)
      router.children.push(subRouter)
    })
  }
  return router
}

function generateRouter(item) {
  const router = {}
  router.params = item.path
  router.component = Layout
  router.name = item.name
  router.meta = { title: item.title, icon: item.icon }
  router.children = []
  router.path = item.path
  if (!item.children) {
    router.component = () => import(item.component)
  }
  return router
}

export function asyncRouter(menus) {
  console.log(menus)
  const routers = []

  menus.forEach(item => {
    routers.push(generateRoutes(item))
  })

  debugger

  routers.push({
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example2',
    meta: { title: 'Example2', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: 'Table', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: 'Tree', icon: 'tree' }
      }
    ]
  })
  // 动态路由
  router.options.routes = constantRoutes.concat(routers)
  router.addRoutes(routers)
}

export default router
