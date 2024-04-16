import authApi from '@/api/auth'
import { getItem, setItem } from '@/helpers/persistanceStorage'

const state = {
    isSubmitting: false,
    currentUser: null,
    validationErrors: null,
    isLoggedIn: null
}

const mutations = {
    registerStart(state) {
        state.isSubmitting = true
        state.validationErrors = false
    },
    registerSuccess(state, payload) {
        state.isSubmitting = false
        state.currentUser = payload
        state.isLoggedIn = true
    },
    registerFailure(state, payload) {
        state.isSubmitting = false
        state.validationErrors = payload
    }
}

const actions = {
    register(context, credential) {
        return new Promise(resolve => {
            context.commit('registerStart')
            authApi.register(credential)
                .then(response => {
                    context.commit('registerSuccess', response.data.user)
                    setItem('accessToken', response.data.user.token)
                    resolve(response.data.user)
                })
                .catch(result => {
                    context.commit('registerFailure', result.response.data.errors)
                })
        })
    }
}

export default {
    state,
    mutations,
    actions
}