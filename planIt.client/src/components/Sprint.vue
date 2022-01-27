<template>
  <div class="col-12">
    <div class="card-lg bg-dark mt-3">
      <div class="card-body selectable">
        <h1>{{ sprint }}</h1>
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
    sprint: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    return {
      sprint: computed(() => AppState.sprint)
    }
  }
}
</script>


<style lang="scss" scoped>
</style>