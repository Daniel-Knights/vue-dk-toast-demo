import { createApp } from 'vue';
import App from './App.vue';
import DKToast from 'vue-dk-toast';

const app = createApp(App);

app.use(DKToast, {
    duration: 2000,
    styles: {
        borderRadius: '5px',
    },
});
app.mount('#app');
