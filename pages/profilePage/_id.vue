<template>
  <div
    class="w-[1150px] overflow-y-scroll fixed top-[65px] right-0 bottom-0 sidebar-right py-6 pr-[230px] profile-container"
  >
    <loading-box v-show="showLoadingBox">
      <div class="flex items-center">
        <div
          class="loading-item"
          style="width: 100px; height: 100px; border-radius: 50%"
        ></div>
        <div class="w-[60%] ml-4">
          <div class="loading-item" :style="`width: 80%;`"></div>
          <div
            class="loading-item"
            :style="`width: 80%; margin-top: 10px`"
          ></div>
        </div>
      </div>
      <div class="loading-item" :style="`width: 80%; margin-top: 50px`"></div>
      <div class="loading-item" :style="`width: 80%;`"></div>
    </loading-box>
    <div v-show="showDetailProfile">
      <div class="flex">
        <img
          :src="detailsUser.avatar"
          alt=""
          class="w-[116px] h-[116px] rounded-full object-cover"
        />
        <div class="ml-[20px] text-left">
          <h2 class="text-[32px] font-bold leading-[38px]">
            {{ detailsUser.username }}
          </h2>
          <h1 class="text-[18px] italic mb-4 font-semibold">
            {{ detailsUser.fullname }}
          </h1>
          <div v-if="tokenUser && dataUser && detailsUser.id !== dataUser.id">
            <button
              v-if="isFollow() === false"
              class="bg-[#fe2c55] text-white px-4 py-2 font-bold rounded-md w-[190px] hover:bg-[#c91438]"
              @click="followUser(detailsUser.id)"
            >
              Follow
            </button>
            <div v-else class="flex items-center">
              <nuxt-link
                to="/ChatPage"
                class="text-[#fe2c55] border border-[#fe2c55] py-[6px] px-[45px] font-bold rounded-md text-[18px] hover:bg-[#faeef1] duration-300"
                >Đang theo dõi</nuxt-link
              >
              <div
                class="border ml-2 w-[40px] h-[40px] flex items-center justify-center rounded-md border-[#ccc] cursor-pointer hover:bg-gray-400"
                @click="followUser(detailsUser.id)"
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 48 48"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M13.0001 13C13.0001 9.68629 15.6864 7 19.0001 7C22.3139 7 25.0001 9.68629 25.0001 13C25.0001 16.3137 22.3139 19 19.0001 19C15.6864 19 13.0001 16.3137 13.0001 13ZM19.0001 3C13.4773 3 9.00015 7.47715 9.00015 13C9.00015 18.5228 13.4773 23 19.0001 23C24.523 23 29.0001 18.5228 29.0001 13C29.0001 7.47715 24.523 3 19.0001 3ZM5.19435 40.9681C6.70152 35.5144 10.0886 32.2352 13.9162 30.738C17.7125 29.2531 22.0358 29.4832 25.6064 31.2486C26.1015 31.4934 26.7131 31.338 26.9931 30.8619L28.0072 29.1381C28.2872 28.662 28.1294 28.0465 27.6384 27.7937C23.0156 25.4139 17.4034 25.0789 12.4591 27.0129C7.37426 29.0018 3.09339 33.3505 1.2883 40.0887C1.14539 40.6222 1.48573 41.1592 2.02454 41.2805L3.97575 41.7195C4.51457 41.8408 5.04724 41.5004 5.19435 40.9681ZM44.7074 30.1212C45.0979 29.7307 45.0979 29.0975 44.7074 28.707L43.2932 27.2928C42.9026 26.9023 42.2695 26.9023 41.8789 27.2928L30.0003 39.1715L25.1216 34.2928C24.7311 33.9023 24.0979 33.9023 23.7074 34.2928L22.2932 35.707C21.9026 36.0975 21.9026 36.7307 22.2932 37.1212L28.586 43.4141C29.3671 44.1952 30.6334 44.1952 31.4145 43.4141L44.7074 30.1212Z"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
          <div
            v-else-if="tokenUser && dataUser && detailsUser.id === dataUser.id"
          >
            <button
              class="px-4 py-0.5 font-semibold italic text-gray-600 rounded border-2 border-gray-700 flex items-center justify-center"
              @click="loadModalEdit"
            >
              <span
                class="mdi mdi-square-edit-outline text-[20px] inline-block mr-1"
              ></span>
              Sửa hồ sơ
            </button>
            <modal-edit
              :show-modal="showModalEdit"
              :un-show-modal="unLoadModalEdit"
              :data-update-obj="dataUpdate"
            ></modal-edit>
          </div>
          <div v-else>
            <button
              class="bg-[#fe2c55] text-white px-4 py-2 font-bold rounded-md w-[190px]"
              @click="showAlert"
            >
              Follow
            </button>
          </div>
        </div>
      </div>
      <div class="text-left flex py-4">
        <p class="mr-[35px] italic">
          <span class="mr-1.5 font-bold text-[18px] not-italic">{{
            detailsUser.followings_count
          }}</span
          >Đang Follow
        </p>
        <p class="mr-[35px] italic">
          <span class="mr-1.5 font-bold text-[18px] not-italic">{{
            detailsUser.followers_count
          }}</span
          >Follower
        </p>
        <p class="mr-[35px] italic">
          <span class="mr-1.5 font-bold text-[18px] not-italic">{{
            sumListLike
          }}</span
          >Lượt Thích
        </p>
      </div>
      <div class="text-left">
        <p class="text-[17px]">
          {{ detailsUser.description }}
        </p>
      </div>
      <div class="pt-3">
        <a
          target="_blank"
          rel="noindex nofollow noreferrer noopener"
          :href="detailsUser.facebook"
          data-e2e="user-link"
          class="text-left flex items-center"
          ><svg
            style="flex-shrink: 0"
            width="18"
            height="18"
            viewBox="0 0 48 48"
            fill=""
            xmlns="http://www.w3.org/2000/svg"
            class="mr-1"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M23.5857 9.58571C27.6805 5.49096 34.3194 5.49096 38.4141 9.58571C42.5089 13.6805 42.5089 20.3194 38.4141 24.4141L37.1212 25.707C36.7307 26.0975 36.0975 26.0975 35.707 25.707L34.2928 24.2928C33.9023 23.9023 33.9023 23.2691 34.2928 22.8786L35.5857 21.5857C38.1184 19.0531 38.1184 14.9468 35.5857 12.4141C33.053 9.88149 28.9468 9.88148 26.4141 12.4141L22.4141 16.4141C20.121 18.7072 19.9041 22.2903 21.7634 24.8275C22.0899 25.2729 22.0976 25.9023 21.707 26.2928L20.2928 27.707C19.9023 28.0975 19.2646 28.1001 18.9126 27.6745C15.5048 23.5554 15.7292 17.4422 19.5857 13.5857L23.5857 9.58571ZM27.707 20.2928C28.0976 19.9023 28.7352 19.8997 29.0873 20.3253C32.495 24.4444 32.2706 30.5576 28.4141 34.4141L24.4141 38.4141C20.3194 42.5089 13.6805 42.5089 9.58571 38.4141C5.49096 34.3193 5.49096 27.6804 9.58573 23.5857L10.8786 22.2928C11.2691 21.9023 11.9023 21.9023 12.2928 22.2928L13.707 23.707C14.0976 24.0975 14.0975 24.7307 13.707 25.1212L12.4141 26.4141C9.88148 28.9468 9.88148 33.053 12.4141 35.5857C14.9468 38.1183 19.053 38.1183 21.5857 35.5857L25.5857 31.5857C27.8788 29.2926 28.0957 25.7095 26.2364 23.1724C25.9099 22.7269 25.9023 22.0975 26.2928 21.707L27.707 20.2928Z"
            ></path></svg
          ><span class="font-semibold text-[17px] leading-[23px] kol-url">{{
            detailsUser.facebook
          }}</span></a
        >
      </div>
      <div class="flex mb-4 pt-4 relative box-tab border-b w-[50%]">
        <button
          class="tablinks w-[230px] text-[18px] font-semibold py-3"
          :style="
            currentTab == 'myvideo'
              ? 'border-bottom: 2px solid #000; color: #000'
              : 'color: #bbb'
          "
          @click="changeComponentActive('myvideo')"
        >
          Videos
        </button>
        <button
          class="tablinks w-[230px] text-[18px] font-semibold py-3"
          :style="
            currentTab == 'videolike'
              ? 'border-bottom: 2px solid #000; color: #000'
              : 'color: #bbb'
          "
          @click="changeComponentActive('videolike')"
        >
          <span class="mdi mdi-lock text-[20px]"></span>

          Đã Thích
        </button>
        <div class="border-active"></div>
      </div>
      <component
        :is="currentTab"
        :list-video="listVideoUser"
        :user-name="detailsUser.username"
      ></component>
    </div>
  </div>
