<template>
  <custom-header @createAccount="handleRegister" @login="handleLogin" />
  <contact />

  <div id="footer" class="flex justify-center items-center h-16 bg-brand-gray">
    <p class="font-medium text-center text-gray-800">Feedbacker &#169; 2021</p>
  </div>
</template>

<script>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

import contact from './contact.vue'
import useModal from '../../hooks/useModal'
import customHeader from './customHeader.vue'

export default {
  name: 'homeIndex',
  components: {
    contact,
    customHeader
  },
  setup() {
    const router = useRouter()
    const modal = useModal()
    const toast = useToast()

    onMounted(() => {
      const token = window.localStorage.getItem('Token')

      if (token) {
        router.push({ name: 'Feedback' })
        toast.clear()
        toast.success('Login automático realizado')
      }
    })

    function handleLogin() {
      modal.open({ component: 'modalLogin' })
    }

    function handleRegister() {
      modal.open({ component: 'modalRegister' })
    }

    return {
      handleLogin,
      handleRegister
    }
  }
}
</script>
