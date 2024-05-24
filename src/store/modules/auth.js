import authApi from '@/api/auth'
import { getItem, setItem } from '@/helpers/persistanceStorage'

const state = {
    isSubmitting: false,
    isLoading: false,
    currentUser: null,
    validationErrors: null,
    isLoggedIn: null
}

export const mutationsTypes = {
    registerStart: '[auth] registerStart',
    registerSuccess: '[auth] registerSuccess',
    registerFailure: '[auth]registerFailure',

    loginStart: '[auth] loginStart',
    loginSuccess: '[auth] loginSuccess',
    loginFailure: '[auth] loginFailure',

    getCurrentUserStart: '[auth] getCurrentUserStart',
    getCurrentUserSuccess: '[auth] getCurrentUserSuccess',
    getCurrentUserFailure: '[auth] getCurrentUserFailure'
}

export const actionTypes = {
    register: '[auth] register',
    login: '[auth] login',
    getCurrentUser: '[auth] getCurrentUser'
}

export const getterTypes = {
    currentUser: '[auth] currentUser',
    isLoggedIn: '[auth] isLoggedIn',
    isAnonymous: '[auth] isAnonymous'
}

const getters = {
    [getterTypes.currentUser]: state => {
        return state.currentUser
    },
    [getterTypes.isLoggedIn]: state => {
        return Boolean(state.isLoggedIn)
    },
    [getterTypes.isAnonymous]: state => {
        return state.isLoggedIn === false
    }
}

const mutations = {
    [mutationsTypes.registerStart](state) {
        state.isSubmitting = true
        state.validationErrors = false
    },
    [mutationsTypes.registerSuccess](state, payload) {
        state.isSubmitting = false
        state.currentUser = payload
        state.isLoggedIn = true
    },
    [mutationsTypes.registerFailure](state, payload) {
        state.isSubmitting = false
        state.validationErrors = payload
    },
    [mutationsTypes.loginStart](state) {
        state.isSubmitting = true
        state.validationErrors = false
    },
    [mutationsTypes.loginSuccess](state, payload) {
        state.isSubmitting = false
        state.currentUser = payload
        state.isLoggedIn = true
    },
    [mutationsTypes.loginFailure](state, payload) {
        state.isSubmitting = false
        state.validationErrors = payload
    },
    [mutationsTypes.getCurrentUserStart](state) {
        state.isLoading = true
    },
    [mutationsTypes.getCurrentUserSuccess](state, payload) {
        state.isLoading = false
        state.isLoggedIn = true
        state.currentUser = payload
    },
    [mutationsTypes.getCurrentUserFailure](state) {
        state.isLoading = false
        state.isLoggedIn = false
        state.currentUser = null
    },
}

const actions = {
    [actionTypes.register](context, credential) {
        return new Promise(resolve => {
            context.commit(mutationsTypes.registerStart)
            authApi.register(credential)
                .then(response => {
                    context.commit(mutationsTypes.registerSuccess, response.data.user)
                    setItem('accessToken', response.data.user.token)
                    resolve(response.data.user)
                })
                .catch(result => {
                    context.commit(mutationsTypes.registerFailure, result.response.data.errors)
                })
        })
    },
    [actionTypes.login](context, credential) {
        return new Promise(resolve => {
            context.commit(mutationsTypes.loginStart)
            authApi.login(credential)
                .then(response => {
                    context.commit(mutationsTypes.loginSuccess, response.data.user)
                    setItem('accessToken', response.data.user.token)
                    resolve(response.data.user)
                })
                .catch(result => {
                    context.commit(mutationsTypes.loginFailure, result.response.data.errors)
                })
        })
    },
    [actionTypes.getCurrentUser](context) {
        return new Promise(resolve => {
            context.commit(mutationsTypes.getCurrentUserStart)
            authApi.getCurrentUser()
                .then(response => {
                    context.commit(mutationsTypes.getCurrentUserSuccess, response.data.user)
                    setItem('accessToken', response.data.user.token)
                    resolve(response.data.user)
                })
                .catch(() => {
                    context.commit(mutationsTypes.getCurrentUserFailure)
                })
        })
    },
}

export default {
    state,
    mutations,
    actions,
    getters
}