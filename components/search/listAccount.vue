<template>
  <div
    class="w-[1155px] overflow-y-scroll fixed top-[164px] right-0 bottom-0 sidebar-right py-4"
  >
    <div v-if="listUser.length">
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
      listUser: [],
    }
  },
  computed: {
    getTitleSearch() {
      return this.$store.state.searchTitle
    },
    getListAccount() {
      return this.$store.state.listAccount
    },
  },
  watch: {
    getListAccount() {
      this.getAccount()
    },
  },
  mounted() {
    this.getAccount()
  },

  methods: {
    // async getProduct() {
    //   const res = await axios.post('http://127.0.0.1:8000/api/search_users', {
    //     value: this.getTitleSearch,
    //   })
    //   window.console.log(this.searchTitle)
    //   window.console.log(this.$store.state.searchTitle)
    //   if (res.status === 200) {
    //     if (this.getTitleSearch) {
    //       this.listUser = res.data.data
    //     } else {
    //       window.console.log('Không có dữ liệu')
    //     }
    //   }
    // },
    getAccount() {
      if (this.getTitleSearch) {
        this.listUser = this.getListAccount
      } else {
        window.console.log('No account')
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

@media (max-width: 1401px) {
  .sidebar-right {
    width: 890px;
  }
}
</style>
