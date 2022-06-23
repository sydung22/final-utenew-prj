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
    <Dialog
      :show="showDialog"
      title="Thông báo"
      description="Bạn có muốn xóa bài viết này không ??"
      :confirm="deleteVideoShare"
      :cancel="unShowDialog"
    ></Dialog>
    <dialog-update-share
      :show-modal="showModalUpdate"
      :un-show-modal="unShowModalUpdate"
      :data-share-obj="detailsVideoUpdate"
      :data-user-obj="detailsItemUserUpdate"
      :data-user-share-obj="detailsUserUpdate"
    ></dialog-update-share>
    <dialog-share
      :show-modal="showModalShare"
      :un-show-modal="unShowModalShare"
      :data-share-obj="detailsVideoShare"
      :data-user-obj="detailsItemUser"
      :data-user-share-obj="detailsUserShare"
    ></dialog-share>
    <loading-sign-in v-show="showLoadingDelete"></loading-sign-in>
    <div
      v-for="(item, index) in listContent"
      :key="index"
      class="flex py-4 border-b"
      @mouseenter="videoPlay(index)"
      @mouseleave="videoPause(index)"
    >
      <nuxt-link :to="`/profilePage/${item.share_user.id}`" class="h-[57px]"
        ><img
          :src="item.share_user.avatar"
          alt=""
          class="w-[57px] h-[57px] object-cover rounded-full"
      /></nuxt-link>
      <div class="text-left w-[700px] ml-4">
        <div class="flex items-start justify-between">
          <nuxt-link
            :to="`/profilePage/${item.share_user.id}`"
            class="text-left"
          >
            <a href="#" class="flex items-center mb-1 justify-between">
              <div class="flex items-center">
                <h3 class="font-bold mr-[4px] text-[18px]">
                  {{ item.share_user.username }}
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
                <h4 class="mr-[4px] text-[13px]">
                  {{ item.share_user.fullname }}
                </h4>
                <!-- <span class="mr-[4px]">.</span> -->
                <!-- <p class="text-[13px]">12/3/2022</p> -->
              </div>
            </a>
            <p
              class="mb-3 max-w-[542px] w-[100%]"
              v-if="item.share_description"
            >
              {{ item.share_description }}
            </p>
            <p class="mb-3 max-w-[542px] w-[100%]" v-else>Không có nội dung</p>
          </nuxt-link>

          <button
            v-if="tokenUser && tokenUser !== ''"
            v-show="dataUser.id !== item.share_user.id"
            class="text-[#2563eb] border border-[#2563eb] py-[2px] px-[24px] font-semibold rounded-md text-[16px] hover:bg-[#d6d6f0] duration-300 button-follow"
            :style="
              !isFollowShare(index)
                ? { color: '#2563eb', border: '1px solid #2563eb' }
                : {
                    color: '#000',
                    border: '1px solid #ccc',
                    padding: '2px 14px',
                  }
            "
            @click="followUser(item.share_user.id)"
          >
            {{ !isFollowShare(index) ? 'Follow' : 'Đang Follow' }}
          </button>
          <button
            v-else
            class="text-[#2563eb] border border-[#2563eb] py-[2px] px-[24px] font-semibold rounded-md text-[16px] hover:bg-[#d6d6f0] duration-300 mb-12 button-follow"
            @click="showAlertDialog"
          >
            Follow
          </button>
        </div>
        <div class="flex items-end">
          <div class="border rounded-xl w-[75%]">
            <nuxt-link
              :to="`/detailsVideoPage/${item.share_video_id}`"
              class="w-[75%] py-3"
            >
              <div
                class="h-[450px] w-full relative z-10 bg-black overflow-hidden"
                style="border-radius: 12px 12px 0 0"
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
                  :poster="item.cover"
                  muted
                ></video>
              </div>
            </nuxt-link>

            <div class="py-5 px-4">
              <div class="flex items-center justify-between">
                <div class="flex">
                  <img
                    :src="item.user.avatar"
                    alt=""
                    class="w-[50px] h-[50px] rounded-full object-cover"
                  />
                  <div class="text-left ml-3">
                    <h2 class="font-bold text-lg">
                      {{ item.user.username }}
                    </h2>
                    <div class="flex">
                      <p>{{ item.user.fullname }}</p>
                    </div>
                  </div>
                </div>
                <button
                  v-if="tokenUser && tokenUser !== ''"
                  v-show="dataUser.id !== item.user.id"
                  class="text-[#2563eb] border border-[#2563eb] py-[2px] px-[24px] font-semibold rounded-md text-[16px] hover:bg-[#d6d6f0] duration-300 button-follow"
                  :style="
                    !isFollow(index)
                      ? { color: '#2563eb', border: '1px solid #2563eb' }
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
                  class="text-[#2563eb] border border-[#2563eb] py-[2px] px-[24px] font-semibold rounded-md text-[16px] hover:bg-[#d6d6f0] duration-300"
                  @click="showAlertDialog"
                >
                  Follow
                </button>
              </div>
              <p
                class="mt-3 mb-1 max-w-[542px] w-[100%]"
                v-if="item.description"
              >
                {{ item.description }}
              </p>
              <p class="mt-3 mb-1 max-w-[542px] w-[100%]" v-else>
                Không có nội dung
              </p>

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
            </div>
          </div>
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
                      ? { color: '#2563eb' }
                      : { color: '#000' }
                  "
                ></span>
              </button>
              <p class="text-[12px] font-semibold text-[#000] my-1">
                {{ item.likes_count }}
              </p>
            </div>

            <div
              v-if="dataUser && dataUser.id === item.share_user_id"
              class="pb-2"
            >
              <button
                class="w-[48px] h-[48px] rounded-full flex justify-center items-center bg-[#eee] button-heart"
                @click="getDataUpdate(item.id)"
              >
                <span class="mdi mdi-content-save-edit text-[21px]"></span>
              </button>
              <p class="text-[12px] font-semibold text-[#000] my-1">Sửa bài</p>
            </div>

            <div class="pb-2">
              <button
                class="w-[48px] h-[48px] rounded-full flex justify-center items-center bg-[#eee] button-heart"
                @click="getDataShare(item.share_video_id)"
              >
                <span class="mdi mdi-share text-black text-[21px]"></span>
              </button>
              <p class="text-[12px] font-semibold text-[#000] my-1 text-center">
                Chia sẻ
              </p>
            </div>

            <div
              v-if="dataUser && dataUser.id === item.share_user_id"
              class="pb-2"
            >
              <button
                class="w-[48px] h-[48px] rounded-full flex justify-center items-center bg-[#eee] button-heart"
                @click="handleRow(item)"
              >
                <span class="mdi mdi-delete text-black text-[21px]"></span>
              </button>
              <p class="text-[12px] font-semibold text-[#000] my-1">Xóa bài</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from 'axios'
