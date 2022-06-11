<template>
  <div>
    <div
      v-if="
        tokenUser &&
        tokenUser !== '' &&
        dataUser &&
        dataUser.id === Number($route.params.id)
      "
      class="grid grid-cols-4 gap-4"
    >
      <loading-box v-show="showLoadingData" class="mt-3">
        <div class="loading-item" :style="`width: 220px; height: 276px;`"></div>
      </loading-box>
      <nuxt-link
        v-for="(item, index) in listVideoShare"
        :key="index"
        :to="`/detailsVideoPage/${item.id}`"
        class="w-[220px] h-[300px] py-3 relative text-left list-video-share"
      >
        <video
          ref="videoRef"
          class="block w-full h-full object-cover rounded-md videoplay"
          :src="item.url"
          muted
        ></video>
        <div class="absolute left-3 flex items-center" style="bottom: 28px">
          <svg
            class="mr-1"
            width="18"
            height="18"
            viewBox="0 0 48 48"
            fill="#fff"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M16 10.554V37.4459L38.1463 24L16 10.554ZM12 8.77702C12 6.43812 14.5577 4.99881 16.5569 6.21266L41.6301 21.4356C43.5542 22.6038 43.5542 25.3962 41.6301 26.5644L16.5569 41.7873C14.5577 43.0012 12 41.5619 12 39.223V8.77702Z"
            ></path></svg
          ><strong
            data-e2e="video-views"
            class="text-[#fff] text-[17px] italic"
            >{{ item.views }}</strong
          >
        </div>
        <p class="text-left line-clamp-1 mt-1.5">{{ item.description }}</p>
        <div class="flex flex-wrap">
          <nuxt-link
            v-for="(itemHashtag, indexHashtag) in item.hashtags"
            :key="indexHashtag"
            :to="`/hashtagPage/${itemHashtag.id}`"
            class="font-bold text-[14px] items-center my-1 hover:underline mr-4"
          >
            #{{ itemHashtag.name }}
          </nuxt-link>
        </div>
        <nuxt-link
          :to="`/profilePage/${item.user.id}`"
          class="flex items-center font-serif mt-1.5 box-profile"
        >
          <img
            :src="item.user.avatar"
            alt=""
            class="w-[24px] h-[24px] rounded-full object-cover mr-2"
          />
          <a class="profile-username">{{ item.user.username }}</a>
        </nuxt-link>
      </nuxt-link>
    </div>
    <div v-else class="text-center pt-[80px]">
      <img
        src="./assets/img/lock.png"
        alt=""
        class="w-[120px] h-[120px] mx-auto"
      />
      <h2 class="text-[24px] font-bold mb-2">
        Video đã chia sẻ của người dùng này ở trạng thái riêng tư
      </h2>
      <p>Các video được thích bởi người dùng này hiện đang ẩn</p>
    </div>
  </div>
</template>

<script>
// import axios from 'axios'
import loadingBox from '../loading/loadingBox.vue'

import AuthService from '@/services/authService.js'

export default {
  name: 'VideoShareContainer',
  components: { loadingBox },

  data() {
    return {
      tokenUser: '',
      listVideoShare: [],
      dataUser: {},
      showLoadingData: false,
    }
  },
  async mounted() {
    const resUser = localStorage.getItem('token')
    this.tokenUser = resUser
    this.dataUser = JSON.parse(localStorage.getItem('user'))
    if (this.dataUser && this.tokenUser) {
      await this.loadVideoShared()
    }
  },
  methods: {
    async loadVideoShared() {
      if (this.tokenUser && this.dataUser) {
        this.showLoadingData = true
        const res = await AuthService.getVideoShareByUser(this.dataUser.id)
        if (res && res.status === 'success') {
          this.showLoadingData = false
          this.listVideoShare = res.videos
          window.console.log(res)
          window.console.log('thành công')
        } else {
          window.console.log('ko thành công')
        }
      }
    },
  },
}
</script>
<style scoped>
@media (max-width: 1401px) {
  .list-video-share {
    width: auto;
    height: auto;
  }
}
</style>
