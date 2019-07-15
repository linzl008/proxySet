import *  as TYPE from './mutation-types'
// initial state
// shape: [{ id, quantity }]
const state = {
    menu: [
        { label :"代理配置" ,icon:"el-icon-s-home" ,index:"/proxy", isShow:true},
        // { label :"设置" ,icon:"el-icon-s-tools" ,index:"/setting", isShow:true},
        // { label :"文件处理" ,icon:"el-icon-document" ,index:"/file", isShow:true},
    ],
}

// getters
const getters = {
    [TYPE.GET_MENU]: (state, getters, rootState) => {
        return state.menu.filter(item => item.isShow);
    },
    [TYPE.GET_ALL_MENU]: (state, getters, rootState) => {
        return state.menu;
    },
}

// actions
const actions = {
    [TYPE.SET_MENU]({ state, commit }, newMenu){
        commit(TYPE.SET_MENU, newMenu);
    },
    [TYPE.TOOGLE_MENU]({ state, commit }, index){
        commit(TYPE.TOOGLE_MENU, index);
    }
}

// mutations
const mutations = {
    [TYPE.SET_MENU](state,newMenu){
        state.menu = newMenu;
        localStorage.setItem('lzl_menu',JSON.stringify(state.menu));
    },
    [TYPE.TOOGLE_MENU](state,index){
        state.menu[index].isShow = !state.menu[index].isShow;
        localStorage.setItem('lzl_menu',JSON.stringify(state.menu));
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}