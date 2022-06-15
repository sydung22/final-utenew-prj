<template>
  <div
    v-show="showFollowing"
    id="defaultModal"
    tabindex="-1"
    aria-hidden="true"
    class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal h-full flex items-center justify-center"
    style="background-color: rgba(0 0 0 / 70%)"
  >
    <div class="relative p-4 w-auto h-full md:h-auto">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <!-- Modal header -->
        <div
          class="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600"
        >
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
            Danh sách đang theo dõi
          </h3>
          <button
            type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-toggle="defaultModal"
            @click="unShowFollowing"
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
        <!-- Modal body -->

        <div class="px-6 space-y-6 flex items-center pb-5">
          <div v-if="getListFollwings.length">
            <nuxt-link
              v-for="(item, index) in getListFollwings"
              :key="index"
              class="flex pl-4 py-2 border-b items-center w-[380px] cursor-pointer"
              :to="`/profilePage/${item.user_2.id}`"
            >
              <img
                :src="item.user_2.avatar"
                alt=""
                class="w-[60px] h-[60px] rounded-full object-cover"
              />
              <div class="text-left ml-4">
                <h2 class="font-bold text-lg">{{ item.user_2.username }}</h2>
                <p>{{ item.user_2.fullname }}</p>
                <p class="line-clamp-1">✨{{ item.user_2.description }}</p>
              </div>
            </nuxt-link>
          </div>
        </div>
        <!-- Modal footer -->
      </div>
    </div>
  </div>
</template>

<script>
// import axios from 'axios'
import loadingSignIn from '../loading/loadingSignIn.vue'
import AuthService from '@/services/authService.js'

export default {
  components: { loadingSignIn },
  props: {
    showFollowing: {
      type: Boolean,
      default: false,
    },
    unShowFollowing: {
      type: Function,
      default: () => 1,
    },
  },
  data() {
    return {
      dataUpdate: {},
      src: '',
      srcVideo: '',
      showLoading: false,
      getListFollwings: [],
    }
  },
  computed: {
    item() {
      return this.dataUpdateObj
    },
    showFollowingEdit() {
      return this.showFollowing
    },
  },
  async mounted() {
    await this.loadDetailUser()
    window.console.log(this.getListFollwings)
  },

  methods: {
    async loadDetailUser() {
      const dataUser = JSON.parse(localStorage.getItem('user'))
      const tokenUser = localStorage.getItem('token')
      if (dataUser && tokenUser) {
        const res = await AuthService.detailsUser(Number(this.$route.params.id))
        if (res && res.status === 'success') {
          this.getListFollwings = res.user.followings
        } else {
          window.console.log('ko thành công')
        }
      }
    },
  },
}
</script>
