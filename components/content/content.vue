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
      v-for="(item, index) in listContent"
      :key="index"
      class="flex py-4 border-b"
      @mouseenter="videoPlay(index)"
      @mouseleave="videoPause(index)"
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
            <p class="mb-1 max-w-[542px] w-[100%]">
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
          <button
            v-if="tokenUser && tokenUser !== ''"
            v-show="dataUser.id !== item.user.id"
            class="text-[#fe2c55] border border-[#fe2c55] py-[2px] px-[24px] font-semibold rounded-md text-[16px] hover:bg-[#faeef1] duration-300 mb-12 button-follow"
            :style="
              !isFollow(index)
                ? { color: '#fe2c55', border: '1px solid #fe2c55' }
                : {
                    color: '#000',
                    border: '1px solid #ccc',
                    padding: '2px 14px',
                  }
            "
            @click="followUser(item.user.id)"
          >
            {{ !isFollow(index) ? 'Follow' : 'Đang Follow' }}
          </button>
          <button
            v-else
            class="text-[#fe2c55] border border-[#fe2c55] py-[2px] px-[24px] font-semibold rounded-md text-[16px] hover:bg-[#faeef1] duration-300 mb-12"
            @click="showAlertDialog"
          >
            Follow
          </button>
        </div>
        <div class="flex items-end">
          <nuxt-link :to="`/detailsVideoPage/${item.id}`" class="w-[70%] py-3">
            <video
              ref="videoRef"
              class="block w-full h-auto object-cover rounded-md videoplay"
              controls
              :src="item.url"
              :poster="item.background_video"
              muted
            ></video>
          </nuxt-link>
          <div class="ml-5 text-center">
            <div class="pb-2">
              <button
                class="w-[48px] h-[48px] rounded-full flex justify-center items-center bg-[#eee] cursor-pointer button-heart"
                @click="changeHeart(item.id)"
              >
                <span
                  class="mdi mdi-heart text-[27px]"
                  :style="
                    checkLikedVideo(index)
                      ? { color: '#fe2c55' }
                      : { color: '#000' }
                  "
                ></span>
              </button>
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
              <span class="mdi mdi-eye text-black text-[21px]"></span
            ></a>
            <p class="text-[12px] font-semibold text-[#000] my-1">
              {{ item.views }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from 'axios'
import loadingBox from '../loading/loadingBox.vue'

import AuthService from '@/services/authService.js'

export default {
  name: 'ContentContainer',
  components: { loadingBox },

  data() {
    return {
      listContent: [],
      changeColor: false,
      changeColorFollow: false,
      textFollow: 'Follow',
      isPlayed: false,
      listUserFollowings: [],
      dataUser: {},
      tokenUser: null,
      showLoading: false,
    }
  },
  computed: {
    getListFollowings() {
      return this.$store.state.listUserFollowings
    },
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
      await this.loadVideoNotFollow()
      this.showLoading = false
    } else {
      await this.loadVideo()
      this.showLoading = false
    }
  },
  methods: {
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
    async changeHeart(id) {
      if (this.tokenUser) {
        const res = await AuthService.like({
          video_id: id,
        })
        if (res && res.status === 'success') {
          this.loadVideoNotFollow()
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
    async loadVideo() {
      const res = await AuthService.video()
      if (res && res.status === 'success') {
        this.listContent = res.videos
        this.listContent.sort(() => Math.random() - 0.5)
        this.$store.dispatch('actionSetListVideos', res.videos)
        window.console.log('thành công')
      } else {
        window.console.log('ko thành công')
      }
    },
    async loadVideoNotFollow() {
      const res = await AuthService.videoNotFollow()
      if (res && res.status === 'success') {
        this.listContent = res.video
        this.$store.dispatch('actionSetListVideos', res.video)
        window.console.log('thành công')
      } else {
        window.console.log('ko thành công')
      }
    },
    async followUser(userId) {
      const res = await AuthService.follow({ user_id: userId })
      if (res && res.status === 'success') {
        const dataUser = JSON.parse(localStorage.getItem('user'))
        if (dataUser) {
          const res = await AuthService.detailsUser(dataUser.id)
          if (res && res.status === 'success') {
            this.$store.dispatch(
              'actionsetListUserFollowings',
              res.user.followings
            )
            window.console.log('thành công')
          } else {
            window.console.log('ko thành công')
          }
        }
        if (res && res.message === 'Follow successfully') {
          this.$notify({
            type: 'success',
            group: 'default',
            title: 'Success',
            text: 'Bạn vừa theo dõi người dùng này',
          })
        } else {
          this.$notify({
            type: 'success',
            group: 'default',
            title: 'Success',
            text: 'Bạn vừa hủy theo dõi người dùng này',
          })
        }
      } else {
        window.console.log('ko thành công')
      }
    },
    showAlertDialog() {
      this.$notify({
        type: 'warn',
        group: 'default',
        title: 'Warning',
        text: 'Vui lòng đăng nhập để thực hiện chức năng này',
      })
    },
    isFollow(index) {
      const isFollowing = !!this.getListFollowings.find(
        (ele) => ele.user_id_2 === this.listContent[index].user.id
      )
      return isFollowing
    },
    videoPlay(index) {
      const listVideo = this.$refs.videoRef
      listVideo[index].play()
    },
    videoPause(index) {
      const listVideo = this.$refs.videoRef
      listVideo[index].pause()
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
  box-shadow: 0 0 10px 30px #fe2c55;
}

.button-heart:active::after {
  box-shadow: 0 0 0 0 #fe2c55;
  position: absolute;
  border-radius: 50%;
  left: 0;
  top: 0;
  opacity: 1;
  transition: 0s;
}

.button-follow:active {
  transform: translateY(-25px);
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
