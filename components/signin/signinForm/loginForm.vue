<template>
  <div v-show="showModalSignIn" @keyup.enter="login">
    <!-- <div
      class="bg-red-600 text-white font-bold mb-2 mx-[-25px] py-2 text-[18px]"
    >
      Đăng nhập thất bại
    </div> -->
    <!-- <div
      class="bg-green-600 text-white font-bold mb-2 mx-[-25px] py-2 text-[18px]"
    >
      Đăng nhập thành công
    </div> -->
    <div
      v-show="showAlertFail"
      class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-left mb-3"
      role="alert"
    >
      <strong class="font-bold">Thất bại!</strong>
      <span class="inline">Vui lòng kiểm tra lại.</span>
      <span
        class="absolute top-0 bottom-0 right-0 px-4 py-3 cursor-pointer"
        @click="showAlertFail = false"
      >
        <svg
          class="fill-current h-6 w-6 text-red-500"
          role="button"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <title>Close</title>
          <path
            d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"
          />
        </svg>
      </span>
    </div>
    <div
      v-show="showAlertSuccess"
      class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative text-left mb-3"
      role="alert"
    >
      <strong class="font-bold">Thành công!</strong>
      <span class="inline">Vui lòng chờ trong giây lát.</span>
      <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
        <svg
          class="fill-current h-6 w-6 text-green-500"
          role="button"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <title>Close</title>
          <path
            d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"
          />
        </svg>
      </span>
    </div>
    <h1 class="text-[26px] font-bold mb-2">Đăng nhập bằng email</h1>
    <div class="mb-4 text-left">
      <label
        class="inline-block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 text-left"
        for="email"
      >
        Email
      </label>
      <input
        id="email"
        v-model="emailInput"
        class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-1.5 leading-tight focus:outline-none focus:bg-white"
        type="text"
        placeholder="Email"
      />
      <span v-if="msg.email" class="mt-2 text-red-600 text-[13px]">{{
        msg.email
      }}</span>
    </div>
    <div class="mt-3 mb-5 text-left">
      <label
        class="inline-block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 text-left"
        for="password"
      >
        Mật khẩu
      </label>
      <div class="relative">
        <input
          id="password"
          v-model="passwordInput"
          class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-1.5 leading-tight focus:outline-none focus:bg-white"
          :type="choose"
          placeholder="Password"
        />
        <span
          class="mdi text-xl absolute top-2 right-3 cursor-pointer"
          :class="showEye"
          @click="showPassword"
        ></span>
      </div>
      <span v-if="msg.password" class="mt-2 text-red-600 text-[13px]">{{
        msg.password
      }}</span>
    </div>

    <button
      class="text-white bg-[#2563eb] font-bold w-full flex items-center justify-center py-3 rounded-md mb-5 mt-6 hover:bg-[#1411c0]"
      @click="login"
    >
      Đăng Nhập
    </button>
    <div class="py-4 border-t mx-[-25px]">
      <div class="font-semibold text-sm text-center">
        Bạn chưa có tài khoản?
        <button
          class="text-[#2563eb] font-bold italic hover:underline text-base"
          @click="clickShowSignUp"
        >
          Đăng ký
        </button>
      </div>
    </div>
    <loading-sign-in v-show="showLoadingLogin"></loading-sign-in>
  </div>
</template>

<script>
// import axios from 'axios'
import AuthService from '@/services/authService.js'
import loadingSignIn from '~/components/loading/loadingSignIn.vue'
// import { clientRaw } from '~/services/axios'
export default {
  name: 'LoginForm',
  components: { loadingSignIn },
  props: {
    showModalSignIn: Boolean,
    clickShowSignUp: {
      type: Function,
      default: () => 1,
    },
  },
  data() {
    return {
      emailInput: '',
      passwordInput: '',
      showAlertFail: false,
      showAlertSuccess: false,
      msg: [],
      choose: 'password',
      showEye: 'mdi-eye',
      showLoadingLogin: false,
    }
  },
  watch: {
    emailInput(value) {
      // binding this to the data value in the email input
      this.emailInput = value
      this.validateEmail(value)
    },
    passwordInput(value) {
      this.passwordInput = value
      this.validatePassword(value)
    },
  },
  methods: {
    showPassword() {
      if (this.choose === 'password') {
        this.choose = 'text'
        this.showEye = 'mdi-eye-off'
      } else {
        this.choose = 'password'
        this.showEye = 'mdi-eye'
      }
    },
    validateEmail(value) {
      if (
        /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
          value
        )
      ) {
        this.msg.email = ''
      } else {
        this.msg.email = 'Invalid Email Address'
      }
    },
    validatePassword(value) {
      const difference = 8 - value.length
      if (value.length < 8) {
        this.msg.password =
          'Must be 8 characters! ' + difference + ' characters left'
      } else {
        this.msg.password = ''
      }
    },
    async login() {
      this.showLoadingLogin = true
      try {
        const res = await AuthService.login({
          email: this.emailInput,
          password: this.passwordInput,
        })

        // this.$store.dispatch('actionsetDataUser', data)
        if (res && res.access_token !== '') {
          this.showAlertFail = false
          window.console.log(res)
          this.showLoadingLogin = false
          this.showAlertSuccess = true
          setTimeout(() => window.location.reload(), 1000)
        } else {
          this.showAlertFail = true
          window.console.log('ko thành công')
        }
      } catch (err) {
        this.showLoadingLogin = false
        this.showAlertFail = true
      }
    },
  },
}
</script>
<style scoped>
@import '../assets/style.css';
</style>
