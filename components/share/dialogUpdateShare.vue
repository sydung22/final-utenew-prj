<template>
  <div
    v-show="showModal"
    id="defaultModal"
    tabindex="-1"
    aria-hidden="true"
    class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full flex items-center justify-center"
    style="background-color: rgba(0 0 0 / 70%)"
  >
    <div class="relative p-4 w-full max-w-[600px] h-full md:h-auto">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <!-- Modal header -->
        <div
          class="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600"
        >
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
            Chỉnh sửa bài viết
          </h3>
          <button
            type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-toggle="defaultModal"
            @click="unShowModal"
          >
            <svg
              class="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <div class="px-4 py-4">
          <nuxt-link
            :to="`/profilePage/${itemUserShare.id}`"
            class="text-left flex items-center py-1.5"
          >
            <img
              :src="itemUserShare.avatar"
              alt=""
              class="w-[38px] h-[38px] rounded-full object-cover"
            />
            <div class="ml-3 leading-5">
              <p class="font-bold text-[16px] flex items-center">
                {{ itemUserShare.username }}
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
              <p class="font-thin text-[14px] italic">
                {{ itemUserShare.fullname }}
              </p>
            </div>
          </nuxt-link>
          <div class="h-[500px] overflow-y-auto sidebar-right">
            <div class="flex items-center relative z-20">
              <textarea
                id="content"
                v-model="itemShare.share_description"
                class="h-auto appearance-none block w-full bg-white text-gray-700 rounded py-3 pl-4 pr-[40px] mb-2 leading-tight focus:outline-none"
                type="text"
                placeholder="Bạn đang nghĩ gì vậy... Hãy nhập vào đây ^^"
              />
              <emoji-picker
                :search="search"
                class="absolute right-3 top-1/2 translate-y-[-50%]"
                @emoji="insert"
              >
                <div
                  slot="emoji-invoker"
                  slot-scope="{ events: { click: clickEvent } }"
                  @click.stop="clickEvent"
                >
                  <span
                    class="mdi mdi-emoticon-happy-outline text-[22px] text-[#161823] mt-1 ml-3 cursor-pointer"
                  ></span>
                </div>
                <div
                  slot="emoji-picker"
                  slot-scope="{ emojis, insert }"
                  style="
                    position: absolute;
                    right: 0;
                    top: 50px;
                    width: 300px;
                    height: 300px;
                    background-color: #fff;
                    padding: 10px;
                    overflow-y: scroll;
                    border-radius: 8px;
                  "
                >
                  <div>
                    <div>
                      <div
                        v-for="(emojiGroup, category) in emojis"
                        :key="category"
                      >
                        <h5>{{ category }}</h5>
                        <div>
                          <span
                            v-for="(emoji, emojiName) in emojiGroup"
                            :key="emojiName"
                            class="cursor-grabbing"
                            :title="emojiName"
                            @click="insert(emoji)"
                            >{{ emoji }}</span
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </emoji-picker>
            </div>
            <div class="border rounded-xl w-[100%]">
              <nuxt-link
                :to="`/detailsVideoPage/${itemShare.share_video_id}`"
                class="w-[100%] py-3"
              >
                <div
                  class="h-[450px] w-full relative z-10 bg-black overflow-hidden"
                  style="border-radius: 12px 12px 0 0"
                >
                  <div
                    class="back-blur"
                    :style="`background-image: url('${itemShare.cover}')`"
                  ></div>
                  <video
                    ref="videoRef"
                    class="block w-full h-full object-contain rounded-md videoplay relative z-10"
                    controls
                    :src="itemShare.url"
                    :poster="itemShare.background_video"
                    muted
                  ></video>
                </div>
              </nuxt-link>

              <div class="py-5 px-4">
                <div class="flex items-center justify-between">
                  <div class="flex">
                    <img
                      :src="itemUser.avatar"
                      alt=""
                      class="w-[50px] h-[50px] rounded-full object-cover"
                    />
                    <div class="text-left ml-3">
                      <h2 class="font-bold text-lg">
                        {{ itemUser.username }}
                      </h2>
                      <div class="flex">
                        <p>{{ itemUser.fullname }}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <p class="mt-3 mb-1 text-left">{{ itemShare.description }}</p>
                <div class="flex flex-wrap">
                  <nuxt-link
                    v-for="(itemHashtag, indexHashtag) in itemShare.hashtags"
                    :key="indexHashtag"
                    :to="`/hashtagPage/${itemHashtag.id}`"
                    class="font-bold text-[14px] items-center my-1 hover:underline mr-4"
                  >
                    #{{ itemHashtag.name }}
                  </nuxt-link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="px-6 space-y-6 flex items-center"></div>
        <!-- Modal footer -->
        <div
          class="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600 justify-end"
        >
          <button
            data-modal-toggle="defaultModal"
            type="button"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            @click.prevent="shareVideo"
          >
            Chỉnh sửa
          </button>
          <button
            data-modal-toggle="defaultModal"
            type="button"
            class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            @click="unShowModal"
          >
            Thoát
          </button>
          <loading-sign-in v-show="showLoading"></loading-sign-in>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from 'axios'
import { EmojiPicker } from 'vue-emoji-picker'

import loadingSignIn from '../loading/loadingSignIn.vue'
import AuthService from '@/services/authService.js'

export default {
  components: { loadingSignIn, EmojiPicker },
  props: {
    showModal: {
      type: Boolean,
      default: false,
    },
    unShowModal: {
      type: Function,
      default: () => 1,
    },
    dataShareObj: {
      type: Object,
      default: () => {},
    },
    dataUserObj: {
      type: Object,
      default: () => {},
    },
    dataUserShareObj: {
      type: Object,
      default: () => {},
    },
  },
  data: () => ({
    email: '',
    message: '',
    subject: '',
    showLoading: false,
    input: '',
    search: '',
  }),
  computed: {
    itemShare() {
      return this.dataShareObj
    },
    itemUserShare() {
      return this.dataUserShareObj
    },
    itemUser() {
      return this.dataUserObj
    },
  },
  methods: {
    insert(emoji) {
      this.itemShare.share_description += emoji
    },
    async shareVideo() {
      this.showLoading = true
      const res = await AuthService.updateVideo(
        {
          share_description: this.itemShare.share_description,
        },
        this.itemShare.id
      )
      if (res && res.status === 'success') {
        this.showLoading = false
        this.$notify({
          type: 'success',
          group: 'default',
          title: 'Thông báo',
          text: 'Chỉnh sửa bài viết thành công!',
        })
        setTimeout(() => {
          window.location.reload()
        }, 800)
      } else {
        window.console.log('ko thành công')
      }
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
</style>
