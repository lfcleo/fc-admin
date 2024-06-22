import { createApp } from 'vue'
import App from './App.vue'
import directives from "./directives/index.ts";
import store from './store/index.ts'
import i18n from './locale/index.ts'
import router from './router/index.ts'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/display.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import * as FcIcons from '@/assets/icons/index.ts'

const app = createApp(App);
app.use(directives);
app.use(store);
app.use(i18n(store));
app.use(router);

//统一注册el-icon图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
//统一注册fc-icon图标
for (const [key, component] of Object.entries(FcIcons)) {
    app.component(`FcIcon${key}`, component)
}

app.mount('#app')