import Vue from "vue";
import App from "./App.vue";

import vuetify from "./plugins/vuetify";
import VueApexCharts from "vue-apexcharts";
import "ol/ol.css";
Vue.use(VueApexCharts);

Vue.component("apexchart", VueApexCharts);

import "./assets/global.css";

Vue.config.productionTip = false;

new Vue({
  vuetify,
  render: h => h(App)
}).$mount("#app");
