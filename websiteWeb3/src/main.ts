// CSS import file 
import '@/assets/mian.less'
import 'vfonts/Lato.css'
import 'vfonts/FiraCode.css'


// Import uitls
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import naive from 'naive-ui'


const app = createApp(App)

app.use(router)
app.use(naive)
app.mount('#app')
