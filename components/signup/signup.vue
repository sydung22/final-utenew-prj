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
                <div class="md:p-6 md:mx-6 flex flex-col justify-center h-full">
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
                    <p class="mb-4">
                      Đăng ký để trở thành hội viện của UTENews
                    </p>
                    <div class="mb-4">
                      <input
                        id="exampleFormControlInput1"
                        v-model="signup.username"
                        type="text"
                        class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        placeholder="Username"
                      />
                    </div>
                    <div class="mb-4">
                      <input
                        id="exampleFormControlInput1"
                        v-model="signup.fullname"
                        type="text"
                        class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        placeholder="Fullname"
                      />
                    </div>
                    <div class="mb-4">
                      <input
                        id="exampleFormControlInput1"
                        v-model="signup.email"
                        type="email"
                        class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        placeholder="Email"
                      />
                    </div>
                    <div class="mb-4">
                      <input
                        id="exampleFormControlInput1"
                        v-model="signup.age"
                        type="number"
                        min="18"
                        max="100"
                        class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        placeholder="Age"
                      />
                    </div>
                    <div class="mb-4">
                      <select
                        id="exampleFormControlInput1"
                        v-model="signup.gender"
                        class="form-control block w-full px-3 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      >
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div class="mb-4">
                      <input
                        id="exampleFormControlInput1"
                        v-model="signup.password"
                        type="password"
                        class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        placeholder="Password"
                      />
                    </div>
                    <div class="mb-4">
                      <input
                        id="exampleFormControlInput1"
                        v-model="signup.confirmpassword"
                        type="password"
                        class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        placeholder="Confirm Password"
                      />
                    </div>
                    <div class="text-center pt-1 mb-12 pb-1">
                      <button
                        class="inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3 btn-login bg-blue-600"
                        type="button"
                        data-mdb-ripple="true"
                        data-mdb-ripple-color="light"
                        @click="signUp"
                      >
                        Đăng ký
                      </button>
                      <a
                        class="text-gray-500 float-right hover:underline"
                        href="#!"
                        >Quên Mật Khẩu?</a
                      >
                    </div>
                    <div class="flex items-center justify-between pb-6">
                      <p class="mb-0 mr-2">Bạn đã có tài khoản?</p>
                      <nuxt-link
                        to="/LoginPage"
                        type="button"
                        class="inline-block px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                        data-mdb-ripple="true"
                        data-mdb-ripple-color="light"
                      >
                        Đăng nhập
                      </nuxt-link>
                    </div>
                  </form>
                  <loading-sign-in v-show="showLoadingSignUp"></loading-sign-in>
                </div>
              </div>
              <div
                class="lg:w-6/12 flex items-center lg:rounded-r-lg rounded-b-lg lg:rounded-bl-none"
              >
                <img
                  class="w-full h-full object-cover"
                  src="./bg-ute.jpg"
                  alt=""
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
import loadingSignIn from '../loading/loadingSignIn.vue'

import AuthService from '@/services/authService.js'

export default {
  name: 'SignUpContainer',
  components: { loadingSignIn },
  data() {
    return {
      showLoadingSignUp: false,
      signup: {
        gender: 'Male',
      },
    }
  },
  methods: {
    async signUp() {
      if (this.signup.password === this.signup.confirmpassword) {
        this.showLoadingSignUp = true
        try {
          const res = await AuthService.register(this.signup)

          // this.$store.dispatch('actionsetDataUser', data)
          if (res && res.status === 'success') {
            this.showLoadingSignUp = false
            window.console.log(res)
            this.$notify({
              type: 'success',
              group: 'default',
              title: 'Thông báo',
              text: 'Đăng ký thành công! Hãy đăng nhập lại',
            })
            setTimeout(() => this.$router.push('/LoginPage'), 1000)
          } else {
            window.console.log('ko thành công')
          }
        } catch (err) {
          this.showLoadingSignUp = false

          this.$notify({
            type: 'error',
            group: 'default',
            title: 'Thông báo',
            text: 'Đăng ký không thành công! Vui lòng thử lại',
          })
        }
      } else {
        this.$notify({
          type: 'warn',
          group: 'default',
          title: 'Thông báo',
          text: 'Mật khẩu xác thực không trùng khớp',
        })
      }
    },
  },
}
</script>
