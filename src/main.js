import { createApp } from 'vue'
import App from './App.vue'
import DKToast from 'vue-dk-toast'

const app = createApp(App)

app.use(DKToast, { class: 'toast' })
app.mount('#app')
