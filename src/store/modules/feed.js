import feedApi from "@/api/feed"

const state = {
    data: null,
    isLoading: false,
    errors: null
}

export const mutationsTypes = {
    getFeedStart: '[feed] getFeedStart',
    getFeedSuccess: '[feed] getFeedSuccess',
    getFeedFailure: '[feed]getFeedFailure',
}

export const actionTypes = {
    getFeed: '[feed] getFeed'
}

const mutations = {
    [mutationsTypes.getFeedStart](state) {
        state.isLoading = true
        state.data = null
    },
    [mutationsTypes.getFeedSuccess](state, payload) {
        state.isLoading = false
        state.data = payload
    },
    [mutationsTypes.getFeedFailure](state) {
        state.isLoading = false
    }
}
const actions = {
    [actionTypes.getFeed](context, { apiUrl }) {
        return new Promise(resolve => {
            context.commit(mutationsTypes.getFeedStart)
            feedApi.getFeed(apiUrl)
                .then(response => {
                    context.commit(mutationsTypes.getFeedSuccess, response.data)
                    resolve(response.data)
                })
                .catch(() => {
                    context.commit(mutationsTypes.getFeedFailure)
                })
        })
    }
}
export default {
    state,
    mutations,
    actions,
}