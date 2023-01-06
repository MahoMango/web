<template>
    <div class="ts-content is-tertiary is-vertical-padded">
        <div class="ts-container">
            <div class="ts-space"></div>
            <div class="ts-grid is-stackable">
                <div class="column is-7-wide ts-center">
                    <div class="ts-image is-rounded">
                        <img :src="data.imgUrl">
                    </div>
                </div>
                <div class="column is-9-wide">
                    <div class="ts-segment is-padded is-secondary ts-center">
                        <div class="ts-header is-center-aligned is-huge is-heavy">{{ data.name }}</div>
                        <div class="ts-header">Counts:</div>
                        <div class="ts-statistic">
                            <div class="value">{{ data.totalCollects }}</div>
                            <div class="unit">chapters</div>
                        </div>
                        <div class="ts-space is-big"></div>
                        <a :href="data.originURL" target="__blank"><button class="ts-button is-fluid">Original Page</button></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="ts-space is-big"></div>
    <div class="ts-container">
        <div class="ts-wrap">
            <template v-for="item in galleryList" :key="item.galleryID">
                <router-link
                    :to="{ name: 'page', params: { galleryID: item.galleryID, pageNum: 1, collectID: props.collectID }}"
                    custom
                    v-slot="{ navigate }"
                >
                    <button class="ts-button" @click="navigate" role="link">
                        {{ item.name.split(' ')[1] }}
                    </button>
                </router-link>
            </template>
        </div>
    </div>
</template>

<script setup>
import { apiHost } from '@/config'
import { ref, onBeforeMount, defineProps } from 'vue'
const props = defineProps(['collectID'])
const data = ref({})
const galleryList = ref([])
function getCollectInfo () {
  fetch(apiHost + '/collection/' + String(props.collectID), {
    method: 'get',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json())
    .then((json) => {
      if (json.code === 0) {
        data.value = json.data
        galleryList.value = json.data.galleryIDs
      }
    })
}
onBeforeMount(() => {
  getCollectInfo()
})
</script>
