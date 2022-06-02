export const state = () => ({
  counter: 0,
  searchTitle: '',
  spinShow: false,
  listAccount: [],
  listVideos: [],
  listUserFollowings: [],
  listComments: [],
  listReplyComments: [],
  countFollowings: 0,
  countLikeVideos: 0,
  listCountCmtLikes: [],
  isUser: null,
  dataUser: null,
  listUserLiked: [],
  listUserLikedCmt: [],
})

export const mutations = {
  increment(state) {
    state.counter++
  },
  setListUserLiked(state, dataList) {
    state.listUserLiked = dataList
  },
  setListUserLikedCmt(state, dataList) {
    state.listUserLikedCmt = dataList
  },
  setDataUser(state, dataUser) {
    state.dataUser = dataUser
  },
  setIsUser(state, isUser) {
    state.isUser = isUser
  },
  setSpinShow(state, show) {
    state.spinShow = show
  },
  setTitleInfo(state, title) {
    state.searchTitle = title
  },
  setListAccount(state, listAccount) {
    state.listAccount = listAccount
  },
  setListVideos(state, listVideos) {
    state.listVideos = listVideos
  },
  setListUserFollowings(state, listUserFollowings) {
    state.listUserFollowings = listUserFollowings
  },
  setListComments(state, listComments) {
    state.listComments = listComments
  },
  setCountFollowings(state, countFollowings) {
    state.countFollowings = countFollowings
  },
  setCountLikeVideos(state, countLikeVideos) {
    state.countLikeVideos = countLikeVideos
  },
  setListReplyComments(state, listReplyComments) {
    state.listReplyComments = listReplyComments
  },
  setListCountCmtLikes(state, listCountCmtLikes) {
    state.listCountCmtLikes = listCountCmtLikes
  },
}
export const actions = {
  actionSetTitleInfo({ commit }, title) {
    commit('setTitleInfo', title)
  },
  actionsetListUserLiked({ commit }, dataList) {
    commit('setListUserLiked', dataList)
  },
  actionsetListUserLikedCmt({ commit }, dataList) {
    commit('setListUserLikedCmt', dataList)
  },
  actionsetDataUser({ commit }, dataUser) {
    commit('setDataUser', dataUser)
  },
  actionSetListAccount({ commit }, listAccount) {
    commit('setListAccount', listAccount)
  },
  actionSetListVideos({ commit }, listVideos) {
    commit('setListVideos', listVideos)
  },
  actionsetListUserFollowings({ commit }, listUserFollowings) {
    commit('setListUserFollowings', listUserFollowings)
  },
  actionsetListComments({ commit }, listComments) {
    commit('setListComments', listComments)
  },
  actionsetCountFollowings({ commit }, countFollowings) {
    commit('setCountFollowings', countFollowings)
  },
  actionsetCountLikeVideos({ commit }, countLikeVideos) {
    commit('setCountLikeVideos', countLikeVideos)
  },
  actionsetListReplyComments({ commit }, replyComments) {
    commit('setListReplyComments', replyComments)
  },
  actionsetListCountCmtLikes({ commit }, listCountCmtLikes) {
    commit('setListCountCmtLikes', listCountCmtLikes)
  },
  actionsetIsUser({ commit }, isUser) {
    commit('setIsUser', isUser)
  },
}
export const getters = {
  isAuthenticated(state) {
    return state.isUser
  },
}
