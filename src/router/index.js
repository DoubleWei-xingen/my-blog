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
      meta: { title: '控制台', icon: 'el-icon-s-tools' ,auth:true }
    }]
  },

  {
    path:"/home",
    component:Layout,
    redirect:'/home',
    children:[{
      path:"poster",
      name:"Home",
      component:()=> import('@/views/home/index'),
      meta:{title: "首页标语", icon:"el-icon-house",auth:true}
    }]
  },

  {
    path: '/blog',
    component: Layout,
    redirect: '/blog/addBlog',
    name: 'Blog',
    meta: { title: '文章管理', icon: 'el-icon-document',auth:true },
    children: [
      {
        path: 'bloglist',
        name: 'BlogList',
        component: () => import('@/views/Blog/blogList/index'),
        meta: { title: '文章列表', icon: 'el-icon-s-fold',auth:true}
      },

      {
        path: 'addBlog',
        name: 'addBlog',
        component: () => import('@/views/Blog/addBlog/index'),
        meta: { title: '添加文章', icon: 'el-icon-edit',auth:true }
      },

      {
        path:"blogType",
        name:'BlogType',
        component:()=> import('@/views/Blog/blogType/index'),
        meta:{title :'文章分类',icon:"el-icon-share",auth:true}
      },

      {
        path:"editBlog/:id",
        name:'EditBlog',
        component:()=> import('@/views/Blog/editBlog/index'),
        meta:{title :'修改文章',icon:"el-icon-share",auth:true},
        hidden:true
      }
    ]
  },

  {
    path: '/project',
    component: Layout,
    redirect: '/project/projectlist',
    name: 'Project',
    meta: {
      title: '项目管理',
      icon: 'nested',
      auth:true
    },
    children: [
      {
        path: 'projectList',
        component: () => import('@/views/Project/projectList/index'), // Parent router-view
        name: 'Project',
        meta: { title: '项目列表',icon:"el-icon-s-unfold" ,auth:true},
      },
      {
        path: 'addproject',
        component: () => import('@/views/Project/addProject/index'),
        name: 'AddProject',
        meta: { title: '添加项目' , icon:"el-icon-edit-outline",auth:true }
      }
    ]
  },

  {
    path:"/comment",
    component:Layout,
    children:[{
      path:"comment",
      name:"Comment",
      component:()=> import('@/views/comment/index'),
      meta:{title: "评论管理", icon:"el-icon-house"}
    }]
  }, 

  {
    path:"/message",
    component:Layout,
    children:[{
      path:"message",
      name:"Message",
      component:()=> import('@/views/messageboard/index'),
      meta:{title: "留言板", icon:"el-icon-house"}
    }]
  }, 

  {
    path: '/about',
    component: Layout,
    children: [
      {
        path: 'about',
        name: 'About',
        component: () => import('@/views/about/index'),
        meta: { title: '关于我', icon: 'el-icon-user' }
      }
    ]
  },

  {
    path: '/setup',
    component: Layout,
    children: [
      {
        path: 'setup',
        name: 'Setup',
        component: () => import('@/views/setUp/index'),
        meta: { title: '设置', icon: 'el-icon-setting' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
