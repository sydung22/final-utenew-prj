<template>
  <div
    class="w-[1100px] overflow-y-scroll fixed top-[65px] right-0 bottom-0 sidebar-right py-4"
  >
    <loading-box v-show="showLoading">
      <div
        class="loading-item"
        style="width: 70px; height: 70px; border-radius: 50%"
      ></div>
      <div class="loading-item" :style="`width: 60%;`"></div>
      <div class="loading-item" :style="`width: 70%;`"></div>
      <div class="loading-item" :style="`width: 80%;`"></div>
    </loading-box>
    <div
      v-for="(item, index) in listContentFollow"
      :key="index"
      class="flex py-4 border-b"
    >
      <nuxt-link :to="`/profilePage/${item.user.id}`" class="h-[57px]"
        ><img
          :src="item.user.avatar"
          alt=""
          class="w-[57px] h-[57px] object-cover rounded-full"
      /></nuxt-link>
      <div class="text-left w-[700px] ml-4">
        <div class="flex items-center justify-between">
          <nuxt-link :to="`/profilePage/${item.user.id}`" class="text-left">
            <a href="#" class="flex items-center mb-1 justify-between">
              <div class="flex items-center">
                <h3 class="font-bold mr-[4px] text-[18px]">
                  {{ item.user.username }}
                </h3>
                <svg
                  class="tiktok-shsbhf-StyledVerifyBadge e1aglo370 mr-[4px]"
                  width="14"
                  height="14"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="24" cy="24" r="24" fill="#20D5EC"></circle>
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M37.1213 15.8787C38.2929 17.0503 38.2929 18.9497 37.1213 20.1213L23.6213 33.6213C22.4497 34.7929 20.5503 34.7929 19.3787 33.6213L10.8787 25.1213C9.70711 23.9497 9.70711 22.0503 10.8787 20.8787C12.0503 19.7071 13.9497 19.7071 15.1213 20.8787L21.5 27.2574L32.8787 15.8787C34.0503 14.7071 35.9497 14.7071 37.1213 15.8787Z"
                    fill="white"
                  ></path>
                </svg>
                <h4 class="mr-[4px] text-[13px]">{{ item.user.fullname }}</h4>
                <!-- <span class="mr-[4px]">.</span> -->
                <!-- <p class="text-[13px]">12/3/2022</p> -->
              </div>
            </a>
            <p class="mb-1 max-w-[542px] w-[70%]">
              {{ item.description }}
            </p>
            <div class="flex flex-wrap">
              <nuxt-link
                v-for="(itemHashtag, indexHashtag) in item.hashtags"
                :key="indexHashtag"
                :to="`/hashtagPage/${itemHashtag.id}`"
                class="font-bold text-[16px] items-center my-1 hover:underline mr-4"
              >
                #{{ itemHashtag.name }}
              </nuxt-link>
            </div>
          </nuxt-link>
          <!-- <button
            class="text-[#fe2c55] border border-[#fe2c55] py-[2px] px-[24px] font-semibold rounded-md text-[16px] hover:bg-[#faeef1] duration-300"
            :style="
              changeColorFollow
                ? {
                    color: '#aaa',
                    border: '1px solid #aaa',
                    padding: '2px 14px',
                  }
                : { color: '#fe2c55', border: '1px solid #fe2c55' }
            "
            @click="changeFollow"
          >
            {{ textFollow }}
          </button> -->
        </div>
        <div class="flex items-end">
          <nuxt-link
            :to="`/detailsVideoPage/${item.id}`"
            class="w-[70%] h-[50%] py-3"
          >
            <video
              id="videoplay"
              ref="videoRef"
              class="block w-full h-auto object-cover rounded-md videoplay"
              controls
              :src="item.url"
              :poster="item.background_video"
            ></video>
          </nuxt-link>
          <div class="ml-5 text-center">
            <div class="pb-2">
              <a
                class="w-[48px] h-[48px] rounded-full flex justify-center items-center bg-[#eee] cursor-pointer"
                @click="changeHeart(item.id)"
              >
                <span
                  class="mdi mdi-heart text-[27px]"
                  :style="
                    checkLikedVideo(index)
                      ? { color: '#fe2c55' }
                      : { color: '#000' }
                  "
                ></span
              ></a>
              <p class="text-[12px] font-semibold text-[#000] my-1">
                {{ item.likes_count }}
              </p>
            </div>

            <div class="pb-2">
              <nuxt-link
                :to="`/detailsVideoPage/${item.id}`"
                class="w-[48px] h-[48px] rounded-full flex justify-center items-center bg-[#eee]"
              >
                <img
                  src="./assets/img/icon-comment.png"
                  alt=""
                  class="w-[21px]"
              /></nuxt-link>
              <p class="text-[12px] font-semibold text-[#000] my-1">
                {{ item.comments.length }}
              </p>
            </div>

            <a
              href="#"
              class="w-[48px] h-[48px] rounded-full flex justify-center items-center bg-[#eee]"
            >
              <img src="./assets/img/icon-share.png" alt="" class="w-[21px]"
            /></a>
            <p class="text-[12px] font-semibold text-[#000] my-1">751</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from 'axios'
