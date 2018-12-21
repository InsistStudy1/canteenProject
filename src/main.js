import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'

// style
import './assets/lib/MUI/css/mui.min.css'
import './assets/style/reset.css';
import './assets/style/border.css';
import './assets/style/iconfont.css'
import './assets/style/sz.less'

// script
import store from './vuex/store'
import {fetch, post, put, patch} from './util/http';
import api from './api'
import mui from './assets/lib/MUI/js/mui.min';
import './assets/script/filter'
import CookieUtil from './util/cookies'
import myReg from './assets/script/RegExp'

// 导入 Mint-UI
import MintUi from 'mint-ui';
import 'mint-ui/lib/style.css'

Vue.use(MintUi);

Vue.config.productionTip = false

Vue.use(Vuex);

Vue.prototype.$post = post;
Vue.prototype.$fetch = fetch;
Vue.prototype.$patch = patch;
Vue.prototype.$put = put;
Vue.prototype.api = api;
Vue.prototype.mui = mui;
window.$fetch = fetch;
window.$post = post;
window.api = api;
window.MintUi = MintUi;
window.CookieUtil = CookieUtil;
window.myReg = myReg;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: {App},
    template: '<App/>',
    store
})
