import { defineStore } from 'pinia'

// useStore 可以是 useUser、useCart 之类的任何东西
// 第一个参数是应用程序中 store 的唯一 id
export const useStore = defineStore('main', {
  state: () => ({
    count: 0,
    isCollapse: false
  }),
  getters: {
    doubleCount(state) {
      return state.count * 2
    }
  },
  actions: {
    increment() {
      this.count++
    }
  }
})

export const userStore = defineStore('userStore', {
  state: () => {
    return {
      token: '',
      Token: ''
    }
  }
})