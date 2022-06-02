<template>
  <div class="w-[1155px] fixed top-[65px] right-0 bottom-0 sidebar-right py-4">
    <div
      class="flex mb-4 pt-4 relative box-tab w-[100%] justify-start border-b"
    >
      <button
        class="tablinks w-[230px] text-[18px] font-semibold py-3"
        :style="
          currentTab == 'listAll'
            ? 'border-bottom: 2px solid #000; color: #000'
            : 'color: #bbb'
        "
        @click="changeComponentActive('listAll')"
      >
        {{ tabs[0].title }}
      </button>
      <button
        class="tablinks w-[230px] text-[18px] font-semibold py-3"
        :style="
          currentTab == 'listAccount'
            ? 'border-bottom: 2px solid #000; color: #000'
            : 'color: #bbb'
        "
        @click="changeComponentActive('listAccount')"
      >
        {{ tabs[1].title }}
      </button>
      <button
        class="tablinks w-[230px] text-[18px] font-semibold py-3"
        :style="
          currentTab == 'listVideo'
            ? 'border-bottom: 2px solid #000; color: #000'
            : 'color: #bbb'
        "
        @click="changeComponentActive('listVideo')"
      >
        {{ tabs[2].title }}
      </button>
      <div class="border-active"></div>
    </div>
    <component :is="currentTab"></component>
  </div>
</template>

<script>
import listAll from './listAll.vue'
import listAccount from './listAccount.vue'
import listVideo from './listVideo.vue'
export default {
  components: { listAccount, listVideo, listAll },
  data() {
    return {
      tabs: [
        {
          id: 1,
          component: 'listAll',
          title: 'Top',
        },
        {
          id: 2,
          component: 'listAccount',
          title: 'Tài khoản',
        },
        {
          id: 3,
          component: 'listVideo',
          title: 'Videos',
        },
      ],
      currentTab: 'listAll',
    }
  },
  methods: {
    changeComponentActive(component) {
      this.currentTab = component
    },
  },
}
</script>
<style scoped>
.tablinks {
  border-bottom: 2px solid transparent;
}
@media (max-width: 1401px) {
  .sidebar-right {
    width: 890px;
  }
}
</style>
