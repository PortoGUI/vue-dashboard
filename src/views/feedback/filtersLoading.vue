<template>
  <content-loader class="flex flex-col items-center rounded" width="100%" height="300px">
    <content-loader class="mt-3 rounded" width="90%" height="40px" animation-duration="2s" />
    <content-loader class="mt-3 rounded" width="90%" height="40px" animation-duration="2.3s" />
    <content-loader class="mt-3 rounded" width="90%" height="40px" animation-duration="2.6s" />
    <content-loader class="mt-3 rounded" width="90%" height="40px" animation-duration="2.9s" />
  </content-loader>
</template>

<script>
import ContentLoader from '../../components/contentLoader/index.vue'
export default {
  name: 'filtersLoading',
  components: {
    ContentLoader
  }
}
</script>