import AuthService from '@/services/authService.js'

export default {
  name: 'ContentContainer',

  data() {
    return {
      listContent: [],
      changeColor: false,
      changeColorFollow: false,
      textFollow: 'Follow',
      isPlayed: false,
      listContentFollow: [],
      showLoading: false,
      tokenUser: '',
    }
  },
  computed: {
    getListVideo() {
      return this.$store.state.listVideos
    },
  },
  async mounted() {
    this.showLoading = true
    this.tokenUser = localStorage.getItem('token')
    this.$store.dispatch('actionsetIsUser', this.tokenUser)
    if (this.tokenUser && this.tokenUser !== '') {
      this.dataUser = JSON.parse(localStorage.getItem('user'))
      await this.loadVideoIsFollow()
      this.showLoading = false
    }
    // this.listContent.sort(() => Math.random() - 0.5)
    window.console.log(this.listContent)
  },
  methods: {
    async loadVideoIsFollow() {
      const res = await AuthService.videoIsFollow()
      if (res && res.status === 'success') {
        this.listContentFollow = res.video
        this.$store.dispatch('actionSetListVideos', res.video)
        window.console.log('thành công')
      } else {
        this.$router.push('/')
        window.console.log('ko thành công')
      }
    },
    async changeHeart(id) {
      if (this.tokenUser) {
        const res = await AuthService.like({
          video_id: id,
        })
        if (res && res.status === 'success') {
          this.loadVideoIsFollow()
        } else {
          window.console.log('ko thành công')
        }
      } else {
        this.$notify({
          type: 'warn',
          group: 'default',
          title: 'Warning',
          text: 'Vui lòng đăng nhập để thực hiện chức năng này',
        })
      }
    },
    checkLikedVideo(index) {
      if (this.tokenUser && this.dataUser) {
        const data = this.getListVideo.find(
          (el) => el.id === this.getListVideo[index].id
        )
        // window.console.log(data)
        const dataLikes = !!data.likes.find(
          (el) => el.user_id === this.dataUser.id
        )
        return dataLikes
      } else {
        return false
      }
    },
    videoPlay(id) {
      // const myvideo = document.getElementById('videoplay')
      const listVideo = this.$refs.videoRef
      listVideo[id - 1].play()
      window.console.log(id)
    },
    videoPause(id) {
      // const myvideo = document.getElementById('videoplay')
      const listVideo = this.$refs.videoRef
      listVideo[id - 1].pause()
    },
  },
}
</script>
<style scoped>
.sidebar-right::-webkit-scrollbar-track {
  background-color: #fff;
  border-radius: 20px;
}

.sidebar-right::-webkit-scrollbar {
  width: 8px;
  background-color: #fff;
}

.sidebar-right::-webkit-scrollbar-thumb {
  border-radius: 12px;
  background-color: #ddd;
}

@media (max-width: 1401px) {
  .sidebar-right {
    width: 890px;
  }
}
</style>
