import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

// 引入 ElementPlus
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
// 中文化的支持
import zhCn from 'element-plus/es/locale/lang/zh-cn';

// 引入样式
import './assets/css/index.scss';

// 引入 Font Awesome 图标库
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(ElementPlus, {
  locale: zhCn,
});

// 将所有图标添加到库中
library.add(fas);
// 注册一个 font-awesome-icon 组件，用于在模板中使用图标
app.component('font-awesome-icon', FontAwesomeIcon);

app.mount('#app');
