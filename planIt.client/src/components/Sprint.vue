<template>
  <div class="col-12">
    <div class="card-lg bg-dark mt-3">
      <div class="card-body">
        <h1
          class="selectable"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapseTask"
          aria-expanded="false"
          aria-controls="collapseTask"
        >
          {{ sprint.name }}
        </h1>
        <button class="selectable btn btn-danger" @click="removeSprint()">
          Delete
        </button>
        <div class="collapse collapse-horizontal mt-4" id="collapseTask">
          <div class="card card-body text-dark" style="width: 100vh">
            <CreateTask />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { computed } from '@vue/reactivity'
import { AppState } from '../AppState'
import Pop from '../utils/Pop'
import { logger } from '../utils/Logger'
import { sprintsService } from '../services/SprintsService'
import { useRoute } from 'vue-router'
export default {
  props: {
    sprint: {
      type: Object,
      required: true

    }
  },
  setup(props) {
    const route = useRoute()
    return {
      account: computed(() => AppState.account),

      async removeSprint() {
        try {
          await sprintsService.removeSprint(props.sprint.id, route.params.id)
        } catch (error) {
          Pop.toast(error.message, 'error')
          logger.log(error.message)
        }
        // Pop.toast('Sprint was Deleted')
      }
    }
  }
}
</script>


<style lang="scss" scoped>
</style>