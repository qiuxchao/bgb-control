import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 引入 axios 请求模块
import axios from 'axios'
// 添加vue原型
Vue.prototype.$axios = axios;

// 引入echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

// 时间戳转换
const timeCycle = time => {
  // 比如需要这样的格式 yyyy-MM-dd hh:mm:ss
  let date = new Date(time);
  let Y = date.getFullYear() + '-';
  let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
  let D = date.getDate() + ' ';
  let h = date.getHours() + ':';
  if(String(h).length == 2) {
	  h = 0 + String(h);
  }
  let m = date.getMinutes() + ':';
  if(String(m).length == 2) {
	  m = 0 + String(m);
  }
  let s = date.getSeconds();
  if(String(s).length == 1) {
	  s = 0 + String(s);
  } 
  return Y + M + D + h + m + s;
  // 输出结果：2014-04-23 18:55:49
}
Vue.prototype.$timeCycle = timeCycle;


// 设置 axios 的根接口地址
axios.defaults.baseURL = "http://39.100.79.188:8080/officetreasure";

Vue.use(ElementUI);


Vue.config.productionTip = false

new Vue({
  router,
  render: function (h) { return h(App) }
}).$mount('#app')
