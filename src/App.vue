<template>
  <modal-factory />
  <RouterView />
</template>

<script>
import { watch } from 'vue'
import { setCurrentUser } from './store/user'
import { useRoute, useRouter } from 'vue-router'

import services from './services'
import ModalFactory from './components/modalFactory/index.vue'

export default {
  components: {
    ModalFactory
  },
  setup() {
    const route = useRoute()
    const router = useRouter()

    watch(
      () => route.path,
      async () => {
        if (route.meta.requersAuth) {
          const token = window.localStorage.getItem('Token')

          if (!token) {
            router.push({ name: 'Home' })
            return
          }

          const { data } = await services.users.getMe()
          if (data) {
            setCurrentUser(data)
          }
        }
      }
    )
  }
}
</script>
