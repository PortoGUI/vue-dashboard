<template>
  <div class="flex justify-center w-full h-28 bg-brand-main">
    <header-logged />
  </div>

  <div class="flex flex-col items-center justify-center h-64 bg-brand-gray">
    <h1 class="text-4xl font-black text-center text-gray-800">Credenciais para Widget</h1>
    <p class="text-lg text-center text-gray-400 font-regular">
      Guia de instalação e geração de suas credenciais para utilizar o widget em sua aplicação
    </p>
  </div>

  <div class="flex justify-center w-full h-full">
    <div class="flex flex-col w-4/5 max-w-6xl py-10">
      <h1 class="text-3xl font-black text-gray-700"> <u>Instalação e configuração</u> </h1>
      <p class="mt-10 text-lg text-gray-800 font-regular">
        Essa é sua chave de API, será necessárias para acessar a API do FeedBacker.
      </p>

      <content-loader v-if="store.Global.isLoading || state.isLoading" class="rounded" width="600px" height="50px" />
      <div v-else class="flex py-3 pl-5 pr-4 mt-2 justify-between rounded items-center bg-brand-gray w-full lg:w-2/3">
        <span v-if="state.hasError" class="text-gray-500 ">Erro ao carregar chave</span>
        <span v-else class="text-gray-500 ">{{ store.User.currentUser.apiKey }}</span>
        <div v-if="!state.hasError" class="flex justify-between w-15">
          <i @click="handleCopy()" class="material-icons cursor-pointer text-gray-500 hover:text-brand-main"
            title="Copiar">content_copy</i>
          <i @click="handleGenerateApiKey()" class="material-icons cursor-pointer text-gray-500 hover:text-brand-main"
            title="Nova Chave">refresh</i>
        </div>
      </div>

      <p class="mt-5 text-lg text-gray-800 font-regular">
        Coloque o script a baixo no seu site para começar a receber FeedBacks.
      </p>

      <content-loader v-if="store.Global.isLoading || state.isLoading" class="rounded" width="600px" height="50px" />
      <div v-else class="py-3 pl-5 pr-4 mt-2 bg-brand-gray w-full lg:w-2/3 overflow-x-scroll">
        <span v-if="state.hasError" class="text-gray-500 ">Erro ao carregar script</span>
        <pre v-else class="text-gray-500">
&lt;script defer async
  onload="init('{{ store.User.currentUser.apiKey }}')"
  src="https://PortoGUI-feedbacker-widget.netlify.app/init.js"&gt;
&lt;/script&gt;</pre>
      </div>

    </div>
  </div>
</template>

<script>
import { reactive, watch } from 'vue'
import { setAPIKey } from '../../store/user'
import { useToast } from 'vue-toastification'

import services from '../../services'
import useStore from '../../hooks/useStore'
import HeaderLogged from '../../components/headerLogged/index.vue'
import ContentLoader from '../../components/contentLoader/index.vue'

export default {
  name: 'CredentialIndex',
  components: {
    HeaderLogged,
    ContentLoader
  },
  setup() {
    const store = useStore()
    const state = reactive({
      isLoading: false,
      hasError: false
    })
    const toast = useToast()

    watch(() => store.User.currentUser, () => {
      if (!store.Global.isLoading && !store.User.currentUser.apiKey) {
        handleError(true)
      }
    })

    function handleError(error) {
      state.isLoading = false
      state.hasError = !!error
    }

    async function handleGenerateApiKey() {
      try {
        state.isLoading = true
        const { data } = await services.users.generateAPIKey()

        setAPIKey(data.apiKey)
        state.isLoading = false
      } catch (error) {
        handleError(error)
      }
    }

    async function handleCopy() {
      toast.clear()
      try {
        await navigator.clipboard.writeText(store.User.currentUser.apiKey)
        toast.success('Chave copiada para área de transferência')
      } catch (error) {
        handleError(error)
      }
    }

    return {
      state,
      store,
      handleGenerateApiKey,
      handleCopy
    }
  }
}
</script>
