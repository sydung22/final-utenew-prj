<template>
  <div
    class="w-[1155px] overflow-y-scroll fixed top-[164px] right-0 bottom-0 sidebar-right py-4"
  >
    <div v-if="listVideo.length || listUser.length">
      <div
        v-show="listUser.length"
        class="text-left font-bold italic text-[18px] flex items-center"
      >
        <span class="mdi mdi-account text-[18px] mr-1"></span>
        <p>Tài khoản</p>
      </div>
      <nuxt-link
        v-for="(item, index) in listUser"
        :key="index"
        :to="`/profilePage/${item.id}`"
        class="flex pt-2 pb-4 border-b items-center w-[800px]"
      >
        <img
          :src="item.avatar"
          alt=""
          class="w-[60px] h-[60px] rounded-full object-cover"
        />
        <div class="text-left ml-4">
          <h2 class="font-bold text-lg">{{ item.username }}</h2>
          <div class="flex">
            <p>{{ item.fullname }}</p>
            <p class="ml-2">
              .<span class="font-semibold">275k</span> followers
            </p>
          </div>
          <p>✨{{ item.description }}</p>
        </div>
      </nuxt-link>
      <div
        v-show="listUser & listVideo"
        class="w-full h-[2px] bg-black opacity-50"
      ></div>
      <div
        v-show="listVideo.length"
        class="text-left font-bold italic text-[18px] flex items-center mt-2"
      >
        <span class="mdi mdi-video text-[18px] mr-1"></span>
        <p>Videos</p>
      </div>
      <div class="grid grid-cols-3 gap-2">
        <div
          v-for="(item, index) in listVideo"
          :key="index"
          class="w-[260px] h-full py-3"
          @mouseenter="videoPlay(index)"
          @mouseleave="videoPause(index)"
        >
          <nuxt-link
            :to="`/detailsVideoPage/${item.id}`"
            class="relative block"
          >
            <video
              ref="videoRef"
              :poster="item.background_video"
              class="block w-full h-[350px] object-cover rounded-md videoplay"
              :src="item.url"
              muted
            ></video>
            <div
              class="absolute left-[10px] flex items-center"
              :style="
                item.hashtags.length > 0
                  ? { bottom: '4.5rem' }
                  : {
                      bottom: '2.5rem',
                    }
              "
            >
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
                class="font-bold text-[16px] items-center my-1 hover:underline mr-4"
              >
                #{{ itemHashtag.name }}
              </nuxt-link>
            </div>
          </nuxt-link>
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
        </div>
      </div>
    </div>
    <div v-else class="text-blue-600 font-bold text-xl">
      <p>Không có dữ liệu</p>
    </div>
  </div>
</template>

<script>
// import axios from 'axios'
export default {
  data() {
    return {
      listVideo: [],
      listUser: [],
    }
  },
  computed: {
    getTitleSearch() {
      return this.$store.state.searchTitle
    },
    getListVideos() {
      return this.$store.state.listVideos
    },
    getListAccount() {
      return this.$store.state.listAccount
    },
  },
  watch: {
    getListVideos() {
      this.getVideos()
    },
    getListAccount() {
      this.getAccount()
    },
  },
  mounted() {
    this.getVideos()
    this.getAccount()
  },
  methods: {
    getVideos() {
      if (this.getTitleSearch) {
        this.listVideo = this.getListVideos
          .filter((el) => el.type === 'PUBLIC')
          .slice(0, 6)
      } else {
        window.console.log('No videos')
      }
    },
    getAccount() {
      if (this.getTitleSearch) {
        this.listUser = this.getListAccount.slice(0, 6)
      } else {
        window.console.log('No account')
      }
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
.box-profile:hover .profile-username {
  text-decoration: underline;
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

@media (max-width: 1401px) {
  .sidebar-right {
    width: 890px;
  }
}
</style>
