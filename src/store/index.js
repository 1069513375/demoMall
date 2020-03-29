import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cartList: []
  },
  mutations: {
    
  },
  getters:{
    cartList(state) {
        return state.cartList
      },
      cartCount(state, getters) {
        return getters.cartList.length
      }
  },
  actions: {
    addCart(context, payload) {
      return new Promise((resolve,reject)=>{
        let oldObj = context.state.cartList.find(item => item.iid === payload.iid)
        if (oldObj) {
          oldObj.count++;
          resolve('数量+1')
        } else {
          payload.count = 1;
          context.state.cartList.push(payload);
          resolve('添加成功')
        }
        console.log(context.state.cartList);
      })
    }
  },
  modules: {
  }
})
