<template>
  <div class="col-12">
    <div class="card-lg bg-dark">
      <div class="card-body">
        <h1>{{ project.name }}</h1>
        <p>{{ project.description }}</p>
      </div>
    </div>
  </div>
</template>


<script>
import { computed } from '@vue/reactivity'
import { AppState } from '../AppState'
export default {
  props: {
    project: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    return {
      account: computed(() => AppState.account)
    }
  }
}
</script>


<style lang="scss" scoped>
</style>