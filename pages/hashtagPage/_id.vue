<template>
  <div
    class="w-[1170px] overflow-y-scroll fixed top-[65px] right-0 bottom-0 sidebar-right py-4 pr-[230px]"
  >
    <loading-box v-show="showLoadingBox">
      <div class="flex items-center">
        <div class="loading-item" style="width: 100px; height: 100px"></div>
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
    <div v-show="showDetailHashtag">
      <div class="flex items-center">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/4/42/Logo_%C4%90%E1%BA%A1i_h%E1%BB%8Dc_S%C6%B0_ph%E1%BA%A1m_K%E1%BB%B9_thu%E1%BA%ADt_%C4%90%C3%A0_N%E1%BA%B5ng.png"
          alt=""
          width="120px"
          height="120px"
          class="rounded"
        />
        <div class="text-left ml-4">
          <h1 class="text-[32px] font-bold">
            {{ hashtagsName }}
          </h1>
          <span class="block text-[18px] font-semibold">UTE hashtags</span>
          <span class="block text-[16px] text-gray-500"
            >{{ detailsHashtags.length }} videos</span
          >
        </div>
        <div class="mt-4 ml-16">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.5546 8.35111L13.3171 8.16468V7.37972V3.50006L21.4998 12.0001L13.3171 20.5001V16.3738V15.3664L12.3098 15.3738C8.838 15.3994 5.4275 17.0466 2.49983 19.5882C2.54612 19.2536 2.67769 18.641 2.94391 17.8329C3.3786 16.5132 4.01326 15.1988 4.88691 13.971C6.71045 11.4083 9.24414 9.16046 12.5546 8.35111Z"
              stroke="#161823"
              stroke-width="2"
            ></path>
          </svg>
        </div>
      </div>
      <div class="grid grid-cols-4 mt-7">
        <nuxt-link
          v-for="(item, index) in detailsHashtags"
          :key="index"
          :to="`/detailsVideoPage/${item.id}`"
          class="relative w-[220px] h-[300px]"
        >
          <video
            ref="videoRef"
            :poster="item.cover_url"
            class="block w-full h-full object-cover rounded-md videoplay"
            :src="item.url"
            muted
            @mouseenter="videoPlay(index)"
            @mouseleave="videoPause(index)"
          ></video>
          <div class="absolute bottom-2 left-3 flex items-center">
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
              >65.9K</strong
            >
          </div>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import AuthService from '@/services/authService.js'
import loadingBox from '~/components/loading/loadingBox.vue'

export default {
  name: 'HashTagsBox',
  components: { loadingBox },
  layout: 'publics',
  data() {
    return {
      detailsHashtags: {},
      hashtagsName: '',
      listHashtag: [],
      showDetailHashtag: false,
      showLoadingBox: false,
    }
  },
  async mounted() {
    this.showLoadingBox = true
    await this.loadHashtag()
    await this.loadDetailsHashtags()
    this.tokenUser = localStorage.getItem('token')
    this.$store.dispatch('actionsetIsUser', this.tokenUser)
    this.showLoadingBox = false
    this.showDetailHashtag = true
  },
  methods: {
    async loadHashtag() {
      const res = await AuthService.hashtag()
      if (res && res.status === 'success') {
        this.listHashtag = res.hashtag
        const data = this.listHashtag.find(
          (el) => el.id === Number(this.$route.params.id)
        )
        this.hashtagsName = data.name
      } else {
        this.$router.push('/')
        window.console.log('ko thành công')
      }
    },
    async loadDetailsHashtags() {
      const res = await AuthService.loadVideoByHashtag(this.$route.params.id)
      if (res && res.status === 'success') {
        this.detailsHashtags = res.videos
      } else {
        this.$router.push('/')
        window.console.log('ko thành công')
      }
    },
    videoPlay(id) {
      const listVideo = this.$refs.videoRef
      listVideo[id].play()
    },
    videoPause(id) {
      const listVideo = this.$refs.videoRef
      listVideo[id].pause()
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
