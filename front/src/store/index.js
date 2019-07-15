import Vue from 'vue'
import Vuex from 'vuex'
import proxy from './modules/proxy/proxy'
import menu from './modules/menu/menu'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    modules: {
        proxy,
        menu,
    },
    strict: debug,
    plugins: debug ? [createLogger()] : []
})