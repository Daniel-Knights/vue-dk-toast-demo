import { createApp } from 'vue'
import App from './App.vue'
import DKToast from 'vue-dk-toast'

const app = createApp(App)

app.use(DKToast, {
    duration: 2000,
    styles: {
        borderRadius: '5px',
        color: '#000',
        fontWeight: 'bold',
        boxShadow: '0 1px 10px -5px #000',
        textShadow: 'none'
    }
})
app.mount('#app')
