<template>
    <div class="ts-container is-narrow">
        <div class="ts-header is-large is-heavy">Download Task</div>
        <div class="ts-text is-secondary">A place to store memories</div>
        <div class="ts-space is-large"></div>
        <div class="ts-box is-top-indicated">
            <div class="ts-content is-dense">
                <div class="ts-header is-heavy">Get Metadata</div>
            </div>
            <div class="ts-divider"></div>
            <div class="ts-row">
                <div class="column is-fluid">
                    <div class="ts-input is-start-icon">
                        <span class="ts-icon is-magnifying-glass-icon"></span>
                        <input type="text" v-model="url" placeholder="etc: https://www.manhuaren.com/manhua-"  @keyup.enter="getMetaData()">
                    </div>
                </div>
                <div class="column">
                    <button class="ts-button" @click="getMetaData()" :class="{ 'is-loading': loading }" >Submit</button>
                </div>
            </div>
        </div>
        <div class="ts-space is-big"></div>
        <div class="ts-box is-top-indicated">
            <div class="ts-content is-dense">
                <div class="ts-header is-heavy">Download Status</div>
                <div class="ts-divider"></div>
                <div class="ts-space is-large"></div>
                <div class="ts-segment is-tertiary" v-if="statusList.length == 0">
                    No gallery need to be download now!
                </div>
                <table class="ts-table is-celled is-striped" v-else>
                    <tbody>
                        <template v-for="item in statusList" :key="item.taskID">
                            <tr>
                                <td class="is-collapsed">
                                    <span class="ts-icon is-image-icon is-end-spaced"></span>
                                    {{ item.name }}
                                </td>
                                <td class="is-collapsed">
                                    <div class="ts-row">
                                        <template v-if="item.completed == -1"><div class="ts-loading is-notched is-small"></div><div class="ts-text">Downloading...</div></template>
                                        <template v-if="item.completed == 0"><div class="ts-icon is-pause-icon"></div><div class="ts-text">Waiting for download</div></template>
                                    </div>
                                </td>
                            </tr>
                        </template>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <ChapModal :active="showModal" :obj="obj" @close-modal="showModal=false"></ChapModal>
</template>

<script setup>
import { ref, onBeforeMount, onUnmounted } from 'vue'
import ChapModal from './../components/ChapModal.vue'
import { apiHost } from '@/config'
const showModal = ref(false)
const loading = ref(false)
const statusList = ref('')
const url = ref('')
const obj = ref({})
let tm
function getMetaData () {
  loading.value = true
  fetch(apiHost + '/task/metadata', {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify({
      url: url.value
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json())
    .then((json) => {
      if (json.code === 0) {
        obj.value = json.data
        loading.value = false
        showModal.value = true
      }
    })
}
function getTaskData () {
  fetch(apiHost + '/task', {
    method: 'get',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json())
    .then((json) => {
      if (json.code === 0) {
        statusList.value = json.data
      }
    })
}
onBeforeMount(() => {
  getTaskData()
  tm = setInterval(() => {
    getTaskData()
  }, 5000)
})
onUnmounted(() => {
  if (tm) clearInterval(tm)
})
</script>
