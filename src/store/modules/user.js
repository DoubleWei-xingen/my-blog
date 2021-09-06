import { login, getInfo } from '@/api/user'
import { removeToken, getToken } from '@/utils/auth'
import { resetRouter } from '@/router'


const getDefaultState = () => {
  return {
    name: '',
    avatar: '',
    userInfo: null,
    // token:''
  }
}

const state = getDefaultState()


const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_USERINFO: (state, userinfo) => {
    state.userInfo = userinfo
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { loginId, loginPwd, remember, captcha } = userInfo
    return new Promise((resolve, reject) => {
      login({ loginId: loginId.trim(), loginPwd: loginPwd, remember, captcha }).then(response => {
        const { data } = response
        console.log(data)
        if (data) {
          commit("SET_USERINFO", data)
          resolve(response)
        } else {
          reject(response)
        }
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo().then(response => {
        console.log(response);
        if (typeof response === "string") {
          const res = JSON.parse(response);
          if (res.code === 401) {
            return reject(res.msg)
          }
        }
        const { data } = response

        commit("SET_USERINFO", data)
        // commit("SET_AVATAR", avatar)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  async logout({ commit, state }) {
    try {
      return new Promise((resolve, reject) => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      })
    } catch (error) {
      reject(error)
    }
    //   logout(state.token).then(() => {
    //     removeToken() // must remove  token  first
    //     resetRouter()
    //     commit('RESET_STATE')
    //     resolve()
    //   }).catch(error => {
    //     reject(error)
    //   })
    // })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  },

  // setToken({commit ,state},{payload}) {
  //   console.loh(payload);
  //   return new Promise(resolve =>{
  //     commit("SET_TOKEN",payload)
  //   })
  // }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

