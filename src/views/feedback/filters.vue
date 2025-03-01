<template>
  <div class="flex flex-col">
    <h1 class="text-2xl font-regular text-gray-800"> Filtros </h1>

    <ul class="flex flex-col mt-3 list-none select-none">
      <li v-for="(filter, index) in state.filters" :key="`item-${index}`"
        class="flex items-center justify-between px-4 py-1 rounded cursor-pointer" :class="{
          'bg-gray-200': filter.active,
          'opacity-50': !filter.active
        }" @click="() => handlerSelect(filter)">
        <div class="flex items-center">
          <span :class="`${filter.color.background}`" class="inline-block w-2 h-2 mr-2 rounded-full font-bold" /> {{
            filter.label }}
        </div>
        <span :class="filter.active ? `${filter.color.text}` : COLORS.other.text" class="font-bold">
          {{ filter.amount }}
        </span>
      </li>

    </ul>
  </div>
</template>

<script>
import { reactive } from 'vue'

import services from '../../services'
import useStore from '../../hooks/useStore'

const LABELS = {
  all: 'Todos',
  issue: 'Problemas',
  idea: 'Ideias',
  other: 'Outros'
}

const COLORS = {
  all: { background: 'bg-brand-info', text: 'text-brand-info' },
  issue: { background: 'bg-brand-danger', text: 'text-brand-danger' },
  idea: { background: 'bg-brand-warning', text: 'text-brand-warning' },
  other: { background: 'bg-brand-neutral', text: 'text-brand-neutral' }
}

function applyFiltersStructure(sumarry) {
  return Object.keys(sumarry).reduce((pre, cur) => {
    const currentFilter = {
      label: LABELS[cur],
      color: COLORS[cur],
      amount: sumarry[cur]
    }

    if (cur === 'all') {
      currentFilter.active = true
    } else {
      currentFilter.type = cur
    }
    return [...pre, currentFilter]
  }, [])
}

export default {
  name: 'feedbackFilters',
  async setup(props, { emit }) {
    const store = useStore('Global')
    const state = reactive({
      hasError: false,
      filters: [
        { label: null, amount: null }
      ]
    })

    try {
      const { data } = await services.feedback.getSummary()
      state.filters = applyFiltersStructure(data)
    } catch (error) {
      state.hasError = !!error
      state.filters = applyFiltersStructure({ all: 0, issue: 0, idea: 0, other: 0 })
    }

    function handlerSelect({ type }) {
      if (store.isLoading) {
        return
      }

      state.filters = state.filters.map((filter) => {
        if (filter.type === type) {
          return { ...filter, active: true }
        } else {
          return { ...filter, active: false }
        }
      })

      emit('select', type)
    }

    return {
      state,
      COLORS,
      handlerSelect
    }
  }
}
</script>
