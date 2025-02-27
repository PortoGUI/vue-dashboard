import { createApp } from 'vue'
import Toast, { POSITION } from 'vue-toastification'

import App from './App.vue'
import router from './router'

import 'animate.css'
import '../src/assets/css/fonts.css'
import '../src/assets/css/tailwind.css'
import 'vue-toastification/dist/index.css'
import 'material-icons/iconfont/material-icons.css'

const app = createApp(App)
app.use(router)
app.use(Toast, { position: POSITION.BOTTOM_RIGHT })
app.mount('#app')
