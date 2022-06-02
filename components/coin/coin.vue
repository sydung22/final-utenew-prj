<template>
  <div class="bg-[rgb(240, 240, 240)] py-9">
    <div
      class="bg-white w-3/5 mx-auto py-6 px-14 rounded"
      style="box-shadow: rgb(0 0 0 / 20%) 0 2px 8px"
    >
      <span class="text-2xl font-bold mb-5 block">Tình trạng xu</span>
      <div
        v-show="showLoadingBox"
        class="flex py-4 px-5 bg-[#eee] min-w-[235px] max-w-full w-max rounded-md items-center justify-center"
      >
        <loading-box class="w-full">
          <div class="flex items-center">
            <div
              class="loading-item"
              style="
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background-color: #aaa;
              "
            ></div>
            <div class="w-[70%] ml-3">
              <div
                class="loading-item"
                :style="`width: 80%;background-color: #aaa;`"
              ></div>
              <div
                class="loading-item"
                :style="`width: 80%; margin-top: 10px ;background-color: #aaa;`"
              ></div>
            </div>
          </div>
        </loading-box>
      </div>
      <div
        v-show="showBoxCoin"
        class="flex py-4 px-5 bg-[#eee] min-w-[235px] max-w-full w-max rounded-md items-center justify-center"
      >
        <img
          class="w-[47px] h-[47px] rounded-full"
          :src="detailsUser.avatar"
          alt=""
        />
        <div class="ml-3">
          <h2 class="font-bold italic">{{ detailsUser.fullname }}</h2>
          <p class="flex items-center text-sm mt-0.5 font-bold italic">
            <img
              class="w-4 h-4 mr-1"
              src="https://cdn-icons-png.flaticon.com/512/306/306079.png"
              alt=""
            />
            {{ detailsUser.coins }}
          </p>
        </div>
      </div>
      <div class="font-bold mt-6 text-lg">
        <span class="text-blue-600 font-semibold">Hướng dẫn:</span> Cách tích
        điểm xu cá nhân trong khi sử dụng UTENews
      </div>
      <div class="py-5 grid grid-cols-4 gap-4">
        <div
          v-for="i in 8"
          :key="i"
          class="border rounded inline-block px-10 py-2 text-center"
        >
          <div class="flex items-center text-lg justify-center">
            <span class="mdi mdi-arrow-up-thick text-lg text-red-600"></span>
            <img
              class="w-6 h-6 mr-1"
              src="https://cdn-icons-png.flaticon.com/512/306/306079.png"
              alt=""
            />
            50
          </div>
          <p class="font-semibold text-gray-600 italic mt-1.5">Đăng bài viết</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import loadingBox from '../loading/loadingBox.vue'

import AuthService from '@/services/authService.js'

export default {
  name: 'CoinContainer',
  components: { loadingBox },
  data() {
    return {
      dataUser: {},
      detailsUser: {},
      showLoadingBox: false,
      showBoxCoin: false,
      tokenUser: '',
    }
  },
  async mounted() {
    this.showLoadingBox = true
    this.tokenUser = localStorage.getItem('token')
    this.$store.dispatch('actionsetIsUser', this.tokenUser)
    this.dataUser = JSON.parse(localStorage.getItem('user'))
    if (this.dataUser) {
      await this.loadDetailUser()
      this.showLoadingBox = false
      this.showBoxCoin = true
    }
  },
  methods: {
    async loadDetailUser() {
      const res = await AuthService.detailsUser(this.dataUser.id)
      if (res && res.status === 'success') {
        this.detailsUser = res.user
      } else {
        window.console.log('ko thành công')
      }
    },
  },
}
</script>