</template>

<script>
// import axios from 'axios'

import myvideo from '../../components/profile/myvideo.vue'
import videolike from '../../components/profile/videolike.vue'
import ModalEdit from '../../components/profile/modalEdit.vue'
import AuthService from '@/services/authService.js'
import LoadingBox from '~/components/loading/loadingBox.vue'

export default {
  name: 'ProfileContainer',
  components: { myvideo, videolike, ModalEdit, LoadingBox },
  layout: 'publics',

  data() {
    return {
      tabs: [
        {
          id: 1,
          component: 'myvideo',
          title: 'Videos',
        },
        {
          id: 2,
          component: 'videolike',
          title: 'Đã Thích',
        },
      ],
      currentTab: 'myvideo',
      detailsUser: {},
      listVideoUser: [],
      listCountFollowings: 0,
      listCountFollowers: 0,
      listCountLiked: {},
      userName: '',
      onFollow: false,
      unFollow: false,
      dataUser: {},
      showModalEdit: false,
      dataUpdate: {},
      tokenUser: '',
      showDetailProfile: false,
      showLoadingBox: false,
      countListLike: [],
      sumListLike: 0,
    }
  },
  computed: {
    getListFollowings() {
      return this.$store.state.listUserFollowings
    },
    getCountFollowers() {
      return this.$store.state.countFollowings
    },
  },
  async mounted() {
    this.showLoadingBox = true
    await this.loadDetailUser()
    await this.loadVideoUser()
    await this.loadFollowingVideos()
    this.showLoadingBox = false
    this.showDetailProfile = true
    const resUser = JSON.parse(localStorage.getItem('user'))
    this.tokenUser = localStorage.getItem('token')
    this.$store.dispatch('actionsetIsUser', this.tokenUser)
    this.dataUser = resUser
    this.dataUpdate = resUser
    this.isFollow()
    this.loadCountLike()
  },

  methods: {
    loadCountLike() {
      this.listVideoUser.forEach((v) => {
        this.countListLike.push(v.likes.length)
      })
      window.console.log(this.countListLike)
      this.sumListLike = this.countListLike.reduce((a, b) => a + b, 0)
    },
    async loadDetailUser() {
      const res = await AuthService.detailsUser(this.$route.params.id)
      if (res && res.status === 'success') {
        this.detailsUser = res.user
      } else {
        window.console.log('ko thành công')
      }
    },
    async loadVideoUser() {
      const res = await AuthService.loadVideoByUserId(this.$route.params.id)
      if (res && res.status === 'success') {
        this.listVideoUser = res.videos
      } else {
        window.console.log('ko thành công')
      }
    },
    async loadFollowingVideos() {
      const dataUser = JSON.parse(localStorage.getItem('user'))
      if (dataUser) {
        const res = await AuthService.detailsUser(dataUser.id)
        if (res && res.status === 'success') {
          this.$store.dispatch(
            'actionsetListUserFollowings',
            res.user.followings
          )
        } else {
          window.console.log('ko thành công')
        }
      }
    },
    showAlert() {
      this.$notify({
        type: 'warn',
        group: 'default',
        title: 'Warning',
        text: 'Vui lòng đăng nhập để thực hiện chức năng này',
      })
    },
    changeComponentActive(component) {
      this.currentTab = component
    },
    loadModalEdit() {
      this.showModalEdit = true
    },
    unLoadModalEdit() {
      this.showModalEdit = false
    },
    isFollow() {
      const isFollowing = !!this.getListFollowings.find(
        (ele) => ele.user_id_2 === Number(this.$route.params.id)
      )
      return isFollowing
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
          } else {
            window.console.log('ko thành công')
          }
        }
      } else {
        window.console.log('ko thành công')
      }
    },
  },
}
</script>
<style scoped>
.profile-container::-webkit-scrollbar-track {
  background-color: #fff;
  border-radius: 20px;
}

.profile-container::-webkit-scrollbar {
  width: 8px;
  background-color: #fff;
}

.profile-container::-webkit-scrollbar-thumb {
  border-radius: 12px;
  background-color: #ddd;
}

.kol-url {
  border-bottom: 1px solid transparent;
  transition: 0.3s;
}

.kol-url:hover {
  border-bottom: 1px solid #000;
}

.tablinks {
  border-bottom: 2px solid transparent;
  transition: 0.3s;
}

/* .border-active {
  position: absolute;
  width: 25.2%;
  height: 2px;
  background: #000;
  left: 0;
  bottom: 20px;
  transition: 0.4s;
  transform: translateX(0);
} */

.box-tab button:nth-child(2):hover .border-active {
  transform: translateX(230px);
}

@media (max-width: 1401px) {
  .sidebar-right {
    width: 890px;
    padding-right: 30px;
  }
}
</style>
