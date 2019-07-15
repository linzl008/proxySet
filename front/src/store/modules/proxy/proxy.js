
const state = {
    lists: []
}

// getters
const getters = {
    getProxyList: (state, getters, rootState) => {
        console.log(state.lists);
        return state.lists;
    },
}

// actions
const actions = {
    setProxyList ({ commit, state }, lists) {
        commit('setProxyList', { lists: lists })
    },
}

// mutations
const mutations = {
    setProxyList (state, { lists}) {
        state.lists = lists
    },

}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}