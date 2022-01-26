<template>
  <div class="col-12">
    <div class="card-lg bg-dark">
      <div class="card-body mt-3 selectable">
        <h1>{{ sprint.name }}</h1>
        <button class="selectable btn btn-danger" @click="removeSprint">
          Delete
        </button>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  props: {
    sprint: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    return {

      async
    }
  }
}
</script>


<style lang="scss" scoped>
</style>