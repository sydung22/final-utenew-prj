<template>
  <div
    class="w-[348px] overflow-y-scroll fixed top-[65px] bottom-0 sidebar-left"
  >
    <div class="py-4 border-b">
      <nuxt-link
        to="/"
        class="flex font-bold px-2 py-1 items-center text-[18px] hover:bg-[#eee] duration-500 cursor-pointer tab-side"
      >
        <span class="mdi mdi-home text-[30px] mr-2"></span>
        Dành Cho Bạn
      </nuxt-link>
      <nuxt-link
        to="/ContentFollowPage"
        class="flex font-bold px-2 py-1 items-center text-[18px] hover:bg-[#eee] duration-500 cursor-pointer tab-side"
      >
        <span class="mdi mdi-account-group text-[30px] mr-2"></span>

        Đang Follow
      </nuxt-link>
      <div
        class="flex font-bold px-2 py-1 items-center text-[18px] hover:bg-[#eee] duration-500 cursor-pointer tab-side"
      >
        <span class="mdi mdi-camera-gopro text-[30px] mr-2"></span>
        Live Room
      </div>
    </div>
    <div class="text-left pt-4 pb-2 border-b">
      <p class="text-[14px] text-[#413119] font-bold italic mb-2">
        Tài khoản được đề xuất
      </p>
      <loading-box v-show="showLoadingListUser">
        <div class="flex items-center">
          <div
            class="loading-item"
            style="width: 50px; height: 50px; border-radius: 50%"
          ></div>
          <div class="w-[80%] ml-3">
            <div class="loading-item" :style="`width: 80%;`"></div>
            <div
              class="loading-item"
              :style="`width: 80%; margin-top: 10px`"
            ></div>
          </div>
        </div>
      </loading-box>
      <nuxt-link
        v-for="(item, index) in loadListUserOffers"
        :key="index"
        :to="`/profilePage/${item.id}`"
        class="flex items-center py-1.5"
      >
        <img
          :src="item.avatar"
          alt=""
          class="w-[38px] h-[38px] rounded-full object-cover"
        />
        <div class="ml-3 leading-5">
          <p class="font-bold text-[16px] flex items-center">
            {{ item.username }}
            <svg
              class="tiktok-shsbhf-StyledVerifyBadge e1aglo370 ml-[4px]"
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
          </p>
          <p class="font-thin text-[14px] italic">{{ item.fullname }}</p>
        </div>
      </nuxt-link>
      <button
        v-if="length < 14"
        class="italic font-bold text-[#FE2C55] inline-block mt-2"
        @click="loadMore"
      >
        Xem Tất Cả
      </button>
      <button
        v-else
        class="italic font-bold text-[#FE2C55] inline-block mt-2"
        @click="loadMore"
      >
        Ẩn bớt
      </button>
    </div>
    <div class="text-left pt-4 pb-2 border-b">
      <p class="text-[14px] text-[#413119] font-bold italic mb-2">
        Các tài khoản đang follow
      </p>
      <loading-box v-show="showLoadingListFollow">
        <div class="flex items-center">
          <div
            class="loading-item"
            style="width: 50px; height: 50px; border-radius: 50%"
          ></div>
          <div class="w-[80%] ml-3">
            <div class="loading-item" :style="`width: 80%;`"></div>
            <div
              class="loading-item"
              :style="`width: 80%; margin-top: 10px`"
            ></div>
          </div>
        </div>
      </loading-box>
      <nuxt-link
        v-for="(item, index) in getListFollowings"
        v-show="showListFollowings"
        :key="index"
        :to="`/profilePage/${item.user_2.id}`"
        class="flex items-center py-2"
      >
        <img
          :src="item.user_2.avatar"
          alt=""
          class="w-[35px] h-[35px] rounded-full object-cover"
        />
        <div class="ml-3 leading-5">
          <p class="font-bold text-[16px]">{{ item.user_2.username }}</p>
          <p class="font-thin text-[14px] italic">{{ item.user_2.fullname }}</p>
        </div>
      </nuxt-link>
      <a href="#" class="italic font-bold mt-2 text-[#FE2C55] inline-block"
        >Xem Thêm</a
      >
    </div>
    <div class="text-left py-4 border-b">
      <p class="text-[14px] text-[#413119] font-bold italic mb-2">Khám phá</p>
      <loading-box v-show="showLoadingListHashtag" class="flex items-center">
        <div class="loading-item" :style="`width: 40%; margin: 0`"></div>
        <div
          class="loading-item"
          :style="`width: 40%; margin: 0; margin-left: 10px`"
        ></div>
      </loading-box>
      <div class="flex flex-wrap">
        <div
          v-for="(item, index) in listHashtag"
          :key="index"
          class="py-[3px] mr-2 hagstag-item"
        >
          <nuxt-link
            :to="`/hashtagPage/${item.id}`"
            class="border leading-[18px] px-[10px] py-[3px] text-[14px] rounded-full hagstag-item"
          >
            <span class="text-[16px] text-[#FE2C55] italic font-bold">#</span>
            {{ item.name }}
          </nuxt-link>
        </div>
      </div>
    </div>
    <div class="text-left py-4 footer-sidebar">
      <ul class="flex text-[12px] mb-3">
        <li><a href="#">Giới thiệu</a></li>
        <li><a href="#">Bảng tin</a></li>
        <li><a href="#">Liên hệ</a></li>
        <li><a href="#">Sự nghiệp</a></li>
        <li><a href="#">ByteDance</a></li>
      </ul>
      <ul class="flex text-[12px] flex-wrap mb-3">
        <li><a href="#">UTENews for Good</a></li>
        <li><a href="#">Quảng cáo</a></li>
        <li><a href="#">Developers</a></li>
        <li><a href="#">Transparency</a></li>
        <li><a href="#">UTENews Rewards</a></li>
      </ul>
      <ul class="flex text-[12px] flex-wrap mb-3">
        <li><a href="#">Trợ giúp</a></li>
        <li><a href="#">An toàn</a></li>
        <li><a href="#">Điều khoản</a></li>
        <li><a href="#">Quyền riêng tư</a></li>
        <li><a href="#">Creator Portal</a></li>
        <li><a href="#">Hướng dẫn Cộng đồng</a></li>
      </ul>
      <p class="text-[12px] text-[#aaa] font-semibold">
        @2022 Design by Nguyễn Sỹ Dũng
      </p>
    </div>
  </div>
