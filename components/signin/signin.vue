<template>
  <div id="app">
    <button
      class="bg-[#FE2C55] font-bold py-1.5 px-3 text-white rounded"
      @click="showModal = true"
    >
      Đăng Nhập
    </button>
    <transition name="fade" appear>
      <div v-if="showModal" class="modal-overlay" @click="resetForm"></div>
    </transition>
    <transition name="slide" appear>
      <div v-if="showModal" class="modal">
        <div v-show="showTabEmail">
          <h1 class="text-[26px] font-bold mb-5 text-center">
            Đăng nhập vào <span class="text-blue-600">UTENews</span>
          </h1>
          <div
            class="flex mb-4 border rounded-md cursor-pointer"
            @click="clickShowSignin"
          >
            <span
              class="mdi mdi-email text-[32px] flex items-center justify-center text-[#000] border-r leading-7 px-1 py-1.5"
            ></span>
            <p
              class="flex-1 flex justify-center items-center font-semibold text-[17px]"
              style="word-break: break-word"
            >
              Đăng nhập với Email
            </p>
          </div>
          <div class="flex mb-4 border rounded-md cursor-pointer">
            <span
              class="mdi mdi-facebook text-[32px] flex items-center justify-center text-[#0075fa] border-r leading-7 px-1 py-1.5"
            ></span>
            <p
              class="flex-1 flex justify-center items-center font-semibold text-[17px]"
              style="word-break: break-word"
            >
              Đăng nhập với Facebook
            </p>
          </div>
          <div class="flex border rounded-md mb-4 cursor-pointer">
            <div
              class="flex items-center justify-center text-[#0075fa] border-r leading-7 p-1"
            >
              <img class="w-8 h-8" src="./assets/img/google.png" alt="" />
            </div>
            <p
              class="flex-1 flex justify-center items-center font-semibold text-[17px]"
              style="word-break: break-word"
            >
              Đăng nhập với Gmail
            </p>
          </div>
          <div class="py-4 border-t mx-[-25px]">
            <div class="font-semibold text-sm text-center">
              Bạn chưa có tài khoản?
              <button
                class="text-[#FE2C55] font-bold italic hover:underline text-base"
                @click="clickShowSignUp"
              >
                Đăng ký
              </button>
            </div>
          </div>
        </div>
        <login-form
          :show-modal-sign-in="showModalSignIn"
          :click-show-sign-up="clickShowSignUp"
        ></login-form>
        <signup-form
          :show-modal-sign-up="showModalSignUp"
          :click-show-sign-in="clickShowTab"
        ></signup-form>
      </div>
    </transition>
  </div>
</template>

<script>
import loginForm from './signinForm/loginForm.vue'
import SignupForm from './signupForm/signupForm.vue'
export default {
  name: 'SignInContainer',

  components: { loginForm, SignupForm },
  data() {
    return {
      showModal: false,
      showModalSignIn: false,
      showModalSignUp: false,
      showTabEmail: true,
    }
  },
  methods: {
    clickShowSignin() {
      this.showModalSignIn = true
      this.showTabEmail = false
      this.showModalSignUp = false
    },
    clickShowTab() {
      this.showModalSignIn = false
      this.showTabEmail = true
      this.showModalSignUp = false
    },
    clickShowSignUp() {
      this.showModalSignIn = false
      this.showTabEmail = false
      this.showModalSignUp = true
    },
    resetForm() {
      this.showTabEmail = true
      this.showModal = false
      this.showModalSignIn = false
      this.showModalSignUp = false
    },
  },
}
</script>
<style scoped>
@import './assets/style.css';
</style>
