import Vue from "vue";
import App from "./App.vue";

// 引入vant组件
import "vant/lib/index.css";
import Vant from "vant";
// 使用vant组件
Vue.use(Vant);

// 引入路由
import router from "@/router/index";

// 全局注册组件
Vue.component("Head", () => import("@/components/head"));
Vue.component("Songs", () => import("@/components/songs"));

// 引入阿里巴巴矢量图图标
import "@/assets/iconfont/iconfont.css";

// 引入全局api
import * as api from "@/api/inedx";

Vue.config.productionTip = false;

// 实例化vue
new Vue({
    render: (h) => h(App),
    // 路由
    router,
    beforeCreate() {
        // 全局事件总线
        Vue.prototype.$bus = this;
        // 全局api
        Vue.prototype.$api = api;
    },
}).$mount("#app");
