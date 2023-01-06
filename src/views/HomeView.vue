<template>
  <Transition>
    <div class="cell" :class="{'is-maximal-only': !openBar}" style="width: 175px; position: absolute; top:0; bottom:0; z-index: 10;">
        <div class="ts-content" @click="openBar = !openBar">
          <div class="ts-icon is-huge is-mango-icon"></div>
          <div class="ts-header is-big is-heavy">
              Mango
          </div>
        </div>
        <div class="ts-app-sidebar">
            <RouterLink @click="openBar = !openBar" to="/collection" class="item" active-class="is-active" replace>
                <span class="ts-icon is-folder-icon"></span> Collection
            </RouterLink>
            <!--
            <RouterLink to="/gallery" class="item" active-class="is-active" replace>
                <span class="ts-icon is-image-icon"></span> Gallery
            </RouterLink>
            -->
            <RouterLink @click="openBar = !openBar" to="/task" class="item" active-class="is-active" replace>
                <span class="ts-icon is-download-icon"></span> Task
            </RouterLink>
        </div>
        <div class="ts-content">
            <button @click="logout()" class="ts-button is-outlined is-fluid">
                Logout
            </button>
        </div>
    </div>
  </Transition>
  <div class="cell is-fluid is-vertical">
    <div class="ts-tab is-not-maximal">
      <a class="item" @click="openBar = !openBar">
          <span class="ts-icon is-mango-icon"></span>
          Mango
      </a>
    </div>
    <div class="ts-space is-big"></div>
    <RouterView></RouterView>
  </div>
</template>

<script setup>
import { apiHost } from '@/config'
import router from '@/router'
import { ref } from 'vue'
const openBar = ref(false)
function logout () {
  fetch(apiHost + '/auth/logout', {
    credentials: 'include'
  })
    .then(res => res.json())
    .then((json) => {
    })
  router.push('/login')
}
</script>
