<template>
  <div
    class="w-[1170px] overflow-y-scroll fixed top-[65px] right-0 bottom-0 sidebar-right py-4"
  >
    <div class="flex">
      <img
        src="https://p9-sg.tiktokcdn.com/aweme/200x200/tos-alisg-v-2774/f0dc9396554144b59b957bda0a404135.jpeg"
        alt=""
        width="120px"
        height="120px"
        class="rounded"
      />
      <div class="text-left ml-4">
        <h1 class="text-[32px] font-bold">Anh Yêu Vội Thế (Mee Remix)</h1>
        <span class="block text-[18px] font-semibold"
          >Lala Trần, Mee Media</span
        >
        <span class="block text-[16px] text-gray-500">247 videos</span>
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
    <div class="grid grid-cols-6 gap-3 mt-5">
      <nuxt-link
        v-for="(item, index) in listVideo"
        :key="index"
        to="/DetailsVideoPage"
        class="relative"
      >
        <video
          :poster="item.imgVideos"
          class="block h-auto object-cover rounded-md videoplay w-[200px]"
          :src="item.urlVideos"
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
          ><strong data-e2e="video-views" class="text-[#fff] text-[17px] italic"
            >65.9K</strong
          >
        </div>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HashTagsBox',
  data() {
    return {
      listVideo: [
        {
          imgVideos:
            'https://res.cloudinary.com/dswt194ko/image/upload/v1650374134/videoandimagevideoHienAnh/anh1_kuvzrp.jpg',
          urlVideos:
            'https://res.cloudinary.com/dswt194ko/video/upload/v1650374144/videoandimagevideoHienAnh/video1_h6evgh.mp4',
        },
        {
          imgVideos:
            'https://res.cloudinary.com/dswt194ko/image/upload/v1650374134/videoandimagevideoHienAnh/anh2_xewxqu.jpg',
          urlVideos:
            'https://res.cloudinary.com/dswt194ko/video/upload/v1650374136/videoandimagevideoHienAnh/video2_hralbs.mp4',
        },
        {
          imgVideos:
            'https://res.cloudinary.com/dswt194ko/image/upload/v1650374134/videoandimagevideoHienAnh/anh3_eibi1d.jpg',
          urlVideos:
            'https://res.cloudinary.com/dswt194ko/video/upload/v1650374138/videoandimagevideoHienAnh/video3_sf1bfe.mp4',
        },
        {
          imgVideos:
            'https://res.cloudinary.com/dswt194ko/image/upload/v1650374134/videoandimagevideoHienAnh/anh4_ddolp7.jpg',
          urlVideos:
            'https://res.cloudinary.com/dswt194ko/video/upload/v1650374138/videoandimagevideoHienAnh/video4_rdr7zo.mp4',
        },
        {
          imgVideos:
            'https://res.cloudinary.com/dswt194ko/image/upload/v1650374134/videoandimagevideoHienAnh/anh5_gkhfdk.jpg',
          urlVideos:
            'https://res.cloudinary.com/dswt194ko/video/upload/v1650374137/videoandimagevideoHienAnh/video5_ff6u8w.mp4',
        },
        {
          imgVideos:
            'https://res.cloudinary.com/dswt194ko/image/upload/v1650374134/videoandimagevideoHienAnh/anh6_kg5agf.jpg',
          urlVideos:
            'https://res.cloudinary.com/dswt194ko/video/upload/v1650374148/videoandimagevideoHienAnh/video6_lxbuq3.mp4',
        },
        {
          imgVideos:
            'https://res.cloudinary.com/dswt194ko/image/upload/v1650374135/videoandimagevideoHienAnh/anh7_nsur4q.jpg',
          urlVideos:
            'https://res.cloudinary.com/dswt194ko/video/upload/v1650374139/videoandimagevideoHienAnh/video7_dga8yg.mp4',
        },
        {
          imgVideos:
            'https://res.cloudinary.com/dswt194ko/image/upload/v1650374135/videoandimagevideoHienAnh/anh8_fxgytt.jpg',
          urlVideos:
            'https://res.cloudinary.com/dswt194ko/video/upload/v1650374139/videoandimagevideoHienAnh/video8_idange.mp4',
        },
        {
          imgVideos:
            'https://res.cloudinary.com/dswt194ko/image/upload/v1650374135/videoandimagevideoHienAnh/anh9_eygnkh.jpg',
          urlVideos:
            'https://res.cloudinary.com/dswt194ko/video/upload/v1650374141/videoandimagevideoHienAnh/video9_vlstsi.mp4',
        },
        {
          imgVideos:
            'https://res.cloudinary.com/dswt194ko/image/upload/v1650374403/videoandimagevideoHienAnh/anh10_dy9ley.jpg',
          urlVideos:
            'https://res.cloudinary.com/dswt194ko/video/upload/v1650374409/videoandimagevideoHienAnh/video10_hdrted.mp4',
        },
      ],
    }
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
