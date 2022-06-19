import Vue from 'vue'
import Vuex from 'vuex'
import da from "element-ui/src/locale/lang/da";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        isBlack: '',
        isColl: true,
        comName: '',
        subject: {}
    },
    mutations: {
        check(state, status) {
            let isShow = localStorage.getItem('theme')
            if (isShow) {
                state.isBlack = status;
            } else {
                state.isBlack = status;
            }
        },
        isCollSpan(state, status) {
            state.isColl = status;
        },
        changeComName(state, comName) {
            state.comName = comName;
        },
        addSubject(state, data) {
            state.subject = data;
        }
    },
    actions: {},
    modules: {}
})
