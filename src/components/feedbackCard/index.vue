<template>
  <div class="flex flex-col px-8 py-6 rounded bg-brand-gray">
    <div class="flex items-center justify-between w-full mb-8">
      <badge :type="feedback.type" />

      <span class="font-regular text-brand-graydark">
        {{ getDiffTimeBetweenCurrentDate(feedback.createdAt) }}
      </span>
    </div>

    <div class="text-lg font-medium text-gray-500">
      {{ feedback.text }}
    </div>

    <div v-if="state.isOpen" class="flex mt-8 animate__animated animate__fadeInUp animate__faster"
      :class="{ animate__fadeOut: state.isClosing }">
      <div class=" flex flex-col w-1/2">
        <div class="flex flex-col">
          <span class="font-bold text-gray-800 uppercase select-none">Página</span>
          <span class="font-medium text-gray-400">{{ feedback.page }}</span>
        </div>
        <div class="flex flex-col">
          <span class="font-bold text-gray-800 uppercase select-none">Dispositivo</span>
          <span class="font-medium text-gray-400">{{ feedback.device }}</span>
        </div>
      </div>

      <div class="flex flex-col w-1/2">
        <div class="flex flex-col">
          <span class="font-bold text-gray-800 uppercase select-none">Usuário</span>
          <span class="font-medium text-gray-400">{{ feedback.fingerprint }}</span>
        </div>
      </div>
    </div>

    <div v-if="!state.isOpen"
      class="flex justify-end mt-8 cursor-pointer animate__animated animate__fadeIn animate__faster"
      @click="handleToggle()">
      <i class="material-icons text-gray-800 hover:text-brand-main" title="Expandir conteúdo">keyboard_arrow_down</i>
    </div>
    <div v-else class="flex justify-end mt-8 cursor-pointer animate__animated animate__fadeInUp animate__faster"
      @click="handleToggle()">
      <i class="material-icons text-gray-800 hover:text-brand-main" title="Recolher conteúdo">keyboard_arrow_up</i>
    </div>

  </div>
</template>

<script>
import { reactive } from 'vue'
import { getDiffTimeBetweenCurrentDate } from '../../utils/date'
import { wait } from '../../utils/timeout'

import badge from './badge.vue'

export default {
  name: 'feedbackCard',
  components: {
    badge
  },
  props: {
    isOpened: { type: Boolean, default: false },
    feedback: { type: Object, required: true }
  },
  setup(props) {
    const state = reactive({
      isOpen: props.isOpened,
      isClosing: !props.isOpened
    })

    async function handleToggle() {
      state.isClosing = true
      await wait(250)
      state.isOpen = !state.isOpen
      state.isClosing = false
    }

    return {
      state,
      handleToggle,
      getDiffTimeBetweenCurrentDate
    }
  }
}
</script>
