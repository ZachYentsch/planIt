<template>
  <div class="col-12">
    <div class="card-lg bg-dark mt-3">
      <div class="card-body selectable">
        <h1>{{ sprints }}</h1>
        <button class="selectable btn btn-danger">Delete</button>
      </div>
    </div>
  </div>
</template>


<script>
import { computed } from '@vue/reactivity'
import { AppState } from '../AppState'
export default {
  props: {
    sprints: {
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