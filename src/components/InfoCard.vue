<template>
    <div class="ts-box" @click="toCollection()">
        <div class="ts-image">
            <img :src="props.imgSrc">
        </div>
        <div class="ts-content">
            <div class="ts-header is-heavy is-center-aligned">{{ props.title }}</div>
        </div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue'
import router from '@/router'
const props = defineProps(['id', 'imgSrc', 'title'])
function toCollection () {
  router.push({ name: 'collectionInfo', params: { collectID: props.id } })
}
</script>

<style>
</style>
