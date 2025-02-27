<template>
  <div class="flex justify-center w-full h-28 bg-brand-main">
    <header-logged />
  </div>

  <div class="flex flex-col items-center justify-center h-64 bg-brand-gray">
    <h1 class="text-4xl font-black text-center text-gray-800">FeedBacks</h1>
    <p class="text-lg text-center text-gray-400 font-regular"> Detalhes de todos os feedbacks recebidos. </p>
  </div>

  <div class="flex justify-center w-full pb-20">
    <div class="w-4/5 max-w-6xl py-10 grid grid-cols-4 gap-2">
      <div>
        <h1 class="text-3xl font-black text-gray-800">Listagem</h1>
        <suspense>
          <template #default>
            <feedback-filters class="mt-8 animate__animated animate__fadeIn animate__faster"
              @select="fetchFeedbacksByType" />
          </template>
          <template #fallback>
            <filters-loading class="mt-8 animate__animated animate__fadeIn animate__faster" />
          </template>
        </suspense>
      </div>
      <div class="px-10 pt-17 col-span-3">
        <p v-if="state.hasError" class="text-lg texte-center text-gray-400 font-regular">
          Não conseguimos localizar os feedbacks, a conexão falhou... &#128533;
        </p>
        <p v-if="!state.feedbacks.length && !state.isLoading && !state.hasError"
          class="text-lg texte-center text-gray-400 font-regular">
          Nao temos nada por aqui ainda &#128526;
        </p>

        <feedback-card-loading v-if="state.isLoading || state.isLoadingFeedbacks" />
        <feedback-card v-else v-for="(feedback, index) in state.feedbacks" :key="`item-${index}`"
          :is-opened="index === 0" :feedback="feedback" class="mb-4" />
        <feedback-card-loading v-if="state.isLoadingMoreFeedbacks" />
      </div>
    </div>
  </div>
</template>

<script>
import { onErrorCaptured, onMounted, onUnmounted, reactive } from 'vue'

import services from '../../services'
import feedbackFilters from './filters.vue'
import filtersLoading from './filtersLoading.vue'
import HeaderLogged from '../../components/headerLogged/index.vue'
import FeedbackCard from '../../components/feedbackCard/index.vue'
import FeedbackCardLoading from '../../components/feedbackCard/loading.vue'

export default {
  name: 'feedbackIndex',
  components: {
    HeaderLogged,
    FeedbackCard,
    filtersLoading,
    feedbackFilters,
    FeedbackCardLoading
  },
  setup() {
    const state = reactive({
      hasError: false,
      isLoading: false,
      isLoadingFeedbacks: false,
      isLoadingMoreFeedbacks: false,
      currentFeedbackType: '',
      pagination: {
        limit: 5,
        offset: 0,
        total: 0
      },
      feedbacks: []
    })

    onErrorCaptured(handleError)

    onMounted(() => {
      fetchFeedbacks()
      window.addEventListener('scroll', handleScroll, false)
    })

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll, false)
    })

    async function handleScroll() {
      const isBottomOfWindow = Math.ceil(document.documentElement.scrollTop + window.innerHeight) >= document.documentElement.scrollHeight

      if (state.isLoading || state.isLoadingMoreFeedbacks) return
      if (!isBottomOfWindow) return
      if (state.feedbacks.length >= state.pagination.total) return

      try {
        state.isLoadingMoreFeedbacks = true
        const { data } = await services.feedback.getAll({
          ...state.pagination,
          type: state.currentFeedbackType,
          offset: (state.pagination.offset + 5)
        })

        if (data.results.length) {
          state.feedbacks.push(...data.results)
        }

        state.isLoadingMoreFeedbacks = false
        state.pagination = data.pagination
      } catch (error) {
        state.isLoadingMoreFeedbacks = false
        handleError(error)
      }
    }

    function handleError(error) {
      state.hasError = !!error
      state.isLoading = false
      state.isLoadingFeedbacks = false
      state.isLoadingMoreFeedbacks = false
    }

    async function fetchFeedbacksByType(type) {
      try {
        state.isLoadingFeedbacks = true
        state.pagination.offset = 0
        state.pagination.limit = 5
        state.currentFeedbackType = type
        const { data } = await services.feedback.getAll({ type, ...state.pagination })

        state.feedbacks = data.results
        state.pagination = data.pagination
        state.isLoadingFeedbacks = false
      } catch (error) {
        handleError(error)
      }
    }

    async function fetchFeedbacks() {
      try {
        state.isLoading = true
        const { data } = await services.feedback.getAll({
          ...state.pagination, type: state.currentFeedbackType
        })

        state.feedbacks = data.results
        state.pagination = data.pagination
        state.isLoading = false
      } catch (error) {
        handleError(error)
      }
    }

    return {
      state,
      fetchFeedbacksByType
    }
  }
}
</script>
