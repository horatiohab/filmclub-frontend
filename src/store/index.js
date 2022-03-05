import { createStore, createLogger } from 'vuex'

import user from './modules/user'
import auth from './modules/auth'
import film from './modules/film'

const debug = process.env.NODE_ENV !== 'production'

const store = createStore({
    modules: {
        user,
        auth,
        film,
    },
    strict: debug,
    plugins: debug ? [createLogger()] : [],
})

export default store
