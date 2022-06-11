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
    <dialog-share
      :show-modal="showModalShare"
      :un-show-modal="unShowModalShare"
      :data-share-obj="detailsVideoShare"
      :data-user-obj="detailsItemUser"
      :data-user-share-obj="detailsUserShare"
    ></dialog-share>
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
            class="text-[#2563eb] border border-[#2563eb] py-[2px] px-[24px] font-semibold rounded-md text-[16px] hover:bg-[#d6d6f0] duration-300"
            :style="
              changeColorFollow
                ? {
                    color: '#aaa',
                    border: '1px solid #aaa',
                    padding: '2px 14px',
                  }
                : { color: '#2563eb', border: '1px solid #2563eb' }
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
            <div
              class="h-[500px] w-full relative z-10 bg-black overflow-hidden rounded-xl"
            >
              <div
                class="back-blur"
                :style="`background-image: url('${item.cover}')`"
              ></div>
              <video
                ref="videoRef"
                class="block w-full h-full object-contain rounded-md videoplay relative z-10"
                controls
                :src="item.url"
                :poster="item.background_video"
                muted
              ></video>
            </div>
          </nuxt-link>
          <div class="ml-5 text-center">
            <div class="pb-2">
              <a
                class="w-[48px] h-[48px] rounded-full flex justify-center items-center bg-[#eee] cursor-pointer button-heart"
                @click="changeHeart(item.id)"
              >
                <span
                  class="mdi mdi-heart text-[27px]"
                  :style="
                    checkLikedVideo(index)
                      ? { color: '#2563eb' }
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
                class="w-[48px] h-[48px] rounded-full flex justify-center items-center bg-[#eee] button-heart"
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
            <div class="pb-2">
              <a
                href="#"
                class="w-[48px] h-[48px] rounded-full flex justify-center items-center bg-[#eee]"
              >
                <span class="mdi mdi-eye text-black text-[21px]"></span
              ></a>
              <p class="text-[12px] font-semibold text-[#000] my-1">
                {{ item.views }}
              </p>
            </div>

            <a
              class="w-[48px] h-[48px] rounded-full flex justify-center items-center bg-[#eee] button-heart"
              @click="getDataShare(item.id)"
            >
              <span class="mdi mdi-share text-[21px]"></span>
            </a>
            <p class="text-[12px] font-semibold text-[#000] my-1">Chia sẻ</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from 'axios'
import dialogShare from '../content/dialogShare.vue'

import AuthService from '@/services/authService.js'

export default {
  name: 'ContentContainer',
  components: { dialogShare },

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
      showModalShare: false,
      detailsVideoShare: {},
      detailsItemUser: {},
      detailsUserShare: {},
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
    } else {
      this.$notify({
        type: 'warn',
        group: 'default',
        title: 'Warning',
        text: 'Vui lòng đăng nhập để vào trang này',
      })
      setTimeout(() => this.$router.push('/'), 1000)
    }
    // this.listContent.sort(() => Math.random() - 0.5)
    window.console.log(this.listContent)
  },
  methods: {
    unShowModalShare() {
      this.showModalShare = false
    },
    async getDataShare(id) {
      if (this.tokenUser) {
        const res = await AuthService.loadVideoById(id)
        if (res && res.status === 'success') {
          this.detailsVideoShare = res.video
          this.detailsItemUser = res.video.user
          this.detailsUserShare = this.dataUser
          this.$store.dispatch('actionsetListUserLiked', res.video.likes)
          this.showModalShare = true

          window.console.log('thành công')
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
    async loadVideoIsFollow() {
      const res = await AuthService.videoIsFollow()
      if (res && res.status === 'success') {
        this.listContentFollow = res.video.filter((el) => el.type === 'PUBLIC')
        this.$store.dispatch('actionSetListVideos', this.listContentFollow)
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
.back-blur {
  position: absolute;
  width: 10%;
  height: 10%;
  filter: blur(0.5px);
  left: 50%;
  top: 50%;
  transform: scale(11);
  opacity: 0.3;
  background: center center / cover no-repeat;
}

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

.button-heart {
  transition-duration: 0.3s;
  position: relative;
}

.button-heart::after {
  content: '';
  display: block;
  position: absolute;
  border-radius: 50%;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: all 0.4s;
  box-shadow: 0 0 10px 30px #2563eb;
}

.button-heart:active::after {
  box-shadow: 0 0 0 0 #2563eb;
  position: absolute;
  border-radius: 50%;
  left: 0;
  top: 0;
  opacity: 1;
  transition: 0s;
}

.button-heart:active {
  transform: translateY(5px);
}
@media (max-width: 1401px) {
  .sidebar-right {
    width: 890px;
  }
}
</style>
