import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { setupLayouts } from 'virtual:generated-layouts'
import generatedRoutes from 'virtual:generated-pages'
import App from './App.vue'
import store from './store'
import './index.css'
import { plugin, defaultConfig } from '@formkit/vue'
// import auth from './middleware/auth.js'
import vueDebounce from 'vue-debounce'


const routes = setupLayouts(generatedRoutes)

const router = createRouter({
    history: createWebHistory(),
    routes,
})

const app = createApp(App)
    .use(router)
    .use(store)
    .use(plugin, defaultConfig)
    .use(vueDebounce, {
        listenTo: 'input'
    })

await router.isReady()
app.mount('#app')
