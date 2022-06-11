<template>
  <section class="h-full gradient-form bg-gray-200 md:h-screen">
    <div class="container h-full flex mx-auto items-center">
      <div
        class="flex justify-center items-center flex-wrap h-full g-6 text-gray-800"
      >
        <div class="xl:w-10/12">
          <div class="block bg-white shadow-lg rounded-lg">
            <div class="lg:flex lg:flex-wrap g-0">
              <div class="lg:w-6/12 px-4 md:px-0">
                <div
                  class="md:p-12 md:mx-6 flex flex-col justify-center h-full"
                >
                  <div class="text-center">
                    <img
                      class="mx-auto w-20"
                      src="https://upload.wikimedia.org/wikipedia/commons/4/42/Logo_%C4%90%E1%BA%A1i_h%E1%BB%8Dc_S%C6%B0_ph%E1%BA%A1m_K%E1%BB%B9_thu%E1%BA%ADt_%C4%90%C3%A0_N%E1%BA%B5ng.png"
                      alt="logo"
                    />
                    <h4 class="text-xl font-semibold mt-3 mb-3 pb-1">
                      Chào mừng đến với mạng xã hội
                      <span class="text-blue-600 font-bold text-xl italic"
                        >UTENews</span
                      >
                    </h4>
                  </div>
                  <form>
                    <p class="mb-4">Vui lòng đăng nhập vào tài khoản của bạn</p>
                    <div class="mb-1">
                      <input
                        id="exampleFormControlInput1"
                        v-model="emailInput"
                        type="text"
                        class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        placeholder="Email"
                      />
                      <span
                        v-if="msg.email"
                        class="mt-2 text-red-600 text-[13px]"
                        >{{ msg.email }}</span
                      >
                      <span v-else class="h-[15px] w-full block mt-2"></span>
                    </div>
                    <div class="mb-1">
                      <div class="relative">
                        <input
                          id="exampleFormControlInput1"
                          v-model="passwordInput"
                          class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                          :type="choose"
                          placeholder="Password"
                        />
                        <span
                          class="mdi text-xl absolute top-2 right-3 cursor-pointer"
                          :class="showEye"
                          @click="showPassword"
                        ></span>
                      </div>
                      <span
                        v-if="msg.password"
                        class="mt-2 text-red-600 text-[13px]"
                        >{{ msg.password }}</span
                      >
                      <span v-else class="h-[15px] w-full block mt-2"></span>
                    </div>
                    <div class="text-center pt-1 mb-12 pb-1">
                      <button
                        class="inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3 btn-login bg-blue-600"
                        type="button"
                        data-mdb-ripple="true"
                        data-mdb-ripple-color="light"
                        @click="login"
                      >
                        Đăng nhập
                      </button>
                      <a
                        class="text-gray-500 float-right hover:underline"
                        href="#!"
                        >Quên Mật Khẩu?</a
                      >
                    </div>
                    <div class="flex items-center justify-between pb-6">
                      <p class="mb-0 mr-2">Bạn chưa có tài khoản?</p>
                      <nuxt-link
                        to="/SignupPage"
                        type="button"
                        class="inline-block px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                        data-mdb-ripple="true"
                        data-mdb-ripple-color="light"
                      >
                        Đăng ký
                      </nuxt-link>
                    </div>
                  </form>
                  <loading-sign-in v-show="showLoadingLogin"></loading-sign-in>
                </div>
              </div>
              <div
                class="lg:w-6/12 flex items-center lg:rounded-r-lg rounded-b-lg lg:rounded-bl-none"
              >
                <img
                  src="./bg-ute.jpg"
                  alt=""
                  class="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import AuthService from '@/services/authService.js'
import loadingSignIn from '~/components/loading/loadingSignIn.vue'
export default {
  name: 'LoginContainer',
  components: { loadingSignIn },
  data() {
    return {
      emailInput: '',
      passwordInput: '',
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
      if (this.emailInput === '' || this.passwordInput === '') {
        this.$notify({
          type: 'warn',
          group: 'default',
          title: 'Warning',
          text: 'Vui lòng không bỏ trống',
        })
      } else {
        this.showLoadingLogin = true
        try {
          const res = await AuthService.login({
            email: this.emailInput,
            password: this.passwordInput,
          })

          // this.$store.dispatch('actionsetDataUser', data)
          if (res && res.access_token !== '') {
            window.console.log(res)
            this.showLoadingLogin = false
            this.$notify({
              type: 'success',
              group: 'default',
              title: 'Success',
              text: 'Đăng nhập thành công! Đang vào trang chủ',
            })
            const tokenUser = localStorage.getItem('token')
            this.$store.dispatch('actionsetIsUser', tokenUser)
            setTimeout(() => this.$router.push('/'), 1000)
          } else {
            window.console.log('ko thành công')
          }
        } catch (err) {
          this.showLoadingLogin = false

          this.$notify({
            type: 'error',
            group: 'default',
            title: 'Error',
            text: 'Đăng nhập thất bại! Vui lòng thử lại',
          })
        }
      }
    },
  },
}
</script>
