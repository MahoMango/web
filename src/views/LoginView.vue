<template>
  <div class="ts-center">
      <div class="ts-header is-large is-heavy is-icon">
          <div class="ts-icon is-mango-icon"></div>
          Mango
      </div>
      <div class="ts-space is-large"></div>
      <div class="ts-segment" style="width: 260px">
          <div class="ts-wrap is-vertical">
              <div class="ts-text is-label">Account</div>
              <div class="ts-input is-start-icon is-underlined is-fluid">
                  <span class="ts-icon is-user-icon"></span>
                  <input v-model="username" type="text" @keyup.enter="submit()"/>
              </div>
              <div class="ts-text is-label">Password</div>
              <div class="ts-input is-start-icon is-underlined is-fluid">
                  <span class="ts-icon is-lock-icon"></span>
                  <input v-model="password" type="password" @keyup.enter="submit()"/>
              </div>
              <button @click="submit()" class="ts-button is-fluid">Login</button>
          </div>
      </div>
      <Transition>
        <div v-show="failed" class="ts-notice is-negative message">
          <div class="title">Login Failed!</div>
          <div class="content">Account or password is wrong, please try again.</div>
        </div>
      </Transition>
  </div>

</template>

<script setup>
import { ref } from 'vue'
import { apiHost } from './../config'
import router from '@/router'
const username = ref('')
const password = ref('')
const failed = ref(false)

function submit () {
  fetch(apiHost + '/auth/login', {
    method: 'POST',
    body: JSON.stringify({
      username: username.value,
      password: password.value
    }),
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  })
    .then(res => res.json())
    .then((json) => {
      console.log(json)
      if (json.code === 0) {
        failed.value = false
        router.push({ name: 'listInfo' })
        return
      }
      failed.value = true
    })
}

</script>

<style scoped>
.message {
  position: fixed;
  top: 10vh;
  align-items: center;
  justify-content: center;
}
.v-enter-active, .v-leave-active {
  transition: opacity 0.5s ease;
}
.v-enter-from, .v-leave-to {
  opacity: 0;
}
</style>
