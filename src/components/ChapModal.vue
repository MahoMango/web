<template>
    <div class="ts-modal is-big" :class='{"is-visible": props.active}'>
        <div class="content" style="max-height: 600px; overflow-y: auto;">
            <div class="ts-grid is-stackable is-3-columns">
                <div class="column">
                    <div class="ts-center" style="align-items: stretch;">
                        <div class="ts-box">
                            <div class="ts-content">
                                <div class="ts-header is-large is-heavy is-center-aligned">{{ props.obj.title }}</div>
                            </div>
                            <div class="ts-image is-centered"><img :src='props.obj.imgSrc'></div>
                        </div>
                    </div>
                </div>
                <div class="column is-2-wide">
                    <div class="ts-space is-large"></div>
                    <div class="ts-wrap is-compact">
                        <template v-for="item in props.obj.chapter" :key="item.id">
                            <label class="ts-checkbox">
                                <input type="checkbox" :value="item" v-model="list"/>
                                {{ item.name }}
                            </label>
                        </template>
                    </div>
                </div>
            </div>
            <div class="ts-divider"></div>
            <div class="ts-content is-tertiary">
                <button class="ts-button is-fluid" :class="{ 'is-loading': loading }" @click="submit()">Confirm</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps, defineEmits, ref } from 'vue'
import { apiHost } from '@/config'
const props = defineProps(['active', 'obj'])
const emit = defineEmits(['closeModal'])
const list = ref([])
const loading = ref(false)
function submit () {
  loading.value = true
  fetch(apiHost + '/task/download', {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify({
      originURL: props.obj.url,
      title: props.obj.title,
      imgSrc: props.obj.imgSrc,
      data: list.value
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json())
    .then((json) => {
      console.log(json)
      if (json.code === 0) {
        emit('closeModal')
      }
      loading.value = false
    })
}
</script>

<style>
</style>