import DialogShare from '../content/dialogShare.vue'

import loadingBox from '../loading/loadingBox.vue'
import LoadingSignIn from '../loading/loadingSignIn.vue'
import DialogUpdateShare from './dialogUpdateShare.vue'

import AuthService from '@/services/authService.js'

export default {
  name: 'ShareContainer',
  components: { loadingBox, LoadingSignIn, DialogUpdateShare, DialogShare },

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
      showDialog: false,
      idDelete: null,
      showLoadingDelete: false,
      showModalUpdate: false,
      detailsUserUpdate: {},
      detailsItemUserUpdate: {},
      detailsVideoUpdate: {},
      showModalShare: false,
      detailsVideoShare: {},
      detailsItemUser: {},
      detailsUserShare: {},
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
    this.dataUser = JSON.parse(localStorage.getItem('user'))

    if (this.tokenUser && this.tokenUser !== '') {
      this.$store.dispatch('actionsetIsUser', this.tokenUser)
    }
    await this.loadVideo()
    this.showLoading = false
    // }
  },
  methods: {
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
          title: 'Thông báo',
          text: 'Vui lòng đăng nhập để thực hiện chức năng này',
        })
      }
    },
    async getDataUpdate(id) {
      const res = await AuthService.loadVideoById(id)
      if (res && res.status === 'success') {
        this.detailsVideoUpdate = res.video
        this.detailsItemUserUpdate = res.video.user
        this.detailsUserUpdate = res.video.share_user
        this.$store.dispatch('actionsetListUserLiked', res.video.likes)
        this.showModalUpdate = true

        window.console.log('thành công')
      } else {
        window.console.log('ko thành công')
      }
    },
    unShowModalShare() {
      this.showModalShare = false
    },
    unShowModalUpdate() {
      this.showModalUpdate = false
    },
    unShowDialog() {
      this.showDialog = false
    },
    handleRow(item) {
      this.showDialog = true
      this.idDelete = item.id
    },
    async deleteVideoShare() {
      this.showLoadingDelete = true
      const res = await AuthService.deleteVideo(this.idDelete)
      if (res && res.status === 'success') {
        this.showLoadingDelete = false
        this.$notify({
          type: 'success',
          group: 'default',
          title: 'Thông báo',
          text: 'Xóa bài viết thành công!!!',
        })
        setTimeout(() => {
          window.location.reload()
        }, 1000)
      } else {
        window.console.log('ko thành công')
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
    async changeHeart(id) {
      if (this.tokenUser) {
        const res = await AuthService.like({
          video_id: id,
        })
        if (res && res.status === 'success') {
          this.loadVideo()
          if (res.message === 'Create like successfully') {
            this.$notify({
              type: 'success',
              group: 'default',
              title: 'Thông báo',
              text: 'Bạn vừa thích bài viết này',
            })
            setTimeout(() => {
              this.$notify({
                type: 'success',
                group: 'default',
                title: 'Thưởng',
                text: 'Bạn được thưởng 1 coin vào tài khoản',
              })
            }, 700)
          } else {
            this.$notify({
              type: 'success',
              group: 'default',
              title: 'Thông báo',
              text: 'Bạn vừa hủy thích bài viết này',
            })
          }
        } else {
          window.console.log('ko thành công')
        }
      } else {
        this.$notify({
          type: 'warn',
          group: 'default',
          title: 'Thông báo',
          text: 'Vui lòng đăng nhập để thực hiện chức năng này',
        })
      }
    },
    async loadVideo() {
      const res = await AuthService.getVideoShareByShare()
      if (res && res.status === 'success') {
        this.listContent = res.videos
        // this.listContent.sort(() => Math.random() - 0.5)
        this.$store.dispatch('actionSetListVideos', this.listContent)
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
            title: 'Thông báo',
            text: 'Bạn vừa theo dõi người dùng này',
          })
          setTimeout(() => {
            this.$notify({
              type: 'success',
              group: 'default',
              title: 'Thưởng',
              text: 'Bạn được thưởng 1 coin vào tài khoản',
            })
          }, 700)
        } else {
          this.$notify({
            type: 'success',
            group: 'default',
            title: 'Thông báo',
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
        title: 'Thông báo',
        text: 'Vui lòng đăng nhập để thực hiện chức năng này',
      })
    },
    isFollowShare(index) {
      const isFollowing = !!this.getListFollowings.find(
        (ele) => ele.user_id_2 === this.listContent[index].share_user_id
      )
      return isFollowing
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
