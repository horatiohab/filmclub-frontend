import Cookies from 'js-cookie'
import { isJwtExpired } from 'jwt-check-expiration'
import axios from 'axios'

const state = () => ({
    token: null,
    loginModal: false,
    username: '',
    // user: {
    //     token: null,
    //     username: null
    // }
})

const mutations = {
    /** store logged in user in state */
    SET_TOKEN (state, token) {
        state.token = token
    },
    // /** store logged in user in state */
    // SET_TOKEN (state, user) {
    //     state.user = {
    //         token: user.token,
    //         username: user.username,
    //     }
    // },
    /** clear the logged out user from state */
    CLEAR_TOKEN (state) {
        state.token = null
    },
    /** sets the login modal to true to display */
    SHOW_LOGIN_MODAL (state) {
        state.loginModal = true
    },
    /** sets the login modal to false to hide */
    HIDE_LOGIN_MODAL (state) {
        state.loginModal = false
    }
}

const actions = {
    async authenticateUser(context, data) {
        /** login api request */

        console.log(data)
        console.log("context :", context)
        
        return await axios
            .post('https://filmclubenv.herokuapp.com/api/v1/auth/login', {            
                email: data.email,
                password: data.password
            })
            .then(response => {
                console.log(response)
                console.log("response :", response)
                let token = response.data.token

                let days = 30;
                let tokenExpiration = new Date(new Date().getTime() + (days * 24 * 60 * 60 * 1000)) // 30 days

                // context.commit("SET_TOKEN", token)
                // const user = {
                //     token: token,
                //     username: response.data.user.username
                // }
                context.commit("SET_TOKEN", token)

                Cookies.set('jwt', token, {
                    expires: tokenExpiration,
                    secure: true
                })

                console.log("context state", context)
            })
    },
    initAuth(context) {
        let token = Cookies.get('jwt')

        console.log(token)

        /** returns if there is no active token */
        if (!token) {
            return
        }

        context.commit("SET_TOKEN", token)
    },
    logout(context) {
        context.commit("CLEAR_TOKEN")
        Cookies.remove('jwt')
    }

}

const getters = {
    isAuthenticated(state) { // checks if there is a token that hasn't expired yet
        const token = state.token

        console.log("state", state)

        console.log("token :", token)

        if (token !== null) {
            try {
                if (!isJwtExpired(token)) {
                    return true
                }
            } catch (e) {
                // console.log("catch", e)
                return false
            }
        }

        return false
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}
