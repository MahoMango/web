<template>
    <div class="ts-container is-narrow">
        <div class="ts-header is-large is-heavy">Collection</div>
        <div class="ts-text is-secondary">Past, Future, Present</div>
        <div class="ts-space is-large"></div>
        <div class="ts-wrap">
            <InfoCard v-for="item in collectionList" :key="item.collectionID" :id="item.collectionID" :title="item.name" :imgSrc="item.imgURL"></InfoCard>
        </div>
    </div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue'
import { apiHost } from '@/config'
import InfoCard from './../components/InfoCard.vue'
const collectionList = ref([])
function getList () {
  fetch(apiHost + '/collection', {
    method: 'get',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json())
    .then((json) => {
      if (json.code === 0) {
        collectionList.value = json.data
      }
    })
}
onBeforeMount(() => {
  getList()
})
</script>

<style>
</style>
