import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start()

  // // set page title
  document.title = getPageTitle(to.meta.title)

  // // determine whether the user has logged in
  //  从cookies 或者 localStorage 拿取Token;
  const hasToken = getToken()

  const isLogin = store.getters.userInfo


  if (to.meta.auth) {
    // 需要鉴权的路由
    if (isLogin) {
    // 有用户信息 ，直接放行
      next()
    } else {
      // 没有用户信息，有Token,
      if (hasToken) {
        try {
          // get user info 验证token,
          await store.dispatch('user/getInfo')
          next()
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      } else {
        // 没有token ,登录
        next(`/login?redirect=${to.path}`);
        NProgress.done()
      }
    }
  } else {
    if (to.path === "/login" && isLogin) {
      console.log('----',isLogin)
      next({ path: '/' })
    } else {
      next()
    }
    NProgress.done()
  }

  /**
   * 以下是vue-element-admin 的鉴权流程
   * */
  // // 有ToKer
  // if (hasToken) {
  //   if (to.path === '/login') {
  //     // if is logged in, redirect to the home page
  //     next({ path: '/' });
  //     NProgress.done();
  //   } else {
  //     // 拿取用户信息
  //     const hasGetUserInfo = store.getters.name;
  //     if (hasGetUserInfo) {
  //       next();
  //     } else {
  //       // 有Token 没有用户信息 ，发送请求拿取用户信息
  //       try {
  //         // get user info
  //         await store.dispatch('user/getInfo')

  //         next()
  //       } catch (error) {
  //         // remove token and go to login page to re-login
  //         await store.dispatch('user/resetToken')
  //         Message.error(error || 'Has Error')
  //         next(`/login?redirect=${to.path}`)
  //         NProgress.done()
  //       }
  //     }
  //   }
  // } else {
  //   /* has no token*/

  //   if (whiteList.indexOf(to.path) !== -1) {
  //     // in the free login whitelist, go directly
  //     next()
  //   } else {
  //     // other pages that do not have permission to access are redirected to the login page.
  //     next(`/login?redirect=${to.path}`)
  //     NProgress.done()
  //   }
  // }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
