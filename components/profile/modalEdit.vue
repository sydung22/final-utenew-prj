<template>
  <div
    v-show="showModal"
    id="defaultModal"
    tabindex="-1"
    aria-hidden="true"
    class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal h-full flex items-center justify-center"
    style="background-color: rgba(0 0 0 / 70%)"
    @keyup.enter="updateProfile"
  >
    <div class="relative p-4 w-full max-w-[1000px] h-full md:h-auto">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <!-- Modal header -->
        <div
          class="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600"
        >
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
            Cập nhật thông tin cá nhân
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
        <!-- Modal body -->
        <div class="px-6 space-y-6 flex items-center">
          <div class="text-center pr-4 relative cursor-pointer">
            <span
              class="block uppercase tracking-wide text-gray-700 text-xl font-bold mb-4 text-center"
              >Ảnh Hồ Sơ</span
            >

            <label for="uploadPhoto" class="cursor-pointer">
              <img
                :src="item.avatar"
                alt="An image example with Cloudinary"
                class="block rounded-full w-[250px] h-[250px] mx-auto object-cover"
              />
            </label>
            <input
              id="uploadPhoto"
              class="absolute opacity-0 z-[-2]"
              type="file"
              accept=".jpeg,.jpg,.png,image/jpeg,image/png"
              aria-label="upload image button"
              @change="selectFile"
            />
            <span
              class="mdi mdi-square-edit-outline text-[30px] rounded-full absolute bottom-[-10px] right-[60px]"
            ></span>
          </div>
          <div class="pl-4 w-3/4">
            <div class="my-4">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 text-left"
                for="username"
              >
                Username
              </label>
              <input
                id="username"
                v-model="item.username"
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="text"
                placeholder="Username"
              />
            </div>
            <div class="my-4">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 text-left"
                for="fullname"
              >
                Họ và Tên
              </label>
              <input
                id="fullname"
                v-model="item.fullname"
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="text"
                placeholder="Fullname"
              />
            </div>
            <div class="my-4">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 text-left"
                for="description"
              >
                Tiểu sử
              </label>
              <textarea
                id="description"
                v-model="item.description"
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="text"
                placeholder="Description"
              />
            </div>
            <div class="my-4">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 text-left"
                for="facebook"
              >
                Facebook
              </label>
              <input
                id="facebook"
                v-model="item.facebook"
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="text"
                placeholder="Link facebook"
              />
            </div>
            <div class="flex flex-wrap">
              <div class="my-4 md:w-1/2 pr-2">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 text-left"
                  for="age"
                >
                  Tuổi
                </label>
                <input
                  id="age"
                  v-model="item.age"
                  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="number"
                  placeholder="Age"
                />
              </div>
              <div class="my-4 md:w-1/2 pl-2">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 text-left"
                  for="gender"
                >
                  Giới tính
                </label>
                <div class="relative">
                  <select
                    id="gender"
                    v-model="item.gender"
                    class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  >
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                  <div
                    class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
                  >
                    <svg
                      class="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Modal footer -->
        <div
          class="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600 justify-end"
        >
          <button
            data-modal-toggle="defaultModal"
            type="button"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            @click="updateProfile"
          >
            Lưu thông tin
          </button>
          <button
            data-modal-toggle="defaultModal"
            type="button"
            class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            @click="unShowModal"
          >
            Thoát
          </button>
        </div>
      </div>
      <loading-sign-in v-show="showLoading"></loading-sign-in>
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
    showModal: {
      type: Boolean,
      default: false,
    },
    unShowModal: {
      type: Function,
      default: () => 1,
    },
    dataUpdateObj: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      dataUpdate: {},
      src: '',
      srcVideo: '',
      showLoading: false,
    }
  },
  computed: {
    item() {
      return this.dataUpdateObj
    },
    showModalEdit() {
      return this.showModal
    },
  },
  mounted() {
    window.console.log(this.dataUpdateObj.username)
  },

  methods: {
    async selectFile(e) {
      const file = e.target.files[0]

      /* Make sure file exists */
      if (!file) return

      /* create a reader */
      const readData = (f) =>
        new Promise((resolve) => {
          const reader = new FileReader()
          reader.onloadend = () => resolve(reader.result)
          reader.readAsDataURL(f)
        }).then((res) => res)

      /* Read data */
      const data = await readData(file)
      window.console.log(data)
      //   window.console.log(data)
      /* upload the converted data */
      const instance = await this.$cloudinary
        .upload(data, {
          folder: 'imageUser',
          uploadPreset: 'q4qrbvqz',
        })
        .then((res) => (this.src = res.secure_url))
      //  secure_url)
      // this.dataUpdateObj.avatar = this.src
      window.console.log(instance)
      this.item.avatar = this.src
    },
    async updateProfile() {
      this.showLoading = true
      try {
        const res = await AuthService.updateProfile(this.item)
        if (res && res.status === 'success') {
          this.showLoading = false
          this.$notify({
            type: 'success',
            group: 'default',
            title: 'Thông báo',
            text: 'Cập nhật thông tin thành công !',
          })
          localStorage.setItem('user', JSON.stringify(res.user))
          window.console.log(res.user)
          setTimeout(() => window.location.reload(), 800)
        } else {
          window.console.log('đổi thông tin không thành công')
        }
      } catch (err) {
        this.showLoading = false
        this.$notify({
          type: 'error',
          group: 'default',
          title: 'Thông báo',
          text: 'Cập nhật thông tin không thành công !',
        })
      }
    },
  },
}
</script>
