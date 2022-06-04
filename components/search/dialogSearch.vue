<template>
  <div
    v-show="showDialogSearch"
    class="absolute bg-white top-[50px] left-[-10px] z-50 rounded-xl"
    style="box-shadow: rgb(0 0 0 / 20%) 0 2px 8px"
  >
    <div v-if="getListAccount.length" v-show="showBoxSearch">
      <a
        v-for="(item, index) in getListAccount"
        :key="index"
        class="flex pl-4 py-2 border-b items-center w-[380px] cursor-pointer"
        @click="goToPage(item.id)"
      >
        <img
          :src="item.avatar"
          alt=""
          class="w-[60px] h-[60px] rounded-full object-cover"
        />
        <div class="text-left ml-4">
          <h2 class="font-bold text-lg">{{ item.username }}</h2>
          <p>{{ item.fullname }}</p>
          <p class="line-clamp-1">✨{{ item.description }}</p>
        </div>
      </a>
      <button
        class="px-4 py-2 block w-full hover:bg-gray-300 transition-all"
        style="border-radius: 0 0 12px 12px"
        @click="showData"
      >
        <span class="text-sm font-bold"
          >Xem tất cả kết quả dành cho "{{ getTitleSearch }}"</span
        >
      </button>
      <loading-sign-in v-show="showLoading"></loading-sign-in>
    </div>
  </div>
</template>

<script>
import loadingSignIn from '../loading/loadingSignIn.vue'

import AuthService from '@/services/authService.js'

export default {
  name: 'DialogSearch',
  components: { loadingSignIn },
  props: {
    showDialogSearch: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      showBoxSearch: true,
      showLoading: false,
    }
  },
  computed: {
    getTitleSearch() {
      return this.$store.state.searchTitle
    },
    getListAccount() {
      return this.$store.state.listAccount
    },
    boxSearch() {
      return this.showDialogSearch
    },
  },
  watch: {
    getTitleSearch() {
      this.showBoxSearch = true
    },
  },
  methods: {
    unShow() {
      window.console.log(123)
    },
    goToPage(id) {
      this.showBoxSearch = false
      this.$router.push(`/profilePage/${id}`)
    },
    async showData() {
      this.showLoading = true
      const res = await AuthService.search(this.getTitleSearch)
      if (res && res.status === 'success') {
        this.showBoxSearch = false
        this.$store.dispatch('actionSetTitleInfo', this.getTitleSearch)
        this.$store.dispatch('actionSetListAccount', res.result.users)
        this.$router.push('/SearchPage')
        this.$store.dispatch('actionSetListVideos', res.result.videos)
        this.showLoading = false
      } else {
        this.$router.push('/')
        window.console.log('ko thành công')
      }
    },
  },
}
</script>