</template>

<script>
// import axios from 'axios'
import loadingBox from '../loading/loadingBox.vue'

import AuthService from '@/services/authService.js'

export default {
  name: 'SideBarContainer',
  components: { loadingBox },
  data() {
    return {
      listUserOffers: [],
      listDataFollowings: [],
      listHashtag: [],
      length: 7,
      showLoadingListUser: false,
      showLoadingListFollow: false,
      showLoadingListHashtag: false,
      showListFollowings: false,
    }
  },
  computed: {
    getListFollowings() {
      return this.$store.state.listUserFollowings
    },
    loadListUserOffers() {
      return this.listUserOffers.slice(0, this.length)
    },
  },
  async mounted() {
    this.showLoadingListUser = true
    this.showLoadingListFollow = true
    this.showLoadingListHashtag = true
    await this.loadUser()
    this.showLoadingListUser = false
    await this.loadDetailUser()
    this.showListFollowings = true
    this.showLoadingListFollow = false
    await this.loadHashtag()
    this.showLoadingListHashtag = false
  },
  methods: {
    async loadUser() {
      const res = await AuthService.user()
      if (res && res.status === 'success') {
        this.listUserOffers = res.user
      } else {
        window.console.log('ko thành công')
      }
    },
    async loadHashtag() {
      const res = await AuthService.hashtag()
      if (res && res.status === 'success') {
        this.listHashtag = res.hashtag
      } else {
        window.console.log('ko thành công')
      }
    },
    async loadDetailUser() {
      const dataUser = JSON.parse(localStorage.getItem('user'))
      const tokenUser = localStorage.getItem('token')
      if (dataUser && tokenUser) {
        const res = await AuthService.detailsUser(dataUser.id)
        if (res && res.status === 'success') {
          this.listDataFollowings = res.user.followings
          this.$store.dispatch(
            'actionsetListUserFollowings',
            this.listDataFollowings
          )
        } else {
          window.console.log('ko thành công')
        }
      }
    },
    loadMore() {
      if (this.length < 14) {
        this.length = this.length + 7
      } else {
        this.length = this.length - 7
      }
    },
  },
}
</script>
<style scoped>
.sidebar-left {
  transition: 0.5s;
}

.sidebar-left::-webkit-scrollbar-track {
  background-color: #fff;
  border-radius: 20px;
}

.sidebar-left::-webkit-scrollbar {
  width: 8px;
  background-color: #fff;
}

.sidebar-left::-webkit-scrollbar-thumb {
  border-radius: 12px;
  background-color: #eee;
}

.hagstag-item {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.footer-sidebar ul li {
  margin-right: 6px;
  color: #aaa;
  font-weight: 600;
  border-bottom: 1px solid transparent;
}

.footer-sidebar ul li:hover {
  border-bottom: 1px solid;
}

.tab-side.nuxt-link-active {
  font-weight: bold;
}

.tab-side.nuxt-link-exact-active {
  color: #2563eb;
}
</style>
