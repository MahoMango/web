<template>
    <div></div>
</template>

<script setup>
import { defineProps, ref, onBeforeMount } from 'vue'
import { host, apiHost } from '@/config'
import router from '@/router'
import PhotoSwipeLightbox from 'photoswipe/lightbox'
import PhotoSwipe from 'photoswipe'
import 'photoswipe/style.css'
const props = defineProps(['galleryID', 'pageNum', 'collectID'])
const totalPages = ref(0)
function getGalleryInfo () {
  fetch(apiHost + '/gallery/' + String(props.galleryID), {
    method: 'get',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json())
    .then((json) => {
      if (json.code === 0) {
        totalPages.value = json.data.totalPage
        const pageList = []
        for (let i = 1; i <= totalPages.value; i++) {
          pageList.push({ src: host + '/image/' + String(props.galleryID) + '/' + String(i) + '.jpg', width: 959, height: 1400 })
        }
        console.log(totalPages.value)
        const option = {
          dataSource: [...pageList],
          showHideAnimationType: 'none',
          pswpModule: PhotoSwipe,
          arrowPrev: false,
          arrowNext: false,
          zoom: false,
          loop: false
        }
        const lightbox = new PhotoSwipeLightbox(option)
        lightbox.init()
        lightbox.on('close', () => {
          router.push({ name: 'collectionInfo', params: { collectID: props.collectID } })
        })
        lightbox.loadAndOpen(props.pageNum - 1)
      }
    })
}

onBeforeMount(() => {
  getGalleryInfo()
})
</script>
