<template>
  <span :class="`${classColor}`" class="px-2 py-1 text-xs font-black text-white rounded">
    {{ label }}
  </span>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'feedBackBadge',
  props: {
    type: { type: String, required: true }
  },
  setup(props) {
    const label = computed(() => {
      if (props.type === 'ISSUE') {
        return 'Problema'
      }

      if (props.type === 'IDEA') {
        return 'Ideia'
      }

      return 'Outros'
    })

    const classColor = computed(() => {
      if (props.type === 'ISSUE') {
        return 'bg-brand-danger'
      }

      if (props.type === 'IDEA') {
        return 'bg-brand-warning'
      }

      return 'bg-brand-neutral'
    })

    return {
      label,
      classColor
    }
  }
}
</script>
