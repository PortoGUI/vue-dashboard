<template>
  <div class="flex items-center justify-between w-4/5 max-w-6xl py-10">
    <div class="w-28 lg:w-36">
      <img class="w-full" src="../../assets/images/logo_white.png" alt="logo">
    </div>

    <div class="flex h-10">
      <ul class="flex list-none">
        <li @click="() => router.push({ name: 'Credential' })"
          class="px-6 py-2 mr-2 font-bold text-white rounded-full cursor-pointer focus:outline-none">
          Credenciais
        </li>

        <li @click="() => router.push({ name: 'Feedback' })"
          class="px-6 py-2 mr-2 font-bold text-white rounded-full cursor-pointer focus:outline-none">
          FeedBacks
        </li>

        <li @click="handleLogout()"
          class="px-6 py-2 font-bold bg-white text-brand-main rounded-full cursor-pointer focus:outline-none">
          Sair
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { clearCurrentUser } from '../../store/user'

import useStore from '../../hooks/useStore'

export default {
  name: 'HeaderLogged',
  setup() {
    const router = useRouter()
    const store = useStore('User')

    const userLabel = computed(() => {
      if (store.currentUser && !store.currentUser.name) {
        return 'Usuário'
      } else {
        return `${store.currentUser.name}`
      }
    })

    function handleLogout() {
      window.localStorage.removeItem('Token')
      clearCurrentUser()
      router.push({ name: 'Home' })
    }

    return {
      router,
      userLabel,
      handleLogout
    }
  }
}
</script>
