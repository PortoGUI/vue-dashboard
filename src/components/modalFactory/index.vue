<template>
  <teleport to="body">
    <div v-if="state.isActived"
      class="fixed top-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-60 backdrop-blur-sm"
      @click="handleModalToggle({ status: false })">

      <div class="fixed mx-10 " :class="state.width" @click.stop>

        <div
          class="flex flex-col overflow-hidden bg-white rounded-lg animate__animated animate__flipInX aninimate__faster">
          <div class="flex flex-col px-12 py-10 bg-white">
            <component :is="state.component" />
          </div>
        </div>
      </div>

    </div>
  </teleport>
</template>

<script>

import { defineAsyncComponent, onBeforeUnmount, onMounted, reactive } from 'vue'
import useModal from '../../hooks/useModal'

const modalLogin = defineAsyncComponent(() => import('../modalLogin/index.vue'))
const modalRegister = defineAsyncComponent(() => import('../modalRegister/index.vue'))

const DEFAULT_WIDTH = 'w-3/4 lg:w-1/3'

export default {
  components: {
    modalLogin,
    modalRegister
  },
  name: 'modalFactory',
  setup() {
    const modal = useModal()

    const state = reactive({
      isActived: false,
      component: {},
      props: {},
      width: DEFAULT_WIDTH
    })

    onMounted(() => {
      modal.listen(handleModalToggle)
    })

    onBeforeUnmount(() => {
      modal.off(handleModalToggle)
    })

    function handleModalToggle(payload) {
      if (payload.status) {
        state.component = payload.component
        state.props = payload.props
        state.width = payload.width ?? DEFAULT_WIDTH
      } else {
        state.component = {}
        state.props = {}
        state.width = DEFAULT_WIDTH
      }

      state.isActived = payload.status
    }

    return {
      state,
      handleModalToggle
    }
  }
}
</script>
